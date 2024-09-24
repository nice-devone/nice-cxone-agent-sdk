import { HttpUtilService, Logger, HttpClient, ACDSessionManager, ApiUriConstants } from '@nice-devone/core-sdk';
import { amdOverrideType } from '../enum/amd-override-type';
/**
 * Class to handling contact services
 */
export class ContactService {
    /**
     * @example
     * ```
     * const contactSvc = new ContactService();
     * ```
     */
    constructor() {
        this.logger = new Logger('acd', 'ContactService');
        this.utilService = new HttpUtilService();
        this.acdSession = {};
        this.TRANSFER_WORK_ITEM_SKILL = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/transfer-work-item-to-skill';
        this.acdSession = ACDSessionManager.instance;
    }
    /**
     * Used to set the contact status to active
     * @param contactId -  contact id
     * @example
     * ```
     * activateContact(23423423);
     * ```
     */
    activateContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.ACTIVATE_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('activateContact', 'activateContact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('activateContact', 'activateContact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
     * Accept the incoming contact
     * @param contactId -  contact id
     * @example
     * ```
     * acceptContact(23423423);
     * ```
     */
    acceptContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.ACCEPT_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('acceptContact', 'acceptContact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('acceptContact', 'acceptContact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
     * Accept the incoming contact for consult
     * @param contactId -  contact id
     * @example
     * ```
     * acceptConsultContact(23423423);
     * ```
     */
    acceptConsultContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.ACCEPT_CONSULT_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('acceptConsultContact', 'acceptConsultContact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('acceptConsultContact', 'acceptConsultContact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
     * Reject the incoming contact
     * @param contactId -  contact id
     * @example
     * ```
     * rejectContact(23423423);
     * ```
     */
    rejectContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.REJECT_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('rejectContact', 'rejectContact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('rejectContact', 'rejectContact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Override AMD
     * @param contactId -  contact id
     * @param type - 'answeringMachine' | 'faxMachine' | 'badMachine'
     * @example
     * ```
     * amdOverride(23423423, 'answeringMachine')
     * ```
     */
    amdOverride(contactId, type) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.POST_AMD_OVERRIDE.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        reqInit.body = { type: amdOverrideType[type] };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('amdOverride', 'amdOverride success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('amdOverride', 'amdOverride failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * End the contact
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
     *  Method to transfer work item contact
     *
     *  @example -
     * ```
     * transferWorkItemContact("123", "234");
     * ```
     */
    transferWorkItemContact(contactId, agentUserName) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const url = baseUrl +
            ApiUriConstants.TRANSFER_WORK_ITEM_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { targetAgentName: agentUserName },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('transferWorkItemContact', 'transfer work item success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('transferWorkItemContact', 'transfer work item failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     *  Method to transfer work item contact to a skill
     *
     *  @example -
     * ```
     * transferWorkItemContact("123", "skill name");
     * ```
     */
    transferWorkItemSkill(contactId, skillName) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const url = baseUrl +
            this.TRANSFER_WORK_ITEM_SKILL.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { targetSkillName: skillName },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                this.logger.error('transferWorkItemSkill', 'transfer work item failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method to override answering machine.
     * This should be used when a call is in active state
     * @param contactId -  contact id
     * @param type - 'faxMachine' | 'badNumber'
     * @example
     * ```
     * answeringMachineOverride(23423423)
     * ```
     */
    answeringMachineOverride(contactId, type) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.POST_ANS_MACHINE_OVERRIDE.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        if (type > 0)
            reqInit.body = { type: amdOverrideType[type] };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=contact-service.js.map