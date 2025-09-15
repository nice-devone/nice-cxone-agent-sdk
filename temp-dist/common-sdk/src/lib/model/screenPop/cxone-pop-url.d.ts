import { CXoneAgentEvent } from '../agent/cxone-agent-event';
/**
 * Model class for CXone pop url
 */
export declare class CXonePopUrl extends CXoneAgentEvent {
    /**
     * @remarks - Unique identifier of sender contact id
     */
    contactId: string;
    /**
     * @remarks - Action of PopURL
     */
    url: string;
    /**
     * @remarks - The textual "friendly" label to show as the Contact Panel tab title
     */
    tabTitle: string;
    /**
     * @remarks - Destination of PopURL
     */
    popDestination: string;
    /**
     * @remarks - If popped out, the default window height.
     */
    popoutWindowHeight: number;
    /**
     * @remarks - If popped out, the default window width.
     */
    popoutWindowWidth: number;
    /**
     * @remarks - If popped out, should the page be auto-closed when the contact is terminated.
     */
    closePopoutUponTermination: boolean;
    /**
     * The constructor will take the data object and assign the values to the cxone page open class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxonePopUrl.parse(pageOpen);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
