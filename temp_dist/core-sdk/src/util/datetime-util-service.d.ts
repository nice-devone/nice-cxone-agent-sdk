/**
 *  This class to provide date-time services
 */
export declare class DateTimeUtilService {
    /**
     * This method get server time stamp
     * @param value - any type of value
     * @returns - server time stamp
     * @example -
     * ```
     * getServerTimestamp();
     * ```
     */
    static getServerTimestamp(): number;
    /**
     * create required date format
     * @param date - date string
     * @returns - Required formated date.
     * @example - getRequiredDateFormat("2022-05-23T06:26:13+00:00")
     */
    static getRequiredDateFormat(date: string): string;
    /**
     * Strips a Date or date-string to seconds precision.
     *
     * @param value - The date value to convert.
     * @returns The ISO string truncated to seconds.
     * @example  "2025-01-01T12:34:56.789Z" to "2025-01-01T12:34:56Z"
     */
    static stripToSeconds: (value: string | Date) => string;
}
