/**
 * Interface for saving the API network request properties
 */
export interface ApiNetworkRequest {
    /**
    @remarks
        Unique id for the sent request
    */
    id: string;
    /**
    @remarks
        URL for the sent request
    */
    url: string;
    /**
    @remarks
        Timestamp in DOMHighResTimeStamp (double) when the request was initiated
    */
    requestTime: number;
    /**
    @remarks
        Timestamp in DOMHighResTimeStamp (double) when the response was received
    */
    responseTime?: number;
    /**
    @remarks
        Difference of responseTime and requestTime
    */
    latency?: number;
}
/**
 * Interface for saving the API network performance properties
 */
export interface ApiNetworkPerformance {
    /**
    @remarks
        Number of last N sampling requests to measure network performance
    */
    numOfSamplingRequests: number;
    /**
    @remarks
        Total number of requests of valid endpoints to measure latency
    */
    totalNumOfRequests: number;
    /**
    @remarks
        Last N API requests that are being used to measure network performance
    */
    requests: ApiNetworkRequest[];
    /**
    * Average latency in seconds for last N sampling requests
    */
    averageLatencyInSeconds: number;
}
/**
 * Interface for sending API network performance metrics to consumers
 */
export interface CXoneApiPerformanceMetrics {
    averageLatencyInSeconds: number;
}
