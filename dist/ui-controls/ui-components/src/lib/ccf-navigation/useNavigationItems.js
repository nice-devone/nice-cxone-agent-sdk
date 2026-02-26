import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { Navigation } from '../../enums/navigation-menus';
import { DigitalContactStatus, DigitalChannelType } from '@nice-devone/common-sdk';
import { CcfAssignementBoxIcon, CcfCalendarIcon, CcfConversationOutlineIcon, CcfCustomerCardIcon, CcfDirectoryIcon, CcfFlashIcon, CcfHelpIcon, CcfHomeIcon, CcfQueueIcon, CcfScreenPopIcon, CcfSettingsIcon, CcfWemIcon, CcfWorkHistoryIcon, useTranslator, CcfReportingIcon, CcfSearchIcon, CcfConferenceIcon, CcfAgentCopilotIcon, CcfAgentAssistIcon, CcfAgentChatIcon, CcfSrDeskIcon, } from '@nice-devone/ui-controls';
import { Grid, useTheme } from '@mui/material';
import { LaunchPopover } from '../ccf-launch-popover/ccf-launch-popover';
import CcfFullViewDirectory from '../ccf-directory/ccf-full-view-directory';
import { useSelector } from 'react-redux';
import { getCxoneDigitalContactUserSavedProperties, getActiveContactInSelectedInteraction, selectUserInConference, selectUserInConsult, getNonIncomingActiveContactInSelectedInteraction, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfAppSpaceScheduler from '../ccf-app-space/ccf-app-space-schedule';
import CcfScreenPop from '../ccf-screen-pop/ccf-screen-pop';
import CcfExternalApp from '../ccf-external-app/ccf-external-app';
import CcfNavigationItemsStyles from './ccf-navigation-items-styles';
import CcfFullViewQueueCounter from '../ccf-app-queue-counter/ccf-full-view-queue-counter';
import CcfFullViewContactHistory from '../ccf-app-space/ccf-agent-contact-history/ccf-agent-full-view-contact-history';
import { CcfFullViewSettings } from '../ccf-settings/ccf-full-view-settings';
import { CustomWorkspacePopover } from '../ccf-customworkspace-popover/ccf-customworkspace-popover';
import CcfcustomWorkspace from '../ccf-customworkspace/ccf-customworkspace';
import CcfCallConference from '../ccf-call-conference/ccf-call-conference';
import CcfErrorBoundary from '../ccf-error-boundary/ccf-error-boundary';
import CcfAgentCopilotContainer from '../ccf-agent-copilot/ccf-agent-copilot-container';
import { checkWEMEnablement, getCustomWorkspaces, getIsConversationsFeatureEnabled, getUserCustomAttributes } from '../global.app.slice';
import { useAsyncValue } from '../../hooks/useAsyncValue';
import { getActiveContactScreenPop } from '../ccf-screen-pop/ccf-screen-pop.slice';
import { cxoneDigitalContactDetails } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import WrapperComponent from './ccf-wrapper-component';
import { getAllQRepliesOutbound } from '../ccf-app-space/ccf-app-space.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { RoutePaths } from '../../enums/route-paths';
import { isCopilotEnabledForContact } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import CcfDigitalSearchFullViewContainer from '../ccf-app-space/ccf-digital-search/ccf-digital-search-full-view-container';
import { AgentAssistContainer } from '../ccf-agent-assist/agent-assist-container';
import { getAgentAssistActiveProvidersForContactId } from '../ccf-agent-assist/features/active-providers-slice';
import CcfAgentChatContainer from '../ccf-agent-chat/ccf-agent-chat';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import useLVAppSpacePermission from '../lv-app-space/hooks/useLVAppSpacePermission';
import { AgentAssistWebSocketProviders } from '@nice-devone/agent-sdk';
/**
 * This component is used to fetch the list of available navigation items for AppSpace and Workspace
 * @example - NavigationItems()
 */
export function useNavigationItems(isAppSpace, isBelowLg, helpUrl) {
    var _a, _b, _c, _d, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = CcfNavigationItemsStyles(theme);
    const htmlColor = theme.palette.secondary.main;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const customAttributes = useSelector(getUserCustomAttributes);
    const toolTipPlacement = isBelowLg ? 'bottom' : 'right';
    const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
    const indicatorClient = CXoneAcdClient.instance.indicator;
    const indicators = useAsyncValue(indicatorClient.agentIndicatorsEventObservable);
    const isWEMEnabled = useSelector(checkWEMEnablement);
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const screenPops = useSelector(getActiveContactScreenPop);
    const digitalContactDetails = useSelector(cxoneDigitalContactDetails);
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const allQuickRepliesForOutbound = useSelector(getAllQRepliesOutbound);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const agentAssistActiveProvidersListForSelectedContactId = useSelector(getAgentAssistActiveProvidersForContactId(((_a = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) === null || _a === void 0 ? void 0 : _a.toString()) || ''));
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const { isLvCustomerCardEnabled, isLvDeskEnabled } = useLVAppSpacePermission();
    const isConversationFeatureEnabledTrue = useSelector(getIsConversationsFeatureEnabled);
    /**
     * function to check whether Agent Assist App is to be active or not
     * @example - const isAgentAssistActive = isAgentAssistAppActive()
     */
    const isAgentAssistAppActive = () => {
        const onlyVoiceTranscriptionActive = (agentAssistActiveProvidersListForSelectedContactId === null || agentAssistActiveProvidersListForSelectedContactId === void 0 ? void 0 : agentAssistActiveProvidersListForSelectedContactId.length) === 1 &&
            agentAssistActiveProvidersListForSelectedContactId[0] === AgentAssistWebSocketProviders.VOICE_TRANSCRIPTION;
        if (nonIncomingActiveContactInSelectedInteraction &&
            agentAssistActiveProvidersListForSelectedContactId &&
            (agentAssistActiveProvidersListForSelectedContactId === null || agentAssistActiveProvidersListForSelectedContactId === void 0 ? void 0 : agentAssistActiveProvidersListForSelectedContactId.length) > 0 &&
            !onlyVoiceTranscriptionActive) {
            return true;
        }
        return false;
    };
    const iconMapping = {
        home: _jsx(CcfHomeIcon, { viewBox: "-2 -4 24 24" }),
        contactHistory: _jsx(CcfWorkHistoryIcon, { viewBox: "-2 -4 24 24" }),
        search: _jsx(CcfSearchIcon, { viewBox: "-2 -6 24 24" }),
        assignment: _jsx(CcfAssignementBoxIcon, { viewBox: "-2 -4 24 24" }),
        customerCard: _jsx(CcfCustomerCardIcon, { viewBox: "0 0 24 24" }),
        [Navigation.LVCUSTOMERCARD]: _jsx(CcfCustomerCardIcon, { viewBox: "0 0 24 24" }),
        [Navigation.LVDESK]: _jsx(CcfSrDeskIcon, { viewBox: "2 -1 21 21", htmlColor: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.contrastText }),
        schedule: _jsx(CcfCalendarIcon, { viewBox: "-2 -4 24 24" }),
        directory: _jsx(CcfDirectoryIcon, { viewBox: "-2 -4 24 24" }),
        queue: _jsx(CcfQueueIcon, { viewBox: "-2 -5 24 24" }),
        wem: _jsx(CcfWemIcon, { viewBox: "0 -2.5 24 26" }),
        conversations: _jsx(CcfConversationOutlineIcon, { viewBox: "0 -4 32 32", style: { stroke: (_f = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.background) === null || _f === void 0 ? void 0 : _f.paper } }),
        settings: _jsx(CcfSettingsIcon, { viewBox: "-2 -4 24 24" }),
        launch: _jsx(LaunchPopover, { disableTooltip: true, id: 'launchPopover', isQuickAppLaunchMenu: true, htmlColor: htmlColor, isRevampedIcon: false }),
        quickReply: _jsx(CcfFlashIcon, {}),
        screenPop: _jsx(CcfScreenPopIcon, {}),
        help: _jsx(CcfHelpIcon, { viewBox: "0 -2 24 24", htmlColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText }),
        customWorkspace: _jsx(CustomWorkspacePopover, { viewBox: "-2 -3 24 24" }),
        reporting: _jsx(CcfReportingIcon, { viewBox: "-1 -2 24 24" }),
        conference: _jsx(CcfConferenceIcon, { htmlColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.contrastText }),
        copilot: _jsx(CcfAgentCopilotIcon, { viewBox: "0 -2 26 26", htmlColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText }),
        agentassist: _jsx(CcfAgentAssistIcon, { viewBox: "0 0 24 24" }),
        '': _jsx(CcfWorkHistoryIcon, {}),
        agentChat: _jsx(CcfAgentChatIcon, { viewBox: '0 0 22 23', htmlColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.contrastText }),
    };
    /**
     * function to return icon mapping
     * @example - const useIconRenderer = useIconRenderer()
     */
    const useIconRenderer = () => {
        return useMemo(() => iconMapping, []);
    };
    /**
     * function to render icon
     * @example - const IconRenderer = IconRenderer menuName=menuName
     */
    const IconRenderer = ({ menuName }) => {
        const icons = useIconRenderer();
        return icons[menuName] || null;
    };
    /**
     * function to check if quick replt is active
     * @param contactApp -true | false | undefined, menuName- string
     * @example - ifQuickReplyIsActive(true,'QuickReply')
     */
    const ifQuickReplyIsActive = useCallback(() => {
        var _a, _b, _c, _d;
        const selectedDigitalContactDetails = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId] ? digitalContactDetails[nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId] : {};
        const savedDetails = digitalContactUserSavedProperties[selectedDigitalContactDetails.caseId];
        const { isPrivate, hasOutboundTemplates } = (_a = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.channel) !== null && _a !== void 0 ? _a : {};
        // Dev Note - This line of code is responsible for identifying if the case id is present in digitalContactUserSavedProperties & is Active contact open.
        const isActiveContactOpen = nonIncomingActiveContactInSelectedInteraction && nonIncomingActiveContactInSelectedInteraction.caseId && nonIncomingActiveContactInSelectedInteraction.contactStatus !== DigitalContactStatus.CLOSED
            && (nonIncomingActiveContactInSelectedInteraction.channelName !== DigitalChannelType.EMAIL ||
                Object.keys(digitalContactUserSavedProperties).includes(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
        const isReplyAllowed = !isPrivate && !(savedDetails === null || savedDetails === void 0 ? void 0 : savedDetails.isEditorOpen) ? false : true;
        const messageCount = (_c = (_b = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.messages) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        // For WhatsApp contact if we received not received any inbound message ie. customer interaction is not yet started, we will use this flag to show/hide quick reply option in app-space
        // Util we receive any response from customer will not show the quick reply option.
        const isWhatsAppInteractionNotStarted = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.WHATSAPP && messageCount > 0 &&
            !((_d = selectedDigitalContactDetails === null || selectedDigitalContactDetails === void 0 ? void 0 : selectedDigitalContactDetails.messages) === null || _d === void 0 ? void 0 : _d.some(({ direction }) => direction === 'inbound'));
        //Check if active contact is either outbound email or sms and quick replies are available
        const isOutboundSmsOrEmail = allQuickRepliesForOutbound.length > 0 && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.isOutbound) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.DRAFT
            && ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.SMS || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.channelName) === DigitalChannelType.EMAIL);
        return ((isActiveContactOpen && isReplyAllowed) || hasOutboundTemplates || (isOutboundSmsOrEmail)) && !isWhatsAppInteractionNotStarted;
    }, [nonIncomingActiveContactInSelectedInteraction, digitalContactDetails, digitalContactUserSavedProperties, allQuickRepliesForOutbound]);
    const hasCaseIdOrContactId = useMemo(() => activeContactInSelectedInteraction && (activeContactInSelectedInteraction.caseId || activeContactInSelectedInteraction.contactId), [activeContactInSelectedInteraction]);
    const isAgentChatFTEnabled = isFeatureEnabled("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
    /**
     * function to open help url in new tab
     * @param _e - event
     * @returns new window with help url
     * @example redirectToHelpDoc
    */
    const redirectToHelpDoc = (_e) => {
        window.open(helpUrl, '_blank', 'noopener noreferrer');
    };
    return useMemo(() => {
        const { smartReachECCAccess, smartReachDeskAccess, customerCard } = customAttributes !== null && customAttributes !== void 0 ? customAttributes : {};
        const customerCardMenuItem = isLvCustomerCardEnabled ? {
            menuName: Navigation.LVCUSTOMERCARD,
            icon: _jsx(IconRenderer, { menuName: Navigation.LVCUSTOMERCARD }),
            tooltip: translate('customerCard'),
            appSpaceComponent: _jsx(WrapperComponent, { component: "appSpaceComponent" }),
            workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "LvEcc" }, { children: _jsx(Grid, Object.assign({ xs: 12 }, { children: _jsx(WrapperComponent, { component: "workSpaceComponent" }) })) }))),
            isActive: !!(smartReachECCAccess && !smartReachDeskAccess && hasCaseIdOrContactId),
            showAppSpace: true,
            contactApp: true,
            toolTipPlacement,
        } : {
            menuName: Navigation.CUSTOMERCARD,
            icon: _jsx(IconRenderer, { menuName: "customerCard" }),
            tooltip: translate('customerCard'),
            appSpaceComponent: _jsx(WrapperComponent, { component: "appSpaceComponent" }),
            workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CustomerCardContainer" }, { children: _jsx(Grid, Object.assign({ xs: 12 }, { children: _jsx(WrapperComponent, { component: "workSpaceComponent" }) })) }))),
            isActive: !!(customerCard && !smartReachDeskAccess && hasCaseIdOrContactId),
            showAppSpace: true,
            contactApp: true,
            toolTipPlacement,
        };
        const deskMenuItem = {
            menuName: Navigation.LVDESK,
            icon: _jsx(IconRenderer, { menuName: Navigation.LVDESK }),
            tooltip: 'Desk',
            appSpaceComponent: _jsx(WrapperComponent, { component: "appSpaceComponent" }),
            workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "LvDesk" }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: [styles.fullView], xs: 12, sm: 12, lg: 12 }, { children: _jsx(WrapperComponent, { component: "workSpaceComponent" }) })) })) }))),
            isActive: isLvDeskEnabled && smartReachDeskAccess,
            showAppSpace: false,
            contactApp: isAppSpace,
            toolTipPlacement,
        };
        const navigationItems = [
            customerCardMenuItem,
            ...(isAppSpace ? [deskMenuItem] : []),
            {
                menuName: Navigation.CONFERENCE,
                icon: _jsx(IconRenderer, { menuName: "conference" }),
                tooltip: translate('multiParty'),
                appSpaceComponent: _jsx(CcfCallConference, {}),
                workSpaceComponent: _jsx(Grid, Object.assign({ xs: 12 }, { children: _jsx(CcfCallConference, {}) })),
                isActive: userInConsult || usersInConference.length > 1 ? true : false,
                showAppSpace: true,
                contactApp: true,
                toolTipPlacement,
            },
            {
                menuName: Navigation.AGENT_ASSIST,
                icon: _jsx(IconRenderer, { menuName: "agentassist" }),
                tooltip: 'Agent Assist',
                appSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "AgentAssistContainer" }, { children: _jsx(AgentAssistContainer, {}, `Agent_Assist_${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId}`) }))),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "AgentAssistContainer" }, { children: _jsx(Grid, Object.assign({ xs: 12, sx: styles.fullView }, { children: _jsx(AgentAssistContainer, {}, `Agent_Assist_${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId}`) })) }))),
                isActive: isAgentAssistAppActive(),
                showAppSpace: true,
                contactApp: true,
                toolTipPlacement: 'bottom',
            },
            {
                menuName: Navigation.COPILOT,
                icon: _jsx(IconRenderer, { menuName: "copilot" }),
                tooltip: 'Copilot',
                appSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfAgentCopilotContainer" }, { children: _jsx(CcfAgentCopilotContainer, {}) }))),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfAgentCopilotContainer" }, { children: _jsx(Grid, Object.assign({ xs: 12, sx: styles.fullView }, { children: _jsx(CcfAgentCopilotContainer, {}) })) }))),
                isActive: copilotEnabled,
                showAppSpace: false,
                contactApp: true,
                toolTipPlacement: 'bottom',
            },
            {
                menuName: Navigation.QUICK_REPLY,
                icon: _jsx(IconRenderer, { menuName: "quickReply" }),
                tooltip: translate('quickResponses'),
                appSpaceComponent: _jsx(WrapperComponent, { component: 'appSpaceComponent' }),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "QuickReplyContainer" }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: Object.assign(Object.assign({}, styles.fullView), { ml: 0 }), xs: 12 }, { children: _jsx(WrapperComponent, { component: 'workSpaceComponent' }) })) })) }))),
                isActive: ifQuickReplyIsActive(),
                showAppSpace: false,
                contactApp: true,
                toolTipPlacement,
            },
            {
                menuName: Navigation.SCREEN_POP,
                icon: _jsx(IconRenderer, { menuName: "screenPop" }),
                tooltip: translate('screenPop'),
                appSpaceComponent: _jsx(CcfErrorBoundary, Object.assign({ componentName: "ScreenPopContainer" }, { children: _jsx(CcfScreenPop, {}) })),
                workSpaceComponent: isBelowLg ? (_jsx(CcfErrorBoundary, Object.assign({ componentName: "ScreenPopContainer" }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer, xs: 12 }, { children: _jsx(Grid, Object.assign({ item: true, xs: 12, padding: 1 }, { children: _jsx("div", Object.assign({ style: { height: '100%', padding: '20px' } }, { children: _jsx(CcfScreenPop, {}) })) })) })) }))) : undefined,
                isActive: screenPops.length && hasCaseIdOrContactId ? true : false,
                showAppSpace: false,
                contactApp: true,
                toolTipPlacement,
            },
            ...(isAppSpace ? [] : [deskMenuItem]),
            {
                menuName: Navigation.CONTACTHISTORY,
                icon: _jsx(IconRenderer, { menuName: "contactHistory" }),
                tooltip: translate('contactHistory'),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'CcfAgentContactHistory' }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: [styles.contactHistoryResponsive, styles.fullView], xs: 12, sm: 12, lg: 12 }, { children: _jsx(CcfFullViewContactHistory, {}) })) })) }))),
                appSpaceComponent: _jsx(WrapperComponent, { component: 'appSpaceComponent' }),
                isActive: true,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory,
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.SEARCH,
                icon: _jsx(IconRenderer, { menuName: "search" }),
                tooltip: translate('search'),
                appSpaceComponent: _jsx(WrapperComponent, { component: 'appSpaceComponent' }),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'DigitalSearchContainer' }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(CcfDigitalSearchFullViewContainer, {}) })) }))),
                isActive: true,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch,
                toolTipPlacement,
            },
            {
                menuName: Navigation.QUEUE,
                icon: _jsx(IconRenderer, { menuName: "queue" }),
                tooltip: translate('queue'),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'QueueCounterContainer' }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: [{ ml: 0 }, styles.fullView], xs: 12, sm: 12, lg: 12 }, { children: _jsx(CcfFullViewQueueCounter, {}) })) })) }))),
                appSpaceComponent: _jsx(WrapperComponent, { component: 'appSpaceComponent' }),
                showBadge: true,
                isActive: true,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter,
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.DIRECTORY,
                icon: _jsx(IconRenderer, { menuName: "directory" }),
                tooltip: translate('directory'),
                appSpaceComponent: _jsx(WrapperComponent, { component: 'appSpaceComponent' }),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: 'DirectoryContainer' }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: [{ ml: 0 }, styles.fullView], xs: 12, sm: 12, lg: 12 }, { children: _jsx(CcfFullViewDirectory, {}) })) })) }))),
                isActive: true,
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.CALENDAR,
                icon: _jsx(IconRenderer, { menuName: "schedule" }),
                tooltip: translate('schedule'),
                appSpaceComponent: _jsx(CcfErrorBoundary, Object.assign({ componentName: "ScheduleContainer" }, { children: _jsx(CcfAppSpaceScheduler, {}) })),
                workSpaceComponent: (_jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: [{ ml: 0 }, styles.fullView], xs: 12, sm: 12, xl: 12 }, { children: _jsx(WrapperComponent, { component: 'workSpaceComponent' }) })) }))),
                isActive: true,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule,
                showAppSpace: false,
                toolTipPlacement,
            },
            ...(isAgentChatFTEnabled && isConversationFeatureEnabledTrue ? [{
                    menuName: Navigation.AGENT_CHAT,
                    icon: _jsx(IconRenderer, { menuName: "agentChat" }),
                    tooltip: translate('conversations'),
                    workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfAgentChatContainer" }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sm: 12 }, { children: _jsx(CcfAgentChatContainer, {}) })) })) }))),
                    isActive: isAgentChatFTEnabled && isConversationFeatureEnabledTrue,
                    isHidden: (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideConversations) || !isConversationFeatureEnabledTrue,
                    appSpaceComponent: _jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfAgentChatContainer" }, { children: _jsx(CcfAgentChatContainer, { isAppSpace: true }) })),
                    showAppSpace: false,
                    toolTipPlacement,
                }] : []),
            {
                menuName: Navigation.LAUNCH,
                icon: _jsx(IconRenderer, { menuName: "launch" }),
                tooltip: translate('launch'),
                onClick: () => null,
                workSpaceComponent: _jsx("div", {}),
                isActive: indicators && Array.isArray(indicators) && indicators.filter((indicator) => indicator.isEnabled).length !== 0,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideLaunch,
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.WEM,
                icon: _jsx(IconRenderer, { menuName: "wem" }),
                tooltip: translate('wem'),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "WEMContainer" }, { children: _jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: { display: { lg: 'flex' }, ml: 0 }, padding: 1, sm: 12 }, { children: _jsx(CcfExternalApp, { path: RoutePaths.WEM, title: translate('cxoneWem') }) })) })) }))),
                isActive: isWEMEnabled,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideWEM,
                appSpaceComponent: _jsx(CcfErrorBoundary, Object.assign({ componentName: "WEMContainer" }, { children: _jsx(CcfExternalApp, { path: RoutePaths.WEM, title: translate('cxoneWem') }) })),
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.SETTINGS,
                icon: _jsx(IconRenderer, { menuName: "settings" }),
                tooltip: translate('settings'),
                workSpaceComponent: (_jsx(CcfErrorBoundary, Object.assign({ componentName: "SettingsContainer" }, { children: _jsx(Grid, Object.assign({ sx: { overflowY: 'auto', display: 'flex', height: '100%', flex: '1' } }, { children: _jsx(Grid, Object.assign({ item: true, sx: { display: { lg: 'flex' }, ml: 0, width: '100%' }, padding: 1, xl: 12 }, { children: _jsx(CcfFullViewSettings, {}) })) })) }))),
                isActive: true,
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.CUSTOMWORKSPACE,
                icon: _jsx(IconRenderer, { menuName: "customWorkspace" }),
                tooltip: translate('customWorkspace'),
                workSpaceComponent: (setAnchorElementCustomWorkspace, customWorkSpaceRootRef) => (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CustomWorkspaceContainer" }, { children: _jsx(Grid, Object.assign({ sx: [styles.rightGridContainer, { display: { lg: 'flex' }, ml: 0 }], item: true, padding: 1, sm: 12 }, { children: _jsx(CcfcustomWorkspace, { setAnchorElementCustomWorkspace: setAnchorElementCustomWorkspace, displayRef: customWorkSpaceRootRef }) })) }))),
                appSpaceComponent: (setAnchorElementCustomWorkspace, customWorkSpaceAppSpaceRef) => (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CustomWorkspaceContainer" }, { children: _jsx(CcfcustomWorkspace, { setAnchorElementCustomWorkspace: setAnchorElementCustomWorkspace, displayRef: customWorkSpaceAppSpaceRef }) }))),
                isActive: !!customWorkspaces.length,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideCustomWorkspace,
                showAppSpace: false,
                toolTipPlacement,
            },
            {
                menuName: Navigation.REPORTING,
                icon: _jsx(IconRenderer, { menuName: "reporting" }),
                tooltip: translate('reporting'),
                workSpaceComponent: (_jsx(Grid, Object.assign({ sx: styles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, sx: [{ ml: 0 }, styles.fullView], xs: 12, sm: 12, xl: 12 }, { children: _jsx(WrapperComponent, { component: 'workSpaceComponent' }) })) }))),
                isActive: true,
                isHidden: agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideReporting,
                showAppSpace: false,
                toolTipPlacement: 'right',
            },
            {
                menuName: Navigation.HELP,
                icon: _jsx(IconRenderer, { menuName: "help" }),
                tooltip: translate('help'),
                onClick: redirectToHelpDoc,
                workSpaceComponent: _jsx("div", {}),
                isActive: true,
                showAppSpace: false,
                toolTipPlacement,
            }
        ];
        return navigationItems.filter((navItem) => {
            return isAppSpace ? navItem.appSpaceComponent : navItem.workSpaceComponent;
        });
    }, [isAppSpace, isBelowLg, customAttributes, hasCaseIdOrContactId, customWorkspaces, indicators, isWEMEnabled, isLvCustomerCardEnabled, isLvDeskEnabled, userInConsult, copilotEnabled, usersInConference, screenPops.length, ifQuickReplyIsActive, agentAssistActiveProvidersListForSelectedContactId, agentProfileSettings, isConversationFeatureEnabledTrue]);
}
//# sourceMappingURL=useNavigationItems.js.map