import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useRef } from 'react';
import { Box, MenuItem } from '@mui/material';
import { CcfDraggableIcon, CcfTypography } from '@nice-devone/ui-controls';
/**
 * Renders the visual draggable overlay shown while dragging an item.
 *
 * This component is fully generic and supports custom label/icon/slot rendering.
 *
 * @param T - Type of the draggable item.
 *
 * @param props - Draggable overlay rendering props.
 * @returns JSX element or null if no active item exists.
 *
 * @example
 * ```
 * <CcfDraggableOverlayItem
 *   activeItem={{ menuName: 'home', tooltip: 'Home' }}
 *   styles={styles}
 *   config={{
 *     getLabel: (i) => i.tooltip,
 *     getTestId: (i) => `drag-overlay-${i.menuName}`,
 *   }}
 * />
 * ```
 */
function DraggableOverlayItem({ activeItem, styles, config, }) {
    var _a, _b, _c, _d;
    const overlayFocusRef = useRef(null);
    useEffect(() => {
        //  Focus overlay item after DOM paint to prevent scroll jumps
        requestAnimationFrame(() => {
            var _a;
            (_a = overlayFocusRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        });
    }, []);
    if (!activeItem)
        return null;
    return (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, (styles.overlayBox || {})), (config.containerStyle || {})), "data-testid": config.getTestId(activeItem), ref: overlayFocusRef, tabIndex: 0 }, { children: _jsx(MenuItem, Object.assign({ sx: Object.assign(Object.assign({}, (styles.menuItem || {})), { opacity: config.getActive(activeItem) ? 1 : 0.5 }), dense: true }, { children: _jsxs(Box, Object.assign({ display: "flex", alignItems: "center", width: "100%" }, { children: [(_b = (_a = config.getIcon) === null || _a === void 0 ? void 0 : _a.call(config, activeItem)) !== null && _b !== void 0 ? _b : _jsx(CcfDraggableIcon, { fontSize: "small" }), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, (styles.overlayText || {})), config.labelStyle) }, { children: config.getLabel(activeItem) })), (_d = (_c = config.getRightSlot) === null || _c === void 0 ? void 0 : _c.call(config, activeItem)) !== null && _d !== void 0 ? _d : null] })) })) })));
}
const CcfDraggableOverlayItem = memo(DraggableOverlayItem);
export default CcfDraggableOverlayItem;
//# sourceMappingURL=ccf-draggable-overlayItem.js.map