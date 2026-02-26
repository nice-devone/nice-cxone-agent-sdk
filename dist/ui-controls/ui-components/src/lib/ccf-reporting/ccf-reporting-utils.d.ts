import { Dayjs } from 'dayjs';
/** Method to fetch agent performance report using agentId
 * @param range- range of selection
 * @param startDate- start date in dayjs
 * @param endDate- end date in dayjs
 * @returns - formated start date and end date
 * @example -
 * ```
 * getDateRange();
 * ```
 */
export declare const getDateRange: (range: string, startDate?: Dayjs, endDate?: Dayjs) => {
    reqStartDate: Date;
    reqEndDate: Date;
};
