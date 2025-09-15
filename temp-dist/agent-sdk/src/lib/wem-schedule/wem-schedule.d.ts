import { AgentSchedule, Logger } from '@nice-devone/core-sdk';
import { CXoneSdkError } from '@nice-devone/common-sdk';
/**
 * Class to manage all wem-schedule related methods
 */
export declare class WemSchedule {
    private wemScheduleService;
    protected logger: Logger;
    /**
     * get instance for wemScheduleService
     * @example
     * ```
     * this.wemScheduleService = new WemScheduleService();
     * ```
     */
    constructor();
    /**
     * Get the current logged in agent schedule
     * @param startDate - start date for fetching schedule
     * @param endDate - end date for fetching schedule
     * @returns - It returns the agent schedule
     * ```
     * @example
     * getSchedule(Tue Aug 16 2022 11:49:38 GMT+0530, Tue Aug 17 2022 11:49:38 GMT+0530);
     * ```
     */
    getSchedule(startDate: Date, endDate: Date): Promise<AgentSchedule[] | CXoneSdkError>;
}
