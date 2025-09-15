/**
 * Main adapter class for CXone Browser Extension
 */
export declare class CxaExtensionAdapter {
    private static singleton;
    cxoneExtensionId: string;
    /**
     * Method to create singleton object of the class
     * @example
     */
    static get instance(): CxaExtensionAdapter;
    /**
     * sends message to the cxone extension
     * @param data  - the actual data to be passed to the chrome extension
     * @example
     * ```
     *  sendMessageToExtension({type:'Initialize',data:{}})
     * ```
     */
    sendMessageToExtension(data: any): void;
}
