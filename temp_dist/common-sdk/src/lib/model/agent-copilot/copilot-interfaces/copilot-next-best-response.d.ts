/**
 * model interface for Next Best Responses Content
 */
export interface CopilotNextBestResponse {
    /**
     * copilot next best reponses
     */
    nextBestResponses: {
        /**
         * type of nextBestResponse
         */
        type: string;
        /**
         * array of responses
         */
        bestResponse: string[];
    };
}
