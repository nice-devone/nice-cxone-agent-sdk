import { DOMConversionMap, DOMConversionOutput, DOMExportOutput, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedElementNode, Spread } from 'lexical';
import { TableCellNode } from '@lexical/table';
export declare const TableCellHeaderStates: {
    BOTH: number;
    COLUMN: number;
    NO_STATUS: number;
    ROW: number;
};
export declare type SerializedTableCellNode = Spread<{
    colSpan?: number;
    rowSpan?: number;
    headerState: TableCellHeaderState;
    width?: number;
    backgroundColor?: null | string;
    border?: null | string;
    borderBottom?: null | string;
    borderTop?: null | string;
    borderLeft?: null | string;
    borderRight?: null | string;
    isFromTableCreation?: boolean;
}, SerializedElementNode>;
export declare type TableCellHeaderState = typeof TableCellHeaderStates[keyof typeof TableCellHeaderStates];
/**
 * The CcfCustomExtendedTableCellNode class extends the behavior of the TableCellNode class in the Lexical library. It adds additional functionality and properties to the table cell node.
 * @returns TableCellNode
 */
export declare class CcfCustomExtendedTableCellNode extends TableCellNode {
    __isFromTableCreation: boolean;
    __isFromExcel: boolean;
    readonly DEFAULT_BORDER = "1px solid black";
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
    constructor(headerState?: number, colSpan?: number, width?: number, key?: NodeKey, isTableCreation?: boolean, borderThemeColor?: string);
    /**
     * Get the type of cell node
     * @returns type
     * @example getType()
     */
    static getType(): string;
    /**
     * clone table cell node
     * @returns table cell node
     * @example clone(node)
     */
    static clone(node: CcfCustomExtendedTableCellNode): CcfCustomExtendedTableCellNode;
    /**
     * Extend the applied basic styles of a tableCell node
     * @returns TableCellNode
     * @example importDOM()
     */
    static importDOM(): DOMConversionMap | null;
    /**
     * Get the serialized node
     * @returns TableCellNode
     * @example importJSON(TextNode)
     */
    static importJSON(serializedNode: SerializedTableCellNode): TableCellNode;
    /**
     * Add the styles to dom element
     * @returns HTMLElement
     * @example createDOM(EditorConfig)
     */
    createDOM(config: EditorConfig): HTMLElement;
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
    private getBorderValue;
    /**
     * Returns true if a border value is missing or set to 'none'.
     * @param value - The border value to check.
     */
    private isMissingBorder;
    /**
     * Returns true if any side border is missing on the given element.
     * @param element - HTMLTableCellElement to be checked.
     */
    private hasAnyMissingBorders;
    /**
     * Applies adjacent borders only when any border is missing.
     * @param element - HTMLTableCellElement created by exportDOM/createDOM
     */
    private applyAdjacentBordersIfMissing;
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
    private applyAdjacentBordersFromNodes;
    /**
     * Add the styles to dom element
     * @returns DOMExportOutput
     * @example exportDOM(editor)
     */
    exportDOM(editor: LexicalEditor): DOMExportOutput;
    /**
     * Returns serialized node
     * @returns SerializedTableCellNode
     * @example exportJSON()
     */
    exportJSON(): SerializedTableCellNode;
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
export declare function isExcelElement(element: HTMLElement | HTMLTableCellElement | HTMLTableElement): boolean;
/**
* Return text node with additional styles
* @returns DOMConversionOutput
* @example convertTableCellNodeElement(node)
*/
export declare function convertTableCellNodeElement(domNode: Node): DOMConversionOutput;
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
export declare function $createTableCellNode(headerState: TableCellHeaderState, colSpan?: number, width?: number, isFromTableCreation?: boolean, borderThemeColor?: string): CcfCustomExtendedTableCellNode;
/**
 * Checks if lexical table cell node
 * @param node - lexical node
 * @returns if its extended table cell node
 * @example
 * ```
 * $isTableCellNode(node)
 * ```
 */
export declare function $isTableCellNode(node: LexicalNode | null | undefined): node is CcfCustomExtendedTableCellNode;
