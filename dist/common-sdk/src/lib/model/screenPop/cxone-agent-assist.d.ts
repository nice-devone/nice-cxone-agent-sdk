/**
 * Model class for CXoneAgentAssist event
 */
export declare class CXoneAgentAssist {
    /**
     * @remarks - Uri of Agent Assist app
     */
    appUri: string;
    contactId: string;
    appTitle: string;
    allParams: {
        [key: string]: string;
    };
    /**
      * The constructor will take the event object and assign the values to the CXoneAgentAssist properties
      * @param event - event object
      * @example - new CXoneAgentAssist(event)
      **/
    constructor(event: {
        [key: string]: string;
    });
}
