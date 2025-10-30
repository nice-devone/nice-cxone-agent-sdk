import { CXoneDigitalContactData } from '../interfaces/cxone-digital-contact-data';
import { CXoneVoiceContactData } from '../interfaces/cxone-voice-contact-data';
import { CXoneScreenPopData } from '../interfaces/cxone-screen-pop-data';
import { ClickToActData } from '../interfaces/click-to-act-data';
import { CXoneAgentStateData } from '../interfaces/cxone-agent-state-data';
import { Integrationi18nData } from '../interfaces/integration-i18n-data';
import { CXoneAuthResponseData } from '../interfaces/cxone-auth-response-data';
import { CXoneAuthRequestData } from '../interfaces/cxone-auth-request-data';
import { CXonePartnerAccountDetails } from '../interfaces/cxone-partner-account-details';
import { CXonePartnerPresenceSyncRule } from '../interfaces/cxone-partner-presence-sync-rule';
import { CXoneContactData } from '../interfaces/cxone-contact-data';
import { SessionSwitchData } from '../interfaces/session-switch-data';
/**
 * Type alias for click to act callback, to be invoked from intergration apps
 */
export declare type ClickToActCallback = (params: ClickToActData) => boolean;
export declare type SessionSwitchedCallback = (params: SessionSwitchData) => boolean;
export declare type LocaleChangeCallback = (params: Integrationi18nData) => void;
export declare type CXoneAuthResponseCallback = (params: CXoneAuthResponseData) => void;
export declare type CXonePartnerDetailsCallback = (params: CXonePartnerAccountDetails) => void;
/**
 * Interface to be implemented by integration apps
 */
export interface ICXoneAgentIntegration {
    /**
     * Initializer function to allocate resources
     */
    initialize(): void;
    /**
     * Finalizer method to clean up the resources
     */
    finalize(): void;
    /**
     *
     * @param screepopData - Event Args
     */
    handleCXoneScreenpop(screepopData: CXoneScreenPopData): void;
    /**
     *
     * @param contactId - string
     */
    handleCXoneContactSelectionChanged(contactId: string): void;
    /**
     *
     * @param voiceContactData - Event Args
     */
    handleCXoneVoiceContactEvent(voiceContactData: CXoneVoiceContactData): void;
    /**
     *
     * @param digitalContactData - Event Args
     */
    handleCXoneDigitalContactEvent(digitalContactData: CXoneDigitalContactData): void;
    /**
     *
     * @param currentStateData - Event Args
     */
    handleCXoneAgentStateChangeEvent(currentStateData: CXoneAgentStateData): void;
    /**
     * Callback invoked when the CXone Agent sends the Authentication Request
     * @param eventData - The event data emitted from cxone agent
     */
    handleCXoneAuthRequest(authRequest: CXoneAuthRequestData): void;
    /**
     *
     * @param callback - Callback method
     */
    onClickToAct(callback: ClickToActCallback): void;
    /**
     *
     * @param callback - Callback method
     */
    onSessionSwitched(callback: SessionSwitchedCallback): void;
    /**
     * Embedded app specific method for getting locale
     * @param callback - Callback method
     */
    onLocaleChange(callback: LocaleChangeCallback): void;
    /**
     * Teams Embedded app specific method for sending authentication information to CXone agent with auth code information.
     * @param callback - callback method which will dispatch the event.
     */
    onAuthResponse(callback: CXoneAuthResponseCallback): void;
    /**
     * SF embedded app specific method for getting the presence sync mapping rules
     * @param rules - Event Args
     */
    handleCXonePresenceSyncEvent(rules: CXonePartnerPresenceSyncRule): void;
    /**
     *
     * @param callback - Callback method
     */
    getPartnerAccountDetails(callback: CXonePartnerDetailsCallback): void;
    /**
     * Embedded app specific method to send the Voicemail contact data
     * @param voiceMailContactData - Event Args
     */
    handleCXoneVoiceMailContactEvent(voiceMailContactData: CXoneContactData): void;
    /**
     * Embedded app specific method to send the WorkItem contact data
     * @param workItemContactData - Event Args
     */
    handleCXoneWorkItemContactEvent(workItemContactData: CXoneContactData): void;
}
