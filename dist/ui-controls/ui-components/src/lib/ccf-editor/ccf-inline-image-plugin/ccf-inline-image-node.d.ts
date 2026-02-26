import type { DOMConversionMap, DOMConversionOutput, DOMExportOutput, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedEditor, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
/**
 * Define the possible positions for the InlineImage
 */
export declare type Position = 'left' | 'right' | 'full' | undefined;
/**
 * Interface representing the properties of an Inline Image Payload.
 */
export interface InlineImagePayload {
    altText: string;
    caption?: LexicalEditor;
    height?: number;
    key?: NodeKey;
    showCaption?: boolean;
    src: string;
    width?: number;
    position?: Position;
    uploadedImageId: string;
}
/**
 * Conversion function to convert HTMLImageElement to InlineImageNode
 * @example - convertInlineImageElement
 * @param domNode - HTMLImageElement to convert
 * @returns null if not convertible, DOMConversionOutput otherwise
 */
export declare function convertInlineImageElement(domNode: Node): null | DOMConversionOutput;
/**
 * Define the structure of serialized InlineImageNode
 */
export declare type SerializedInlineImageNode = Spread<{
    altText: string;
    caption: SerializedEditor;
    height?: number;
    showCaption: boolean;
    src: string;
    width?: number;
    position?: Position;
    uploadedImageId: string;
}, SerializedLexicalNode>;
/**
 * InlineImageNode class for handling Inline Image elements
 */
export declare class InlineImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width: 'inherit' | number;
    __height: 'inherit' | number;
    __showCaption: boolean;
    __caption: LexicalEditor;
    __position: Position;
    __uploadedImageId: string;
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
    constructor(src: string, altText: string, position: Position, uploadedImageId: string, width?: 'inherit' | number, height?: 'inherit' | number, showCaption?: boolean, caption?: LexicalEditor, key?: NodeKey);
    /**
     * Static method to get the type of InlineImageNode
     * @returns 'inline-image'
     * @example - getType
     */
    static getType(): string;
    /**
     * Static method to clone an InlineImageNode
     * @param node - Node to clone
     * @returns Cloned InlineImageNode
     * @example - clone
     */
    static clone(node: InlineImageNode): InlineImageNode;
    /**
     * Static method to import InlineImageNode from JSON
     * @param serializedNode - Serialized node to import
     * @returns Imported InlineImageNode
     * @example - importJSON
     */
    static importJSON(serializedNode: SerializedInlineImageNode): InlineImageNode;
    /**
     * Static method to define DOM conversion for InlineImageNode
     * @returns DOMConversionMap or null
     * @example - importDOM
     */
    static importDOM(): DOMConversionMap | null;
    /**
     * Export InlineImageNode to DOM
     * @returns DOMExportOutput
     * @example - exportDOM
     */
    exportDOM(): DOMExportOutput;
    /**
     * Export InlineImageNode to JSON
     * @returns SerializedInlineImageNode
     * @example - exportJSON
     */
    exportJSON(): SerializedInlineImageNode;
    /**
     * Getter for src property
     * @returns Source of the image
     * @example - getSrc
     */
    getSrc(): string;
    /**
     * Getter for altText property
     * @returns Alternative text for the image
     * @example - getAltText
     */
    getAltText(): string;
    /**
     * Setter for altText property
     * @param altText - New alternative text
     * @example - setAltText
     */
    setAltText(altText: string): void;
    /**
     * Setter for width and height properties
     * @param width - New width of the image
     * @param height - New height of the image
     * @example - setWidthAndHeight
     */
    setWidthAndHeight(width: 'inherit' | number, height: 'inherit' | number): void;
    /**
     * Getter for showCaption property
     * @returns Whether to show the caption
     * @example - getShowCaption
     */
    getShowCaption(): boolean;
    /**
     * Setter for showCaption property
     * @param showCaption - Whether to show the caption
     * @example - setShowCaption
     */
    setShowCaption(showCaption: boolean): void;
    /**
     * Getter for position property
     * @returns Position of the image
     * @example - getPosition
     */
    getPosition(): Position;
    /**
     * Setter for position property
     * @param position - New position of the image
     * @example - setPosition
     */
    setPosition(position: Position): void;
    /**
     * Create DOM element for InlineImageNode
     * @param config - Editor configuration
     * @returns Created DOM element
     * @example - createDOM
     */
    createDOM(config: EditorConfig): HTMLElement;
    /**
     * Update DOM element for InlineImageNode
     * @param prevNode - Previous state of the node
     * @param dom - Current DOM element
     * @param config - Editor configuration
     * @returns false
     * @example - updateDOM
     */
    updateDOM(prevNode: InlineImageNode, dom: HTMLElement, config: EditorConfig): false;
    /**
     * Decorate method for rendering InlineImageNode
     * @returns JSX element for rendering
     * @example - decorate
     */
    decorate(): JSX.Element;
}
/**
 * Factory function to create InlineImageNode
 * @param payload - Payload for creating InlineImageNode
 * @returns Created InlineImageNode
 * @example - $createInlineImageNode
 */
export declare function $createInlineImageNode({ altText, position, height, src, width, showCaption, caption, key, uploadedImageId, }: InlineImagePayload): InlineImageNode;
/**
 * Function to check if a node is an InlineImageNode
 * @param node - Node to check
 * @returns Whether the node is an InlineImageNode
 * @example - $isInlineImageNode
 */
export declare function $isInlineImageNode(node: LexicalNode | null | undefined): node is InlineImageNode;
