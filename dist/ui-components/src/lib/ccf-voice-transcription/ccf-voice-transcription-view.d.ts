/// <reference types="react" />
import { VoiceTranscriptionItem } from '@nice-devone/common-sdk';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
import { UseVoiceTranscriptionMessageTileHook } from './ccf-voice-transcription-message-tile-hook';
/**
 * Props interface for CcfVoiceTranscriptionView component
 */
export interface CcfVoiceTranscriptionViewProps {
    voiceContactTranscription: VoiceTranscriptionItem[];
    voiceContact: CXoneVoiceContact;
    useVoiceTranscriptionMessageTileHook?: UseVoiceTranscriptionMessageTileHook;
}
/**
 * Renders the voice transcription tab content for a given contact.
 *
 * @param props - CcfVoiceTranscriptionViewProps containing transcription data and contact details
 * @returns The JSX element representing the transcription tab content.
 * @example
 * ```
 * <CcfVoiceTranscriptionView
 *   voiceContactTranscription={transcriptionData}
 *   voiceContact={contactData}
 * />
 * ```
 */
export declare function CcfVoiceTranscriptionView({ voiceContactTranscription, voiceContact, useVoiceTranscriptionMessageTileHook, }: CcfVoiceTranscriptionViewProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfVoiceTranscriptionView>;
export default _default;
