/// <reference types="react" />
import { CXoneMessageDraft } from '@nice-devone/common-sdk';
/**
 * Interface typedoc for props - message draft component
 */
interface CcfContactPublicMessageDraftProps {
    /**
     * MessageDraft data from details api response
     */
    messageDraft: CXoneMessageDraft;
    /**
     * displays the sender of the approval message
     */
    sender?: string;
    /**
     * channel type
     */
    channelType?: string;
    /**
   * preview only channels
   */
    previewOnlyChannels?: string[];
    /**
   * message direction
   */
    direction?: string;
    /**
 * imported style object required for message draft component
 */
    styles: {
        inboundMessageTimeStamp: object;
        message: object;
        authorAvtar: object;
        messageAuthor: object;
        cardHeaderPosition: object;
        cardContentPosition: object;
        gridItemPosition: object;
        originalPublicPost: object;
        messageTitle: object;
        approvalInfoContainer: object;
        messageDraftCard: object;
        messageDraftCardContainer: object;
        draftMessageContentBody: object;
    };
}
declare const _default: import("react").MemoExoticComponent<({ messageDraft, styles, sender, channelType, previewOnlyChannels, direction }: CcfContactPublicMessageDraftProps) => JSX.Element>;
export default _default;
