import { CXoneSdkError } from '../error/cxone-sdk-error';
import { DirectoryEntry } from './directory-entries';
/**
 * Model class for Directory Search Result
 */
export declare class SearchDirectoriesResponse {
    /**
     * @remarks - subscription id
     */
    subscriptionId: string;
    /**
     * @remarks - total records in response
     */
    totalRecords: number;
    /**
     * @remarks - Array of directory entries received from search
     */
    directoryEntries: Array<DirectoryEntry>;
    /**
     * @remarks - error received from search
     */
    error: CXoneSdkError | null;
    /**
     * The parse method will take the data object and assign the values to the DirectoryEntries class properties
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: any;
    }): void;
}
