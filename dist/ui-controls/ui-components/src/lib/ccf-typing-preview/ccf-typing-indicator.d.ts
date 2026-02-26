/// <reference types="react" />
export interface CcfTypingIndicatorProps {
    message?: string;
    icon?: React.ReactNode;
}
/**
 * Component to typing indicator and text preview
 * @example
 * @param props - CcfTypingIndicatorProps
 * @returns a wrapper containing message and icon
 * ```
 * @example
 * <CcfTypingIndicator />
 * ```
 */
export declare function CcfTypingIndicator(props: CcfTypingIndicatorProps): JSX.Element;
export default CcfTypingIndicator;
