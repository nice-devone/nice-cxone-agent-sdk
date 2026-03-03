import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@mui/material';
/**
 * Used to show ration counter with count text and reaction icons passed
 * @returns
 * @example -
 * ```
 * <CcfReactionCounter count={12} iconList=[<icon />]/>
 * ```
 */
export const CcfReactionCounter = (props) => {
    var _a;
    return (_jsxs(Grid, Object.assign({ container: true, spacing: .5 }, { children: [props.iconList ? _jsx(Grid, Object.assign({ item: true }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 0 }, { children: (_a = props === null || props === void 0 ? void 0 : props.iconList) === null || _a === void 0 ? void 0 : _a.map((icon, index) => _jsx(Grid, Object.assign({ item: true }, { children: icon }), index)) })) })) : null, _jsx(Grid, Object.assign({ item: true }, { children: props.count ?
                    _jsxs(Grid, Object.assign({ item: true, container: true, direction: "row", spacing: 0 }, { children: [_jsx(Grid, Object.assign({ item: true, sx: props.counterStyles }, { children: props.count })), _jsx(Grid, Object.assign({ item: true, sx: props.counterStyles }, { children: props.text }))] })) : _jsx(Grid, Object.assign({ item: true, sx: props.counterStyles }, { children: props.count })) }))] })));
};
//# sourceMappingURL=ccf-reaction-counter.js.map