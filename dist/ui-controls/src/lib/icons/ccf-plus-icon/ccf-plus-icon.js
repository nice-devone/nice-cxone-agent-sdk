import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfPlusIcon used to disply plus icon in the contact card channel panel
 * @param props - SvgIconProps
 * @example -- <CcfPlusIcon />
 */
export function CcfPlusIcon(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ fill: props === null || props === void 0 ? void 0 : props.fill }, props, { children: _jsx("g", Object.assign({ id: "ic_Add_Channel", "data-name": "ic_Add Channel", clipPath: "url(#clip-ic_Add_Channel)" }, { children: _jsxs("g", Object.assign({ id: "Group_119869", "data-name": "Group 119869", transform: "translate(-3 -3)", opacity: "0.853" }, { children: [_jsx("rect", { id: "Rectangle_37572", "data-name": "Rectangle 37572", width: "36", height: "36", transform: "translate(-3 -3)", fill: "gray", opacity: "0" }), _jsx("path", { id: "plus", d: "M19.2,10.2h-7v-7h-2v7h-7v2h7v7h2v-7h7Z", transform: "translate(3.8 3.801)", fill: (props === null || props === void 0 ? void 0 : props.fill) ? props.fill : theme.palette.secondary.main })] })) })) })));
}
export default CcfPlusIcon;
//# sourceMappingURL=ccf-plus-icon.js.map