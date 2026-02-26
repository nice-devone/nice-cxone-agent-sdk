import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme, } from '@mui/material';
import CcfInteractionResetAndRefreshBarStyles from './ccf-interaction-search-reset-and-refresh-styles';
import { CcfBox, CcfButton, CcfTrashBinIcon, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { refreshSearch, resetSearch } from '../ccf-digital-search.slice';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch } from 'react-redux';
/**
 * Component displays Refresh and Reset button for interaction search space
 * @returns Refresh and Reset button
 * ```
 * @example
 * <CcfInteractionResetAndRefreshBar/>
 * ```
 */
export function CcfInteractionResetAndRefreshBar({ onRefresh, onReset, }) {
    const theme = useTheme();
    const styles = CcfInteractionResetAndRefreshBarStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    /**
     * method to return button with values based on label
     * @param label - string that needs to be displayed in button and aria label.
     * @example getButton(label)
     * @returns CcfButton element with label, onClick and icon parameters
     */
    const getButton = (label) => {
        const isRefreshBtn = translate('refresh') === label;
        return (_jsxs(CcfButton, Object.assign({ onClick: isRefreshBtn
                ? () => {
                    onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
                    dispatch(refreshSearch());
                }
                : () => {
                    onReset === null || onReset === void 0 ? void 0 : onReset();
                    dispatch(resetSearch());
                }, "aria-label": label, size: "small", sx: styles === null || styles === void 0 ? void 0 : styles.focussedElement, disableRipple: true }, { children: [isRefreshBtn ? (_jsx(RefreshIcon, { color: "primary", viewBox: "-9 5 30 10", sx: Object.assign(Object.assign({}, styles.icon), styles.refreshIcon) })) : (_jsx(CcfTrashBinIcon, { color: "primary", viewBox: "-9 5 30 10", sx: styles.icon })), _jsx(CcfTypography, Object.assign({ color: "primary", variant: "h4", sx: styles.buttonText, title: label, "aria-label": label }, { children: label }))] })));
    };
    return (_jsxs(CcfBox, Object.assign({ sx: styles.container }, { children: [getButton(translate('refresh')), getButton(translate('reset'))] })));
}
export default CcfInteractionResetAndRefreshBar;
//# sourceMappingURL=ccf-interaction-search-reset-and-refresh.js.map