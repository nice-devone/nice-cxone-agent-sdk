/// <reference types="react" />
export interface CcfAgentChatToolbarProps {
    styles: {
        toolbar: object;
        button: object;
    };
    onBoldClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onItalicClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onUnderLineClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    hightlightBtn?: boolean;
    highlightUnderlineBtn?: boolean;
    hightlightItalicBtn?: boolean;
}
/**
 * Component displays Rich text Editor controls
 * @returns Rich text Editor controls
 * ```
 * @example
 * <CcfAgentChatToolbar/>
 * ```
 */
export declare function CcfAgentChatToolbar(props: CcfAgentChatToolbarProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfAgentChatToolbar>;
export default _default;
