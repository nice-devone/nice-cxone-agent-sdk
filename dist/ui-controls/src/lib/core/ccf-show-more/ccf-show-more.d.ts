/// <reference types="react" />
/**
 * Interface for ccfShowMore control props
 * text - text for the control
 * onClick - onclick event handler
 */
export interface CcfShowMoreProps {
    text: string;
    onClick?: () => void;
}
/**
 * USe to render the show more control
 * @returns - JSX element
 * @example
 * ```
 * <CcfShowMore />
 * ```
 */
export declare const CcfShowMore: React.FunctionComponent<CcfShowMoreProps>;
