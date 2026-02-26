import { CXoneDigitalMessageTag } from '@nice-devone/common-sdk';
/**
 * Props for CcfMessagesTags component.
 */
interface CcfMessagesTagsProps {
    /**
    * List of tags
    */
    tagsList: CXoneDigitalMessageTag[];
}
/**
 * @param param -CcfMessagesTagsProps
 * @returns popover which shows to digital message tag
 * @example <CcfMessagesTags/>
 */
export default function CcfMessagesTags({ tagsList }: CcfMessagesTagsProps): JSX.Element;
export {};
