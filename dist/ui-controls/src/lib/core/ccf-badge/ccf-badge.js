import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from '@mui/material';
import ccfBadgeStyle from './ccf-badge.styles';
/**
 * Badge generates a small badge to the top-right of its child(ren).
 * @param color - To add color to the badge
 * @param label - To define the aria-label
 * @param overlap - Wrapped shape the badge should overlap.
 * @param anchorOrigin - The anchor of the badge.
 * @example <CcfBadge label='example'/>
 */
export const CcfBadge = (_a) => {
    var { label, children, color, sx, badgeStyles } = _a, rest = __rest(_a, ["label", "children", "color", "sx", "badgeStyles"]);
    const badgeStyle = ccfBadgeStyle(Object.assign({ label, children, color, badgeStyles }, rest));
    return _jsx(Badge, Object.assign({ "aria-label": label, color: color, overlap: rest.overlap || 'circular', anchorOrigin: rest.anchorOrigin || {
            vertical: 'top',
            horizontal: 'right',
        } }, rest, { sx: Object.assign(Object.assign({}, badgeStyle.badgeColor), sx) }, { children: children }));
};
//# sourceMappingURL=ccf-badge.js.map