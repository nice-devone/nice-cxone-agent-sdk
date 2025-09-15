import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger, HttpClient, ApiUriConstants, } from '@nice-devone/core-sdk';
/**
 * Class to handle Transcript API calls
 */
export class TranscriptService {
    /**
    * @example
    */
    constructor() {
        this.logger = new Logger('transcript report', 'Transcript Service');
        this.utilService = new HttpUtilService();
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to send the transcript to the specified email
     * @param contactId - contactId of the patron whose transcript needs to be sent
     * @param email - email of the patron to whom transcript needs to be sent
     * @returns - Returns Success/Failure of the API
     * @example - sendTranscript(demo\@test.com)
     */
    sendTranscript(contactId, email) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.SEND_TRANSCRIPT.replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: {
                recipients: [
                    {
                        idOnExternalPlatform: email,
                    }
                ],
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('sendTranscript', 'Sent Transcript to patron Successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to send Transcript to patron', error);
                this.logger.error('sendTranscript', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
}
//# sourceMappingURL=transcript-service.js.map