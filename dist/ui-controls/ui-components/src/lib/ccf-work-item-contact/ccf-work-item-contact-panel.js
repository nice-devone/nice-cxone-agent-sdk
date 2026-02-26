import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfWorkItemControls } from './ccf-work-item-controls/ccf-work-item-controls';
import { Card, Stack, Typography, useTheme } from '@mui/material';
import { CcfWorkItemIcon } from '@nice-devone/ui-controls';
import contactControlStyles from '../../styles/ccf-contact-control.style';
/**
 *
 * @param props - CcfWorkItemContactPanelProps
 * @returns - WorkItem contact panel with controls
 * @example - <CcfWorkItemContactPanel />
 */
export const CcfWorkItemContactPanel = (props) => {
    var _a;
    const theme = useTheme();
    const styles = contactControlStyles(theme);
    return (_jsx(Card, Object.assign({ sx: Object.assign({}, styles.controlPanel) }, { children: _jsxs(Stack, Object.assign({ "data-testid": 'work-item-contact-panel', flexWrap: 'wrap', justifyContent: { xs: 'space-between' }, direction: { xs: 'row' }, paddingX: '10px', sx: { backgroundColor: theme.palette.background.paper } }, { children: [_jsxs(Stack, Object.assign({ display: { xl: 'none' }, alignItems: 'center', paddingTop: '5px', direction: 'row', spacing: 1 }, { children: [_jsx(CcfWorkItemIcon, { "data-testid": "work-item-icon", sx: { color: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.primary.main }, viewBox: "0 0 25 24" }), _jsx(Typography, Object.assign({ fontWeight: theme.typography.fontWeightBold }, { children: props.workItemContact.skillName }))] })), _jsx(Stack, Object.assign({ alignItems: "center", justifyContent: 'center', width: { xl: '100%' } }, { children: _jsx(CcfWorkItemControls, { workItemContact: props.workItemContact, contactId: props.contactId }) }))] })) })));
};
//# sourceMappingURL=ccf-work-item-contact-panel.js.map