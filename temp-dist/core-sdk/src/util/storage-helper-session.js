/**
 * To set and get values from storage
 */
export class SessionStorageHelper {
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
        sessionStorage.setItem(key, parsedValue);
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
        const value = sessionStorage.getItem(key) || '';
        if (isObjectFlag) {
            try {
                return JSON.parse(value);
            }
            catch (_error) {
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
        sessionStorage.removeItem(key);
    }
    /**
     * Method to get clear browser storage
     * ```
     * @example
     * clearStorage()
     * ```
     */
    static clearStorage() {
        sessionStorage.clear();
    }
}
//# sourceMappingURL=storage-helper-session.js.map