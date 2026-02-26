import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CssBaseline, ThemeProvider, useTheme, createTheme, Stack } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { CcfActionEditorMultiselectDropdown, CcfActionEditorContentTitle, CcfActionEditorSelected, CcfButton, CcfTypography, useTranslator, CcfDivider, DividerOrientation, DividerVariant, CcfDialogBox, CcfGrid, CcfTranslatorProvider, CcfLoader, } from '@nice-devone/ui-controls';
import * as CcfStudioActionEditorSlice from '../ccf-studio-action-editor.slice';
import * as CcfWorkflowConfigEditorSlice from './ccf-workflow-config-editor.slice';
import { getApplicationDirection, getApplicationLanguageTranslations, globalActions, } from '../../global.app.slice';
import { loadDayJSLocale } from '../../../util/dayjs';
import CcfWorkflowConfigEditorDialogBox from '../ccf-workflow-config-editor-dialog-box/ccf-workflow-config-editor-dialog-box';
import CXoneBreezeThemeOptions from './ccf-workflow-config-editor.theme.config';
import { determineParameterSanitization, decodeParameter, handleApply, handleCancel, sanitize, } from './helpers';
import CcfWorkflowConfigEditorStyles from './ccf-workflow-config-editor-styles';
import 'react-toastify/dist/ReactToastify.css';
const workflowMappingColumn = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
    },
    {
        field: 'configuration',
        headerName: 'Configuration',
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 250,
    },
    {
        field: 'actionLabel',
        headerName: 'Action',
        width: 150,
    }
];
/**
 * Component displays agent workflow configuration application
 * @returns agent workflow configuration component
 * @example <CcfWorkflowConfigEditor />
 */
export function CcfWorkflowConfigEditor() {
    const supportedLanguages = ['en-US'];
    const { setLanguageConfiguration } = globalActions;
    const { setWorkflowMappingGridData, setWorkflowMappingGridMessage, } = CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const [isOpen, setIsOpen] = useState(false);
    const appDirection = useSelector(getApplicationDirection);
    const configurations = useSelector(CcfWorkflowConfigEditorSlice.getConfigurations);
    const configurationByConfigurationId = useSelector(CcfWorkflowConfigEditorSlice.getConfigurationByConfigurationId);
    const workflowsByConfigurations = useSelector(CcfWorkflowConfigEditorSlice.getWorkflowsByConfigurations);
    const dataMappingsByConfigurations = useSelector(CcfWorkflowConfigEditorSlice.getDataMappingsByConfigurations);
    const dynamicDataMappingsByConfigurations = useSelector(CcfWorkflowConfigEditorSlice.getDynamicDataMappingsByConfigurations);
    const selectedConfigurations = useSelector(CcfWorkflowConfigEditorSlice.getSelectedConfigurations);
    const selectedActions = useSelector(CcfWorkflowConfigEditorSlice.getSelectedActions);
    const workflowMappingGridData = useSelector(CcfWorkflowConfigEditorSlice.getWorkflowMappingGridData);
    const workflowMappingSelections = useSelector(CcfWorkflowConfigEditorSlice.getWorkflowMappingSelections);
    const optionsForActionsDropdown = useSelector(CcfWorkflowConfigEditorSlice.getActionsForDropdown);
    const workflowMappingGridMessage = useSelector(CcfWorkflowConfigEditorSlice.getWorkflowMappingGridMessage);
    const initializing = useSelector(CcfWorkflowConfigEditorSlice.getInitializing);
    const translationsConfig = useSelector(getApplicationLanguageTranslations);
    const data = useSelector(CcfStudioActionEditorSlice.getData);
    const isCCFGridLoading = useSelector(CcfWorkflowConfigEditorSlice.getIsCCFGridLoading);
    const theme = createTheme(useTheme(), Object.assign(Object.assign({}, CXoneBreezeThemeOptions), { direction: appDirection, components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
                            display: 'none',
                        },
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        padding: '0px',
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        paddingTop: '0px',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        margin: '20px 0px',
                    },
                },
            },
        } }));
    const styles = CcfWorkflowConfigEditorStyles();
    const ccfActionEditorSelectedTitleStyles = {
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '16px',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'uppercase',
        color: '#526b79',
        marginBottom: '5px',
    };
    /**
     * Function to handle the opening and closing of the dialog box.
     * @example toggleDialogBox()
     */
    const toggleDialogBox = (state) => {
        setIsOpen(state);
    };
    useEffect(() => {
        dispatch(CcfStudioActionEditorSlice.setupCommunicationInterfaceForStudio({
            origin: 'agent-workflow-config',
            initialize: CcfWorkflowConfigEditorSlice.thunks.initializeWorkflowConfigEditor,
        }));
    }, []);
    useEffect(() => {
        dispatch(setWorkflowMappingGridData({
            selectedActions,
            selectedConfigurations,
            workflowsByConfigurations,
            dataMappingsByConfigurations,
            dynamicDataMappingsByConfigurations,
        }));
    }, [
        selectedConfigurations,
        selectedActions,
        workflowsByConfigurations,
        dataMappingsByConfigurations,
        dynamicDataMappingsByConfigurations
    ]);
    useEffect(() => {
        const userPreferredLanguages = window.navigator.languages;
        const supportedPreferredLanguage = userPreferredLanguages.find((language) => supportedLanguages.indexOf(language) !== -1) ||
            'en-US';
        loadDayJSLocale(supportedPreferredLanguage, translate);
        dispatch(setLanguageConfiguration(supportedPreferredLanguage));
    });
    useEffect(() => {
        dispatch(setWorkflowMappingGridMessage({
            configurations,
            selectedConfigurations,
            selectedActions,
            workflowMappingGridData,
        }));
    }, [
        configurations,
        selectedConfigurations,
        selectedActions,
        workflowMappingGridData,
        workflowsByConfigurations,
        dataMappingsByConfigurations
    ]);
    return (_jsx(ThemeProvider, Object.assign({ theme: theme }, { children: _jsx(CcfTranslatorProvider, Object.assign({ translations: translationsConfig }, { children: _jsxs(Box, Object.assign({ component: 'main', sx: styles.window, id: 'ccf-workflow-config-editor_window heightInherit' }, { children: [_jsx(CssBaseline, {}), initializing && (_jsx(Box, Object.assign({ id: 'ccf-workflow-config-editor_loaderContainer', sx: Object.assign(Object.assign({}, styles.application), styles.loader) }, { children: _jsx(CcfLoader, { showLoadingText: false }) }))), !initializing && (_jsxs(Box, Object.assign({ sx: styles.application, id: 'ccf-workflow-config-editor_application heightInherit' }, { children: [_jsxs(Box, Object.assign({ sx: styles.body, id: 'ccf-workflow-config-editor_body' }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.body.title, id: 'ccf-workflow-config-editor_body_title' }, { children: "Custom CRM Configurations" })), _jsxs(Box, Object.assign({ sx: styles.body.content, id: 'ccf-workflow-config-editor_body_content' }, { children: [_jsxs(Box, { children: [_jsx(CcfActionEditorContentTitle, { title: "Custom CRM Configurations", step: 1 }), _jsx(CcfActionEditorMultiselectDropdown, { handleChange: (configID) => dispatch(CcfWorkflowConfigEditorSlice.thunks.handleChangeInConfigurationDropdown(configID)), options: configurations, selected: selectedConfigurations, value: "id", label: "name", singleSelect: true }), _jsx(CcfActionEditorSelected, { title: 'SELECTED', selections: selectedConfigurations, handleDelete: (configuration) => dispatch(CcfWorkflowConfigEditorSlice.thunks.handleDeleteOfSelectedConfiguration(configuration)), label: "name", titleStyles: ccfActionEditorSelectedTitleStyles })] }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsxs(Box, { children: [_jsx(CcfActionEditorContentTitle, { title: "Actions", step: 2 }), _jsx(CcfActionEditorMultiselectDropdown, { handleChange: (actions) => dispatch(CcfWorkflowConfigEditorSlice.thunks.handleChangeInActionsDropdown(actions)), options: optionsForActionsDropdown, selected: selectedActions }), _jsx(CcfActionEditorSelected, { title: 'SELECTED', selections: selectedActions, handleDelete: (action) => { dispatch(CcfWorkflowConfigEditorSlice.thunks.handleDeleteOfSelectedAction(action)); }, label: "label", titleStyles: ccfActionEditorSelectedTitleStyles })] }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsxs(Box, Object.assign({ sx: styles.body.content.workflowMappingContainer, id: 'ccf-workflow-config-editor_body_content_workflowMappingContainer' }, { children: [_jsx(CcfActionEditorContentTitle, { title: "Workflow Mapping", step: 3 }), _jsx(CcfGrid, { isLoading: isCCFGridLoading, rowHeight: 40, gridHeight: 400, columns: workflowMappingColumn, rows: workflowMappingGridData, selections: workflowMappingSelections, handleRowSelections: (newWorkflowMappingSelections) => {
                                                            dispatch(CcfWorkflowConfigEditorSlice.thunks.handleWorkflowMappingSelections({
                                                                isCCFGridLoading,
                                                                newWorkflowMappingSelections,
                                                                workflowMappingSelections,
                                                                workflowMappingGridData,
                                                            }));
                                                        }, noRowsOverlay: _jsx(Stack, Object.assign({ height: "100%", alignItems: "center", justifyContent: "center" }, { children: workflowMappingGridMessage })) })] }))] }))] })), _jsxs(Box, Object.assign({ sx: styles.footer, id: 'ccf-workflow-config-editor_footer' }, { children: [_jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.footer.buttonForCancel), styles.footer.footerButton), primary: false, variant: "outlined", disableElevation: true, onClick: () => handleCancel(data, configurationByConfigurationId, workflowsByConfigurations, dataMappingsByConfigurations, isCCFGridLoading, sanitize, decodeParameter, determineParameterSanitization) }, { children: _jsx(CcfTypography, { children: "Cancel" }) })), _jsx(CcfButton, Object.assign({ sx: styles.footer.footerButton, id: 'ccf-workflow-config-editor_footer_footerButton', primary: true, variant: "outlined", disableElevation: true, onClick: () => toggleDialogBox(true) }, { children: _jsx(CcfTypography, { children: "Next" }) }))] })), _jsx(CcfDialogBox, { isOpen: isOpen, handleOnClickOfHeaderCloseButton: () => toggleDialogBox(false), title: 'Custom CRM Configurations Updated', primaryButtonText: 'Save', primaryButtonProps: {
                                    variant: 'contained',
                                    onClick: () => handleApply(workflowMappingGridData, workflowMappingSelections),
                                }, secondaryButtonText: 'Preview', secondaryButtonProps: {
                                    variant: 'outlined',
                                    onClick: () => toggleDialogBox(false),
                                }, component: _jsx(CcfWorkflowConfigEditorDialogBox, {}), dividers: false })] }))), _jsx(ToastContainer, { position: "bottom-right", theme: "colored", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: true })] })) })) })));
}
export default CcfWorkflowConfigEditor;
//# sourceMappingURL=ccf-workflow-config-editor.js.map