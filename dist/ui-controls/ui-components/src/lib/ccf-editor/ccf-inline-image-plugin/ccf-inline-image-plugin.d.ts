/// <reference types="react" />
import { LexicalCommand, LexicalEditor } from 'lexical';
import { InlineImagePayload } from './ccf-inline-image-node';
export declare type InsertInlineImagePayload = Readonly<InlineImagePayload>;
export declare const INSERT_INLINE_IMAGE_COMMAND: LexicalCommand<InsertInlineImagePayload>;
export interface CcfInlineImageButtonProps {
    activeEditor: LexicalEditor;
}
/**
 * Forwarding ref for CcfInsertInlineImageButton component.
 * @param ref - Reference to the component.
 * @example - CcfInsertInlineImageButton
 */
export declare const CcfInsertInlineImageButton: import("react").ForwardRefExoticComponent<CcfInlineImageButtonProps & import("react").RefAttributes<HTMLInputElement>>;
/**
 * Main CcfInlineImagePlugin component.
 * @param captionsEnabled - Flag to determine if captions are enabled.
 * @example - CcfInlineImagePlugin
 */
export default function CcfInlineImagePlugin({ captionsEnabled, }: {
    captionsEnabled?: boolean;
}): JSX.Element | null;
