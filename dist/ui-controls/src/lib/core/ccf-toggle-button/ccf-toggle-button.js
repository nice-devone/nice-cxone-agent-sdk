import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ToggleButton } from '@mui/material';
/**
 * Component to display Toggle Button
 * @param props - ToggleButtonProps
 * @example <CcfToggleButton />
 * @returns
 */
export const CcfToggleButton = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return (_jsx(ToggleButton, Object.assign({ "data-testid": 'toggle-buttons' }, rest, { children: children })));
};
export default CcfToggleButton;
//# sourceMappingURL=ccf-toggle-button.js.map