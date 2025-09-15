/**
 * Interface for Directory entry attribute
 */
export interface DirectoryEntryAttribute {
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
    /**
     * @remarks - Value of the attribute
     */
    value: string;
    /**
     * @remarks = Profile type
     */
    profileType?: string;
}
/**
 * Interface for Directory entry
 */
export interface DirectoryEntry {
    unifiedSocketStatus: string;
    /**
     * @remarks - User mapping id
     */
    userMappingId: string;
    /**
     * @remarks - List of directory entry attributes
     */
    attributes: Array<DirectoryEntryAttribute>;
    /**
     * @remarks - unified status
     */
    unifiedStatus?: string;
    /**
     * @remarks - Flag that indicates whether the directory entry is marked as a favorite.
     */
    isFavorite?: boolean;
}
/**
 * Interface for Directory entry additional attributes
 */
export interface DirectoryAdditionalAtrributes {
    userMappingId: string;
    isFavorite?: boolean;
    lastname: string;
    email: string;
    firstname: string;
    [key: string]: string | boolean | DirectoryEntryAttribute[] | undefined;
}
/**
 * Model class for Directory Entries
 */
export declare class DirectoryEntries {
    /**
     * @remarks - current pagination start index
     */
    startIndex: number;
    /**
   * @remarks - pagination size for total records to be pulled.
   */
    totalRecords: number;
    /**
     * @remarks - Name of Directory
     */
    directoryName: string;
    /**
     * @remarks - Unique identification of directory
     */
    directoryId: string;
    /**
     * @remarks - List of Partners
     */
    partners: Array<string>;
    /**
     * @remarks - Status of directory
     */
    status: string;
    /**
     * @remarks - List of directory entries
     */
    directoryEntries: Array<DirectoryEntry>;
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
