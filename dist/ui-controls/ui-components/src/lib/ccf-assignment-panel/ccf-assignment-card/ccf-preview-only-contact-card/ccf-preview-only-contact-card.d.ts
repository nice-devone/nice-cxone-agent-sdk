/**
 * Interface for defining props of CcfPreviewOnlyContactCard component
 */
interface CcfPreviewOnlyContactProps {
    /**
     * @remarks - caseId of the preview only case
     */
    caseId: string;
    interactionId: string;
}
/**
 * Component to display card for preview only contact
 * ```
 * @example-
 * <CcfPreviewOnlyContactCard />
 * ```
 */
export declare const CcfPreviewOnlyContactCard: (props: CcfPreviewOnlyContactProps) => JSX.Element;
export {};
