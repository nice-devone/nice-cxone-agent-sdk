import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Grid, useTheme, Box } from '@mui/material';
import { CcfTextField, useTranslator } from '@nice-devone/ui-controls';
import { getCxoneDigitalContactUserSavedProperties, CcfAssignmentAction, getNonIncomingActiveContactInSelectedInteraction, getAssignmentPanelMetadata, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfDigitalOutboundContactStyles from './ccf-digital-outbound-contact.style';
import WrapperComponent from '../../ccf-navigation/ccf-wrapper-component';
import { saveContactUserSavedPropertiesFromLS } from '../../ccf-assignment-panel/ccf-assignment-utils';
/**
 * Component to displays digital outbound contact tab
 * @returns digital ob contact
 * @example
 * ```
 * <CcfDigitalOutboundContact />
 * ```
 */
export default function CcfDigitalOutboundContact(props) {
    const { caseId, interactionId } = props;
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const [translate] = useTranslator();
    const [customerName, setCustomerName] = useState('');
    const theme = useTheme();
    const assignmentPanelMetaData = useSelector(getAssignmentPanelMetadata);
    const voiceInteractionId = assignmentPanelMetaData === null || assignmentPanelMetaData === void 0 ? void 0 : assignmentPanelMetaData.voiceInteractionId;
    const shouldAdjustHeightForVoiceContact = typeof (voiceInteractionId) === 'string' && (voiceInteractionId === null || voiceInteractionId === void 0 ? void 0 : voiceInteractionId.length) > 0;
    const styles = CcfDigitalOutboundContactStyles(theme, shouldAdjustHeightForVoiceContact);
    useEffect(() => {
        // In this useEffect, we are setting the recipient field on OB draft screen
        const currentRecipient = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.customerName) ? nonIncomingActiveContactInSelectedInteraction.customerName : '';
        setCustomerName(currentRecipient);
    }, [nonIncomingActiveContactInSelectedInteraction]);
    useEffect(() => {
        saveContactUserSavedPropertiesFromLS(digitalContactUserSavedProperties, dispatch);
    }, []);
    /**
     * Function to change recipient name
     * @param e - React.ChangeEvent<HTMLInputElement>
     * @example - recipientChangeHandler(e)
     */
    const recipientChangeHandler = (e) => {
        e.preventDefault();
        const recipientValue = e.target.value;
        if (recipientValue !== customerName) {
            setCustomerName(recipientValue);
            dispatch(CcfAssignmentAction.updateDigitalRecipientName({
                recipientName: recipientValue,
                caseId: caseId,
                interactionId: interactionId,
            }));
        }
    };
    return (_jsx("form", { children: _jsxs(Grid, Object.assign({ container: true, direction: "column", justifyContent: "center", alignItems: "stretch", sx: styles.smsObPanel }, { children: [_jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfTextField, { fullWidth: true, label: translate('recipient'), required: true, id: "outlined-basic", variant: "outlined", margin: "normal", onChange: recipientChangeHandler, onKeyDown: (e) => {
                            e.key === 'Enter'
                                && e.preventDefault();
                        }, value: customerName, defaultValue: customerName, error: customerName && customerName.trim().length > 0 ? false : true }) })), _jsx(Grid, { item: true, sx: styles.gridItemHeight }), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(Box, Object.assign({ sx: styles.toolbarContainer }, { children: _createElement(WrapperComponent, Object.assign({}, props, { closeTab: props.closeTab, component: "ccfEditorComponent", key: caseId })) })) }))] })) }));
}
//# sourceMappingURL=ccf-digital-outbound-contact.js.map