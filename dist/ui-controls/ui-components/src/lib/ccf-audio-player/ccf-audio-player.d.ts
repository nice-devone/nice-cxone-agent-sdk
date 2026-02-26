/// <reference types="react" />
import 'react-h5-audio-player/lib/styles.css';
import { CXoneAttachment } from '@nice-devone/common-sdk';
export interface CcfAudioPlayerProps {
    /**
    * @remarks  Url for playing audio in audio player
    */
    audioUrl: string;
    /**
     * @remarks  Is Inbound or Outbound
     */
    isInbound?: boolean;
    /**
     * @remarks  Method to remove attachment
     */
    handleRemoveAttachment?: (id: string) => void;
    /**
     * @remarks  Attachment object
     */
    attachment?: CXoneAttachment;
    /**
     * @remarks  Attachment Id
     */
    attachmentId?: string;
    /**
     * @remarks  Method to download attachment
     */
    handleDownloadAttachment?: (attachment: CXoneAttachment) => void;
    /**
     * @remarks  Should show close icon
     */
    shouldShowCloseIcon?: boolean;
    /**
     * @remarks  Should show download icon
     */
    shouldShowDownloadIcon?: boolean;
    /**
     * @remarks  Audio player width
     */
    audioPlayerWidth?: string;
    /**
     * @remarks check if recording in progress
     */
    isVoiceRecordingInprogress?: boolean;
    /**
     * @remarks  File name
     */
    fileName?: string;
}
/**
 * Component to render audio player
 * @returns audio player
 * @example - CcfAudioPlayer
 */
export declare function CcfAudioPlayer(props: CcfAudioPlayerProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfAudioPlayer>;
export default _default;
