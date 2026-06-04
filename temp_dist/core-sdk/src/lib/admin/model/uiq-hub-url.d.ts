/**
 * Model to hold the details of a UIQ Hub API response
 */
export declare class UIQHubUrl {
    /**
       * @remarks Aggregator URL
       */
    aggregatorServiceNodeURL: string;
    /**
       * Function to parse the response from API to model
       * @param data - Data object received
       * @example -
       * ```
       * parse(data);
       * ```
       */
    parse(data: {
        [key: string]: unknown;
    }): void;
}
