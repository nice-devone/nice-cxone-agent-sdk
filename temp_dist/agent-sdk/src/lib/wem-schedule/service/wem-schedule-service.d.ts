import { CXoneSdkError } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, AgentSchedule } from '@nice-devone/core-sdk';
/**
 * Class to perform schedule service
 */
export declare class WemScheduleService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    /**
     * Method to get agent schedule
     * @param startDate - start date for fetching schedule
     * @param endDate - end date for fetching schedule
     * @returns - agent Schedule
     * ```
     * @example
     * getSchedule(Tue Aug 16 2022 11:49:38 GMT+0530, Tue Aug 17 2022 11:49:38 GMT+0530)
     * ```
     */
    getSchedule(startDate: Date, endDate: Date): Promise<AgentSchedule[] | CXoneSdkError>;
    /**
     * Method to get shifts and activities
     * @returns - agent schedule
     * ```
     * @example
     * getShiftsAndActivities()
     * ```
     */
    private getShiftsAndActivities;
    /**
     * Method to get activities
     * @returns - activities
     * ```
     * @example
     * getActivities()
     * ```
     */
    private getActivities;
}
