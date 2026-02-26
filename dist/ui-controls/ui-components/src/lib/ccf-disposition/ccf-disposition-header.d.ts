import { ContactData } from '@nice-devone/common-sdk';
export interface CcfDispositionHeaderProps {
    isDispositionCompleted?: boolean;
    isDispositionOpen: boolean;
    activeContact?: ContactData;
}
/**
 * Component to display disposition header
 * @param param - CcfDispositionHeaderProps
 * @returns - display disposition header
 * @example CcfDispositionHeader
 */
export declare function CcfDispositionHeader({ activeContact, }: CcfDispositionHeaderProps): JSX.Element;
export default CcfDispositionHeader;
