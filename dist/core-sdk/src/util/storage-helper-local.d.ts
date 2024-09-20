import { Logger } from '../logger/logger';
/**
 * To set and get values from storage
 */
export declare class LocalStorageHelper {
    static logger: Logger;
    /**
       * Method to set value to browser storage
       
       * @param key - 'key on which value is to be stored'
       * @param value - 'value to be saved in defined key'
       * ```
       * @example
       * setItem('key','value')
       * ```
       */
    static setItem(key: string, value: any): void;
    /**
       * Method to get value from browser storage
       
       * @param key - 'key for which value needs to be fetched from stored'
       * @param isObjectFlag - 'if the value fetched is object or not'
       * ```
       * @example
       * getItem('key',true)
       * ```
       */
    static getItem(key: string, isObjectFlag?: boolean): any;
    /**
       * Method to remove key value pair from browser storage
       
       * @param key - 'key for which value needs to be removed'
       * ```
       * @example
       * removeItem('key')
       * ```
       */
    static removeItem(key: string): void;
    /**
       * Method to get clear browser storage
       
       * ```
       * @example
       * clearStorage()
       * ```
       */
    static clearStorage(): void;
}
