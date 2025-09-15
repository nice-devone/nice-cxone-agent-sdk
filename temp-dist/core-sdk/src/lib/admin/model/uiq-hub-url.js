/**
 * Model to hold the details of a UIQ Hub API response
 */
export class UIQHubUrl {
    /**
       * Function to parse the response from API to model
       * @param data - Data object received
       * @example -
       * ```
       * parse(data);
       * ```
       */
    parse(data) {
        this.aggregatorServiceNodeURL = data.aggregatorServiceNodeURL;
    }
}
//# sourceMappingURL=uiq-hub-url.js.map