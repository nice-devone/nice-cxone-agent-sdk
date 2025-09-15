import { Directory } from './directory';
/**
 * Model class for all directories response
 * @example
 *
 */
export declare class Directories {
    /**
     * @remarks - current pagination start index
     */
    startIndex: number;
    /**
    * @remarks - pagination size for total records to be pulled.
    */
    totalRecords: number;
    /**
    * @remarks - agent id for which directories are fetched
    */
    agentId: number;
    /**
    * @remarks - business unit Id of directory
    */
    buId: number;
    /**
    * @remarks - list of available directories
    */
    directories: Directory[];
    /**
     *
     * @param data - Dynamic directory api response data
     * @example - parse(data)
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
