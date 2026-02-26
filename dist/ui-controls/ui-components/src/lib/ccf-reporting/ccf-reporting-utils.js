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
export const getDateRange = (range, startDate, endDate) => {
    let reqStartDate;
    let reqEndDate;
    let minutes;
    const today = new Date();
    switch (range) {
        case 'today': {
            reqStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            minutes = today.getMinutes();
            const minuteInterval = (Math.floor(minutes / 15)) * 15;
            today.setMinutes(minuteInterval);
            today.setSeconds(0, 0);
            today.setMinutes(today.getMinutes() + 15);
            reqEndDate = today;
            break;
        }
        case 'yesterday': {
            reqStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0, 0, 0);
            reqEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            break;
        }
        case 'last7Days': {
            reqStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7, 0, 0, 0);
            reqEndDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            break;
        }
        case 'custom': {
            if (startDate && endDate) {
                reqStartDate = new Date(startDate.year(), startDate.month(), startDate.date(), 0, 0, 0);
                reqEndDate = new Date(endDate.year(), endDate.month(), endDate.date(), 23, 45, 0);
            }
        }
    }
    return { reqStartDate, reqEndDate };
};
//# sourceMappingURL=ccf-reporting-utils.js.map