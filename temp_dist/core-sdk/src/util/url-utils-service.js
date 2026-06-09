/**
 * This class to provide url related methods
 */
export class UrlUtilsService {
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
    appendQueryString(url, map) {
        const queryString = new URLSearchParams(map).toString();
        if (queryString === '')
            return url;
        if (url.includes('?'))
            url += '&' + queryString;
        else
            url += '?' + queryString;
        return url;
    }
}
//# sourceMappingURL=url-utils-service.js.map