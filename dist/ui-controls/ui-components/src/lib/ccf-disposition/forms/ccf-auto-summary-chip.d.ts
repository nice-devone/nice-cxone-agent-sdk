import { DispositionData } from '../ccf-disposition-slice';
export interface AutoSummaryChipProps {
    activeDisposition: DispositionData | null;
    isFinalSummaryGenerated?: boolean;
}
/**
 * Function to return the AutoSummaryStatus chip
 * @param activeDisposition - current active disposition object
 * @returns - AutoSummaryStatus chip UX
 * @example - AutoSummaryStatusChip(activeDisposition)
 */
export declare const CcfAutoSummaryChip: (props: AutoSummaryChipProps) => JSX.Element | null;
export default CcfAutoSummaryChip;
