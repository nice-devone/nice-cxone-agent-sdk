import { jsx as _jsx } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
/**
 * StickyHeaderOverlay is a React component that renders a sticky header overlay for a grid
 * and dynamically adjusts its dimensions based on the header cell's size and position.
 *
 * @param  columnWidth - The width of the column for the sticky header.
 * @param headerCellSelector - The CSS selector to attach to the header container.
 * @param columnHeadersSelector - The CSS selector to attach to the column header
 * @param zIndex - The z-index of the sticky header overlay.
 * @example -
 */
export const CcfStickyOverlay = ({ columnWidth, headerCellSelector, columnHeadersSelector, zIndex = 105, }) => {
    const theme = useTheme();
    const [headerStyle, setHeaderStyle] = useState({
        top: 0,
        height: 56,
        padding: '0px 16px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
    });
    useEffect(() => {
        let resizeObserver = null;
        let mutationObserver = null;
        let requestAnimationFrameId = null;
        /**
         * Measures the dimensions and styles of the header cell and column headers,
         * and updates the header style state accordingly.
         * @example - measure()
         */
        const measure = () => {
            const headerCell = document.querySelector(headerCellSelector);
            const columnHeaders = document.querySelector(columnHeadersSelector);
            if (headerCell && columnHeaders) {
                const rect = headerCell.getBoundingClientRect();
                const offsetTop = columnHeaders.offsetTop;
                const columnHeaderRect = columnHeaders.getBoundingClientRect();
                const cellStyle = getComputedStyle(headerCell);
                const headerStyle = getComputedStyle(columnHeaders);
                const borderBottomWidth = parseFloat(headerStyle.borderBottomWidth || '0');
                const headerHeight = Math.max(0, columnHeaderRect.height - borderBottomWidth);
                if (rect.height > 0) {
                    setHeaderStyle({
                        top: offsetTop,
                        height: headerHeight,
                        padding: `${cellStyle.paddingTop} ${cellStyle.paddingRight}`,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: headerStyle.boxShadow || 'none',
                    });
                }
                else {
                    requestAnimationFrameId = requestAnimationFrame(measure);
                }
            }
            else {
                requestAnimationFrameId = requestAnimationFrame(measure);
            }
        };
        measure();
        const headerCell = document.querySelector(headerCellSelector);
        const columnHeaders = document.querySelector(columnHeadersSelector);
        if (headerCell) {
            resizeObserver = new ResizeObserver(() => {
                measure();
            });
            resizeObserver.observe(headerCell);
        }
        // Looks for changes to the coordinates of MuiDataGrid-columnHeaders
        // When the checkbox on a contact is selected, the columnHeaders
        // shifts down to make way for a button group, this handles it
        if (columnHeaders === null || columnHeaders === void 0 ? void 0 : columnHeaders.parentElement) {
            mutationObserver = new MutationObserver(() => {
                measure();
            });
            mutationObserver.observe(columnHeaders.parentElement, {
                childList: true,
                subtree: true,
            });
        }
        return () => {
            if (requestAnimationFrameId !== null)
                cancelAnimationFrame(requestAnimationFrameId);
            if (resizeObserver)
                resizeObserver.disconnect();
            if (mutationObserver)
                mutationObserver.disconnect();
        };
    }, [headerCellSelector, columnHeadersSelector, theme.palette.background.paper]);
    return (_jsx(Box, { "data-testid": 'sticky-header-overlay', sx: {
            position: 'absolute',
            top: headerStyle.top,
            right: 0,
            width: columnWidth,
            height: headerStyle.height,
            zIndex,
            backgroundColor: headerStyle.backgroundColor,
            padding: headerStyle.padding,
            pointerEvents: 'none',
            transition: 'all 0.2s ease',
        } }));
};
//# sourceMappingURL=ccf-sticky-overlay.js.map