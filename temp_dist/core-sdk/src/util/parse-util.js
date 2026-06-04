/**
 *  This class to provide type conversion methods
 */
export class ParseUtil {
    /**
     * This method convert string type numeric value into integer type
     * @param value - any type of value
     * @returns - parsed numeric value
     * @example -
     * ```
     * toNumber('123');
     * ```
    */
    static toNumber(value) {
        if (value !== null && value !== undefined && isNaN(value) === false) {
            value = isNaN(+value) ? 0 : +value;
            return parseInt(value, 10);
        }
        return 0;
    }
}
//# sourceMappingURL=parse-util.js.map