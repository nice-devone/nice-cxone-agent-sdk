/// <reference types="react" />
export interface CcfDispositionInteractionProps {
    showDispositionHeaderWhenCollapsed: boolean;
}
/**
 * Function to validate retry number
 * @returns - boolean
 * @example - validateRetryNumber(9991112222)
 * The API used to schedule a dialer retry uses a unique phone number validation, that is matched here.
 * Since he platform uses servral variations, that its APIs use, for phone number validations a
 * standard cannot be used in CXA until those validations are unified.
 */
export declare function validateRetryNumber(retryNumber: string | undefined): boolean;
/**
 * Component displays dispositions with multiple options to mark it as resolved
 * @param props - none
 * @returns displays dispositions with multiple options to mark it as resolved
 * @example <CcfDispositionInteraction/>
 */
export declare const CcfDispositionInteraction: (props: CcfDispositionInteractionProps) => JSX.Element | null;
declare const _default: import("react").MemoExoticComponent<(props: CcfDispositionInteractionProps) => JSX.Element | null>;
export default _default;
