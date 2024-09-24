import { HttpUtilService, Logger, HttpClient, ACDSessionManager, ApiUriConstants, } from '@nice-devone/core-sdk';
/**
 * Class to handling voice controls
 */
export class VoiceControlService {
    /**
     * @example
     * ```
     * const voiceControlSvc = new VoiceControlService();
     * ```
     */
    constructor() {
        this.logger = new Logger('acd', 'VoiceControlService');
        this.utilService = new HttpUtilService();
        this.acdSession = {};
        this.acdSession = ACDSessionManager.instance;
    }
    /**
     * Method to hold the active contact
     * @param contactId - Active contactId
     * @example
     * ```
     * holdContact(123);
     * ```
     */
    holdContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.HOLD_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('holdContact', 'hold contact success');
                resolve(response);
            }, (error) => {
                this.logger.error('holdContact', 'hold contact failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to resume the holding contact
     * @param contactId - holding contactId
     * @example
     * ```
     * resumeContact(123);
     * ```
     */
    resumeContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.RESUME_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('resumeContact', 'resume contact success');
                resolve(response);
            }, (error) => {
                this.logger.error('resumeContact', 'resume contact failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to mute the agent
     * @example
     * ```
     * muteAgent();
     * ```
     */
    muteAgent() {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.MUTE_AGENT_URI.replace('{sessionId}', sessionId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('muteAgent', 'mute agent success');
                resolve(response);
            }, (error) => {
                this.logger.error('muteAgent', 'mute agent failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to unmute the agent
     * @example
     * ```
     * unmuteAgent();
     * ```
     */
    unmuteAgent() {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.UNMUTE_AGENT_URI.replace('{sessionId}', sessionId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('unmuteAgent', 'unmute agent success');
                resolve(response);
            }, (error) => {
                this.logger.error('unmuteAgent', 'unmute agent failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to mask a call
     * @param contactId - contact Id
     * @example -
     * ```
     * maskCall(contactId);
     * ```
     */
    maskCall(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.MASK_CALL_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('maskCall', 'mask call success');
                resolve(response);
            }, (error) => {
                this.logger.error('maskCall', 'mask call failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to stop masking a call
     * @param contactId - contact Id
     * @example -
     * ```
     * unmaskCall(contactId);
     * ```
     */
    unmaskCall(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.UNMASK_CALL_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('unmaskCall', 'unmask call success');
                resolve(response);
            }, (error) => {
                this.logger.error('unmaskCall', 'unmask call failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to record a call
     * @param contactId - contact Id
     * @example -
     * ```
     * recordCall(contactId);
     * ```
     */
    recordCall(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.RECORD_CALL_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('recordCall', 'record call success');
                resolve(response);
            }, (error) => {
                this.logger.error('recordCall', 'record call failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method to end the contact
     * @param contactId -  contact id
     * @example
     * ```
     * endContact(23423423);
     * ```
     */
    endContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl +
            ApiUriConstants.END_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('endContact', 'end contact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('endContact', 'end contact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     *  Method to transfer voicemail
     *
     *  @example -
     * ```
     * transferVoicemailContact("123", "234");
     * ```
     */
    transferVoicemailContact(contactId, agentId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const url = baseUrl +
            ApiUriConstants.TRANSFER_VOICEMAIL_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { targetAgentId: agentId },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('transferVoicemailContact', 'transfer voicemail contact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('transferVoicemailContact', 'transfer voicemail contact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method will play a voicemail contact audio at the specified position
     * @param contactId -  contact id
     * @param playTimeStamp - Include date/time in audio playback
     * @param position -  Position of the wav file at a specified second
     * @example
     * ```
     * playVoiceMail(23423423, true, 50);
     * ```
     *
     */
    playVoiceMail(contactId, playTimeStamp, position) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { playtimestamp: playTimeStamp, position: position },
        };
        const url = baseUrl + ApiUriConstants.PLAY_VOICEMAIL
            .replace('{sessionId}', sessionId)
            .replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('playVoiceMail', 'play voicemail success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('playVoiceMail', 'play voicemail failed:-' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=voice-control-service.js.map