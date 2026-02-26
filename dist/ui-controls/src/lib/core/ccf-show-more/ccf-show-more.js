import { jsx as _jsx } from "react/jsx-runtime";
import { Grid, useTheme } from '@mui/material';
import { ccfShowMoreStyles } from './ccf-show-more.style';
/**
 * USe to render the show more control
 * @returns - JSX element
 * @example
 * ```
 * <CcfShowMore />
 * ```
 */
export const CcfShowMore = ({ text, onClick }) => {
    const theme = useTheme();
    const styles = ccfShowMoreStyles(theme);
    return (_jsx(Grid, Object.assign({ container: true, direction: 'column', spacing: 0 }, { children: _jsx(Grid, Object.assign({ item: true, sx: styles.showMoreText, onClick: onClick }, { children: text })) })));
};
//# sourceMappingURL=ccf-show-more.js.map