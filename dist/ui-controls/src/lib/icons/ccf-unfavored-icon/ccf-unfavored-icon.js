import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * This icon will be used to display Unfavored agent
 * @param props - SvgIconProps
 * @example - <CcfUnfavoredIcon />
 * @returns SVG of unfavored icon
 */
export function CcfUnfavoredIcon(props) {
    var _a, _b;
    const theme = useTheme();
    const { id, htmlColor = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.header } = props;
    return (_jsx(SvgIcon, Object.assign({ "data-testid": id }, props, { children: _jsx("g", Object.assign({ id: 'group' + id }, { children: _jsx("path", { id: 'vector' + id, d: "M19.8997 7.5C19.7994 7 19.3981 6.7 18.8966 6.6L13.4796 5.8L11.0721 0.7C10.8715 0.3 10.4702 0 9.96865 0C9.46708 0 9.06583 0.3 8.8652 0.7L6.45768 5.8L1.04075 6.7C0.539185 6.8 0.137931 7.1 0.0376176 7.6C-0.0626959 8.1 0.0376175 8.6 0.338558 8.9L4.25078 12.9L3.34796 18.5C3.24765 19 3.44828 19.5 3.84953 19.8C4.05016 19.9 4.25078 20 4.55172 20C4.75235 20 4.95298 19.9 5.1536 19.8L9.96865 17.2L14.7837 19.8C14.9843 19.9 15.185 20 15.3856 20C15.6865 20 15.8871 19.9 16.0878 19.7C16.489 19.4 16.6897 18.9 16.5893 18.4L15.6865 12.8L19.5987 8.8C20 8.5 20.1003 8 19.8997 7.5ZM14.2821 11.4L13.5799 12.2L13.7806 13.3L14.4828 17.4L10.9718 15.5L9.96865 14.9L9.06583 15.4L5.55486 17.3L6.25705 13.2L6.45768 12.1L5.75549 11.3L2.74608 8.5L6.65831 7.9L7.66144 7.7L9.96865 3.1L11.674 6.8L12.1755 7.8L13.1787 8L17.0909 8.6L14.2821 11.4Z", fill: htmlColor, transform: "translate(4 4)  scale(0.8)" }) })) })));
}
export default CcfUnfavoredIcon;
//# sourceMappingURL=ccf-unfavored-icon.js.map