import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * @example styles for CcfCallCommitIcon component
 */
const CcfCallCommitIconStyle = (theme) => {
    var _a, _b;
    const styles = {
        root: {
            '& #commitPlus': {
                stroke: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.main,
            },
        },
    };
    return styles;
};
/**
 * Component displays call  commit  svg icon
 * @param props -SvgIconProps
 * @returns commit svg icon
 * @example - <CcfCallCommitIcon/>
 */
export function CcfCallCommitIcon(_a) {
    var { sx } = _a, props = __rest(_a, ["sx"]);
    const theme = useTheme();
    const callCommitIconStyle = CcfCallCommitIconStyle(theme);
    return (_jsx(SvgIcon, Object.assign({ sx: Object.assign(Object.assign({}, callCommitIconStyle.root), sx) }, props, { children: _jsx("g", Object.assign({ id: "Commit" }, { children: _jsxs("g", Object.assign({ id: "Group_118187", "data-name": "Group 118187", transform: "translate(-576 -209)" }, { children: [_jsxs("g", Object.assign({ id: "Rectangle_80258", "data-name": "Rectangle 80258", transform: "translate(574 207)", fill: "#526b7a", stroke: "#707070", strokeWidth: "1", opacity: "0" }, { children: [_jsx("rect", { width: "24", height: "24", stroke: "none" }), _jsx("rect", { x: "0.5", y: "0.5", width: "23", height: "23", fill: "none" })] })), _jsxs("g", Object.assign({ id: "Group_118198", "data-name": "Group 118198", transform: "translate(577.318 209)" }, { children: [_jsxs("g", Object.assign({ id: "schedule-new-commitment" }, { children: [_jsx("path", { id: "Path_13262", "data-name": "Path 13262", d: "M-32.435-78.058a.948.948,0,0,0,.948-.948v-3.046A.948.948,0,0,0-32.435-83a.948.948,0,0,0-.948.948v3.046A.948.948,0,0,0-32.435-78.058Z", transform: "translate(44.891 83)" }), _jsx("path", { id: "Path_13263", "data-name": "Path 13263", d: "M-25.869-80.985h-1.245v1.292a2.376,2.376,0,0,1-2.373,2.373,2.376,2.376,0,0,1-2.373-2.373v-1.292h-2.953v1.292a2.376,2.376,0,0,1-2.373,2.373,2.376,2.376,0,0,1-2.373-2.373v-1.292h-1.209A1.231,1.231,0,0,0-42-79.754v14.847a1.231,1.231,0,0,0,1.231,1.231h14.9a1.231,1.231,0,0,0,1.231-1.231V-79.754A1.231,1.231,0,0,0-25.869-80.985Zm-.717,14.959a.41.41,0,0,1-.41.41H-39.655a.41.41,0,0,1-.41-.41v-7.718h13.479Z", transform: "translate(42 83.676)" }), _jsx("path", { id: "Path_13264", "data-name": "Path 13264", d: "M-38.166-78.058a.948.948,0,0,0,.948-.948v-3.046A.948.948,0,0,0-38.166-83a.948.948,0,0,0-.948.948v3.046A.948.948,0,0,0-38.166-78.058Z", transform: "translate(42.968 83)" })] })), _jsx("path", { id: "commitPlus", d: "M8.355,6.033H6.613V4.29a.29.29,0,1,0-.581,0V6.033H4.29a.29.29,0,1,0,0,.581H6.033V8.355a.29.29,0,0,0,.581,0V6.613H8.355a.29.29,0,0,0,0-.581Z", transform: "translate(2.358 7.181)", fill: "#526b7a", stroke: "#526b7a", strokeWidth: "1" })] }))] })) })) })));
}
export default CcfCallCommitIcon;
//# sourceMappingURL=ccf-call-commit-icon.js.map