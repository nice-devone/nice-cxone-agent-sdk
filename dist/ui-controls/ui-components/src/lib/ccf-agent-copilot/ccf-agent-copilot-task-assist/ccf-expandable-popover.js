import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTheme, Button, Popover, Box, IconButton } from '@mui/material';
import { CcfTooltip, CcfCopilotExpandSummaryIcon, CcfCopilotCollapseSummaryIcon } from '@nice-devone/ui-controls';
import CcfAgentCopilotTaskAssistStyles from './ccf-agent-copilot-task-assist.styles';
import ccfCopilotCardStyles from '../ccf-agent-copilot-container.styles';
/**
 * `ExpandablePopover` is a reusable React functional component that displays a trigger icon button.
 * When clicked, it shows a popover that can expand to a specified width and height and renders any children passed to it.
 *
 * The component supports customization options including tooltip title, icons for open/close
 *
 * @param props - Props to configure the ExpandablePopover.
 * @param width - The width of the popover.
 * @param height - The height of the popover.
 * @param tooltipTitle - Tooltip text to display on hover of the trigger icon.
 * @param children - React nodes to render inside the popover.
 * @param icon - Optional custom icon to display for expanding the popover.
 * @param closeIcon - Optional custom icon to display for collapsing the popover.
 *
 * @example
 * ```
 * <ExpandablePopover
 *   width={300}
 *   height={400}
 *   tooltipTitle="Show More"
 *   icon={<ExpandIcon />}
 *   closeIcon={<CollapseIcon />}
 * >
 *   <div>Popover Content Here</div>
 * </ExpandablePopover>
 * ```
 */
export const ExpandablePopover = ({ width, height, tooltipTitle, children, icon = _jsx(CcfCopilotExpandSummaryIcon, {}), closeIcon = _jsx(CcfCopilotCollapseSummaryIcon, {}), }) => {
    var _a;
    const theme = useTheme();
    const styles = CcfAgentCopilotTaskAssistStyles(theme);
    const cardStyles = ccfCopilotCardStyles(theme);
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const isPopoverOpen = Boolean(popoverAnchor);
    /**
     * Opens the popover by setting the anchor element to the current target of the event.
     *
     * @param event - The mouse or keyboard event that triggered the popover opening
     * @example
     * ```
     * handleOpenPopover(event);
     * ```
     */
    const handleOpenPopover = (event) => {
        setPopoverAnchor(event.currentTarget);
    };
    /**
   * Closes the popover by setting the anchor element to null.
   *
   * @example
   * ```
   * handleClosePopover();
   * ```
   */
    const handleClosePopover = () => {
        setPopoverAnchor(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: tooltipTitle, sx: { width: styles.button.width }, arrow: true }, { children: _jsx(Button, { variant: "text", startIcon: icon, id: "ccf-agent-expandable-popover-button", "data-testid": "ccf-agent-expandable-popover-button", "aria-controls": "ccf-agent-expandable-popover", "aria-expanded": isPopoverOpen, "aria-label": tooltipTitle, onKeyDown: (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenPopover(e);
                        }
                    }, onClick: (e) => {
                        e.stopPropagation();
                        isPopoverOpen ? handleClosePopover() : handleOpenPopover(e);
                    } }) })), _jsxs(Popover, Object.assign({ id: "ccf-agent-expandable-popover", "data-testid": "ccf-agent-expandable-popover", open: isPopoverOpen, anchorEl: popoverAnchor, disableRestoreFocus: true, hideBackdrop: true, disableEnforceFocus: true, disableAutoFocus: true, keepMounted: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, PaperProps: {
                    onClick: (event) => event.stopPropagation(),
                    style: Object.assign({ width: `${width - 5}px`, height: `${height - 60}px` }, (_a = styles === null || styles === void 0 ? void 0 : styles.expandablePopover) === null || _a === void 0 ? void 0 : _a.paper),
                }, sx: Object.assign(Object.assign({}, cardStyles.copilotCard), styles.expandablePopover.container), onClose: (_event, reason) => {
                    if (reason === 'backdropClick')
                        return;
                    handleClosePopover();
                } }, { children: [_jsx(Box, Object.assign({ style: Object.assign(Object.assign({}, styles.copilotContent), styles.expandablePopover.closeButton) }, { children: _jsx(IconButton, Object.assign({ onClick: handleClosePopover, size: "small" }, { children: closeIcon })) })), children] }))] }));
};
export default ExpandablePopover;
//# sourceMappingURL=ccf-expandable-popover.js.map