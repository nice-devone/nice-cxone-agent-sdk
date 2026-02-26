/// <reference types="react" />
/**
 * Interface for Interaction Reply
 */
interface CcfInteractionReplyProps {
    /**
     * width for Text Field
     */
    textFieldWidth: string;
}
/**
 * Component to show the text field with option to add emoji and align text for bulk interactions message.
 * @example
 * ```
 * <CcfInteractionReply />
 * ```
 */
export declare const CcfInteractionReply: (props: CcfInteractionReplyProps) => JSX.Element;
declare const _default: import("react").MemoExoticComponent<(props: CcfInteractionReplyProps) => JSX.Element>;
export default _default;
