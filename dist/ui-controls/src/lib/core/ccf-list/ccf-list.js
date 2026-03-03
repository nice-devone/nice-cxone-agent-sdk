import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Collapse, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, ListItemButton } from '@mui/material';
/**
 * Component displays List like ul
 * @param props -ListProps
 * @example <CcfList/>
 */
export function CcfList(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(List, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItem like li
 * @param props -CcfListItemProps
 * @example <CcfListItem/>
 */
export function CcfListItem(_a) {
    var { children, button } = _a, other = __rest(_a, ["children", "button"]);
    const componentName = button ? 'div' : 'li';
    return (_jsx(ListItem, Object.assign({ component: componentName }, other, { children: children })));
}
/**
 * Component displays List item icon
 * @param props -ListItemIconProps
 * @example <CcfListItemIcon/>
 */
export function CcfListItemIcon(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(ListItemIcon, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItemSecondaryAction
 * @param props -ListItemSecondaryActionProps
 * @example <CcfListItemSecondaryAction/>
 */
export function CcfListItemSecondaryAction(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(ListItemSecondaryAction, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItemText
 * @example <CcfListItemText />
 */
export function CcfListItemText(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(ListItemText, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItemText
 * @param props -ListSubheaderProps
 * @example <CcfListItemText />
 */
export function CcfListSubheader(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(ListSubheader, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItemText
 * @param props -CollapseProps
 * @example <CcfListItemText />
 */
export function CcfCollapse(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(Collapse, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItemText
 * @param props -CcfListItemTextProps
 * @example <CcfListItemText />
 */
export function CcfListItemAvatar(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(ListItemAvatar, Object.assign({}, other, { children: children })));
}
/**
 * Component displays ListItemButton
 * @param props - CcfListItemButton
 * @example <CcfListItemButton />
 */
export function CcfListItemButton(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(ListItemButton, Object.assign({}, other, { children: children })));
}
//# sourceMappingURL=ccf-list.js.map