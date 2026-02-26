import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Paper, Box, useTheme, } from '@mui/material';
import { useEffect, useState, memo, useCallback, useRef } from 'react';
import { selectAgentList, selectAgentLoadingStatus, selectSkillsLoadingStatus, selectTeamsLoadingStatus, selectSearchBoxQueryValue, selectSkillsValue, startAgentTeamPolling, selectDropDownQueryValue, selectTeamsValue, DirectoryDropdownValues, stopEveryPolling, startActivityPolling, agentDirectoryActions, isDrillDownEnabled, isLoadingAgentsForTeam, getAgentFavorites, getTeamFavorites, getSkillFavorites, getDigitalSkillFavorites, favoriteAgentsList, favoriteTeamsList, favoriteStandardAddressBookList, favoriteSkillsList, favoriteDigitalSkillsList, getExternalDirectories, selectDirectoryEntries, selectExternalEntriesLoadingStatus, getCurrentTeam, selectExternalDirectoryState, totalAgentsSearchMatchRecords, totalTeamsSearchMatchRecords, totalSkillsSearchMatchRecords, totalDigitalSkillsSearchMatchRecords, selectExternalDirectorySubscriptionId, selectExternalDirectoryDrillDown, totalExternalDirectoryRecordCount, selectDigitalSkillsValue, selectCurrentDrillDownEntry, checkExtenalDirectoryEnabled, DirectorySearchRecord, selectEmptySearchState, noAgentDataFound, noTeamDataFound, selectAllAgentCount, selectAllTeamCount, noSkillDataFound, selectAllSkillCount, standardBookNames, standardAddressBooks, standardAddressBookEntriesMoreDetails, standardBookEntries, totalAddressBookMatchRecordsCount, isAddressBookRecordLoading, standardAddressBookEntries, selectAllAddressBookCount, noStandardEntriesAllData, getAllSkills, getSkillList, getClientDataApiFailedToast, getCurrentFavsInDirectory, getAddressBookFavorites, favoriteExtDirectoryEntriesList, getFavoritesToastReference, } from './+state/ccf-directory.slice';
import { useDispatch, useSelector } from 'react-redux';
import { CcfDirectorySelect } from './ccf-directory-select/ccf-directory-select';
import CcfDirectoryAgent from './ccf-directory-agent/ccf-directory-agent';
import { CcfAppToastMessage, CcfLoader, CcfSwitchButton, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import DirectorySkills from './ccf-skill-list/ccf-skill-list';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import CcfDirectoryTeams from './ccf-team-list/ccf-team-list';
import CcfOutboundOptions from '../ccf-outbound-options/ccf-outbound-options';
import { CcfDirectoryItemUserSection } from './ccf-directory-item/ccf-directory-item-user-section';
import { CcfDirectorySearch } from './ccf-directory-search/ccf-directory-search';
import CcfDrilldownAgents from './ccf-drilldown-agents/ccf-drilldown-agents';
import { currentUserAgentId, getFavoritesStatesToastReference, userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
import CcfDirectoryEntries from './ccf-directory-entries/ccf-directory-entries';
import CcfDirectoryEntryDetails from './ccf-directory-entries-details/ccf-directory-entries-details';
import { CcfAssignmentAction, getIsExternalDirectoryTransfer, getNonIncomingActiveContactInSelectedInteraction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { MediaType, MediaTypeId } from '@nice-devone/common-sdk';
import { getIsDigitalContactTransferBtnClicked, getIsOutboundBtnClicked, getIsVoiceContactTransferBtnClicked, getDomVisibility, getToastMsg, globalActions } from '../global.app.slice';
import directoryStyles from './ccf-directory-view.styles';
import { ToastContainer, toast } from 'react-toastify';
import CcfStandardAddressBook from './ccf-standard-address-book/ccf-standard-address-book-entries';
import { useCcfComponentWidth } from '../../hooks/useCcfComponentWidth';
import { getAppspaceResolution, setAppspaceResolution } from '../ccf-app-space/ccf-app-space.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component for ccf directory
 * @param props - CcfDirectoryProps
 * @example - <CcfDirectory />
 * @returns
 */
export function CcfDirectory(props) {
    var _a;
    const theme = useTheme();
    const classes = directoryStyles(theme);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const allTeams = useSelector(selectTeamsValue);
    const allAgentList = useSelector(selectAgentList);
    const favoriteAgents = useSelector(favoriteAgentsList);
    const favoriteTeams = useSelector(favoriteTeamsList);
    const favoriteExtDirectoryEntries = useSelector(favoriteExtDirectoryEntriesList);
    const favoriteStandardAddressBooks = useSelector(favoriteStandardAddressBookList);
    const favoriteSkills = useSelector(favoriteSkillsList);
    const favoriteDigitalSkills = useSelector(favoriteDigitalSkillsList);
    const ACDSkills = useSelector(selectSkillsValue);
    const digitalSkills = useSelector(selectDigitalSkillsValue);
    const directoryEntries = useSelector(selectDirectoryEntries);
    const agentLoadingStatus = useSelector(selectAgentLoadingStatus);
    const externalDirectoryLoadingStatus = useSelector(selectExternalEntriesLoadingStatus);
    const skillsLoadingStatus = useSelector(selectSkillsLoadingStatus);
    const teamsLoadingStatus = useSelector(selectTeamsLoadingStatus);
    const loadingAgentsForTeam = useSelector(isLoadingAgentsForTeam);
    const isAddressBookDataLoading = useSelector(isAddressBookRecordLoading);
    const agentId = useSelector(currentUserAgentId);
    const userInfo = useSelector(userInfoSelector);
    const externalDirectories = useSelector(getExternalDirectories);
    const externalDirectoryState = useSelector(selectExternalDirectoryState);
    const externalDirectorySubscriptionId = useSelector(selectExternalDirectorySubscriptionId);
    const emptySearchFlg = useSelector(selectEmptySearchState);
    const selectedDrillDownEntry = useSelector(selectCurrentDrillDownEntry);
    const isDigitalContactTransferBtnClicked = useSelector(getIsDigitalContactTransferBtnClicked);
    const isVoiceContactTransferBtnClicked = useSelector(getIsVoiceContactTransferBtnClicked);
    const loading = agentLoadingStatus || skillsLoadingStatus || teamsLoadingStatus || loadingAgentsForTeam || isAddressBookDataLoading || externalDirectoryLoadingStatus;
    const [agentList, setAgentList] = useState(allAgentList);
    const [prevAgentList, setPrevAgentList] = useState(agentList === null || agentList === void 0 ? void 0 : agentList[0]);
    const [searchContact, updateSearchContact] = useState('');
    const [selectedStandardAddressBook, updateSelectedStandardAddressBook] = useState([]);
    const searchBoxQuery = useSelector(selectSearchBoxQueryValue);
    const includeExternalDir = translate('includeExternalDir');
    const [currentUser, setCurrentUser] = useState(agentList === null || agentList === void 0 ? void 0 : agentList[0]);
    const isFullViewDirectory = false;
    const selectedQueryValue = useSelector(selectDropDownQueryValue);
    const totalRecordsLimit = DirectorySearchRecord.DirectoryCount;
    const [externalDirectoryChecked, setChecked] = useState(externalDirectoryState);
    const [offsetIndexForAgent, setOffsetIndexForAgent] = useState(1);
    const [offsetIndexForTeam, setOffsetIndexForTeam] = useState(1);
    const [offsetIndexForSkill, setOffsetIndexForSkill] = useState(1);
    const [offsetExternalDirectoryIndex, setOffsetExternalDirectoryIndex] = useState(0);
    const [offsetAddressBookIndex, setOffsetAddressBookIndex] = useState(1);
    //const [directoryEntryDetails, setDirectoryEntryDetails] = useState({} as DirectoryEntryDetails);
    const isDrildown = useSelector(isDrillDownEnabled);
    const [currentTeam, setCurrentTeam] = useState({ id: '', name: '', agentCount: 0 });
    const [isAgentsLoadMoreClicked, setIsAgentsLoadMoreClicked] = useState(false);
    const [isSkillsLoadMoreClicked, setIsSkillsLoadMoreClicked] = useState(false);
    const [isTeamsLoadMoreClicked, setIsTeamsLoadMoreClicked] = useState(false);
    const currentTeamFromState = useSelector(getCurrentTeam);
    const totalAgentSearchCount = useSelector(totalAgentsSearchMatchRecords);
    const totalTeamsSearchCount = useSelector(totalTeamsSearchMatchRecords);
    const totalACDSkillsSearchCount = useSelector(totalSkillsSearchMatchRecords);
    const totalDigitalSkillsSearchCount = useSelector(totalDigitalSkillsSearchMatchRecords);
    const [callOnScrollEvent, setCallOnScrollEvent] = useState(false);
    const isExternalDirectoryDrillDown = useSelector(selectExternalDirectoryDrillDown);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const totalExternalDirectoryRecord = useSelector(totalExternalDirectoryRecordCount);
    const [numberSkills, updateNumberSkills] = useState([]);
    const [favoriteSkillsArray, updateFavoriteSkillsArray] = useState([]);
    const [teams, setTeams] = useState([]);
    const isOutboundAssignment = useSelector(getIsOutboundBtnClicked);
    const [totalSkillsSearchCount, setTotalSkillsSearchCount] = useState(0);
    const minimumSearchLength = emptySearchFlg && !isDrildown ? -1 : 1;
    const exceedSearchLength = ((_a = searchContact === null || searchContact === void 0 ? void 0 : searchContact.trim()) === null || _a === void 0 ? void 0 : _a.length) > minimumSearchLength;
    const noAgentResultFound = useSelector(noAgentDataFound);
    const noTeamResultFound = useSelector(noTeamDataFound);
    const allAgentCount = useSelector(selectAllAgentCount);
    const allTeamsCount = useSelector(selectAllTeamCount);
    const allSkillCount = useSelector(selectAllSkillCount);
    const allAddressBookCount = useSelector(selectAllAddressBookCount);
    const noSkillResultFound = useSelector(noSkillDataFound);
    const standardAddressBook = useSelector(standardAddressBooks);
    const allSkillList = useSelector(getSkillList);
    const standardAddressBookMoreDetails = useSelector(standardAddressBookEntriesMoreDetails);
    const totalStandardAddressMatchRecords = useSelector(totalAddressBookMatchRecordsCount);
    const noStandardEntriesFoundAll = useSelector(noStandardEntriesAllData);
    const standardAddBookEntries = useSelector(standardAddressBookEntries);
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const dirRef = useRef(null);
    const appToastContainer = useRef();
    const { width } = useCcfComponentWidth(dirRef);
    const shouldShowTwoColumn = renderTwoColumnDesign && selectedQueryValue !== DirectoryDropdownValues.All ? true : false;
    const isDomVisibile = useSelector(getDomVisibility);
    const isExternalDirectoryTransfer = useSelector(getIsExternalDirectoryTransfer);
    const [transferContactType, setTransferContactType] = useState('');
    const showApiFailedToast = useSelector(getClientDataApiFailedToast);
    const currentFavsInDirectory = useSelector(getCurrentFavsInDirectory);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    /**
     * Function to update a flag when current application tab is selected
     * @example - handleTabVisibilityChange()
     */
    const handleTabVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            dispatch(globalActions.setDomVisibility(true));
        }
        else {
            dispatch(stopEveryPolling());
            dispatch(globalActions.setDomVisibility(false));
        }
    };
    useEffect(() => {
        window.addEventListener('visibilitychange', handleTabVisibilityChange);
        dispatch(agentDirectoryActions.setDirectoryRendered(true));
        return () => {
            dispatch(agentDirectoryActions.setDirectoryRendered(false));
            window.removeEventListener('visibilitychange', handleTabVisibilityChange, false);
        };
    }, []);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (width) {
                dispatch(setAppspaceResolution(width));
            }
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [width]);
    useEffect(() => {
        setAgentList(allAgentList);
        // Below logic added to reset and make the first agent selected in the right panel of Directory
        if (!currentUser || ((agentList === null || agentList === void 0 ? void 0 : agentList.length) && prevAgentList && (agentList === null || agentList === void 0 ? void 0 : agentList[0].agentId) !== currentUser.agentId && (agentList === null || agentList === void 0 ? void 0 : agentList[0].agentId) !== prevAgentList.agentId)) {
            setCurrentUser(agentList === null || agentList === void 0 ? void 0 : agentList[0]);
            setPrevAgentList(agentList === null || agentList === void 0 ? void 0 : agentList[0]);
        }
        if ((allAgentList === null || allAgentList === void 0 ? void 0 : allAgentList.length) > offsetIndexForAgent && !currentTeamFromState && selectedQueryValue !== DirectoryDropdownValues.FavoriteList) {
            setAgentList(agentList === null || agentList === void 0 ? void 0 : agentList.slice(0, offsetIndexForAgent));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allAgentList]);
    const toastMsg = useSelector(getToastMsg);
    useEffect(() => {
        if (toastMsg) {
            switch (toastMsg) {
                case 'unableToTransferDigitalSkill': {
                    toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'unableToTransferDigitalSkill' }), {
                        autoClose: 2000,
                        containerId: 'AppToastContainer',
                    });
                    break;
                }
                case 'unableToTransferVoicemailSkill': {
                    toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'unableToTransferVoicemailSkill' }), {
                        autoClose: 2000,
                        containerId: 'AppToastContainer',
                    });
                    break;
                }
                case 'transferWorkItemSkill': {
                    toast.success(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'transferWorkItemSkill' }), {
                        autoClose: 2000,
                        containerId: 'AppToastContainer',
                    });
                    dispatch(globalActions.setToastMsg({ msg: '' }));
                    break;
                }
                case 'unableToTransferWorkItemSkill': {
                    toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'unableToTransferWorkItemSkill' }), {
                        autoClose: 2000,
                        containerId: 'AppToastContainer',
                    });
                    dispatch(globalActions.setToastMsg({ msg: '' }));
                    break;
                }
                case 'transferVoicemailSkill': {
                    toast.success(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'transferVoicemailSkill' }), {
                        autoClose: 2000,
                        containerId: 'AppToastContainer',
                    });
                    dispatch(globalActions.setToastMsg({ msg: '' }));
                    break;
                }
            }
        }
    }, [toastMsg]);
    useEffect(() => {
        // Below logic added to reset and make the first agent selected in the right panel of Directory
        if (!currentUser || ((agentList === null || agentList === void 0 ? void 0 : agentList.length) && prevAgentList && (agentList === null || agentList === void 0 ? void 0 : agentList[0].agentId) !== currentUser.agentId && (agentList === null || agentList === void 0 ? void 0 : agentList[0].agentId) !== prevAgentList.agentId)) {
            setCurrentUser(agentList === null || agentList === void 0 ? void 0 : agentList[0]);
            setPrevAgentList(agentList === null || agentList === void 0 ? void 0 : agentList[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [directoryEntries]);
    useEffect(() => {
        dispatch(agentDirectoryActions.updateIsFullViewFlg(props.isFullView));
        dispatch(agentDirectoryActions.updateSelectedDropdown(DirectoryDropdownValues.All));
        // state to manage address book details page 
        const payload = {
            addressBookEntryId: 0,
            isVisible: false,
        };
        // below if condition is added to handle error condition when external directory transfer fails and we don't receive get-next event
        if (isExternalDirectoryTransfer) {
            dispatch(CcfAssignmentAction.setExternalDirectoryTransfer(false));
        }
        dispatch(agentDirectoryActions.displayStandardAddressDetails(payload));
        // get all standard address book
        dispatch(standardBookNames(agentId));
        dispatch(getAllSkills());
        if (isFavoritesFTEnabled) {
            // on initial load or refresh initialize all favorite ids toggled to empty array
            dispatch(agentDirectoryActions.updateFavoriteIdsToggled({
                agents: [],
                skills: [],
                teams: [],
                extDirectoryEntries: [],
                standardAdrsBook: [],
            }));
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            const currentFavorites = currentFavsInDirectory || {};
            const storeNotSyncedWithDB = Object.values(currentFavorites).every(favsArray => ((favsArray === null || favsArray === void 0 ? void 0 : favsArray.length) || 0) === 0);
            // on initial load or refresh in case store is not synced with db update the store with current favorites from client data
            if (storeNotSyncedWithDB) {
                dispatch(agentDirectoryActions.syncingStoreWithFavs({
                    agents: (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavAgents) || [],
                    teams: (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavTeams) || [],
                    skills: (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavSkills) || [],
                    digitalSkills: (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavDigitalSkills) || [],
                    extDirectoryEntries: (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavExtDirectory) || [],
                    standardAdrsBook: (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStandAddBook) || [],
                }));
            }
        }
        return () => {
            dispatch(agentDirectoryActions.updateDrillDownToAgentFlag(false));
            dispatch(agentDirectoryActions.updateEmptySearchState(false));
            dispatch(stopEveryPolling());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const addressBook = standardAddressBook === null || standardAddressBook === void 0 ? void 0 : standardAddressBook.filter((item) => {
            return item.addressBookId === Number(selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[1]);
        });
        updateSelectedStandardAddressBook(addressBook);
    }, [selectedQueryValue, standardAddressBook]);
    useEffect(() => {
        if (isDigitalContactTransferBtnClicked) {
            setTransferContactType(MediaType.DIGITAL);
            dispatch(globalActions.setDigitalContactTransferBtnCliked(false));
        }
        if (isVoiceContactTransferBtnClicked) {
            setTransferContactType(MediaType.VOICE);
            dispatch(globalActions.setVoiceContactTransferBtnClicked(false));
        }
    }, [isDigitalContactTransferBtnClicked, isVoiceContactTransferBtnClicked]);
    useEffect(() => {
        if (!isDomVisibile)
            return;
        const addressBook = standardAddressBook === null || standardAddressBook === void 0 ? void 0 : standardAddressBook.filter((item) => {
            return (selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[1]) != null && item.addressBookId === Number(selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[1]);
        }); // this has been added as we have removed the emptysearch flag from the dependency array
        if (selectedQueryValue === DirectoryDropdownValues.AgentList || (selectedQueryValue === DirectoryDropdownValues.TeamList && !isDrildown)) {
            dispatch(startAgentTeamPolling({
                offset: 1,
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                value: [DirectoryDropdownValues.AgentList, DirectoryDropdownValues.TeamList],
                teamId: currentTeamFromState ? currentTeamFromState : '',
                selectedQueryValue: selectedQueryValue,
            }));
            selectedQueryValue === DirectoryDropdownValues.AgentList ? setOffsetIndexForAgent(totalRecordsLimit) : setOffsetIndexForTeam(totalRecordsLimit);
        }
        else if (selectedQueryValue === DirectoryDropdownValues.TeamList && isDrildown && currentTeamFromState) {
            const agentTeampollingparams = {
                offset: 1,
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                teamId: currentTeamFromState ? currentTeamFromState : '',
                value: [DirectoryDropdownValues.AgentList],
            };
            dispatch(startAgentTeamPolling(agentTeampollingparams));
            setOffsetIndexForAgent(totalRecordsLimit);
        }
        else if (selectedQueryValue === DirectoryDropdownValues.SkillList) {
            if (isOutboundAssignment) {
                dispatch(startAgentTeamPolling({
                    offset: 1,
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    value: [DirectoryDropdownValues.SkillList],
                    selectedQueryValue: selectedQueryValue,
                    mediaTypeId: MediaTypeId.Digital,
                }));
                dispatch(startActivityPolling({
                    offset: 1,
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    mediaType: MediaTypeId.PhoneCall,
                }));
                setOffsetIndexForSkill(totalRecordsLimit);
            }
            else if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && transferContactType !== MediaType.VOICE) {
                dispatch(startAgentTeamPolling({
                    offset: 1,
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    value: [DirectoryDropdownValues.SkillList],
                    selectedQueryValue: selectedQueryValue,
                    mediaTypeId: MediaTypeId.Digital,
                }));
                setOffsetIndexForSkill(totalRecordsLimit);
            }
            else {
                dispatch(startActivityPolling({
                    offset: 1,
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    mediaType: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media,
                }));
                setOffsetIndexForSkill(totalRecordsLimit);
            }
        }
        else if (selectedQueryValue === DirectoryDropdownValues.FavoriteList) {
            dispatch(agentDirectoryActions.updateFavoriteListForStandardAddressBook(standardAddBookEntries));
            dispatch(getAgentFavorites(searchContact.length > 0 ? searchContact : ''));
            dispatch(getTeamFavorites(searchContact.length > 0 ? searchContact : ''));
            dispatch(getAddressBookFavorites(searchContact.length > 0 ? searchContact : ''));
            dispatch(getSkillFavorites(searchContact.length > 0 ? searchContact : ''));
            dispatch(getDigitalSkillFavorites(searchContact.length > 0 ? searchContact : ''));
            if (externalDirectoryState) {
                dispatch(agentDirectoryActions.searchDirectories({
                    subscriptionId: externalDirectorySubscriptionId,
                    offset: 0,
                    limit: DirectorySearchRecord.DirectoryCount,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    realTimeUpdates: true,
                    directoryUid: '',
                }));
            }
        }
        else if (addressBook.length > 0 && addressBook[0].addressBookId && (selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[0]) === DirectoryDropdownValues.AddressBookList) {
            const payload = {
                adressBookId: addressBook[0].addressBookId.toString(),
                startIndex: 0,
                recordsToLoad: totalRecordsLimit,
                searchText: searchContact,
            };
            dispatch(getAddressBookFavorites(searchContact.length > 0 ? searchContact : ''));
            dispatch(standardBookEntries(payload));
            setOffsetAddressBookIndex(totalRecordsLimit);
        }
        else if (selectedQueryValue === DirectoryDropdownValues.All) {
            dispatch(agentDirectoryActions.flushAllData());
            if (isOutboundAssignment) {
                dispatch(startAgentTeamPolling({
                    offset: 1,
                    limit: (standardAddressBookMoreDetails === null || standardAddressBookMoreDetails === void 0 ? void 0 : standardAddressBookMoreDetails.displayDetails) ? (standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length) : DirectorySearchRecord.AllDirectoryCount,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    value: [DirectoryDropdownValues.AgentList, DirectoryDropdownValues.TeamList, DirectoryDropdownValues.SkillList, DirectoryDropdownValues.AddressBookList],
                    selectedQueryValue: selectedQueryValue,
                    mediaTypeId: MediaTypeId.Digital,
                }));
                dispatch(startActivityPolling({
                    offset: 1,
                    limit: DirectorySearchRecord.AllDirectoryCount,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    mediaType: MediaTypeId.PhoneCall,
                }));
            }
            else {
                if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && transferContactType !== MediaType.VOICE) {
                    dispatch(startAgentTeamPolling({
                        offset: 1,
                        limit: DirectorySearchRecord.AllDirectoryCount,
                        searchText: searchContact.length > 0 ? searchContact : '',
                        value: [DirectoryDropdownValues.AgentList, DirectoryDropdownValues.TeamList, DirectoryDropdownValues.SkillList, DirectoryDropdownValues.AddressBookList],
                        selectedQueryValue: selectedQueryValue,
                        mediaTypeId: MediaTypeId.Digital,
                    }));
                }
                else {
                    dispatch(startAgentTeamPolling({
                        offset: 1,
                        limit: (standardAddressBookMoreDetails === null || standardAddressBookMoreDetails === void 0 ? void 0 : standardAddressBookMoreDetails.displayDetails) ? (standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length) : DirectorySearchRecord.AllDirectoryCount,
                        searchText: searchContact.length > 0 ? searchContact : '',
                        value: [DirectoryDropdownValues.AgentList, DirectoryDropdownValues.TeamList, DirectoryDropdownValues.SkillList, DirectoryDropdownValues.AddressBookList],
                        selectedQueryValue: selectedQueryValue,
                    }));
                    dispatch(startActivityPolling({
                        offset: 1,
                        limit: DirectorySearchRecord.AllDirectoryCount,
                        searchText: searchContact.length > 0 ? searchContact : '',
                        mediaType: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media,
                    }));
                }
            }
            if (externalDirectoryState) {
                dispatch(agentDirectoryActions.searchDirectories({
                    subscriptionId: externalDirectorySubscriptionId,
                    offset: 0,
                    limit: DirectorySearchRecord.AllDirectoryCount,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    realTimeUpdates: true,
                    directoryUid: '',
                }));
                setOffsetExternalDirectoryIndex(1);
            }
            setAllOffsetIndex(2);
        }
        else {
            const searchDirectoryEntries = {
                offset: 0,
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                realTimeUpdates: true,
                directoryUid: selectedQueryValue,
            };
            dispatch(agentDirectoryActions.searchDirectories(searchDirectoryEntries));
            setOffsetExternalDirectoryIndex(totalRecordsLimit - 1);
        }
        if (searchContact.length === 0 && !emptySearchFlg) {
            dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                triggerState: false,
                triggerType: 'voice',
            }));
            dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                triggerState: false,
                triggerType: 'sms',
            }));
            dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                triggerState: false,
                triggerType: 'email',
            }));
            dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                triggerState: false,
                triggerType: 'whatsapp',
            }));
        }
        dispatch(agentDirectoryActions.hideExternalDirectoryData(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchContact, selectedQueryValue, externalDirectoryChecked, isDomVisibile]);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (externalDirectoryLoadingStatus && directoryEntries.length === 0) {
                dispatch(agentDirectoryActions.hideExternalDirectoryData(true));
                toast.warn(_jsx(CcfAppToastMessage, { type: "warning", titleKey: "error", messageKey: 'genericErrorMsg' }), {
                    autoClose: false,
                    closeButton: true,
                    containerId: 'DirectoryToastContainer',
                });
            }
        }, 15000);
        return () => clearTimeout(timer);
    }, [externalDirectoryLoadingStatus, searchContact, dispatch, directoryEntries]);
    useEffect(() => {
        if (selectedQueryValue === DirectoryDropdownValues.FavoriteList)
            setCurrentUser(favoriteAgents[0]);
    }, [favoriteAgents]);
    useEffect(() => {
        setIsTeamsLoadMoreClicked(false);
        setIsSkillsLoadMoreClicked(false);
        setIsAgentsLoadMoreClicked(false);
        dispatch(agentDirectoryActions.setExternalDirectoryDrillDown(false));
        dispatch(agentDirectoryActions.flushAllData());
        dispatch(globalActions.setDomVisibility(true));
        updateSearchContact('');
        dispatch(agentDirectoryActions.updateSearchBoxQuery(''));
        if (selectedQueryValue === DirectoryDropdownValues.TeamList) {
            setOffsetIndexForAgent(0);
        }
        if (selectedQueryValue !== DirectoryDropdownValues.TeamList && !loadingAgentsForTeam) {
            setCurrentTeam({ id: '', name: '', agentCount: 0 });
        }
        dispatch(stopEveryPolling());
        dispatch(agentDirectoryActions.updateEmptySearchState(false));
        dispatch(agentDirectoryActions.flushAllData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedQueryValue]);
    useEffect(() => {
        var _a;
        if (!Object.keys(externalDirectories).length) {
            dispatch(checkExtenalDirectoryEnabled({
                userId: (_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId) === null || _a === void 0 ? void 0 : _a.toString(),
                startIndex: 0,
                totalRecords: 25,
            }));
        }
    }, [externalDirectories, userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId, dispatch]);
    useEffect(() => {
        dispatch(globalActions.setDomVisibility(true));
        if ((searchBoxQuery === null || searchBoxQuery === void 0 ? void 0 : searchBoxQuery.length) > minimumSearchLength) {
            dispatch(agentDirectoryActions.setExternalDirectoryDrillDown(false));
        }
        if ((searchBoxQuery === null || searchBoxQuery === void 0 ? void 0 : searchBoxQuery.length) === 0 && selectedQueryValue === DirectoryDropdownValues.TeamList) {
            setOffsetIndexForTeam(25);
        }
        if (searchBoxQuery === '') {
            updateSearchContact('');
        } // This has been added to handle back to Team List scenario
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBoxQuery]);
    useEffect(() => {
        if (!currentTeamFromState) {
            setCurrentTeam({ id: '', name: '', agentCount: 0 });
        }
    }, [currentTeamFromState]);
    useEffect(() => {
        if (offsetIndexForTeam) {
            setTeams(allTeams === null || allTeams === void 0 ? void 0 : allTeams.slice(0, offsetIndexForTeam));
        }
    }, [allTeams]);
    /** This function dismisses any existing favorites toast, then shows a new error toast for favorites-related errors.
   *
   * @param messageKey - The key used to determine the error message to display in the toast.
   * @example -
   * ```
   * showFavoritesErrorToast(messageKey);
   * ```
   */
    const showFavoritesErrorToast = (messageKey) => {
        if (favoritesToastReference)
            toast.dismiss(favoritesToastReference);
        if (favoritesToastReferenceFortState)
            toast.dismiss(favoritesToastReferenceFortState);
        appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "error", titleKey: "error", messageKey: messageKey }), {
            autoClose: false,
            closeButton: true,
            containerId: 'AppToastContainer',
            position: 'top-center',
        });
        dispatch(agentDirectoryActions.updateFavsToastReference(appToastContainer.current));
    };
    useEffect(() => {
        if ((showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.storageExceeded) && isFavoritesFTEnabled) {
            showFavoritesErrorToast('clientDataApiStorageExceeded');
        }
        else if ((showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.apiFailed) && isFavoritesFTEnabled) {
            showFavoritesErrorToast('networkFailure');
        }
    }, [showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.storageExceeded, showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.apiFailed]);
    /**
     * update the offsetindex for all the filters
     * @param props- index
     * @example - setAllOffsetIndex
    */
    const setAllOffsetIndex = (index) => {
        setOffsetIndexForSkill(index);
        setOffsetIndexForAgent(index);
        setOffsetIndexForTeam(index);
        setOffsetAddressBookIndex(index);
    };
    /**
     * update state if user gets any agent item
     * gets selected in the child component
     * @param props- users
     * @example - updateSelectedAgentFlg
    */
    const updateSelectedAgentFlg = useCallback((user) => {
        setCurrentUser(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
     * Function to check SkillType For Transfer
     * @param skills - (SkillEvent | SkillActivityEvent)[]
     * @example - checkSkillTypeForTransfer()
     */
    const getAllWorkItemSkillsForTransfers = (skills) => __awaiter(this, void 0, void 0, function* () {
        const getCurrentSkillOfContact = allSkillList.filter((skill) => { var _a; return ((_a = skill === null || skill === void 0 ? void 0 : skill.skillId) === null || _a === void 0 ? void 0 : _a.toString()) === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.skillOrQueueId); });
        const getSkillFromAllSkillList = allSkillList.filter((skill) => skills === null || skills === void 0 ? void 0 : skills.some((currentSkill) => { var _a, _b; return ((_a = currentSkill === null || currentSkill === void 0 ? void 0 : currentSkill.skillId) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = skill === null || skill === void 0 ? void 0 : skill.skillId) === null || _b === void 0 ? void 0 : _b.toString()); }));
        getSkillFromAllSkillList.forEach((skill, index) => {
            var _a;
            if (skill.mediaTypeName === MediaType.WORKITEM) {
                skill.workItemQueueType !== ((_a = getCurrentSkillOfContact[0]) === null || _a === void 0 ? void 0 : _a.workItemQueueType) && delete getSkillFromAllSkillList[index];
            }
        });
        return getSkillFromAllSkillList.length > 0 ? skills.filter((skill) => getSkillFromAllSkillList.some((currentSkill) => { var _a, _b; return ((_a = currentSkill === null || currentSkill === void 0 ? void 0 : currentSkill.skillId) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = skill === null || skill === void 0 ? void 0 : skill.skillId) === null || _b === void 0 ? void 0 : _b.toString()); })) : skills;
    });
    useEffect(() => {
        const isDigitalContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL;
        const isVoiceCallTransfer = transferContactType === MediaType.VOICE;
        let skills;
        if (isOutboundAssignment) {
            skills = [...(ACDSkills || []), ...(digitalSkills || [])];
        }
        else if (isDigitalContact && !isVoiceCallTransfer) {
            skills = digitalSkills;
        }
        else {
            skills = ACDSkills;
        }
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM && skills.length > 0) {
            getAllWorkItemSkillsForTransfers(skills).then((response) => {
                // DEV NOTE - We will change this type in next PR to appropriate type
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                updateNumberSkills(response);
            });
        }
        else {
            updateNumberSkills(skills);
        }
        let totalSkillsCount;
        if (isOutboundAssignment) {
            totalSkillsCount = totalACDSkillsSearchCount + totalDigitalSkillsSearchCount;
        }
        else if (isDigitalContact && !isVoiceCallTransfer) {
            totalSkillsCount = totalDigitalSkillsSearchCount;
        }
        else {
            totalSkillsCount = totalACDSkillsSearchCount;
        }
        setTotalSkillsSearchCount(totalSkillsCount);
    }, [
        isOutboundAssignment,
        nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media,
        totalACDSkillsSearchCount,
        totalDigitalSkillsSearchCount,
        ACDSkills,
        digitalSkills,
        allSkillCount,
        transferContactType
    ]);
    useEffect(() => {
        const isDigitalContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL;
        if (isFavoritesFTEnabled) {
            isDigitalContact ? updateFavoriteSkillsArray(favoriteDigitalSkills) : updateFavoriteSkillsArray(favoriteSkills);
        }
    }, [
        favoriteSkills,
        favoriteDigitalSkills
    ]);
    /**
     * Function to update call type
     * @param trigger - boolean
     * @example - outboundCallOptionSelcted(true)
     */
    const handleAgentsTeamsPagination = useCallback(() => {
        const agentpollingparams = {
            offset: (offsetIndexForAgent + 1),
            limit: totalRecordsLimit,
            searchText: searchContact.length > 0 ? searchContact : '',
            value: [DirectoryDropdownValues.AgentList],
            selectedQueryValue: selectedQueryValue,
            teamId: currentTeamFromState ? currentTeamFromState : '',
        };
        dispatch(startAgentTeamPolling(agentpollingparams));
        setOffsetIndexForAgent(offsetIndexForAgent + totalRecordsLimit);
    }, [dispatch, offsetIndexForAgent, searchContact, selectedQueryValue, totalRecordsLimit, currentTeamFromState]);
    /**
   * Function to update call type
   * @param trigger - boolean
   * @example - outboundCallOptionSelcted(true)
   */
    const getTeamIdFromTeams = (team) => {
        setCurrentTeam({ id: team.id, name: team.name, agentCount: team.agentCount });
        updateSearchContact(''); //empty search string on new team selection
    };
    /**
     * Function to update pagination for Agents in selected Team
     * @example - handleAgentsInTeamPagination(true)
     */
    const handleAgentsInTeamPagination = useCallback(() => {
        const agentTeampollingparams = {
            offset: (offsetIndexForAgent + 1),
            limit: totalRecordsLimit,
            searchText: searchContact,
            teamId: currentTeamFromState ? currentTeamFromState : '',
            value: [DirectoryDropdownValues.AgentList],
            selectedQueryValue: DirectoryDropdownValues.TeamList,
        };
        dispatch(startAgentTeamPolling(agentTeampollingparams));
        setOffsetIndexForAgent(offsetIndexForAgent + totalRecordsLimit);
    }, [dispatch, offsetIndexForAgent, searchContact, currentTeamFromState, totalRecordsLimit]);
    /**
     * Function to update pagination for Agents in selected Team
     * @example - handleTeamPagination(true)
     */
    const handleTeamPagination = useCallback(() => {
        const agentTeampollingparams = {
            offset: (offsetIndexForTeam + 1),
            limit: totalRecordsLimit,
            searchText: searchContact,
            teamId: currentTeamFromState ? currentTeamFromState : '',
            value: [DirectoryDropdownValues.TeamList],
            selectedQueryValue: DirectoryDropdownValues.TeamList,
        };
        dispatch(startAgentTeamPolling(agentTeampollingparams));
        setOffsetIndexForTeam(offsetIndexForTeam + totalRecordsLimit);
    }, [dispatch, offsetIndexForTeam, searchContact, currentTeamFromState, totalRecordsLimit]);
    /**
    * Function to update call type
    * @example - handleSkillsPagination()
    */
    const handleSkillsPagination = useCallback(() => {
        const offset = (numberSkills === null || numberSkills === void 0 ? void 0 : numberSkills.length) || 0;
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && transferContactType !== MediaType.VOICE) {
            dispatch(startAgentTeamPolling({
                offset: (offset + 1),
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                value: [DirectoryDropdownValues.SkillList],
                selectedQueryValue: [DirectoryDropdownValues.SkillList],
                mediaTypeId: MediaTypeId.Digital,
            }));
            setOffsetIndexForSkill(offset + totalRecordsLimit);
        }
        else if (selectedQueryValue === DirectoryDropdownValues.SkillList) {
            const skillsPollingparams = {
                offset: (offset + 1),
                limit: totalRecordsLimit,
                searchText: searchContact,
                mediaType: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media,
            };
            dispatch(startActivityPolling(skillsPollingparams));
            setOffsetIndexForSkill(offset + totalRecordsLimit);
        }
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media, dispatch, searchContact, selectedQueryValue, totalRecordsLimit, numberSkills]);
    /**
    * Function to fetch next set of data for address books
    * @example - outboundCallOptionSelcted(true)
    */
    const handleAddressBookPagination = useCallback(() => {
        if (selectedStandardAddressBook.length > 0 && selectedStandardAddressBook[0].addressBookId) {
            const payload = {
                adressBookId: (selectedStandardAddressBook[0].addressBookId).toString(),
                startIndex: (offsetAddressBookIndex),
                recordsToLoad: totalRecordsLimit,
                searchText: searchContact,
            };
            dispatch(standardBookEntries(payload));
            setOffsetAddressBookIndex(offsetAddressBookIndex + totalRecordsLimit);
        }
    }, [dispatch, searchContact, totalRecordsLimit, offsetAddressBookIndex, selectedStandardAddressBook]);
    /**
   * Function to update call type
   * @param trigger - boolean
   * @example - outboundCallOptionSelcted(true)
   */
    const handleAllPagination = useCallback((target) => {
        let currentPageIndex = undefined;
        if (target === DirectoryDropdownValues.SkillList) {
            currentPageIndex = (offsetIndexForSkill + totalRecordsLimit) + 1;
            setIsSkillsLoadMoreClicked(true);
            if (isOutboundAssignment) {
                dispatch(startActivityPolling({
                    offset: (offsetIndexForSkill + 1),
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    mediaType: MediaTypeId.PhoneCall,
                }));
                dispatch(startAgentTeamPolling({
                    offset: (offsetIndexForSkill + 1),
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    value: [DirectoryDropdownValues.SkillList],
                    selectedQueryValue: target,
                    mediaTypeId: MediaTypeId.Digital,
                }));
                setOffsetIndexForSkill(offsetIndexForSkill + totalRecordsLimit);
            }
            else if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && transferContactType !== MediaType.VOICE) {
                dispatch(startAgentTeamPolling({
                    offset: (offsetIndexForSkill + 1),
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    value: [DirectoryDropdownValues.SkillList],
                    selectedQueryValue: target,
                    mediaTypeId: MediaTypeId.Digital,
                }));
                setOffsetIndexForSkill(offsetIndexForSkill + totalRecordsLimit);
            }
            else {
                dispatch(startActivityPolling({
                    offset: (offsetIndexForSkill + 1),
                    limit: totalRecordsLimit,
                    searchText: searchContact.length > 0 ? searchContact : '',
                    mediaType: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media,
                }));
                setOffsetIndexForSkill(offsetIndexForSkill + totalRecordsLimit);
            }
        }
        if (target === DirectoryDropdownValues.AgentList || target === DirectoryDropdownValues.TeamList) {
            target === DirectoryDropdownValues.AgentList ? setIsAgentsLoadMoreClicked(true) : setIsTeamsLoadMoreClicked(true);
            currentPageIndex = ((target === DirectoryDropdownValues.AgentList ? offsetIndexForAgent : offsetIndexForTeam) * totalRecordsLimit) + 1;
            dispatch(startAgentTeamPolling({
                offset: ((target === DirectoryDropdownValues.AgentList ? offsetIndexForAgent : offsetIndexForTeam) + 1),
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                value: target === DirectoryDropdownValues.AgentList ? [DirectoryDropdownValues.AgentList] : [DirectoryDropdownValues.TeamList],
                selectedQueryValue: target,
            }));
            target === DirectoryDropdownValues.AgentList ? setOffsetIndexForAgent(offsetIndexForAgent + totalRecordsLimit) : setOffsetIndexForTeam(offsetIndexForTeam + totalRecordsLimit);
        }
        else if (target === DirectoryDropdownValues.ExternalDirectories) {
            currentPageIndex = (offsetExternalDirectoryIndex * totalRecordsLimit) + 1;
            dispatch(agentDirectoryActions.searchDirectories({
                subscriptionId: externalDirectorySubscriptionId,
                offset: (offsetExternalDirectoryIndex + 1),
                limit: totalRecordsLimit,
                realTimeUpdates: true,
                searchText: searchContact.length > 0 ? searchContact : '',
                directoryUid: '',
            }));
            setOffsetExternalDirectoryIndex(offsetExternalDirectoryIndex + totalRecordsLimit);
        }
        else if (target === DirectoryDropdownValues.AddressBookList) {
            currentPageIndex = (offsetAddressBookIndex * totalRecordsLimit) + 1;
            dispatch(agentDirectoryActions.isAddressBookLoading(true));
            dispatch(startAgentTeamPolling({
                offset: (offsetAddressBookIndex + 1),
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                value: [DirectoryDropdownValues.AddressBookList],
                selectedQueryValue: target,
            }));
            setOffsetAddressBookIndex(offsetAddressBookIndex + totalRecordsLimit);
        }
        if (target === DirectoryDropdownValues.TeamList && isDrildown && currentPageIndex && currentPageIndex < ((agentList === null || agentList === void 0 ? void 0 : agentList.length) - 1)) {
            handleAgentsInTeamPagination();
        }
    }, [dispatch, offsetIndexForAgent, offsetIndexForSkill, offsetIndexForTeam, offsetExternalDirectoryIndex, offsetAddressBookIndex, searchContact, isDrildown, handleAgentsInTeamPagination, agentList === null || agentList === void 0 ? void 0 : agentList.length, totalRecordsLimit, externalDirectorySubscriptionId]);
    /**
  * Function to update call type
  * @param trigger -
  * @example - handleDirectoriesPagination()
  */
    const handleDirectoriesPagination = useCallback(() => {
        if ((totalExternalDirectoryRecord === totalRecordsLimit) && (selectedQueryValue !== DirectoryDropdownValues.TeamList) && (selectedQueryValue !== DirectoryDropdownValues.AgentList) && (selectedQueryValue !== DirectoryDropdownValues.SkillList) && (selectedQueryValue !== DirectoryDropdownValues.FavoriteList)) {
            const searchDirectoryEntries = {
                subscriptionId: externalDirectorySubscriptionId,
                offset: (offsetExternalDirectoryIndex + 1),
                limit: totalRecordsLimit,
                searchText: searchContact.length > 0 ? searchContact : '',
                realTimeUpdates: true,
                directoryUid: selectedQueryValue,
            };
            setOffsetExternalDirectoryIndex(offsetExternalDirectoryIndex + totalRecordsLimit);
            dispatch(agentDirectoryActions.searchDirectories(searchDirectoryEntries));
        }
    }, [dispatch, externalDirectorySubscriptionId, offsetExternalDirectoryIndex, searchContact, selectedQueryValue, totalRecordsLimit, totalExternalDirectoryRecord]);
    /**
     * Function to check if selected dropdown is addressbook type
     * @param trigger - boolean
     * @example - isAddressBookSearch(selectedQueryValue)
     */
    const isAddressBookSearch = (str) => {
        const specialChar = /[_]+/;
        if (specialChar.test(str)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to update call type
     * @param trigger - boolean
     * @example - outboundCallOptionSelcted(true)
     */
    const handlePageScroll = useCallback((e) => {
        const scrollElement = e.target;
        const bottom = (scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 1) || (e === null || e === void 0 ? void 0 : e.bottom);
        if (!callOnScrollEvent && bottom && !isExternalDirectoryDrillDown) {
            setCallOnScrollEvent(true);
            //check if address book string available
            const selectedQuery = isAddressBookSearch(selectedQueryValue) ? selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[0] : selectedQueryValue;
            switch (selectedQuery) {
                case DirectoryDropdownValues.AgentList: {
                    if (searchBoxQuery === '') {
                        (offsetIndexForAgent < allAgentCount) && handleAgentsTeamsPagination();
                    }
                    else {
                        (offsetIndexForAgent < totalAgentSearchCount) && handleAgentsTeamsPagination();
                        ;
                    }
                    break;
                }
                case DirectoryDropdownValues.TeamList: {
                    if (isDrildown &&
                        exceedSearchLength ?
                        (offsetIndexForAgent < totalAgentSearchCount) : (offsetIndexForAgent < currentTeam.agentCount)) {
                        handleAgentsInTeamPagination();
                    }
                    else if (searchBoxQuery === '') {
                        (offsetIndexForTeam < allTeamsCount) && handleTeamPagination();
                    }
                    else {
                        (offsetIndexForTeam < totalTeamsSearchCount) && handleAgentsTeamsPagination();
                    }
                    break;
                }
                case DirectoryDropdownValues.SkillList: {
                    if (searchBoxQuery === '' && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL) {
                        (offsetIndexForSkill < allSkillCount) && handleSkillsPagination();
                    }
                    else {
                        (offsetIndexForSkill < totalSkillsSearchCount) && handleSkillsPagination();
                        ;
                    }
                    break;
                }
                case DirectoryDropdownValues.All: {
                    handleAllPagination(e.target);
                    break;
                }
                case DirectoryDropdownValues.AddressBookList: {
                    if (offsetAddressBookIndex < totalStandardAddressMatchRecords) {
                        handleAddressBookPagination();
                    }
                    break;
                }
                default:
                    {
                        handleDirectoriesPagination();
                    }
                    break;
            }
        }
        setTimeout(() => {
            setCallOnScrollEvent(false);
        }, 100);
    }, [callOnScrollEvent, selectedQueryValue, offsetIndexForAgent, offsetIndexForSkill, offsetIndexForTeam, totalAgentSearchCount, handleAgentsTeamsPagination, isDrildown, searchContact === null || searchContact === void 0 ? void 0 : searchContact.length, currentTeam.agentCount, handleAgentsInTeamPagination, totalTeamsSearchCount, totalSkillsSearchCount, handleSkillsPagination, handleAllPagination, handleDirectoriesPagination, isExternalDirectoryDrillDown, offsetAddressBookIndex, totalStandardAddressMatchRecords, handleAddressBookPagination]);
    /**
    * Function to update call type
    * @param trigger - boolean
    * @example - handleExternalDirectoryChange(true)
    */
    const handleExternalDirectoryChange = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked && (selectedQueryValue !== DirectoryDropdownValues.AgentList && selectedQueryValue !== DirectoryDropdownValues.SkillList &&
            selectedQueryValue !== DirectoryDropdownValues.TeamList && selectedQueryValue !== DirectoryDropdownValues.All)) {
            dispatch(agentDirectoryActions.updateSelectedDropdown(DirectoryDropdownValues.All));
        }
        dispatch(agentDirectoryActions.updateExternalDirectoryState(event.target.checked));
    };
    /**
     * Function to open partnel info panel
     * @param user - object
     * @example - openNextPanel(user)
    */
    const expandDirectoryEntryDetails = (user) => {
        dispatch(agentDirectoryActions.updateSelectedDrillDownEntry(user));
        dispatch(agentDirectoryActions.setExternalDirectoryDrillDown(true));
        dispatch(agentDirectoryActions.updateSearchBoxQuery(''));
    };
    /**
     * Function to show load more option for skills
     * @example - loadMoreSkills()
    */
    const loadMoreSkills = () => {
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && transferContactType !== MediaType.VOICE && searchBoxQuery === '') {
            return (numberSkills.length !== 0 && (offsetIndexForSkill < allSkillCount));
        }
        else {
            return (numberSkills.length !== 0 && (offsetIndexForSkill < totalSkillsSearchCount));
        }
    };
    const listContainerBoxCombinedStyle = Object.assign(Object.assign({}, isFullViewDirectory && (selectedQueryValue === DirectoryDropdownValues.AgentList || selectedQueryValue === DirectoryDropdownValues.FavoriteList) ? classes.agentListContainer : {}), classes.height100);
    const isAnyFavoriteVisible = (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAgents) && (favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) > 0) ||
        (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryTeams) && (favoriteTeams === null || favoriteTeams === void 0 ? void 0 : favoriteTeams.length) > 0) ||
        (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySkills) && (favoriteSkillsArray === null || favoriteSkillsArray === void 0 ? void 0 : favoriteSkillsArray.length) > 0) ||
        (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryStandardAddressBook) && (favoriteStandardAddressBooks === null || favoriteStandardAddressBooks === void 0 ? void 0 : favoriteStandardAddressBooks.length) > 0) ||
        (externalDirectoryState && (favoriteExtDirectoryEntries === null || favoriteExtDirectoryEntries === void 0 ? void 0 : favoriteExtDirectoryEntries.length) > 0);
    return (_jsxs(Paper, Object.assign({ ref: dirRef, square: true, elevation: 0, sx: classes.directoryContainer }, { children: [_jsx(ToastContainer, { enableMultiContainer: true, containerId: 'DirectoryToastContainer', position: "top-center", newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true }), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySearch) && _jsx(CcfDirectorySearch, { updateSearchQuery: updateSearchContact }), _jsx(CcfDirectorySelect, { id: 'directorySelect', externalDirectory: externalDirectoryChecked, focusSelect: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySearch }), externalDirectories && Object.keys(externalDirectories).length > 0 && _jsxs(Box, Object.assign({ sx: classes.includeExternalDirLayout }, { children: [_jsx(CcfSwitchButton, { id: "externalDirSwitch", ariaLabel: includeExternalDir, status: externalDirectoryChecked, onChange: handleExternalDirectoryChange }), _jsx("label", { children: includeExternalDir })] })), _jsxs(Paper, Object.assign({ square: true, component: 'ul', "data-testId": 'paperComponent', onScroll: (e) => {
                    if (selectedQueryValue !== DirectoryDropdownValues.All &&
                        e.currentTarget.scrollTop !== undefined &&
                        e.currentTarget.scrollTop !== 0) {
                        handlePageScroll(e);
                    }
                }, sx: isFullViewDirectory ? classes.fullViewDirectory : classes.directory, elevation: 0 }, { children: [searchContact && !(standardAddressBookMoreDetails === null || standardAddressBookMoreDetails === void 0 ? void 0 : standardAddressBookMoreDetails.displayDetails) && (selectedQueryValue === DirectoryDropdownValues.All || selectedQueryValue === DirectoryDropdownValues.AgentList) ?
                        _jsx(CcfOutboundOptions, { number: searchContact, skills: [] }) : null, _jsxs(Box, Object.assign({ sx: listContainerBoxCombinedStyle }, { children: [loading && selectedQueryValue !== DirectoryDropdownValues.FavoriteList && _jsx(Box, { sx: classes.showLoaderContainer }), _jsxs(Box, Object.assign({ "data-testid": "scroll-wrapper", sx: isFullViewDirectory && ((selectedQueryValue === DirectoryDropdownValues.AgentList && (agentList === null || agentList === void 0 ? void 0 : agentList.length) !== 0) ||
                                    (selectedQueryValue === DirectoryDropdownValues.FavoriteList && favoriteAgents.length !== 0))
                                    ? classes.fullViewUserList : classes.regularView }, { children: [!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySkills) && (numberSkills === null || numberSkills === void 0 ? void 0 : numberSkills.length) > 0 && selectedQueryValue === DirectoryDropdownValues.SkillList &&
                                        numberSkills.filter((_, i) => i < offsetIndexForSkill).map((skill) => (_jsx(DirectorySkills, { skill: skill }, skill === null || skill === void 0 ? void 0 : skill.skillId))), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAgents) && (agentList === null || agentList === void 0 ? void 0 : agentList.length) > 0 && selectedQueryValue === DirectoryDropdownValues.AgentList &&
                                        agentList.filter((_, i) => i < offsetIndexForAgent).map((user) => (_jsx(CcfDirectoryAgent, { click: updateSelectedAgentFlg, isFullView: props.isFullView, user: user, isHovering: false, transferContactType: transferContactType }, user === null || user === void 0 ? void 0 : user.agentId))), !isExternalDirectoryDrillDown && (selectedQueryValue !== DirectoryDropdownValues.TeamList) && (selectedQueryValue !== DirectoryDropdownValues.All) && (selectedQueryValue !== DirectoryDropdownValues.AgentList) && (selectedQueryValue !== DirectoryDropdownValues.SkillList) && (selectedQueryValue !== DirectoryDropdownValues.FavoriteList)
                                        && directoryEntries && directoryEntries.map((user) => (_jsx(CcfDirectoryEntries, { isFullView: props.isFullView, user: user, isHovering: false, expandDirectoryEntryDetails: expandDirectoryEntryDetails }, user === null || user === void 0 ? void 0 : user.userMappingId))), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && !isFavoritesFTEnabled && (favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList &&
                                        favoriteAgents.map((user) => (_jsx(CcfDirectoryAgent, { click: updateSelectedAgentFlg, isFullView: props.isFullView, user: user, isHovering: false, transferContactType: transferContactType }, user === null || user === void 0 ? void 0 : user.agentId))), selectedQueryValue !== DirectoryDropdownValues.All && (selectedQueryValue !== DirectoryDropdownValues.FavoriteList && isFavoritesFTEnabled) && isExternalDirectoryDrillDown && _jsx(CcfDirectoryEntryDetails, { directoryEntryDetails: selectedDrillDownEntry }), (teams === null || teams === void 0 ? void 0 : teams.length) > 0 && selectedQueryValue === DirectoryDropdownValues.TeamList && !isDrildown && !loadingAgentsForTeam &&
                                        teams.filter((_, i) => i < offsetIndexForTeam).map((team) => (_jsx(CcfDirectoryTeams, { team: team, getTeamIdFromTeams: getTeamIdFromTeams, setOffsetIndexForAgent: setOffsetIndexForAgent }, team.teamId))), !isFavoritesFTEnabled && selectedQueryValue === DirectoryDropdownValues.TeamList && (agentList === null || agentList === void 0 ? void 0 : agentList.length) > 0 && currentTeam.id &&
                                        _jsx(CcfDrilldownAgents, { isFullView: props.isFullView, agentList: agentList, team: currentTeam }), isFavoritesFTEnabled && (selectedQueryValue === DirectoryDropdownValues.TeamList || selectedQueryValue === DirectoryDropdownValues.FavoriteList) && (agentList === null || agentList === void 0 ? void 0 : agentList.length) > 0 && (offsetIndexForAgent === 0 ? (agentList === null || agentList === void 0 ? void 0 : agentList.length) <= totalRecordsLimit : (agentList === null || agentList === void 0 ? void 0 : agentList.length) > 0) && (currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.id) &&
                                        _jsx(CcfDrilldownAgents, { isFullView: props.isFullView, agentList: agentList, team: currentTeam }), (standardAddressBook === null || standardAddressBook === void 0 ? void 0 : standardAddressBook.length) > 0 && standardAddressBook.map((standardAddressBook) => (Number(selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[1]) === standardAddressBook.addressBookId &&
                                        _jsx(CcfStandardAddressBook, { addressBookId: standardAddressBook.addressBookId, renderTwoColumnDesign: shouldShowTwoColumn }, standardAddressBook.addressBookId))), (selectedQueryValue === DirectoryDropdownValues.All || selectedQueryValue === DirectoryDropdownValues.FavoriteList) &&
                                        _jsxs(Box, { children: [(standardAddressBookMoreDetails && !standardAddressBookMoreDetails.displayDetails && !isExternalDirectoryDrillDown) &&
                                                    _jsxs(Box, { children: [!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryAgents) && (selectedQueryValue === DirectoryDropdownValues.All ? ((agentList === null || agentList === void 0 ? void 0 : agentList.length) > 0 && !noAgentResultFound) : ((favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) > 0 && isFavoritesFTEnabled)) && _jsxs(Box, Object.assign({ position: 'relative', marginBottom: '20px' }, { children: [_jsx(Box, Object.assign({ left: '10px', width: '100%' }, { children: _jsx(Box, Object.assign({ display: 'flex', justifyContent: 'space-between', height: '30px', marginLeft: '10px', marginTop: '10px' }, { children: _jsx(CcfTypography, { style: { fontWeight: '700' }, variant: 'h4', translationKey: "agents" }) })) })), selectedQueryValue === DirectoryDropdownValues.All &&
                                                                        _jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ overflow: 'auto', position: 'relative', sx: isAgentsLoadMoreClicked ? classes.fullHeightContainer : classes.itemContainerHeight }, { children: agentList.filter((_, i) => i < offsetIndexForAgent).map((user) => (_jsx(CcfDirectoryAgent, { click: updateSelectedAgentFlg, isFullView: props.isFullView, user: user, isHovering: false, transferContactType: transferContactType }, user === null || user === void 0 ? void 0 : user.agentId))) })), _jsx(Box, Object.assign({ sx: classes.cursorPointer && classes.backgroundWhite, position: 'absolute', marginTop: '-5px', width: '100%', display: 'flex', justifyContent: 'center', "data-testid": 'load-more-agents', tabIndex: 0, role: 'button', "aria-label": `${translate('loadMoreOptions')} ${translate('agents')}`, onKeyDown: (e) => {
                                                                                        if (e.key === 'Enter') {
                                                                                            handlePageScroll({ bottom: true, target: DirectoryDropdownValues.AgentList });
                                                                                        }
                                                                                    }, onClick: () => {
                                                                                        handlePageScroll({ bottom: true, target: DirectoryDropdownValues.AgentList });
                                                                                    } }, { children: ((agentList.length !== 0 && (offsetIndexForAgent < totalAgentSearchCount || (agentList.length !== 0 && (offsetIndexForAgent < allAgentCount) && searchContact === ''))) ? _jsxs(CcfTypography, Object.assign({ sx: classes.cursorOnly }, { children: [" ", translate('loadMore')] })) : '') }))] }), _jsxs(Box, { children: [loading && selectedQueryValue !== DirectoryDropdownValues.FavoriteList && _jsx(Box, { sx: classes.showLoaderContainer }), favoriteAgents && isFavoritesFTEnabled && (favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList &&
                                                                                favoriteAgents.map((user) => (_jsx(CcfDirectoryAgent, { click: updateSelectedAgentFlg, isFullView: props.isFullView, user: user, isHovering: false, transferContactType: transferContactType }, user === null || user === void 0 ? void 0 : user.agentId)))] })] })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectorySkills) && (selectedQueryValue === DirectoryDropdownValues.All ? (numberSkills === null || numberSkills === void 0 ? void 0 : numberSkills.length) > 0 : isFavoritesFTEnabled && (favoriteSkillsArray === null || favoriteSkillsArray === void 0 ? void 0 : favoriteSkillsArray.length) > 0) && _jsxs(Box, Object.assign({ position: 'relative', marginBottom: '20px' }, { children: [_jsx(Box, Object.assign({ left: '10px', width: '100%' }, { children: _jsx(Box, Object.assign({ display: 'flex', justifyContent: 'space-between', height: '30px', marginLeft: '10px' }, { children: _jsx(CcfTypography, { style: { fontWeight: '700' }, variant: 'h4', translationKey: "skills" }) })) })), selectedQueryValue === DirectoryDropdownValues.All ? (_jsx(Box, Object.assign({ overflow: 'auto', position: 'relative', sx: isSkillsLoadMoreClicked ? classes.fullHeightContainer : classes.itemContainerHeight }, { children: numberSkills.filter((_, i) => i < offsetIndexForSkill).map((skill) => (_jsx(DirectorySkills, { skill: skill }, skill === null || skill === void 0 ? void 0 : skill.skillId))) }))) : (_jsx(Box, { children: isFavoritesFTEnabled && (favoriteSkillsArray === null || favoriteSkillsArray === void 0 ? void 0 : favoriteSkillsArray.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList &&
                                                                            favoriteSkillsArray.map((skill) => (_jsx(DirectorySkills, { skill: skill }, skill.skillId))) })), selectedQueryValue === DirectoryDropdownValues.All && _jsx(Box, Object.assign({ sx: classes.cursorPointer && classes.backgroundWhite, position: 'absolute', marginTop: '-5px', width: '100%', display: 'flex', justifyContent: 'center', "data-testid": 'load-more-skills', "aria-label": `${translate('loadMoreOptions')} ${translate('skills')}`, tabIndex: 0, onKeyDown: (e) => {
                                                                            if (e.key === 'Enter') {
                                                                                handlePageScroll({ bottom: true, target: DirectoryDropdownValues.SkillList });
                                                                            }
                                                                        }, onClick: () => {
                                                                            handlePageScroll({ bottom: true, target: DirectoryDropdownValues.SkillList });
                                                                        } }, { children: loadMoreSkills() ? _jsxs(CcfTypography, Object.assign({ sx: classes.cursorOnly }, { children: [" ", translate('loadMore')] })) : '' }))] })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryTeams) && (selectedQueryValue === DirectoryDropdownValues.All ? ((teams === null || teams === void 0 ? void 0 : teams.length) > 0 && !noTeamResultFound) : ((favoriteTeams === null || favoriteTeams === void 0 ? void 0 : favoriteTeams.length) > 0 && isFavoritesFTEnabled)) && _jsxs(Box, Object.assign({ position: 'relative', marginBottom: '20px' }, { children: [_jsx(Box, Object.assign({ left: '10px', width: '100%' }, { children: _jsx(Box, Object.assign({ display: 'flex', justifyContent: 'space-between', height: '30px', marginLeft: '10px' }, { children: _jsx(CcfTypography, { style: { fontWeight: '700' }, variant: 'h4', translationKey: "teams" }) })) })), selectedQueryValue === DirectoryDropdownValues.All &&
                                                                        _jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ overflow: 'auto', position: 'relative', sx: isTeamsLoadMoreClicked ? classes.fullHeightContainer : classes.itemContainerHeight }, { children: !loadingAgentsForTeam && !isDrildown && teams.filter((_, i) => i < offsetIndexForTeam).map((team) => (_jsx(CcfDirectoryTeams, { team: team, getTeamIdFromTeams: getTeamIdFromTeams, setOffsetIndexForAgent: setOffsetIndexForAgent }, team.teamId))) })), _jsx(Box, Object.assign({ sx: classes.cursorPointer && classes.backgroundWhite, position: 'absolute', marginTop: '-5px', width: '100%', display: 'flex', justifyContent: 'center', "data-testid": 'load-more-teams', "aria-label": `${translate('loadMoreOptions')} ${translate('teams')}`, tabIndex: 0, onKeyDown: (e) => {
                                                                                        if (e.key === 'Enter') {
                                                                                            handlePageScroll({ bottom: true, target: DirectoryDropdownValues.TeamList });
                                                                                        }
                                                                                    }, onClick: () => {
                                                                                        handlePageScroll({ bottom: true, target: DirectoryDropdownValues.TeamList,
                                                                                        });
                                                                                    } }, { children: ((teams.length !== 0 && (offsetIndexForTeam < totalTeamsSearchCount) || (teams.length !== 0 && (offsetIndexForTeam < allTeamsCount) && searchContact === '')) ? _jsxs(CcfTypography, Object.assign({ sx: classes.cursorOnly }, { children: [" ", translate('loadMore')] })) : '') }))] }), _jsx(Box, { children: isFavoritesFTEnabled && (favoriteTeams === null || favoriteTeams === void 0 ? void 0 : favoriteTeams.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList &&
                                                                            favoriteTeams.map((team) => (_jsx(CcfDirectoryTeams, { team: team, getTeamIdFromTeams: getTeamIdFromTeams, setOffsetIndexForAgent: setOffsetIndexForAgent }, team.teamId))) })] })), externalDirectoryState && (directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.length) > 0 && (selectedQueryValue === DirectoryDropdownValues.All ? (directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.length) > 0 : (favoriteExtDirectoryEntries === null || favoriteExtDirectoryEntries === void 0 ? void 0 : favoriteExtDirectoryEntries.length) > 0 && isFavoritesFTEnabled) && _jsxs(Box, Object.assign({ position: 'relative', marginBottom: '20px' }, { children: [_jsx(Box, Object.assign({ left: '10px', width: '100%' }, { children: _jsx(Box, Object.assign({ display: 'flex', justifyContent: 'space-between', height: '30px', marginLeft: '10px' }, { children: _jsx(CcfTypography, { style: { fontWeight: '700' }, variant: 'h4', translationKey: "externalDirectories" }) })) })), _jsx(Box, Object.assign({ overflow: 'auto', position: 'relative', sx: classes.fullHeightContainer }, { children: directoryEntries && selectedQueryValue === DirectoryDropdownValues.All && directoryEntries.map((user) => (_jsx(CcfDirectoryEntries, { isFullView: props.isFullView, user: user, isHovering: false, expandDirectoryEntryDetails: expandDirectoryEntryDetails }, user === null || user === void 0 ? void 0 : user.userMappingId))) })), _jsx(Box, { children: isFavoritesFTEnabled && (favoriteExtDirectoryEntries === null || favoriteExtDirectoryEntries === void 0 ? void 0 : favoriteExtDirectoryEntries.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList && favoriteExtDirectoryEntries.map((user) => (_jsx(CcfDirectoryEntries, { isFullView: props.isFullView, user: user, isHovering: false, expandDirectoryEntryDetails: expandDirectoryEntryDetails }, user === null || user === void 0 ? void 0 : user.userMappingId))) }), selectedQueryValue !== DirectoryDropdownValues.FavoriteList && _jsx(Box, Object.assign({ sx: classes.cursorPointer && classes.backgroundWhite, position: 'absolute', marginTop: '-5px', width: '100%', display: 'flex', justifyContent: 'center', "data-testid": 'load-more-directories', "aria-label": `${translate('loadMoreOptions')} ${translate('externalDirectories')}`, onKeyDown: (e) => {
                                                                            if (e.key === 'Enter') {
                                                                                handlePageScroll({ bottom: true, target: DirectoryDropdownValues.ExternalDirectories });
                                                                            }
                                                                        }, onClick: () => {
                                                                            handlePageScroll({ bottom: true, target: DirectoryDropdownValues.ExternalDirectories });
                                                                        }, tabIndex: 0 }, { children: ((directoryEntries.length !== 0 && (totalExternalDirectoryRecord === totalRecordsLimit || totalExternalDirectoryRecord === 2)) ? _jsxs(CcfTypography, Object.assign({ sx: classes.cursorOnly }, { children: [" ", translate('loadMore')] })) : '') }))] }))] }), isExternalDirectoryDrillDown && _jsx(CcfDirectoryEntryDetails, { directoryEntryDetails: selectedDrillDownEntry }), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryStandardAddressBook) && !isExternalDirectoryDrillDown && (selectedQueryValue === DirectoryDropdownValues.All ? (standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length) > 0 : (favoriteStandardAddressBooks === null || favoriteStandardAddressBooks === void 0 ? void 0 : favoriteStandardAddressBooks.length) > 0 && isFavoritesFTEnabled) && _jsxs(Box, Object.assign({ position: 'relative', marginBottom: isFavoritesFTEnabled && selectedQueryValue === DirectoryDropdownValues.FavoriteList ? 0 : '20px' }, { children: [selectedQueryValue === DirectoryDropdownValues.All || ((favoriteStandardAddressBooks === null || favoriteStandardAddressBooks === void 0 ? void 0 : favoriteStandardAddressBooks.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList) ? _jsx(Box, Object.assign({ left: '10px', width: '100%' }, { children: _jsx(Box, Object.assign({ display: 'flex', justifyContent: 'space-between', height: '30px', marginLeft: '10px', marginTop: '10px' }, { children: _jsx(CcfTypography, { style: { fontWeight: '700' }, variant: 'h4', translationKey: 'standardAddressBookHeading' }) })) })) : '', selectedQueryValue === DirectoryDropdownValues.All && _jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ overflow: 'auto', position: 'relative', sx: classes.fullHeightContainer }, { children: _jsx(CcfStandardAddressBook, { addressBookId: 0, renderTwoColumnDesign: false }) })), _jsx(Box, Object.assign({ sx: classes.cursorPointer && classes.backgroundWhite, position: 'absolute', marginTop: '-5px', width: '100%', display: 'flex', justifyContent: 'center', tabIndex: 0, "data-testid": 'load-more-addressBook', "aria-label": `${translate('loadMoreOptions')} ${translate('standardAddressBookHeading')}`, onKeyDown: (e) => {
                                                                        if (e.key === 'Enter') {
                                                                            handlePageScroll({ bottom: true, target: DirectoryDropdownValues.AddressBookList });
                                                                        }
                                                                    }, onClick: () => {
                                                                        handlePageScroll({ bottom: true, target: DirectoryDropdownValues.AddressBookList });
                                                                    } }, { children: (!standardAddressBookMoreDetails.displayDetails && ((searchBoxQuery === '' && (offsetAddressBookIndex < allAddressBookCount)) || (searchContact !== '' && (offsetAddressBookIndex < totalStandardAddressMatchRecords))) ? _jsxs(CcfTypography, Object.assign({ sx: classes.cursorOnly }, { children: [" ", translate('loadMore')] })) : '') }))] }), isFavoritesFTEnabled && (favoriteStandardAddressBooks === null || favoriteStandardAddressBooks === void 0 ? void 0 : favoriteStandardAddressBooks.length) > 0 && selectedQueryValue === DirectoryDropdownValues.FavoriteList &&
                                                            _jsx(CcfStandardAddressBook, { addressBookId: 0, renderTwoColumnDesign: false, fromFavorites: true })] }))] }), ((!isFavoritesFTEnabled && selectedQueryValue === DirectoryDropdownValues.FavoriteList && (favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) === 0)
                                        || (isFavoritesFTEnabled && selectedQueryValue === DirectoryDropdownValues.FavoriteList && (favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) === 0 && (favoriteTeams === null || favoriteTeams === void 0 ? void 0 : favoriteTeams.length) === 0 && (favoriteSkills === null || favoriteSkills === void 0 ? void 0 : favoriteSkills.length) === 0 && (favoriteStandardAddressBooks === null || favoriteStandardAddressBooks === void 0 ? void 0 : favoriteStandardAddressBooks.length) === 0 &&
                                            (externalDirectoryState ? favoriteExtDirectoryEntries.length === 0 : true)
                                            && ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL ? (favoriteDigitalSkills === null || favoriteDigitalSkills === void 0 ? void 0 : favoriteDigitalSkills.length) === 0 : true))
                                        || (selectedQueryValue === DirectoryDropdownValues.FavoriteList && !isAnyFavoriteVisible)
                                        || (selectedQueryValue === DirectoryDropdownValues.AgentList && noAgentResultFound)
                                        || (selectedQueryValue === DirectoryDropdownValues.TeamList && noTeamResultFound)
                                        || (selectedQueryValue === DirectoryDropdownValues.SkillList && noSkillResultFound)
                                        || ((selectedStandardAddressBook === null || selectedStandardAddressBook === void 0 ? void 0 : selectedStandardAddressBook.length) === 0 && !externalDirectoryLoadingStatus && (directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.length) === 0 && totalExternalDirectoryRecord === 0 && (selectedQueryValue !== DirectoryDropdownValues.AgentList && selectedQueryValue !== DirectoryDropdownValues.SkillList &&
                                            selectedQueryValue !== DirectoryDropdownValues.TeamList && selectedQueryValue !== DirectoryDropdownValues.FavoriteList && selectedQueryValue !== DirectoryDropdownValues.All))
                                        || (selectedQueryValue === DirectoryDropdownValues.All && noTeamResultFound && noAgentResultFound && noSkillResultFound && noStandardEntriesFoundAll && (((directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.length) === 0 && externalDirectoryState) || !externalDirectoryState))
                                        || ((selectedQueryValue === null || selectedQueryValue === void 0 ? void 0 : selectedQueryValue.split('_')[0]) === DirectoryDropdownValues.AddressBookList && totalStandardAddressMatchRecords === 0)) && !loading &&
                                        _jsx(CcfTypography, { translationKey: "noMatchesFound", sx: classes.noAgentFoundTypography, "data-testid": 'noRecordsFound', "aria-live": "assertive", "aria-atomic": "true", role: "alert" })] })), currentUser && isFullViewDirectory && ((selectedQueryValue === DirectoryDropdownValues.AgentList && (agentList === null || agentList === void 0 ? void 0 : agentList.length) > 0) ||
                                (selectedQueryValue === DirectoryDropdownValues.FavoriteList && (favoriteAgents === null || favoriteAgents === void 0 ? void 0 : favoriteAgents.length) > 0)) &&
                                _jsx(Box, Object.assign({ sx: classes.fullViewUserSectionLayout }, { children: !loading && (_jsx(CcfDirectoryItemUserSection, { user: currentUser })) }))] }))] })), selectedQueryValue &&
                (((agentLoadingStatus || skillsLoadingStatus || teamsLoadingStatus || externalDirectoryLoadingStatus || isAddressBookDataLoading))
                    ||
                        (loadingAgentsForTeam && isDrildown)
                    ||
                        (selectedQueryValue === DirectoryDropdownValues.TeamList && loadingAgentsForTeam && !isDrildown)) &&
                _jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%", position: 'absolute', bottom: '0px' }, { children: _jsx(CcfLoader, { isPrimary: true }) }))] })));
}
export default memo(CcfDirectory);
//# sourceMappingURL=ccf-directory.js.map