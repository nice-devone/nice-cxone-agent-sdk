import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Button, useTheme } from '@mui/material';
import '../style/Ccf.Palette.Module';
import ccfButtonStyle from './ccf-button.styles';
/**
 * Component used to display Button
 * @param param0 - CcfButtonProps
 * @example <CcfButton />
 * @returns  Button
 */
export function CcfButton(_a) {
    var { children, primary, isFocused = false, sx } = _a, rest = __rest(_a, ["children", "primary", "isFocused", "sx"]);
    const ButtonRef = useRef(null);
    const theme = useTheme();
    // UseEffect to focus the button once it gets rendered
    useEffect(() => {
        var _a;
        if (isFocused) {
            (_a = ButtonRef === null || ButtonRef === void 0 ? void 0 : ButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, []);
    const buttonStyle = ccfButtonStyle(theme, primary);
    return (_jsx(Button, Object.assign({ ref: ButtonRef, sx: Object.assign(Object.assign({}, buttonStyle.root), sx) }, rest, { children: children })));
}
export default CcfButton;
//# sourceMappingURL=ccf-button.js.map