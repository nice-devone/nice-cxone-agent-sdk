/// <reference types="react" />
import { CustomerCardNote } from '@nice-devone/common-sdk';
/**
 * CcfCustomerNewNoteProps -
 * used to accept props for new/edit note
 */
export interface CcfCustomerNewNoteProps {
    /**
    * @remarks - updateNoteState accepts boolean value to update the state of the overflow and + button
    */
    enableNewNoteBtn: React.Dispatch<React.SetStateAction<boolean>>;
    /**
     * @remarks - noteContent contains the object for the new/edit note of type CustomerCardNote
     */
    noteContent: CustomerCardNote;
    customerId: string;
}
/**
 * CcfCustomerCardNewNote - used to display Ui for putting up a new note
 * @param props -?-CcfCustomerNewNoteProps
 * @example <CcfCustomerCardNewNote />
 */
export declare function CcfCustomerCardNewNote(props: CcfCustomerNewNoteProps): JSX.Element;
export default CcfCustomerCardNewNote;
