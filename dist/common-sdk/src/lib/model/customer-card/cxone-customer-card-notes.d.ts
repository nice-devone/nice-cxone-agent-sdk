import { CustomerCardUser } from './cxone-customer-card-note-user';
/**
 * Interface used as a Model for response JSON for customer note
 * customer note with case id , content, user, createdDate, updatedDate
 * ```
 * @example
 * Array<CustomerNotes>
 * ```
 */
export interface CustomerCardNote {
    /**
     * @remarks - 'caseId' - id of the digital case note has been tagged with.
     */
    caseId?: string;
    /**
     * @remarks - 'id' of the customer card note
     */
    id?: string;
    /**
     * @remarks - 'content' content of the customer card note
     */
    content?: string;
    /**
     * @remarks - 'user' CustomerCardUser-details of the user who has made created/update the customer card note
     */
    user?: CustomerCardUser;
    /**
     * @remarks - createdAt- Date when note created
     */
    createdAt?: string;
    /**
     * @remarks - updatedAt- Date when note created
     */
    updatedAt: string;
    /**
     * @remarks - editMode- if user is editing
     */
    editMode: boolean;
    /**
     * @remarks - used in UI as flg to update the state of create new note
     */
    noteCRUDState?: boolean;
    /**
     * @remarks - used in UI as flg to update the state of create new note
     */
    totalRecords?: number;
}
/**
 * Interface used as a Model for customer note
 * response containing links for pagination
 * ```
 * @example
 * LinksCustomerCardNote
 * ```
 */
export interface LinksCustomerCardNote {
    /**
     * @remarks - 'caseId' - id of the digital case note has been tagged with.
     */
    self?: string;
    /**
     * @remarks - 'id' of the customer card note
     */
    next?: string | null;
    /**
     * @remarks - 'content' content of the customer card note
     */
    previous?: string;
}
/**
 * Interface used as a Model for response JSON for customer note
 * with pagination links, data of results, and total records
 * ```
 * @example
 * CustomerCardNoteResponse
 * ```
 */
export interface CustomerCardNoteResponse {
    /**
     * @remarks - 'caseId' - id of the digital case note has been tagged with.
     */
    data?: CustomerCardNote;
    /**
     * @remarks - 'id' of the customer card note
     */
    _links?: LinksCustomerCardNote;
    /**
     * @remarks - 'content' content of the customer card note
     */
    totalRecords: number;
    /**
     * @remarks - 'user' CustomerCardUser-details of the user who has made created/update the customer card note
     */
    _context?: string[];
}
