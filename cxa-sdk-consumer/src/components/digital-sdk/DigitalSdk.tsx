/**
 * DigitalSdk component initializes the CXoneDigitalClient and manages digital contact messages.
 * It allows users to view and reply to digital messages.
 *
 * @component
 * @example
 * return (
 *   <DigitalSdk />
 * )
 *
 * @returns {JSX.Element} The rendered DigitalSdk component.
 *
 * @remarks
 * This component uses the CXoneDigitalClient to initialize digital engagement and subscribe to digital contact events.
 * It maintains the state of digital messages and handles user input for replying to messages.
 *
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import {
  CXoneDigitalClient,
  CXoneDigitalContact,
} from '@nice-devone/digital-sdk';
import { CXoneDigitalReplyRequest, SortingType } from '@nice-devone/common-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { Logger } from '@nice-devone/core-sdk';
import { uuid } from 'uuidv4';
import HorizontalCards from './horizontal-cards-caseIds/HorizontalCards';
import { tryCatchWrapper } from '../../utils/tryCatchWrapper';

import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';

type FetchInteractionsOptions = {
  queryText?: string;
  statusFilter?: string;
  scrollToken?: string;
  resetPaging?: boolean;
};

const PAGE_SIZE = 25;
const STATUS_OPTIONS = ['ALL', 'NEW', 'OPEN', 'PENDING', 'ESCALATED', 'RESOLVED', 'CLOSED'];

const logger = new Logger('SDK-CONSUMER', 'DigitalSdk');



const DigitalSdk = () => {
  const [inputValue, setInputValue] = useState('');
  const [initEngagement, setInitEngagement] = useState(false);
  let digitalContactInstance: CXoneDigitalContact;
  const [UpdatedigitalContactCaseId, setUpdatedigitalContactCaseId] = useState({} as any);

  const [digitalContacts, setDigitalContacts] = useState([] as any);
  const [selectedDigitalContact, setSelectedDigitalContact] = useState({} as any);
  const [interactionSearch, setInteractionSearch] = useState('');
  const [interactionSearchLoading, setInteractionSearchLoading] = useState(false);
  const [interactionResults, setInteractionResults] = useState([] as any);
  const [interactionStatusFilter, setInteractionStatusFilter] = useState('ALL');
  const [assigningInteractionId, setAssigningInteractionId] = useState('');
  const [selectedInteractionId, setSelectedInteractionId] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [nextScrollToken, setNextScrollToken] = useState<string | undefined>(undefined);
  const scrollTokenStackRef = useRef<string[]>([]);
  const [assignmentNotice, setAssignmentNotice] = useState({
    severity: 'info',
    message: '',
  } as { severity: 'success' | 'info' | 'error'; message: string });
  const fetchInteractionResultsRef = useRef<((opts?: FetchInteractionsOptions) => void) | null>(null);
  const digitalSdkwebsoketRef = useRef<(() => Promise<void>) | null>(null);


  const [messages, setMessages] = useState([] as any);

  const currentUserId = CXoneUser.instance.getUserInfo()?.userId ?? '';
  // For the digital `inboxAssigneeAgentId` search filter, CMA passes the
  // InContact AgentId (`icAgentId`) — same value used in the agent-list
  // dropdown (`id: ${item.agentId}`). The DFO contact's
  // `inboxAssigneeUser.incontactId` is the InContact UserId; both must match
  // the logged-in agent, but the SEARCH filter specifically wants icAgentId.
  // We fall back to digitalUserId / userId if icAgentId isn't populated yet.
  const getMyInboxAgentId = () => {
    const info: any = CXoneUser.instance.getUserInfo() ?? {};
    return String(info.icAgentId ?? info.digitalUserId ?? info.userId ?? '');
  };

  const getInteractionId = (contact: any) =>
    contact?.caseId ?? contact?.id ?? contact?.contactId ?? '';

  const fetchInteractionResults = (opts: FetchInteractionsOptions = {}) => {
    const searchApi = CXoneDigitalClient.instance.digitalService?.getDigitalContactSearchResult?.bind(
      CXoneDigitalClient.instance.digitalService,
    );
    if (typeof searchApi !== 'function') {
      logger.warn('Digital interaction search API not ready yet.', '');
      return;
    }
    const trimmedQuery = (opts.queryText ?? interactionSearch).trim();
    const statusFilter = opts.statusFilter ?? interactionStatusFilter;
    const scrollToken = opts.scrollToken;
    if (opts.resetPaging) {
      scrollTokenStackRef.current = [];
      setPageIndex(0);
    }
    const searchRequest: any = {
      sorting: 'createdAt',
      sortingType: SortingType.DESCENDING,
    };
    if (trimmedQuery) {
      searchRequest.query = trimmedQuery;
    }
    if (statusFilter && statusFilter !== 'ALL') {
      const statusId = statusFilter.toLowerCase();
      searchRequest.status = [{ id: statusId, name: statusId }];
    }
    if (scrollToken) {
      searchRequest.scrollToken = scrollToken;
    }
    setInteractionSearchLoading(true);
    logger.info('getDigitalContactSearchResult request', JSON.stringify(searchRequest));
    searchApi(searchRequest)
      .then((response: any) => {
        setInteractionResults(response?.data ?? []);
        setTotalHits(response?.hits ?? 0);
        setNextScrollToken(response?.scrollToken);
        logger.info(
          'getDigitalContactSearchResult success',
          JSON.stringify({
            hits: response?.hits ?? 0,
            count: response?.data?.length ?? 0,
            hasNextScrollToken: Boolean(response?.scrollToken),
          }),
        );
      })
      .catch((error: unknown) => {
        logger.error('getDigitalContactSearchResult failed', JSON.stringify(error instanceof Error ? error.message : error));
        setInteractionResults([]);
        setTotalHits(0);
        setNextScrollToken(undefined);
      })
      .finally(() => {
        setInteractionSearchLoading(false);
      });
  };

  const handleSearchSubmit = () => {
    fetchInteractionResults({ resetPaging: true });
  };

  const handleStatusFilterChange = (status: string) => {
    setInteractionStatusFilter(status);
    fetchInteractionResults({ statusFilter: status, resetPaging: true });
  };

  const handleNextPage = () => {
    if (!nextScrollToken || interactionSearchLoading) return;
    scrollTokenStackRef.current = [...scrollTokenStackRef.current, nextScrollToken];
    setPageIndex((prev) => prev + 1);
    fetchInteractionResults({ scrollToken: nextScrollToken });
  };

  const handlePrevPage = () => {
    if (pageIndex <= 0 || interactionSearchLoading) return;
    const stack = [...scrollTokenStackRef.current];
    stack.pop();
    scrollTokenStackRef.current = stack;
    const previousToken = stack.length > 0 ? stack[stack.length - 1] : undefined;
    setPageIndex((prev) => Math.max(0, prev - 1));
    fetchInteractionResults({ scrollToken: previousToken });
  };

  const formatCreatedAt = (value?: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  const getStatusDotColor = (status?: string) => {
    switch (String(status ?? '').toLowerCase()) {
      case 'new':
        return '#fb8c00';
      case 'open':
        return '#1e88e5';
      case 'pending':
        return '#8e24aa';
      case 'escalated':
        return '#e53935';
      case 'resolved':
        return '#43a047';
      case 'closed':
        return '#9e9e9e';
      default:
        return '#bdbdbd';
    }
  };

  const rangeStart = interactionResults.length === 0 ? 0 : pageIndex * PAGE_SIZE + 1;
  const rangeEnd = pageIndex * PAGE_SIZE + interactionResults.length;

  const loadMyAssignedContacts = () => {
    const searchApi = CXoneDigitalClient.instance.digitalService?.getDigitalContactSearchResult?.bind(
      CXoneDigitalClient.instance.digitalService,
    );
    const myAgentId = getMyInboxAgentId();
    if (typeof searchApi !== 'function' || !myAgentId) {
      logger.warn(
        'loadMyAssignedContacts preconditions not met',
        JSON.stringify({
          hasApi: typeof searchApi === 'function',
          hasAgentId: Boolean(myAgentId),
        }),
      );
      return;
    }
    // Match CMA's "my inbox" view: every open/in-progress status assigned to me.
    // We intentionally exclude 'closed' so we only seed Active Contacts with
    // cases the agent can still work on.
    const myStatuses = ['new', 'open', 'pending', 'escalated', 'resolved'];
    const searchRequest: any = {
      sorting: 'createdAt',
      sortingType: SortingType.DESCENDING,
      inboxAssigneeAgentId: [
        { id: myAgentId, name: myAgentId },
      ],
      status: myStatuses.map((statusValue) => ({
        id: statusValue,
        name: statusValue,
      })),
    };
    logger.info('loadMyAssignedContacts request', JSON.stringify(searchRequest));
    searchApi(searchRequest)
      .then((response: any) => {
        const rows: any[] = response?.data ?? [];
        logger.info(
          'loadMyAssignedContacts success',
          JSON.stringify({
            hits: response?.hits ?? 0,
            count: rows.length,
            myAgentId,
          }),
        );
        // Seed the Active Contacts list with whatever is already assigned to me.
        setDigitalContacts((prevState: any[]) => {
          const merged = [...prevState];
          rows.forEach((row: any) => {
            const caseId = getInteractionId(row);
            if (!caseId) return;
            const existingIndex = merged.findIndex((c: any) => c.caseId === caseId);
            const next = {
              ...row,
              caseId,
              messages: row?.messages ?? [],
            };
            if (existingIndex >= 0) {
              merged[existingIndex] = { ...merged[existingIndex], ...next };
            } else {
              merged.push(next);
            }
          });
          return merged;
        });
        // Ask the SDK to hydrate each so messages/details come through the websocket.
        rows.forEach((row: any) => {
          const caseId = getInteractionId(row);
          if (caseId) {
            CXoneDigitalClient.instance.digitalContactManager?.getContactDetails?.(
              caseId,
              true,
            );
          }
        });
      })
      .catch((error: unknown) => {
        logger.error(
          'loadMyAssignedContacts failed',
          JSON.stringify(error instanceof Error ? error.message : error),
        );
      });
  };

  const loadMyAssignedContactsRef = useRef<(() => void) | null>(null);
  loadMyAssignedContactsRef.current = loadMyAssignedContacts;

  const hydrateDigitalContact = (contactId: string, isAssignedToAgentInbox = true) => {
    if (!contactId) return;
    setSelectedDigitalContact((prev: any) => ({ ...prev, caseId: contactId }));
    setMessages([]);
    logger.info('digitalContactManager.getContactDetails request', JSON.stringify({ contactId, isAssignedToAgentInbox }));
    CXoneDigitalClient.instance.digitalContactManager?.getContactDetails?.(
      contactId,
      isAssignedToAgentInbox,
    );
  };

  const assignInteractionToMe = (interaction: any) => {
    const interactionId = getInteractionId(interaction);
    const assignApi = CXoneDigitalClient.instance.digitalContactManager?.digitalContactService?.changeAssignedUser?.bind(
      CXoneDigitalClient.instance.digitalContactManager?.digitalContactService,
    );
    if (!interactionId || typeof assignApi !== 'function' || !currentUserId) {
      logger.warn('Assign to Me preconditions not met', JSON.stringify({
        interactionId,
        hasApi: typeof assignApi === 'function',
        hasUserId: Boolean(currentUserId),
      }));
      setAssignmentNotice({ severity: 'error', message: 'Unable to assign' });
      return;
    }
    setAssigningInteractionId(interactionId);
    logger.info('changeAssignedUser request', JSON.stringify({ interactionId, currentUserId }));
    assignApi(interactionId, currentUserId)
      .then((response: any) => {
        logger.info('changeAssignedUser success', JSON.stringify(response));
        setAssignmentNotice({
          severity: 'success',
          message: `Interaction ${interactionId} assigned to you successfully.`,
        });
        const userInfo = CXoneUser.instance.getUserInfo();
        const assignedUser = {
          incontactId: currentUserId,
          firstName: userInfo?.firstName ?? 'Me',
          surname: userInfo?.lastName ?? '',
          email: userInfo?.userName ?? '',
        };
        // Update the row in place so the table reflects the new assignee
        // without triggering a full search refresh.
        setInteractionResults((prev: any[]) =>
          prev.map((row: any) =>
            getInteractionId(row) === interactionId
              ? { ...row, inboxAssigneeUser: assignedUser }
              : row,
          ),
        );
        // Make the newly assigned interaction appear in Active Contacts immediately
        // (the websocket event may arrive later or not at all on first assign).
        setDigitalContacts((prevState: any[]) => {
          const exists = prevState.some(
            (contact: any) => contact.caseId === interactionId,
          );
          if (exists) {
            return prevState.map((contact: any) =>
              contact.caseId === interactionId
                ? { ...contact, inboxAssigneeUser: assignedUser }
                : contact,
            );
          }
          const sourceRow =
            interactionResults.find(
              (row: any) => getInteractionId(row) === interactionId,
            ) ?? interaction ?? {};
          return [
            ...prevState,
            {
              ...sourceRow,
              caseId: interactionId,
              messages: sourceRow?.messages ?? [],
              inboxAssigneeUser: assignedUser,
            },
          ];
        });
        hydrateDigitalContact(interactionId, true);
      })
      .catch((error: unknown) => {
        logger.error('changeAssignedUser failed', JSON.stringify(error instanceof Error ? error.message : error));
        setAssignmentNotice({ severity: 'error', message: 'Unable to assign' });
      })
      .finally(() => {
        setAssigningInteractionId('');
      });
  };

  const selectedInteraction = interactionResults.find(
    (row: any) => getInteractionId(row) === selectedInteractionId,
  );
  const selectedInteractionAssignee = selectedInteraction?.inboxAssigneeUser;
  const selectedHasAssignee = Boolean(
    selectedInteractionAssignee?.incontactId ||
      selectedInteractionAssignee?.firstName ||
      selectedInteractionAssignee?.email,
  );
  const selectedIsAssignedToMe =
    selectedInteractionAssignee?.incontactId === currentUserId;
  const assignToMeDisabled =
    !selectedInteraction ||
    selectedHasAssignee ||
    assigningInteractionId === selectedInteractionId ||
    interactionSearchLoading;

  fetchInteractionResultsRef.current = fetchInteractionResults;

  const selectedContactStatus = String(
    selectedDigitalContact?.status ?? selectedDigitalContact?.case?.status ?? '',
  ).toLowerCase();
  // CMA enables the reply input whenever the channel supports replies and the
  // case isn't closed. We mirror that here so e.g. email cases (which have
  // hasReply=true) are also replyable from the consumer.
  const replyDisabledReason = !selectedDigitalContact?.channel?.id
    ? 'This interaction cannot send replies in the consumer app.'
    : selectedContactStatus === 'closed'
      ? 'Closed interactions cannot be replied to.'
      : selectedDigitalContact?.channel?.hasReply === false
        ? 'This interaction does not support replying.'
        : '';
  const isReplyDisabled = Boolean(replyDisabledReason);

  useEffect(() => {
    logger.info('initDigitalEngagement request', '');
    CXoneDigitalClient.instance.initDigitalEngagement().finally(() => {
      logger.info('initDigitalEngagement complete', '');
      setInitEngagement(true);
    });
  }, []);

  useEffect(() => {
    if (!initEngagement) return;
    let cancelled = false;
    let retryId: number | undefined;
    let bootstrapped = false;
    const waitForDigitalReady = () => {
      if (cancelled) return;
      const contactEventSub =
        CXoneDigitalClient.instance.digitalContactManager?.onDigitalContactEvent?.subscribe;
      const searchApi =
        CXoneDigitalClient.instance.digitalService?.getDigitalContactSearchResult;
      const digitalUserIdReady = Boolean(getMyInboxAgentId());
      if (typeof contactEventSub !== 'function' || typeof searchApi !== 'function') {
        retryId = window.setTimeout(waitForDigitalReady, 1000);
        return;
      }
      if (!bootstrapped) {
        bootstrapped = true;
        const initWebsocket = digitalSdkwebsoketRef.current;
        const loadInteractions = fetchInteractionResultsRef.current;
        if (initWebsocket) {
          tryCatchWrapper(initWebsocket, (error) => {
            logger.error('digitalSdkwebsoket init failed', JSON.stringify(error));
          });
        }
        if (loadInteractions) {
          loadInteractions({ resetPaging: true });
        }
      }
      const loadMine = loadMyAssignedContactsRef.current;
      if (digitalUserIdReady && loadMine) {
        loadMine();
        return;
      }
      // Digital user id isn't hydrated yet; retry shortly so we can seed
      // the agent's existing assignments once it becomes available.
      retryId = window.setTimeout(waitForDigitalReady, 1000);
    };
    waitForDigitalReady();
    return () => {
      cancelled = true;
      if (retryId !== undefined) window.clearTimeout(retryId);
    };
  }, [initEngagement]);
  
  useEffect(() => {
      if (Object.keys(UpdatedigitalContactCaseId).length > 0) {
        if(selectedDigitalContact.caseId === UpdatedigitalContactCaseId.caseId){
          setSelectedDigitalContact(UpdatedigitalContactCaseId);
          setMessages(UpdatedigitalContactCaseId.messages.map((item: any) => ({
            direction: item.direction,
            text: item.messageContent?.text, // Extract only the text from messageContent
          })));
        }
        
      }
    }, [UpdatedigitalContactCaseId, selectedDigitalContact.caseId]);

    const digitalSdkwebsoket=async()=>{
      CXoneDigitalClient.instance.digitalContactManager.onDigitalContactNewMessageEvent?.subscribe(
        (eventData) => {
          logger.info('onDigitalContactNewMessageEvent', JSON.stringify(eventData));
        }
      );
     
      CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent?.subscribe(
       async (digitalConct: any) => {

        // Update the existing digital contact if it already exists, otherwise add the new contact
        setDigitalContacts((prevState: any) => {
          if (prevState.some((contact: any) => contact.caseId === digitalConct.caseId)) {
            return prevState.map((contact: any) =>
              contact.caseId === digitalConct.caseId ? digitalConct : contact
            );
            } else {
            return [...prevState, digitalConct];
            }
        })
  

        // Using uuid to trigger re-render as React does not detect changes in nested objects
        //because of this we can trigger useEffect which shows updared messages
        setUpdatedigitalContactCaseId({...digitalConct,update_id:uuid()});
        }
      );
     
    
    }

    digitalSdkwebsoketRef.current = digitalSdkwebsoket;
  
    const onClickCaseId=(contact:any)=>{
      setSelectedDigitalContact(contact);

      const existingMessages: any[] = Array.isArray(contact?.messages) ? contact.messages : [];
      setMessages(existingMessages.map((item: any) => ({
        direction:item.direction,
        text: item.messageContent?.text, // Extract only the text from messageContent
        caseId:contact.caseId
      })));

      // Cards seeded from the inbox search don't carry their full message
      // history. Ask the SDK to hydrate this case so the websocket pushes
      // the full digital contact (with messages) and the existing
      // UpdatedigitalContactCaseId effect refreshes the panel.
      const caseId = contact?.caseId;
      if (caseId && existingMessages.length === 0) {
        logger.info(
          'onClickCaseId hydrating contact',
          JSON.stringify({ caseId }),
        );
        try {
          CXoneDigitalClient.instance.digitalContactManager?.getContactDetails?.(
            caseId,
            true,
          );
        } catch (error) {
          logger.error(
            'onClickCaseId getContactDetails failed',
            JSON.stringify(error instanceof Error ? error.message : error),
          );
        }
      }
    }

   const replyObject: CXoneDigitalReplyRequest = {
    messageContent: {
      type: "TEXT",
      payload: {
        text: inputValue,
      },
    },
   
      thread: {
        idOnExternalPlatform: selectedDigitalContact?.case?.threadIdOnExternalPlatform,
      },
     
      recipients: [],
    };



    const sendReply = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (isReplyDisabled || !inputValue.trim()) {
        return;
      }
      digitalContactInstance = new CXoneDigitalContact();
      logger.info('CXoneDigitalContact.reply request', JSON.stringify(replyObject));
      digitalContactInstance
        .reply(replyObject, selectedDigitalContact?.channel?.id, uuid())
        .then((res) => {
          logger.info('Reply Sent Successfully!', JSON.stringify(res));
        })
        .catch((err) => {
          logger.error('Reply Unsuccessful', JSON.stringify(err));
        });
      setInputValue('');
    };

    const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setInputValue(e.target.value);
        };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2, width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "primary.dark" }}>
        Digital SDK
      </Typography>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
            Interaction Search
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search interactions"
              value={interactionSearch}
              onChange={(event) => setInteractionSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearchSubmit}
              disabled={interactionSearchLoading}
            >
              {interactionSearchLoading ? <CircularProgress size={18} color="inherit" /> : 'Search'}
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            {STATUS_OPTIONS.map((status) => (
              <Button
                key={status}
                size="small"
                variant={interactionStatusFilter === status ? 'contained' : 'outlined'}
                onClick={() => handleStatusFilterChange(status)}
                disabled={interactionSearchLoading}
              >
                {status}
              </Button>
            ))}
          </Stack>

          {assignmentNotice.message && (
            <Alert
              severity={assignmentNotice.severity}
              onClose={() => setAssignmentNotice({ ...assignmentNotice, message: '' })}
              sx={{ mb: 1.5 }}
            >
              {assignmentNotice.message}
            </Alert>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 1.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              {selectedInteractionId
                ? selectedIsAssignedToMe
                  ? `Selected: ${selectedInteractionId} (already assigned to you)`
                  : selectedHasAssignee
                    ? `Selected: ${selectedInteractionId} (already assigned to another agent)`
                    : `Selected: ${selectedInteractionId}`
                : 'Select an interaction to assign'}
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() =>
                selectedInteraction && assignInteractionToMe(selectedInteraction)
              }
              disabled={assignToMeDisabled}
            >
              {assigningInteractionId === selectedInteractionId ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                'Assign to Me'
              )}
            </Button>
          </Stack>

          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              mb: 3,
              maxHeight: 420,
              overflowY: 'auto',
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Interaction</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Skill</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Assignee</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interactionSearchLoading && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                )}
                {!interactionSearchLoading && interactionResults.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No interactions found for the selected status.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {!interactionSearchLoading && interactionResults.map((interaction: any) => {
                  const interactionId = getInteractionId(interaction);
                  const assignee = interaction?.inboxAssigneeUser;
                  const hasAssignee = Boolean(
                    assignee?.incontactId || assignee?.firstName || assignee?.email,
                  );
                  const isAssignedToMe = assignee?.incontactId === currentUserId;
                  const statusValue = String(interaction?.status ?? '').toLowerCase();
                  const isRowSelected = selectedInteractionId === interactionId;
                  return (
                    <TableRow
                      key={interactionId || interaction?.threadId || Math.random()}
                      hover
                      selected={isRowSelected}
                      onClick={() => setSelectedInteractionId(interactionId)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {interactionId || '—'}
                      </TableCell>
                      <TableCell>{formatCreatedAt(interaction?.createdAt)}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: getStatusDotColor(statusValue),
                            }}
                          />
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {statusValue || '—'}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{interaction?.channelName || interaction?.channelId || '—'}</TableCell>
                      <TableCell>{interaction?.skillName || '—'}</TableCell>
                      <TableCell>
                        {assignee?.firstName || assignee?.email || 'Unassigned'}
                      </TableCell>
                      <TableCell onClick={(event) => event.stopPropagation()}>
                        {isAssignedToMe ? (
                          <Button
                            size="small"
                            onClick={() => hydrateDigitalContact(interactionId, true)}
                          >
                            Open Chat
                          </Button>
                        ) : hasAssignee ? (
                          <Typography variant="caption" color="text.secondary">
                            Already assigned
                          </Typography>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            —
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Typography variant="caption" color="text.secondary">
              {totalHits > 0
                ? `${rangeStart}–${rangeEnd} of ${totalHits}`
                : interactionSearchLoading
                  ? 'Loading…'
                  : '0 results'}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={handlePrevPage}
                disabled={interactionSearchLoading || pageIndex === 0}
              >
                Prev
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleNextPage}
                disabled={interactionSearchLoading || !nextScrollToken}
              >
                Next
              </Button>
            </Stack>
          </Stack>

          {digitalContacts.length === 0 ? (
            <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
              <InboxIcon sx={{ fontSize: 48, color: "text.disabled" }} />
              <Typography color="text.secondary">
                No digital contacts assigned to you yet.
              </Typography>
            </Stack>
          ) : (
            <>
              {/* Contact Cards */}
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                Active Contacts ({digitalContacts.length})
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                {digitalContacts.map((contact: any, index: any) => {
                  const isSelected = selectedDigitalContact.caseId === contact.caseId;
                  return (
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => onClickCaseId(contact)}
                      key={index}
                    >
                      <HorizontalCards selected={isSelected} contact={contact} />
                    </Box>
                  );
                })}
              </Stack>
            </>
          )}

          {selectedDigitalContact?.caseId && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Case ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>
                  {selectedDigitalContact?.caseId}
                </Typography>
              </Stack>

              {/* Messages Area */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  maxHeight: 350,
                  overflow: "auto",
                  backgroundColor: "#fafafa",
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  {(messages || []).length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No messages loaded for this interaction yet.
                    </Typography>
                  )}
                  {(messages || []).map((item: any, index: any) => {
                    const isInbound = item?.direction === "inbound";
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: isInbound ? "flex-start" : "flex-end",
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            px: 2,
                            py: 1,
                            maxWidth: "70%",
                            borderRadius: 2,
                            backgroundColor: isInbound ? "#e3f2fd" : "#1a237e",
                            color: isInbound ? "text.primary" : "#fff",
                          }}
                        >
                          <Typography variant="body2">{item.text}</Typography>
                        </Paper>
                      </Box>
                    );
                  })}
                </Stack>
              </Paper>

              {/* Reply Input */}
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  fullWidth
                  size="small"
                  placeholder={isReplyDisabled ? replyDisabledReason : 'Type a reply...'}
                  value={inputValue}
                  onChange={(e) => handleChange(e)}
                  disabled={isReplyDisabled}
                  helperText={replyDisabledReason || ''}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputValue && !isReplyDisabled) {
                      sendReply(e);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={sendReply}
                          color="primary"
                          disabled={!inputValue.trim() || isReplyDisabled}
                          size="small"
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
export default DigitalSdk;
