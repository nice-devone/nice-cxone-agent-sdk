export interface WsRequest {
    headers: unknown;
    body?: unknown;
}
/**
 * @remarks interface for query params for websocket request
 */
export interface WsRequestQueryParams {
    /**
      * @remarks  Id of tenant to which user belongs
      */
    tenantId: string;
    /**
      * @remarks  userId of the user
      */
    userId: string;
}
