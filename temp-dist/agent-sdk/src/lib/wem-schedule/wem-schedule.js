import { Logger } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { WemScheduleService } from './service/wem-schedule-service';
/**
 * Class to manage all wem-schedule related methods
 */
export class WemSchedule {
    /**
     * get instance for wemScheduleService
     * @example
     * ```
     * this.wemScheduleService = new WemScheduleService();
     * ```
     */
    constructor() {
        this.wemScheduleService = {};
        this.logger = new Logger('SDK', 'WemSchedule');
        this.wemScheduleService = new WemScheduleService();
    }
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
    getSchedule(startDate, endDate) {
        return new Promise((resolve, reject) => {
            if (startDate <= endDate) {
                this.wemScheduleService.getSchedule(startDate, endDate).then((response) => {
                    resolve(response);
                }, (error) => {
                    this.logger.error('getSchedule', 'getSchedule for user failed ' + JSON.stringify(error));
                    reject(new CXoneSdkError(CXoneSdkErrorType.NO_DATA_FOUND, 'Data not found'));
                });
            }
            else {
                this.logger.error('getSchedule', 'endDate should be greater than startDate');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'endDate should be greater than startDate'));
            }
        });
    }
}
//# sourceMappingURL=wem-schedule.js.map