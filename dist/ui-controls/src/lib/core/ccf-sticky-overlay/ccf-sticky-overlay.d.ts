export interface StickyOverlayProps {
    columnWidth: number;
    headerCellSelector: string;
    columnHeadersSelector: string;
    zIndex?: number;
}
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
export declare const CcfStickyOverlay: ({ columnWidth, headerCellSelector, columnHeadersSelector, zIndex, }: StickyOverlayProps) => JSX.Element;
