import { __awaiter } from "tslib";
import { CcfLogger, FeatureToggleService } from '@nice-devone/agent-sdk';
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
}
//# sourceMappingURL=cxone-digital-util.js.map