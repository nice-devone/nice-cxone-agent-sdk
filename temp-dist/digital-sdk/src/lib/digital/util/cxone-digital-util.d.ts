import { CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneRecipient } from '@nice-devone/common-sdk';
/**
 * Utility Class containing methods related to handling of generic logic
 */
export declare class CXoneDigitalUtil {
    protected logger: CcfLogger;
    private static singleton;
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
}
