import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslator, CcfTransferIcon, CcfIconButton, CcfTooltip, CcfDivider, DividerOrientation, DividerVariant } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { getPanelAppNavigationItems, globalActions, updateExternalProdURL } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { updateAppSpaceTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
import { CcfAssignmentAction, getAllInteractions, getAssignmentPanelMetadata, getNonIncomingActiveContactInSelectedInteraction, getSkillDetailsByCaseId } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { DigitalContactStatus, InteractionType, MediaType } from '@nice-devone/common-sdk';
import { CcfOutcomeButton } from '../ccf-outcome-button/ccf-outcome-button';
import ccfDigitalContactActionsStyles from './ccf-digital-contact-actions.styles';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../ccf-icon/ccf-icon';
import contactControlStyles from '../../styles/ccf-contact-control.style';
import { revamped_icons } from '../ccf-icon/ccf-icon-list';
/**
 * Component to display contact control panel
 * @param props - CcfDigitalContactProps
 * ```
 * @example-
 * <CcfDigitalContactActions />
 * ```
 */
const CcfDigitalContactActions = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const { skillOrQueueName, contactMode, isOutbound, channelName } = props.contact;
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const theme = useTheme();
    const styles = ccfDigitalContactActionsStyles(theme);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const isBelowXl = useMediaQuery(theme.breakpoints.down('xl'));
    const skillDetails = useSelector(getSkillDetailsByCaseId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId));
    const isSLATimerEnabled = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) !== DigitalContactStatus.CLOSED && Boolean((skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.agentResponseEnabled) || (skillDetails === null || skillDetails === void 0 ? void 0 : skillDetails.customerResponseEnabled));
    const controlStyles = contactControlStyles(theme);
    const allInteractions = useSelector(getAllInteractions);
    const assignmentMetadata = useSelector(getAssignmentPanelMetadata);
    const isNewDigitalOutbound = ((_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactStatus) === DigitalContactStatus.DRAFT &&
        ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.media) === MediaType.DIGITAL &&
        ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.isOutbound);
    const ibOrObChannelIconName = isOutbound ? ((channelName === null || channelName === void 0 ? void 0 : channelName.toLowerCase()) + '_outbound') : ((channelName === null || channelName === void 0 ? void 0 : channelName.toLowerCase()) + '_inbound'); //condition to get the name of Inbound channel icon or Outbound channel icon
    const [ccfDigitalContactSLATimer, setCcfDigitalContactSLATimer] = useState(null);
    useEffect(() => {
        if (isSLATimerEnabled) {
            renderCcfDigitalContactSLATimer();
        }
    }, [isSLATimerEnabled]);
    /**
     * function that is called to render the SLA timer
     * @example renderCcfDigitalContactSLATimer()
     */
    const renderCcfDigitalContactSLATimer = () => __awaiter(void 0, void 0, void 0, function* () {
        setCcfDigitalContactSLATimer(null);
        const digitalContactSLATimer = yield import('../ccf-digital-contact-sla-timer/ccf-digital-contact-sla-timer');
        const DigitalContactSLATimer = digitalContactSLATimer.CcfDigitalContactSLATimer;
        setCcfDigitalContactSLATimer(_jsx(DigitalContactSLATimer, {}));
    });
    /**
     * Function to transfer digital contact
     * @example onTransferClick(e)
     */
    const onTransferClick = (e) => {
        e.stopPropagation();
        dispatch(globalActions.setDigitalContactTransferBtnCliked(true));
        dispatch(globalActions.setOutboundBtnCliked(false));
        if (isBelowXl) { // for smaller screen we just to navigate to directory instead of navigating in the app space
            dispatch(globalActions.setSelectedMenu({ name: Navigation.DIRECTORY }));
            if (isBelowMd) {
                dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
            }
            e.stopPropagation();
        }
        else {
            //Setting the selected menu as INTERACTION to enable focus on directory
            dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
            updateExternalProdURL(null, Navigation.INTERACTION, null);
            const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === Navigation.DIRECTORY);
            dispatch(updateAppSpaceTabStatus({ index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '', tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '' }));
        }
        dispatch(agentDirectoryActions.setFocusInDirectory(true));
    };
    return (_jsxs(Box, Object.assign({ sx: styles.digitalControlsContainer }, { children: [nonIncomingActiveContactInSelectedInteraction && allInteractions &&
                (((_d = props.contact) === null || _d === void 0 ? void 0 : _d.interactionId) && ((_e = props.contact) === null || _e === void 0 ? void 0 : _e.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.voiceInteractionId) ||
                    ((_f = props.contact) === null || _f === void 0 ? void 0 : _f.interactionId) && ((_g = props.contact) === null || _g === void 0 ? void 0 : _g.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId)) &&
                allInteractions[(_h = props.contact) === null || _h === void 0 ? void 0 : _h.interactionId].interactionType === InteractionType.ELEVATED &&
                (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex', padding: '5px', alignItems: 'center' } }, { children: [channelName && _jsx(Box, Object.assign({ component: "span", sx: { marginRight: '5px', display: 'flex' } }, { children: _jsx(CcfIcon, { iconName: revamped_icons.includes(channelName.toLowerCase()) ? ibOrObChannelIconName : channelName.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL }) })), _jsx(CcfTooltip, Object.assign({ title: skillOrQueueName || contactMode, arrow: true }, { children: _jsx(Box, Object.assign({ sx: { width: '75%' } }, { children: _jsx(Typography, Object.assign({ sx: styles.skillOrQueueName }, { children: skillOrQueueName || contactMode })) })) }))] })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: controlStyles.horizontalDivider })] })), nonIncomingActiveContactInSelectedInteraction && allInteractions &&
                nonIncomingActiveContactInSelectedInteraction.interactionId && !isNewDigitalOutbound &&
                ((_j = allInteractions[nonIncomingActiveContactInSelectedInteraction.interactionId]) === null || _j === void 0 ? void 0 : _j.interactionType) !== InteractionType.ELEVATED &&
                isSLATimerEnabled && ((_k = props.contact) === null || _k === void 0 ? void 0 : _k.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId) && ccfDigitalContactSLATimer, ((_l = props.contact) === null || _l === void 0 ? void 0 : _l.interactionId) === (assignmentMetadata === null || assignmentMetadata === void 0 ? void 0 : assignmentMetadata.selectedInteractionId) && !isNewDigitalOutbound && _jsxs(Box, Object.assign({ sx: styles.digitalControls }, { children: [_jsx(Box, Object.assign({ component: 'div', sx: styles.leftPart }, { children: _jsx(Box, Object.assign({ component: 'div', sx: styles.digitalControlIcon }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('transfer'), arrow: true, disableInteractive: true }, { children: _jsx("span", { children: _jsx(CcfIconButton, Object.assign({ onClick: onTransferClick, "aria-label": translate('transfer') }, { children: _jsx(CcfTransferIcon, { color: 'action' }) })) }) })) })) })), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { marginTop: 0.6, marginBottom: 0.6 } }), _jsx(Box, Object.assign({ component: 'div', sx: [styles.rightPart, styles.digitalControlIcon] }, { children: _jsx(CcfOutcomeButton, { dispositionType: MediaType.DIGITAL }) }))] }))] })));
};
export default CcfDigitalContactActions;
//# sourceMappingURL=ccf-digital-contact-actions.js.map