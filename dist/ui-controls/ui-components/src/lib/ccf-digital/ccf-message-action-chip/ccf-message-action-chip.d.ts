export interface CcfMessageActionChipProps {
    /**
     * @remarks  size of chip
     */
    size: 'medium' | 'small';
    /**
     * @remarks - content inside the chip
     */
    label: string;
    /**
     * @remarks - style for the chip content
     */
    style: object;
}
/**
 * renders the chip
 * @param props - CcfMessageActionChipProps
 * @example <CcfMessageActionChip />
 * @returns
 */
export declare const CcfMessageActionChip: (props: CcfMessageActionChipProps) => JSX.Element;
