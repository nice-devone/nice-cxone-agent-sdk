/**
 * Model for System Information Details
 */
export interface SystemInformation {
    /**
     * @remarks Name of agent
     */
    agentName?: string;
    /**
     * @remarks UserName of agent
     */
    displayedUsername?: string;
    /**
     * @remarks Unique identifier for agent
     */
    agentId?: string;
    /**
     * @remarks App Version
     */
    version?: string;
    /**
     * @remarks Station Id
     */
    stationId?: string;
    /**
     * @remarks Session Id
     */
    sessionId?: string;
    /**
     * @remarks Station Phone Number
     */
    phoneNumber?: string;
    /**
     * @remarks Unique identifier for agentleg
     */
    agentLegId?: string;
    /**
     * @remarks Unique identifier for caller
     */
    callerId?: string;
    /**
     * @remarks Current browser version
     */
    browserVersion?: string;
    /**
     * @remarks Webserver
     */
    webServer?: string;
    /**
     * @remarks Virtual cluster name
     */
    virtualCluster?: string;
    /**
     * @remarks Current browser language
     */
    browserLanguage?: string;
    /**
     * @remarks Current browser locale
     */
    browserLocalization?: string;
    /**
     * @remarks Unique identifier for team
     */
    teamName?: string;
    /**
   * @remarks Email address entered by agent while initiating session after selecting ACS as preference.
   */
    acsEmailID?: string;
}
/**
 * Model for Interaction Routing Information Details
 */
export interface InteractionRoutingInformation {
    /**
     * @remarks - Thresholds of the calls, digital contacts handling ability
     */
    contactLimit?: ContactLimit;
    /**
     * @remarks - Total count of the Contact
     */
    totalLimit?: number;
    /**
     * @remarks - Type of routing
     */
    routing?: string;
    /**
     * @remarks - Indicates whether new digital contact is requested
     */
    reqContact?: string;
    /**
     * @remarks - Indicates the contact auto focus
     */
    contactAutoFocus?: string;
}
/** Model for Contact limit of different channels */
export interface ContactLimit {
    /**
     * @remarks - Thresholds of the phone or voicecalls handling ability
     */
    voiceLimit: string;
    /**
     * @remarks - Thresholds of the digital contacts handling ability
     */
    digitalLimit: string;
}
/**
 * Component to display System Information in Settings
 *
 * @example - <CcfSystemInformation />
 * @returns
 */
export declare function CcfSystemInformation(): JSX.Element;
export default CcfSystemInformation;
