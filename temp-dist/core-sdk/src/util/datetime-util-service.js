import { parseInteger } from '@nice-devone/common-sdk';
import { StorageKeys } from '../constants/storage-key';
import { LocalStorageHelper } from './storage-helper-local';
/**
 *  This class to provide date-time services
 */
export class DateTimeUtilService {
    /**
     * This method get server time stamp
     * @param value - any type of value
     * @returns - server time stamp
     * @example -
     * ```
     * getServerTimestamp();
     * ```
     */
    static getServerTimestamp() {
        const now = new Date().getTime();
        const serverTimeOffset = parseInteger(LocalStorageHelper.getItem(StorageKeys.SERVER_TIME_OFFSET));
        return now + serverTimeOffset;
    }
    /**
     * create required date format
     * @param date - date string
     * @returns - Required formated date.
     * @example - getRequiredDateFormat("2022-05-23T06:26:13+00:00")
     */
    static getRequiredDateFormat(date) {
        const today = new Date(date);
        return (String(today.getMonth() + 1).padStart(2, '0') +
            '/' +
            String(today.getDate()).padStart(2, '0') +
            '/' +
            today.getFullYear());
    }
}
//# sourceMappingURL=datetime-util-service.js.map