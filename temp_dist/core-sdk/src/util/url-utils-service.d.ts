/**
 * This class to provide url related methods
 */
export declare class UrlUtilsService {
    /**
     * This method to append request parameters to url and return complete url string format
     * @param url - resource url
     * @param map - request parameters
     * @example -
     * ```
     * appendQueryString('https://api-so32.staging.nice-incontact.com',{includeEntries: false})
     * ```
     * @returns - string
     */
    appendQueryString(url: string, map: Record<string, any>): string;
}
