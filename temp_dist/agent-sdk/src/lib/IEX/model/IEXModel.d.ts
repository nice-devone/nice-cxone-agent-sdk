/**
 * Interface for IEX API response
 */
export interface IEXResponse {
    /**
     * @remarks name of an activity
     */
    activityName: string;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    startTime: Date;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    endTime: Date;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    startTimeUTC: string;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    endTimeUTC: string;
}
