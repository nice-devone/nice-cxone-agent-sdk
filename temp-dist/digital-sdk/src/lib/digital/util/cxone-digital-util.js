import { __awaiter } from "tslib";
import { CcfLogger, FeatureToggleService } from '@nice-devone/agent-sdk';
import { DigitalContactService } from '../service/digital-contact-service';
import { DigitalEventSyncService } from '../service/digital-event-sync-service';
/**
 * Utility Class containing methods related to handling of generic logic
 */
export class CXoneDigitalUtil {
    /**
      * constructor to initialize various required instances for the class
      * @example
      * ```
      * new Class() instance
      * ```
    */
    constructor() {
        this.logger = new CcfLogger('DigitalSDK', 'CXoneDigitalUtil');
        this.digitalContactService = new DigitalContactService();
        this.digitalEventSyncService = new DigitalEventSyncService();
        this.isWSAPIIntegrationRevampToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-API-websocket-integration-revamp-AW-42181" /* FeatureToggles.REVAMPED_WEBSOCKET_INTEGRATION_PATTERN */) || false;
        this.logger.info('CXoneDigitalUtil constructor', 'constructor invoked to initialize instance');
    }
    /**
      * Method to create singleton object of the class
      * ```
      * @example
      * const cxoneDigitalUtil = CXoneDigitalUtil.instance();
      * ```
    */
    static get instance() {
        if (!CXoneDigitalUtil.singleton) {
            CXoneDigitalUtil.singleton = new CXoneDigitalUtil();
        }
        return CXoneDigitalUtil.singleton;
    }
    /**
     * Method to get Recipients data for email contact
     * @returns - returns recipient array filtered based on To,CC,BCC addresses
     * ```
     * @example
     * getDigitalRecipients()
     * ```
     */
    getDigitalRecipients(recipients) {
        const recipientTypes = { toRecipients: [], ccRecipients: [], bccRecipients: [] };
        recipientTypes.toRecipients = recipients.filter((recipient) => recipient.isPrimary)
            .map((recipient) => recipient.idOnExternalPlatform);
        recipientTypes.ccRecipients = recipients.filter((recipient) => !recipient.isPrimary && !recipient.isPrivate)
            .map((recipient) => recipient.idOnExternalPlatform);
        recipientTypes.bccRecipients = recipients.filter((recipient) => !recipient.isPrimary && recipient.isPrivate)
            .map((recipient) => recipient.idOnExternalPlatform);
        this.logger.info('getPrimaryRecipient', 'Recipient information of email contact ' + JSON.stringify(recipientTypes));
        return recipientTypes;
    }
    /**
     * Method to check if user slot polling feature toggle is enabled
     * @returns - returns feature toggle value
     * ```
     * @example
     * isUserSlotFTEnabled()
     * ```
     */
    isUserSlotFeatureToggleEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FeatureToggleService.instance.getFeatureToggle("release-cx-agent-user-slot-api-aw-24451" /* FeatureToggles.USER_SLOT_POLLING_FEATURE_TOGGLE */);
        });
    }
    /**
       * Method to check if event is already consumed
       * @param response - Http response from API
       * @param contactId - Contact Id of the digital contact
       * @param eventName - Event name to check
       * @param eventData - Event data to be passed for syncEventResponse
       * @returns - isEventConsumed
       * @example -
       * checkIfEventConsumed(response, '645337', 'CASE_INBOX_ASSIGNED',eventData);
      */
    checkIfEventConsumed(response, contactId, eventName, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            // if WS revamp FT is off return false as no need to check for event consumption
            if (!this.isWSAPIIntegrationRevampToggleEnabled)
                return false;
            const traceId = this.digitalContactService.getTraceIdFromResponseHeader(response);
            let isEventConsumed = false;
            isEventConsumed = yield this.digitalEventSyncService.handleDigitalEventSync({ contactId: contactId, eventName: eventName, traceId: traceId, syncEventResponse: eventData });
            return isEventConsumed;
        });
    }
}
//# sourceMappingURL=cxone-digital-util.js.map