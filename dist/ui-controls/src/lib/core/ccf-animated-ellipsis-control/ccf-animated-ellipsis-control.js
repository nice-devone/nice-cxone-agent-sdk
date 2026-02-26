import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import CcfAnimatedEllipsisControlStyles from './ccf-animated-ellipsis-control.styles';
/**
 * Component to return ellipsis animated in waving pattern
 * @example <CcfAnimatedEllipsisControl />
 * @returns CcfAnimatedEllipsisControl
 */
export const CcfAnimatedEllipsisControl = () => {
    const theme = useTheme();
    const styles = CcfAnimatedEllipsisControlStyles(theme);
    return (_jsx(Box, { sx: styles.dotElastic }));
};
export default CcfAnimatedEllipsisControl;
//# sourceMappingURL=ccf-animated-ellipsis-control.js.map