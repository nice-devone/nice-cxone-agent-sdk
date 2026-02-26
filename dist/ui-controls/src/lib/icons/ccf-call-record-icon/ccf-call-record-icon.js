import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * @example styles for CcfCallRecordIcon component
 */
const CcfCallRecordIconStyle = (theme) => {
    var _a, _b;
    const styles = {
        root: {
            fill: 'white',
            '& #recordEllipse4739': {
                stroke: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.main,
            },
        },
    };
    return styles;
};
/**
 * Component displays call record  svg icon
 * @param props -SvgIconProps
 * @returns call record svg icon
 * @example - <CcfCallRecordIcon/>
 */
export function CcfCallRecordIcon(_a) {
    var { htmlColor, sx } = _a, props = __rest(_a, ["htmlColor", "sx"]);
    const theme = useTheme();
    const callRecordIconStyle = CcfCallRecordIconStyle(theme);
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 25 24", sx: Object.assign(Object.assign({}, callRecordIconStyle.root), sx) }, props, { children: _jsxs("g", Object.assign({ id: "Record" }, { children: [_jsx("path", { d: "M12.5001 20.1C16.9737 20.1 20.6001 16.4735 20.6001 12C20.6001 7.52649 16.9737 3.9 12.5001 3.9C8.02664 3.9 4.40015 7.52649 4.40015 12C4.40015 16.4735 8.02664 20.1 12.5001 20.1Z", stroke: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText, "stroke-width": "2" }), _jsx("path", { d: "M12.5 17C15.2614 17 17.5 14.7614 17.5 12C17.5 9.23858 15.2614 7 12.5 7C9.73858 7 7.5 9.23858 7.5 12C7.5 14.7614 9.73858 17 12.5 17Z", fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText })] })) })));
}
export default CcfCallRecordIcon;
//# sourceMappingURL=ccf-call-record-icon.js.map