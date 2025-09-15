/**
 * This is overlay offline network class event for timeout
 */
export declare class UpdateNetworkTimeoutEvent {
    /**
     *  @remarks - This variable holds the total network request which are done during an offline network event. The max it can go is upto 10.
     */
    totalNetworkRequestExecuted: number;
    /**
     *  @remarks - This variable holds the description of the error which took place.
     */
    retryStatus: string;
    /**
     * This method to parse the data codes passed from the adapter.
     * @param data -
     * @example -
     * ```
     *parseData(data);
     * ```
     */
    parseData(data: any): void;
}
