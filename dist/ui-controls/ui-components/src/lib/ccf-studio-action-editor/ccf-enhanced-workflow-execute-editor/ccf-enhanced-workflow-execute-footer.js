import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CcfBox, CcfButton, CcfTypography } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import * as CcfStudioActionEditorSlice from '../ccf-studio-action-editor.slice';
import * as CcfEnhancedWorkflowExecuteEditorSlice from './ccf-enhanced-workflow-execute-editor.slice';
import CONSTANTS from './constants';
import CcfEnhancedWEFooterStyles from './ccf-enhanced-workflow-execute-footer.styles';
import { fetchConfigurationWorkflows, fetchWorkflowEntities, fetchDynamicDataMappings } from './thunks';
import { WorkflowPayloadGeneratorFactory } from './helpers/workflow-payload-generator-factory';
import { toast, ToastContainer } from 'react-toastify';
import { WorkflowSubType } from './helpers/enhanced-workflow-models';
import { useTheme } from '@mui/material';
/**
 * Component displays agent workflow execution application Home Screen
 * @returns agent workflow execution component
 * @example <CcfEnhancedWEEditorFooter />
 */
const CcfEnhancedWEEditorFooter = () => {
    var _a, _b, _c, _d, _e;
    const { HOME_SCREEN, GENERAL_INFORMATION, CUSTOM_SEARCH_FILTER, PHONE_EMAIL_SEARCH, CUSTOM_SEARCH, SUMMARY_TEST, AUTOMATIC_CREATE_FILTER, AUTO_MANUAL_CREATE, MANUAL_CREATE_FILTER, } = CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen;
    const dispatch = useDispatch();
    const renderedComponent = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getCurrentComponentRendered)) !== null && _a !== void 0 ? _a : '';
    const activeStep = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getActiveStep)) !== null && _b !== void 0 ? _b : 0;
    const selectedEnhancedWorkflowConfig = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _c !== void 0 ? _c : {};
    const selectedAWEConfigIndex = (_d = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getSelectedAWEConfigIndex)) !== null && _d !== void 0 ? _d : -1;
    const theme = useTheme();
    const styles = CcfEnhancedWEFooterStyles(theme);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = useSelector(CcfStudioActionEditorSlice.getData); // close action
    const selectedWorkflowSubtype = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.workflowSubtype;
    const applicationExistingConfiguration = (_e = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getapplicationEWEConfiguration)) !== null && _e !== void 0 ? _e : {};
    /**
      * Handle click on create button
      * @example handleCreateButtonClick()
      */
    const handleCreateButtonClick = () => {
        var _a, _b, _c;
        const payloadGeneratedForConfig = WorkflowPayloadGeneratorFactory.getWorkflowPayloadGenerator(selectedEnhancedWorkflowConfig).generateQuery();
        const newaweupdatedwithinputpayload = Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { workflowInputPayload: payloadGeneratedForConfig });
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign({}, newaweupdatedwithinputpayload)));
        if (selectedAWEConfigIndex !== -1) {
            const applicationconfigdata = [...(_a = applicationExistingConfiguration.configs) !== null && _a !== void 0 ? _a : []];
            applicationconfigdata[selectedAWEConfigIndex] = newaweupdatedwithinputpayload;
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEnhancedWorkflowConfigs(Object.assign(Object.assign({}, applicationExistingConfiguration), { configs: applicationconfigdata })));
            const setConfigIndex = applicationExistingConfiguration.configs.findIndex(config => config.name === selectedEnhancedWorkflowConfig.name);
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setselectedEWEConfigIndex(setConfigIndex));
        }
        else {
            const updatedConfigs = [...(_b = applicationExistingConfiguration.configs) !== null && _b !== void 0 ? _b : [], newaweupdatedwithinputpayload];
            const updatedApplicationExistingConfiguration = Object.assign(Object.assign({}, applicationExistingConfiguration), { configs: updatedConfigs });
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEnhancedWorkflowConfigs(updatedApplicationExistingConfiguration));
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setselectedEWEConfigIndex((_c = applicationExistingConfiguration === null || applicationExistingConfiguration === void 0 ? void 0 : applicationExistingConfiguration.configs) === null || _c === void 0 ? void 0 : _c.length));
        }
        const subtype = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.workflowSubtype;
        const renderableSubtypes = [
            WorkflowSubType.PhoneNumberSearch,
            WorkflowSubType.EmailSearch,
            WorkflowSubType.CustomSearch,
            WorkflowSubType.AutomaticCreate,
            WorkflowSubType.ManualCreate
        ];
        if (subtype && renderableSubtypes.includes(subtype)) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(SUMMARY_TEST));
        }
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.thunks.handleApply());
        if (selectedAWEConfigIndex !== -1) {
            toast.success('Enhanced Workflow Configuration Updated Successfully');
        }
        else {
            toast.success('Enhanced Workflow Configuration Created Successfully');
        }
    };
    /**
        * Handle click on next button from footer
        * @example handleNextButtonClick()
        */
    const handleNextButtonClick = () => {
        const { configId, workflowSubtype, name } = selectedEnhancedWorkflowConfig;
        // Determine the dispatch value based on selectedWorkflow
        let componentToRender;
        if (renderedComponent === GENERAL_INFORMATION && configId && workflowSubtype && name) {
            const selectedWorkflow = CONSTANTS.WORKFLOW_TYPES.find((workflow) => workflow.searchType === selectedEnhancedWorkflowConfig.workflowSubtype);
            if (selectedWorkflow) {
                if (selectedWorkflow.searchType === 'CustomSearch') {
                    componentToRender = CUSTOM_SEARCH_FILTER;
                    dispatch(fetchWorkflowEntities(configId));
                }
                else if (selectedWorkflow.searchType === 'PhoneNumberSearch' || selectedWorkflow.searchType === 'EmailSearch') {
                    componentToRender = PHONE_EMAIL_SEARCH;
                    dispatch(fetchConfigurationWorkflows(configId));
                    dispatch(fetchDynamicDataMappings(configId));
                }
                else if (selectedWorkflow.searchType === 'AutomaticCreate') {
                    componentToRender = AUTOMATIC_CREATE_FILTER;
                    dispatch(fetchWorkflowEntities(configId));
                }
                else if (selectedWorkflow.searchType === 'ManualCreate') {
                    componentToRender = MANUAL_CREATE_FILTER;
                    dispatch(fetchWorkflowEntities(configId));
                }
            }
        }
        else if (renderedComponent === CUSTOM_SEARCH_FILTER) {
            componentToRender = CUSTOM_SEARCH;
            dispatch(fetchConfigurationWorkflows(configId));
            dispatch(fetchDynamicDataMappings(configId));
        }
        else if (renderedComponent === AUTOMATIC_CREATE_FILTER) {
            componentToRender = AUTO_MANUAL_CREATE;
            dispatch(fetchConfigurationWorkflows(configId));
            dispatch(fetchDynamicDataMappings(configId));
        }
        else if (renderedComponent === MANUAL_CREATE_FILTER) {
            componentToRender = AUTO_MANUAL_CREATE;
            dispatch(fetchConfigurationWorkflows(configId));
            dispatch(fetchDynamicDataMappings(configId));
        }
        if (componentToRender) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(componentToRender));
            if (renderedComponent !== CUSTOM_SEARCH_FILTER) {
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(activeStep + 1));
            }
        }
    };
    /**
     * Handle click on previous button from footer
     * @example handlePreviousButtonClick()
    */
    const handlePreviousButtonClick = () => {
        switch (renderedComponent) {
            case PHONE_EMAIL_SEARCH:
            case CUSTOM_SEARCH_FILTER:
            case AUTOMATIC_CREATE_FILTER:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(GENERAL_INFORMATION));
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(activeStep - 1));
                break;
            case MANUAL_CREATE_FILTER:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(GENERAL_INFORMATION));
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(activeStep - 1));
                break;
            case CUSTOM_SEARCH:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(CUSTOM_SEARCH_FILTER));
                break;
            case AUTO_MANUAL_CREATE:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(selectedWorkflowSubtype === WorkflowSubType.AutomaticCreate ? AUTOMATIC_CREATE_FILTER : MANUAL_CREATE_FILTER));
                break;
            default:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(HOME_SCREEN));
        }
    };
    /**
        * Handles the disabling of next button
        * @example isNextButtonDisabled()
        */
    const isNextButtonDisabled = () => {
        switch (renderedComponent) {
            case GENERAL_INFORMATION:
                return !(selectedEnhancedWorkflowConfig.configId && selectedEnhancedWorkflowConfig.workflowSubtype && selectedEnhancedWorkflowConfig.name);
            case CUSTOM_SEARCH_FILTER: {
                if (!selectedEnhancedWorkflowConfig.entities ||
                    selectedEnhancedWorkflowConfig.entities.length === 0) {
                    return true;
                }
                const areEntitiesValid = selectedEnhancedWorkflowConfig.entities.every((entity) => {
                    if (!entity.columns || entity.columns.length === 0) {
                        return false;
                    }
                    return entity.columns.every((column, index) => {
                        if (index === 0) {
                            return column.columnName && column.operator;
                        }
                        return column.columnName && column.operator && column.condition;
                    });
                });
                return !areEntitiesValid;
            }
            case AUTOMATIC_CREATE_FILTER: {
                if (!selectedEnhancedWorkflowConfig.entities ||
                    selectedEnhancedWorkflowConfig.entities.length === 0) {
                    return true;
                }
                const areEntitiesValid = selectedEnhancedWorkflowConfig.entities.every((entity) => {
                    if (!entity.columns || entity.columns.length === 0) {
                        return false;
                    }
                    return entity.columns.every((column) => {
                        return !!column.columnAPIName;
                    });
                });
                return !areEntitiesValid;
            }
            case MANUAL_CREATE_FILTER: {
                if (!selectedEnhancedWorkflowConfig.entities ||
                    selectedEnhancedWorkflowConfig.entities.length === 0) {
                    return true;
                }
                const areEntitiesValid = selectedEnhancedWorkflowConfig.entities.every((entity) => {
                    if (!entity.columns || entity.columns.length === 0) {
                        return false;
                    }
                    if (!entity.displayName) {
                        return false;
                    }
                    return entity.columns.every((column) => {
                        return !!column.columnAPIName;
                    });
                });
                return !areEntitiesValid;
            }
            default:
                return false;
        }
    };
    /**
        * Handles the disabling of create button
        * @example isCreateButtonDisabled()
        */
    const isCreateButtonDisabled = () => {
        switch (renderedComponent) {
            case PHONE_EMAIL_SEARCH: {
                const isEmailValid = selectedEnhancedWorkflowConfig.emailAddress
                    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/i.test(selectedEnhancedWorkflowConfig.emailAddress) || /^\{.*\}$/i.test(selectedEnhancedWorkflowConfig.emailAddress)
                    : true;
                const isPhoneNumberValid = selectedEnhancedWorkflowConfig.phoneNumber
                    ? selectedEnhancedWorkflowConfig.phoneNumber.trim() !== ''
                    : false;
                return !(selectedEnhancedWorkflowConfig.workflowId && (isPhoneNumberValid || (selectedEnhancedWorkflowConfig.emailAddress && isEmailValid)));
            }
            case CUSTOM_SEARCH:
                return !(selectedEnhancedWorkflowConfig.workflowId);
            case AUTO_MANUAL_CREATE:
                return !(selectedEnhancedWorkflowConfig.workflowId);
            default:
                return false;
        }
    };
    /**
    * Handles what footer buttons to show on different screens
    * @example getButton()
    */
    const getButton = () => {
        switch (renderedComponent) {
            case GENERAL_INFORMATION:
            case CUSTOM_SEARCH_FILTER:
            case AUTOMATIC_CREATE_FILTER:
            case MANUAL_CREATE_FILTER:
                return (_jsx(CcfButton, Object.assign({ variant: 'contained', primary: true, disableElevation: true, disabled: isNextButtonDisabled(), sx: styles.footer.footerButton, onClick: handleNextButtonClick }, { children: _jsx(CcfTypography, { children: "Next" }) })));
            case CUSTOM_SEARCH:
            case PHONE_EMAIL_SEARCH:
            case AUTO_MANUAL_CREATE:
                return (_jsx(CcfButton, Object.assign({ variant: 'outlined', primary: true, disableElevation: true, sx: styles.footer.footerButton, onClick: handleCreateButtonClick, disabled: isCreateButtonDisabled() }, { children: _jsx(CcfTypography, { children: "Create" }) })));
            default:
                return null;
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.footer, id: "ccf-enhanced-workflow-execute-editor_footer" }, { children: [_jsx(CcfBox, { children: _jsx(CcfButton, Object.assign({ variant: "outlined", disableElevation: true, sx: Object.assign({}, styles.footer.footerButton), onClick: () => dispatch(CcfEnhancedWorkflowExecuteEditorSlice.thunks.handleCancel({
                                configurationId: data.configurationId,
                                workflowId: data.workflowId,
                            })) }, { children: _jsx(CcfTypography, { children: "Close" }) })) }), _jsxs(CcfBox, { children: [((renderedComponent !== CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen.HOME_SCREEN) &&
                                (renderedComponent !== CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen.SUMMARY_TEST) &&
                                (renderedComponent !== CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen.GENERAL_INFORMATION)) && (_jsx(CcfButton, Object.assign({ variant: 'outlined', disableElevation: true, sx: styles.footer.footerButton, onClick: handlePreviousButtonClick }, { children: _jsx(CcfTypography, { children: "Previous" }) }))), getButton()] })] })), _jsx(ToastContainer, { position: 'bottom-right', style: styles.toaststyle })] }));
};
export default CcfEnhancedWEEditorFooter;
//# sourceMappingURL=ccf-enhanced-workflow-execute-footer.js.map