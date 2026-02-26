import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { CcfBox, CcfTypography, CcfButton, CcfCalendarIcon, useTranslator, CcfPhoneOutboundRevampedIcon, } from '@nice-devone/ui-controls';
import ccfCommitmentStyles from './ccf-commitment-form.styles';
import { useRemoveCommitment } from './ccf-remove-commitment';
import { commitmentActions, getCommitmentsList, getRemoveCommitmentSettings, getCommitmentPermission, } from './ccf-commitment.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUtcTimezoneOffset } from '../../util/common';
import dayjs from 'dayjs';
/**
 * Tooltip handler for commitment details
 * @example <CommitmentDetail />
 */
export const CommitmentDetail = (props) => {
    var _a, _b;
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = ccfCommitmentStyles(theme);
    const [translate] = useTranslator();
    const { eventArgs } = props;
    const { timeText, event } = eventArgs;
    const { title, id: callbackId } = event;
    const eventExtendedProp = ((_b = (_a = eventArgs.event) === null || _a === void 0 ? void 0 : _a._def) === null || _b === void 0 ? void 0 : _b.extendedProps) || {};
    const { firstName, lastName, dialNumber, isIEXEvent } = eventExtendedProp;
    const notesRequiredToDelete = useSelector(getRemoveCommitmentSettings);
    const { delete: canDelete } = useSelector(getCommitmentPermission);
    const { triggerRemoveToast } = useRemoveCommitment(notesRequiredToDelete, Number(callbackId));
    const commitmentScheduledTime = `${translate('commitmentScheduledTime')} ${timeText}`;
    const commitmentTime = `${translate('phoneNumber')} ${dialNumber}`;
    /**
     * @example edit button click handler
     */
    const editButtonHandler = (formData) => {
        const commitmentData = {
            commitmentType: formData.target === 'A' ? translate('agent') : translate('skill'),
            skillId: String(formData.skillId),
            fname: formData.firstName,
            lname: formData.lastName,
            phone: formData.dialNumber,
            timeZone: getUtcTimezoneOffset(),
            dateTime: dayjs(new Date(formData.callbackTime)).format('YYYY-MM-DDTHH:mm:ss'),
            notes: formData.notes,
            callbackId: String(formData.callbackId),
        };
        dispatch(commitmentActions.editCommitmentEvent(commitmentData));
        dispatch(commitmentActions.setIsEditCommitment(true));
        dispatch(commitmentActions.showCommitmentForm(true));
    };
    /**
     * Component for show icon with title
     * @example iconWithTitle(Icon, '0 0 20 20', 'title')
     */
    const iconWithTitle = (Icon, viewBox, typographyTitle, ariaLabel) => {
        return (_jsxs(CcfBox, Object.assign({ sx: styles.detail }, { children: [_jsx(Icon, { sx: styles.icon, viewBox: viewBox }), _jsx(CcfTypography, Object.assign({ "aria-label": ariaLabel }, { children: typographyTitle }))] })));
    };
    return (_jsxs(CcfBox, Object.assign({ sx: styles.container, "data-testid": "CommitmentDetail" }, { children: [_jsx(CcfBox, { sx: !isIEXEvent ? styles.circle : styles.circleIEX }), _jsxs(CcfBox, Object.assign({ sx: styles.commitmentDetailsWrapper }, { children: [_jsx(CcfBox, Object.assign({ sx: styles.headingWrapper }, { children: _jsx(CcfTypography, Object.assign({ "data-testid": "commitment-heading", variant: 'h5', sx: styles.heading }, { children: title })) })), !isIEXEvent && _jsx(CcfTypography, Object.assign({ sx: styles.commitmentTitle }, { children: `${firstName} ${lastName}` })), iconWithTitle(CcfCalendarIcon, '0 0 20 20', timeText, commitmentScheduledTime), !isIEXEvent && (_jsxs(_Fragment, { children: [iconWithTitle(CcfPhoneOutboundRevampedIcon, '0 0 24 24', dialNumber, commitmentTime), _jsxs(CcfBox, Object.assign({ sx: styles.buttonWrapperTooltip }, { children: [_jsx(CcfButton, Object.assign({ sx: styles.btn, onClick: () => editButtonHandler(eventExtendedProp), "data-testid": 'commitmentEditBtn', "aria-label": translate('edit') }, { children: _jsx(CcfTypography, { translationKey: "edit" }) })), canDelete && (_jsx(CcfButton, Object.assign({ "data-testid": 'commitmentDeleteBtn', primary: true, variant: "contained", sx: styles.btn, onClick: triggerRemoveToast, "aria-label": translate('remove') }, { children: _jsx(CcfTypography, { translationKey: "remove" }) })))] }))] }))] }))] })));
};
/**
 * Commitment list
 * @example useCcfCommitmentList()
 */
export const useCcfCommitmentList = () => {
    const commitments = useSelector(getCommitmentsList);
    const [translate] = useTranslator();
    const theme = useTheme();
    const commitmentList = commitments.map((item) => {
        const callBackTime = new Date(item.callbackTime);
        return {
            title: translate('commitment'),
            start: callBackTime,
            end: new Date(callBackTime.getTime() + 30 * 60000),
            backgroundColor: theme.palette.agentState.working,
            id: String(item.callbackId),
            notes: item.notes,
            extendedProps: Object.assign({}, item),
        };
    });
    return commitmentList;
};
//# sourceMappingURL=ccf-commitment-details.js.map