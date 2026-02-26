import { MessageKebabMenu } from '../../ccf-assignment-panel/ccf-assignment-utils';
/**
 * Interface for CcfMessageActionConfirmationDialogProps
 */
export interface CcfMessageActionConfirmationDialogProps {
    /**
     * @remarks - message Id
   */
    messageId: string;
    /**
   * @remarks - case Id
 */
    caseId: string;
    /**
     * @remarks - interaction Id
     *
   */
    interactionId: string;
    /**
      * @remarks - action
    */
    action: MessageKebabMenu;
    /**
      * @remarks - is open or not
    */
    isOpen: boolean;
    /**
     * @remarks - is previous case message or not
   */
    isPreviousCaseMessage?: boolean;
    /**
     * @remarks - is next case message or not
   */
    isNextCaseMessage?: boolean;
    /**
      * @remarks - callback cancel click method
    */
    onCancelClick: () => void;
}
/**
 * Component displays  message action confirmation dialog
 * @returns message action confirmation dialog
 * @example -
 * ```
 * <CcfMessageActionConfirmationDialog  isOpen={true} onCancelClick={onCancel}/>
 * ```
 */
export declare function CcfMessageActionConfirmationDialog(props: CcfMessageActionConfirmationDialogProps): JSX.Element;
