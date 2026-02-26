/// <reference types="react" />
/**
 * Interface typedoc for props - CcfRejectedReason Component
 */
export interface CcfRejectedReasonProps {
    /**
      * @remarks - case ID associated with the rejected reason
    */
    caseId: string;
    /**
    * @remarks - draft message ID associated with the rejected reason
  */
    draftMessageId: string;
    /**
      * @remarks - method to close the rejected reason box
    */
    onClose: (event: React.SyntheticEvent) => void;
    /**
       * @remarks - method user to submit the rejected reason
     */
    onSubmit: (reason?: string) => void;
}
/**
 * Component display rejected reason box
 * @returns JSX.Element
 * @param props - props for CcfRejectedReason component
 * ```
 * @example
 * <CcfRejectedReason caseId="123" draftMessageId="456" onClose={() => {}} onSubmit={(reason) => {}}/>
 * ```
 */
export declare function CcfRejectedReason(props: CcfRejectedReasonProps): JSX.Element;
