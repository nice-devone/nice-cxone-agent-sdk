interface CcfReactionCounterProps {
    count: number;
    iconList?: Array<JSX.Element>;
    counterStyles?: object;
    text?: JSX.Element;
}
/**
 * Used to show ration counter with count text and reaction icons passed
 * @returns
 * @example -
 * ```
 * <CcfReactionCounter count={12} iconList=[<icon />]/>
 * ```
 */
export declare const CcfReactionCounter: (props: CcfReactionCounterProps) => JSX.Element;
export {};
