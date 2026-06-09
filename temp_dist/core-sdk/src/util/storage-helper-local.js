import { Logger } from '../logger/logger';
/**
 * To set and get values from storage
 */
export class LocalStorageHelper {
    /**
       * Method to set value to browser storage
       
       * @param key - 'key on which value is to be stored'
       * @param value - 'value to be saved in defined key'
       * ```
       * @example
       * setItem('key','value')
       * ```
       */
    static setItem(key, value) {
        const parsedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        try {
            localStorage.setItem(key, parsedValue);
        }
        catch (error) {
            LocalStorageHelper.logger.error('setItem', 'Local storage quota exceeded ' + JSON.stringify(error));
        }
    }
    /**
       * Method to get value from browser storage
       
       * @param key - 'key for which value needs to be fetched from stored'
       * @param isObjectFlag - 'if the value fetched is object or not'
       * ```
       * @example
       * getItem('key',true)
       * ```
       */
    static getItem(key, isObjectFlag = false) {
        const value = localStorage.getItem(key) || '';
        if (isObjectFlag) {
            try {
                return JSON.parse(value);
            }
            catch (_) {
                return value;
            }
        }
        return value;
    }
    /**
       * Method to remove key value pair from browser storage
       
       * @param key - 'key for which value needs to be removed'
       * ```
       * @example
       * removeItem('key')
       * ```
       */
    static removeItem(key) {
        localStorage.removeItem(key);
    }
    /**
       * Method to get clear browser storage
       
       * ```
       * @example
       * clearStorage()
       * ```
       */
    static clearStorage() {
        localStorage.clear();
    }
}
LocalStorageHelper.logger = new Logger('cxone-sdk', 'cxone-sdk-local-storage');
//# sourceMappingURL=storage-helper-local.js.map