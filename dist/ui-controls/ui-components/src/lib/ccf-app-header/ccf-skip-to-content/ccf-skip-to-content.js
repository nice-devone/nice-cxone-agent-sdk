import { jsx as _jsx } from "react/jsx-runtime";
import { useMediaQuery, useTheme, Box } from '@mui/material';
import { CcfButton, useTranslator } from '@nice-devone/ui-controls';
import SkipToContentStyles from './ccf-skip-to-content-styles';
/**
 * Provides an accessible "skip to main content" link.
 * It moves focus to the element referenced by `bodyRef` when activated.
 * @returns skip to content component for landing screen
 * @example
 * `<SkipToContent bodyRef={mainContentRef} />`
 */
export function SkipToContent({ bodyRef }) {
    const theme = useTheme();
    const [translate] = useTranslator();
    const skipToContentStyles = SkipToContentStyles(theme);
    const isAboveLgView = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    /**
     * Handles mouse events for the "Skip to main content" button.
     * It prevents default behavior and focuses the main content area only if the Spacebar or Enter key is pressed.
     * @param e - The mouse event object.
     * @example
     * `handleActivate(e)`
     */
    const handleActivate = (e) => {
        var _a;
        e.preventDefault();
        const container = bodyRef === null || bodyRef === void 0 ? void 0 : bodyRef.current;
        if (!container)
            return;
        const mainContent = (_a = container.querySelector('#main-content:not(:empty)')) !== null && _a !== void 0 ? _a : container.querySelector('#main-content-collapseIcon');
        if (mainContent) {
            mainContent.setAttribute('tabIndex', '0');
            mainContent.focus();
        }
    };
    return (_jsx(Box, { children: _jsx(CcfButton, Object.assign({ onClick: handleActivate, sx: skipToContentStyles.button, "aria-label": translate('skipToContent'), "data-testid": "skip-to-content", disableRipple: true }, { children: isAboveLgView ? translate('skipToContent') : translate('skipToMain') })) }));
}
export default SkipToContent;
//# sourceMappingURL=ccf-skip-to-content.js.map