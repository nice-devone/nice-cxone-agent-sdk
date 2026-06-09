/**
 * Model Class for the DigitalContactEvent
 */
export declare class CoBrowseEvent {
    /**
     * @remarks - The data for coBrowseEvent.
     */
    data: CoBrowseData;
    /**
     * @remarks - Name of the event.
     */
    eventName: string;
    /**
     * @remarks - Name of type.
     */
    type: string;
    /**
       * @remarks -
       */
    iisHost: string;
    /**
     * @remarks -
     */
    vcHost: string;
    /**
       * used to parse the data
       * @example
       * ```
       * coBrowseEvent.parse(data);
       * ```
       */
    parse(data: {
        [key: string]: string;
    }): void;
}
/**
 * Model Class for the CoBrowsData
 */
export declare class CoBrowseData {
    /**
     * @remarks - The url for coBrowseEvent.
     */
    url: string;
    /**
     * @remarks - The contactId for coBrowseEvent.
     */
    contactId: string;
    /**
       * used to parse the data
       * @example
       * ```
       * agentWorkflowResponseEvent.parse(data);
       * ```
       */
    parseData(data: string): this;
}
