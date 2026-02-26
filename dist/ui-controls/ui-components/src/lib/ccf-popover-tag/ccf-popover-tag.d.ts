import { CXoneMessage, CXoneMessageDraft } from '@nice-devone/common-sdk';
/**
 * This interface used for digital popover tag properties
 */
export interface CcfPopoverTagProps {
    id: string;
    author?: string;
    message?: CXoneMessage | CXoneMessageDraft;
    isPrivateChannel: boolean;
    isDisabled?: boolean;
    isPreviousCaseMessage?: boolean;
    isNextCaseMessage?: boolean;
}
/**
 * @param param -CcfPopoverTagProps
 * @returns popover which allows to select from digital message tag
 * @example <CcfPopoverTag/>
 */
export declare function CcfPopoverTag(props: CcfPopoverTagProps): JSX.Element;
export default CcfPopoverTag;
