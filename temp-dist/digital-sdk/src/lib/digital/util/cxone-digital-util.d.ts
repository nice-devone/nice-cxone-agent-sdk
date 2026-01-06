import { CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneDigitalEventType, CXoneMessage, CXoneRecipient, HttpResponse } from '@nice-devone/common-sdk';
import { DigitalContactService } from '../service/digital-contact-service';
import { DigitalEventSyncService } from '../service/digital-event-sync-service';
/**
 * Utility Class containing methods related to handling of generic logic
 */
export declare class CXoneDigitalUtil {
    protected logger: CcfLogger;
    private static singleton;
    digitalContactService: DigitalContactService;
    digitalEventSyncService: DigitalEventSyncService;
    private isWSAPIIntegrationRevampToggleEnabled;
    /**
      * constructor to initialize various required instances for the class
      * @example
      * ```
      * new Class() instance
      * ```
    */
    constructor();
    /**
      * Method to create singleton object of the class
      * ```
      * @example
      * const cxoneDigitalUtil = CXoneDigitalUtil.instance();
      * ```
    */
    static get instance(): CXoneDigitalUtil;
    /**
     * Method to get Recipients data for email contact
     * @returns - returns recipient array filtered based on To,CC,BCC addresses
     * ```
     * @example
     * getDigitalRecipients()
     * ```
     */
    getDigitalRecipients(recipients: Array<CXoneRecipient>): {
        toRecipients: string[];
        ccRecipients: string[];
        bccRecipients: string[];
    };
    /**
     * Method to check if user slot polling feature toggle is enabled
     * @returns - returns feature toggle value
     * ```
     * @example
     * isUserSlotFTEnabled()
     * ```
     */
    isUserSlotFeatureToggleEnabled(): Promise<boolean>;
    /**
       * Method to check if event is already consumed
       * @param response - Http response from API
       * @param contactId - Contact Id of the digital contact
       * @param eventName - Event name to check
       * @param eventData - Event data to be passed for syncEventResponse
       * @param traceXId - traceXId from the response header
       * @returns - isEventConsumed
       * @example -
       * checkIfEventConsumed(response, '645337', 'CASE_INBOX_ASSIGNED',eventData,traceXid);
      */
    checkIfEventConsumed(response: HttpResponse, contactId: string, eventName: CXoneDigitalEventType, eventData?: CXoneMessage, traceXId?: string): Promise<boolean>;
}
