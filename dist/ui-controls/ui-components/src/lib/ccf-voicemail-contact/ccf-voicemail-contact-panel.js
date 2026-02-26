import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Typography, Paper, useTheme, useMediaQuery, Divider, Stack } from '@mui/material';
import { CcfVoicemailIcon, DividerVariant, CcfPopOver, DividerOrientation, CcfDivider, CcfTooltip, } from '@nice-devone/ui-controls';
import { CcfVoiceMailControls } from './ccf-voicemail-controls/ccf-voicemail-controls';
import ccfVoicemailContactPanelStyles from './ccf-voicemail-contact-panel.style';
import { commitmentActions, getCommitmentPermission } from '../ccf-commitment/ccf-commitment.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getPanelAppNavigationItems, globalActions, getContactControlsItems, } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { formatPhoneNumber } from '../../util/stringUtils';
import { updateAppSpaceTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { getActiveContactInSelectedInteraction, } from '../../lib/ccf-assignment-panel/ccf-assignment-panel.slice';
import { VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { CcfVoicemailHoldingTimer } from './ccf-voicemail-holding-timer';
import { MediaType } from '@nice-devone/common-sdk';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { useRef } from 'react';
import { agentProfileToast } from '../../util/toastMessageHelper';
/**
 *
 * @param props - CcfVoiceMailContactPanelProps
 * @returns - Voicemail contact panel with controls
 * @example - <CcfVoiceMailContactPanel />
 */
export const CcfVoiceMailContactPanel = ({ voiceMailContact }) => {
    var _a, _b, _c;
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const voicemailControlStyles = ccfVoicemailContactPanelStyles(theme);
    const { create: hasCreateCommitmentPermission } = useSelector(getCommitmentPermission) || {};
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const assignmentCardTitle = formatPhoneNumber(((_a = voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.from) || '');
    const contactControl = useSelector(getContactControlsItems);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isSelected = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICEMAIL ? true : false;
    const dispatch = useDispatch();
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const toastId = useRef('');
    const updatedContactControl = contactControl.filter(item => {
        if (item.translationKey === 'addOutbound') {
            return false;
        }
        return true;
    });
    const popOverMenuItems = {
        menuItems: [
            {
                items: updatedContactControl,
            }
        ],
    };
    /**
     * Function to navigate to commitment form
     * @example navigateToCommitmentForm()
     */
    const navigateToCommitmentForm = () => {
        if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule) {
            const toastInfo = {
                isError: true,
                messageKey: 'agentProfileGenericErrorToastMessage',
                toastId: toastId,
            };
            agentProfileToast(toastInfo);
            return;
        }
        dispatch(globalActions.setSelectedMenu({ name: Navigation.CALENDAR }));
        const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === Navigation.CALENDAR && !tab.isHidden);
        dispatch(updateAppSpaceTabStatus({
            index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
            tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
        }));
        dispatch(commitmentActions.addCommitmentEvent(true));
        dispatch(commitmentActions.showCommitmentForm(true));
    };
    /**
     * Pop over action handler.
     * @example
     * @returns
     */
    const onPopOverItemSelection = (item) => () => {
        switch (item.type) {
            case 'commitment':
                navigateToCommitmentForm();
                return;
        }
        return;
    };
    /**
     * Function to display inital popover when popover icon is clicked
     * @example initialPopOver()
     */
    const addEventPopOver = () => {
        return (_jsx(CcfPopOver, { disableTooltip: true, onPopOverItemSelection: onPopOverItemSelection, optionList: popOverMenuItems }));
    };
    const holdTime = Number(new Date((_b = voiceMailContact.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.lastStateChangeTime));
    const isHolding = ((_c = voiceMailContact.voiceMailEventData) === null || _c === void 0 ? void 0 : _c.status) === VoiceMailContactEventStatus.HOLDING;
    return (_jsx(Paper, Object.assign({ sx: isSelected ? voicemailControlStyles.paperContainer : voicemailControlStyles.paperContainerDisabled }, { children: _jsxs(Grid, Object.assign({ container: true, sx: voicemailControlStyles.voicemailControlsContainer }, { children: [_jsxs(Grid, Object.assign({ container: true, xs: 12, sx: voicemailControlStyles.voicemailHeaderGrid }, { children: [_jsxs(Grid, Object.assign({ item: true, xs: 11, sx: voicemailControlStyles.voicemailIconHeaderTitleGrid }, { children: [_jsx(CcfVoicemailIcon, { sx: voicemailControlStyles.voicemailIcon }), _jsxs(Stack, Object.assign({ spacing: 1, direction: 'row' }, { children: [_jsx(CcfTooltip, Object.assign({ title: assignmentCardTitle, arrow: true, placement: 'right' }, { children: _jsx(Typography, Object.assign({ component: 'span', sx: voicemailControlStyles.headerTitle }, { children: assignmentCardTitle })) })), isSmView && isHolding &&
                                            _jsxs(_Fragment, { children: [_jsx(CcfDivider, { sx: { borderColor: theme.palette.secondary.dark }, orientation: DividerOrientation.VERTICAL, variant: DividerVariant.FULLWIDTH, flexItem: true }), _jsx(CcfVoicemailHoldingTimer, { sx: voicemailControlStyles.headerTitle, holdTime: holdTime })] })] }))] })), _jsx(Grid, Object.assign({ item: true, xs: 1, sx: voicemailControlStyles.overflowIconGrid }, { children: hasCreateCommitmentPermission && addEventPopOver() }))] })), !isSmView && _jsx(Divider, { sx: { margin: '10px 0 0 13px' }, variant: DividerVariant.FULLWIDTH }), _jsx(CcfVoiceMailControls, { voiceMailContact: voiceMailContact })] })) })));
};
//# sourceMappingURL=ccf-voicemail-contact-panel.js.map