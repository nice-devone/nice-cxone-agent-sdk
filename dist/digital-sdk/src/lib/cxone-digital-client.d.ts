import { SkillService, CXoneTenant } from '@nice-devone/agent-sdk';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneDigitalWebsocket } from './digital/ws/cxone-digital-websocket';
import { DigitalService } from './digital/service/digital-service';
import { DigitalContactManager } from './contact/digital-contact-manager';
import { DigitalMessageNoteService } from './digital/service/digital-message-note-service';
/** This is the base class for Digital */
export declare class CXoneDigitalClient {
    private logger;
    private isStartedDigitalStatusPolling;
    skillService: SkillService;
    cxoneTenant: CXoneTenant;
    cxoneUser: CXoneUser;
    cxoneDigitalWebsocket: CXoneDigitalWebsocket;
    digitalService: DigitalService;
    digitalContactManager: DigitalContactManager;
    private static singleton;
    auth: CXoneAuth;
    digitalMessageNoteService: DigitalMessageNoteService;
    /**
     * get instance for agent auth and session
     * @example
     * ```
     * const cxoneDigitalClient = new CXoneDigitalClient();
     * ```
     */
    constructor();
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const cxoneDigitalClient = CXoneDigitalClient.instance();
     * ```
     */
    static get instance(): CXoneDigitalClient;
    /**
     * method to initialize DigitalEngagement
     * @example
     * ```
     * initDigitalEngagement();
     * ```
     */
    initDigitalEngagement(): Promise<void>;
    /**
     * Method to subscribe message bus polling response message
     * @example
     * ```
     *  subscribePollingResponseMessage()
     * ```
    */
    private subscribePollingResponseMessage;
    /**
     * Get digital logged in user details like UserId to call other digital APIs
     * @example
     * ```
     * getDigitalUserDetails();
     * ```
     */
    private getDigitalUserDetails;
    /**
     * Method to clear local and session storage
     * @example
     * ```
     * clearDigitalCache()
     * ```
     */
    clearDigitalCache(): Promise<void>;
    /**
     * Subscription for leader change event
     */
    private onLeaderElectionChange;
    /**
     * Method to update DFO API URL
     * @example
     * ```
     * updateDfoApiUrl()
     * ```
     */
    private updateDfoApiUrl;
    /**
     * Method to fetch DFO Websocket URL from DX API & set in CXone config
     * @example
     * ```
     * setDigitalWebSocketUri()
     * ```
     */
    private setDigitalWebSocketUri;
}
