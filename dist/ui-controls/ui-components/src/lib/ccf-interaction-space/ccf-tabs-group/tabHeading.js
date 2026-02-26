import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
/**
 * @example -
 */
const tabHeadingStyles = (theme, isSelected, isPreviewCase) => {
    var _a, _b, _c, _d;
    let backgroundColor = isPreviewCase ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.digitalTag : 'transparent';
    if (isSelected) {
        backgroundColor = (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.white;
    }
    const styles = {
        heading: {
            width: '90%',
            margin: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: backgroundColor,
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
            flexDirection: 'column',
            border: isSelected ? '1px solid #dae2e8' : 'none',
            borderBottom: 0,
        },
    };
    return styles;
};
/**
 * @returns
 * @example -
 */
export const TabHeading = ({ children, isSelected, isPreviewCase }) => {
    const theme = useTheme();
    const styles = tabHeadingStyles(theme, isSelected, isPreviewCase);
    return (_jsx(Box, Object.assign({ sx: styles.heading }, { children: children })));
};
//# sourceMappingURL=tabHeading.js.map