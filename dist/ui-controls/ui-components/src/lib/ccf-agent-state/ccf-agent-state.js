import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectcurrentStatus, getLastSelectedState, getUnavailableCodesAndPcSkills, setAgentState, getUserInfo, userInfoSelector, getTeamName, agentStateActions, getAgentStateFocusStatus, getFavoritesStatesToastReference, getClientDataApiFailedForStateToast, } from './ccf-agent-state.slice';
import { CcfAvailableIcon, CcfLogoutIcon, CcfBox, CcfIconButton, CcfList, useTranslator, CcfNoResultFoundIcon, CcfTypography, CcfDeboucedInput, CcfAppToastMessage, } from '@nice-devone/ui-controls';
import { CcfAgentStateAvatar } from './ccf-agent-state-avatar/ccf-agent-state-avatar';
import { CcfAgentStateCode } from './ccf-agent-state-code/ccf-agent-state-code';
import { logoutUser, } from '../ccf-authentication/ccf-authentication.slice';
import { Divider, useTheme, InputAdornment, Stack, useMediaQuery, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import CcfAgentStateNextState from './ccf-agent-state-next-state/ccf-agent-state-next-state';
import { AgentStates, CallType, FeatureToggleService } from '@nice-devone/agent-sdk';
import { toast } from 'react-toastify';
import { allDigitalContactCard, getNonIncomingActiveContactInSelectedInteraction, getPersonalQueue, getCompiledACDContacts, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { globalActions } from '../global.app.slice';
import ccfAgentStateStyles from './ccf-agent-state.styles';
import { Timer } from '../../util/timer/timer';
import { ACDSessionManager, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { getAgentSessionInfo } from '../ccf-acd-session/ccf-acd-session.slice';
import CcfAriaLiveAnnouncer from '../ccf-aria-live-announcer/ccf-aria-live-announcer';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import { getFavoritesToastReference } from '../ccf-directory/+state/ccf-directory.slice';
import { removePreviousContactFocus } from '../ccf-assignment-panel/ccf-assignment-utils';
/**
 * Component displays popup with all code for agent state
 * @param props -CcfAgentStateProps
 * @returns popup component with all code for agent state
 * @example <CcfAgentState/>
 */
export function CcfAgentState(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const acdSession = ACDSessionManager.instance;
    const acdContactList = useSelector(getCompiledACDContacts);
    const userInfo = useSelector(userInfoSelector);
    const agentStateStatus = useSelector(selectStatus);
    const agentCurrentStatus = useSelector(selectcurrentStatus);
    const selectedState = useSelector(getLastSelectedState);
    const voicePreferenceSession = useSelector(getAgentSessionInfo);
    const dispatch = useDispatch();
    const [showGoAvailableButton, setGoAvailableButton] = useState(true);
    const [showAllUnavailableStatus, setAllUnavailableStatus] = useState(false);
    const [audioIsPrimed, setAudioIsPrimed] = useState(false);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const [translate] = useTranslator();
    const appToastContainer = React.useRef();
    const initials = ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.firstName) ? userInfo.firstName.charAt(0).toUpperCase() : '') +
        ((userInfo === null || userInfo === void 0 ? void 0 : userInfo.lastName) ? userInfo.lastName.charAt(0).toUpperCase() : '');
    const theme = useTheme();
    const sxStyles = ccfAgentStateStyles(theme);
    const [filteredStatus, setfilteredStatus] = useState([]);
    const searchRef = useRef('');
    const [searchKey, setSearchValue] = React.useState('');
    const [searchEnable, setSearchClick] = React.useState(false);
    const WORKING = 'working';
    const [startTime, setStartTime] = useState(new Date(((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.startTime) || ''));
    const personalQueue = useSelector(getPersonalQueue);
    const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const appStateRef = useRef(null);
    const getAppStateFocusStatus = useSelector(getAgentStateFocusStatus);
    const { setSelectedState, focusAgentState } = agentStateActions;
    const digitalContacts = useSelector(allDigitalContactCard);
    const isDigitalWorkingStageEnabled = isFeatureEnabled("release-cx-agent-state-working-digital-AW-24442" /* FeatureToggles.DIGITAL_WORKING_STATE_HACK_FEATURE_TOGGLE */);
    const isDigitalWorkingDisableTimerEnabled = isFeatureEnabled("release-digital-no-timer-AW-36494" /* FeatureToggles.NO_TIMER_FEATURE_TOGGLE */);
    const [isInitialLoad, setInitialLoad] = useState(true);
    const favoritesToastReferenceForState = useSelector(getFavoritesStatesToastReference);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const showApiFailedToast = useSelector(getClientDataApiFailedForStateToast);
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    const currentStateRef = useRef(null);
    const [isComposing, setIsComposing] = useState(false);
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
        if (favoritesToastReferenceForState)
            toast.dismiss(favoritesToastReferenceForState);
        appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "error", titleKey: "error", messageKey: messageKey }), {
            autoClose: false,
            closeButton: true,
            containerId: 'AppToastContainer',
            position: 'top-center',
        });
        dispatch(agentStateActions.updateFavsToastReference(appToastContainer.current));
    };
    useEffect(() => {
        if ((showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.storageExceeded) && isFavoritesFTEnabled) {
            showFavoritesErrorToast('clientDataApiStorageExceeded');
        }
        else if ((showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.apiFailed) && isFavoritesFTEnabled) {
            showFavoritesErrorToast('networkFailure');
        }
    }, [showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.storageExceeded, showApiFailedToast === null || showApiFailedToast === void 0 ? void 0 : showApiFailedToast.apiFailed]);
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);
    useEffect(() => {
        var _a;
        setGoAvailableButton(true);
        setAllUnavailableStatus(false);
        setStartTime(new Date(((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.startTime) || ''));
    }, [
        (_b = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _b === void 0 ? void 0 : _b.state,
        (_c = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _c === void 0 ? void 0 : _c.reason,
        (_d = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _d === void 0 ? void 0 : _d.skillName,
        (_e = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _e === void 0 ? void 0 : _e.isPersonalConnection
    ]);
    useEffect(() => {
        dispatch(getUserInfo());
        const skillsSubscription = acdSession.updateSkillsEvent.subscribe(() => {
            dispatch(getUnavailableCodesAndPcSkills());
        });
        dispatch(getUnavailableCodesAndPcSkills());
        dispatch(getTeamName());
        // Cleanup subscription on unmount
        return () => {
            skillsSubscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        var _a, _b;
        if (getAppStateFocusStatus) {
            setAllUnavailableStatus(true);
            ((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.state.toLowerCase()) !==
                AgentStates.Available && setGoAvailableButton(false);
            (_b = appStateRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            dispatch(focusAgentState(false));
        }
    }, [getAppStateFocusStatus]);
    useEffect(() => {
        searchRef.current = searchKey;
        searchKey && searchFunction(searchKey);
        return () => {
            setSearchClick(false);
        };
    }, [searchKey]);
    /**
     * If Feature toggle is on no timer is returned for digital contact's working state
     * else returns ACD status timer
     * @example showTimer(true, [])
     * @param showParenthesisForTimer - boolean this should be true if timer is being displayed in the dom
     * @param acdContactList - ContactData[] list of agent's ACD contacts for digital timer FT
     */
    const showTimer = (showParenthesisForTimer, acdContactList) => {
        var _a, _b;
        const ftWorkingStateHackConditions = isDigitalWorkingStageEnabled &&
            digitalContacts && digitalContacts.length > 0 &&
            ((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.state.toLowerCase()) === AgentStates.Available.toLowerCase();
        // helper variable for no digital timer FT
        const onlyDigitalContactsAssigned = digitalContacts && digitalContacts.length > 0 &&
            acdContactList && acdContactList.length === 0;
        const ftNoDigitalTimerConditions = isDigitalWorkingDisableTimerEnabled &&
            onlyDigitalContactsAssigned &&
            ((_b = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _b === void 0 ? void 0 : _b.state.toLowerCase()) === AgentStates.Working.toLowerCase();
        // Feature toggle AW-24442: remove timer for digital contact's working state.
        if (ftWorkingStateHackConditions || ftNoDigitalTimerConditions) {
            return '';
        }
        if (showParenthesisForTimer) {
            return _jsxs(_Fragment, { children: ["(", getTimer(), ")"] });
        }
        return getTimer();
    };
    /**
     * Function to get the current timer value
     * @example getTimer()
     */
    const getTimer = () => {
        var _a;
        let countUp = true;
        const currentState = (_a = agentStateStatus.agentStatus) === null || _a === void 0 ? void 0 : _a.currentState;
        const serverTimeOffset = LocalStorageHelper.getItem(StorageKeys.SERVER_TIME_OFFSET) || 0;
        let stopInMil = Number.MAX_SAFE_INTEGER;
        let startInMil = 0;
        // if in non-required disposition with a ACW Timeout
        if ((currentState === null || currentState === void 0 ? void 0 : currentState.state.toLowerCase()) === AgentStates.Unavailable &&
            (currentState === null || currentState === void 0 ? void 0 : currentState.isACW) &&
            (currentState === null || currentState === void 0 ? void 0 : currentState.acwTimeout) > 0) {
            startInMil = (currentState === null || currentState === void 0 ? void 0 : currentState.acwTimeout) * 1000;
            stopInMil = 0;
            countUp = false;
        }
        const startTimeInMil = Number(startTime) - Number(serverTimeOffset);
        return (_jsx(Timer, { start: startInMil, stop: stopInMil, startReference: startTimeInMil, countUp: countUp, longTimerFormat: true }, startTime + ((currentState === null || currentState === void 0 ? void 0 : currentState.state) || '')));
    };
    /**
     * Function to update the state of the agent as well as prime the audio
     * @param newState - Status
     * @example updateState(newState)
     */
    const UpdateAgentState = (newState) => {
        if (!audioIsPrimed) {
            PrimeAudio();
        }
        dispatch(setAgentState({ selectedState: newState }));
        if (Object.getPrototypeOf(newState) === 'Status') {
            dispatch(setSelectedState({ selectedState: newState }));
        }
    };
    /**
     * Primes audio so ringer works while minimized
     * @example PrimeAudio()
     */
    const PrimeAudio = () => {
        setAudioIsPrimed(true);
        const roleName = 'audioPrimer';
        const audioElement = document.createElement('audio');
        const role = document.createAttribute('role');
        role.value = roleName;
        audioElement.setAttributeNode(role);
        audioElement.src = '/assets/audio/ziptone_glock4.mp3';
        audioElement.volume = 0.001;
        audioElement.onpause = () => { document.body.removeChild(audioElement); };
        document.body.appendChild(audioElement);
        audioElement.play();
    };
    /**
     * Function to handle status display of agent
     * @example handleStatusDisplay()
     */
    const handleStatusDisplay = () => {
        var _a, _b, _c, _d;
        const agentState = ((_b = (_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === AgentStates.Available
            ? AgentStates.Unavailable
            : AgentStates.Available;
        const input = {
            reason: agentState,
            state: agentState,
        };
        (_c = appStateRef === null || appStateRef === void 0 ? void 0 : appStateRef.current) === null || _c === void 0 ? void 0 : _c.focus();
        if (((_d = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _d === void 0 ? void 0 : _d.state.toLowerCase()) !== WORKING) {
            setStartTime(new Date());
        }
        else {
            setAllUnavailableStatus(false);
            setGoAvailableButton(true);
        }
        UpdateAgentState(input);
    };
    /**
     * Function to sort arrays
     * @param states - Status[]
     * @example sortArrays(states)
     * @returns Status[]
     */
    const sortArrays = (states) => {
        const sortedStates = states && states
            .sort((a, b) => {
            if (a.reason.toLowerCase() < b.reason.toLowerCase()) {
                return -1;
            }
            return a.reason.toLowerCase() > b.reason.toLowerCase() ? 1 : 0;
        });
        return sortedStates;
    };
    /**
     * Function to sort an agents unavailable codes, then PC dialer skills, and concat them.
     * @param void -
     * @example sortStates()
     * @returns Status[]
     */
    const sortStates = () => {
        var _a;
        if (isInitialLoad && isFavoritesFTEnabled) {
            const getFavoriteStatesFromClientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true);
            LocalStorageHelper.setItem(StorageKeys.CXA_FAV_AGENT_STATES, (getFavoriteStatesFromClientData === null || getFavoriteStatesFromClientData === void 0 ? void 0 : getFavoriteStatesFromClientData.CXAFavStates) || []);
            setInitialLoad(false);
        }
        const favKey = isFavoritesFTEnabled ? StorageKeys.CXA_FAV_AGENT_STATES : StorageKeys.FAVORITE_AGENT_STATES;
        const favorites = (LocalStorageHelper.getItem(favKey, true) || []).map((state) => state.toLowerCase());
        const isAvailableFavorite = favorites === null || favorites === void 0 ? void 0 : favorites.includes('available');
        const availableState = [
            {
                id: 'available',
                isFavourite: isAvailableFavorite || false,
                reason: translate('available'),
                state: 'Available',
                isActive: true,
                isAcw: false,
                isPersonalConnection: false,
                skillName: '',
            }
        ];
        const sortedUnavailableCodes = sortArrays(agentStateStatus.allStatus.filter((code) => !code.isPersonalConnection));
        const sortedPcDialerSkills = sortArrays(agentStateStatus.allStatus.filter((code) => code.isPersonalConnection));
        // The platform does not return data for the available state, so we add it here.
        const sortedArray = [...availableState, ...sortedUnavailableCodes, ...sortedPcDialerSkills];
        if (isFavoritesFTEnabled) {
            const favStates = ((_a = LocalStorageHelper.getItem(StorageKeys.CXA_FAV_AGENT_STATES, true)) === null || _a === void 0 ? void 0 : _a.map((state) => state.toLowerCase())) || [];
            const updatedSortedArray = sortedArray.map(item => {
                var _a;
                return (Object.assign(Object.assign({}, item), { isFavourite: favStates.includes((_a = item === null || item === void 0 ? void 0 : item.reason) === null || _a === void 0 ? void 0 : _a.toLowerCase()) }));
            });
            return updatedSortedArray;
        }
        else {
            return sortedArray;
        }
    };
    const sortedStatus = sortStates();
    /**
     * Function to handle agent state
     * @param agentState - boolean
     * @example handleAgentState(true)
     * @returns
     */
    const handleAgentState = (agentState) => {
        return (_event) => {
            var _a, _b, _c;
            (_a = appStateRef === null || appStateRef === void 0 ? void 0 : appStateRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            dispatch(getUnavailableCodesAndPcSkills());
            setAllUnavailableStatus(agentState);
            ((_c = (_b = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _b === void 0 ? void 0 : _b.state) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !==
                AgentStates.Available && setGoAvailableButton(!agentState);
        };
    };
    /**
     * Function to control child container focus on keyboard tab
     * @param agentState - boolean
     * @example handleAgentStateFocus(true)
     * @returns
     */
    const handleAgentStateFocus = (onFocus) => {
        return () => {
            var _a;
            setAllUnavailableStatus(onFocus);
            ((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.state.toLowerCase()) !==
                AgentStates.Available && setGoAvailableButton(!onFocus);
        };
    };
    /**
     * Function to control child container focus on keyboard tab
     * @param e - Keyboard Event
     * @example handleAgentStateKeyDown()
     * @returns
     */
    const handleAgentStateKeyDown = (e) => {
        var _a;
        if (isComposing)
            return;
        let handleKeyPress = false;
        let hasFocus = false;
        if (e.key === 'Enter' && (currentStateRef === null || currentStateRef === void 0 ? void 0 : currentStateRef.current) && (currentStateRef === null || currentStateRef === void 0 ? void 0 : currentStateRef.current) === e.target) {
            handleKeyPress = true;
            hasFocus = true;
        }
        else if (e.key === 'Escape' || e.key === 'Tab' && e.shiftKey && e.target.id === 'agent-state-section') {
            //check id for alt-tabbing away from agent state section
            handleKeyPress = true;
            hasFocus = false;
        }
        if (handleKeyPress) {
            setAllUnavailableStatus(hasFocus);
            ((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.state.toLowerCase()) !==
                AgentStates.Available && setGoAvailableButton(!hasFocus);
        }
        if (handleKeyPress && hasFocus && !showGoAvailableButton) {
            //go available button is focused and user hits enter
            handleStatusDisplay();
        }
    };
    const filteredFavStatus = sortedStatus.length && sortedStatus.filter((fav) => fav.isFavourite);
    /**
     * @example dispatch an action for force logout
     */
    const forceLogout = () => {
        var _a;
        const hasActiveContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) ? true : false;
        const isDialerState = ((_a = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _a === void 0 ? void 0 : _a.cxoneState) === 'Dialer';
        const activeContactsStatus = {
            forceLogOff: hasActiveContact || isDialerState,
            ignorePersonaQueue: personalQueue.length > 0 ? true : false,
        };
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        dispatch(logoutUser(activeContactsStatus));
        toast.dismiss(appToastContainer.current);
        /**
         * Defocuses the current focused contact on logout
         */
        removePreviousContactFocus(dispatch, true, true);
    };
    /**
     * @example dismiss toast on cancel
     */
    const dismissToast = () => {
        dispatch(globalActions.logoutToastMessageConfirmed(false));
        toast.dismiss(appToastContainer.current);
    };
    /**
     * Function to get Message text key
     * @example getMessageKey()
     */
    const getMessageKey = () => {
        if ((agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState.state) === AgentStates.Working ||
            (agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState.reason) === AgentStates.AfterCallWork) {
            return 'activeContactsInQueue';
        }
        return (personalQueue === null || personalQueue === void 0 ? void 0 : personalQueue.length) ? 'pendingContactsInQueue' : 'logOutConfonfirmationMsg';
    };
    /**
     * Function to display logout action when logout button is clicked
     * @example logOutClickHandler()
     * @returns
     */
    const logOutClickHandler = () => {
        setAllUnavailableStatus(false); // Close agent states popup
        dispatch(globalActions.logoutToastMessageConfirmed(true));
        appToastContainer.current = toast.warn(_jsx(CcfAppToastMessage, { type: "warning logoutConfirmationPanel", titleKey: "logOutConfirmationTitle", messageKey: getMessageKey(), primaryBtnText: "logOut", secondaryBtnText: "cancel", triggerPrimaryHandler: () => forceLogout(), triggerSecondaryHandler: () => dismissToast() }), {
            autoClose: false,
            closeButton: false,
            containerId: 'AppToastContainer',
        });
        dispatch(globalActions.storeLogoutToastRefrence(appToastContainer.current));
    };
    /**
     * Function to set search string
     * @param e - string
     * @example dispatchQueryUpdateAction('available')
     * @returns
     */
    const dispatchQueryUpdateAction = (e) => {
        setSearchValue(e);
    };
    /**
     * Function to filter search string and set filtered array in the list to display on ui
     * @param _event - string
     * @example searchFunction('available')
     * @returns
     */
    const searchFunction = (_event) => {
        const list = searchKey.length === 0
            ? sortedStatus
            : sortedStatus.filter((sortedStatus) => sortedStatus.reason.toLowerCase().includes(searchKey.toLowerCase()));
        let reformattedArray = [];
        if (searchKey) {
            reformattedArray = list.map((item) => ({
                id: item.id,
                isFavourite: item.isFavourite,
                state: item.state,
                isAcw: item === null || item === void 0 ? void 0 : item.isAcw,
                displayText: item.reason.replace(new RegExp(searchKey, 'gi'), (match) => `<b>${match}</b>`),
                reason: item.reason,
                skillName: item.skillName,
                isPersonalConnection: item.isPersonalConnection,
            }));
        }
        setfilteredStatus(reformattedArray);
        const ariaUpdatedMessage = `${reformattedArray === null || reformattedArray === void 0 ? void 0 : reformattedArray.length} results found for search key ${searchKey}`;
        ;
        dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: ariaUpdatedMessage }));
        setSearchClick(true);
    };
    /**
     * Function to reset the search string onFocusOut from the container
     * @example resetSearch()
     * @returns
     */
    const resetSearch = () => {
        searchRef.current = '';
        setSearchValue('');
        setfilteredStatus([]);
        setSearchClick(false);
    };
    /**
     * Function to set handleAgentState(false) and reset search string onFocusOut from the container
     * @example callMultiFunctions()
     * @returns
     */
    const callMultiFunctions = () => {
        handleAgentState(false);
        resetSearch();
    };
    /**
     * Function for translating the Refused Agent State
     * @param code - string ex- 'refused'
     * @example translateAgentReason(code)
     */
    const translateAgentReason = (reason) => {
        if (reason === 'Refused') {
            return translate('refused');
        }
        return reason;
    };
    /**
     * Function for translating agent states
     * @param code - string -ex 'available'
     * @example agentStateCode(code)
     */
    const agentStateCode = (state) => {
        const agentState = state && state.toLowerCase();
        switch (agentState) {
            case AgentStates.Available:
                return AgentStates.Available;
            case WORKING || AgentStates.Dialer || AgentStates.DialerPending:
                return WORKING;
            default:
                return AgentStates.Unavailable;
        }
    };
    /**
     * Function to return a state of working if the agent is in a digital channel and available
     * @param agentState - string
     * @example getDigitalWorkingState('working')
     * @returns
     */
    const getDigitalWorkingState = (state) => {
        let agentState = state;
        //Feature Toggle AW-24442: Set working state for digital contact and availeable state.  
        if (isDigitalWorkingStageEnabled && digitalContacts && digitalContacts.length > 0 && agentState.toLowerCase() === AgentStates.Available.toLowerCase()) {
            agentState = AgentStates.Working;
        }
        return agentState;
    };
    const stateSkillName = (_f = selectedState === null || selectedState === void 0 ? void 0 : selectedState.selectedState) === null || _f === void 0 ? void 0 : _f.skillName;
    const pcSkillName = voicePreferenceSession === null || voicePreferenceSession === void 0 ? void 0 : voicePreferenceSession.dialerCampaign;
    const skillName = stateSkillName ? stateSkillName : pcSkillName;
    useEffect(() => {
        /**
         * Function to check if mouseclick is outside of appState container
         * @param event - MouseEvent
         * @example - handleOutsideClick(event)
         */
        const handleOutsideClick = (event) => {
            if (appStateRef.current && !appStateRef.current.contains(event.target)) {
                setAllUnavailableStatus(false);
                setGoAvailableButton(true);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []); // This should be empty so it runs only once
    return (_jsxs(Box, Object.assign({ tabIndex: getAppStateFocusStatus ? 0 : -1, ref: appStateRef }, { children: [_jsx(CcfAriaLiveAnnouncer, {}), _jsxs(CcfBox, Object.assign({ component: 'section', sx: [sxStyles.agentStatusSelection, sxStyles.agentStatusSection], onMouseEnter: handleAgentState(true), onMouseLeave: (e) => !isComposing && handleAgentState(false)(e), onKeyDown: handleAgentStateKeyDown, onCompositionStart: () => setIsComposing(true), onCompositionEnd: (e) => {
                    setIsComposing(false);
                    // After composition ends, we manually trigger the keydown handler to process the input
                    handleAgentStateKeyDown(e);
                }, tabIndex: 0, onFocus: handleAgentStateFocus(true), id: 'agent-state-section', "data-testid": "agent-state-section", "aria-label": agentCurrentStatus && ((_g = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _g === void 0 ? void 0 : _g.reason), role: "button", ref: currentStateRef }, { children: [!showGoAvailableButton ? (_jsx(CcfBox, Object.assign({ sx: sxStyles.displayStateSelect, component: "div", "aria-live": "assertive", "data-testid": "status-display-box" }, { children: _jsxs(CcfBox, Object.assign({ sx: [sxStyles.hoverButton, sxStyles.goAvlButton, sxStyles.stateBorder], onClick: () => handleStatusDisplay() }, { children: [_jsx(CcfAvailableIcon, { sx: sxStyles.iconAvailable }), _jsx(CcfTypography, { variant: "inherit", sx: sxStyles.hoverButtonText, translationKey: "goAvailable" })] })) }))) : (_jsx(CcfBox, Object.assign({ display: "flex", justifyContent: isBelowMd ? 'center' : 'inherit', alignItems: "center", "data-testid": "current-agent-state", sx: [sxStyles.stateSelected, sxStyles.activeState], style: props === null || props === void 0 ? void 0 : props.activeState }, { children: _jsxs(_Fragment, { children: [_jsx(CcfAgentStateAvatar, { agentCurrentStatus: getDigitalWorkingState(((_h = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _h === void 0 ? void 0 : _h.reason) ||
                                        ((_j = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _j === void 0 ? void 0 : _j.state) || ''), initials: initials }), _jsxs(CcfTypography, Object.assign({ variant: "body1", variantMapping: { 'body1': 'span' }, overflow: 'hidden', sx: sxStyles.agentStatus }, { children: [agentCurrentStatus && agentCurrentStatus.currentState.state && (_jsx(CcfBox, Object.assign({ paddingLeft: '5px', "aria-label": (translateAgentReason(getDigitalWorkingState((_k = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _k === void 0 ? void 0 : _k.reason) ||
                                                translate(getDigitalWorkingState(agentStateCode(agentCurrentStatus.currentState.state.toLowerCase())).toLowerCase()))) }, { children: _jsxs(Stack, Object.assign({ direction: 'column', sx: sxStyles.breakStatus }, { children: [(translateAgentReason(getDigitalWorkingState((_l = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _l === void 0 ? void 0 : _l.reason) ||
                                                        translate(getDigitalWorkingState(agentStateCode(agentCurrentStatus.currentState.state.toLowerCase())).toLowerCase()))), _jsxs("span", { children: [" ", showTimer(true, acdContactList)] })] })) }))), (((_m = agentCurrentStatus === null || agentCurrentStatus === void 0 ? void 0 : agentCurrentStatus.currentState) === null || _m === void 0 ? void 0 : _m.isPersonalConnection) || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.callType) === CallType.NATURAL_CALLING) && (_jsx(CcfTypography, Object.assign({ variant: 'h4', noWrap: true, "aria-label": skillName, textOverflow: 'ellipsis', paddingLeft: '6px' }, { children: skillName })))] }))] }) }))), !(props === null || props === void 0 ? void 0 : props.agentStateForEmbeededView) && showAllUnavailableStatus && (_jsxs(CcfBox, Object.assign({ sx: [
                            sxStyles.unavailableStatusSelection,
                            sxStyles.agentStateListContainer,
                            sxStyles.unavailableCodesSelection,
                            sxStyles.stateBorder
                        ], onMouseEnter: handleAgentState(true), onMouseLeave: () => !isComposing && callMultiFunctions(), "data-testid": "ccf-box" }, { children: [_jsx(CcfBox, { children: _jsx(CcfAgentStateNextState, {}) }), _jsx(CcfDeboucedInput, { size: "small", sx: [sxStyles.searchTextBox, sxStyles.stateBorder], style: {
                                    background: `${(_p = (_o = theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper}`,
                                }, InputProps: {
                                    startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(Search, { sx: [sxStyles.searchIcon, sxStyles.searchIconColor] }) }))),
                                }, onChange: (event) => !isComposing && dispatchQueryUpdateAction(event.target.value), onCompositionStart: () => setIsComposing(true), onCompositionEnd: (e) => {
                                    setIsComposing(false);
                                    // After composition ends, we manually trigger the onChange handler to process the input
                                    dispatchQueryUpdateAction(e.target.value);
                                }, variant: "outlined", fullWidth: true, delay: 1000, value: searchKey, inputProps: { 'data-testid': 'content-input', 'aria-label': translate('search'), 'placeholder': translate('agentStatus') } }), searchKey ? (_jsx(CcfBox, Object.assign({ "data-testid": "filteredStatusId" }, { children: _jsx(CcfList, Object.assign({ sx: sxStyles.stateCodesList }, { children: filteredStatus.map((other) => (_jsx(CcfAgentStateCode, { fav: other, updateAgentState: UpdateAgentState }, `Agent-state-code-${other.id}`))) })) }))) : (_jsxs(CcfBox, Object.assign({ sx: sxStyles.allStatus }, { children: [' ', filteredFavStatus && filteredFavStatus.length > 0 && (_jsxs(_Fragment, { children: [_jsx(CcfTypography, { variant: "inherit", sx: [sxStyles.favoriteLabel, sxStyles.titleLabel], translationKey: "favorites" }), _jsx(CcfList, Object.assign({ sx: sxStyles.stateCodesList }, { children: filteredFavStatus.map((fav) => (_jsx(CcfAgentStateCode, { fav: fav, updateAgentState: UpdateAgentState }, `Agent-state-code-${fav.id}`))) })), _jsx(Divider, {})] })), _jsxs(CcfBox, { children: [_jsx(CcfTypography, { variant: "inherit", sx: [sxStyles.labelAllCodes, sxStyles.titleLabel], translationKey: "allCodesX", extraArgs: { format: [sortedStatus.length] } }), _jsx(CcfList, Object.assign({ sx: sxStyles.stateCodesList }, { children: sortedStatus.map((other) => (_jsx(CcfAgentStateCode, { fav: other, updateAgentState: UpdateAgentState }, `Agent-state-code-${other.id}`))) }))] })] }))), (filteredStatus === null || filteredStatus === void 0 ? void 0 : filteredStatus.length) === 0 && searchEnable && (_jsx(CcfNoResultFoundIcon, { "data-testid": "noAgentfound", sx: sxStyles.noResultFoundIcon })), _jsx(Divider, {}), _jsxs(CcfIconButton, Object.assign({ sx: [sxStyles.logout, sxStyles.logoutBg], tabIndex: 0, disableRipple: true, "aria-label": translate('logOut'), onClick: logOutClickHandler, "data-testid": "logout", onBlur: handleAgentStateFocus(false) }, { children: [_jsx(CcfLogoutIcon, { sx: sxStyles.logOutIcon, fill: theme.palette.text.contrastText }), _jsx(CcfTypography, { sx: [sxStyles.logoutText, sxStyles.logoutTextFont], translationKey: "logOut" })] }))] })))] }))] })));
}
export default memo(CcfAgentState);
//# sourceMappingURL=ccf-agent-state.js.map