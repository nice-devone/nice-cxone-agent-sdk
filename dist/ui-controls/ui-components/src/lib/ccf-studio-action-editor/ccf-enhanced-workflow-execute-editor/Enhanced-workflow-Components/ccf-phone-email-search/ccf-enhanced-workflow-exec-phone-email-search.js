import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { CcfBox, CcfTypography, CcfDeboucedInput } from '@nice-devone/ui-controls';
import CcfEnhancedWEStepperContainer from '../ccf-stepper-section/ccf-enhanced-workflow-exec-stepper-container';
import CcfEnhancedPrimaryPhoneEmailSearchStyles from './ccf-enhanced-workflow-exec-phone-email-search.styles';
import CcfEnhancedWEConfigurationTable from '../ccf-config-table/ccf-enhanced-workflow-exec-config-table';
import { InputLabel, Box, useTheme } from '@mui/material';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import { useSelector, useDispatch } from 'react-redux';
/**
 * Component displays agent workflow execution application Specific search workflow Information screen.
 *
 * This component renders a "workflow mapping" section for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the workflow mapping information screen for phone / email.
 * @example
 *   <CcfEnhancedWEPhoneEmailSearch />
 */
const CcfEnhancedWEPhoneEmailSearch = () => {
    var _a;
    const dispatch = useDispatch();
    const selectedEnhancedWorkflowConfig = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _a !== void 0 ? _a : {};
    const isPhone = selectedEnhancedWorkflowConfig.workflowSubtype === 'PhoneNumberSearch';
    const [phoneNumber, setPhoneNumber] = useState(selectedEnhancedWorkflowConfig.phoneNumber);
    const [emailAddress, setEmailAddress] = useState(selectedEnhancedWorkflowConfig.emailAddress);
    /**
     * Function to change workflow name
     * @param e - React.ChangeEvent<HTMLInputElement>
     * @example - phoneEmailInputChangeHandler(e)
     */
    const phoneEmailInputChangeHandler = (e) => {
        if (isPhone) {
            setPhoneNumber(e.target.value);
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { phoneNumber: e.target.value })));
        }
        else {
            setEmailAddress(e.target.value);
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { emailAddress: e.target.value })));
        }
    };
    /**
     * Function to get the phone email input value
     * @example - getPhoneEmailInputValue()
     */
    const getPhoneEmailInputValue = () => {
        if (isPhone) {
            return phoneNumber;
        }
        else {
            return emailAddress;
        }
    };
    /**
     * Function to get the phone email placeholder value
     * @example - getPhoneEmailPlaceholder()
     */
    const getPhoneEmailPlaceholder = () => {
        if (isPhone) {
            return phoneNumber ? phoneNumber : 'Enter Phone Number';
        }
        else {
            return emailAddress ? emailAddress : 'Enter Email Address';
        }
    };
    const theme = useTheme();
    const styles = CcfEnhancedPrimaryPhoneEmailSearchStyles(theme);
    return (_jsxs(CcfBox, Object.assign({ sx: styles.mainContainer }, { children: [_jsx(CcfEnhancedWEStepperContainer, {}), _jsxs(CcfBox, { children: [_jsx(Box, Object.assign({ sx: styles.infoContainer }, { children: _jsxs(CcfBox, Object.assign({ sx: styles.phoneEmailInputContainer }, { children: [_jsx(InputLabel, Object.assign({ shrink: false, htmlFor: 'phone-email' }, { children: _jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: isPhone ? 'PHONE NUMBER' : 'EMAIL ADDRESS' })) })), _jsx(CcfDeboucedInput, { inputProps: { maxLength: isPhone ? 25 : 320 }, className: "PEInput", size: "small", required: true, variant: "outlined", id: "phone-email", value: getPhoneEmailInputValue(), placeholder: getPhoneEmailPlaceholder(), delay: 500, onChange: phoneEmailInputChangeHandler, sx: styles.inputPlaceHolder })] })) })), _jsx(CcfEnhancedWEConfigurationTable, {})] })] })));
};
export default CcfEnhancedWEPhoneEmailSearch;
//# sourceMappingURL=ccf-enhanced-workflow-exec-phone-email-search.js.map