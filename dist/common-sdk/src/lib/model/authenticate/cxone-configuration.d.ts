import { WsRequestQueryParams } from '../websocket/ws-request';
/**
 * Model class for CXOne configuration
 */
export declare class CXoneConfiguration {
    /**
     * @remarks - CXOne API End point
     */
    acdApiBaseUri: string;
    /**
     * @remarks - UserHub is enable or not
     */
    isUserHub: boolean;
    /**
     * @remarks -
     */
    wfmUri: string;
    /**
     * @remarks -
     */
    notificationUri: string;
    /**
     * @remarks -
     */
    userHubBaseUrl: string;
    /**
     * @remarks -
     */
    dfoApiBaseUri: string;
    /**
     * @remarks -
     */
    dfoWssUri: string;
    /**
     * @remarks - agent assist notification websocket URI
     */
    aahNotificationWssUri: string;
    /**
     * @remarks - PresenceSync(i.e)Directory 2.0 API end point
     */
    presenceSyncApiUrl: string;
    /**
     * @remarks - PresenceSync(i.e)Directory 2.0 WebSocket URL
     */
    presenceSyncWebSocketUrl: string;
    /**
     * @remarks - API facade Base URL used to invoke UH API
     */
    apiFacadeBaseUri: string;
    /**
     * @remarks - area
     */
    area: string;
    /**
     * @remarks - cluster
     */
    cluster: string;
    /**
     * @remarks - domain
     */
    domain: string;
    /**
     * @remarks - ACD domain url
     */
    acdDomain: string;
    /**
     * @remarks - User hub domain url
     */
    userHubDomain: string;
    /**
     * @remarks - UIQueue endpoint
     */
    uiQueueWSBaseUri: string;
    /**
     * @remarks - DFO APP based End point(2.0)
     */
    dfoAppBaseUri: string;
    /**
     * @remarks - AAI transcript websocket URI
     */
    aaiTranscriptWsUri: string;
    /**
     * This method to parse CXoneConfiguration data
     * @param data - CXoneConfiguration API response
     * ```
     * @example
     * const config = new CXoneConfiguration();
     * config.parseData(data);
     * ```
     */
    parseData(data: {
        [key: string]: string;
    }): void;
    /**
     * This method is to set the endpoints for user hub and central systems
     * @param isUserHub - It would be false if it were the central user.
     * @example
     * ```
     * setAuthEndPoints(isUserHub);
     * ```
     */
    setAuthEndPoints(isUserHub: boolean, wsQueryParams: WsRequestQueryParams): void;
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
    private getPresenceSyncUri;
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
    private getPresenceSyncWSUri;
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
    private getAahNotificationWssUri;
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
    private getUserHubWfmUri;
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
    private getUserHubNotificationUri;
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
    private getDfoApiBaseUri;
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
    private getDfoWssUri;
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
    private getAPIFacadeBaseUri;
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
    private getDfoAppBaseUri;
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
    private getFedRampBaseUri;
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
    private formWssUri;
    /**
     *
     * This method returns getUIQueueWSBaseUri
     * @returns - api end point
     * ```
     * @example
     * getUIQueueWSBaseUri('na2', 'staging.niceincontact.com', 'du01');
     * ```
     */
    private getUIQueueWSBaseUri;
    /**
     * This method returns the  agent assist transcript WS uri
     * @returns - api end point
     * @param userHubArea - userHubArea
     * @param domain - domain
     * @example
     * ```
     * getAaiTranscriptWsUri('na1','staging.niceincontact.com');
     * ```
     */
    private getAaiTranscriptWsUri;
}
