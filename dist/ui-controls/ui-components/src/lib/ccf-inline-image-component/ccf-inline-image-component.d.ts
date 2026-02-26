import type { LexicalEditor, NodeKey } from 'lexical';
import { Position } from '../ccf-editor/ccf-inline-image-plugin/ccf-inline-image-node';
/**
 * Custom hook for handling image loading with suspense.
 * @param src - Source of the image.
 * @example - useSuspenseImage
 */
export declare function useSuspenseImage(src: string): void;
/**
 * Inline image component for the CCF Editor Toolbar Plugin.
 * @param src - Source of the image.
 * @param altText - Alternative text for the image.
 * @param nodeKey - Key of the node.
 * @param width - Width of the image.
 * @param height - Height of the image.
 * @param showCaption - Whether to show the caption.
 * @param caption - LexicalEditor for the caption.
 * @param position - Position of the image.
 * @param uploadedImageId - ID of the uploaded image.
 * @example - InlineImageComponent
 */
export default function CcfInlineImageComponent({ src, altText, nodeKey, width, height, showCaption, caption, uploadedImageId, position, }: {
    altText: string;
    caption: LexicalEditor;
    height: 'inherit' | number;
    nodeKey: NodeKey;
    showCaption: boolean;
    src: string;
    width: 'inherit' | number;
    position: Position;
    uploadedImageId?: string;
}): JSX.Element;
