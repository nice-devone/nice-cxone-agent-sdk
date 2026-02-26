import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CssBaseline, ThemeProvider, useTheme, createTheme, Stack, DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions, } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { CcfActionEditorMultiselectDropdown, CcfActionEditorContentTitle, CcfActionEditorSelected, CcfButton, CcfTypography, useTranslator, CcfDivider, DividerOrientation, DividerVariant, CcfGrid, CcfTranslatorProvider, CcfLoader, } from '@nice-devone/ui-controls';
import { getApplicationDirection, getApplicationLanguageTranslations, globalActions, } from '../../global.app.slice';
import { loadDayJSLocale } from '../../../util/dayjs';
import * as CcfStudioActionEditorSlice from '../ccf-studio-action-editor.slice';
import * as CcfWorkflowExecuteEditorSlice from './ccf-workflow-execute-editor.slice';
import CXoneBreezeThemeOptions from './ccf-workflow-execute-editor.theme.config';
import CcfWorkflowExecuteEditorStyles from './ccf-workflow-execute-editor-styles';
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
 * Component displays agent workflow execution application
 * @returns agent workflow execution component
 * @example <CcfWorkflowExecuteEditor />
 */
export function CcfWorkflowExecuteEditor() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const supportedLanguages = ['en-US'];
    const styles = CcfWorkflowExecuteEditorStyles();
    const { setLanguageConfiguration } = globalActions;
    const { setWorkflowMappingGridData, setWorkflowMappingGridMessage, setOpen, setSelection, } = CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    // NOTE : [SELECTIONS] GENERAL
    const appDirection = useSelector(getApplicationDirection);
    // NOTE : [SELECTIONS] CXS
    const data = useSelector(CcfStudioActionEditorSlice.getData);
    // NOTE : [SELECTIONS] WORKFLOW EXECUTE EDITOR
    const configurations = (_a = useSelector(CcfWorkflowExecuteEditorSlice.getConfigurations)) !== null && _a !== void 0 ? _a : {};
    const workflowsByConfigurations = (_b = useSelector(CcfWorkflowExecuteEditorSlice.getWorkflowsByConfigurations)) !== null && _b !== void 0 ? _b : {};
    const selectedConfigurations = (_c = useSelector(CcfWorkflowExecuteEditorSlice.getSelectedConfigurations)) !== null && _c !== void 0 ? _c : {};
    const dynamicDataMappingsByConfigurations = (_d = useSelector(CcfWorkflowExecuteEditorSlice.getDynamicDataMappingsByConfigurations)) !== null && _d !== void 0 ? _d : {};
    const selectedActions = (_e = useSelector(CcfWorkflowExecuteEditorSlice.getSelectedActions)) !== null && _e !== void 0 ? _e : {};
    const workflowMappingGridData = (_f = useSelector(CcfWorkflowExecuteEditorSlice.getWorkflowMappingGridData)) !== null && _f !== void 0 ? _f : {};
    const workflowMappingSelections = (_g = useSelector(CcfWorkflowExecuteEditorSlice.getWorkflowMappingSelections)) !== null && _g !== void 0 ? _g : [];
    const optionsForActionsDropdown = (_h = useSelector(CcfWorkflowExecuteEditorSlice.getActionsForDropdown)) !== null && _h !== void 0 ? _h : {};
    const workflowMappingGridMessage = useSelector(CcfWorkflowExecuteEditorSlice.getWorkflowMappingGridMessage);
    const initializing = useSelector(CcfWorkflowExecuteEditorSlice.getInitializing);
    const open = useSelector(CcfWorkflowExecuteEditorSlice.getOpen);
    const loading = useSelector(CcfWorkflowExecuteEditorSlice.getLoading);
    const selection = useSelector(CcfWorkflowExecuteEditorSlice.getSelection);
    const translationsConfig = useSelector(getApplicationLanguageTranslations);
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
            MuiDivider: {
                styleOverrides: {
                    root: {
                        margin: '20px 0px',
                    },
                },
            },
        } }));
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
    useEffect(() => {
        dispatch(CcfStudioActionEditorSlice.setupCommunicationInterfaceForStudio({
            origin: 'workflow-execute',
            initialize: CcfWorkflowExecuteEditorSlice.thunks.initialize,
        }));
    }, []);
    useEffect(() => {
        dispatch(setWorkflowMappingGridData({
            selectedActions,
            selectedConfigurations,
            workflowsByConfigurations,
            dynamicDataMappingsByConfigurations,
        }));
    }, [
        selectedActions,
        selectedConfigurations,
        workflowsByConfigurations,
        dynamicDataMappingsByConfigurations
    ]);
    useEffect(() => {
        dispatch(setSelection());
    }, [
        workflowMappingSelections,
        workflowMappingGridData
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
        dynamicDataMappingsByConfigurations
    ]);
    return (_jsx(ThemeProvider, Object.assign({ theme: theme }, { children: _jsx(CcfTranslatorProvider, Object.assign({ translations: translationsConfig }, { children: _jsxs(Box, Object.assign({ component: 'main', sx: styles.window, id: 'ccf-workflow-execute-editor_window heightInherit' }, { children: [_jsx(CssBaseline, {}), initializing && (_jsx(Box, Object.assign({ id: 'ccf-workflow-execute-editor_loaderContainer', sx: Object.assign(Object.assign({}, styles.application), styles.loader) }, { children: _jsx(CcfLoader, { showLoadingText: false }) }))), !initializing && (_jsxs(Box, Object.assign({ sx: styles.application, id: 'ccf-workflow-execute-editor_application heightInherit' }, { children: [_jsxs(Box, Object.assign({ sx: styles.body, id: 'ccf-workflow-execute-editor_body' }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.body.title, id: 'ccf-workflow-execute-editor_body_title' }, { children: "Workflow Execute" })), _jsxs(Box, Object.assign({ sx: styles.body.content, id: 'ccf-workflow-execute-editor_body_content' }, { children: [_jsxs(Box, { children: [_jsx(CcfActionEditorContentTitle, { title: "Configuration Name", step: 1 }), _jsx(CcfActionEditorMultiselectDropdown, { handleChange: (configurationId) => dispatch(CcfWorkflowExecuteEditorSlice.thunks.handleChangeInConfigurationDropdown(configurationId)), options: configurations, selected: selectedConfigurations, value: "id", label: "name", singleSelect: true }), _jsx(CcfActionEditorSelected, { title: 'SELECTED', selections: selectedConfigurations, handleDelete: (configuration) => dispatch(CcfWorkflowExecuteEditorSlice.thunks.handleDeleteOfSelectedConfiguration(configuration)), label: "name", titleStyles: ccfActionEditorSelectedTitleStyles })] }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsxs(Box, { children: [_jsx(CcfActionEditorContentTitle, { title: "Actions", step: 2 }), _jsx(CcfActionEditorMultiselectDropdown, { handleChange: (actions) => dispatch(CcfWorkflowExecuteEditorSlice.thunks.handleChangeInActionsDropdown(actions)), options: optionsForActionsDropdown, selected: selectedActions }), _jsx(CcfActionEditorSelected, { title: 'SELECTED', selections: selectedActions, handleDelete: (action) => dispatch(CcfWorkflowExecuteEditorSlice.thunks.setDeleteOfWorkflowExecuteActions(action)), label: "label", titleStyles: ccfActionEditorSelectedTitleStyles })] }), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsxs(Box, Object.assign({ sx: styles.body.content.workflowMappingContainer, id: 'ccf-workflow-execute-editor_body_content_workflowMappingContainer' }, { children: [_jsx(CcfActionEditorContentTitle, { title: "Workflow Mapping", step: 3 }), _jsx(CcfGrid, { isLoading: loading, rowHeight: 40, gridHeight: 400, columns: workflowMappingColumn, rows: workflowMappingGridData, selections: workflowMappingSelections, handleRowSelections: (selections) => {
                                                            dispatch(CcfWorkflowExecuteEditorSlice.thunks.handleWorkflowMappingSelections(selections));
                                                        }, noRowsOverlay: _jsx(Stack, Object.assign({ height: "100%", alignItems: "center", justifyContent: "center" }, { children: workflowMappingGridMessage })) })] }))] }))] })), _jsxs(Box, Object.assign({ sx: styles.footer, id: 'ccf-workflow-execute-editor_footer' }, { children: [_jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.footer.footerButton), styles.footer.buttonForCancel), variant: "outlined", disableElevation: true, onClick: () => dispatch(CcfWorkflowExecuteEditorSlice.thunks.handleCancel({
                                            configurationId: data.configurationId,
                                            workflowId: data.workflowId,
                                        })) }, { children: _jsx(CcfTypography, { children: "Cancel" }) })), _jsx(CcfButton, Object.assign({ sx: styles.footer.footerButton, id: 'ccf-workflow-execute-editor_footer_footerButton', primary: true, variant: "outlined", disableElevation: true, disabled: !(workflowMappingSelections.length > 0), onClick: () => dispatch(setOpen(true)) }, { children: _jsx(CcfTypography, { children: "Next" }) }))] })), _jsxs(Dialog, Object.assign({ open: open, fullWidth: true }, { children: [_jsx(DialogTitle, { children: "Apply the following workflow?" }), _jsx(DialogContent, { children: _jsxs(DialogContentText, { children: ["Workflow: \"", selection === null || selection === void 0 ? void 0 : selection.name, "\""] }) }), _jsxs(DialogActions, { children: [_jsx(CcfButton, Object.assign({ variant: 'contained', onClick: () => dispatch(setOpen(false)) }, { children: "No" })), _jsx(CcfButton, Object.assign({ primary: true, variant: "outlined", onClick: () => dispatch(CcfWorkflowExecuteEditorSlice.thunks.handleApply()) }, { children: "Yes" }))] })] }))] }))), _jsx(ToastContainer, { position: "bottom-right", theme: "colored", closeOnClick: true, pauseOnHover: true })] })) })) })));
}
export default CcfWorkflowExecuteEditor;
//# sourceMappingURL=ccf-workflow-execute-editor.js.map