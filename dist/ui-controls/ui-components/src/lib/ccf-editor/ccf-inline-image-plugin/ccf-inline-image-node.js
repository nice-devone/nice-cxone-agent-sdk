import { jsx as _jsx } from "react/jsx-runtime";
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { $applyNodeReplacement, createEditor, DecoratorNode, } from 'lexical';
import * as React from 'react';
import { Suspense } from 'react';
/**
 * Lazy load the CcfInlineImageComponent
 */
const CcfInlineImageComponent = React.lazy(() => import('../../ccf-inline-image-component/ccf-inline-image-component'));
/**
 * Conversion function to convert HTMLImageElement to InlineImageNode
 * @example - convertInlineImageElement
 * @param domNode - HTMLImageElement to convert
 * @returns null if not convertible, DOMConversionOutput otherwise
 */
export function convertInlineImageElement(domNode) {
    var _a;
    const img = domNode;
    if (img instanceof HTMLImageElement) {
        //Dev: If image is pasted from local system, then we are not allowing to paste the image as it gives the security issue.
        if ((_a = img === null || img === void 0 ? void 0 : img.src) === null || _a === void 0 ? void 0 : _a.startsWith('file:///')) {
            LocalStorageHelper.setItem(StorageKeys.IMAGE_PASTE_ERROR, 'true');
            return null;
        }
        const { alt: altText, src, width, height } = img;
        // At this point, we don't have the uploadedImageId, so we set it to an empty string
        const node = $createInlineImageNode({ altText, height, src, width, uploadedImageId: '' });
        return { node };
    }
    else {
        return null;
    }
}
/**
 * InlineImageNode class for handling Inline Image elements
 */
export class InlineImageNode extends DecoratorNode {
    /**
     * Constructor for InlineImageNode
     * @param src - Source of the image.
     * @param altText - Alternative text for the image.
     * @param position - Position of the image.
     * @param width - Width of the image.
     * @param height - Height of the image.
     * @param showCaption - Whether to show the caption.
     * @param caption - LexicalEditor for the caption.
     * @param key - Key of the node.
     * @example - InlineImageNode
     */
    constructor(src, altText, position, uploadedImageId, width, height, showCaption, caption, key) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__width = width || 'inherit';
        this.__height = height || 'inherit';
        this.__showCaption = showCaption || false;
        this.__caption = caption || createEditor();
        this.__position = position;
        this.__uploadedImageId = uploadedImageId;
    }
    /**
     * Static method to get the type of InlineImageNode
     * @returns 'inline-image'
     * @example - getType
     */
    static getType() {
        return 'inline-image';
    }
    /**
     * Static method to clone an InlineImageNode
     * @param node - Node to clone
     * @returns Cloned InlineImageNode
     * @example - clone
     */
    static clone(node) {
        return new InlineImageNode(node.__src, node.__altText, node.__position, node.__uploadedImageId, node.__width, node.__height, node.__showCaption, node.__caption, node.__key);
    }
    /**
     * Static method to import InlineImageNode from JSON
     * @param serializedNode - Serialized node to import
     * @returns Imported InlineImageNode
     * @example - importJSON
     */
    static importJSON(serializedNode) {
        const { altText, height, width, caption, src, showCaption, position, uploadedImageId } = serializedNode;
        const node = $createInlineImageNode({
            altText,
            height,
            position,
            showCaption,
            src,
            width,
            uploadedImageId,
        });
        const nestedEditor = node.__caption;
        const editorState = nestedEditor.parseEditorState(caption.editorState);
        if (!editorState.isEmpty()) {
            nestedEditor.setEditorState(editorState);
        }
        return node;
    }
    /**
     * Static method to define DOM conversion for InlineImageNode
     * @returns DOMConversionMap or null
     * @example - importDOM
     */
    static importDOM() {
        return {
            img: () => ({
                conversion: convertInlineImageElement,
                priority: 0,
            }),
        };
    }
    /**
     * Export InlineImageNode to DOM
     * @returns DOMExportOutput
     * @example - exportDOM
     */
    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('alt', this.__altText);
        element.setAttribute('width', this.__width.toString());
        element.setAttribute('height', this.__height.toString());
        element.setAttribute('data-uploaded-image-id', this.__uploadedImageId);
        return { element };
    }
    /**
     * Export InlineImageNode to JSON
     * @returns SerializedInlineImageNode
     * @example - exportJSON
     */
    exportJSON() {
        return {
            altText: this.getAltText(),
            caption: this.__caption.toJSON(),
            height: this.__height === 'inherit' ? 0 : this.__height,
            position: this.__position,
            showCaption: this.__showCaption,
            src: this.getSrc(),
            type: 'inline-image',
            version: 1,
            width: this.__width === 'inherit' ? 0 : this.__width,
            uploadedImageId: this.__uploadedImageId,
        };
    }
    /**
     * Getter for src property
     * @returns Source of the image
     * @example - getSrc
     */
    getSrc() {
        return this.__src;
    }
    /**
     * Getter for altText property
     * @returns Alternative text for the image
     * @example - getAltText
     */
    getAltText() {
        return this.__altText;
    }
    /**
     * Setter for altText property
     * @param altText - New alternative text
     * @example - setAltText
     */
    setAltText(altText) {
        const writable = this.getWritable();
        writable.__altText = altText;
    }
    /**
     * Setter for width and height properties
     * @param width - New width of the image
     * @param height - New height of the image
     * @example - setWidthAndHeight
     */
    setWidthAndHeight(width, height) {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }
    /**
     * Getter for showCaption property
     * @returns Whether to show the caption
     * @example - getShowCaption
     */
    getShowCaption() {
        return this.__showCaption;
    }
    /**
     * Setter for showCaption property
     * @param showCaption - Whether to show the caption
     * @example - setShowCaption
     */
    setShowCaption(showCaption) {
        const writable = this.getWritable();
        writable.__showCaption = showCaption;
    }
    /**
     * Getter for position property
     * @returns Position of the image
     * @example - getPosition
     */
    getPosition() {
        return this.__position;
    }
    /**
     * Setter for position property
     * @param position - New position of the image
     * @example - setPosition
     */
    setPosition(position) {
        const writable = this.getWritable();
        writable.__position = position;
    }
    /**
     * Create DOM element for InlineImageNode
     * @param config - Editor configuration
     * @returns Created DOM element
     * @example - createDOM
     */
    createDOM(config) {
        const span = document.createElement('span');
        const className = `${config.theme.inlineImage} position-${this.__position}`;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }
    /**
     * Update DOM element for InlineImageNode
     * @param prevNode - Previous state of the node
     * @param dom - Current DOM element
     * @param config - Editor configuration
     * @returns false
     * @example - updateDOM
     */
    updateDOM(prevNode, dom, config) {
        const position = this.__position;
        if (position !== prevNode.__position) {
            const className = `${config.theme.inlineImage} position-${position}`;
            if (className !== undefined) {
                dom.className = className;
            }
        }
        return false;
    }
    /**
     * Decorate method for rendering InlineImageNode
     * @returns JSX element for rendering
     * @example - decorate
     */
    decorate() {
        return (_jsx(Suspense, Object.assign({ fallback: null }, { children: _jsx(CcfInlineImageComponent, { src: this.__src, altText: this.__altText, width: this.__width, height: this.__height, nodeKey: this.getKey(), showCaption: this.__showCaption, caption: this.__caption, position: this.__position, uploadedImageId: this.__uploadedImageId }) })));
    }
}
/**
 * Factory function to create InlineImageNode
 * @param payload - Payload for creating InlineImageNode
 * @returns Created InlineImageNode
 * @example - $createInlineImageNode
 */
export function $createInlineImageNode({ altText, position, height, src, width, showCaption, caption, key, uploadedImageId, }) {
    return $applyNodeReplacement(new InlineImageNode(src, altText, position, uploadedImageId, width, height, showCaption, caption, key));
}
/**
 * Function to check if a node is an InlineImageNode
 * @param node - Node to check
 * @returns Whether the node is an InlineImageNode
 * @example - $isInlineImageNode
 */
export function $isInlineImageNode(node) {
    return node instanceof InlineImageNode;
}
//# sourceMappingURL=ccf-inline-image-node.js.map