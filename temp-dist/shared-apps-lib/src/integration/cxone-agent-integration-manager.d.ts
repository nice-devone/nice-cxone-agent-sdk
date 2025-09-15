import { ICXoneAgentIntegration } from './cxone-agent-integration';
import { CXoneAuthResponseData } from '../interfaces/cxone-auth-response-data';
/**
 * CXone Agent Interfaces
 */
export declare class CXoneAgentIntegrationManager {
    private eventHandlerAdded;
    private agentIntegration;
    /**
     * Constructor to initialize instance
     * @example
     */
    constructor(embeddedAgentIntegration: ICXoneAgentIntegration);
    /**
     * Handler of Screenpop CustomEvent raised from CXone Agent (on Click of Customer Card Activity)
     * @example
     */
    private handleCXoneScreenPopEvent;
    /**
     * Handler of DigitalContact CustomEvent raised from CXone Agent (on Contact Status Changes)
     * @example
     */
    private handleCXoneDigitalContactEvent;
    /**
     * Handler of VoiceContact CustomEvent raised from CXone Agent (on Contact Status Changes)
     * @example
     */
    private handleCXoneVoiceContactEvent;
    /**
     * Handler for Agent state change event raised from CXone Agent (on Contact Status Changes)
     * @example
     */
    private handleCXoneAgentStateChangeEvent;
    /**
     * Callback method invoked from Integration Module to start click-to-dial functionality in CXone Agent
     */
    private handleIntegrationClickToAct;
    /**
     * Callback method invoked from Integration Module to send/update locale to CXone Agent.
     */
    private handleIntegrationUpdateLocale;
    /**
     * Callback method invoked from Integration Module to send the partner account details to listner
     * @example -
     * ```
     * handleIntegrationPresenceSyncRule(params as CXonePartnerAccountDetails)
     * ```
     */
    private handleIntegrationPresenceSyncRule;
    /** General handler method for executing stuff once cxone-agent application is initialized
     * e.g. sending locale
     */
    private handleCXoneAgentAppInitializedEvent;
    /**
    * Handler of Authentication URL CustomEvent raised from CXone Agent (on Click of Login Button)
    * @example handleCXoneAgentAuthRequest(event: CustomEvent)
    */
    private handleCXoneAgentAuthRequest;
    /**
    * Handler of callback method which sends the authentication code.
    * @example initCXoneAuthResponseCallbackHandler()
    */
    initCXoneAuthResponseCallbackHandler(): void;
    /**
    * Handler of Authentication Response received from MS Teams embedded app once the auth is successful.
    * params - Event with authentication parameters.
    *
    * @example dispatchAuthStatusToCXoneAgent(CustomEvent)
    */
    dispatchAuthStatusToCXoneAgent(params: CXoneAuthResponseData): boolean;
    /**
  * Handler of CustomEvent raised for CXone Agent Logoff (Session End)
  * @example handleCXoneAgentAuthRequest(event: CustomEvent)
  */
    private handleCXoneAgentLogOff;
    /**
     * Handler of callback method which sends the presence sync rules to crm
     * @example -
     * ```
     * this.handleCXonePresenceSyncEvent(event as CustomEventInit)
     * ```
     */
    private handleCXonePresenceSyncEvent;
    /**
     * Method to add listeners for all the events coming from cxone-agent application
     */
    private registerCXoneAgentEvents;
    /**
     * Method to initialize listeners for all the events initiated by CXoneAgent Home apps.
     */
    private handleCXoneAgentHomeInitialized;
    /**
     * Method to initialize listeners for all the events initiated by integration apps.
     */
    private registerIntegrationAppEvents;
    /**
     * Initializes this module and adds handler for CXone Agent CustomEvent
     * @param integration - instance of integration module
     * @example const added = connector.addEventHandlers(integration);
     */
    initialize(): boolean;
    /**
   * @remarks -Event to dispatch to CXone App once the Embedded App is successfully initialized
   * This event will basically help CXone to understand if it needs to execute only after the
   * embedded-app has initialized.
   */
    private dispatchInitializationStatusToHost;
    /**
     * Handler of VoiceMail Contact CustomEvent raised from CXone Agent
     * @example
     */
    private handleCXoneVoiceMailContactEvent;
    /**
     * Handler of WorkItem Contact CustomEvent raised from CXone Agent
     * @example
     */
    private handleCXoneWorkItemContactEvent;
}
