import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfScreenPopIcon used to display Screen pop icon in the app space panel
 * @param props - None
 * @example -- <CcfScreenPopIcon />
 * @returns - SVG of screen pop icon
 */
export function CcfScreenPopIcon({ htmlColor }) {
    const theme = useTheme();
    const defaultStrokeColor = theme.palette.secondary.main;
    return (_jsxs(SvgIcon, Object.assign({ width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("g", Object.assign({ clipPath: "url(#clip0_15_4943)" }, { children: _jsx("path", { d: "M8.19239 12.435L13.1421 7.48527M8.19239 12.435L6.07107 10.3137V8.89948L9.6066 \r\n\t\t\t\t\t5.36395H11.0208L13.1421 7.48527M8.19239 12.435L12.435 16.6777M21.6274 25.87L27.9914 27.2843L26.5772 \r\n\t\t\t\t\t20.9203M21.6274 25.87L26.5772 20.9203M21.6274 25.87L17.3848 21.6274M26.5772 20.9203L13.1421 \r\n\t\t\t\t\t7.48527M23.0416 15.9706L25.163 13.8492M18.0919 11.0208L23.0416 6.07106L27.9914 11.0208L25.163 \r\n\t\t\t\t\t13.8492M23.0416 11.7279L25.163 13.8492M12.435 22.3345L13.8492 23.7487M17.3848 21.6274L11.0208 \r\n\t\t\t\t\t27.9914L6.07107 23.0416L12.435 16.6777M17.3848 21.6274L12.435 16.6777", stroke: htmlColor || defaultStrokeColor, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })), _jsx("defs", { children: _jsx("clipPath", Object.assign({ id: "clip0_15_4943" }, { children: _jsx("rect", { width: "32", height: "32", fill: "white" }) })) })] })));
}
export default CcfScreenPopIcon;
//# sourceMappingURL=ccf-screen-pop-icon.js.map