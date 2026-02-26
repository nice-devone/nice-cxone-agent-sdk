import { VoiceTranscriptionWebSocketResponse } from '@nice-devone/common-sdk';
import React from 'react';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
import { UseVoiceTranscriptionMessageTileHook } from './ccf-voice-transcription-message-tile-hook';
/**
 * Props interface for CcfVoiceTranscriptionMessageTile component
 */
export interface CcfVoiceTranscriptionMessageTileProps {
    utterance: VoiceTranscriptionWebSocketResponse;
    contact: CXoneVoiceContact;
    useVoiceTranscriptionMessageTileHook?: UseVoiceTranscriptionMessageTileHook;
}
/**
 * Renders a message tile for a voice transcription utterance.
 * @param props - CcfVoiceTranscriptionMessageTileProps
 * @example
 * ```tsx
 * <CcfVoiceTranscriptionMessageTile utterance={utterance} contact={contact} />
 * ```
 * @returns
 */
export declare const CcfVoiceTranscriptionMessageTile: React.ForwardRefExoticComponent<CcfVoiceTranscriptionMessageTileProps & React.RefAttributes<HTMLDivElement>>;
