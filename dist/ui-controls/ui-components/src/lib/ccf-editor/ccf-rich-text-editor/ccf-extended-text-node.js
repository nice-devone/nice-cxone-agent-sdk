import { $isTextNode, TextNode, } from 'lexical';
/**
 * Component to extend the Lexical TextNode behavior
 * @returns TextNode
 */
export class CcfExtendedTextNode extends TextNode {
    /**
     * Contructor TextNode
     * @returns TextNode
     * @example new CcfExtendedTextNode(text,key)
     */
    constructor(text, key) {
        super(text, key);
    }
    /**
   * Get the type of text node
   * @returns type
   * @example getType()
   */
    static getType() {
        return 'extended-text';
    }
    /**
   * clone text node
   * @returns text node
   * @example clone(node)
   */
    static clone(node) {
        return new CcfExtendedTextNode(node.__text, node.__key);
    }
    /**
   * Extend the applied basic styles of a text node
   * @returns text node
   * @example importDOM()
   */
    static importDOM() {
        const importers = TextNode.importDOM();
        return Object.assign(Object.assign({}, importers), { div: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.div),
                priority: 1,
            }), code: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.code),
                priority: 1,
            }), em: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.em),
                priority: 1,
            }), span: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.span),
                priority: 1,
            }), strong: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.strong),
                priority: 1,
            }), sub: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.sub),
                priority: 1,
            }), sup: () => ({
                conversion: patchStyleConversion(importers === null || importers === void 0 ? void 0 : importers.sup),
                priority: 1,
            }) });
    }
    /**
   * Get the serialized node
   * @returns text node
   * @example importJSON(TextNode)
   */
    static importJSON(serializedNode) {
        return TextNode.importJSON(serializedNode);
    }
    /**
   * Check if its simple text node
   * @returns boolean
   * @example isSimpleText()
   */
    isSimpleText() {
        return ((this.__type === 'text' || this.__type === 'extended-text') &&
            this.__mode === 0);
    }
    /**
   * Returns serialized node
   * @returns SerializedTextNode
   * @example exportJSON()
   */
    exportJSON() {
        return Object.assign(Object.assign({}, super.exportJSON()), { type: 'extended-text', version: 1 });
    }
}
/**
 * create extended type text node
 * @returns CcfExtendedTextNode
 * @example $createExtendedTextNode('key')
 */
export function $createExtendedTextNode(text) {
    return new CcfExtendedTextNode(text, 'className');
}
/**
 * return if its extended text node
 * @returns Boolean
 * @example $isExtendedTextNode(node)
 */
export function $isExtendedTextNode(node) {
    return node instanceof CcfExtendedTextNode;
}
/**
* Return text node with additional styles
* @returns HTMLElement
* @example patchStyleConversion(node)
*/
export function patchStyleConversion(originalDOMConverter) {
    return (node) => {
        const original = originalDOMConverter === null || originalDOMConverter === void 0 ? void 0 : originalDOMConverter(node);
        if (!original) {
            return null;
        }
        const originalOutput = original.conversion(node);
        if (!originalOutput) {
            return originalOutput;
        }
        //Below is the logic to apply the required styles
        const backgroundColor = node.style.backgroundColor;
        const color = node.style.color;
        const fontFamily = node.style.fontFamily;
        const fontWeight = node.style.fontWeight;
        const fontSize = node.style.fontSize;
        const textDecoration = node.style.textDecoration;
        const border = node.style.border;
        return Object.assign(Object.assign({}, originalOutput), { forChild: (lexicalNode, parent) => {
                var _a;
                const originalForChild = (_a = originalOutput === null || originalOutput === void 0 ? void 0 : originalOutput.forChild) !== null && _a !== void 0 ? _a : ((x) => x);
                const result = originalForChild(lexicalNode, parent);
                if ($isTextNode(result)) {
                    const style = [
                        backgroundColor ? `background-color: ${backgroundColor}` : null,
                        color ? `color: ${color}` : null,
                        fontFamily ? `font-family: ${fontFamily}` : null,
                        fontWeight ? `font-weight: ${fontWeight}` : null,
                        fontSize ? `font-size: ${fontSize}` : null,
                        textDecoration ? `text-decoration: ${textDecoration}` : null,
                        border ? `border: ${border}` : null
                    ]
                        .filter((value) => value != null)
                        .join('; ');
                    if (style.length) {
                        return result.setStyle(style);
                    }
                }
                return result;
            } });
    };
}
//# sourceMappingURL=ccf-extended-text-node.js.map