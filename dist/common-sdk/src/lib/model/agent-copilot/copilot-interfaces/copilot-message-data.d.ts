import { CopilotElement } from './index';
/**
 * model interface for agent assist payload data
 */
export interface CopilotMessageData {
    /**
     * The content type of element
     */
    agentAssistSource: string;
    /**
     * The ID of the contact.
     */
    contactId: string;
    /**
     * array of CopilotElement
     */
    acpAppElements: CopilotElement[];
    /**
     * timestamp
     */
    utcTimestamp: Date;
    /**
     * sent response
     */
    responseSent: string;
    /**
     * flag for checking if response is inserted in editor
     */
    isResponseInserted: boolean;
    /**
     * The ID of the inserted NBR
     */
    insertedNBRId: string;
    /**
     * flag for checking if nbr is available
     */
    isNBRAvailable: boolean;
    /**
     * flag for checking if nbr is open
     */
    isNBROpen: boolean;
    /**
     * flag for checking if final summary is generated
     */
    isFinalSummaryGenerated: boolean;
    /**
    * array of email adaptive cards
    */
    emailCards?: CopilotElement[];
}
