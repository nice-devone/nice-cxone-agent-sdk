/**
 * Interface for Directory Data
 */
export interface Directory {
    /**
     * @remarks - Name of the directory
    */
    directoryName: string;
    /**
     * @remarks - Identity of directory
    */
    directoryId: string;
    /**
     * @remarks - Current status of directory
    */
    status: string;
    /**
     * @remarks - Partners of directory.
    */
    partners: string[];
}
