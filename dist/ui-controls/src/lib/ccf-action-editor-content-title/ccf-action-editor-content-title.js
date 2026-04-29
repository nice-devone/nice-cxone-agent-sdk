import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { CcfTypography } from '../core/ccf-typography/ccf-typography';
import CcfActionEditorContentTitleStyles from './ccf-action-editor-content-title-styles';
/**
 * Component for the Action Editor content title
 * @param props - CcfActionEditorContentTitleProps
 * @returns component for Action Editor content title
 * @example <CcfActionEditorContentTitle/>
 */
export function CcfActionEditorContentTitle(props) {
    const styles = CcfActionEditorContentTitleStyles();
    return (_jsxs(Box, Object.assign({ sx: styles.container, id: 'ccf-action-editor-content-title_container' }, { children: [props.step !== undefined && (_jsx(Box, Object.assign({ sx: styles.stepContainer, id: 'ccf-action-editor-content-title_stepContainer' }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.step, id: 'ccf-action-editor-content-title_step' }, { children: props.step })) }))), _jsx(CcfTypography, Object.assign({ sx: styles.title, id: 'ccf-action-editor-content-title_title' }, { children: props.title }))] })));
}
export default CcfActionEditorContentTitle;
//# sourceMappingURL=ccf-action-editor-content-title.js.map