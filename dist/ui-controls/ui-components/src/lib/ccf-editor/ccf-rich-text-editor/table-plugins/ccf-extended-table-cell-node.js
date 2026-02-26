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
 * The CcfExtendedTableCellNode class extends the behavior of the TableCellNode class in the Lexical library. It adds additional functionality and properties to the table cell node.
 * @returns TableCellNode
 */
export class CcfExtendedTableCellNode extends TableCellNode {
    /**
     * Contructor TableCellNode
     * @returns TableCellNode
     * @example new CcfExtendedTableCellNode(headerState,colSpan,width,key)
     */
    constructor(headerState = TableCellHeaderStates.NO_STATUS, colSpan = 1, width, key) {
        super(Number(key));
        this.__colSpan = colSpan;
        this.__rowSpan = 1;
        this.__headerState = headerState;
        this.__width = width;
        this.__backgroundColor = null;
        this.__border = null;
        this.__borderBottom = null;
        this.__borderTop = null;
        this.__borderLeft = null;
        this.__borderRight = null;
    }
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
        const cellNode = new CcfExtendedTableCellNode(node.__headerState, node.__colSpan, node.__width, node.__key);
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
        const cellNode = $createTableCellNode(serializedNode.headerState, colSpan, serializedNode.width || undefined);
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
        addClassNamesToElement(element, config.theme.tableCell, this.hasHeader() && config.theme.tableCellHeader);
        return element;
    }
    /**
   * Returns serialized node
   * @returns SerializedTableCellNode
   * @example exportJSON()
   */
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { type: 'extended-table-cell', version: 1 });
    }
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
    const tableCellNode = $createTableCellNode(nodeName === 'th'
        ? TableCellHeaderStates.ROW
        : TableCellHeaderStates.NO_STATUS, domNode_.colSpan, width);
    //Below is the logic to apply the required styles
    tableCellNode.__rowSpan = domNode_.rowSpan;
    const backgroundColor = domNode_.style.backgroundColor;
    const border = domNode_.style.border;
    const borderTop = domNode_.style.borderTop;
    const borderBottom = domNode_.style.borderBottom;
    const borderLeft = domNode_.style.borderLeft;
    const borderRight = domNode_.style.borderRight;
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
 * @returns CcfExtendedTableCellNode
 * @example $createTableCellNode()
 */
export function $createTableCellNode(headerState, colSpan = 1, width) {
    return $applyNodeReplacement(new CcfExtendedTableCellNode(headerState, colSpan, width));
}
/**
 * return if its extended table cell node
 * @returns Boolean
 * @example $isTableCellNode(node)
 */
export function $isTableCellNode(node) {
    return node instanceof CcfExtendedTableCellNode;
}
//# sourceMappingURL=ccf-extended-table-cell-node.js.map