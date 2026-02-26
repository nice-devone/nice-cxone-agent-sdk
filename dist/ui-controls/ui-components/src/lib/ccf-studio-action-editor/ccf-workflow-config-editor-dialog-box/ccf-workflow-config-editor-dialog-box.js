import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getWorkflowMappingGridData, getWorkflowMappingSelections } from '../../ccf-studio-action-editor/ccf-workflow-config-editor/ccf-workflow-config-editor.slice';
import { CcfGrid, CcfTypography } from '@nice-devone/ui-controls';
import CcfWorklfowConfigEditorDialogBoxStyles from './ccf-workflow-config-editor-dialog-box-styles';
const columns = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
    },
    {
        field: 'configuration',
        headerName: 'Configuration',
        flex: 0.35,
    }
];
/**
 * Component displays the Agent Workflow Configuration dialog box
 * @returns The Agent Workflow Configuration dialog component for workflow mapping confirmation
 * @example <CcfWorkflowConfigEditorDialogBox/>
 */
export function CcfWorkflowConfigEditorDialogBox() {
    var _a, _b;
    const workflowMappingSelections = (_a = useSelector(getWorkflowMappingSelections)) !== null && _a !== void 0 ? _a : [];
    const workflowMappingGridData = (_b = useSelector(getWorkflowMappingGridData)) !== null && _b !== void 0 ? _b : [];
    const styles = CcfWorklfowConfigEditorDialogBoxStyles();
    const rows = workflowMappingGridData.filter((data = {}) => workflowMappingSelections.includes(data.id));
    return (_jsxs(Box, Object.assign({ sx: styles.dialog, id: 'ccf-workflow-config-editor_dialog' }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.description, id: 'ccf-workflow-config-editor_dialog_description' }, { children: "Summary of selected workflows." })), _jsx(CcfGrid, { rowHeight: 40, gridHeight: 300, checkboxSelection: false, columns: columns, rows: rows })] })));
}
export default CcfWorkflowConfigEditorDialogBox;
//# sourceMappingURL=ccf-workflow-config-editor-dialog-box.js.map