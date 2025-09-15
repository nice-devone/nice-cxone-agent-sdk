import { CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to handle Transcript API calls
 */
export declare class TranscriptService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    /**
    * @example
    */
    constructor();
    /**
     * Method to send the transcript to the specified email
     * @param contactId - contactId of the patron whose transcript needs to be sent
     * @param email - email of the patron to whom transcript needs to be sent
     * @returns - Returns Success/Failure of the API
     * @example - sendTranscript(demo\@test.com)
     */
    sendTranscript(contactId: string, email: string): Promise<HttpResponse | CXoneSdkError>;
}
