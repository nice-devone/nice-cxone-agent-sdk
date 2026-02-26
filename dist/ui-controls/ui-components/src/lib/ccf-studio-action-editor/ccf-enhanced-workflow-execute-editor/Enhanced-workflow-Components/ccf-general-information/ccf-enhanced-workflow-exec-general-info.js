import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, InputLabel, ListItemIcon, useTheme, TextField, CircularProgress } from '@mui/material';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import { CcfBox, CcfTypography, useTranslator, CcfRadioGroup, CcfDeboucedInput, CcfAutoComplete, } from '@nice-devone/ui-controls';
import CONSTANTS from '../../constants';
import CcfEnhancedWEStepperContainer from '../ccf-stepper-section/ccf-enhanced-workflow-exec-stepper-container';
import CcfEnhancedWEGeneralInformationStyles from './ccf-enhanced-workflow-exec-general-info.styles';
import { WorkflowType } from '../../helpers/enhanced-workflow-models';
import { CRMSupportedWorkflowTypes } from '../../helpers/crm-supported-workflow-types';
/**
 * Component displays agent workflow execution application General Information screen.
 *
 * This component renders a "General Information" section for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying the agent workflow execution general information screen.
 * @example
 *   <CcfEnhancedWEGeneralInformation />
 */
const CcfEnhancedWEGeneralInformation = () => {
    var _a, _b, _c, _d;
    const [translate] = useTranslator();
    const crmSupportedWorkflowTypes = new CRMSupportedWorkflowTypes();
    const dispatch = useDispatch();
    const selectedEnhancedWorkflowConfig = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _a !== void 0 ? _a : {};
    const existingWorkflows = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getapplicationEWEConfiguration)) !== null && _b !== void 0 ? _b : {};
    const selectedConfigIndex = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getSelectedAWEConfigIndex)) !== null && _c !== void 0 ? _c : -1;
    const crmSolutionInstances = (_d = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getConfigurations)) !== null && _d !== void 0 ? _d : {};
    const theme = useTheme();
    const styles = CcfEnhancedWEGeneralInformationStyles(theme);
    const [workflowName, setWorkflowName] = useState(selectedEnhancedWorkflowConfig.name);
    const [dropdownValue, setDropdownValue] = useState(selectedEnhancedWorkflowConfig.configId);
    const [selectedWorkflow, setSelectedWorkflow] = useState(selectedEnhancedWorkflowConfig.workflowSubtype);
    const [showNameExistError, setShowNameExistError] = useState(false);
    const availableWorkflowSubTypeForCrm = crmSupportedWorkflowTypes.getCRMSupportedWorkflowTypes(selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.crmName);
    const [availableWorkflowSubType, setAvailableWorkflowSubType] = useState(availableWorkflowSubTypeForCrm);
    useEffect(() => {
        const { name, workflowSubtype, configId } = selectedEnhancedWorkflowConfig;
        setWorkflowName(name);
        setDropdownValue(configId);
        setSelectedWorkflow(workflowSubtype);
        setAvailableWorkflowSubType(availableWorkflowSubTypeForCrm);
    }, [selectedEnhancedWorkflowConfig.name,
        selectedEnhancedWorkflowConfig.configId,
        selectedEnhancedWorkflowConfig.workflowSubtype,
        selectedEnhancedWorkflowConfig.crmName
    ]);
    useEffect(() => {
        if (!selectedEnhancedWorkflowConfig.configId) {
            setAvailableWorkflowSubType([]);
            setShowNameExistError(false);
        }
    }, [selectedEnhancedWorkflowConfig.configId]);
    /**
     * Handle change when workflow type is selected
     * @example handleWorkflowTypeSelection()
     */
    const handleWorkflowTypeSelection = (event, userWorkflowType) => {
        event.stopPropagation();
        setSelectedWorkflow(userWorkflowType);
        const workflowType = (() => {
            if (userWorkflowType.includes('Create'))
                return WorkflowType.Create;
            if (userWorkflowType.includes('CustomSearch'))
                return WorkflowType.DynamicData;
            return WorkflowType.Search;
        })();
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { workflowSubtype: userWorkflowType, workflowType, phoneNumber: '', emailAddress: '', cacheResponse: 'true', workflowId: '' })));
    };
    /**
     * Function to change workflow name
     * @param e - React.ChangeEvent<HTMLInputElement>
     * @example - workflowNameChangeHandler(e)
     */
    const workflowNameChangeHandler = (e) => {
        setWorkflowName(e.target.value);
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { name: e.target.value })));
    };
    /**
   * Function to handle dropdown selection
   * @param e - React.ChangeEvent<HTMLInputElement>
   * @example - dropdownSelectionHandler(e)
   */
    const dropdownSelectionHandler = (event) => {
        const selectedId = event.target.value;
        setDropdownValue(selectedId);
        // const selectedObject = selectedConfigMock.find((configuration) => configuration.id === selectedId) || {} as AgentIntegrationConfiguration;
        //To-do uncomment below line remove above line
        const selectedCRMSolution = crmSolutionInstances.find((configuration) => configuration.id === selectedId) || {};
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { configId: selectedId, crmName: selectedCRMSolution.typeName })));
        const availableWorkflowSubTypeForCrm = crmSupportedWorkflowTypes.getCRMSupportedWorkflowTypes(selectedCRMSolution.typeName);
        setAvailableWorkflowSubType(availableWorkflowSubTypeForCrm);
    };
    /**
     * Handles changes in the CRM solution dropdown.
     *
     * @param _ - The event object (not used).
     * @param newValue - The newly selected CRM solution, or null if none is selected.
     *
     * @example
     * ```ts
     * handleCrmSolutionChange(_, { id: 'crm1', typeName: 'Salesforce' });
     * ```
     */
    const handleCrmSolutionChange = (_, newValue) => {
        const selectedId = (newValue === null || newValue === void 0 ? void 0 : newValue.id) || '';
        setDropdownValue(selectedId);
        if (newValue) {
            const selectedCRMSolution = newValue;
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { configId: selectedId, crmName: selectedCRMSolution.typeName })));
            const availableWorkflowSubTypeForCrm = crmSupportedWorkflowTypes.getCRMSupportedWorkflowTypes(selectedCRMSolution.typeName);
            setAvailableWorkflowSubType(availableWorkflowSubTypeForCrm);
        }
    };
    /**
   * Function to check if workflow name already exists
   * @example - checkIfWorkflowNameExists()
   */
    const checkIfWorkflowNameExists = () => {
        var _a;
        const isExisting = (_a = existingWorkflows === null || existingWorkflows === void 0 ? void 0 : existingWorkflows.configs) === null || _a === void 0 ? void 0 : _a.find((config, index) => config.name.toLocaleLowerCase() === selectedEnhancedWorkflowConfig.name.toLocaleLowerCase() && index !== selectedConfigIndex);
        if (isExisting) {
            setShowNameExistError(true);
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { name: '' })));
        }
        else {
            setShowNameExistError(false);
        }
    };
    return (_jsxs(Box, Object.assign({ sx: styles.mainContainer }, { children: [_jsx(CcfEnhancedWEStepperContainer, {}), _jsxs(Box, Object.assign({ sx: styles.infoContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.workflowNameInputContainer }, { children: [_jsx(InputLabel, Object.assign({ shrink: false, htmlFor: 'workflow-name', sx: styles.inputLabel }, { children: _jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: "WORKFLOW NAME" })) })), _jsx(CcfDeboucedInput, { inputProps: { maxLength: 100 }, className: "workflowNameInput", size: "small", required: true, variant: "outlined", id: "workflow-name", value: workflowName ? workflowName : '', placeholder: workflowName ? workflowName : 'Enter name', delay: 500, onChange: workflowNameChangeHandler, sx: styles.inputPlaceHolder, onBlur: checkIfWorkflowNameExists }), showNameExistError && _jsx("p", Object.assign({ style: styles.errorStyles }, { children: "Workflow name already exists, please enter another name" }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.dropdownContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: "CRM CONFIGURATION NAME" })), _jsx(CcfAutoComplete, { disableClearable: true, options: crmSolutionInstances || [], value: (crmSolutionInstances === null || crmSolutionInstances === void 0 ? void 0 : crmSolutionInstances.find((config) => config.id === dropdownValue)) || null, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.name) || '', isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.id) === (value === null || value === void 0 ? void 0 : value.id), onChange: handleCrmSolutionChange, renderInput: (params) => {
                                    var _a;
                                    return _jsx(TextField, Object.assign({}, params, { InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (_jsxs(React.Fragment, { children: [crmSolutionInstances.length === 0 ? _jsx(CircularProgress, { color: "inherit", size: 20 }) : null, (_a = params.InputProps) === null || _a === void 0 ? void 0 : _a.endAdornment] })) }) }));
                                }, sx: styles.configurationDropdown, size: "small" })] })), (availableWorkflowSubType === null || availableWorkflowSubType === void 0 ? void 0 : availableWorkflowSubType.length) > 0 && _jsx(CcfBox, Object.assign({ sx: styles.selectWorkflow }, { children: "Select Workflow Type" })), _jsx(Box, Object.assign({ sx: styles.cardContainer }, { children: (availableWorkflowSubType === null || availableWorkflowSubType === void 0 ? void 0 : availableWorkflowSubType.length) > 0 && CONSTANTS.WORKFLOW_TYPES.filter((type) => availableWorkflowSubType.includes(type.searchType)).map((workflowSubType) => (_jsxs(Box, Object.assign({ "data-testid": workflowSubType.searchType, sx: Object.assign(Object.assign({}, styles.workflowCards), { border: selectedWorkflow === workflowSubType.searchType ? `0.125rem solid ${theme.palette.primary.main}` : `0.1rem solid ${theme.palette.border.main}` }), onClick: (event) => {
                                handleWorkflowTypeSelection(event, workflowSubType.searchType);
                            } }, { children: [_jsx(CcfBox, Object.assign({ sx: styles.radioBtn }, { children: _jsx(CcfRadioGroup, { data: [
                                            {
                                                id: workflowSubType.searchType,
                                                value: workflowSubType.searchType,
                                                label: '',
                                            }
                                        ], name: workflowSubType.searchType, horizontalAlign: true, defaultValue: translate('agent'), size: "small", selected: selectedWorkflow }) })), _jsxs(CcfBox, Object.assign({ sx: styles.imageContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.iconContainer }, { children: [workflowSubType.icon && _jsx(ListItemIcon, { sx: Object.assign(Object.assign({}, styles.listItemIcons), { width: '34px', height: '34px', backgroundImage: `url(${workflowSubType.icon})` }) }), workflowSubType.additionalIcons && workflowSubType.additionalIcons.length > 0 && (_jsx(Box, Object.assign({ sx: styles.iconContainer }, { children: workflowSubType.additionalIcons.map((icon) => (_jsx(Box, { sx: Object.assign(Object.assign({}, styles.listItemIcons), { backgroundSize: `${icon.backgroundSize}`, marginRight: `${icon.marginRight}px`, width: `${icon.width}rem`, height: `${icon.height}rem`, backgroundImage: `url(${icon.src})` }) }, icon.src))) })))] })), _jsx(CcfTypography, Object.assign({ sx: styles.searchTypeText }, { children: workflowSubType.title }))] }))] }), workflowSubType.searchType))) }))] }))] })));
};
export default CcfEnhancedWEGeneralInformation;
//# sourceMappingURL=ccf-enhanced-workflow-exec-general-info.js.map