import { MediaType } from '@nice-devone/common-sdk';
import { DispositionData } from '../ccf-disposition/ccf-disposition-slice';
interface Props {
    mediaType?: MediaType;
    activeDisposition?: DispositionData | null;
}
/**
 * Component to show an overlay of with loader
 * circle and text
 * @example - <CcfAutoSummaryProgressBar />
 * @returns
 */
declare const CcfAutoSummaryProgressBar: ({ activeDisposition, mediaType }: Props) => JSX.Element;
export default CcfAutoSummaryProgressBar;
