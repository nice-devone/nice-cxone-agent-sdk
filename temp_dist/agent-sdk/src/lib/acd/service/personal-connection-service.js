import { ACDSessionManager, ApiUriConstants, HttpClient, HttpUtilService, Logger, } from '@nice-devone/core-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
   * Class to make Personal Connection calls
   */
export class PersonalConnectionService {
    /**
       *
       * ```
       * @example
       * const personalConnection = new PersonalConnectionService();
       * ```
       */
    constructor() {
        this.logger = new Logger('SDK', 'PersonalConnectionService');
        this.acdSession = {};
        this.utilService = new HttpUtilService();
        this.auth = CXoneAuth.instance;
        this.acdSession = ACDSessionManager.instance;
        ;
    }
    /**
       * Method to create singleton object of the class
       * ```
       * @example
       * const personalConnectionService = PersonalConnectionService.instance;
       * ```
       */
    static get instance() {
        if (!PersonalConnectionService.singleton) {
            PersonalConnectionService.singleton = new PersonalConnectionService();
        }
        return PersonalConnectionService.singleton;
    }
    ;
    ;
    /**
       * Service method to login to pc dialer
       * @param agentState - Log into the PC dialer skill
       * @returns - response from the PC_DIALER_LOGIN api
       * @example
       * ```
       * pcDialerLogin({ agentState: AgentState })
       * ```
      */
    pcDialerLogin(agentState) {
        const pcDialerLoginUri = ApiUriConstants.PC_DIALER_LOGIN;
        const baseUri = this.auth.getCXoneConfig().acdApiBaseUri;
        const url = baseUri +
            pcDialerLoginUri.replace('{sessionId}', this.acdSession.getSessionId());
        const reqInit = {
            headers: this.utilService.initHeader(this.auth.getAuthToken().accessToken, '').headers,
            body: {
                skillName: agentState.skillName,
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('pcDialerLogin', 'pcDialerLogin success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('pcDialerLogin', 'pcDialerLogin failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
       * Service method to logout of pc dialer
       * @param agentState - Log out of the PC dialer skill
       * @returns - response from the PC_DIALER_LOGOUT api
       * @example
       * ```
       * pcDialerLogout({ agentState: AgentState })
       * ```
       */
    pcDialerLogout() {
        const pcDialerLogoutUri = ApiUriConstants.PC_DIALER_LOGOUT;
        const baseUri = this.auth.getCXoneConfig().acdApiBaseUri;
        const url = baseUri +
            pcDialerLogoutUri.replace('{sessionId}', this.acdSession.getSessionId());
        const reqInit = {
            headers: this.utilService.initHeader(this.auth.getAuthToken().accessToken, '').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('pcDialerLogout', 'pcDialerLogout success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('pcDialerLogout', 'pcDialerLogout failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
     * Snoozes a preview personal connection contact. The contact will be delivered to another agent.
     * @param contactId - contact id
     * @example - snoozeContact(123456)
     */
    snoozeContact(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.SNOOZE_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('snoozeContact', 'snoozeContact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('snoozeContact', 'snoozeContact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
   * This method sets the primary and secondary dispositions on a contact after that contact has been disconnected.
   * This API call allows you to select the Disposition, provide any notes as part of the dispositioning of the contact,
   * and to provide a commitment amount, or a callback time and phone number.
   * @param contactId - contact id
   * @example - rescheduleSaveContact(123456)
   */
    rescheduleCall(data) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: {
                primaryDispositionId: data.dispositionId,
                primaryCallbackNumber: data.callbackNumber,
                primaryCallbackTime: data.callbackTime,
                primaryDispositionNotes: data.rescheduleCallNotes,
            },
        };
        const url = baseUrl + ApiUriConstants.RESCHEDULE_SAVE_CONTACT_URI.replace('{sessionId}', sessionId).replace('{contactId}', data.contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('rescheduleSaveContact', 'rescheduleSaveContact success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('rescheduleSaveContact', 'rescheduleSaveContact failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
   * This call updates the contact state and allows subsequent calls to update the outcome status of the contact.
   * The contact should have been routed to the Agent in a dialing state.
   * @param contactId - contact id
   * @example - callPlaced(123456)
   */
    callPlaced(contactId) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.INDEPENDENT_DIAL.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('callPlaced', 'callPlaced success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('callPlaced', 'callPlaced failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
    /**
   * This method will update the outcome value of an independent call contact after the call is placed in a separate telephony system.
   * This should only be called a single time on a contact to indicate the final outcome for the call.
   * @param contactId - contact id
   * @example - outcomeSelection(123456)
   */
    outcomeSelection(data) {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { outcome: data.outcome },
        };
        const url = baseUrl + ApiUriConstants.INDEPENDENT_DIAL_OUTCOME
            .replace('{sessionId}', sessionId)
            .replace('{contactId}', data.contactId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('outcomeSelection', 'outcomeSelection success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('outcomeSelection', 'outcomeSelection failed:-' + error.toString());
                reject(error);
            });
        });
    }
    ;
}
;
//# sourceMappingURL=personal-connection-service.js.map