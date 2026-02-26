import { __awaiter } from "tslib";
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @nice-cxone/ccf/required-tsdoc */
import { Box } from '@mui/material';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CcfLoader } from '@nice-devone/ui-controls';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from '../../enums/navigation-menus';
import { selectAppSpaceActiveTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { getSelectedMenuName } from '../global.app.slice';
import CcfErrorBoundary from '../ccf-error-boundary/ccf-error-boundary';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
/**
 * Wrapper component for all app space and work space components
 * @param props -
 * @example - <WrapperComponent />
 * @returns
 */
export function WrapperComponent(props) {
    const componentType = props.component;
    const [CcfWorkSpaceComponents, setCcfWorkSpaceComponents] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const [CcfAppSpaceComponents, setCcfAppSpaceComponents] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const [CcfLazyLoadedComponent, setCcfLazyLoadedComponent] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const selectedMenu = useSelector(getSelectedMenuName);
    const appSpaceTab = useSelector(selectAppSpaceActiveTabStatus);
    const appSpaceTabSelected = JSON.parse(LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const isQuickResponseUnificationFTEnabled = isFeatureEnabled("release-cx-agent-quick-response-unification-AW-28770" /* FeatureToggles.QUICK_RESPONSE_UNIFICATION_FEATURE_TOGGLE */);
    // Lazy load Nav items from left side nav bar
    useEffect(() => {
        switch (selectedMenu) {
            case Navigation.CALENDAR: {
                if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule) {
                    break;
                }
                const renderInteractionSearch = () => __awaiter(this, void 0, void 0, function* () {
                    const appSchedule = yield import('../ccf-app-schedule/ccf-app-schedule');
                    const InteractionSearchComponent = appSchedule.CcfAppSchedule;
                    setCcfWorkSpaceComponents(_jsx(InteractionSearchComponent, {}));
                });
                renderInteractionSearch();
                break;
            }
            case Navigation.CUSTOMERCARD: {
                const renderCustomerCard = () => __awaiter(this, void 0, void 0, function* () {
                    const customerCard = yield import('../ccf-app-space/ccf-customer-card/ccf-customer-card');
                    const CustomerCard = customerCard.CcfCustomerCard;
                    setCcfWorkSpaceComponents(_jsx(CustomerCard, {}));
                });
                renderCustomerCard();
                break;
            }
            case Navigation.LVCUSTOMERCARD: {
                const renderLvCustomerCard = () => __awaiter(this, void 0, void 0, function* () {
                    const lvCustomerCard = yield import('../lv-app-space/lv-customer-card/lv-customer-card');
                    const LvCustomerCard = lvCustomerCard.LvCustomerCard;
                    setCcfWorkSpaceComponents(_jsx(LvCustomerCard, {}));
                });
                renderLvCustomerCard();
                break;
            }
            case Navigation.LVDESK: {
                const renderLvDesk = () => __awaiter(this, void 0, void 0, function* () {
                    const lvDesk = yield import('../lv-app-space/lv-desk/lv-desk-full-view-container/lv-desk-full-view-container');
                    const LvDesk = lvDesk.LvDeskFullViewContainer;
                    setCcfWorkSpaceComponents(_jsx(LvDesk, {}));
                });
                renderLvDesk();
                break;
            }
            case Navigation.QUICK_REPLY: {
                const renderQuickReply = () => __awaiter(this, void 0, void 0, function* () {
                    const quickReply = isQuickResponseUnificationFTEnabled ? yield import('../ccf-app-space/ccf-quick-replies-v2/ccf-quick-replies-v2') : yield import('../ccf-app-space/ccf-quick-replies/ccf-quick-replies');
                    const QuickReply = quickReply.CcfQuickReplies;
                    setCcfWorkSpaceComponents(_jsx(QuickReply, {}));
                });
                renderQuickReply();
                break;
            }
            case Navigation.REPORTING: {
                if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideReporting) {
                    break;
                }
                const renderReporting = () => __awaiter(this, void 0, void 0, function* () {
                    const reporting = yield import('../ccf-reporting/ccf-reporting');
                    const Reporting = reporting.CcfReporting;
                    setCcfWorkSpaceComponents(_jsx(Reporting, {}));
                });
                renderReporting();
                break;
            }
        }
    }, [selectedMenu]);
    //lazy load app space components 
    useEffect(() => {
        switch ((appSpaceTab === null || appSpaceTab === void 0 ? void 0 : appSpaceTab.tab) || appSpaceTabSelected.selectedMenuPanelApp) {
            case Navigation.CONTACTHISTORY: {
                if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory) {
                    break;
                }
                const loadContactHistory = () => __awaiter(this, void 0, void 0, function* () {
                    const agentCardConactHistory = yield import('../ccf-app-space/ccf-agent-contact-history/ccf-agent-card-contact-history');
                    const AgentContactHistory = agentCardConactHistory.CcfAgentContactHistory;
                    setCcfAppSpaceComponents(_jsx(AgentContactHistory, {}));
                });
                loadContactHistory();
                break;
            }
            case Navigation.DIRECTORY: {
                const renderDirectory = () => __awaiter(this, void 0, void 0, function* () {
                    const directory = yield import('../ccf-directory/ccf-directory');
                    const Directory = directory.CcfDirectory;
                    setCcfAppSpaceComponents(_jsx(Directory, { isFullView: false }));
                });
                renderDirectory();
                break;
            }
            case Navigation.QUEUE: {
                if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter) {
                    break;
                }
                const renderQueue = () => __awaiter(this, void 0, void 0, function* () {
                    const queueCounter = yield import('../ccf-app-queue-counter/ccf-app-queue-counter-channels');
                    const QueueCounter = queueCounter.CcfAppQueueCounterChannels;
                    setCcfAppSpaceComponents(_jsx(QueueCounter, { isAppSpace: true }));
                });
                renderQueue();
                break;
            }
            case Navigation.QUICK_REPLY: {
                const renderQuickReply = () => __awaiter(this, void 0, void 0, function* () {
                    const quickReply = isQuickResponseUnificationFTEnabled ? yield import('../ccf-app-space/ccf-quick-replies-v2/ccf-quick-replies-v2') : yield import('../ccf-app-space/ccf-quick-replies/ccf-quick-replies');
                    const QuickReply = quickReply.CcfQuickReplies;
                    setCcfAppSpaceComponents(_jsx(QuickReply, {}));
                });
                renderQuickReply();
                break;
            }
            case Navigation.SEARCH: {
                if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch) {
                    break;
                }
                const renderInteractionSearch = () => __awaiter(this, void 0, void 0, function* () {
                    const interactionSearch = yield import('../ccf-app-space/ccf-digital-search/ccf-digital-search');
                    const InteractionSearchComponent = interactionSearch.CcfDigitalSearch;
                    setCcfAppSpaceComponents(_jsx(InteractionSearchComponent, { isAppSpace: true }));
                });
                renderInteractionSearch();
                break;
            }
            case Navigation.CUSTOMERCARD:
                {
                    const renderCustomerCard = () => __awaiter(this, void 0, void 0, function* () {
                        const customerCard = yield import('../ccf-app-space/ccf-customer-card/ccf-customer-card');
                        const CustomerCard = customerCard.CcfCustomerCard;
                        setCcfAppSpaceComponents(_jsx(CustomerCard, {}));
                    });
                    renderCustomerCard();
                    break;
                }
            case Navigation.LVCUSTOMERCARD: {
                const renderLvCustomerCard = () => __awaiter(this, void 0, void 0, function* () {
                    const lvCustomerCard = yield import('../lv-app-space/lv-customer-card/lv-customer-card');
                    const LvCustomerCard = lvCustomerCard.LvCustomerCard;
                    setCcfAppSpaceComponents(_jsx(LvCustomerCard, {}));
                });
                renderLvCustomerCard();
                break;
            }
            case Navigation.LVDESK: {
                const renderLvDesk = () => __awaiter(this, void 0, void 0, function* () {
                    const lvDesk = yield import('../lv-app-space/lv-desk/lv-desk');
                    const LvDesk = lvDesk.LvDesk;
                    setCcfAppSpaceComponents(_jsx(LvDesk, {}));
                });
                renderLvDesk();
                break;
            }
        }
    }, [appSpaceTabSelected === null || appSpaceTabSelected === void 0 ? void 0 : appSpaceTabSelected.selectedMenuPanelApp, appSpaceTab === null || appSpaceTab === void 0 ? void 0 : appSpaceTab.tab]);
    useEffect(() => {
        if (componentType === 'interactionSpaceComponent') {
            const renderInteractionSpace = () => __awaiter(this, void 0, void 0, function* () {
                const interactionSpace = yield import('../ccf-interaction-space/ccf-interaction-space');
                const InteractionSpace = interactionSpace.CcfInteractionSpace;
                setCcfLazyLoadedComponent(_jsx(InteractionSpace, {}));
            });
            renderInteractionSpace();
        }
        else if (componentType === 'ccfEditorComponent') {
            const renderCcfEditor = () => __awaiter(this, void 0, void 0, function* () {
                const editor = yield import('../ccf-editor/ccf-contact-editor/ccf-contact-editor');
                const CcfContactEditor = editor.CcfContactEditor;
                setCcfLazyLoadedComponent(_createElement(CcfContactEditor, Object.assign({}, props, { key: props === null || props === void 0 ? void 0 : props.key })));
            });
            renderCcfEditor();
        }
        else if (componentType === 'CcfVoiceSettings') {
            const renderVoiceSettings = () => __awaiter(this, void 0, void 0, function* () {
                const voiceSetting = yield import('../ccf-settings/ccf-voice-settings');
                const CcfVoiceSettings = voiceSetting.CcfVoiceSettings;
                setCcfLazyLoadedComponent(_jsx(CcfVoiceSettings, {}));
            });
            renderVoiceSettings();
        }
        else if (componentType === 'CcfNotificationSettings') {
            const renderNotificationSettings = () => __awaiter(this, void 0, void 0, function* () {
                const notification = yield import('../ccf-settings/ccf-notification-settings');
                const CcfNotificationSettings = notification.CcfNotificationSettings;
                setCcfLazyLoadedComponent(_jsx(CcfNotificationSettings, {}));
            });
            renderNotificationSettings();
        }
        else if (componentType === 'CcfDisplaySettings') {
            const renderDisplaySettings = () => __awaiter(this, void 0, void 0, function* () {
                const displaySettings = yield import('../ccf-settings/ccf-display-settings');
                const CcfDisplaySettings = displaySettings.CcfDisplaySettings;
                setCcfLazyLoadedComponent(_jsx(CcfDisplaySettings, {}));
            });
            renderDisplaySettings();
        }
        else if (componentType === 'CcfSystemInformation') {
            const renderCcfSystemInformation = () => __awaiter(this, void 0, void 0, function* () {
                const systemInformation = yield import('../ccf-system-information/ccf-system-information');
                const CcfSystemInformation = systemInformation.CcfSystemInformation;
                setCcfLazyLoadedComponent(_jsx(CcfSystemInformation, {}));
            });
            renderCcfSystemInformation();
        }
        else if (componentType === 'CcfAgentSkills') {
            const renderCcfAgentSkills = () => __awaiter(this, void 0, void 0, function* () {
                const agentSkills = yield import('../ccf-settings/ccf-agent-skills/ccf-agent-skills');
                const CcfAgentSkills = agentSkills.CcfAgentSkills;
                setCcfLazyLoadedComponent(_jsx(CcfAgentSkills, {}));
            });
            renderCcfAgentSkills();
        }
        else if (componentType === 'CcfReportIssue') {
            const renderCcfReportIssue = () => __awaiter(this, void 0, void 0, function* () {
                const reportIssue = yield import('../ccf-settings/ccf-report-issue/ccf-report-issue');
                const CcfReportIssue = reportIssue.CcfReportIssue;
                setCcfLazyLoadedComponent(_jsx(CcfReportIssue, {}));
            });
            renderCcfReportIssue();
        }
    }, [componentType]);
    const componentName = useMemo(() => {
        switch (componentType) {
            case 'workSpaceComponent':
                return selectedMenu;
            case 'appSpaceComponent':
                return (appSpaceTab === null || appSpaceTab === void 0 ? void 0 : appSpaceTab.tab) || appSpaceTabSelected.selectedMenuPanelApp;
            default:
                return componentType;
        }
    }, [componentType, selectedMenu, appSpaceTab, appSpaceTabSelected]);
    return (_jsxs(CcfErrorBoundary, Object.assign({ componentName: componentName }, { children: [componentType === 'workSpaceComponent' && CcfWorkSpaceComponents, (componentType !== 'workSpaceComponent' && componentType !== 'appSpaceComponent') && CcfLazyLoadedComponent, componentType === 'appSpaceComponent' && CcfAppSpaceComponents] })));
}
export default WrapperComponent;
//# sourceMappingURL=ccf-wrapper-component.js.map