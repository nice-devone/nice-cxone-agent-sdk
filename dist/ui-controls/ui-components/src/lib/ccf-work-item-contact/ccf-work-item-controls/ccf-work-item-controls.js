import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Stack, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CcfTransferButton } from '../../ccf-transfer-button/ccf-transfer-button';
import { getSelectedInteraction, workItemContactSelector, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLaunchButton } from '../../ccf-launch-button/ccf-launch-button';
import { CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { dispositionInteractionActions, getDispositionData, } from '../../ccf-disposition/ccf-disposition-slice';
import contactControlStyles from '../../../styles/ccf-contact-control.style';
import { CcfOutcomeButton } from '../../ccf-outcome-button/ccf-outcome-button';
import { WorkItemContactStatus } from '@nice-devone/common-sdk';
/**
 * Component to display contact control panel
 * @param props - CcfWorkItemControlsProps
 * ```
 * @example-
 * <CcfWorkItemControls />
 * ```
 */
export const CcfWorkItemControls = (props) => {
    var _a, _b, _c, _d;
    const workItemContact = useSelector(workItemContactSelector);
    const activeContactInSelectedInteraction = useSelector(getSelectedInteraction);
    const isSelected = workItemContact.contactID === activeContactInSelectedInteraction;
    const dispatch = useDispatch();
    const { displayDispositionCard } = dispositionInteractionActions;
    const dispositionData = useSelector(getDispositionData);
    const showOutcomesButton = ((_b = (_a = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[props.workItemContact.contactID]) === null || _a === void 0 ? void 0 : _a.dispositionList) === null || _b === void 0 ? void 0 : _b.length) > 0 || ((_d = (_c = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[props.workItemContact.contactID]) === null || _c === void 0 ? void 0 : _c.tagList) === null || _d === void 0 ? void 0 : _d.length) > 0;
    const [translate] = useTranslator();
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const inAcw = workItemContact.status === WorkItemContactStatus.DISCONNECTED && !workItemContact.finalState;
    /**
     * function to handle click on complete button
     * @example - onCompleteClick
     */
    const onCompleteClick = () => {
        dispatch(displayDispositionCard(true));
        workItemContact.complete();
    };
    return (_jsxs(Stack, Object.assign({ direction: { xs: 'row', xl: 'column' }, width: '100%' }, { children: [_jsxs(Stack, Object.assign({ alignItems: 'center', direction: 'row', justifyContent: 'space-evenly' }, { children: [_jsx(CcfLaunchButton, { contactId: props.contactId, sx: controlStyles.contactPanelButton }), _jsx(CcfTransferButton, { sx: controlStyles.contactPanelButton, disabled: inAcw }), showOutcomesButton && (_jsx(CcfOutcomeButton, { disabled: !isSelected, placement: 'top', sx: controlStyles.contactPanelButton }))] })), _jsx(CcfTooltip, Object.assign({ translationKey: 'complete', title: 'complete', arrow: true }, { children: _jsx(Button, Object.assign({ sx: { margin: { xs: '10px', xl: '0 10px 10px' } }, variant: 'contained', onClick: onCompleteClick, disabled: !isSelected || inAcw }, { children: translate('complete') })) }))] })));
};
//# sourceMappingURL=ccf-work-item-controls.js.map