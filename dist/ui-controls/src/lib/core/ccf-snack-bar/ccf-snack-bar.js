import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Snackbar } from '@mui/material';
/**
 * This is wraaper component for material UI snackbar component/ toast
 * @returns material ui snack bar component
 * @example <CcfSnackBar/>
 */
export function CcfSnackBar(_a) {
    var { children } = _a, other = __rest(_a, ["children"]);
    return (_jsx(Snackbar, Object.assign({}, other, { children: children })));
}
export default CcfSnackBar;
//# sourceMappingURL=ccf-snack-bar.js.map