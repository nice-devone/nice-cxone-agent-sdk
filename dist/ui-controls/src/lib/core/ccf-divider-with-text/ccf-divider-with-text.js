import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, useTheme } from '@mui/material';
import CcfDividerWithTextStyle from './ccf-divider-with-text.styles';
/**
 * Component used to display divider with text
 * @param props - CcfDividerWithTextProps
 * @example <CcfDividerWithText />
 * @returns divider with text
 */
export function CcfDividerWithText(props) {
    const theme = useTheme();
    const dividerWithTextStyle = CcfDividerWithTextStyle(theme);
    return (_jsxs(Box, Object.assign({ sx: dividerWithTextStyle.root }, { children: [_jsx(Divider, {}), _jsx("span", { children: props.children }), _jsx(Divider, {})] })));
}
export default CcfDividerWithText;
//# sourceMappingURL=ccf-divider-with-text.js.map