import { $applyNodeReplacement, $createParagraphNode, $isElementNode, $isLineBreakNode } from 'lexical';
import { TableCellNode } from '@lexical/table';
import { addClassNamesToElement } from '@lexical/utils';
const PIXEL_VALUE_REG_EXP = /^(\d+(?:\.\d+)?)px$/;
export const TableCellHeaderStates = {
    BOTH: 3,
    COLUMN: 2,
    NO_STATUS: 0,
    ROW: 1,
};
/**
 * The CcfCustomExtendedTableCellNode class extends the behavior of the TableCellNode class in the Lexical library. It adds additional functionality and properties to the table cell node.
 * @returns TableCellNode
 */
export class CcfCustomExtendedTableCellNode extends TableCellNode {
    /* eslint-disable max-params */
    /**
     * Constructor TableCellNode
     * @param headerState - headerState of the table cell
     * @param colSpan - number of columns the cell spans
     * @param width - width of the cell
     * @param key - unique key for the node
     * @param isTableCreation - flag indicating if the cell is from table creation
     * @param borderThemeColor - color of the border theme
     * @returns TableCellNode
     * @example
     * const node = new CcfCustomExtendedTableCellNode(
     *   TableCellHeaderStates.NO_STATUS,
     *   1,
     *   undefined,
     *   undefined,
     *   true,
     *   '#d0d7de'
     * );
     * @remarks
     * This constructor intentionally accepts multiple parameters to match Lexical node creation patterns.
    */
    constructor(headerState = TableCellHeaderStates.NO_STATUS, colSpan = 1, width, key, isTableCreation, borderThemeColor) {
        super(Number(key));
        this.__isFromTableCreation = false;
        this.__isFromExcel = false;
        this.DEFAULT_BORDER = '1px solid black';
        this.__colSpan = colSpan;
        this.__rowSpan = 1;
        this.__headerState = headerState;
        this.__width = width;
        this.__backgroundColor = null;
        // Initialize borders based on table creation context
        const defaultBorderStyle = borderThemeColor ? `2px solid ${borderThemeColor}` : this.DEFAULT_BORDER;
        if (isTableCreation) {
            this.__border = defaultBorderStyle;
            this.__borderBottom = defaultBorderStyle;
            this.__borderTop = defaultBorderStyle;
            this.__borderLeft = defaultBorderStyle;
            this.__borderRight = defaultBorderStyle;
        }
        else {
            this.__border = null;
            this.__borderBottom = null;
            this.__borderTop = null;
            this.__borderLeft = null;
            this.__borderRight = null;
        }
        this.__isFromTableCreation = isTableCreation || false;
    }
    /* eslint-enable max-params */
    /**
     * Get the type of cell node
     * @returns type
     * @example getType()
     */
    static getType() {
        return 'extended-table-cell';
    }
    /**
     * clone table cell node
     * @returns table cell node
     * @example clone(node)
     */
    static clone(node) {
        const cellNode = new CcfCustomExtendedTableCellNode(node.__headerState, node.__colSpan, node.__width, node.__key, node.__isFromTableCreation);
        cellNode.__rowSpan = node.__rowSpan;
        cellNode.__backgroundColor = node.__backgroundColor;
        cellNode.__border = node.__border;
        cellNode.__borderBottom = node.__borderBottom;
        cellNode.__borderTop = node.__borderTop;
        cellNode.__borderLeft = node.__borderLeft;
        cellNode.__borderRight = node.__borderRight;
        return cellNode;
    }
    /**
     * Extend the applied basic styles of a tableCell node
     * @returns TableCellNode
     * @example importDOM()
     */
    static importDOM() {
        return {
            td: () => ({
                conversion: convertTableCellNodeElement,
                priority: 0,
            }),
            th: () => ({
                conversion: convertTableCellNodeElement,
                priority: 0,
            }),
        };
    }
    /**
     * Get the serialized node
     * @returns TableCellNode
     * @example importJSON(TextNode)
     */
    static importJSON(serializedNode) {
        const colSpan = serializedNode.colSpan || 1;
        const rowSpan = serializedNode.rowSpan || 1;
        const cellNode = $createTableCellNode(serializedNode.headerState, colSpan, serializedNode.width || undefined, serializedNode.isFromTableCreation);
        cellNode.__rowSpan = rowSpan;
        cellNode.__backgroundColor = serializedNode.backgroundColor || null;
        cellNode.__border = serializedNode.border || null;
        cellNode.__borderBottom = serializedNode.borderBottom || null;
        cellNode.__borderTop = serializedNode.borderTop || null;
        cellNode.__borderLeft = serializedNode.borderLeft || null;
        cellNode.__borderRight = serializedNode.borderRight || null;
        return cellNode;
    }
    /**
     * Add the styles to dom element
     * @returns HTMLElement
     * @example createDOM(EditorConfig)
     */
    createDOM(config) {
        const element = document.createElement(this.getTag());
        if (this.__width) {
            element.style.width = `${this.__width}px`;
        }
        if (this.__colSpan > 1) {
            element.colSpan = this.__colSpan;
        }
        if (this.__rowSpan > 1) {
            element.rowSpan = this.__rowSpan;
        }
        if (this.__backgroundColor !== null) {
            element.style.backgroundColor = this.__backgroundColor;
        }
        if (this.__border !== null) {
            element.style.border = this.__border;
        }
        if (this.__borderBottom !== null) {
            element.style.borderBottom = this.__borderBottom;
        }
        if (this.__borderTop !== null) {
            element.style.borderTop = this.__borderTop;
        }
        if (this.__borderLeft !== null) {
            element.style.borderLeft = this.__borderLeft;
        }
        if (this.__borderRight !== null) {
            element.style.borderRight = this.__borderRight;
        }
        // Copy borders from adjacent cells only if any side is missing
        this.applyAdjacentBordersIfMissing(element);
        addClassNamesToElement(element, config.theme.tableCell, this.hasHeader() && config.theme.tableCellHeader);
        return element;
    }
    /**
     * Helper function to handle borders with Excel detection and return calculated border value
     * @param element  - HTMLTableCellElement to be processed
     * @param borderValue - border value to be processed
     * @returns - border value, default or none based on conditions
     * @example
     * ```
     * getBorderValue(element, borderValue)
     * ```
     */
    getBorderValue(element, borderValue) {
        // Check if this is from Excel first (highest priority)
        const isExcelContent = this.__isFromExcel || isExcelElement(element);
        if (isExcelContent) {
            // If we have an explicit border from Excel, use it
            if (borderValue && borderValue !== 'null' && borderValue !== 'undefined' && borderValue.trim() !== '') {
                return borderValue;
            }
            // Otherwise use Excel default border
            return this.DEFAULT_BORDER;
        }
        // Check if we have an explicit border value for non-Excel content
        if (borderValue && borderValue !== 'null' && borderValue !== 'undefined' && borderValue.trim() !== '') {
            return borderValue;
        }
        // For other external sources, return 'none'
        return 'none';
    }
    ;
    /**
     * Returns true if a border value is missing or set to 'none'.
     * @param value - The border value to check.
     */
    isMissingBorder(value) {
        return !value || value.trim() === '' || value.trim().toLowerCase() === 'none';
    }
    /**
     * Returns true if any side border is missing on the given element.
     * @param element - HTMLTableCellElement to be checked.
     */
    hasAnyMissingBorders(element) {
        return (this.isMissingBorder(element.style.border) ||
            this.isMissingBorder(element.style.borderTop) ||
            this.isMissingBorder(element.style.borderBottom) ||
            this.isMissingBorder(element.style.borderLeft) ||
            this.isMissingBorder(element.style.borderRight));
    }
    /**
     * Applies adjacent borders only when any border is missing.
     * @param element - HTMLTableCellElement created by exportDOM/createDOM
     */
    applyAdjacentBordersIfMissing(element) {
        if (this.hasAnyMissingBorders(element)) {
            this.applyAdjacentBordersFromNodes(element);
        }
    }
    /**
     * Try to copy border styles from adjacent sibling/row cells when this cell
     * has missing borders (none or empty). If any adjacent cell has a border,
     * apply the same border uniformly to all sides of the current cell.
     * Checks left, right, above, then below.
     * @param element - HTMLTableCellElement created by exportDOM/createDOM
     * @example
     * ```
     * applyAdjacentBordersFromNodes(element);
     * ```
     */
    applyAdjacentBordersFromNodes(element) {
        const cellHasAnyMissing = this.hasAnyMissingBorders(element);
        /**
         * Selects a usable border value from a neighboring cell node.
         * @param neighbor - Adjacent CcfCustomExtendedTableCellNode to inspect.
         * @returns A non-empty, non-'none' border string; otherwise null.
         * @example
         * pickNeighborBorder(neighbor);
         */
        const pickNeighborBorder = (neighbor) => {
            const candidates = [
                neighbor.__border,
                neighbor.__borderTop,
                neighbor.__borderBottom,
                neighbor.__borderLeft,
                neighbor.__borderRight
            ];
            const found = candidates.find(item => !!item && item.trim() !== '' && item.trim().toLowerCase() !== 'none');
            return found || null;
        };
        /**
         * Attempts to copy a uniform border from the given neighbor to the current cell.
         * @param neighbor - Adjacent LexicalNode used as the border source.
         * @returns True if a border was applied; otherwise false.
         * @example
         * tryCopyUniformFromNeighbor(neighbor);
         */
        const tryCopyUniformFromNeighbor = (neighbor) => {
            if (!neighbor || !(neighbor instanceof CcfCustomExtendedTableCellNode)) {
                return false;
            }
            const borderValue = pickNeighborBorder(neighbor);
            if (!borderValue) {
                return false;
            }
            // Apply uniform border to all sides when current cell has any missing side
            if (cellHasAnyMissing) {
                element.style.border = borderValue;
                element.style.borderTop = borderValue;
                element.style.borderBottom = borderValue;
                element.style.borderLeft = borderValue;
                element.style.borderRight = borderValue;
                // Persist on node so subsequent renders/export keep the style
                this.__border = borderValue;
                this.__borderTop = borderValue;
                this.__borderBottom = borderValue;
                this.__borderLeft = borderValue;
                this.__borderRight = borderValue;
                return true;
            }
            return false;
        };
        // Check siblings in the same row
        const leftNode = this.getPreviousSibling();
        const rightNode = this.getNextSibling();
        // Check same column in the previous and next rows
        const rowNode = this.getParentOrThrow();
        const cellIndex = this.getIndexWithinParent();
        const prevRow = rowNode.getPreviousSibling();
        const nextRow = rowNode.getNextSibling();
        const aboveNode = prevRow && $isElementNode(prevRow)
            ? prevRow.getChildAtIndex(cellIndex)
            : null;
        const belowNode = nextRow && $isElementNode(nextRow)
            ? nextRow.getChildAtIndex(cellIndex)
            : null;
        // Try in order: left -> right -> above -> below
        tryCopyUniformFromNeighbor(leftNode) ||
            tryCopyUniformFromNeighbor(rightNode) ||
            tryCopyUniformFromNeighbor(aboveNode) ||
            tryCopyUniformFromNeighbor(belowNode);
    }
    /**
     * Add the styles to dom element
     * @returns DOMExportOutput
     * @example exportDOM(editor)
     */
    exportDOM(editor) {
        const { element } = super.exportDOM(editor);
        if (element) {
            const element_ = element;
            const maxWidth = 700;
            const colCount = this.getParentOrThrow().getChildrenSize();
            element_.style.border = this.getBorderValue(element_, this.__border);
            element_.style.borderLeft = this.getBorderValue(element_, this.__borderLeft);
            element_.style.borderRight = this.getBorderValue(element_, this.__borderRight);
            element_.style.borderTop = this.getBorderValue(element_, this.__borderTop);
            element_.style.borderBottom = this.getBorderValue(element_, this.__borderBottom);
            // Copy borders from adjacent cells only if any side is missing
            this.applyAdjacentBordersIfMissing(element_);
            if (this.__colSpan > 1) {
                element_.colSpan = this.__colSpan;
            }
            if (this.__rowSpan > 1) {
                element_.rowSpan = this.__rowSpan;
            }
            element_.style.width = `${this.getWidth() || Math.max(90, maxWidth / colCount)}px`;
            element_.style.verticalAlign = 'top';
            element_.style.textAlign = 'start';
            const backgroundColor = this.getBackgroundColor();
            if (backgroundColor !== null) {
                element_.style.backgroundColor = backgroundColor;
            }
            else if (this.hasHeader()) {
                element_.style.backgroundColor = '#f2f3f5';
            }
        }
        return { element };
    }
    /**
     * Returns serialized node
     * @returns SerializedTableCellNode
     * @example exportJSON()
     */
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { type: 'extended-table-cell', version: 1, colSpan: this.__colSpan, rowSpan: this.__rowSpan, headerState: this.__headerState, width: this.__width, backgroundColor: this.__backgroundColor, border: this.__border, borderBottom: this.__borderBottom, borderTop: this.__borderTop, borderLeft: this.__borderLeft, borderRight: this.__borderRight, isFromTableCreation: this.__isFromTableCreation });
    }
}
/**
 * Checks if the given element is part of an Excel table.
 * @param element - The element to check.
 * @returns True if the element is part of an Excel table, false otherwise.
 * @example
 * ```
 * isExcelElement(element)
 * ```
 */
export function isExcelElement(element) {
    var _a;
    if (!element)
        return false;
    const table = element.closest('table');
    if (!table)
        return false;
    // Check for Excel-specific patterns
    const html = table.outerHTML;
    // Namespace or conditional checks
    const officeMarkers = [
        html.includes('xmlns:x="urn:schemas-microsoft-com:office:excel"') ||
            html.includes('xmlns:o="urn:schemas-microsoft-com:office:office"') ||
            html.includes('<!--[if gte mso') ||
            html.includes('Microsoft Excel') ||
            html.includes('ProgId="Excel.Sheet"') ||
            element.hasAttribute('data-sheets-value') ||
            element.hasAttribute('data-sheets-formula') ||
            element.hasAttribute('data-sheets-numberformat') ||
            ((_a = element.getAttribute('style')) === null || _a === void 0 ? void 0 : _a.includes('mso-')) ||
            element.style.cssText.includes('mso-')
    ];
    const officeMarkersResult = officeMarkers.some(Boolean);
    // Structural hints that persist even for unstyled tables
    const hasColGroups = !!table.querySelector('col') || !!table.querySelector('colgroup');
    // Medium hints
    const mediumIndicators = [
        element.className.includes('xl'),
        element.className.toLowerCase().includes('excel'),
        table.className.includes('xl'),
        table.className.toLowerCase().includes('excel'),
        table.hasAttribute('data-sheets-root')
    ];
    const mediumIndicatorsResult = mediumIndicators.some(Boolean);
    return officeMarkersResult || hasColGroups || mediumIndicatorsResult;
}
/**
* Return text node with additional styles
* @returns DOMConversionOutput
* @example convertTableCellNodeElement(node)
*/
export function convertTableCellNodeElement(domNode) {
    const domNode_ = domNode;
    const nodeName = domNode.nodeName.toLowerCase();
    let width = undefined;
    if (PIXEL_VALUE_REG_EXP.test(domNode_.style.width)) {
        width = parseFloat(domNode_.style.width);
    }
    // Detect if this is from Excel
    const isExcelContent = isExcelElement(domNode_);
    const tableCellNode = $createTableCellNode(nodeName === 'th'
        ? TableCellHeaderStates.ROW
        : TableCellHeaderStates.NO_STATUS, domNode_.colSpan, width, false, // Not from table creation
    undefined // No theme color
    );
    //Below is the logic to apply the required styles
    tableCellNode.__rowSpan = domNode_.rowSpan;
    const backgroundColor = domNode_.style.backgroundColor;
    const border = domNode_.style.border;
    const borderTop = domNode_.style.borderTop;
    const borderBottom = domNode_.style.borderBottom;
    const borderLeft = domNode_.style.borderLeft;
    const borderRight = domNode_.style.borderRight;
    // Mark as Excel content for special handling and apply default border if needed
    if (isExcelContent) {
        tableCellNode.__isFromExcel = true;
        // Apply default border for Excel if not present
        if (!border) {
            tableCellNode.__border = tableCellNode.DEFAULT_BORDER;
        }
    }
    if (backgroundColor)
        tableCellNode.__backgroundColor = backgroundColor;
    if (border)
        tableCellNode.__border = border;
    if (borderTop)
        tableCellNode.__borderTop = borderTop;
    if (borderBottom)
        tableCellNode.__borderBottom = borderBottom;
    if (borderLeft)
        tableCellNode.__borderLeft = borderLeft;
    if (borderRight)
        tableCellNode.__borderRight = borderRight;
    return {
        forChild: (lexicalNode, parentLexicalNode) => {
            if ($isTableCellNode(parentLexicalNode) && !$isElementNode(lexicalNode)) {
                const paragraphNode = $createParagraphNode();
                if ($isLineBreakNode(lexicalNode) &&
                    lexicalNode.getTextContent() === '\n') {
                    return null;
                }
                paragraphNode.append(lexicalNode);
                return paragraphNode;
            }
            return lexicalNode;
        },
        node: tableCellNode,
    };
}
/**
 * create extended type table cell node
 * @param headerState - headerState of the table cell
 * @param colSpan - number of columns the cell spans
 * @param width - width of the cell
 * @param isTableCreation - flag indicating if the cell is from table creation
 * @param borderThemeColor - color of the border theme
 * @returns CcfCustomExtendedTableCellNode
 * @example
 * ```
 * $createTableCellNode(serializedNode.headerState,
      colSpan,
      serializedNode.width || undefined,
      serializedNode.isFromTableCreation,
      undefined);
 * ```
 */
export function $createTableCellNode(headerState, colSpan = 1, width, isFromTableCreation, borderThemeColor) {
    return $applyNodeReplacement(new CcfCustomExtendedTableCellNode(headerState, colSpan, width, undefined, isFromTableCreation, borderThemeColor));
}
/**
 * Checks if lexical table cell node
 * @param node - lexical node
 * @returns if its extended table cell node
 * @example
 * ```
 * $isTableCellNode(node)
 * ```
 */
export function $isTableCellNode(node) {
    return node instanceof CcfCustomExtendedTableCellNode;
}
//# sourceMappingURL=ccf-custom-extended-table-cell-node.js.map