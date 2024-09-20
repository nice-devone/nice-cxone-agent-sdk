"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneConfiguration = void 0;
/**
 * Model class for CXOne configuration
 */
class CXoneConfiguration {
    /**
     * This method to parse CXoneConfiguration data
     * @param data - CXoneConfiguration API response
     * ```
     * @example
     * const config = new CXoneConfiguration();
     * config.parseData(data);
     * ```
     */
    parseData(data) {
        this.acdApiBaseUri = data.api_endpoint;
        this.area = data.area;
        this.cluster = data.cluster;
        this.domain = data.domain;
        this.acdDomain = data.acdDomain;
        this.userHubDomain = data.uhDomain;
    }
    /**
     * This method is to set the endpoints for user hub and central systems
     * @param isUserHub - It would be false if it were the central user.
     * @example
     * ```
     * setAuthEndPoints(isUserHub);
     * ```
     */
    setAuthEndPoints(isUserHub, wsQueryParams) {
        this.isUserHub = false;
        if (isUserHub) {
            // Check for User Hub
            const userHubArea = this.area;
            this.isUserHub = true;
            this.wfmUri = this.getUserHubWfmUri(userHubArea, this.userHubDomain);
            this.notificationUri = this.getUserHubNotificationUri(userHubArea, this.userHubDomain);
            this.userHubBaseUrl = this.getUserHubWfmUri(userHubArea, this.userHubDomain);
            this.apiFacadeBaseUri = this.getAPIFacadeBaseUri(userHubArea, this.domain);
            this.dfoApiBaseUri = this.getDfoApiBaseUri(userHubArea, this.domain);
            this.dfoWssUri = this.getDfoWssUri(userHubArea, this.domain, wsQueryParams);
            this.presenceSyncApiUrl = this.getPresenceSyncUri(userHubArea, this.domain);
            this.presenceSyncWebSocketUrl = this.getPresenceSyncWSUri(userHubArea, this.domain);
            this.aahNotificationWssUri = this.getAahNotificationWssUri(userHubArea, this.domain);
            this.uiQueueWSBaseUri = this.getUIQueueWSBaseUri(userHubArea, this.domain);
            this.dfoAppBaseUri = this.getDfoAppBaseUri(userHubArea, this.domain);
        }
    }
    /**
     * This method returns the  Presence sync url
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - domain
     * @example
     * ```
     * getPresenceSyncUri('na1','staging.niceincontact.com');
     * ```
     */
    getPresenceSyncUri(userHubArea, domain) {
        return 'https://api-' + userHubArea + '.' + domain;
    }
    /**
     * This method returns the  Presence sync WS url
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - domain
     * @example
     * ```
     * getPresenceSyncWSUri('na1','staging.niceincontact.com');
     * ```
     */
    getPresenceSyncWSUri(userHubArea, domain) {
        return 'wss://websocket-' + userHubArea + '.' + domain;
    }
    /**
     * This method returns the  agent assist notification WS url
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - domain
     * @example
     * ```
     * getAahNotificationWssUri('na1','staging.niceincontact.com');
     * ```
     */
    getAahNotificationWssUri(userHubArea, domain) {
        return 'wss://websocket-' + userHubArea + '.' + domain + '/agent-assist-notifications/notifications/ws';
    }
    /**
     * This method returns the  wfm_uri
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - domain
     * @example
     * ```
     * getUserHubWfmUri('na1','staging.nice-incontact.com');
     * ```
     */
    getUserHubWfmUri(userHubArea, domain) {
        return 'https://' + userHubArea + '.' + domain;
    }
    /**
     * This method returns the notification_uri
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - domain
     * @example
     * ```
     * getUserHubNotificationUri('na1','staging.nice-incontact.com');
     * ```
     */
    getUserHubNotificationUri(userHubArea, domain) {
        return 'https://' + userHubArea + '-ws.' + domain + '/ws/notifications';
    }
    /**
     * This method returns DfoApiBaseUri
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - apiFacadeDomain
     * @example
     * ```
     * dfoApiBaseUri = "https://api-de-{area}.{domain}/"
     * getDfoApiBaseUri('na1','staging.niceincontact.com');
     * getDfoApiBaseUri('na2','nicecxone-gov.com');
     * ```
     */
    getDfoApiBaseUri(userHubArea, domain) {
        // Below hardcoding FedRamp condition will be removed once DFO moves from cxone domain to incontact domain
        const dfoBaseUri = userHubArea === 'na2' ? this.getFedRampBaseUri(userHubArea, false) : 'https://api-de-' + userHubArea + '.' + domain;
        return dfoBaseUri;
    }
    /**
     * This method returns Dfo Websocket Uri
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - apiFacadeDomain
     * @example
     * ```
     * dfoWssUri = "https://api-de-{area}.{domain}/"
     * getDfoWssUri('na1','staging.niceincontact.com');
     * getDfoWssUri('na2','niceincontact.com'); For FedRamp
     * ```
     */
    getDfoWssUri(userHubArea, domain, wsQueryParams) {
        // Below hardcoding FedRamp condition will be removed once DFO moves from cxone domain to incontact domain
        const dfoWssBaseUri = userHubArea === 'na2' ? this.getFedRampBaseUri(userHubArea, true, wsQueryParams) : this.formWssUri(userHubArea, domain, wsQueryParams);
        return dfoWssBaseUri;
    }
    /**
     *
     * This method returns getAPIFacadeBaseUri
     * @returns - api end point
     *
     * @param userHubArea - userHubArea
     * @param domain - apiFacadeDomain
     * ```
     * @example
     * getAPIFacadeBaseUri('na1','staging.niceincontact.com');
     * ```
     */
    getAPIFacadeBaseUri(userHubArea, domain) {
        return 'https://api-' + userHubArea + '.' + domain;
    }
    /**
     *
     * This method returns DFO APP baseURI version 2.0, need to replace by latest 3.0 API once available from DFO,
     * @returns - api end point
     *
     * @param userHubArea - userHubArea
     * @param domain - apiFacadeDomain
     * ```
     * @example
     * getDfoAppBaseUri('na1','staging.niceincontact.com');
     * ```
     */
    getDfoAppBaseUri(userHubArea, domain) {
        // Below hardcoding FedRamp condition will be removed once DFO moves from cxone domain to incontact domain
        const dfoBaseAppUri = userHubArea === 'na2' ? this.getFedRampBaseUri(userHubArea, false) : 'https://app-de-' + userHubArea + '.' + domain;
        return dfoBaseAppUri;
    }
    /**
     * This method returns DfoApiBaseUri for FedRamp domains
     * @returns - api end point
     * @param userHubArea - UserHub region
     * @param isWebSocket - flag for websocket detection
     * @example
     * ```
     * getFedRampBaseUri('na2', true);
     * ```
     */
    getFedRampBaseUri(userHubArea, isWebSocket, wsQueryParams) {
        // Below hardcoding type of code is only written as workaround for now
        // FedRamp region domain is coming niceincontact but currently DFO is not using this domain
        // Once DFO moves to new domain, we will remove the hard coding logic
        const fedRampDomainForDfo = 'nicecxone-gov.com';
        const queryParams = `?tenantId=${wsQueryParams === null || wsQueryParams === void 0 ? void 0 : wsQueryParams.tenantId}&userId=${wsQueryParams === null || wsQueryParams === void 0 ? void 0 : wsQueryParams.userId}`;
        const finalDfoBaseUri = isWebSocket ? 'wss://event-hub-de-' + userHubArea + '.' + fedRampDomainForDfo + queryParams : 'https://api-de-' + userHubArea + '.' + fedRampDomainForDfo;
        return finalDfoBaseUri;
    }
    /**
     * This method returns wss connection url with query params
     * @returns - api end point
     * @param userHubArea - UserHub region
     * @param domain - root domain
     * @param wsQueryParams - object containing tenant & user id
     * @example
     * ```
     * formWssUri(userHubArea, domain, wsQueryParams);
     * ```
     */
    formWssUri(userHubArea, domain, wsQueryParams) {
        return 'wss://event-hub-de-' + userHubArea + '.' + domain + `?tenantId=${wsQueryParams.tenantId}&userId=${wsQueryParams.userId}`;
    }
    /**
     *
     * This method returns getUIQueueWSBaseUri
     * @returns - api end point
     * ```
     * @example
     * getUIQueueWSBaseUri('na2', 'staging.niceincontact.com', 'du01');
     * ```
     */
    getUIQueueWSBaseUri(userHubArea, domain, du = 'du01') {
        return 'https://websocket-' + userHubArea + '.' + domain + '/ui-queue/' + du + '/manager/node';
    }
}
exports.CXoneConfiguration = CXoneConfiguration;
//# sourceMappingURL=cxone-configuration.js.map