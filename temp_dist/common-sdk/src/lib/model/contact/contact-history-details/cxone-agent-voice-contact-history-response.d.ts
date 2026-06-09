/**
 * Interface used as a Model for Request JSON sent for Fetching Contact History
 * @returns returns - Contact History Data on basis of author customer identity id
 * ```
 * @example
 * Array<ContactHistoryRequest>
 * ```
 */
interface AgentVoiceContactHistoryResponse {
    contactId: string;
    firstName: string;
    fromAddr: number;
    lastName: string;
    lastUpdateTime: string;
    mediaType: number;
    mediaTypeName: string;
    skillName: string;
    image: string;
    isOutbound: boolean;
}
export declare type CXoneAgentVoiceContactHistoryResponse = AgentVoiceContactHistoryResponse;
export {};
