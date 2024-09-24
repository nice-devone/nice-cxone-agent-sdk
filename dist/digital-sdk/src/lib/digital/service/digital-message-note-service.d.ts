import { CXoneMessageNote, CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Service to handle message notes
 */
export declare class DigitalMessageNoteService {
    logger: CcfLogger;
    protected utilService: HttpUtilService;
    private auth;
    private CREATE_NOTE;
    private UPDATE_NOTE;
    private DELETE_NOTE;
    /**
       * @example
       * ```
       * const digitalMessageNoteSvc = new DigitalMessageNoteService();
       * ```
       */
    constructor();
    /**
     * Method to create note
     * @returns - object with notes creation details
     * @param messageId -  message id for which the note is created
     * @param content -  content of the note
     * @example - digitalService.createMessageNote('382a92bf-913b-4d7b-9190-7c3a17c42fe0', 'content')
     */
    createMessageNote(messageId: string, content: string): Promise<CXoneMessageNote | CXoneSdkError>;
    /**
     * Method to update notes
     * @returns - object with notes updation details
     * @param messageId -  message id for which the note is created
     * @param content -  content of the note
     * @param noteId -  id of the note
     * @example - digitalService.updateMessageNote('382a92bf-913b-4d7b-9190-7c3a17c42fe0', 'content', '3241')
     */
    updateMessageNote(messageId: string, content: string, noteId: string): Promise<CXoneMessageNote | CXoneSdkError>;
    /**
     * Method to delete notes
     * @returns - No response
     * @param messageId -  message id for which the note is created
     * @param noteId -  id of the note
     * @example - digitalService.deleteMessageNote('382a92bf-913b-4d7b-9190-7c3a17c42fe0','3245')
     */
    deleteMessageNote(messageId: string, noteId: string): Promise<HttpResponse | CXoneSdkError>;
}
