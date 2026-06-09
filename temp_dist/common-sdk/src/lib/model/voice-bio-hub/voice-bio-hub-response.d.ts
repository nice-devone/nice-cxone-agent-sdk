import { VoiceBioHubData } from './voice-bio-hub';
/**
 * Class for AgentAssistMessageResponse
*/
export declare class VoiceBioHubResponse {
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
    static parse(response: any): VoiceBioHubResponse;
}
/**
 * Class for AutoSummaryData
*/
export declare class AgentAssistVoiceBioMessage extends VoiceBioHubResponse {
    body: {
        data: VoiceBioHubData;
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
