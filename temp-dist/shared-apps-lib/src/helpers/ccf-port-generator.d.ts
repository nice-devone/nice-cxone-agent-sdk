/// <reference types="chrome" />
import { CcfGenericConstants } from '../enums/ccf-generic-constants';
/**
 * This class will act as wrapper for extension port objects
 */
export declare class CcfPortGenerator {
    static cxoneCtdXtnPort: chrome.runtime.Port;
    static cxoneBrowserXtnPort: chrome.runtime.Port;
    /**
     * Method to create singleton object of the extension port
     * @example
     * const ctdPort = CcfXtnPortWrapper.portInstance(CcfXtnAppType.ClickToDialExtension)
     */
    static generatePortInstance(xtnAppType: CcfGenericConstants, xtnId: string): chrome.runtime.Port | undefined;
    /**
     * sendMessage
     * @example
     * ```
     * sendMessage({data})
     * ```
     */
    static sendMessage(data: any): void;
}
