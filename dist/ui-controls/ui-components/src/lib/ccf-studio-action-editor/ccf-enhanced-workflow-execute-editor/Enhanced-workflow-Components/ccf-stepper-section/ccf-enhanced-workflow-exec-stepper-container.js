import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfBox, CcfTypography } from '@nice-devone/ui-controls';
import { Step, StepLabel, Stepper, Typography, StepConnector, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import CONSTANTS from '../../constants';
import { fetchConfigurationWorkflows, fetchDynamicDataMappings } from '../../thunks';
import CcfEnhancedWEStepperContainerStyles from './ccf-enhanced-workflow-exec-stepper-container.styles';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
/**
 * Common component to display stepper and other action buttons
 *
 * This component renders a Common component to display stepper and other action buttons for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the agent workflow execution general information screen.
 * @example
 *   <CcfEnhancedWEStepperContainer />
 */
const CcfEnhancedWEStepperContainer = () => {
    var _a, _b, _c;
    const theme = useTheme();
    const styles = CcfEnhancedWEStepperContainerStyles(theme);
    const dispatch = useDispatch();
    const { GENERAL_INFORMATION, CUSTOM_SEARCH_FILTER, PHONE_EMAIL_SEARCH, CUSTOM_SEARCH } = CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen;
    const selectedEnhancedWorkflowConfig = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _a !== void 0 ? _a : {};
    const renderedComponent = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getCurrentComponentRendered)) !== null && _b !== void 0 ? _b : '';
    const activeStep = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getActiveStep)) !== null && _c !== void 0 ? _c : 0;
    /**
   * Function to handle stepper color
   * @param completed - boolean, active  - boolean
   * @example - getStepColor(completed,active)
   */
    const getStepColor = (completed, active) => {
        let backgroundColor = theme.palette.text.grey;
        if (completed) {
            backgroundColor = theme.palette.success.dark;
        }
        else if (active) {
            backgroundColor = theme.palette.primary.main;
        }
        return backgroundColor;
    };
    /**
   * Function to handle stepper icon and its color
   * @param e - React.ChangeEvent<HTMLInputElement>
   * @example - StepIcon(e)
   */
    const StepIcon = ({ active, completed, icon }) => {
        return _jsx("div", Object.assign({ style: Object.assign(Object.assign({}, styles.iconStyles), { backgroundColor: getStepColor(completed, active) }) }, { children: completed ? _jsx(CheckIcon, {}) : icon }));
    };
    const steps = ['General Information', 'Configuration'];
    /**
     * Function to change workflow name
     * @example - handleNextButtonClick()
     */
    const handleNextButtonClick = (index) => {
        let componentToRender;
        const { configId, workflowSubtype, name, entities } = selectedEnhancedWorkflowConfig;
        if (renderedComponent === GENERAL_INFORMATION && configId && workflowSubtype && name) {
            const selectedWorkflow = CONSTANTS.WORKFLOW_TYPES.find((workflow) => workflow.searchType === selectedEnhancedWorkflowConfig.workflowSubtype);
            if (selectedWorkflow) {
                if (selectedWorkflow.searchType === 'CustomSearch') {
                    componentToRender = CUSTOM_SEARCH_FILTER;
                }
                else if (selectedWorkflow.searchType === 'PhoneNumberSearch' || selectedWorkflow.searchType === 'EmailSearch') {
                    componentToRender = PHONE_EMAIL_SEARCH;
                }
            }
            if (componentToRender) {
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(componentToRender));
            }
            ;
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(index));
        }
        ;
        if (renderedComponent === CUSTOM_SEARCH_FILTER
            && entities.length > 0 && entities[0].entityName && entities[0].columns.length > 0
            && entities[0].columns[0].columnName && entities[0].columns[0].operator && entities[0].columns[0].value) {
            dispatch(fetchConfigurationWorkflows(configId));
            dispatch(fetchDynamicDataMappings(configId));
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(CUSTOM_SEARCH));
        }
    };
    /**
     * Function to change workflow name
     * @param e - number
     * @example - handleStepClick(index)
     */
    const handleStepClick = (index) => {
        // count starts from 0
        if (index === 1) {
            handleNextButtonClick(index);
        }
        else {
            if (index === 0) {
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(GENERAL_INFORMATION));
            }
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(index));
        }
    };
    return (_jsxs(CcfBox, Object.assign({ style: styles.headerContainer }, { children: [_jsx(CcfBox, Object.assign({ style: styles.mainHeading }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.mainHeading.headingTypography }, { children: " New Configuration" })) })), _jsx(CcfBox, Object.assign({ sx: styles.stepperWrapper }, { children: _jsx(CcfBox, Object.assign({ sx: styles.stepperContainer }, { children: _jsx(Stepper, Object.assign({ alternativeLabel: true, activeStep: activeStep, connector: _jsx(StepConnector, { sx: styles.connectorStyles }) }, { children: steps.map((label, index) => (_jsx(Step, Object.assign({ completed: index < activeStep, onClick: () => handleStepClick(index) }, { children: _jsx(StepLabel, Object.assign({ StepIconComponent: () => (_jsx(StepIcon, { active: index === activeStep, completed: index < activeStep, icon: index + 1 })) }, { children: _jsx(Typography, Object.assign({ sx: index === activeStep ? styles.headerLabelSelected : styles.headerLabel }, { children: label })) })) }), label))) })) })) }))] })));
};
export default CcfEnhancedWEStepperContainer;
//# sourceMappingURL=ccf-enhanced-workflow-exec-stepper-container.js.map