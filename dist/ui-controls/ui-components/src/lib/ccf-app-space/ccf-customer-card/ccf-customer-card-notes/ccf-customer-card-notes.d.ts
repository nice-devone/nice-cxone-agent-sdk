/// <reference types="react" />
export interface CcfCustomerCardNotesProps {
    enableNewNoteBtn: React.Dispatch<React.SetStateAction<boolean>>;
    isNewNote: boolean;
    customerId: string;
}
/**
 * CcfCustomerCardNotes- used to display customer notes and to post new notes
 * @param props -?-CcfCustomerCardNotesProps
 * @example <CcfCustomerCardNotes />
 */
export declare function CcfCustomerCardNotes(props: CcfCustomerCardNotesProps): JSX.Element;
