import { __rest } from "tslib";
import { HttpUtilService, Logger, HttpClient, ACDSessionManager, ApiUriConstants, } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../../feature-toggle';
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
        this.TRANSFER_VOICE_MAIL_SKILL_TS = '/InContactAPI/services/V33.0/agent-sessions/{sessionId}/interactions/{contactId}/transfer-voicemail-to-skill';
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
        const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
        const isSmartReachVoicePmiEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-acd-smartreach-voice-pmi-OB-18214" /* FeatureToggles.SMARTREACH_VOICE_PMI_FEATURE_TOGGLE */);
        const endpointUri = isTenantSegmentationEnabled || isSmartReachVoicePmiEnabled ? ApiUriConstants.DIAL_PHONE_URI_TS : ApiUriConstants.DIAL_PHONE_URI;
        const url = baseUrl + endpointUri.replace('{sessionId}', sessionId);
        // `interactionId` is MCH-only: there is no DIAL_PHONE_URI_V35, so it is supplied only while the
        // MCH toggle is on (kill-switch parity with consultAgent()/dialAgent()).
        // `parentContactId` is NOT gated: it is part of the pre-26.4 contract (voicemail callback and
        // elevation both sent it), and the server needs it to link the new leg to its originating contact.
        const isMultiCallHandlingEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */);
        const { interactionId } = dialPhoneRequest, body = __rest(dialPhoneRequest, ["interactionId"]);
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: Object.assign(Object.assign({}, body), (isMultiCallHandlingEnabled && interactionId ? { interactionId } : {})),
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
    consultAgent(agentId, parentContactId, interactionId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + (FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */)
            ? ApiUriConstants.CONSULT_AGENT_URI_TS
            : ApiUriConstants.CONSULT_AGENT_URI).replace('{sessionId}', sessionId);
        // the MCH leg-association fields are gated behind the MCH toggle,
        // the same way conferenceCall() and transferContact() gate theirs. There is no
        // CONSULT_AGENT_URI_V35 — this request still goes to the unchanged v23 contract — so on a
        // tenant with MCH OFF these extra properties were being posted to an endpoint that never
        // declared them, and the kill switch could not revert it.
        const isMultiCallHandlingEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */);
        const targetAgentId = Object.assign(Object.assign({ targetAgentId: agentId.toString() }, (isMultiCallHandlingEnabled && parentContactId ? { parentContactId } : {})), (isMultiCallHandlingEnabled && interactionId ? { interactionId } : {}));
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
    conferenceCall(interactionId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const isMultiCallHandlingEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */);
        const useInteractionScopedApi = isMultiCallHandlingEnabled && !!interactionId;
        const url = baseUrl + (useInteractionScopedApi
            ? ApiUriConstants.CONFERENCE_CALL_URI_V35
            : ApiUriConstants.CONFERENCE_CALL_URI).replace('{sessionId}', sessionId);
        const reqInit = useInteractionScopedApi
            ? { headers: this.utilService.initHeader(authToken).headers, body: { interactionId } }
            : { headers: this.utilService.initHeader(authToken).headers };
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
    dialAgent(agentId, parentContactId, interactionId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + (FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */)
            ? ApiUriConstants.DIAL_AGENT_URI_TS
            : ApiUriConstants.DIAL_AGENT_URI).replace('{sessionId}', sessionId);
        // see consultAgent() above — there is no DIAL_AGENT_URI_V35 either,
        // so `interactionId` must not be added to this v33 body unless the MCH toggle is on.
        // `parentContactId` is NOT gated: it is part of the pre-existing 26.3.2 contract here.
        const payloadData = Object.assign({ targetAgentId: agentId, parentContactId: parentContactId }, (FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */)
            && interactionId ? { interactionId } : {}));
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
    * This method call to transfer voicemail to offline agent
    * @param agentId - agent Id
    * @param parentContactId - existing call contact id
    * @example -
    * ```
    * directVoicemailTransferToOfflineAgent('23344','234234324');
    * ```
    */
    directVoicemailTransferToOfflineAgent(agentId, parentContactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + ApiUriConstants.ATTENDANT_DIRECT_VOICEMAIL_TRANSFER_URI.replace('{sessionId}', sessionId);
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
                this.logger.info('directVoicemailTransferToOfflineAgent', 'direct Voicemail Transfer to Offline Agent success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('directVoicemailTransferToOfflineAgent', 'direct Voicemail Transfer to Offline Agent failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method to make a call with another skill
     * @param skillId - skill Id
     * @param parentContactId - optional, contact the consult leg is spun off from (MCH only)
     * @param interactionId - optional, interaction the consult leg belongs to (MCH only)
     * @example -
     * ```
     * dialSkill(23344);
     * ```
     */
    dialSkill(skillId, parentContactId, interactionId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
        const endpointUri = isTenantSegmentationEnabled ? ApiUriConstants.DIAL_SKILL_URI_TS : ApiUriConstants.DIAL_SKILL_URI;
        const url = baseUrl + endpointUri.replace('{sessionId}', sessionId);
        // MCH: associate the new consult leg with the tile it was started from, gated on the MCH
        // toggle exactly like consultAgent()/dialAgent()/dialPhone(). Without these the server cannot
        // attribute the skill-consult leg to the originating interaction in a multi-call session.
        const isMultiCallHandlingEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */);
        const payloadData = Object.assign(Object.assign({ skillId: skillId }, (isMultiCallHandlingEnabled && parentContactId ? { parentContactId } : {})), (isMultiCallHandlingEnabled && interactionId ? { interactionId } : {}));
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
    transferContact(interactionId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const isMultiCallHandlingEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */);
        const useInteractionScopedApi = isMultiCallHandlingEnabled && !!interactionId;
        const url = baseUrl + (useInteractionScopedApi
            ? ApiUriConstants.TRANSFER_CONTACT_URI_V35
            : ApiUriConstants.TRANSFER_CONTACT_URI).replace('{sessionId}', sessionId);
        const authToken = this.acdSession.accessToken;
        const reqInit = useInteractionScopedApi
            ? { headers: this.utilService.initHeader(authToken).headers, body: { interactionId } }
            : this.utilService.initHeader(authToken);
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
            (FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */)
                ? ApiUriConstants.TRANSFER_VOICEMAIL_CONTACT_URI_TS
                : ApiUriConstants.TRANSFER_VOICEMAIL_CONTACT_URI).replace('{sessionId}', sessionId).replace('{contactId}', contactId);
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
        const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
        const url = baseUrl +
            (isTenantSegmentationEnabled ? this.TRANSFER_VOICE_MAIL_SKILL_TS : this.TRANSFER_VOICE_MAIL_SKILL).replace('{sessionId}', sessionId).replace('{contactId}', contactId);
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