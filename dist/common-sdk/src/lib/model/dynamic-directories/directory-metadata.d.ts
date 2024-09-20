/**
 * Interface for Directory Metadata fields
 */
interface DirectoryMetadataFields {
    /**
     * @remarks - Partner type
     */
    partnerType: string;
    /**
     * @remarks - Standard name of the attribute
     */
    fieldType: string;
    /**
     * @remarks - Name of the directory
     */
    displayName: string;
}
/**
 * Model class for Directory Metadata
 */
export declare class DirectoryMetadata {
    /**
     * @remarks - agent id for which directories are fetched
     */
    agentId: string;
    /**
     * @remarks - business unit Id of directory
     */
    buId: number;
    /**
     * @remarks - Name of Directory
     */
    directoryName: string;
    /**
     * @remarks - Unique identification of directory
     */
    directoryId: string;
    /**
     * @remarks - Status of directory
     */
    status: string;
    /**
     * @remarks - List of Partners
     */
    partners: Array<string>;
    /**
     * @remarks - List of directory metadata fields
     */
    fields: Array<DirectoryMetadataFields>;
    /**
     * The parse method will take the data object and assign the values to the DirectoryMetadata class properties
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
export {};
