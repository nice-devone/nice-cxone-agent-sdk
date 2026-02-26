import { DOMConversionMap, DOMConversionOutput, EditorConfig, LexicalNode, NodeKey, SerializedElementNode, Spread } from 'lexical';
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
}, SerializedElementNode>;
export declare type TableCellHeaderState = typeof TableCellHeaderStates[keyof typeof TableCellHeaderStates];
/**
 * The CcfExtendedTableCellNode class extends the behavior of the TableCellNode class in the Lexical library. It adds additional functionality and properties to the table cell node.
 * @returns TableCellNode
 */
export declare class CcfExtendedTableCellNode extends TableCellNode {
    /**
     * Contructor TableCellNode
     * @returns TableCellNode
     * @example new CcfExtendedTableCellNode(headerState,colSpan,width,key)
     */
    constructor(headerState?: number, colSpan?: number, width?: number, key?: NodeKey);
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
    static clone(node: CcfExtendedTableCellNode): CcfExtendedTableCellNode;
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
   * Returns serialized node
   * @returns SerializedTableCellNode
   * @example exportJSON()
   */
    exportJSON(): SerializedTableCellNode;
}
/**
* Return text node with additional styles
* @returns DOMConversionOutput
* @example convertTableCellNodeElement(node)
*/
export declare function convertTableCellNodeElement(domNode: Node): DOMConversionOutput;
/**
 * create extended type table cell node
 * @returns CcfExtendedTableCellNode
 * @example $createTableCellNode()
 */
export declare function $createTableCellNode(headerState: TableCellHeaderState, colSpan?: number, width?: number): CcfExtendedTableCellNode;
/**
 * return if its extended table cell node
 * @returns Boolean
 * @example $isTableCellNode(node)
 */
export declare function $isTableCellNode(node: LexicalNode | null | undefined): node is CcfExtendedTableCellNode;
