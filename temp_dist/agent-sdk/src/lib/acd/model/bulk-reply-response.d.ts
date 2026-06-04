/**
 * Attributes for the Bulk Reply Response
 */
export interface BulkReply {
    /**
    * @remarks - Job type
    */
    job?: Job;
}
interface Job {
    /**
    * @remarks - type of job
    */
    type?: string;
    /**
    * @remarks - job details
    */
    details?: BatchActionId;
}
interface BatchActionId {
    /**
    * @remarks - batchActionId of job
    */
    batchActionId: string;
}
/**
 * Model for Bulk Reply Response
 */
export declare class BulkReplyResponse {
    bulkReplyResponse: BulkReply;
    /**
     * Function to parse the response from API to model
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
    */
    parse(data: BulkReply): void;
}
export {};
