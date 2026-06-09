/**
 * Interface for dynamic directory search request
 */
export interface SearchDirectoriesRequest {
    /**
     * @remarks - subscription id to request(optional)
     */
    subscriptionId?: string;
    /**
     * @remarks - This is first name, last name or email to be searched(required)
     */
    searchString?: string;
    /**
     * @remarks - passed as true if real time update is required over websocket else false if only one time result is required(required)(default - false).
     */
    realTimeUpdates?: boolean;
    /**
     * @remarks - Number of records to be skipped for current pagination(required)
     */
    skip?: number;
    /**
     * @remarks - Number of records to be fetched current pagination(required)
     */
    top?: number;
    /**
     * @remarks - directory id passed if search is required on a specific directory(optional)
     */
    directoryUUID?: string;
    /**
     * @remarks - Partner type on which search result is filterd(to be passed with field type)
     */
    partnerType?: Array<string>;
    /**
     * @remarks - Field type on which search result is filterd(to be passed with partner type)
     */
    fieldType?: Array<string>;
}
