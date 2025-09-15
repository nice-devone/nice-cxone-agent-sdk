import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model class for CXone page open
 */
export declare class CXonePageOpen extends CXoneAgentEvent {
    /**
     * @remarks - Action of page open
     */
    action: string;
    /**
     * @remarks - Unique identifier of sender contact id
     */
    contactId: string;
    /**
     * @remarks - Action of page open
     */
    pageUri: string;
    /**
     * The constructor will take the data object and assign the values to the cxone page open class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxonePageOpen.parse(pageOpen);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
