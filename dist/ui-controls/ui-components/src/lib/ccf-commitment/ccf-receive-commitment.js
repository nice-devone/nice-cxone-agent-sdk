import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { CcfBox, CcfTypography, CcfButton, useTranslator, CcfIconButton, CcfDeleteIcon, CcfPersonIcon, CcfTooltip, CcfOutboundIcon, } from '@nice-devone/ui-controls';
import ccfCommitmentStyles from './ccf-commitment-form.styles';
import { useRemoveCommitment } from './ccf-remove-commitment';
import { commitmentActions, getRemoveCommitmentSettings, getCommitmentPermission, makeCommitmentCall, } from './ccf-commitment.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUtcTimezoneOffset } from '../../util/common';
import dayjs from 'dayjs';
import { getPanelAppNavigationItems, getSelectedMenuName, globalActions } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { updateAppSpaceTabStatus } from '../ccf-app-space/ccf-app-space.slice';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { agentProfileToast } from '../../util/toastMessageHelper';
import { useRef } from 'react';
/**
 * Notification for commitments
 * @example <CcfReceiveCommitment />
 */
export const CcfReceiveCommitment = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = ccfCommitmentStyles(theme);
    const [translate] = useTranslator();
    const notesRequiredToDelete = useSelector(getRemoveCommitmentSettings);
    const { delete: canDelete } = useSelector(getCommitmentPermission);
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const selectedMenuItem = useSelector(getSelectedMenuName);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const toastId = useRef('');
    const { contactId, targetType, skillOrQueueId, firstName, lastName, customerName, notes, contactMode, contactReceivedTime, } = props.commitmentInfo;
    const { triggerRemoveToast } = useRemoveCommitment(notesRequiredToDelete, Number(contactId));
    /**
     * Function to handle call
     * @example handleCall()
     * @returns
     */
    const handleCall = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(makeCommitmentCall(contactId));
    });
    /**
     * Function to cancel call
     * @example handleCancelCall()
     * @returns
     */
    const handleCancelCall = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        triggerRemoveToast();
    });
    /**
     * Function to open reschedule commitment form
     * @example openRescheduleCommitmentForm()
     * @returns
     */
    const openRescheduleCommitmentForm = () => {
        if (isSmView) {
            dispatch(globalActions.setSelectedMenu({ name: Navigation.CALENDAR }));
        }
        const commitmentData = {
            commitmentType: targetType === 'A' ? translate('agent') : translate('skill'),
            skillId: String(skillOrQueueId),
            fname: firstName,
            lname: lastName,
            phone: contactMode,
            timeZone: getUtcTimezoneOffset(),
            dateTime: dayjs(new Date(contactReceivedTime)).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss'),
            notes: notes,
            callbackId: String(contactId),
        };
        dispatch(commitmentActions.setIsRescheduleCommitment(true));
        dispatch(commitmentActions.editCommitmentEvent(commitmentData));
        dispatch(commitmentActions.showCommitmentForm(true));
    };
    /**
     * Function to open reschedule commitment form when selectedMenuItem is not Navigation.CALENDAR
     * @example handleOpenRescheduleCommitmentForm()
     * @returns
     */
    const handleOpenRescheduleCommitmentForm = () => {
        dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
        const activeTabApp = panelAppNavigationItems.find((tab) => tab.menuName === Navigation.CALENDAR);
        // setTimeout added to delay dispatch calls 
        setTimeout(() => {
            dispatch(updateAppSpaceTabStatus({
                index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
                tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
            }));
            setTimeout(() => {
                openRescheduleCommitmentForm();
            }, 500);
        }, 500);
    };
    /**
     * Function to reschedule call
     * @example handleRescheduleCall()
     * @returns
     */
    const handleRescheduleCall = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule) {
            const toastInfo = {
                isError: true,
                messageKey: 'agentProfileGenericErrorToastMessage',
                toastId: toastId,
            };
            agentProfileToast(toastInfo);
            return;
        }
        if (selectedMenuItem === Navigation.CALENDAR) {
            openRescheduleCommitmentForm();
        }
        else {
            handleOpenRescheduleCommitmentForm();
        }
    };
    return (_jsx(CcfBox, { children: isSmView ? (_jsxs(Stack, Object.assign({ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center' }, margin: '5px' }, { children: [_jsx(CcfPersonIcon, { sx: styles.mediaIcon, "data-testid": "personal-queue-icon" }, VoiceContactStatus.INQUEUE), _jsxs(Stack, Object.assign({ sx: { display: 'flex', flexDirection: 'column', overflow: 'hidden' } }, { children: [_jsx(CcfTooltip, Object.assign({ title: customerName, sx: styles.customerName, arrow: true }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "inherit" }, { children: customerName })) }) })), _jsx(Box, Object.assign({ sx: styles.cardHeader }, { children: _jsx(CcfTooltip, Object.assign({ title: contactMode, arrow: true, "aria-label": contactMode }, { children: _jsxs(Box, Object.assign({ component: "div", sx: styles.channelDetail2 }, { children: [_jsx(CcfOutboundIcon, { sx: styles.directionIcon }), _jsx(CcfTypography, Object.assign({ sx: styles.skillOrQueueToolTip, variant: "inherit" }, { children: contactMode }))] })) })) })), _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: styles.commitmentNotes }, { children: notes }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.commitmentControlsSmallView, "data-testid": "CommitmentDetail" }, { children: [_jsx(CcfButton, Object.assign({ sx: styles.commitmentControlButtonSmallView, onClick: handleRescheduleCall, "data-testid": "reschedule" }, { children: _jsx(CcfTypography, { translationKey: "Reschedule" }) })), _jsx(CcfButton, Object.assign({ sx: styles.commitmentControlButtonSmallView, primary: true, onClick: handleCall, "data-testid": "proceed" }, { children: _jsx(CcfTypography, { translationKey: "Proceed" }) })), canDelete && (_jsx(CcfIconButton, Object.assign({ sx: styles.deleteIconButton, onClick: handleCancelCall, "data-testid": "remove-commitment" }, { children: _jsx(CcfDeleteIcon, {}) })))] }))] }))) : (_jsxs(Box, { children: [_jsx(CcfTypography, Object.assign({ variant: "inherit", sx: styles.commitmentNotes }, { children: notes })), _jsxs(CcfBox, Object.assign({ sx: styles.commitmentControls, "data-testid": "CommitmentDetail" }, { children: [_jsx(CcfButton, Object.assign({ sx: styles.commitmentControlButton, onClick: handleRescheduleCall, "data-testid": "reschedule" }, { children: _jsx(CcfTypography, { translationKey: "Reschedule" }) })), _jsx(CcfButton, Object.assign({ sx: styles.commitmentControlButton, primary: true, onClick: handleCall, "data-testid": "proceed" }, { children: _jsx(CcfTypography, { translationKey: "Proceed" }) })), canDelete && (_jsx(CcfIconButton, Object.assign({ sx: styles.deleteIconButton, onClick: handleCancelCall, "data-testid": "remove-commitment" }, { children: _jsx(CcfDeleteIcon, {}) })))] }))] })) }));
};
//# sourceMappingURL=ccf-receive-commitment.js.map