import { DirectoryEntryAttribute } from '@nice-devone/common-sdk';
export interface DirectoryEntryDetails extends Record<string, any> {
    firstname: string;
    lastname: string;
    unifiedStatus: string;
}
export interface CcfDirectoryEntryDetailsProps {
    directoryEntryDetails: DirectoryEntryDetails;
}
export interface DirectoryEntrySelectionAttr extends DirectoryEntryAttribute {
    selected: boolean;
}
export declare enum CallType {
    VOICE = "voice",
    TRANSFER = "transfer"
}
/**
 * Component to be used for directory entries
 *  * @param props - directoryEntryDetails
 * @example <CcfDirectoryEntryDetails />
 * @returns
 */
declare const CcfDirectoryEntryDetails: (props: CcfDirectoryEntryDetailsProps) => JSX.Element;
export default CcfDirectoryEntryDetails;
