import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcfAccordionDetails, CcfAccordionSummary, CcfAlert, CcfBox, CcfDoubleArrowIcon, CcfIconButton, CcfPlusIcon, CcfTypography, useTranslator, CcfAccordion, } from '@nice-devone/ui-controls';
import customerCardStyles from './ccf-customer-card.styles';
import { CcfCustomerCardDetails, } from './ccf-customer-card-details/ccf-customer-card-details';
import { CcfCustomerCardDetailsTitle } from './ccf-customer-card-title/ccf-customer-card-title';
import { CcfAssignmentAction, getCollapsedCard, voiceMailContactDetailsSelector, getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, getDigitalContactByCaseId, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { searchCustomerCard, CcfCustomerCardActions, selectCurrentCaseId, selectCurrentCaseNoteObj, isCustomerCardNoteDeletedSelector, cxoneCustomerCardIdentities, cxoneCCActivity, cxoneDigitalContactDetails, cxoneVoiceContactDetails, cxoneCustomerCardFullName, cxoneCustomerCardDetailsLoading, } from './ccf-customer-card.slice';
import * as CcfCustomerCardSlice from './ccf-customer-card.slice';
import { Typography, useTheme } from '@mui/material';
import CcfCustomerCardActivity from './ccf-customer-card-activity/ccf-customer-card-activity';
import { getIsViewDetailsClicked, getSelectedMenuName } from '../../global.app.slice';
import CcfCustomerCardSearch from './ccf-customer-card-search/ccf-customer-card-search';
import { CcfCustomerCardNotes } from './ccf-customer-card-notes/ccf-customer-card-notes';
import { MediaType, CustomerCardSections } from '@nice-devone/common-sdk';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import { getcurrentCustomerContactInfo } from '../ccf-digital-search/ccf-digital-search.slice';
import { CcfCustomerCardPinRecords } from './ccf-customer-card-pinrecords/ccf-customer-card-pinrecords';
import { selectAppSpaceActiveTabStatus } from '../ccf-app-space.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { ToastContainer } from 'react-toastify';
import { Navigation } from '../../../enums/navigation-menus';
import * as CcfCustomerCardRelatesTo from './ccf-customer-card-pinrecords/ccf-customer-card-relates-to';
/**
   * Function to check and return specific component based on the condition
   * @param customerName - name of customer
   * @param goBackFunction - merge status of the button
   * @param externalIdsToExclude - External ids which need to exclude
   * @returns CcfCustomerCardSearch
   * @example getCustomerCardSearchComponent()
   */
const getCustomerCardSearchComponent = (customerName, goBackFunction, externalIdsToExclude) => {
    return (_jsx(CcfCustomerCardSearch, { customerName: customerName, returnToMainScreen: goBackFunction, externalIdsToExclude: externalIdsToExclude }));
};
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCard() {
    var _a, _b, _c, _d;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const referenceForContainer = useRef(null);
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = customerCardStyles(theme);
    const [expanded, setExpanded] = useState(['detail']);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const previousActiveContact = useSelector(getDigitalContactByCaseId(LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID)));
    const collapsedCard = useSelector(getCollapsedCard);
    const dispatch = useDispatch();
    const [customerName, setcustomerName] = useState('');
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    const [customerID, setcustomerID] = useState('');
    const [customerIDKeyForNotes, setcustomerIDKeyForNotes] = useState('');
    const [DNIS, setDNIS] = useState('');
    const [newNoteState, setNewNoteState] = useState(false);
    const [skillname, setSkillName] = useState('');
    const getdigitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const currentCaseNoteObj = useSelector(selectCurrentCaseNoteObj);
    const voiceContactDetails = useSelector(cxoneVoiceContactDetails);
    const [customerData] = useState({ customFields: [] });
    const voiceMailContactDetails = useSelector(voiceMailContactDetailsSelector);
    const customerCardFullName = useSelector(cxoneCustomerCardFullName);
    const customerCardDetailsLoading = useSelector(cxoneCustomerCardDetailsLoading);
    const isViewDetailsClicked = useSelector(getIsViewDetailsClicked);
    const currentCaseId = useSelector(selectCurrentCaseId);
    const isNoteDeleted = useSelector(isCustomerCardNoteDeletedSelector);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const [isActivityDisabled, setIsActivityDisabled] = useState(true);
    const [isCurrentInteractionDisabled, setIsCurrentInteractionDisabled] = useState(true);
    const [isMergeButtonClicked, setIsMergeButtonClicked] = useState(false);
    const [ccMergeErrorResponse, setCCMergeErrorResponse] = useState({});
    const [showCCAlert, setShowCCAlert] = useState(false);
    let alertText = (isNoteDeleted === null || isNoteDeleted === void 0 ? void 0 : isNoteDeleted.status) ? translate('noteDeleted') : translate('contactCardMerged');
    const currentCase = useSelector(selectCurrentCaseNoteObj);
    const [plusBtnFlg, setPlusBtnFlg] = useState(false);
    const [inboxAsigneeUser, setInboxAssigneeUser] = useState({ firstName: '', surname: '' });
    const CXoneIdentities = useSelector(cxoneCustomerCardIdentities);
    const externalIdsToExclude = CXoneIdentities === null || CXoneIdentities === void 0 ? void 0 : CXoneIdentities.map((id) => id.idOnExternalPlatform);
    const customerContactIdFromSearch = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.customerId;
    const [isPinRecordsAvailable, isSetPinRecordsAvailable] = useState(false);
    const activityData = useSelector(cxoneCCActivity);
    const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.find((item) => item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) || item.contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
    const isCustomerCardPopupOpen = (_b = useSelector(getcurrentCustomerContactInfo)) === null || _b === void 0 ? void 0 : _b.isCustomerCardPopupOpen;
    const selectedMenu = useSelector(getSelectedMenuName);
    const userDetails = (_c = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _c !== void 0 ? _c : {};
    const [showChannels, setShowChannels] = useState(false);
    const [contactHistoryComponent, setContactHistoryComponent] = useState(null);
    const [interactionHistoryComponent, setInteractionHistoryComponent] = useState(null);
    const LazyLoadCCChannels = lazy(() => import('./ccf-customer-card-channels/ccf-customer-card-channel'));
    useEffect(() => {
        var _a;
        const activityResult = (selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result) && (selectedActivityData === null || selectedActivityData === void 0 ? void 0 : selectedActivityData.result[0]);
        if (((_a = activityResult === null || activityResult === void 0 ? void 0 : activityResult.pinRecords) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            isSetPinRecordsAvailable(true);
        }
        else {
            isSetPinRecordsAvailable(false);
        }
    }, [activityData]);
    useEffect(() => {
        if (isNoteDeleted === null || isNoteDeleted === void 0 ? void 0 : isNoteDeleted.status) {
            setCCMergeErrorResponse({});
            ((isNoteDeleted === null || isNoteDeleted === void 0 ? void 0 : isNoteDeleted.status) === 'failed' && (isNoteDeleted === null || isNoteDeleted === void 0 ? void 0 : isNoteDeleted.ccNoteDeletedErrorDescription) === undefined) ? setShowCCAlert(false) : setShowCCAlert(true);
        }
    }, [isNoteDeleted]);
    useEffect(() => {
        var _a;
        if (currentCase && currentCase.noteCRUDState) {
            setPlusBtnFlg(true);
            setNewNoteState(!currentCase.id);
        }
        else {
            setPlusBtnFlg(false);
            setNewNoteState(false);
        }
        // if card sections are loaded previously before switching to new case then load them again
        if ((expanded === null || expanded === void 0 ? void 0 : expanded.length) > 0) {
            const sectionsToLoad = (_a = Object.values(CustomerCardSections)) === null || _a === void 0 ? void 0 : _a.filter(section => expanded.includes(section));
            sectionsToLoad.forEach(section => dynamicallyLoadComponents(section));
        }
    }, [currentCase, currentCaseId]);
    /**
    * dynamically load expanded session components based on section name from customer card if not loaded already.
    * @example dynamicallyLoadComponents(channels)
    * @param componentName - string
    */
    const dynamicallyLoadComponents = (componentName) => {
        switch (componentName) {
            case CustomerCardSections.INTERACTION_HISTORY:
                if (!interactionHistoryComponent)
                    loadInteractionHistoryComponent();
                break;
            case CustomerCardSections.CONTACT:
                if (!contactHistoryComponent)
                    loadContactHistoryComponent();
                break;
            case CustomerCardSections.CHANNELS:
                setShowChannels(true);
                break;
            default:
                break;
        }
    };
    /**
    * dynamically load contact history components based on expanded section from customer card.
    * @example loadContactHistoryComponent()
    */
    const loadContactHistoryComponent = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const importedContactHistoryComponent = yield import('./ccf-customer-card-contact-history/ccf-customer-card-contact-history');
            const ContactHistory = importedContactHistoryComponent.CcfCustomerCardContactHistory;
            setContactHistoryComponent(_jsx(ContactHistory, { customerId: customerID }));
        }
        catch (error) {
            console.error(error);
        }
    });
    /**
    * dynamically load interaction history components based on expanded section from customer card.
    * @example loadInteractionHistoryComponent()
    */
    const loadInteractionHistoryComponent = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const importedInteractionHistoryComponent = yield import('./ccf-customer-card-history/ccf-customer-card-case-history');
            const InteractionHistory = importedInteractionHistoryComponent.CcfCustomerCardinteractionHistory;
            setInteractionHistoryComponent(_jsx(InteractionHistory, {}));
        }
        catch (error) {
            console.error(error);
        }
    });
    /**
     * Used to set the loaded components to null
     * @example - resetLoadedComponents()
     */
    const resetLoadedComponents = () => {
        setShowChannels(false);
        setContactHistoryComponent(null);
        setInteractionHistoryComponent(null);
    };
    /**
     * Used to update the app space tab label and tab index
     * @param newTabIndex - number
     * @example - handleChange(0)
     */
    const handleChange = (name) => {
        dynamicallyLoadComponents(name);
        let updatedExpanded = expanded;
        if (expanded.includes(name)) {
            updatedExpanded = updatedExpanded.filter(function (item) {
                return item !== name;
            });
        }
        else {
            updatedExpanded.push(name);
        }
        const expandedCard = updatedExpanded.reduce((a, v) => (Object.assign(Object.assign({}, a), { [v]: true })), {});
        const defaultCollapse = {
            detail: false,
            channels: false,
            contact: false,
            currentInteraction: true,
            activity: false,
            notes: false,
            interactionHistory: false,
        };
        const tabs = Object.assign(Object.assign({}, defaultCollapse), expandedCard);
        dispatch(CcfAssignmentAction.setUpdateCollapse({
            expandedCard: tabs,
            caseId: activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId,
        }));
        setExpanded([...updatedExpanded]);
    };
    /**
     * plusBtnClickHandler is to handle the click event
     * for add(+) new note button
     * @example - plusBtnClickHandler(evt)
     */
    const plusBtnClickHandler = (evt) => {
        if (!expanded.includes('notes')) {
            handleChange('notes');
        }
        setNewNoteState(true);
        dispatch(CcfCustomerCardActions.updateCustomerNotesUsingCaseIdMap([
            {
                content: '',
                user: inboxAsigneeUser,
                editMode: true,
                caseId: customerIDKeyForNotes,
                noteCRUDState: true,
                updatedAt: new Date().toISOString(),
            },
            true,
            true,
            customerIDKeyForNotes
        ]));
        evt.stopPropagation();
    };
    /**
     * Fire events on customer-card scroll.
     * @example - handleScroll()
     */
    const handleScroll = () => {
        dispatch(CcfCustomerCardRelatesTo.controller.thunks.setPopoverPosition());
        dispatch(CcfCustomerCardSlice.thunks.createEntity.setPopoverPosition());
    };
    useEffect(() => {
        // in case of contact switch we are resetting the dynamically loaded components
        resetLoadedComponents();
    }, [activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactId]);
    useEffect(() => {
        var _a;
        if ((customerContactIdFromSearch || isCustomerCardPopupOpen) && ((selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === Navigation.SEARCH || selectedMenu.toString() === Navigation.SEARCH)) { // if we get customer Id or customer card popup is open then we are storing the respective customer Id
            if (customerContactIdFromSearch) {
                setcustomerID(customerContactIdFromSearch);
                setcustomerIDKeyForNotes(customerContactIdFromSearch);
            }
            else {
                setcustomerID('');
                dispatch(CcfCustomerCardActions.setIdentities([]));
            }
        }
        else {
            if (getdigitalContactDetails || activeContactInSelectedInteraction && activeContactInSelectedInteraction.media === MediaType.DIGITAL) {
                const digitalData = activeContactInSelectedInteraction;
                if ((digitalData === null || digitalData === void 0 ? void 0 : digitalData.interactionId) && (getdigitalContactDetails[digitalData.interactionId] && Object.keys(getdigitalContactDetails[digitalData.interactionId]).length) && (digitalData === null || digitalData === void 0 ? void 0 : digitalData.customerName) && (digitalData === null || digitalData === void 0 ? void 0 : digitalData.caseId)) {
                    const digitalCase = getdigitalContactDetails[digitalData.interactionId][digitalData.caseId].case;
                    const inoboxAsignee = digitalCase === null || digitalCase === void 0 ? void 0 : digitalCase.inboxAssigneeUser;
                    setInboxAssigneeUser(inoboxAsignee);
                    const customerID = ((_a = digitalCase === null || digitalCase === void 0 ? void 0 : digitalCase.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.id) || '';
                    if (digitalData === null || digitalData === void 0 ? void 0 : digitalData.caseId) {
                        setShowCCAlert(false);
                        dispatch(CcfCustomerCardActions.updateCustomerCardNoteDeleteRes(null));
                        dispatch(CcfCustomerCardActions.setCaseInCustomerNotesMap(customerID));
                    }
                    if (customerID) {
                        dispatch(CcfCustomerCardActions.setCustomerId(customerID));
                        setcustomerID(customerID);
                        setcustomerIDKeyForNotes(customerID);
                    }
                    else {
                        dispatch(CcfCustomerCardActions.storeCustomerFullName(''));
                        setcustomerID('');
                        dispatch(CcfCustomerCardActions.setIdentities([]));
                        setcustomerIDKeyForNotes('');
                    }
                }
            }
        }
    }, [getdigitalContactDetails, activeContactInSelectedInteraction, customerContactIdFromSearch]);
    useEffect(() => {
        if ((customerContactIdFromSearch || isCustomerCardPopupOpen) && ((selectedMenuAppSpace === null || selectedMenuAppSpace === void 0 ? void 0 : selectedMenuAppSpace.tab) === Navigation.SEARCH || selectedMenu.toString() === Navigation.SEARCH)) { // if we get customer Id or customer card popup is open then we are storing the respective customer Id
            if (customerContactIdFromSearch) {
                setcustomerID(customerContactIdFromSearch);
                setcustomerIDKeyForNotes(customerContactIdFromSearch);
            }
            else
                setcustomerID('');
        }
        else {
            if ((voiceContactDetails || voiceMailContactDetails) && (activeContactInSelectedInteraction && (activeContactInSelectedInteraction.media === MediaType.VOICE || activeContactInSelectedInteraction.media === MediaType.VOICEMAIL))) {
                const voiceContactData = activeContactInSelectedInteraction;
                let customerId = '';
                if (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl) {
                    const queryParams = new URLSearchParams(decodeURIComponent(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerCardUrl));
                    customerId = queryParams.get('customerId');
                    customerId && setcustomerID(customerId);
                    if (voiceContactData.customerName) {
                        setcustomerName(voiceContactData.customerName);
                    }
                    setDNIS(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactMode);
                    setSkillName(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.skillOrQueueName);
                }
                else if (voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.customerName) {
                    customerId = voiceContactDetails.dnis;
                    setcustomerName(voiceContactData.customerName);
                    customerId && setcustomerID('voice_' + voiceContactData.contactMode);
                    setDNIS(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.contactMode);
                    setSkillName(voiceContactData === null || voiceContactData === void 0 ? void 0 : voiceContactData.skillOrQueueName);
                }
                else if (voiceContactData) {
                    setDNIS('');
                    setSkillName('');
                    dispatch(CcfCustomerCardActions.storeCustomerFullName(''));
                }
                if (customerId) {
                    setcustomerIDKeyForNotes(customerId || '');
                    dispatch(CcfCustomerCardActions.setCaseInCustomerNotesMap(customerId || ''));
                }
            }
        }
    }, [voiceContactDetails, activeContactInSelectedInteraction, voiceMailContactDetails]);
    useEffect(() => {
        if (customerCardFullName !== 'Unknown' && customerCardFullName !== '') {
            setcustomerName(customerCardFullName);
        }
    }, [customerCardFullName]);
    useEffect(() => {
        if (currentCaseNoteObj && currentCaseNoteObj.noteCRUDFlg && !currentCaseNoteObj.editMode)
            setNewNoteState(!newNoteState);
    }, [currentCaseNoteObj]);
    useEffect(() => {
        if (nonIncomingActiveContactInSelectedInteraction && !isViewDetailsClicked) {
            let selectedCard;
            const activeContactDetails = {
                caseId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
                contactId: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId,
                detail: true,
                contact: false,
                channels: false,
                activity: true,
                currentInteraction: true,
            };
            if (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) {
                const activeContactCard = collapsedCard.find(({ contactId }) => contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId));
                if (activeContactCard) {
                    selectedCard = activeContactCard;
                }
                else {
                    selectedCard = activeContactDetails;
                    const contact = collapsedCard.find(({ caseId, contactId }) => caseId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || contactId
                        ? contactId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)
                        : null);
                    if (!contact) {
                        dispatch(CcfAssignmentAction.setActiveCollapse([
                            ...collapsedCard,
                            activeContactDetails
                        ]));
                    }
                }
            }
            else {
                const defaultContactCard = collapsedCard.find(({ caseId }) => caseId === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
                dispatch(CcfAssignmentAction.setActiveCollapse([
                    ...collapsedCard,
                    activeContactDetails
                ]));
                selectedCard = defaultContactCard;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const filteredByKey = selectedCard ? Object.entries(selectedCard).filter(([key, value]) => value === true) : [];
            const keysVal = filteredByKey.map((Col) => Col[0]);
            setExpanded(keysVal);
        }
    }, [nonIncomingActiveContactInSelectedInteraction]);
    useEffect(() => {
        if (referenceForContainer === null || referenceForContainer === void 0 ? void 0 : referenceForContainer.current) {
            referenceForContainer.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (referenceForContainer === null || referenceForContainer === void 0 ? void 0 : referenceForContainer.current) {
                referenceForContainer.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);
    /**
     * Fucntion to display the search results
     * @param customerName - name of the customer to be searched
     * @example - displaySearchResults('John Doe')
     */
    const displaySearchResults = (customerName) => {
        setIsMergeButtonClicked(true);
        setShowCCAlert(false);
        setCCMergeErrorResponse({});
        dispatch(searchCustomerCard({ customerName, externalIds: externalIdsToExclude }));
    };
    /**
     * Used to update the merge state of the button
     * @example - goBackFunction(status);
     */
    const goBackFunction = (status) => {
        setIsMergeButtonClicked(false);
        dispatch(CcfCustomerCardActions.flushCustomerCardList());
        if (status !== undefined) {
            dispatch(CcfCustomerCardActions.updateCustomerCardNoteDeleteRes(null));
            setShowCCAlert(true);
            setCCMergeErrorResponse(status);
        }
    };
    const alertProps = { severity: 'success', color: 'success' };
    if (((ccMergeErrorResponse === null || ccMergeErrorResponse === void 0 ? void 0 : ccMergeErrorResponse.isCustomerCardMergedStatus) === 'failed') || ((isNoteDeleted === null || isNoteDeleted === void 0 ? void 0 : isNoteDeleted.status) === 'failed')) {
        alertProps.severity = 'warning';
        alertProps.color = 'error';
        alertText = isNoteDeleted.ccNoteDeletedErrorDescription || ccMergeErrorResponse.ccMergeErrorDescription || '';
    }
    const agentIntegrationsEnabled = (_d = userDetails === null || userDetails === void 0 ? void 0 : userDetails.customAttributes) === null || _d === void 0 ? void 0 : _d.agentIntegrations;
    const activitySection = agentIntegrationsEnabled === 'true' && !customerContactIdFromSearch && (_jsxs(CcfAccordion, Object.assign({ square: true, sx: [
            styles.accordionContainer,
            ((activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactStatus) === 'incoming' || isActivityDisabled) && styles.hideAccordion
        ], expanded: expanded.includes('activity'), onChange: () => handleChange('activity') }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": "related-interactions-content", id: "related-interactions-header", sx: expanded.includes('activity')
                    ? styles.accordionHeaderExpand
                    : styles.accordionHeaderActivityExpand }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: styles.contactCardTitle }, { children: translate('relatedInteractions') })) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: _jsx(CcfBox, { children: _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfCustomerCardActivity' }, { children: _jsx(CcfCustomerCardActivity, { dnis: DNIS, setIsActivityDisabled: setIsActivityDisabled }) })) }) })) })] })));
    const pinnedRecordSection = agentIntegrationsEnabled === 'true' && !customerContactIdFromSearch && (_jsx(CcfBox, Object.assign({ component: "div" }, { children: isPinRecordsAvailable && (_jsxs(CcfAccordion, Object.assign({ square: true, expanded: expanded.includes('currentInteraction'), onChange: () => handleChange('currentInteraction'), sx: [
                styles.accordionContainer,
                (isCurrentInteractionDisabled && isPinRecordsAvailable) && styles.hideAccordion
            ] }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": "current-interaction-content", id: "current-interaction-header", sx: expanded.includes('currentInteraction')
                        ? styles.accordionHeaderExpand
                        : styles.accordionHeaderActivityExpand }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: styles.contactCardTitle }, { children: translate('currentInteraction') })) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: _jsx(CcfBox, { children: _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfCustomerCardPinRecords' }, { children: _jsx(CcfCustomerCardPinRecords, { dnis: DNIS, setIsCurrentInteractionDisabled: setIsCurrentInteractionDisabled }) })) }) })) })] }))) })));
    /**
     * Function to check and return specific component based on the condition
     * @returns CustomerCardSearchComponent
     * @example <CustomerCardSearchComponent />
     */
    const CustomerCardSearchComponent = () => {
        if (isMergeButtonClicked && activeContactInSelectedInteraction) {
            return getCustomerCardSearchComponent(customerName, goBackFunction, externalIdsToExclude);
        }
        else {
            // handling the case where the user has rejected incoming digital case and refocusing on previously selected case
            dispatch(CcfAssignmentAction.setSelectedContactId({ interactionId: previousActiveContact === null || previousActiveContact === void 0 ? void 0 : previousActiveContact.interactionId, contactId: previousActiveContact === null || previousActiveContact === void 0 ? void 0 : previousActiveContact.caseId }));
            return null;
        }
    };
    return (!isMergeButtonClicked && activeContactInSelectedInteraction) || customerContactIdFromSearch || isCustomerCardPopupOpen ? (_jsxs(CcfBox, Object.assign({ sx: styles.customerCardParentContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.customerCardContainer, position: 'relative', ref: referenceForContainer }, { children: [_jsx(ToastContainer, { enableMultiContainer: true, containerId: 'CustomerCardToastContainer', position: "top-center", closeOnClick: true, rtl: false }), _jsx(CcfBox, Object.assign({ component: "div" }, { children: (customerCardFullName || isCustomerCardPopupOpen) && (_jsx(CcfCustomerCardDetailsTitle, { title: customerCardFullName, imagePath: customerData.image, displaySearchResultsCallback: displaySearchResults })) })), _jsxs(CcfAccordion, Object.assign({ square: true, expanded: expanded.includes('detail'), sx: styles.accordionContainer, onChange: () => handleChange('detail') }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": "detail-content", id: "detail-header", sx: styles.ccfAppSpaceAccordionHeader }, { children: _jsx(Typography, Object.assign({ variant: "h5", sx: styles.contactCardTitle }, { children: translate('contactCardDetails') })) })), _jsx(CcfAccordionDetails, Object.assign({ sx: styles.contactCardDetailsContainer }, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: customerID ? _jsx(CcfCustomerCardDetails, { customerID: customerID, isLoading: customerCardDetailsLoading, dnis: DNIS, skillname: skillname }) : _jsx(CcfBox, Object.assign({ sx: styles.alignCenter }, { children: translate('noInformationAvailable') })) })) }))] })), _jsxs(CcfAccordion, Object.assign({ square: true, sx: styles.accordionContainer, expanded: expanded.includes('contact'), onChange: () => handleChange('contact') }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": "address-content", id: "address-header", sx: expanded.includes('contact')
                                    ? styles.accordionHeaderExpand
                                    : styles.ccfAppSpaceAccordionHeader }, { children: _jsx(Typography, Object.assign({ variant: "h5", sx: styles.contactCardTitle }, { children: translate('contactHistory') })) })), _jsx(CcfAccordionDetails, Object.assign({ sx: styles.contactCardDetailsContainer }, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: _jsx(CcfBox, { children: _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfCustomerCardContactHistory' }, { children: customerID ? contactHistoryComponent : (_jsx(CcfBox, Object.assign({ sx: styles.alignCenter }, { children: translate('noInformationAvailable') }))) })) }) })) }))] })), customerID.length > 0 && customerCardFullName && !customerContactIdFromSearch && (_jsxs(CcfAccordion, Object.assign({ square: true, sx: [styles.accordionContainer], expanded: expanded.includes('notes'), onChange: () => handleChange('notes') }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": "notes-content", id: "notes-header", sx: expanded.includes('notes')
                                    ? styles.accordionHeaderExpand
                                    : styles.ccfAppSpaceAccordionHeader }, { children: _jsxs(CcfBox, Object.assign({ component: "div", sx: Object.assign(Object.assign({}, styles.contactCardTitle), styles.customerNoteParent) }, { children: [_jsx(CcfTypography, { sx: styles.notesAccordionTitle, variant: 'h4', translationKey: "notes" }), (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactStatus) !== 'incoming' && !customerContactIdFromSearch && _jsx(CcfIconButton, Object.assign({ style: { padding: '0px', opacity: plusBtnFlg ? 0.4 : 1 }, disabled: plusBtnFlg, onClick: plusBtnClickHandler, focusRipple: true, tabIndex: 0, "aria-label": translate('addNotes') }, { children: _jsx(CcfPlusIcon, { sx: { color: theme => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.filter; } } }) }))] })) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: _jsx(CcfCustomerCardNotes, { customerId: customerIDKeyForNotes, enableNewNoteBtn: setNewNoteState, isNewNote: newNoteState }) })) })] }))), _jsxs(CcfAccordion, Object.assign({ square: true, sx: styles.accordionContainer, expanded: expanded.includes('channels'), onChange: () => handleChange('channels') }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), "aria-controls": "channels-content", id: "channels-header", sx: expanded.includes('channels')
                                    ? styles.accordionHeaderExpand
                                    : styles.ccfAppSpaceAccordionHeader }, { children: _jsx(Typography, Object.assign({ variant: "h5", sx: styles.contactCardTitle }, { children: translate('channels') })) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfBox, Object.assign({ component: "div" }, { children: _jsx(CcfBox, { children: showChannels && (_jsx(Suspense, Object.assign({ fallback: _jsx("div", { children: translate('channelsLoading') }) }, { children: _jsx(LazyLoadCCChannels, { customerID: customerID }) }))) }) })) })] })), (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.DIGITAL && (_jsxs(CcfAccordion, Object.assign({ square: true, sx: styles.accordionContainer, expanded: expanded.includes('interactionHistory'), onChange: () => handleChange('interactionHistory') }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: styles.expandedIcon }), sx: expanded.includes('interactionHistory')
                                    ? styles.accordionHeaderExpand
                                    : styles.ccfAppSpaceAccordionHeader }, { children: _jsx(Typography, Object.assign({ variant: "h5", sx: styles.contactCardTitle }, { children: translate('interactionHistory') })) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfCustomerCardinteractionHistory' }, { children: interactionHistoryComponent })) })] }))), pinnedRecordSection, activitySection] })), _jsx(CcfBox, Object.assign({ sx: styles.ccAlertContainer }, { children: showCCAlert &&
                    _jsx(CcfAlert, Object.assign({ sx: styles.ccAlert, autoHideDuration: 5000, closeAlert: () => {
                            setShowCCAlert(false);
                            dispatch(CcfCustomerCardActions.updateCustomerCardNoteDeleteRes(null));
                        }, severity: alertProps.severity, color: alertProps.color, variant: "filled" }, { children: alertText })) }))] }))) : (_jsx(CustomerCardSearchComponent, {}));
}
export default CcfCustomerCard;
//# sourceMappingURL=ccf-customer-card.js.map