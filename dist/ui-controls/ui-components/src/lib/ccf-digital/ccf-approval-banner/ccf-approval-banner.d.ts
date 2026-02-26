import { CXoneMessageDraft } from '@nice-devone/common-sdk';
/**
 * Interface typedoc for props - CcfApprovalBanner Component
 * props -
 */
export interface CcfContactMessageDraftProps {
    /**
      * @remarks - prop - message - original message string to be inserted to editor
    */
    message: string;
    /**
      * @remarks - prop - status - status of message draft (eg - pending, denied)
    */
    status: string;
    /**
    * @remarks - details of the draft message
    */
    messageDraft: CXoneMessageDraft;
    /**
      * @remarks - prop - isRefused - used to identify the refused status of message draft
    */
    isRefused: boolean;
}
/**
 * Component displays Approval status for selected message
 * @returns Approval status for selected message
 * ```
 * @example
 * <CcfApprovalBanner message={'Test Message'} status={ApprovalBannerStatus.PENDING}/>
 * ```
 */
export declare function CcfApprovalBanner(props: CcfContactMessageDraftProps): JSX.Element;
