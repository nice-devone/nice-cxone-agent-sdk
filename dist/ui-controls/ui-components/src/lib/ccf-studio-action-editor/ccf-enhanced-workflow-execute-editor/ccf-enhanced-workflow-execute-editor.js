import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, useTheme, createTheme, Grid, AppBar } from '@mui/material';
import { CcfButton, CcfTypography, useTranslator, CcfTranslatorProvider, CcfBox, CcfLoader } from '@nice-devone/ui-controls';
import * as CcfStudioActionEditorSlice from '../ccf-studio-action-editor.slice';
import { getApplicationDirection, getApplicationLanguageTranslations, globalActions } from '../../global.app.slice';
import { loadDayJSLocale } from '../../../util/dayjs';
import CcfListofEnhancedWEConfig from './Enhanced-workflow-Components/ccf-config-list/ccf-enhanced-workflow-exec-config-list';
import * as CcfEnhancedWorkflowExecuteEditorSlice from './ccf-enhanced-workflow-execute-editor.slice';
import CcfEnhancedWorkflowExecuteEditorStyles from './ccf-enhanced-workflow-execute-editor-styles';
import 'react-toastify/dist/ReactToastify.css';
import CcfEnhancedWEEditorFooter from './ccf-enhanced-workflow-execute-footer';
import CcfEnhancedWEGeneralInformation from './Enhanced-workflow-Components/ccf-general-information/ccf-enhanced-workflow-exec-general-info';
import CcfEnhancedWEPhoneEmailSearch from './Enhanced-workflow-Components/ccf-phone-email-search/ccf-enhanced-workflow-exec-phone-email-search';
import CcfEnhancedWECustomSearchFilter from './Enhanced-workflow-Components/ccf-custom-search/ccf-enhanced-workflow-exec-custom-search-filter';
import CcfEnhancedWECustomSearch from './Enhanced-workflow-Components/ccf-custom-search/ccf-enhanced-workflow-exec-custom-search';
import { initialnewEWEConfigurationCreated } from './ccf-enhanced-workflow-execute-editor.slice';
import { enhancedWEThemeOptions } from './ccf-enhanced-workflow-execute-editor.theme.config';
import CcfEnhancedWEAutoCreateFilter from './Enhanced-workflow-Components/ccf-auto-manual-create/ccf-enhanced-workflow-exec-automatic-create-filter';
import CcfEnhancedWEAutoManualCreate from './Enhanced-workflow-Components/ccf-auto-manual-create/ccf-enhanced-workflow-exec-auto-manual-create';
import CcfEnhancedWEManualFilter from './Enhanced-workflow-Components/ccf-auto-manual-create/ccf-enhanced-workflow-exec-manual-create-filter';
import CcfEnhancedSummaryTest from './Enhanced-workflow-Components/ccf-summary-test/ccf-enhanced-workflow-exec-summary-test';
/**
 * Component displays agent advance workflow execution application
 * @returns agent advance workflow execution component
 * @example <CcfEnhancedWorkflowExecuteEditor />
 */
export function CcfEnhancedWorkflowExecuteEditor() {
    var _a, _b, _c, _d, _e, _f;
    const supportedLanguages = ['en-US'];
    const { setLanguageConfiguration } = globalActions;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { HOME_SCREEN, GENERAL_INFORMATION, CUSTOM_SEARCH_FILTER, PHONE_EMAIL_SEARCH, CUSTOM_SEARCH, SUMMARY_TEST, AUTOMATIC_CREATE_FILTER, AUTO_MANUAL_CREATE, MANUAL_CREATE_FILTER, } = CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen;
    const appDirection = useSelector(getApplicationDirection);
    const componentToRender = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getCurrentComponentRendered)) !== null && _a !== void 0 ? _a : '';
    const applicationAWEConfigdata = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getapplicationEWEConfiguration)) !== null && _b !== void 0 ? _b : {};
    const initializing = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getInitializing)) !== null && _c !== void 0 ? _c : true;
    const loading = (_d = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getLoadingstate)) !== null && _d !== void 0 ? _d : true;
    const translationsConfig = useSelector(getApplicationLanguageTranslations);
    const theme = createTheme(useTheme(), Object.assign(Object.assign({}, enhancedWEThemeOptions), { direction: appDirection, components: {
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
    const styles = CcfEnhancedWorkflowExecuteEditorStyles(theme, componentToRender);
    useEffect(() => {
        dispatch(CcfStudioActionEditorSlice.setupCommunicationInterfaceForStudio({
            origin: 'enhanced-workflow-execute',
            initialize: CcfEnhancedWorkflowExecuteEditorSlice.thunks.initialize,
        }));
    }, []);
    useEffect(() => {
        const userPreferredLanguages = window.navigator.languages;
        const supportedPreferredLanguage = userPreferredLanguages.find((language) => supportedLanguages.indexOf(language) !== -1) || 'en-US';
        loadDayJSLocale(supportedPreferredLanguage, translate);
        dispatch(setLanguageConfiguration(supportedPreferredLanguage));
    });
    useEffect(() => {
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(HOME_SCREEN));
    }, []);
    /**
    * Handle showing configuration selection screen on right side of panel
    * @example handleAddWorkflowClick()
    */
    const handleAddWorkflowClick = () => {
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(initialnewEWEConfigurationCreated));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(0));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(GENERAL_INFORMATION));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setDynamicDataMappings({ dynamicDataMappings: [] }));
        const initialWorkflow = {};
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setWorkflows(initialWorkflow));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setselectedEWEConfigIndex(-1));
    };
    /**
    * Handle which component to show next on right side of panel
    * @example getComponentToRender()
    */
    const getComponentToRender = () => {
        var _a;
        switch (componentToRender) {
            case GENERAL_INFORMATION:
                return _jsx(CcfEnhancedWEGeneralInformation, {});
            case PHONE_EMAIL_SEARCH:
                return _jsx(CcfEnhancedWEPhoneEmailSearch, {});
            case CUSTOM_SEARCH_FILTER:
                return _jsx(CcfEnhancedWECustomSearchFilter, {});
            case CUSTOM_SEARCH:
                return _jsx(CcfEnhancedWECustomSearch, {});
            case SUMMARY_TEST:
                return _jsx(CcfEnhancedSummaryTest, {});
            case AUTOMATIC_CREATE_FILTER:
                return _jsx(CcfEnhancedWEAutoCreateFilter, {});
            case AUTO_MANUAL_CREATE:
                return _jsx(CcfEnhancedWEAutoManualCreate, {});
            case MANUAL_CREATE_FILTER:
                return _jsx(CcfEnhancedWEManualFilter, {});
            default:
                return ((_a = applicationAWEConfigdata === null || applicationAWEConfigdata === void 0 ? void 0 : applicationAWEConfigdata.configs) === null || _a === void 0 ? void 0 : _a.length) < 1 ? (_jsx("div", Object.assign({ style: styles.rightTextStyle }, { children: "No Workflows Configured" }))) : null;
        }
    };
    return (_jsx(ThemeProvider, Object.assign({ theme: theme }, { children: _jsx(CcfTranslatorProvider, Object.assign({ translations: translationsConfig }, { children: _jsxs(CcfBox, Object.assign({ component: "main", sx: styles.screen, id: "ccf-advance-workflow-execute-editor_screen heightInherit" }, { children: [_jsx(CssBaseline, {}), initializing && loading && (_jsx(CcfBox, Object.assign({ id: 'ccf-workflow-execute-editor_loaderContainer', sx: Object.assign(Object.assign({}, styles.application), styles.loader) }, { children: _jsx(CcfLoader, { showLoadingText: false }) }))), !initializing && !loading && (_jsx(CcfBox, Object.assign({ sx: styles.application, id: 'ccf-advance-workflow-execute-editor_application heightInherit' }, { children: _jsxs(CcfBox, Object.assign({ sx: styles.body, id: "ccf-advance-workflow-execute-editor_body" }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.body.title, id: "ccf-advance-workflow-execute-editor_body_title" }, { children: "Workflow Execute" })), _jsx(CcfBox, Object.assign({ sx: styles.body.content, id: "ccf-advance-workflow-execute-editor_body_content" }, { children: _jsxs(Grid, Object.assign({ container: true, sx: styles.gridContainer, wrap: "nowrap" }, { children: [_jsxs(Grid, Object.assign({ item: true, sx: Object.assign(Object.assign({}, styles.gridContainer.gridItem), styles.gridContainer.gridItemWidth) }, { children: [_jsx(AppBar, Object.assign({ position: "static", sx: styles.appBar }, { children: _jsx(CcfButton, Object.assign({ variant: "contained", color: "primary", sx: styles.gridContainer.addButton, onClick: handleAddWorkflowClick, disabled: ((_e = applicationAWEConfigdata.configs) === null || _e === void 0 ? void 0 : _e.length) === 1 }, { children: _jsx(CcfTypography, Object.assign({ noWrap: true, sx: styles.typoStyle }, { children: "Add Workflow Configuration" })) })) })), _jsx(CcfBox, Object.assign({ sx: styles.gridContainer.leftBox }, { children: ((_f = applicationAWEConfigdata.configs) === null || _f === void 0 ? void 0 : _f.length) ? _jsx(CcfListofEnhancedWEConfig, { workflowconfigdata: applicationAWEConfigdata.configs }) : _jsx("div", Object.assign({ style: styles.leftbox }, { children: _jsx("div", Object.assign({ style: styles.leftTextStyle }, { children: "No Workflow Configuration Found" })) })) }))] })), _jsx(Grid, Object.assign({ item: true, sx: styles.gridContainer.gridItem, xs: true }, { children: _jsx(CcfBox, Object.assign({ sx: styles.gridContainer.rightBox }, { children: getComponentToRender() })) }))] })) })), _jsx(CcfEnhancedWEEditorFooter, {})] })) })))] })) })) })));
}
export default CcfEnhancedWorkflowExecuteEditor;
//# sourceMappingURL=ccf-enhanced-workflow-execute-editor.js.map