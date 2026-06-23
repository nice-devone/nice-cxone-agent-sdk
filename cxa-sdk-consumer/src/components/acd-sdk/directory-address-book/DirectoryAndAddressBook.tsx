/**
 * DirectoryAndAddressBook component renders inside the ACD SDK page and
 * demonstrates the two directory-related SDK surfaces:
 *
 * 1. External Directory (dynamic) - fetched via:
 *    `CXoneClient.instance.directory.dynamicDirectory.searchDirectories(searchReq)`
 *    Results arrive on:
 *    `CXoneClient.instance.directory.dynamicDirectory.searchDirectoryResult`
 *    (Subject<SearchDirectoriesResponse>).
 *
 * 2. Address Book - fetched via:
 *    `CXoneClient.instance.directory.getDirectoryData({ entity: [ADDRESS_BOOK_LIST], ... })`
 *    Results arrive on:
 *    `CXoneClient.instance.directory.directoryEvent` (Subject<DirectoryResponse>).
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupIcon from '@mui/icons-material/Group';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import {
  AddressBooks,
  AddressBooksEntries,
  AgentStateResponse,
  DirectoryEntities,
  DirectoryEntry,
  DirectoryResponse,
  SearchDirectoriesRequest,
  SearchDirectoriesResponse,
} from '@nice-devone/common-sdk';
import { ACDSessionManager, Logger } from '@nice-devone/core-sdk';


// SDK Logger
const logger = new Logger('SDK-CONSUMER', 'DirectoryAndAddressBook');
const DEFAULT_PAGE_SIZE = 50;
// Agent directory fetches the full matched set so every matching agent appears in
// one list (the SDK slices by offset/limit; a high limit returns everything).
const AGENT_FETCH_LIMIT = 1000;
// Agent-directory polling runs through a Web Worker. A long interval makes it an
// effectively one-shot poll, and we call terminateDirectoryPolling() once the
// filtered result arrives so a later poll tick cannot overwrite the
// getFilteredAgentList output rendered in the table.
const AGENT_POLL_INTERVAL_MS = 600000;

// The published common-sdk AgentStateResponse type may not yet declare `email`
// (added alongside the v34 agent-state endpoint). The runtime object still carries
// it, so read it through this widened type to render the column without coupling to
// a specific SDK build.
type AgentWithEmail = AgentStateResponse & { email?: string | null };

/**
 * Snapshot of the dynamic-directory readiness state. The SDK silently drops
 * `searchDirectories()` calls if `CXoneAuth.instance.getCXoneConfig()` has no
 * `apiFacadeBaseUri` or no access token, so we surface those values here.
 */
const getDirectoryDiagnostics = () => {
  let hasDynamicDirectory = false;
  let hasSearchFn = false;
  let hasResultSubject = false;
  try {
    const dyn: any = CXoneClient.instance?.directory?.dynamicDirectory;
    hasDynamicDirectory = !!dyn && Object.keys(dyn).length > 0;
    hasSearchFn = typeof dyn?.searchDirectories === 'function';
    hasResultSubject = !!dyn?.searchDirectoryResult?.subscribe;
  } catch {
    /* not ready */
  }
  let apiFacadeBaseUri = '';
  let hasAccessToken = false;
  try {
    const config = CXoneAuth.instance?.getCXoneConfig?.();
    apiFacadeBaseUri = config?.apiFacadeBaseUri ?? '';
    const token = CXoneAuth.instance?.getAuthToken?.();
    hasAccessToken = !!token?.accessToken;
  } catch {
    /* auth not initialised */
  }
  // The agent-state poll inside the SDK reads its base URI + token from
  // ACDSessionManager (NOT CXoneAuth). Surface that instance's state so a missing
  // ACD session - the usual reason the agent poll silently fires nothing - is visible.
  let acdBaseUri = '';
  let acdHasToken = false;
  try {
    const session: any = ACDSessionManager.instance;
    acdBaseUri = session?.cxOneConfig?.acdApiBaseUri || session?.cxOneConfig?.apiFacadeBaseUri || '';
    acdHasToken = !!session?.accessToken;
  } catch {
    /* ACD session not initialised */
  }
  return {
    hasDynamicDirectory,
    hasSearchFn,
    hasResultSubject,
    apiFacadeBaseUri,
    hasAccessToken,
    acdBaseUri,
    acdHasToken,
  };
};

/**
 * The agent-directory poll inside the SDK (CXoneDirectoryProvider.requestDirectoryData)
 * reads its base URL + token from ACDSessionManager (NOT CXoneAuth) and is gated by
 * `if (this.baseUri && authToken)`, so it silently fires nothing when those are empty.
 * ACDSessionManager is only populated when a full ACD session starts
 * (CXoneSession.initialize). The address book / dynamic directory work because they
 * read from CXoneAuth, which is ready right after login. For this verification harness
 * we seed ACDSessionManager the same way CXoneSession does - from CXoneAuth/CXoneUser -
 * so getDirectoryData(AGENT_LIST) can reach the agent-state API without first starting
 * a session. Returns true when ACDSessionManager has a usable base URI + access token.
 */
const ensureAcdSessionInitialized = (): boolean => {
  try {
    const session: any = ACDSessionManager.instance;
    const isReady = () =>
      !!(session?.cxOneConfig?.acdApiBaseUri || session?.cxOneConfig?.apiFacadeBaseUri) &&
      !!session?.accessToken;
    if (isReady()) return true;
    const config: any = CXoneAuth.instance?.getCXoneConfig?.() ?? {};
    const accessToken = CXoneAuth.instance?.getAuthToken?.()?.accessToken ?? '';
    const baseUri = config?.apiFacadeBaseUri || config?.acdApiBaseUri;
    if (baseUri && accessToken) {
      const userInfo = CXoneUser.instance?.getUserInfo?.() ?? {};
      // Mirrors CXoneSession's `acdSessionManager.initialize(accessToken, config, userInfo)`.
      session.initialize(accessToken, config, userInfo);
      logger.info('seeded ACDSessionManager for agent directory poll', '');
    }
    return isReady();
  } catch (error) {
    logger.error('ensureAcdSessionInitialized failed', '');
    return false;
  }
};

/**
 * Pulls a value out of a DirectoryEntry's flat attribute array by fieldType.
 * Returns the first match (case-insensitive) or an empty string.
 */
const getAttr = (entry: DirectoryEntry, fieldType: string): string => {
  const attr = entry.attributes?.find(
    (item) => item.fieldType?.toLowerCase() === fieldType.toLowerCase(),
  );
  return attr?.value ?? '';
};

const buildDisplayName = (entry: DirectoryEntry): string => {
  const first = getAttr(entry, 'firstName') || getAttr(entry, 'firstname');
  const last = getAttr(entry, 'lastName') || getAttr(entry, 'lastname');
  const display = getAttr(entry, 'displayName') || getAttr(entry, 'name');
  const composed = `${first} ${last}`.trim();
  return display || composed || entry.userMappingId;
};

const DirectoryAndAddressBook: React.FC = () => {


  // External directory state
  const [directoryLoading, setDirectoryLoading] = useState(false);
  const [directoryError, setDirectoryError] = useState<string>('');
  const [directoryEntries, setDirectoryEntries] = useState<DirectoryEntry[]>([]);
  const [directoryTotal, setDirectoryTotal] = useState<number>(0);
  const [directorySearch, setDirectorySearch] = useState('');

  // Address book state
  const [addressBookLoading, setAddressBookLoading] = useState(false);
  const [addressBookError, setAddressBookError] = useState<string>('');
  const [addressBooks, setAddressBooks] = useState<AddressBooks[]>([]);
  const [addressBookEntries, setAddressBookEntries] = useState<AddressBooksEntries[]>([]);
  const [addressBookSearch, setAddressBookSearch] = useState('');

  // Agent directory state - exercises the public getDirectoryData path that runs
  // searchDirectoryData -> getFilteredAgentList inside the SDK.
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState<string>('');
  const [agentEntries, setAgentEntries] = useState<AgentStateResponse[]>([]);
  const [agentTotal, setAgentTotal] = useState<number>(0);
  const [agentSearch, setAgentSearch] = useState('');
  const [shouldFetchAllAgents, setShouldFetchAllAgents] = useState(false);

  const directorySubRef = useRef<{ unsubscribe: () => void } | undefined>();
  const addressBookSubRef = useRef<{ unsubscribe: () => void } | undefined>();
  const hasAutoFiredRef = useRef(false);
  const hasDirectorySubscriptionRef = useRef(false);
  const hasAddressBookSubscriptionRef = useRef(false);
  // Agent-directory orchestration. getFilteredAgentList only runs on a SEARCH
  // request AFTER AGENT_LIST has been polled, so each fetch polls first (step 1)
  // then fires the search (step 2). These refs drive that two-step chain and a
  // watchdog that recovers if the worker never responds.
  const agentActiveRef = useRef(false);
  const agentPolledRef = useRef(false);
  const pendingAgentSearchRef = useRef<{ term: string; all: boolean } | null>(null);
  const agentWatchdogRef = useRef<number | undefined>();
  // CMA keeps the external-directory subscriptionId in state starting empty, then
  // reuses whatever the searchDirectoryResult response returns on follow-up calls.
  const subscriptionIdRef = useRef<string>('');
  // ACD-session diagnostics for the Agent Directory section's status chips.
  const [diag, setDiag] = useState(getDirectoryDiagnostics);

  // Keep ACDSessionManager seeded from CXoneAuth so the agent-state poll can fire
  // (initAcdEngagement seeds it once at mount, but may run before auth resolves).
  useEffect(() => {
    const id = window.setInterval(() => {
      ensureAcdSessionInitialized();
      setDiag(getDirectoryDiagnostics());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  /**
   * Issue a directory.getDirectoryData() request scoped to AGENT_LIST. An empty
   * searchText performs the poll (step 1); a non-empty one performs the search
   * (step 2) that the SDK routes through searchDirectoryData -> getFilteredAgentList.
   */
  const issueAgentDirectoryRequest = (searchText: string, all: boolean) => {
    const directory: any = CXoneClient.instance?.directory;
    // The published SDK's CXoneDirectory wrapper takes a SINGLE DirectoryRequest
    // object (it reads .entity / .searchText / .pollingOptions off it). Passing
    // positional args makes the array become the request object, so searchText is
    // dropped and the SDK returns every agent instead of the filtered subset.
    //
    // isPolling MUST be false: the directory worker schedules a polling request
    // with setInterval(fn, pollingInterval), which waits a full interval before
    // the FIRST fetch. With isPolling:false it does an immediate one-shot fetch,
    // so the result arrives well within the watchdog window.
    directory?.getDirectoryData?.({
      entity: [DirectoryEntities.AGENT_LIST],
      pollingOptions: { isPolling: false, pollingInterval: AGENT_POLL_INTERVAL_MS },
      offset: 1,
      limit: AGENT_FETCH_LIMIT,
      searchText,
      shouldFetchAllAgents: all,
    });
  };

  /**
   * Tear down a finished agent-directory operation: stop the worker poll, clear
   * the watchdog and reset the chain refs/loading flag.
   */
  const finishAgentOp = () => {
    agentActiveRef.current = false;
    agentPolledRef.current = false;
    pendingAgentSearchRef.current = null;
    if (agentWatchdogRef.current !== undefined) {
      window.clearTimeout(agentWatchdogRef.current);
      agentWatchdogRef.current = undefined;
    }
    setAgentLoading(false);
    const directory: any = CXoneClient.instance?.directory;
    directory?.terminateDirectoryPolling?.();
  };

  /**
   * Subscribe to the dynamic-directory result Subject as soon as it becomes
   * available. The Subject is created by `new CXoneDynamicDirectory()` which
   * runs inside `CXoneClient.initAuthDependentModules()` after auth succeeds.
   */
  useEffect(() => {
    let cancelled = false;
    let retryId: number | undefined;

    const trySubscribeDirectory = () => {
      if (cancelled) return;
      const dyn: any = CXoneClient.instance?.directory?.dynamicDirectory;
      if (!dyn?.searchDirectoryResult?.subscribe) {
        retryId = window.setTimeout(trySubscribeDirectory, 1000);
        return;
      }
      hasDirectorySubscriptionRef.current = true;
      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      // Mirrors CMA's externalDirectorySearchMiddleware: read directoryEntries,
      // subscriptionId and totalRecords straight off each result and reuse the
      // subscriptionId on the next searchDirectories() call.
      directorySubRef.current = dyn.searchDirectoryResult.subscribe(
        (response: SearchDirectoriesResponse) => {
          logger.info('searchDirectoryResult', '');
          setDirectoryEntries(response?.directoryEntries ?? []);
          setDirectoryTotal(response?.totalRecords ?? 0);
          subscriptionIdRef.current = response?.subscriptionId ?? subscriptionIdRef.current;
          setDirectoryLoading(false);
          setDirectoryError(response?.error?.message ?? '');
        },
      );
      // CMA loads the external directory when its tab opens; do the same once the
      // result Subject exists (auth + apiFacadeBaseUri are ready by then).
      searchExternalDirectory('');
    };

    const trySubscribeAddressBook = () => {
      if (cancelled) return;
      const directory: any = CXoneClient.instance?.directory;
      if (!directory?.directoryEvent?.subscribe) {
        window.setTimeout(trySubscribeAddressBook, 1000);
        return;
      }
      hasAddressBookSubscriptionRef.current = true;
      // Subscribe only once — re-subscribing on re-render would duplicate handlers.
      // This single directoryEvent stream carries every getDirectoryData entity
      // (addressBookList AND agentList), so we update each table independently and
      // guard against an empty list from one entity clobbering another's results.
      addressBookSubRef.current = directory.directoryEvent.subscribe(
        (response: DirectoryResponse) => {
          // Address book — only update when this response actually carries address
          // book data/error (dormant unless a getDirectoryData ADDRESS_BOOK poll runs).
          const abData = response?.addressBookList?.data;
          const abError = response?.addressBookList?.errorMsg;
          if ((abData && abData.length) || abError) {
            const books = abData ?? [];
            const entries =
              response.addressBookList.allAddressBookEntries ??
              books.flatMap((book) => book.addressBooksEntries ?? []);
            setAddressBooks(books);
            setAddressBookEntries(entries);
            setAddressBookLoading(false);
            setAddressBookError(abError ?? '');
            (abError ? logger.error.bind(logger) : logger.info.bind(logger))(
              'directoryEvent: addressBookList',
              '',
            );
          }

          // Agent list — getDirectoryData -> searchDirectoryData -> getFilteredAgentList.
          if (agentActiveRef.current && response?.agentList) {
            const agentData = response.agentList.data ?? [];
            setAgentEntries(agentData);
            setAgentTotal(
              response.agentList.totalSearchMatchRecords ??
                response.agentList.allAgentCount ??
                agentData.length,
            );
            setAgentError(response.agentList.errorMsg ?? '');

            const pending = pendingAgentSearchRef.current;
            if (!agentPolledRef.current) {
              // Step 1 (poll) just completed.
              agentPolledRef.current = true;
              if (pending?.term) {
                // Defer to the next macrotask so the provider's entityPollingFlag
                // (set after requestDirectoryData resolves) is in place before the
                // search is evaluated — otherwise it would poll again instead of
                // routing through getFilteredAgentList.
                window.setTimeout(() => {
                  logger.info('agent search (step 2) -> getFilteredAgentList', '');
                  issueAgentDirectoryRequest(pending.term, pending.all);
                }, 150);
              } else {
                // No search term — nothing to filter; keep the polled list.
                logger.info('agent poll only (no search term)', '');
                finishAgentOp();
              }
            } else {
              // Step 2 (search) result — this IS the getFilteredAgentList output.
              logger.info('agent search result received', '');
              finishAgentOp();
            }
          }
        },
      );
    };

    trySubscribeDirectory();
    trySubscribeAddressBook();

    // Auto-fire both fetches once the SDK is fully ready. Calls go directly
    // through the SDK so the tables populate without a manual click.
    let autoFireId: number | undefined;
    const tryAutoFire = () => {
      if (cancelled) return;
      if (hasAutoFiredRef.current) return;
      const diagnostics = getDirectoryDiagnostics();
      const directory: any = CXoneClient.instance?.directory;
      const getAllAddressBooks = directory?.addressBookService?.getAllAddressBooks?.bind(
        directory?.addressBookService,
      );
      if (
        !hasDirectorySubscriptionRef.current ||
        !diagnostics.hasSearchFn ||
        !diagnostics.hasAccessToken ||
        !diagnostics.apiFacadeBaseUri ||
        typeof getAllAddressBooks !== 'function'
      ) {
        autoFireId = window.setTimeout(tryAutoFire, 1000);
        return;
      }
      hasAutoFiredRef.current = true;
      setAddressBookLoading(true);
      logger.info('auto-fire: getDirectoryData(ADDRESS_BOOK_LIST)', '');
      try {
        getAllAddressBooks(undefined, false)
          .then((response: AddressBooks[] | unknown) => {
            const books = Array.isArray(response) ? (response as AddressBooks[]) : [];
            const entries = books.flatMap((book) => book.addressBooksEntries ?? []);
            setAddressBooks(books);
            setAddressBookEntries(entries);
            setAddressBookLoading(false);
            setAddressBookError('');
            logger.info('addressBookService.getAllAddressBooks: success', '');
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : String(error);
            setAddressBookLoading(false);
            setAddressBookError(message);
            logger.error('addressBookService.getAllAddressBooks failed', '');
          });
      } catch (error) {
        logger.error('auto-fire getAllAddressBooks threw', '');
      }
      // Populate the agent directory on first load too (empty term = full list).
      fetchAgentDirectory('');
    };
    autoFireId = window.setTimeout(tryAutoFire, 500);

    return () => {
      cancelled = true;
      hasDirectorySubscriptionRef.current = false;
      hasAddressBookSubscriptionRef.current = false;
      if (retryId !== undefined) window.clearTimeout(retryId);
      if (autoFireId !== undefined) window.clearTimeout(autoFireId);
      if (agentWatchdogRef.current !== undefined) window.clearTimeout(agentWatchdogRef.current);
      directorySubRef.current?.unsubscribe();
      addressBookSubRef.current?.unsubscribe();
    };
  }, []);

  /**
   * Fetch external directories via dynamicDirectory.searchDirectories.
   */
  const searchExternalDirectory = (searchString?: string) => {
    setDirectoryLoading(true);
    setDirectoryError('');
    // Exactly CMA's ccf-directory slice request: subscriptionId (empty on the
    // first call, reused thereafter), searchString, realTimeUpdates, skip, top,
    // directoryUUID. Results arrive on the searchDirectoryResult subscription.
    const searchReq: SearchDirectoriesRequest = {
      subscriptionId: subscriptionIdRef.current,
      searchString: searchString ?? '',
      realTimeUpdates: true,
      skip: 0,
      top: DEFAULT_PAGE_SIZE,
      directoryUUID: '',
    };
    logger.info('dynamicDirectory.searchDirectories', '');
    CXoneClient.instance.directory.dynamicDirectory.searchDirectories(searchReq);
  };

  /**
   * Fetch the address book entries via the classic directory polling API.
   */
  const fetchAddressBook = (searchText?: string) => {
    const directory: any = CXoneClient.instance?.directory;
    const getAllAddressBooks = directory?.addressBookService?.getAllAddressBooks?.bind(
      directory?.addressBookService,
    );
    if (typeof getAllAddressBooks !== 'function') {
      setAddressBookError(
        'directory.addressBookService.getAllAddressBooks is not available. Please complete authentication first.',
      );
      return;
    }
    setAddressBookLoading(true);
    setAddressBookError('');
    logger.info('addressBookService.getAllAddressBooks', '');
    try {
      getAllAddressBooks(undefined, false)
        .then((response: AddressBooks[] | unknown) => {
          const books = Array.isArray(response) ? (response as AddressBooks[]) : [];
          const entries = books.flatMap((book) => book.addressBooksEntries ?? []);
          setAddressBooks(books);
          setAddressBookEntries(entries);
          setAddressBookLoading(false);
          setAddressBookError('');
          logger.info('addressBookService.getAllAddressBooks: success', '');
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : String(error);
          setAddressBookLoading(false);
          setAddressBookError(message);
          logger.error('addressBookService.getAllAddressBooks failed', '');
        });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setAddressBookLoading(false);
      setAddressBookError(message);
      logger.error('getAllAddressBooks threw', '');
    }
  };

  /**
   * Verify getFilteredAgentList by driving the public getDirectoryData path:
   * step 1 polls AGENT_LIST (so the SDK caches it and marks it polled), then the
   * directoryEvent handler fires step 2 (the search) which the SDK routes through
   * searchDirectoryData -> getFilteredAgentList. Results arrive on directoryEvent.
   */
  const fetchAgentDirectory = (term: string) => {
    const directory: any = CXoneClient.instance?.directory;
    const diagnostics = getDirectoryDiagnostics();
    if (typeof directory?.getDirectoryData !== 'function') {
      setAgentError(
        'directory.getDirectoryData is not available. Please complete authentication first.',
      );
      logger.error('getDirectoryData unavailable', '');
      return;
    }
    if (!diagnostics.hasAccessToken) {
      setAgentError('CXoneAuth has no access token. Complete authentication first.');
      logger.error('agent fetch blocked: missing access token', '');
      return;
    }
    // The agent-state poll reads baseUri/token from ACDSessionManager, which is only
    // populated by a full ACD session. Seed it from CXoneAuth so the API can fire here;
    // if it still can't be initialised, surface that instead of a silent no-op.
    if (!ensureAcdSessionInitialized()) {
      setAgentError(
        'Agent directory polling needs an active ACD session: ACDSessionManager has no ' +
          'acdApiBaseUri/accessToken and could not be seeded from CXoneAuth. Start the ACD ' +
          'session first (or finish logging in), then try again.',
      );
      logger.error('agent fetch blocked: ACD session not initialised', '');
      return;
    }
    setAgentLoading(true);
    setAgentError('');
    setAgentEntries([]);
    setAgentTotal(0);
    agentActiveRef.current = true;
    agentPolledRef.current = false;
    pendingAgentSearchRef.current = { term: term.trim(), all: shouldFetchAllAgents };
    // Watchdog: if the polling worker never responds (e.g. auth/base-uri missing),
    // surface an error instead of spinning forever.
    if (agentWatchdogRef.current !== undefined) {
      window.clearTimeout(agentWatchdogRef.current);
    }
    agentWatchdogRef.current = window.setTimeout(() => {
      if (agentActiveRef.current) {
        const d = getDirectoryDiagnostics();
        setAgentError(
          `No agent directory response after 15s. ACDSessionManager baseUri=${d.acdBaseUri || 'missing'}, ` +
            `token=${d.acdHasToken ? 'set' : 'missing'}. If both are set, the agent-state poll fired but ` +
            `returned no data; if either is missing, start the ACD session (or finish login) first.`,
        );
        finishAgentOp();
      }
    }, 15000);
    logger.info('agent poll (step 1) -> getDirectoryData(AGENT_LIST)', '');
    issueAgentDirectoryRequest('', shouldFetchAllAgents);
  };

  const filteredAddressBookEntries = useMemo(() => {
    const term = addressBookSearch.trim().toLowerCase();
    if (!term) return addressBookEntries;
    return addressBookEntries.filter((entry) => {
      const haystack = [entry.firstName, entry.lastName, entry.email, entry.phone, entry.mobile]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [addressBookEntries, addressBookSearch]);

  const filteredAddressBooks = useMemo(() => {
    const term = addressBookSearch.trim().toLowerCase();
    if (!term) return addressBooks;
    return addressBooks.filter((book) => {
      const haystack = [
        book.addressBookName,
        book.addressBookType,
        String(book.addressBookId ?? ''),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [addressBooks, addressBookSearch]);

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <GroupIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Directory & Address Book
          </Typography>
        </Stack>

        {/* External Directory (dynamic) */}
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
          External Directory (dynamicDirectory.searchDirectories)
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ sm: 'center' }}
          sx={{ mb: 2 }}
        >
          <TextField
            size="small"
            label="Search directories"
            placeholder="First name, last name, or email"
            value={directorySearch}
            onChange={(event) => setDirectorySearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') searchExternalDirectory(directorySearch);
            }}
            sx={{ minWidth: { xs: '100%', sm: 320 } }}
          />
          <Button
            variant="contained"
            startIcon={
              directoryLoading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />
            }
            disabled={directoryLoading}
            onClick={() => searchExternalDirectory(directorySearch)}
          >
            Search
          </Button>
          <Chip
            size="small"
            label={`Results: ${directoryEntries.length}${directoryTotal ? ` / ${directoryTotal}` : ''}`}
            variant="outlined"
            color="primary"
          />
        </Stack>

        {directoryError && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {directoryError}
          </Typography>
        )}

        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Partner</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directoryEntries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No directory entries. Enter a search term and click Search.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {directoryEntries.map((entry) => {
                const partnerType =
                  entry.attributes?.[0]?.partnerType ?? '';
                return (
                  <TableRow key={entry.userMappingId} hover>
                    <TableCell>{buildDisplayName(entry)}</TableCell>
                    <TableCell>{getAttr(entry, 'email')}</TableCell>
                    <TableCell>
                      {getAttr(entry, 'phone') ||
                        getAttr(entry, 'mobile') ||
                        getAttr(entry, 'phoneNumber')}
                    </TableCell>
                    <TableCell>{partnerType}</TableCell>
                    <TableCell>{entry.unifiedStatus ?? ''}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ mb: 2 }} />

        {/* Address Book */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <ContactPhoneIcon color="primary" />
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Address Book (directory.getDirectoryData)
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ sm: 'center' }}
          sx={{ mb: 2 }}
        >
          <TextField
            size="small"
            label="Filter address book"
            placeholder="Name, email, phone"
            value={addressBookSearch}
            onChange={(event) => setAddressBookSearch(event.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 320 } }}
          />
          <Button
            variant="contained"
            startIcon={
              addressBookLoading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon />
            }
            disabled={addressBookLoading}
            onClick={() => fetchAddressBook()}
          >
            Fetch Address Book
          </Button>
          <Chip
            size="small"
            label={`Books: ${addressBooks.length}`}
            variant="outlined"
            color="primary"
          />
          <Chip
            size="small"
            label={`Entries: ${filteredAddressBookEntries.length} / ${addressBookEntries.length}`}
            variant="outlined"
            color="primary"
          />
        </Stack>

        {addressBookError && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {addressBookError}
          </Typography>
        )}

        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          Address Books
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Address Book</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Embedded Entries</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAddressBooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No address books received yet. Click "Fetch Address Book" to load.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {filteredAddressBooks.map((book) => (
                <TableRow key={String(book.addressBookId)} hover>
                  <TableCell>{book.addressBookName ?? '—'}</TableCell>
                  <TableCell>{book.addressBookType ?? '—'}</TableCell>
                  <TableCell>{book.addressBookId ?? '—'}</TableCell>
                  <TableCell>{book.addressBooksEntries?.length ?? 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ mb: 2 }} />

        {/* Agent Directory — exercises getDirectoryData -> getFilteredAgentList */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <PersonSearchIcon color="primary" />
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Agent Directory (getDirectoryData → getFilteredAgentList)
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ display: 'block', mb: 1.5, color: 'text.secondary' }}>
          Search agents by name or email. The SDK first polls AGENT_LIST, then runs the
          search through getFilteredAgentList (which matches first/last name and email).
          Enable "All agents" to include the logged-in user (the shouldFetchAllAgents flag).
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
          <Chip
            size="small"
            label={`ACD session token: ${diag.acdHasToken ? 'set' : 'missing'}`}
            color={diag.acdHasToken ? 'success' : 'warning'}
          />
          <Chip
            size="small"
            label={`ACD session baseUri: ${diag.acdBaseUri || 'missing'}`}
            color={diag.acdBaseUri ? 'success' : 'warning'}
            sx={{ maxWidth: 420, '.MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ sm: 'center' }}
          sx={{ mb: 2 }}
        >
          <TextField
            size="small"
            label="Search agents"
            placeholder="Name or email"
            value={agentSearch}
            onChange={(event) => setAgentSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') fetchAgentDirectory(agentSearch);
            }}
            sx={{ minWidth: { xs: '100%', sm: 320 } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={shouldFetchAllAgents}
                onChange={(event) => setShouldFetchAllAgents(event.target.checked)}
              />
            }
            label="All agents"
          />
          <Button
            variant="contained"
            startIcon={
              agentLoading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />
            }
            disabled={agentLoading}
            onClick={() => fetchAgentDirectory(agentSearch)}
          >
            Search Agents
          </Button>
          <Chip
            size="small"
            label={`Results: ${agentEntries.length}${agentTotal ? ` / ${agentTotal}` : ''}`}
            variant="outlined"
            color="primary"
          />
        </Stack>

        {agentError && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {agentError}
          </Typography>
        )}

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentEntries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No agents loaded. Enter a search term and click "Search Agents".
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {agentEntries.map((agent) => (
                <TableRow key={agent.agentId} hover>
                  <TableCell>
                    {`${agent.firstName ?? ''} ${agent.lastName ?? ''}`.trim() || '—'}
                  </TableCell>
                  <TableCell>{(agent as AgentWithEmail).email ?? '—'}</TableCell>
                  <TableCell>{agent.skillName ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DirectoryAndAddressBook;
