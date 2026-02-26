import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfMinusIcon used to disply plus icon in the contact card channel panel
 * @param props - SvgIconProps
 * @example -- <CcfMinusIcon />
 */
export function CcfMinusIcon(props) {
    const theme = useTheme();
    return (_jsxs(SvgIcon, Object.assign({ fill: props === null || props === void 0 ? void 0 : props.fill }, props, { children: [_jsx("rect", { id: "Rectangle_37572", "data-name": "Rectangle 37572", width: "36", height: "36", transform: "translate(-3 -3)", fill: "gray", opacity: "0" }), _jsx("path", { id: "minus", d: "M0 0.0944824H18.1648V2.44958H0V0.0944824Z", transform: "translate(3.8 3.801)", fill: (props === null || props === void 0 ? void 0 : props.fill) ? props.fill : theme.palette.secondary.main })] })));
}
export default CcfMinusIcon;
//# sourceMappingURL=ccf-minus-icon.js.map