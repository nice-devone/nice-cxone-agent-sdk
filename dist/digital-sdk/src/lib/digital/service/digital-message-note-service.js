import { CXoneAuth } from '@nice-devone/auth-sdk';
import { HttpClient, HttpUtilService } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Service to handle message notes
 */
export class DigitalMessageNoteService {
    /**
       * @example
       * ```
       * const digitalMessageNoteSvc = new DigitalMessageNoteService();
       * ```
       */
    constructor() {
        this.logger = new CcfLogger('SDK', 'DigiMessageNoteSvc');
        this.utilService = new HttpUtilService();
        this.CREATE_NOTE = '/dfo/3.0/messages/messageId/notes';
        this.UPDATE_NOTE = '/dfo/3.0/messages/messageId/notes/noteId';
        this.DELETE_NOTE = '/dfo/3.0/messages/messageId/notes/noteId';
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to create note
     * @returns - object with notes creation details
     * @param messageId -  message id for which the note is created
     * @param content -  content of the note
     * @example - digitalService.createMessageNote('382a92bf-913b-4d7b-9190-7c3a17c42fe0', 'content')
     */
    createMessageNote(messageId, content) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.CREATE_NOTE.replace('messageId', messageId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: {
                content: content,
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('createMessageNote', 'message note created');
                resolve(response.data);
            }, (error) => {
                this.logger.error('createMessageNote', 'message note creation failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to update notes
     * @returns - object with notes updation details
     * @param messageId -  message id for which the note is created
     * @param content -  content of the note
     * @param noteId -  id of the note
     * @example - digitalService.updateMessageNote('382a92bf-913b-4d7b-9190-7c3a17c42fe0', 'content', '3241')
     */
    updateMessageNote(messageId, content, noteId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.UPDATE_NOTE.replace('messageId', messageId).replace('noteId', noteId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: {
                content: content,
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                this.logger.info('updateMessageNote', 'message note updated');
                resolve(response.data);
            }, (error) => {
                this.logger.error('updateMessageNote', 'message note updation failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to delete notes
     * @returns - No response
     * @param messageId -  message id for which the note is created
     * @param noteId -  id of the note
     * @example - digitalService.deleteMessageNote('382a92bf-913b-4d7b-9190-7c3a17c42fe0','3245')
     */
    deleteMessageNote(messageId, noteId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.DELETE_NOTE.replace('messageId', messageId).replace('noteId', noteId);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => {
                this.logger.info('deleteMessageNote', 'message note deleted');
                resolve(response.data);
            }, (error) => {
                this.logger.error('deleteMessageNote', 'message note deletion failed :-' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=digital-message-note-service.js.map