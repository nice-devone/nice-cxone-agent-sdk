import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Helper class to accommodate parsing logic for cxone-digital-contact
 */
export declare class CXoneDigitalContactHelper {
    protected logger: CcfLogger;
    /**
     * Method to validate schema of web socket event response
     * @returns - validated response based on predefined schema
     * @example
     */
    validateResponseSchema(eventObj: any): any;
}
