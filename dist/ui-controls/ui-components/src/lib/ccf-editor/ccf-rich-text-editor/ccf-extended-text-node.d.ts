import { DOMConversion, DOMConversionMap, DOMConversionOutput, NodeKey, TextNode, SerializedTextNode, LexicalNode } from 'lexical';
/**
 * Component to extend the Lexical TextNode behavior
 * @returns TextNode
 */
export declare class CcfExtendedTextNode extends TextNode {
    /**
     * Contructor TextNode
     * @returns TextNode
     * @example new CcfExtendedTextNode(text,key)
     */
    constructor(text: string, key?: NodeKey);
    /**
   * Get the type of text node
   * @returns type
   * @example getType()
   */
    static getType(): string;
    /**
   * clone text node
   * @returns text node
   * @example clone(node)
   */
    static clone(node: CcfExtendedTextNode): CcfExtendedTextNode;
    /**
   * Extend the applied basic styles of a text node
   * @returns text node
   * @example importDOM()
   */
    static importDOM(): DOMConversionMap | null;
    /**
   * Get the serialized node
   * @returns text node
   * @example importJSON(TextNode)
   */
    static importJSON(serializedNode: SerializedTextNode): TextNode;
    /**
   * Check if its simple text node
   * @returns boolean
   * @example isSimpleText()
   */
    isSimpleText(): boolean;
    /**
   * Returns serialized node
   * @returns SerializedTextNode
   * @example exportJSON()
   */
    exportJSON(): SerializedTextNode;
}
/**
 * create extended type text node
 * @returns CcfExtendedTextNode
 * @example $createExtendedTextNode('key')
 */
export declare function $createExtendedTextNode(text: string): CcfExtendedTextNode;
/**
 * return if its extended text node
 * @returns Boolean
 * @example $isExtendedTextNode(node)
 */
export declare function $isExtendedTextNode(node: LexicalNode | null | undefined): node is CcfExtendedTextNode;
/**
* Return text node with additional styles
* @returns HTMLElement
* @example patchStyleConversion(node)
*/
export declare function patchStyleConversion(originalDOMConverter?: (node: HTMLElement) => DOMConversion | null): (node: HTMLElement) => DOMConversionOutput | null;
