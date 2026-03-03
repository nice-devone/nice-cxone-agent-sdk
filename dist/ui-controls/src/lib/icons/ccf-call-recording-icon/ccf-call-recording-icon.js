import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays call record  svg icon
 * @param props -SvgIconProps
 * @returns call record svg icon
 * @example - <CcfCallRecordingIcon/>
 */
export function CcfCallRecordingIcon(_a) {
    var { htmlColor, sx } = _a, props = __rest(_a, ["htmlColor", "sx"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 29 28", sx: sx }, props, { children: _jsxs("g", Object.assign({ id: "Button/Record/plain" }, { children: [_jsx("rect", { x: "0.5", width: "29", height: "28", rx: "4", fill: theme.palette.background.callControls }), _jsxs("g", Object.assign({ id: "Record" }, { children: [_jsx("g", Object.assign({ id: "Ellipse 4692" }, { children: _jsx("path", { id: "Vector", d: "M14.5002 22.1C18.9737 22.1 22.6002 18.4735 22.6002 14C22.6002 9.52649 18.9737 5.9 14.5002 5.9C10.0267 5.9 6.40021 9.52649 6.40021 14C6.40021 18.4735 10.0267 22.1 14.5002 22.1Z", stroke: 'white', "stroke-width": '2' }) })), _jsx("path", { id: "Ellipse 4693", d: "M14.5 19C17.2614 19 19.5 16.7614 19.5 14C19.5 11.2386 17.2614 9 14.5 9C11.7386 9 9.5 11.2386 9.5 14C9.5 16.7614 11.7386 19 14.5 19Z", fill: 'white' })] }))] })) })));
}
export default CcfCallRecordingIcon;
//# sourceMappingURL=ccf-call-recording-icon.js.map