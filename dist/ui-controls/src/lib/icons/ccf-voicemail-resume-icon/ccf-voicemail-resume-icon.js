import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays call resume svg icon
 * @param props -SvgIconProps
 * @returns call resume svg icon
 * @example - <CcfVoiceMailResumeIcon />
 */
export function CcfVoiceMailResumeIcon(_a) {
    var { fillColor, htmlColor } = _a, props = __rest(_a, ["fillColor", "htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsxs("g", Object.assign({ id: "Resume" }, { children: [_jsx("rect", { x: "0.5", width: "28", height: "28", rx: "4", fill: fillColor }), _jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.white, "fill-rule": "evenodd", "clip-rule": "evenodd", id: "Path_13266", "data-name": "Path 13266", d: "M12.2017 7.36292L4.8611 2.84986C4.32398 2.50925 3.51831 2.93501 3.51831 3.61623V12.5572C3.51831 13.2384 4.32398 13.6642 4.8611 13.2384L12.2017 8.8105C12.8283 8.46989 12.8283 7.61837 12.2017 7.36292Z" })] })) })));
}
export default CcfVoiceMailResumeIcon;
//# sourceMappingURL=ccf-voicemail-resume-icon.js.map