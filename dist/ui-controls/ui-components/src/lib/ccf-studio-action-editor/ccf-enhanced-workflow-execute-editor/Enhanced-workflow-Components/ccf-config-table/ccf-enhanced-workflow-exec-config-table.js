import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, useTheme, } from '@mui/material';
import { CcfTypography, CcfBox, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import CcfEnhancedWEConfigurationTableStyles from './ccf-enhanced-workflow-exec-config-table.styles';
import { WorkflowType, WorkflowSubType } from '../../helpers/enhanced-workflow-models';
export var workflowActionenum;
(function (workflowActionenum) {
    workflowActionenum["SEARCH"] = "search";
    workflowActionenum["CREATE"] = "create";
})(workflowActionenum || (workflowActionenum = {}));
export var workflowActionTypeEnum;
(function (workflowActionTypeEnum) {
    workflowActionTypeEnum["SEARCH"] = "Search";
    workflowActionTypeEnum["DYNAMICSEARCH"] = "Dynamic Search";
    workflowActionTypeEnum["CREATE"] = "Create";
})(workflowActionTypeEnum || (workflowActionTypeEnum = {}));
/**
 * Component displays agent workflow execution application Specific search workflow Information screen.
 *
 * This component renders a configuration table for the agent workflow execution application.
 *
 * @returns JSX.Element A component displaying configuration table .
 * @example
 *   <CcfEnhancedWEConfigurationTable />
 */
const CcfEnhancedWEConfigurationTable = () => {
    var _a, _b, _c;
    const theme = useTheme();
    const styles = CcfEnhancedWEConfigurationTableStyles(theme);
    const dispatch = useDispatch();
    const workflows = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getWorkflows)) !== null && _a !== void 0 ? _a : {};
    const dynamicSearchData = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getDynamicDataMappings)) !== null && _b !== void 0 ? _b : {};
    const selectedEnhancedWorkflowConfig = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _c !== void 0 ? _c : {};
    /**
   * Function to handle checkbox selection
   * @param workflowId - workflow id
   * @example - handleCheckboxChange(workflowId)
   */
    const handleCheckboxChange = (selectedWorkflowId, workflowAction) => {
        const searchWorkflows = workflows.filter((workflow) => { var _a, _b; return ((_b = (_a = workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(workflowActionenum.SEARCH)) && workflow.workflowId; });
        const isAlreadySelected = (workflowAction === workflowActionTypeEnum.DYNAMICSEARCH && selectedEnhancedWorkflowConfig.dynamicDataMappingId === selectedWorkflowId) ||
            (workflowAction === workflowActionTypeEnum.SEARCH && selectedEnhancedWorkflowConfig.workflowId === selectedWorkflowId && !dynamicDataMappingId);
        if (isAlreadySelected) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { workflowId: '', dynamicDataMappingId: '' })));
            return;
        }
        switch (workflowAction) {
            case workflowActionTypeEnum.DYNAMICSEARCH:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { dynamicDataMappingId: selectedWorkflowId, workflowId: searchWorkflows[0].workflowId, workflowType: WorkflowType.DynamicData })));
                break;
            case workflowActionTypeEnum.SEARCH:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { workflowId: selectedWorkflowId, dynamicDataMappingId: '', workflowType: WorkflowType.Search })));
                break;
            case workflowActionTypeEnum.CREATE:
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { workflowId: selectedWorkflowId, dynamicDataMappingId: '', workflowType: WorkflowType.Create })));
                break;
            default:
                break;
        }
        return null;
    };
    const { crmName, name, workflowId: workflowIdStore, dynamicDataMappingId, workflowType, workflowSubtype } = selectedEnhancedWorkflowConfig;
    return (_jsxs(_Fragment, { children: [_jsx(CcfBox, Object.assign({ sx: styles.containerHeading }, { children: "WORKFLOW MAPPING" })), _jsx(CcfBox, Object.assign({ sx: styles.tableSection }, { children: _jsx(Box, Object.assign({ sx: styles.tableWrapper }, { children: _jsx(TableContainer, Object.assign({ component: Paper, sx: styles.tableContainer }, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, Object.assign({ sx: styles.tableHeadHeight }, { children: [_jsx(TableCell, { padding: "checkbox", sx: Object.assign(Object.assign({}, styles.tableCellHeading), { minWidth: '0.9rem', padding: '0.5rem' }) }), _jsx(TableCell, Object.assign({ sx: styles.tableCellHeading }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowHeading }, { children: "NAME" })) })), _jsx(TableCell, Object.assign({ sx: styles.tableCellHeading }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowHeading }, { children: "CONFIGURATION" })) })), _jsx(TableCell, Object.assign({ sx: styles.tableCellHeading }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowHeading }, { children: "TYPE" })) })), _jsx(TableCell, Object.assign({ sx: styles.tableCellHeading }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowHeading }, { children: "ACTION" })) }))] })) }), _jsxs(TableBody, { children: [(workflows === null || workflows === void 0 ? void 0 : workflows.length) > 0 && workflows.filter((workflow) => {
                                            var _a;
                                            if (!(workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction))
                                                return false;
                                            if (workflowSubtype.toLowerCase().includes('search')) {
                                                if (workflowSubtype === WorkflowSubType.CustomSearch) {
                                                    return false;
                                                }
                                                return workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction.toLowerCase().includes('search');
                                            }
                                            if (workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction.toLowerCase().includes(workflowType.toLowerCase())) {
                                                if (workflowType === WorkflowType.Create && !((_a = workflow.workflowName) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith('create custom record'))) {
                                                    return false;
                                                }
                                                return true;
                                            }
                                            ;
                                            return false;
                                        }).map((workflow) => (_jsxs(TableRow, Object.assign({ sx: styles.tableBodyHeight }, { children: [_jsx(TableCell, Object.assign({ padding: "checkbox", sx: { background: workflow.workflowId === workflowIdStore && !dynamicDataMappingId ? theme.palette.background.noteInput : '', minWidth: '0.9rem', padding: '0.5rem' } }, { children: _jsx(Checkbox, { sx: styles.checkBox, checked: workflow.workflowId === workflowIdStore && !dynamicDataMappingId, onChange: () => handleCheckboxChange(workflow.workflowId, (workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction) ? workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction : '') }) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.workflowId === workflowIdStore && !dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: workflow.workflowName })) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.workflowId === workflowIdStore && !dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: name })) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.workflowId === workflowIdStore && !dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: crmName })) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.workflowId === workflowIdStore && !dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: workflow.workflowAction })) }))] }), workflow.workflowId))), (workflowType === WorkflowType.Search || workflowType === WorkflowType.DynamicData) && (dynamicSearchData === null || dynamicSearchData === void 0 ? void 0 : dynamicSearchData.length) > 0 && (dynamicSearchData === null || dynamicSearchData === void 0 ? void 0 : dynamicSearchData.map((workflow) => (_jsxs(TableRow, Object.assign({ sx: styles.tableBodyHeight }, { children: [_jsx(TableCell, Object.assign({ padding: "checkbox", sx: { background: workflow.id === dynamicDataMappingId ? theme.palette.background.noteInput : '', minWidth: '0.9rem', padding: '0.5rem' } }, { children: _jsx(Checkbox, { sx: styles.checkBox, checked: workflow.id === dynamicDataMappingId, onChange: () => handleCheckboxChange(workflow.id, workflowActionTypeEnum.DYNAMICSEARCH) }) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.id === dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: workflow === null || workflow === void 0 ? void 0 : workflow.name })) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.id === dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: name })) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.id === dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: crmName })) })), _jsx(TableCell, Object.assign({ sx: Object.assign(Object.assign({}, styles.tableCellData), { background: workflow.id === dynamicDataMappingId ? theme.palette.background.noteInput : '' }) }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.rowData }, { children: "Dynamic Search" })) }))] }), workflow.id))))] })] }) })) })) }))] }));
};
export default CcfEnhancedWEConfigurationTable;
//# sourceMappingURL=ccf-enhanced-workflow-exec-config-table.js.map