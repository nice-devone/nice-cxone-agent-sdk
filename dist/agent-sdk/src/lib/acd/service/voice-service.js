import { HttpUtilService, Logger, HttpClient, ACDSessionManager, ApiUriConstants, } from '@nice-devone/core-sdk';
/**
 * Class to handling voice controls
 */
export class VoiceService {
    /**
     * @example
     * ```
     * const voiceSvc = new VoiceService();
     * ```
     */
    constructor() {
        this.logger = new Logger('acd', 'VoiceService');
        this.utilService = new HttpUtilService();
        this.acdSession = {};
        this.isAddContactInProgress = false;
        this.TRANSFER_VOICE_MAIL_SKILL = '/InContactAPI/services/V4.0/agent-sessions/{sessionId}/interactions/{contactId}/transfer-voicemail-to-skill';
        this.acdSession = ACDSessionManager.instance;
    }
    /**
     * Method to place an outbound call
     * @param contactDetails - it contains properties like phone no, skill id and parentContactId
     * @example -
     * ```
     * dialPhone(contactDetails);
     * ```
     */
    dialPhone(dialPhoneRequest) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.DIAL_PHONE_URI.replace('{sessionId}', sessionId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: dialPhoneRequest,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('dialPhone', 'call make success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('dialPhone', 'call make failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to send the dtmf
     * @param sendDtmfRequest - it contains properties like dtmf sequence, tone duration and tone spacing
     * @example
     * ```
     * sendDtmf(sendDtmfRequest);
     * ```
     */
    sendDtmf(sendDtmfRequest) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.SEND_DTMF.replace('{sessionId}', sessionId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: sendDtmfRequest,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('sendDtmf', 'send dtmf success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('sendDtmf', 'send dtmf failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
     * Method to make a consult to agent
     * @param agentId - agent id
     * @example
     * ```
     * consultAgent(12345)
     * ```
     */
    consultAgent(agentId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.CONSULT_AGENT_URI.replace('{sessionId}', sessionId);
        const targetAgentId = {
            targetAgentId: agentId.toString(),
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: targetAgentId,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('consultAgent', 'consult agent call success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('consultAgent', 'consult agent call failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /** Method to make the conference call
     * @example -
     * ```
     * conferenceCall();
     * ```
     */
    conferenceCall() {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.CONFERENCE_CALL_URI.replace('{sessionId}', sessionId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('conferenceCall', 'conferenceCall success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('conferenceCall', 'conferenceCall failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
    * This method to make a call with agent
    * @param agentId - agent Id
    * @param parentContactId - existing call contact id
    * @example -
    * ```
    * dialAgent('23344','234234324');
    * ```
    */
    dialAgent(agentId, parentContactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.DIAL_AGENT_URI.replace('{sessionId}', sessionId);
        const payloadData = {
            targetAgentId: agentId,
            parentContactId: parentContactId,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: payloadData,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('dialAgent', 'dial Agent success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('dialAgent', 'dial Agent failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method to make a call with another skill
     * @param skillId - skill Id
     * @example -
     * ```
     * dialSkill(23344);
     * ```
     */
    dialSkill(skillId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.DIAL_SKILL_URI.replace('{sessionId}', sessionId);
        const payloadData = {
            skillId: skillId,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: payloadData,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('dialSkill', 'dial Skill success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('dialSkill', 'dial Skill failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     *  This method to transfer call
     *
     *  @example -
     * ```
     * transferContact();
     * ```
     */
    transferContact() {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const url = baseUrl + ApiUriConstants.TRANSFER_CONTACT_URI.replace('{sessionId}', sessionId);
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('transferContact', 'transfer call contact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('transferContact', 'transfer call contact failed:-' + error.toString());
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
     *  This method will be triggered when requested for a new contact
     *
     *  @example -
     * ```
     * requestInteraction();
     * ```
     */
    requestInteraction(routabilityObject) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const url = baseUrl + ApiUriConstants.ADD_CONTACT_URI.replace('{sessionId}', sessionId);
        const authToken = this.acdSession.accessToken;
        const payloadData = JSON.parse(routabilityObject);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: payloadData,
        };
        if (this.isAddContactInProgress) {
            return Promise.resolve({ status: 400, statusText: 'Request Already Sent' });
        }
        this.isAddContactInProgress = true;
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('addContact', 'Request Interaction success:-' + response.toString());
                this.isAddContactInProgress = false;
                resolve(response);
            }, (error) => {
                this.logger.error('addContact', 'Request Interaction  failed:-' + error.toString());
                this.isAddContactInProgress = false;
                reject(error);
            });
        });
    }
    /**
     *  Method to transfer voicemail to skill
     *
     *  @example -
     * ```
     * transferVoicemailSkill("123", "234");
     * ```
     */
    transferVoicemailSkill(contactId, skillId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const url = baseUrl +
            this.TRANSFER_VOICE_MAIL_SKILL.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { targetSkillId: skillId },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                this.logger.error('transferVoicemailSkill', 'transfer voicemail to skill failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /** Method to hold the conference call
     * @example -
     * ```
     * conferenceHold();
     * ```
     */
    conferenceHold(conferenceNo) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.CONFERENCE_HOLD_URI
            .replace('{sessionId}', sessionId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { conferenceNo: conferenceNo },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('conferenceHold', 'conferenceHold success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('conferenceHold', 'conferenceHold failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /** Method to resume the conference call
     * @example -
     * ```
     * conferenceResume();
     * ```
     */
    conferenceResume(conferenceNo) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.CONFERENCE_RESUME_URI
            .replace('{sessionId}', sessionId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { conferenceNo: conferenceNo },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('conferenceResume', 'conferenceResume success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('conferenceResume', 'conferenceResume failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /** Method to join in to the conference call
     * @example -
     * ```
     * conferenceJoin();
     * ```
     */
    conferenceJoin(contactId, conferenceNo) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.CONFERENCE_JOIN_URI
            .replace('{sessionId}', sessionId)
            .replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { conferenceNo: conferenceNo },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('conferenceJoin', 'conferenceJoin success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('conferenceJoin', 'conferenceJoin failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /** Send the continue reskill API
     * @example -
     * ```
     * sendContinueReskill();
     * ```
     */
    sendContinueReskill(continueReskill) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.CONTINUE_RESKILL.replace('{sessionId}', sessionId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { continueReskill: continueReskill },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('sendContinueReskill', 'sendContinueReskill success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('sendContinueReskill', 'sendContinueReskill failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
}
//# sourceMappingURL=voice-service.js.map