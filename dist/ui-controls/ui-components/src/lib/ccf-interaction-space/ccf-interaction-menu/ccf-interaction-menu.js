import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, useMediaQuery, Grid, } from '@mui/material';
import { MoreVert, AssignmentLate, DesktopWindowsOutlined, Fingerprint, Translate, } from '@mui/icons-material';
import { CcfLogger } from '@nice-devone/agent-sdk';
import CcfInteractionMenuStyles from './ccf-interaction-menu-styles';
import { DigitalContactStatus, VoiceContactStatus, DigitalContactActions, InteractionSearchStatus, DigitalChannelType, MediaType, UIStorageKeys, DigitalContactDirection, } from '@nice-devone/common-sdk';
import { CcfTypography, CcfTransferIcon, CcfOutcomeResolveIcon, CcfSendTranscriptIcon, CcfCoBrowseIcon, CcfDownloadTranscriptIcon, CcfAppToastMessage, useTranslator } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppSpaceTabStatus } from '../../ccf-app-space/ccf-app-space.slice';
import { getDigitalTranslationAvailableLanguages, getPanelAppNavigationItems, globalActions, } from '../../global.app.slice';
import { Navigation } from '../../../enums/navigation-menus';
import { agentDirectoryActions } from '../../ccf-directory/+state/ccf-directory.slice';
import { handleUnassignSuccessErrorToast } from '../../../util/toastMessageHelper';
import { dispositionInteractionActions, getIsDispositionOpen, getDispositionData, } from '../../ccf-disposition/ccf-disposition-slice';
import { CcfCustomerCardActions, getStoredCustomEventDetails } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import CcfDigitalTranscript from '../ccf-digital-transcript/ccf-digital-transcript';
import { dismissPreviewContact, PREVIEW_CASES, getDigitalContactDetailsByCaseId } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfTranslationSettings from '../ccf-translation-settings/ccf-translation-settings';
import { getAgentWorkflowDetailsFromLS } from '../../ccf-app-space/ccf-customer-card/ccf-customer-card-utility';
import { assignDigitalContact } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { iconList } from '../../ccf-icon/ccf-icon-list';
import { toast } from 'react-toastify';
import { getContactHistoryDisposition } from '../../ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
import { createHeaderLine } from '../../../util/common';
import { CcfContactEditorAction } from '../../ccf-editor/ccf-contact-editor.slice';
const ccfLogger = new CcfLogger('App.consumer', 'App.InteractionMenu');
/**
 * Create email header for print view
 * @param element - Element containing data attributes with email metadata
 * @param emailDiv - HTMLDivElement to append the header to
 * @param translateFn - Translation function to use for labels
 * @example createEmailHeader(element, emailDiv, translate)
 */
export const createEmailHeader = (element, emailDiv, translateFn) => {
    const DATA_ATTRIBUTES = {
        SUBJECT: 'data-subject',
        CASE_ID: 'data-caseid',
        RECIPIENTS: 'data-recipients',
        DIRECTION: 'data-direction',
        CREATE_DATE: 'data-createdate',
    };
    /**
     * Function to create styled div for header
     * @param marginTop - Top margin value
     * @returns html div element
     * @example
     * ```
     * const div = createStyledDiv('0.5rem')
     * ```
     */
    const createStyledDiv = (marginTop = '0') => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'flex-start';
        div.style.gap = '10px';
        if (marginTop !== '0') {
            div.style.marginTop = marginTop;
        }
        return div;
    };
    const headerDiv = document.createElement('div');
    headerDiv.className = 'email-header';
    headerDiv.style.borderBottom = '1px solid #555';
    headerDiv.style.marginTop = '2rem';
    headerDiv.style.marginBottom = '2rem';
    headerDiv.style.paddingBottom = '0.4rem';
    headerDiv.style.width = '100%';
    const subjectDiv = createStyledDiv();
    createHeaderLine(subjectDiv, element.getAttribute(DATA_ATTRIBUTES.SUBJECT) || '', '');
    const caseDiv = createStyledDiv('0.3rem');
    createHeaderLine(caseDiv, translateFn('caseId') + ': ', element.getAttribute(DATA_ATTRIBUTES.CASE_ID) || '');
    const recipientDiv = document.createElement('div');
    recipientDiv.style.marginTop = '0.5rem';
    const directionLabel = element.getAttribute(DATA_ATTRIBUTES.DIRECTION) === DigitalContactDirection.INBOUND
        ? translateFn('from')
        : translateFn('to');
    createHeaderLine(recipientDiv, directionLabel + ': ', element.getAttribute(DATA_ATTRIBUTES.RECIPIENTS) || '');
    const dateDiv = createStyledDiv('0.3rem');
    createHeaderLine(dateDiv, translateFn('date') + ': ', element.getAttribute(DATA_ATTRIBUTES.CREATE_DATE) || '');
    headerDiv.appendChild(subjectDiv);
    headerDiv.appendChild(recipientDiv);
    headerDiv.appendChild(caseDiv);
    headerDiv.appendChild(dateDiv);
    emailDiv.appendChild(headerDiv);
};
/**
 * Component displays Kebab menu for interaction space
 * @returns Kebab menu for interaction space
 * ```
 * @example
 * <CcfInteractionMenu/>
 * ```
 */
export function CcfInteractionMenu(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const theme = useTheme();
    const dispatch = useDispatch();
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const getDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(props === null || props === void 0 ? void 0 : props.activeContactCaseId, props === null || props === void 0 ? void 0 : props.activeContactInteractionId));
    const styles = CcfInteractionMenuStyles(theme);
    const { contactDetails, handleShowFingerPrintDetails } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isTranslationSettingsOpen, setIsTranslationSettingsOpen] = React.useState(false);
    const [translate] = useTranslator();
    const open = Boolean(anchorEl);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const availableCustomEvent = useSelector(getStoredCustomEventDetails);
    const isDispositionOpen = useSelector(getIsDispositionOpen);
    const [isDigitalTranslationsEnabled, setIsDigitalTranslationsEnabled] = React.useState(false);
    const digitalTranslationAvailableLanguages = useSelector(getDigitalTranslationAvailableLanguages);
    const [anchorElementForTranslationSettings, setAnchorElementForTranslationSettings] = React.useState(null);
    const toastId = React.useRef('');
    const dispositionData = useSelector(getDispositionData);
    const { reloadDispositionData, updateIsDispositionSaved, updateIsShowOutcomeConfirmationDialog } = dispositionInteractionActions;
    const formInputs = (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId) ? (_b = (_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions) === null || _a === void 0 ? void 0 : _a[contactDetails.caseId]) === null || _b === void 0 ? void 0 : _b.formInputs : null;
    const isDispositionSaved = (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId) ? (_d = (_c = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions) === null || _c === void 0 ? void 0 : _c[contactDetails.caseId]) === null || _d === void 0 ? void 0 : _d.isDispositionSaved : false;
    const isEmailRenderV2ToggleEnabled = isFeatureEnabled("release-cx-agent-email-rendering-AW-37207" /* FeatureToggles.EMAIL_RENDERING_FEATURE_TOGGLE */);
    const options = [
        {
            name: (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.isAssignedToAgentInbox) ? 'unassign' : 'dismiss',
            icon: _jsx(AssignmentLate, {}),
            status: (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.isAssignedToAgentInbox) ? DigitalContactActions.UNASSIGNED : DigitalContactActions.DISMISS,
            isActive: true,
        },
        {
            name: 'transfer',
            icon: _jsx(CcfTransferIcon, {}),
            status: VoiceContactStatus.TRANSFER,
            isActive: contactDetails.status !== DigitalContactStatus.CLOSED && contactDetails.status !== VoiceContactStatus.TRANSFER,
        },
        getDigitalContactDetails.channelType === ((_e = DigitalChannelType.CHAT) === null || _e === void 0 ? void 0 : _e.toLowerCase())
            ? {
                name: 'chatFingerprint',
                icon: _jsx(Fingerprint, {}),
                status: DigitalContactActions.FINGERPRINTED,
                isActive: true,
            }
            : {},
        {
            name: 'outcome',
            icon: _jsx(CcfOutcomeResolveIcon, { color: 'primary' }),
            status: 'outcome-menu',
            isActive: true,
        },
        {
            name: 'showOrigin',
            icon: _jsx(DesktopWindowsOutlined, {}),
            status: DigitalContactActions.SHOW_ORIGIN,
            isActive: !((_f = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _f === void 0 ? void 0 : _f.isPrivate) && (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.originURL) !== '', // Condition for showing show origin option for public channels only with URL
        },
        {
            name: 'sendTranscript',
            icon: _jsx(CcfSendTranscriptIcon, { viewBox: '-2 -2 24 24' }),
            status: DigitalContactActions.TRANSCRIPT,
            isActive: (_g = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _g === void 0 ? void 0 : _g.isPrivate, // Condition for showing show transcript option for private channels only
        },
        {
            name: 'coBrowse',
            icon: _jsx(CcfCoBrowseIcon, { viewBox: '-2 -2 24 24' }),
            status: DigitalContactActions.COBROWSE,
            isActive: (_h = props.contactDetails) === null || _h === void 0 ? void 0 : _h.isCoBrowseEnabled, // Condition for showing co-browse option
        },
        {
            name: 'downloadTranscript',
            icon: _jsx(CcfDownloadTranscriptIcon, { viewBox: '0 -1 22 23' }),
            status: DigitalContactActions.PRINT,
            isActive: (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channelType) === 'email',
        },
        {
            name: _jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'translateMessages' }),
            icon: _jsx(Translate, {}),
            status: DigitalContactActions.TRANSLATE,
            isActive: isDigitalTranslationsEnabled,
        }
    ];
    if (!(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.isAssignedToAgentInbox) && contactDetails.status !== InteractionSearchStatus.CLOSED) {
        options.unshift({
            name: DigitalContactActions.ASSIGN_TO_ME,
            icon: iconList[DigitalContactActions.ASSIGN_TO_ME](''),
            status: DigitalContactActions.ASSIGN_TO_ME,
            isActive: true,
        });
    }
    /**
       * to unassign the digital contact
       * @example unassignDigitalContact();
       */
    const unassignDigitalContact = () => {
        dispatch(dispositionInteractionActions.clearDispositionById(contactDetails.caseId));
        contactDetails.unassign().then(() => {
            handleUnassignSuccessErrorToast(contactDetails, DigitalContactActions.UNASSIGNED, 'success');
            // clear the contact editor details of related unassigned case
            dispatch(CcfContactEditorAction.clearContactEditorDetails({ caseId: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId }));
            if (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId) {
                const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, StorageKeys.CRM_PIN_RECORDS, StorageKeys.AGENT_WORKFLOW_EVENT, StorageKeys.CC_LINKED_ACTIVITIES]);
                /*
                  updates/removes the activity data in slice when voice call disconnected
                */
                const linkedActivitiesFromLS = LocalStorageHelper.getItem(StorageKeys.CC_LINKED_ACTIVITIES, true) || {};
                delete linkedActivitiesFromLS[contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId];
                LocalStorageHelper.setItem(StorageKeys.CC_LINKED_ACTIVITIES, linkedActivitiesFromLS);
                const availableCustomEventData = availableCustomEvent.filter((item) => {
                    return (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) : (item === null || item === void 0 ? void 0 : item.contactId) !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                });
                const screenPopDetails = agentWorkflowDetailsFromLS.customeventData;
                const isScreenPopDetails = screenPopDetails instanceof Array && (screenPopDetails === null || screenPopDetails === void 0 ? void 0 : screenPopDetails.filter((item) => {
                    return (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) : (item === null || item === void 0 ? void 0 : item.contactId) !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                }));
                /**
                 * StorageKeys.CUSTOMEVENT_DATA used to keep track of data on CXI when screen is refreshed.
                 */
                LocalStorageHelper.setItem(StorageKeys.CUSTOMEVENT_DATA, isScreenPopDetails);
                dispatch(CcfCustomerCardActions.removeStoredCustomEvent(availableCustomEventData));
                /**
                 * Dev note - This code is written to remove data kept in localstorage, as we are providing backward compatability with ealstic cache and custom events.
                 * will be removed by next release.
                 */
                const agentWorkflowEventDetails = agentWorkflowDetailsFromLS.agentWorkflowEvent;
                const isAgentWorkflowEventDetails = agentWorkflowEventDetails instanceof Array && (agentWorkflowEventDetails === null || agentWorkflowEventDetails === void 0 ? void 0 : agentWorkflowEventDetails.filter((item) => {
                    return (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) ? item.contactId !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) : item.contactId !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                }));
                LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, isAgentWorkflowEventDetails);
                const agentWorkflowConfigurationDetails = agentWorkflowDetailsFromLS.agentWorkflowConfigurationEvent;
                const isAgentWorkflowConfigurationEventDetails = agentWorkflowConfigurationDetails instanceof Array && (agentWorkflowConfigurationDetails === null || agentWorkflowConfigurationDetails === void 0 ? void 0 : agentWorkflowConfigurationDetails.filter((item) => {
                    return (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) ? item.contactId !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) : item.contactId !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                }));
                LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, isAgentWorkflowConfigurationEventDetails);
                /**
                 * Localstorage clearing for pin Records.
                 */
                const pinRecordsDetails = agentWorkflowDetailsFromLS.crmPinRecords;
                const isPinRecordsDetails = pinRecordsDetails instanceof Array && (pinRecordsDetails === null || pinRecordsDetails === void 0 ? void 0 : pinRecordsDetails.filter((item) => {
                    return (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.contactID) : (item === null || item === void 0 ? void 0 : item.contactId) !== (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                }));
                LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, isPinRecordsDetails);
            }
        }).catch((err) => {
            handleUnassignSuccessErrorToast(contactDetails, DigitalContactActions.UNASSIGNED, 'error');
            ccfLogger.error('digitalKebabMenuSelectionHandler', `error while handling menu selection - ${JSON.stringify(err)}`);
        });
        setAnchorEl(null);
    };
    /**
       * to display the  confirmationDialog
       * @example showConfirmationDialog();
       */
    const showConfirmationDialog = () => {
        toast.warn(_jsx(CcfAppToastMessage, { type: "warn alignButtonsRight", titleKey: "dispositionRequired", messageKey: 'unassignConfirmDialogMessage', primaryBtnText: "outcome", secondaryBtnText: "cancel", triggerPrimaryHandler: () => {
                openOutComesPanel();
                dismissToast();
            }, triggerSecondaryHandler: () => dismissToast() }), {
            autoClose: false,
            closeButton: false,
            containerId: 'AppToastContainer',
        });
    };
    React.useEffect(() => {
        setIsDigitalTranslationsEnabled(Object.keys(digitalTranslationAvailableLanguages).length > 0);
    }, [digitalTranslationAvailableLanguages]);
    useEffect(() => {
        if (dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.isShowOutcomeConfirmationDialog) {
            showConfirmationDialog();
            setAnchorEl(null);
        }
    }, [dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.isShowOutcomeConfirmationDialog]);
    /**
     * handleClick to handle click event
     * @param event -Mouse event
     * @example handleClick(event);
     */
    const openDigitalKebabMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setAnchorElementForTranslationSettings(event.currentTarget);
    };
    /**
     * handleClose to handle close event
     * @example handleClose(event);
     */
    const closeDigitalKebabMenu = () => {
        setAnchorEl(null);
    };
    /**
     * to open outcomes panel
     * @example openOutComesPanel();
     */
    const openOutComesPanel = () => {
        // open outcomes panel
        dispatch(dispositionInteractionActions.setDispositionType(MediaType.DIGITAL));
        dispatch(dispositionInteractionActions.displayDispositionCard(!isDispositionOpen));
        setAnchorEl(null);
        dispatch(updateIsShowOutcomeConfirmationDialog(false));
    };
    /**
       * dismiss toast on cancel
       * @example dismissToast()
    */
    const dismissToast = () => {
        toast.dismiss();
        dispatch(updateIsShowOutcomeConfirmationDialog(false));
    };
    /** to get the saved disposition data
       * @example IsShowOutcomeConfirmationDialog()
    */
    const setIsShowOutcomeConfirmationDialog = (digitalContactId) => {
        var _a;
        const currentSelectedDispositionData = (_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[digitalContactId]) === null || _a === void 0 ? void 0 : _a.dispositionData;
        if ((currentSelectedDispositionData === null || currentSelectedDispositionData === void 0 ? void 0 : currentSelectedDispositionData.length) > 0) {
            dispatch(getContactHistoryDisposition(digitalContactId))
                .unwrap()
                .then((dispositionResponse) => {
                if (dispositionResponse) {
                    const formInputs = {
                        notes: dispositionResponse === null || dispositionResponse === void 0 ? void 0 : dispositionResponse.notes,
                        disposition: Object.assign({}, dispositionResponse),
                    };
                    dispatch(reloadDispositionData({ contactId: digitalContactId, formInputs }));
                    dispatch(updateIsDispositionSaved({ contactId: digitalContactId, isSaved: true }));
                    dispatch(updateIsShowOutcomeConfirmationDialog(false));
                    unassignDigitalContact();
                }
                else {
                    dispatch(updateIsShowOutcomeConfirmationDialog(true));
                }
            })
                .catch((error) => {
                ccfLogger.error('getSavedDispositionInfo', `error while getting the disposition info - ${JSON.stringify(error)}`);
                handleUnassignSuccessErrorToast(contactDetails, DigitalContactActions.UNASSIGNED, 'error');
            });
        }
    };
    /**
     * handleClose for translation settings popover
     * @example handleCloseForTranslationSettings();
     */
    const handleCloseForTranslationSettings = () => {
        setIsTranslationSettingsOpen(false);
        setAnchorElementForTranslationSettings(null);
    };
    /**
     * Function to transfer digital contact
     * @example onTransferClick()
     */
    const onTransferClick = () => {
        dispatch(globalActions.setOutboundBtnCliked(false));
        if (isSmView) {
            // for smaller screen we just to navigate to directory instead of navigating in the app space
            dispatch(globalActions.setSelectedMenu({ name: Navigation.DIRECTORY }));
        }
        else {
            const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === Navigation.DIRECTORY);
            dispatch(updateAppSpaceTabStatus({
                index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
                tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
            }));
        }
        dispatch(agentDirectoryActions.setFocusInDirectory(true));
    };
    /**
     * Function to assign digital contact to the agent
     * @example onAssignToMeClick()
     */
    const onAssignToMeClick = () => {
        const currentCxoneUser = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
        LocalStorageHelper.setItem(UIStorageKeys.DIGITAL_PREVIEW_CONTACT, contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
        dispatch(assignDigitalContact({ selectedContactIds: [contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId], cxoneUserId: currentCxoneUser.userId, toastId }));
        //removing the preview only case from Localstorage
        const currentPreviewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true) || [];
        const isPreviewContactIdIndex = currentPreviewCases.findIndex((previewContactId) => previewContactId === (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId));
        if (isPreviewContactIdIndex >= 0) { // we will remove the contact id on dismiss from localStorage
            currentPreviewCases.splice(isPreviewContactIdIndex, 1);
            LocalStorageHelper.setItem(PREVIEW_CASES, currentPreviewCases);
        }
        setAnchorEl(null);
    };
    /**
     * handleSelection to handle close event
     * @example handleSelection(event);
     */
    const digitalKebabMenuSelectionHandler = (status) => {
        var _a;
        const IFRAME_HEIGHT_ADJUSTMENT_DELAY = 1600;
        const PRINT_WINDOW_DELAY = 1000;
        switch (status) {
            case 'outcome-menu':
                openOutComesPanel();
                break;
            case VoiceContactStatus.TRANSFER:
                setAnchorEl(null);
                setTimeout(() => {
                    onTransferClick();
                }, 0);
                break;
            case DigitalContactActions.SHOW_ORIGIN:
                window.open(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.originURL);
                break;
            case DigitalContactActions.FINGERPRINTED:
                handleShowFingerPrintDetails();
                closeDigitalKebabMenu();
                break;
            case DigitalContactActions.TRANSCRIPT:
                dispatch(globalActions.toggleDigitalTranscriptPopupOpen(true));
                dispatch(globalActions.toggleDigitalTranscriptPopupClose(false));
                setAnchorEl(null);
                break;
            case DigitalContactActions.PRINT:
                {
                    const emailStamp = (_a = document.getElementById('interaction-space')) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
                    const printCanvas = document.getElementById('root');
                    const appPage = document.getElementById('cx1_agent_root');
                    const menu = document.getElementById('interaction-long-menu');
                    const displayValue = appPage.style.display;
                    appPage.style.display = 'none';
                    menu.hidden = true;
                    if (isEmailRenderV2ToggleEnabled) {
                        const emailFrames = document.getElementsByClassName('email-frame');
                        Array.from(emailFrames).forEach((element, index) => {
                            const emailDiv = document.createElement('div');
                            emailDiv.className = 'email-container';
                            emailDiv.style.fontSize = '11px';
                            createEmailHeader(element, emailDiv, translate);
                            const emailFrame = document.createElement('iframe');
                            emailFrame.srcdoc = element.srcdoc;
                            emailFrame.id = `printFrame-${index}`;
                            emailFrame.height = '1800px';
                            emailFrame.width = '700px';
                            emailFrame.setAttribute('sandbox', 'allow-same-origin');
                            emailFrame.style.border = 'none';
                            emailDiv.appendChild(emailFrame);
                            printCanvas.appendChild(emailDiv);
                        });
                    }
                    else {
                        emailStamp.style.height = 'auto';
                        printCanvas.appendChild(emailStamp);
                    }
                    /**
                     * Function to remove the node added before calling window.print
                     * @example handleAfterPrint()
                     */
                    const handleAfterPrint = () => {
                        try {
                            if (isEmailRenderV2ToggleEnabled) {
                                // remove all email container divs
                                const emailDivs = document.getElementsByClassName('email-container');
                                Array.from(emailDivs).forEach(emailDiv => {
                                    if (printCanvas.contains(emailDiv)) {
                                        printCanvas.removeChild(emailDiv);
                                    }
                                });
                            }
                            else {
                                if (printCanvas.contains(emailStamp)) {
                                    printCanvas.removeChild(emailStamp);
                                }
                            }
                            appPage.style.display = displayValue;
                        }
                        catch (error) {
                            console.error('Error during print clean-up:', error);
                        }
                        window.removeEventListener('afterprint', handleAfterPrint);
                    };
                    window.addEventListener('afterprint', handleAfterPrint);
                    if (isEmailRenderV2ToggleEnabled) {
                        setTimeout(() => {
                            const emailDivs = document.getElementsByClassName('email-container');
                            Array.from(emailDivs).forEach(element => {
                                var _a, _b, _c;
                                const height = (_c = (_b = (_a = element.getElementsByTagName('iframe')[0].contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.scrollHeight;
                                if (height) {
                                    element.getElementsByTagName('iframe')[0].style.height = `${height + 90}px`;
                                    ccfLogger.info('CcfInteractionMenu', `Email iframe height for print adjusted to ${height + 90}px`);
                                }
                            });
                            setTimeout(() => {
                                window.print();
                            }, PRINT_WINDOW_DELAY);
                        }, IFRAME_HEIGHT_ADJUSTMENT_DELAY);
                    }
                    else {
                        setTimeout(() => {
                            window.print();
                        }, 100);
                    }
                }
                setAnchorEl(null);
                break;
            case DigitalContactActions.TRANSLATE:
                setIsTranslationSettingsOpen(true);
                closeDigitalKebabMenu();
                break;
            case DigitalContactActions.DISMISS:
                dispatch(dismissPreviewContact(contactDetails));
                setAnchorEl(null);
                break;
            case DigitalContactActions.COBROWSE:
                window.open(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.coBrowseLink);
                break;
            case DigitalContactActions.UNASSIGNED: // when case is unassigned clear out the disposition                
                if ((contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId) && (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.status) === InteractionSearchStatus.CLOSED && (formInputs === null || formInputs === void 0 ? void 0 : formInputs.requireDisposition) && !isDispositionSaved) {
                    setIsShowOutcomeConfirmationDialog(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                }
                else {
                    unassignDigitalContact();
                }
                break;
            case DigitalContactActions.ASSIGN_TO_ME:
                onAssignToMeClick();
                break;
            default: break;
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, Object.assign({ "aria-label": translate('moreContactActions'), id: "interaction-long-button", "aria-controls": open ? 'long-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: openDigitalKebabMenu, disableRipple: true, sx: styles.moreItemsBtn, style: { maxWidth: '0.8em' } }, { children: _jsx(MoreVert, {}) })), _jsx(Menu, Object.assign({ id: "interaction-long-menu", anchorEl: anchorEl, open: open, onClose: closeDigitalKebabMenu, MenuListProps: {
                    'aria-labelledby': 'long-button',
                } }, { children: (options || []).filter(opt => (opt === null || opt === void 0 ? void 0 : opt.isActive)).map((option, index) => {
                    return (_jsx(MenuItem, Object.assign({ value: option === null || option === void 0 ? void 0 : option.status, autoFocus: index === 0, tabIndex: 0, sx: styles.menuItemMinHeight, onClick: () => digitalKebabMenuSelectionHandler(option === null || option === void 0 ? void 0 : option.status) }, { children: _jsxs(Grid, Object.assign({ container: true, sx: styles.menuItemContent }, { children: [_jsx(Box, Object.assign({ sx: styles.menuItemIcon }, { children: _jsx("span", { children: option === null || option === void 0 ? void 0 : option.icon }) })), _jsx(Box, Object.assign({ sx: styles.menuItemNameBold }, { children: _jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: (option === null || option === void 0 ? void 0 : option.name) || '' }) }))] })) }), option === null || option === void 0 ? void 0 : option.status));
                }) })), _jsx(CcfDigitalTranscript, {}), _jsx(CcfTranslationSettings, { anchorEl: anchorElementForTranslationSettings, caseId: contactDetails.caseId, interactionId: contactDetails.interactionId, isTranslationSettingsOpen: isTranslationSettingsOpen, handleClose: handleCloseForTranslationSettings, availableLanguages: digitalTranslationAvailableLanguages })] }));
}
export default CcfInteractionMenu;
//# sourceMappingURL=ccf-interaction-menu.js.map