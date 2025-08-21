"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePort = exports.formatTimestamp = exports.getCurrentDate = exports.validateURLOrACDStrings = exports.formatDateTime = exports.generateQueryForMultiSelectFilters = exports.generateQueryForFilters = exports.getQueryURLForSearchThreadsTab = exports.getQueryURLForCustomerTab = exports.getQueryURLForSearchMessagesTab = exports.getQueryURLFromObjectKeys = exports.calculatePercentage = exports.getTimeStringFromMS = exports.getMillisecondsFrom8601DurationString = exports.getDurationInSeconds = exports.getElapsedMinutes = exports.parseInteger = exports.parseBooleanString = void 0;
const logical_operators_1 = require("../enum/logical-operators");
const screen_pop_urls_1 = require("../enum/screen-pop-urls");
/**
 * Use to parse the string properties with "True" or "False" values to corresponding boolean value
 * @param value - string values
 * @example -
 * ```
 * parseBoolean(jsonData)
 * ```
 */
const parseBooleanString = (value) => {
    if (typeof (value) === 'boolean') {
        return value;
    }
    else {
        return ((value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'true' || (value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'on');
    }
};
exports.parseBooleanString = parseBooleanString;
/**
 * Parse input value as integer
 * @param value - input value that needs to be parsed
 *  @example -
 * ```
 * parseInteger('10')
 * ```
 */
const parseInteger = (value) => {
    if (value !== null && value !== undefined && isNaN(value) === false) {
        value = isNaN(+value) ? 0 : +value;
        return parseInt(value, 10);
    }
    return 0;
};
exports.parseInteger = parseInteger;
/**
* Computes the elapsed time since the moment the function is called in minutes
* @param time - start time to compute the elapsed time since
* @returns number elapsed time in minutes
*  @example -
 * ```
 * getElapsedMinutes('10')
 * ```
 */
const getElapsedMinutes = (time) => {
    const currentTime = new Date().toISOString();
    const minutes = (new Date(currentTime).getTime() - time.getTime()) / 1000 / 60;
    if (minutes && Math.ceil(minutes)) {
        return Math.ceil(minutes);
    }
    else {
        return 0;
    }
};
exports.getElapsedMinutes = getElapsedMinutes;
/**
* Function to calculate current hold time for any call
* @returns - time in seconds
* @param dateTime - Date
* @example - getDurationInSeconds(new Date())
*/
const getDurationInSeconds = (dateTime) => {
    return Math.ceil((new Date().getTime() - new Date(dateTime).getTime()) / 1000);
};
exports.getDurationInSeconds = getDurationInSeconds;
/**Returns milliseconds from ISO-8601 duration string (e.g. P1Y2M10DT2H30M)
* after getting confirmation from product will update the logic
* get date and time format
* @param duration - date string
* @returns - Milliseconds
* @example - getMillisecondsFrom8601DurationString("PTOS")
*/
const getMillisecondsFrom8601DurationString = (duration) => {
    let milliseconds = 0;
    // eslint-disable-next-line no-useless-escape
    const iso8601DurationRegex = /(-)?P(?:([\.,\d]+)Y)?(?:([\.,\d]+)M)?(?:([\.,\d]+)W)?(?:([\.,\d]+)D)?T(?:([\.,\d]+)H)?(?:([\.,\d]+)M)?(?:([\.,\d]+)S)?/;
    const matches = duration.match(iso8601DurationRegex);
    if (matches) {
        milliseconds += matches[5] === undefined ? 0 : Number(matches[5]) * 24 * (60 * (60 * 1000));
        milliseconds += matches[6] === undefined ? 0 : Number(matches[6]) * (60 * (60 * 1000));
        milliseconds += matches[7] === undefined ? 0 : Number(matches[7]) * (60 * 1000);
        milliseconds += matches[8] === undefined ? 0 : Number(matches[8]) * 1000;
    }
    return milliseconds;
};
exports.getMillisecondsFrom8601DurationString = getMillisecondsFrom8601DurationString;
/**
* This method is used to get the duration out of milliseconds
* @param millisecond - number
* @returns - formatted duration hh:mm:ss
* @example - getTimeStringFromMS(milliseconds)
*/
const getTimeStringFromMS = (milliseconds) => {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let seconds = null;
    let minutes = null;
    let hours = null;
    if (totalSeconds < 0) {
        totalSeconds = 0;
    }
    seconds = ('0' + totalSeconds % 60).slice(-2);
    minutes = ('0' + Math.floor(totalSeconds / 60) % 60).slice(-2);
    // the timer is over 100 hours
    if (totalSeconds >= 360000) {
        hours = Math.floor(totalSeconds / 3600);
        return hours + ':' + minutes + ':' + seconds;
    }
    else {
        hours = ('0' + Math.floor(totalSeconds / 3600)).slice(-2);
    }
    const formatedDate = new Date(1970, 1, 1, Number(hours), Number(minutes), Number(seconds));
    return `${('0' + formatedDate.getHours().toString()).slice(-2)}:${('0' + formatedDate.getMinutes().toString()).slice(-2)}:${('0' + formatedDate.getSeconds().toString()).slice(-2)}`;
};
exports.getTimeStringFromMS = getTimeStringFromMS;
/**Returns percentage of value to the total
* @param value - number
* @param total - number
* @returns - number of percentage
* @example - calculatePercentage(10, 100))
*/
const calculatePercentage = (value, total) => {
    return Math.round(value / total * 100);
};
exports.calculatePercentage = calculatePercentage;
/**
 * creates query url from provided object key values
 * @param requestObject - kev value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLFromObjectKeys(requestObject)
 * ```
 */
const getQueryURLFromObjectKeys = (requestObject) => {
    let queryUrl = '', adhocQuery = '';
    let isQueryApplied = false;
    // below query params don't need [] before assigning value.
    // for eg: /contacts?&query=%20caseId%3D349196096&status[]=open&sorting=updatedAt&sortingType=desc
    const noBracketParams = ['scrollToken', 'sorting', 'sortingType', 'query', 'page', 'order', 'orderBy'];
    // below query params need to be sent in ad-hoc query.
    // for eg: /contacts?&sorting=createdAt&sortingType=desc&query=inboxAssigneeAgentId%20IN%20(1395080)%20AND%20ownerAssigneeAgentId%20IN%20(1395080)
    const adHocFilters = ['ownerAssigneeAgentId', 'inboxAssigneeAgentId', 'skillId', 'channel', 'status', 'tag'];
    const encodeRequiredParams = ['query'];
    if (requestObject) {
        for (const [key, value] of Object.entries(requestObject)) {
            if (key === 'query')
                isQueryApplied = true;
            let encodedValue = value;
            if (encodeRequiredParams.includes(key)) {
                encodedValue = encodeURIComponent(value);
            }
            if (adHocFilters.includes(key) && value && Array.isArray(value)) {
                adhocQuery = `${adhocQuery !== '' ? adhocQuery + ' ' + logical_operators_1.LogicalOperator.AND + ' ' : ''}` + (0, exports.generateQueryForFilters)(key, value);
            }
            else if (value) {
                //if query param contains key as from and to then it will display the query param as date[from] or date[to]
                const paramValue = (key === 'from' || key === 'to' ? `[${key}]=` : '[]=');
                queryUrl = queryUrl + '&' + (key === 'from' || key === 'to' ? 'date' : key) + (noBracketParams.includes(key) ? '=' : paramValue) + encodedValue;
            }
        }
    }
    if (adhocQuery !== '') {
        return isQueryApplied ? `?${queryUrl} ${logical_operators_1.LogicalOperator.AND} ${adhocQuery}` : `?${queryUrl}&query=${adhocQuery}`;
    }
    return `?${queryUrl}`;
};
exports.getQueryURLFromObjectKeys = getQueryURLFromObjectKeys;
/**
 * Method to create query url from provided object key values for search in message tab.
 * @param requestObject - kev value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLForSearchMessagesTab(requestObject)
 * ```
 */
const getQueryURLForSearchMessagesTab = (requestObject) => {
    let queryUrl = '', filterQuery = '';
    // below query params don't need [] before assigning value.
    // for eg: /messages?&sorting=updatedAt&sortingType=desc
    const noBracketParams = ['scrollToken', 'sorting', 'sortingType', 'query', 'withContext'];
    // below query params need to be sent in multiple params.
    // for eg: /messages?channel[]=fb_108412721877255&channel[]=fb_108412721877260&tag[]=11104&isRead[]=true&&sorting=createdAt&sortingType=desc&date[from]=2023-02-22&date[to]=2024-04-01&query=content=hrthrt
    const multiSelectFilters = ['tag', 'channel', 'isRead', 'agent'];
    const encodeRequiredParams = ['query'];
    if (requestObject) {
        for (const [filterName, filterValue] of Object.entries(requestObject)) {
            if (multiSelectFilters.includes(filterName) && filterValue && Array.isArray(filterValue)) {
                filterQuery = (filterValue === null || filterValue === void 0 ? void 0 : filterValue.length) > 0 ? `${filterQuery !== '' ? filterQuery + '&' : ''}` + (0, exports.generateQueryForMultiSelectFilters)(filterName, filterValue) : filterQuery;
            }
            else if (filterValue) {
                let encodedFilterValue = filterValue;
                if (encodeRequiredParams.includes(filterName)) {
                    encodedFilterValue = encodeURIComponent(filterValue);
                }
                const paramValue = (filterName === 'from' || filterName === 'to' ? `[${filterName}]=` : '[]=');
                queryUrl = queryUrl + '&' + (filterName === 'from' || filterName === 'to' ? 'date' : filterName) + (noBracketParams.includes(filterName) ? '=' : paramValue) + encodedFilterValue;
            }
        }
    }
    return `?${filterQuery ? filterQuery + queryUrl : queryUrl}`;
};
exports.getQueryURLForSearchMessagesTab = getQueryURLForSearchMessagesTab;
/**
 *Method to create query url from provided object key values for search customer tab
 * @param requestObject - key value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLForCustomerTab(requestObject)
 * ```
 */
const getQueryURLForCustomerTab = (requestObject) => {
    //adding size 25 as customers api by default returns 20 items.
    let queryUrl = '&size=25', adhocQuery = '';
    let isQueryApplied = false;
    // below query params don't need [] before assigning value.
    // for eg: /customers?&query=%hi%&order=updatedAt&orderBy=desc
    const noBracketParams = ['query', 'order', 'orderBy', 'page'];
    const booleanFilters = ['hasNote'];
    const encodeRequiredParams = ['query'];
    if (requestObject) {
        for (let [filterName, filterValue] of Object.entries(requestObject)) {
            if (filterName === 'sorting') {
                filterName = 'orderBy';
            }
            else {
                filterName = filterName === 'sortingType' ? 'order' : filterName;
            }
            if (filterName === 'query')
                isQueryApplied = true;
            if (booleanFilters.includes(filterName)) {
                if (filterValue === 'true') {
                    adhocQuery = (adhocQuery ? adhocQuery + `${logical_operators_1.LogicalOperator.AND}` : '' + `${filterName}=1`);
                }
                else {
                    adhocQuery = '';
                }
            }
            else {
                queryUrl = queryUrl + '&' + (noBracketParams.includes(filterName) ? `${filterName}=${filterValue}` : '');
            }
            if (encodeRequiredParams.includes(filterName))
                filterValue = encodeURIComponent(filterValue);
        }
        if (adhocQuery !== '') {
            return isQueryApplied ? `?${queryUrl} ${logical_operators_1.LogicalOperator.AND} ${adhocQuery}` : `?${queryUrl}&query=${adhocQuery}`;
        }
    }
    return `?${queryUrl}`;
};
exports.getQueryURLForCustomerTab = getQueryURLForCustomerTab;
/**
 * Method to create query url from provided object key values for search in Threads Tab.
 * @param requestObject - kev value pair
 * @returns query string created from object
 * @example -
 * ```
 * getQueryURLForSearchThreadsTab(requestObject)
 * ```
 */
const getQueryURLForSearchThreadsTab = (requestObject) => {
    let queryUrl = '';
    // below query params don't need [] before assigning value.
    // for eg: /threads?&sortBy=createdAt&sortType=desc&query=channelId=fb_108412721877260
    const noBracketParams = ['query', 'page', 'sortBy', 'sortType', 'withContext'];
    if (requestObject) {
        for (const [filterName, filterValue] of Object.entries(requestObject)) {
            if (filterValue) {
                if (filterName !== 'from' && filterName !== 'to' && filterName !== 'channel') {
                    const paramValue = filterName === 'from' || filterName === 'to' ? `[${filterName}]=` : '[]=';
                    queryUrl = queryUrl + '&' + (filterName === 'from' || filterName === 'to' ? 'date' : filterName) + (noBracketParams.includes(filterName) ? '=' : paramValue) + filterValue;
                }
            }
        }
    }
    return `?${queryUrl}`;
};
exports.getQueryURLForSearchThreadsTab = getQueryURLForSearchThreadsTab;
/**
   * Method to generate a query for filters
   * @returns - new query for filters, status IN (open, close)
   * @example - generateQueryForFilters('status', [open, close])
   * @param filterName - filter name e.g: status, channel, etc
   * @param filterOptions - filter options
*/
const generateQueryForFilters = (filterName, filterOptions) => {
    let filterQuery = '';
    filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.forEach(option => {
        filterQuery += (filterQuery ? ',' : '') + encodeURIComponent(option.id);
    });
    return `${filterName} ${logical_operators_1.LogicalOperator.IN} (${filterQuery})`;
};
exports.generateQueryForFilters = generateQueryForFilters;
/**
   * Method to generate a query for multi-select filters
   * @returns - new query for filters, channel[]=1395080&channel[]=1395081
   * @example - generateQueryForMultiSelectFilters('channel', [1395080, 1395081])
   * @param filterName - filter name e.g: tag, channel, etc
   * @param filterOptions - filter options
*/
const generateQueryForMultiSelectFilters = (filterName, filterOptions) => {
    let filterQuery = '';
    filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.forEach(option => {
        filterQuery += (filterQuery ? '&' : '') + filterName + '[]=' + encodeURIComponent(option.id);
    });
    return filterQuery;
};
exports.generateQueryForMultiSelectFilters = generateQueryForMultiSelectFilters;
/**
 * Formats a date string to the current locale
 *
 * @param dateString - The date string to format, in the format "YYYY-MM-DDTHH:mm:ss+00:00"
 * @param locale - browser locale default will be 'en-US'
 * @param hour12 - should the hour cycle be 12 hour (true) or 24 hour (false)
 * @returns The formatted date string in the locale format
 *
 * @example
 * formatDateTime("2020-09-18T06:26:55+00:00", 'en-US'); // Returns "18/09/20 11:56am"
 */
const formatDateTime = (dateString, locale = 'en-US', hour12 = true) => {
    const dateInstance = new Date(dateString);
    const localizedDate = Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: '2-digit' })
        .format(dateInstance);
    const timeParts = Intl.DateTimeFormat(locale, { timeStyle: 'short', hour12 })
        // There's a space between minutes and dayPeriod (AM/PM) - "11:56 AM", remove that.
        .format(dateInstance).split(' ');
    const dayPeriodSuffix = timeParts[timeParts.length - 1];
    // Make dayPeriod (AM/PM) part lowercase
    if (hour12 && dayPeriodSuffix.endsWith('M'))
        timeParts[timeParts.length - 1] = dayPeriodSuffix.toUpperCase();
    return `${localizedDate} ${timeParts.join(' ')}`;
};
exports.formatDateTime = formatDateTime;
/**
 * Validate URL
 *
 * @param inputURL - url to validate
 * @returns True if URL is valid else false
 *
 * Also validate against strings passed in from the backend for PageOpen
 *
 * @example validateURLOrACDStrings('https://www.iplt20.com');
 */
const validateURLOrACDStrings = (inputURL) => {
    let isValidURL = false;
    if (inputURL.toLowerCase() === screen_pop_urls_1.ScreenPopStrings.PageOpen) {
        isValidURL = true;
    }
    else {
        try {
            new URL(inputURL);
            isValidURL = true;
        }
        catch (_error) {
            isValidURL = false;
        }
    }
    return isValidURL;
};
exports.validateURLOrACDStrings = validateURLOrACDStrings;
/**
 * Method to get current date and time if the string is a valid JSON
 * @example getCurrentDate()
 * @returns '2025-04-11T16:08:27.950+05:30'
 */
const getCurrentDate = () => {
    const now = new Date();
    const isoString = now.toISOString().replace('Z', '');
    const offset = -now.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
    const minutes = Math.abs(offset % 60).toString().padStart(2, '0');
    // Combine ISO string with the timezone offset
    return `${isoString}${sign}${hours}:${minutes}`;
};
exports.getCurrentDate = getCurrentDate;
/**
 * Method to return format the TimeStamp
 * @param timestamp - '2025-04-11T16:19:59+00:00'
 * @param locale - 'en-US'
 * @example - formatTimestamp('en-US', '2025-04-11T16:19:59+00:00');
 * ```typescript
 * formatTimestamp('en-US','2025-04-11T16:19:59+00:00');
 * ```
 * @returns - '9:49 PM'
 */
const formatTimestamp = (locale, timestamp) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(timestamp).toLocaleTimeString(locale, options);
};
exports.formatTimestamp = formatTimestamp;
/**
 * Validate Port
 *
 * @param port - port to validate
 * @returns True if port is valid else false
 *
 *
 * @example validatePort('8080');
 */
const validatePort = (port) => {
    if (typeof port === 'string') {
        if (port === '' || port !== port.trim()) {
            return false;
        }
    }
    const portNumber = Number(port);
    const isValidPort = Number.isInteger(portNumber) && portNumber >= 0 && portNumber <= 65535;
    return isValidPort;
};
exports.validatePort = validatePort;
//# sourceMappingURL=utility.js.map