import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { Logger, HttpClient, HttpUtilService, ApiUriConstants, } from '@nice-devone/core-sdk';
/**
 * Class to perform schedule service
 */
export class WemScheduleService {
    constructor() {
        this.logger = new Logger('agent-sdk', 'ScheduleService');
        this.utilService = new HttpUtilService();
    }
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
    getSchedule(startDate, endDate) {
        this.logger.info('getSchedule', 'Get Schedule');
        const user = CXoneUser.instance.getUserInfo();
        const baseUrl = CXoneAuth.instance.getCXoneConfig().userHubBaseUrl;
        const authToken = CXoneAuth.instance.getAuthToken().accessToken;
        const reqInit = this.utilService.initHeader(authToken, 'application/json');
        const url = baseUrl +
            ApiUriConstants.GET_AGENT_SCHEDULE.replace('{userId}', user === null || user === void 0 ? void 0 : user.userId)
                .replace('{startDate}', startDate.toISOString())
                .replace('{endDate}', endDate.toISOString());
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((resp) => {
                this.logger.info('getSchedule', 'Get agent schedule success');
                const schedules = resp.data.schedules && resp.data.schedules[0]
                    ? resp.data.schedules[0]
                    : [];
                const activitiesOutOfShifts = this.getActivities(schedules.activityIntervals);
                const shiftsAndActivities = this.getShiftsAndActivities(schedules.shifts);
                resolve(activitiesOutOfShifts.concat(shiftsAndActivities));
            }, (error) => {
                this.logger.info('getSchedule', 'Get agent schedule failed' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get shifts and activities
     * @returns - agent schedule
     * ```
     * @example
     * getShiftsAndActivities()
     * ```
     */
    getShiftsAndActivities(shifts) {
        this.logger.info('getShiftsAndActivities', 'Get Shifts and Activities');
        let shiftsAndActivities = [];
        if (shifts && shifts.length > 0) {
            shifts.forEach((shift) => {
                var _a, _b, _c;
                const schedule = {};
                schedule.id = (_a = shift === null || shift === void 0 ? void 0 : shift.baseActivityCode) === null || _a === void 0 ? void 0 : _a.id;
                schedule.title = 'shift';
                schedule.start = new Date(shift === null || shift === void 0 ? void 0 : shift.start);
                schedule.end = new Date(shift === null || shift === void 0 ? void 0 : shift.end);
                schedule.notes = shift === null || shift === void 0 ? void 0 : shift.shiftNotes;
                schedule.backgroundColor =
                    (_c = (_b = shift === null || shift === void 0 ? void 0 : shift.baseActivityCode) === null || _b === void 0 ? void 0 : _b.activityCodeCategory) === null || _c === void 0 ? void 0 : _c.color;
                shiftsAndActivities.push(schedule);
                shiftsAndActivities = shiftsAndActivities.concat(this.getActivities(shift.activityIntervals));
            });
        }
        return shiftsAndActivities;
    }
    /**
     * Method to get activities
     * @returns - activities
     * ```
     * @example
     * getActivities()
     * ```
     */
    getActivities(activityIntervals) {
        this.logger.info('getActivities', 'Get Activities');
        const activities = [];
        if (activityIntervals && activityIntervals.length > 0) {
            activityIntervals.forEach((activity) => {
                var _a, _b, _c, _d;
                const schedule = {};
                schedule.id = (_a = activity === null || activity === void 0 ? void 0 : activity.activityCode) === null || _a === void 0 ? void 0 : _a.id;
                schedule.title = (_b = activity === null || activity === void 0 ? void 0 : activity.activityCode) === null || _b === void 0 ? void 0 : _b.title;
                schedule.start = new Date(activity === null || activity === void 0 ? void 0 : activity.start);
                schedule.end = new Date(activity === null || activity === void 0 ? void 0 : activity.end);
                schedule.notes = activity === null || activity === void 0 ? void 0 : activity.activityNotes;
                schedule.backgroundColor =
                    (_d = (_c = activity === null || activity === void 0 ? void 0 : activity.activityCode) === null || _c === void 0 ? void 0 : _c.activityCodeCategory) === null || _d === void 0 ? void 0 : _d.color;
                activities.push(schedule);
            });
        }
        return activities;
    }
}
//# sourceMappingURL=wem-schedule-service.js.map