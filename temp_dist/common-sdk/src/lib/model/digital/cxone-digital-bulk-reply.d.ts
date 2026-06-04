/**
   * interface used for bulk reply request
   * @returns - reply request property types
   * ```
   * @example
   * ```
*/
export interface CXoneDigitalBulkReplyRequest {
    job: Job;
    contactIds: Array<string>;
}
interface Job {
    /**
    * @remarks - type of job
    */
    type?: string;
    /**
    * @remarks - parameters of the job
    */
    parameters?: Parameter;
}
interface Parameter {
    /**
    * @remarks - content of reply
    */
    messageContent?: string;
    /**
    * @remarks - threadId of post on other digital platforms.
    */
    messageType?: string;
    /**
    * @remarks - threadId of post on other digital platforms.
    */
    authorUserId?: string;
}
export {};
