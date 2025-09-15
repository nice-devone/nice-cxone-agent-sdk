import { AutoSummaryData } from './auto-summary';
/**
 * Class for AgentAssistMessageResponse
*/
export declare class AgentAssistMessageResponse {
    command: string;
    headers?: {
        connectionId: string;
    };
    body?: any;
    /**
       * Create instance of AgentAssistMessageResponse
       * @example
       * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
       */
    constructor(cmd: string, respHeader: {
        [key: string]: string;
    });
    /**
       * method to parse the response
       * @example
       * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
       */
    static parse(response: any): AgentAssistMessageResponse;
}
/**
 * Class for AgentAssistConnected
*/
export declare class AgentAssistConnected extends AgentAssistMessageResponse {
    /**
       * Create instance of AgentAssistConnected
       * @example
       * const AgentAssistConnected = new AgentAssistConnected();
       */
    constructor(respHeader: {
        [key: string]: string;
    });
}
/**
 * Class for AgentAssistSubscribed
*/
export declare class AgentAssistSubscribed extends AgentAssistMessageResponse {
    body: {
        topic: string;
    };
    /**
     * Create instance of AgentAssistSubscribed
     * @example
     * const AgentAssistSubscribed = new AgentAssistSubscribed();
     */
    constructor(respHeader: {
        [key: string]: string;
    }, respBody: {
        [key: string]: string;
    });
}
/**
 * Class for AgentAssistUnsubscribed
*/
export declare class AgentAssistUnsubscribed extends AgentAssistMessageResponse {
    body: {
        topic: string;
    };
    /**
     * Create instance of AgentAssistUnsubscribed
     * @example
     * const AgentAssistUnsubscribed = new AgentAssistUnsubscribed();
     */
    constructor(respHeader: {
        [key: string]: string;
    }, respBody: {
        [key: string]: string;
    });
}
/**
 * Class for AgentAssist Error
*/
export declare class AgentAssistError extends AgentAssistMessageResponse {
    body: {
        topic: string;
    };
    /**
     * Create instance of AgentAssistError
     * @example
     * const AgentAssistError = new AgentAssistError();
     */
    constructor(respHeader: {
        [key: string]: string;
    }, respBody: {
        [key: string]: string;
    });
}
/**
 * Class for AutoSummaryData
*/
export declare class AgentAssistAutoSummaryMessage extends AgentAssistMessageResponse {
    body: {
        autoSummary: AutoSummaryData;
    };
    /**
       * Create instance of AutoSummaryData
       * @example
       * const autoSummaryData = new AutoSummaryData();
       */
    constructor(respHeader: {
        [key: string]: string;
    }, respBody: {
        [key: string]: any;
    });
}
