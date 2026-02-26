/// <reference types="react" />
import { MessageKebabMenu } from '../../ccf-assignment-panel/ccf-assignment-utils';
/**
 * Props for CcfContactMessageActions component.
 */
export interface CcfContactMessageActionsProps {
    messageActionFlags: ccfMessageActionFlags;
    isInboundDirection: boolean;
    showConfirmationDialog?: (state: boolean, actionType: MessageKebabMenu) => void;
    setMessageData?: () => void;
    /**
     * downloadUrl - url to download the media
     */
    downloadUrl?: string;
    /**
     * fileName - file names to be downloaded
     */
    fileName?: string;
}
/**
 * message action flags to decide what all actions are available for message.
 */
interface ccfMessageActionFlags {
    canReplyToSpecificMessage: boolean;
    canDeleteMessageContent: boolean;
    canDeleteAuthor: boolean;
    /**
     * canDownloadMedia - flag to decide if media can be downloaded
     */
    canDownloadMedia: boolean;
}
declare const _default: import("react").MemoExoticComponent<({ messageActionFlags, isInboundDirection, showConfirmationDialog, setMessageData, downloadUrl, fileName }: CcfContactMessageActionsProps) => JSX.Element | null>;
export default _default;
