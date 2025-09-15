/**
 * Attributes for Agent State History Response
 */
export interface BulkReplyHistory {
    /**
    * @remarks - total number of bulk reply records
    */
    totalRecords?: number;
    /**
    * @remarks - array of BatchActionView
    */
    data?: Array<BatchActionView>;
    /**
     * @remarks - links for pagination
     */
    _links?: Links;
    /**
     * @remarks - context
     */
    _context?: string[];
}
/**
 * Attributes of the BatchActionView
 */
export interface BatchActionView {
    /**
    * @remarks - batchActionId of the batch
    */
    batchActionId?: string;
    /**
    * @remarks - jobtype of bulk reply
    */
    jobType?: string;
    /**
    * @remarks - jobParameters for bulk reply
    */
    jobParameters?: JobParameters;
    /**
    * @remarks - user name of the loggedin user
    */
    createdByUserName?: string;
    /**
    * @remarks - status of the bulk reply
    */
    status?: string;
    /**
    * @remarks - batchActionItemByStatus
    */
    batchActionItemByStatus?: BatchActionItemByStatus;
    /**
    * @remarks - batchActionItemByStatus
    */
    createdAt: string;
}
export interface JobParameters {
    /**
    * @remarks - content of reply
    */
    messageContent?: Text;
    /**
    * @remarks - type of message
    */
    messageType?: string;
    /**
    * @remarks - userId of loggedin user
    */
    authorUserId?: number;
}
export interface Text {
    /**
    * @remarks - content of reply
    */
    text: string;
}
export interface BatchActionItemByStatus {
    /**
    * @remarks - scheduled reply count
    */
    scheduled: number;
    /**
    * @remarks - success reply count
    */
    success: number;
    /**
    * @remarks - failed reply count
    */
    failure: number;
}
export interface Links {
    /**
     * @remarks - current page
     */
    self?: string;
    /**
     * @remarks - next page
     */
    next?: string | null;
    /**
     * @remarks - previous page
     */
    previous?: string | null;
}
/**
 * Modal for Agent State History Report
 */
export declare class BulkReplyHistoryResponse {
    bulkReplyHistory: BulkReplyHistory;
    /**
    * Function to parse the response from API to model
    * @param data - Data object received
    * @example -
    * ```
    * parse(data);
    * ```
    */
    parse(data: any): void;
}
