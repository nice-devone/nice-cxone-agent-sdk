import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Card } from '@mui/material';
/**
 * Functional component is a wrapper for material UI card component
 * @returns material UI card element
 * @example <CcfCard/>
 */
export function CcfCard(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(Card, Object.assign({ "aria-label": "Card" }, other, { children: children })));
}
export default CcfCard;
//# sourceMappingURL=ccf-card.js.map