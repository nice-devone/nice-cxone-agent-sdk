import { ICXoneAgentIntegration } from './cxone-agent-integration';
import { CXoneAuthResponseData } from '../interfaces/cxone-auth-response-data';
/**
 * CXone Agent Interfaces
 */
export declare class CXoneAgentIntegrationManager {
    private eventHandlerAdded;
    private agentIntegration;
    /** Stores [eventName, boundHandler] pairs so they can be removed by destroy(). */
    private readonly boundListeners;
    /**
     * Constructor to initialize instance.
     * @param embeddedAgentIntegration - CRM-specific integration instance.
     * @example
     * ```
     * new CXoneAgentIntegrationManager(integration)
     * ```
     */
    constructor(embeddedAgentIntegration: ICXoneAgentIntegration);
    /**
     * Handler of Screenpop CustomEvent raised from CXone Agent (on Click of Customer Card Activity).
     *
     * Two-step routing logic:
     *   `crmType` is populated by the backend on adaptive-card / pinned-record clicks (system.type).
     *
     *   Step 1 — CRM type check:
     *     The manager reads `?app=` from the current page URL and compares it against
     *     the expected app identifier from `CRM_TYPE_TO_APP_ID`:
     *     - Match   → proceed to Step 2.
     *     - Mismatch → foreign CRM type → open the URL in a new browser tab and return.
     *
     *   Step 2 — CRM instance check (only reached when Step 1 matches):
     *     Extracts the first hostname label from both `?base=` (current tab's CRM instance)
     *     and the screenpop URL (target record's CRM instance) and compares them.
     *     First label is used (not full hostname) to handle CRMs that serve the same tenant
     *     from multiple domains (e.g. Salesforce: myorg.my.salesforce.com and
     *     myorg.lightning.force.com share the first label "myorg").
     *     - Same label  → same CRM instance → forward to the integration handler.
     *     - Diff label  → different instance → open the URL in a new browser tab and return.
     *     - `?base=` absent or URL malformed → skip instance check, handle locally.
     *
     *   Fallbacks:
     *     - `crmType` absent (ACD-triggered pop) → forward unconditionally.
     *     - `crmType` not in map (unknown / future CRM) → forward as safe default.
     * @example
     */
    private handleCXoneScreenPopEvent;
    /**
     * Handler of contact selecrion CustomEvent raised from CXone Agent (on contact selection changes)
     * @example
     */
    private handleCXoneContactSelectionEvent;
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
     * Callback method invoked from Integration Module to perform action in CMA based on sesion switch in MSD
     */
    private handleIntegrationSessionSwitched;
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
     * Removes all window event listeners registered by this manager instance.
     * Call this in tests (afterEach) or when the embedding page unmounts to prevent
     * listener accumulation across multiple manager instances sharing the same window.
     * @example manager.destroy()
     */
    destroy(): void;
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
