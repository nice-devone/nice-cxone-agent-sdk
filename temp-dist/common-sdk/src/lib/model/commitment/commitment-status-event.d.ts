/**
 * Class to capture commitment PromiseKeeperStatus event
 */
export declare class CommitmentStatusEvent {
    /**
       * @remarks - Commitment Event Status with PromiseKeeperStatus
       */
    status: string;
    /**
       * This method to parse promise keeper status event data
       * @param data -
       * @example -
       * ```
       *parse(data);
       * ```
       */
    parse(data: {
        [key: string]: string;
    }): void;
}
