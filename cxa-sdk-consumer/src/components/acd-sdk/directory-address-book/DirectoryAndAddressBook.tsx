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
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
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
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import {
  AddressBooks,
  AddressBooksEntries,
  DirectoryEntities,
  DirectoryEntry,
  DirectoryResponse,
  SearchDirectoriesResponse,
} from '@nice-devone/common-sdk';
import { useEventLog } from '../../../context/EventLogContext';

const DEFAULT_PAGE_SIZE = 50;

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
  return {
    hasDynamicDirectory,
    hasSearchFn,
    hasResultSubject,
    apiFacadeBaseUri,
    hasAccessToken,
  };
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
  const { logEvent } = useEventLog();

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

  const directorySubRef = useRef<{ unsubscribe: () => void } | undefined>();
  const addressBookSubRef = useRef<{ unsubscribe: () => void } | undefined>();
  const hasAutoFiredRef = useRef(false);
  const hasDirectorySubscriptionRef = useRef(false);
  const hasAddressBookSubscriptionRef = useRef(false);
  // The dynamic-directory backend keys real-time updates by a subscriptionId
  // that comes back on the FIRST searchDirectoryResult event. We cache it and
  // reuse it on every subsequent searchDirectories() call (pagination, refine).
  const subscriptionIdRef = useRef<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [diag, setDiag] = useState(getDirectoryDiagnostics);

  // Refresh diagnostics every second so the chips reflect current SDK state.
  useEffect(() => {
    const id = window.setInterval(() => setDiag(getDirectoryDiagnostics()), 1000);
    return () => window.clearInterval(id);
  }, []);

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
      directorySubRef.current = dyn.searchDirectoryResult.subscribe(
        (response: SearchDirectoriesResponse & { subscriptionId?: string }) => {
          // Capture subscriptionId from the first response so follow-up calls
          // can reuse the same server-side subscription.
          const incomingSubId = (response as any)?.subscriptionId;
          if (incomingSubId && subscriptionIdRef.current !== incomingSubId) {
            subscriptionIdRef.current = incomingSubId;
            setSubscriptionId(incomingSubId);
          }
          logEvent({
            source: 'Directory',
            kind: 'event',
            name: 'searchDirectoryResult',
            data: {
              subscriptionId: incomingSubId ?? subscriptionIdRef.current,
              total: response?.totalRecords,
              count: response?.directoryEntries?.length,
              error: response?.error?.message,
            },
          });
          setDirectoryEntries(response?.directoryEntries ?? []);
          setDirectoryTotal(response?.totalRecords ?? 0);
          setDirectoryLoading(false);
          setDirectoryError(response?.error?.message ?? '');
        },
      );
    };

    const trySubscribeAddressBook = () => {
      if (cancelled) return;
      const directory: any = CXoneClient.instance?.directory;
      if (!directory?.directoryEvent?.subscribe) {
        window.setTimeout(trySubscribeAddressBook, 1000);
        return;
      }
      hasAddressBookSubscriptionRef.current = true;
      addressBookSubRef.current = directory.directoryEvent.subscribe(
        (response: DirectoryResponse) => {
          if (!response?.addressBookList) return;
          const books = response.addressBookList.data ?? [];
          const entries =
            response.addressBookList.allAddressBookEntries ??
            books.flatMap((book) => book.addressBooksEntries ?? []);
          setAddressBooks(books);
          setAddressBookEntries(entries);
          setAddressBookLoading(false);
          setAddressBookError(response.addressBookList.errorMsg ?? '');
          logEvent({
            source: 'Directory',
            kind: response.addressBookList.errorMsg ? 'error' : 'event',
            name: 'directoryEvent: addressBookList',
            data: {
              addressBooks: books.length,
              entries: entries.length,
              totalRecords: response.addressBookList.totalRecords,
              errorMsg: response.addressBookList.errorMsg,
            },
          });
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
      setDirectoryLoading(true);
      setAddressBookLoading(true);
      logEvent({
        source: 'Directory',
        kind: 'request',
        name: 'auto-fire: searchDirectories + getDirectoryData(ADDRESS_BOOK_LIST)',
        data: diagnostics,
      });
      try {
        const dyn: any = CXoneClient.instance?.directory?.dynamicDirectory;
        // First call: no subscriptionId yet, ask the backend to create one
        // and stream real-time updates. The id arrives on the result Subject
        // and is cached in subscriptionIdRef for subsequent calls.
        dyn?.searchDirectories?.({
          subscriptionId: subscriptionIdRef.current,
          searchString: '',
          realTimeUpdates: true,
          skip: 0,
          top: DEFAULT_PAGE_SIZE,
          directoryUUID: null,
          filter: { partnerType: null, fieldType: null },
        } as any);
      } catch (error) {
        logEvent({
          source: 'Directory',
          kind: 'error',
          name: 'auto-fire searchDirectories threw',
          data: error instanceof Error ? error.message : String(error),
        });
      }
      try {
        getAllAddressBooks(undefined, false)
          .then((response: AddressBooks[] | unknown) => {
            const books = Array.isArray(response) ? (response as AddressBooks[]) : [];
            const entries = books.flatMap((book) => book.addressBooksEntries ?? []);
            setAddressBooks(books);
            setAddressBookEntries(entries);
            setAddressBookLoading(false);
            setAddressBookError('');
            logEvent({
              source: 'Directory',
              kind: 'event',
              name: 'addressBookService.getAllAddressBooks: success',
              data: { addressBooks: books.length, entries: entries.length },
            });
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : String(error);
            setAddressBookLoading(false);
            setAddressBookError(message);
            logEvent({
              source: 'Directory',
              kind: 'error',
              name: 'addressBookService.getAllAddressBooks failed',
              data: message,
            });
          });
      } catch (error) {
        logEvent({
          source: 'Directory',
          kind: 'error',
          name: 'auto-fire getAllAddressBooks threw',
          data: error instanceof Error ? error.message : String(error),
        });
      }
    };
    autoFireId = window.setTimeout(tryAutoFire, 500);

    return () => {
      cancelled = true;
      hasDirectorySubscriptionRef.current = false;
      hasAddressBookSubscriptionRef.current = false;
      if (retryId !== undefined) window.clearTimeout(retryId);
      if (autoFireId !== undefined) window.clearTimeout(autoFireId);
      directorySubRef.current?.unsubscribe();
      addressBookSubRef.current?.unsubscribe();
    };
  }, [logEvent]);

  /**
   * Fetch external directories via dynamicDirectory.searchDirectories.
   */
  const searchExternalDirectory = (searchString?: string) => {
    const dyn: any = CXoneClient.instance?.directory?.dynamicDirectory;
    const diagnostics = getDirectoryDiagnostics();
    if (typeof dyn?.searchDirectories !== 'function') {
      setDirectoryError(
        'dynamicDirectory.searchDirectories is not available. Please complete authentication first.',
      );
      logEvent({
        source: 'Directory',
        kind: 'error',
        name: 'searchDirectories unavailable',
        data: diagnostics,
      });
      return;
    }
    if (!diagnostics.apiFacadeBaseUri) {
      setDirectoryError(
        'CXoneAuth.instance.getCXoneConfig().apiFacadeBaseUri is empty - the SDK cannot build the SearchDirectories URL. Log in via the User Hub flow first.',
      );
      logEvent({
        source: 'Directory',
        kind: 'error',
        name: 'searchDirectories blocked: missing apiFacadeBaseUri',
        data: diagnostics,
      });
      return;
    }
    if (!diagnostics.hasAccessToken) {
      setDirectoryError('CXoneAuth has no access token. Complete authentication first.');
      logEvent({
        source: 'Directory',
        kind: 'error',
        name: 'searchDirectories blocked: missing access token',
        data: diagnostics,
      });
      return;
    }
    setDirectoryLoading(true);
    setDirectoryError('');
    // Reuse cached subscriptionId on follow-up calls; pass null on the first
    // call so the backend allocates one and returns it on the result Subject.
    const request = {
      subscriptionId: subscriptionIdRef.current,
      searchString: searchString ?? '',
      realTimeUpdates: true,
      skip: 0,
      top: DEFAULT_PAGE_SIZE,
      directoryUUID: null,
      filter: { partnerType: null, fieldType: null },
    };
    logEvent({
      source: 'Directory',
      kind: 'request',
      name: 'dynamicDirectory.searchDirectories',
      data: { request, apiFacadeBaseUri: diagnostics.apiFacadeBaseUri },
    });
    try {
      dyn.searchDirectories(request as any);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setDirectoryLoading(false);
      setDirectoryError(message);
      logEvent({
        source: 'Directory',
        kind: 'error',
        name: 'searchDirectories threw',
        data: message,
      });
    }
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
    logEvent({
      source: 'Directory',
      kind: 'request',
      name: 'addressBookService.getAllAddressBooks',
      data: { includeEntries: false, searchText },
    });
    try {
      getAllAddressBooks(undefined, false)
        .then((response: AddressBooks[] | unknown) => {
          const books = Array.isArray(response) ? (response as AddressBooks[]) : [];
          const entries = books.flatMap((book) => book.addressBooksEntries ?? []);
          setAddressBooks(books);
          setAddressBookEntries(entries);
          setAddressBookLoading(false);
          setAddressBookError('');
          logEvent({
            source: 'Directory',
            kind: 'event',
            name: 'addressBookService.getAllAddressBooks: success',
            data: { addressBooks: books.length, entries: entries.length },
          });
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : String(error);
          setAddressBookLoading(false);
          setAddressBookError(message);
          logEvent({
            source: 'Directory',
            kind: 'error',
            name: 'addressBookService.getAllAddressBooks failed',
            data: message,
          });
        });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setAddressBookLoading(false);
      setAddressBookError(message);
      logEvent({
        source: 'Directory',
        kind: 'error',
        name: 'getAllAddressBooks threw',
        data: message,
      });
    }
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
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
          <Chip
            size="small"
            label={`dynamicDirectory: ${diag.hasDynamicDirectory ? 'init' : 'empty'}`}
            color={diag.hasDynamicDirectory ? 'success' : 'default'}
          />
          <Chip
            size="small"
            label={`searchDirectories fn: ${diag.hasSearchFn ? 'yes' : 'no'}`}
            color={diag.hasSearchFn ? 'success' : 'default'}
          />
          <Chip
            size="small"
            label={`result Subject: ${diag.hasResultSubject ? 'yes' : 'no'}`}
            color={diag.hasResultSubject ? 'success' : 'default'}
          />
          <Chip
            size="small"
            label={`auth token: ${diag.hasAccessToken ? 'set' : 'missing'}`}
            color={diag.hasAccessToken ? 'success' : 'warning'}
          />
          <Chip
            size="small"
            label={`apiFacadeBaseUri: ${diag.apiFacadeBaseUri || 'missing'}`}
            color={diag.apiFacadeBaseUri ? 'success' : 'warning'}
            sx={{ maxWidth: 420, '.MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
          />
          <Chip
            size="small"
            label={`subscriptionId: ${subscriptionId ?? 'pending'}`}
            color={subscriptionId ? 'success' : 'default'}
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
      </CardContent>
    </Card>
  );
};

export default DirectoryAndAddressBook;
