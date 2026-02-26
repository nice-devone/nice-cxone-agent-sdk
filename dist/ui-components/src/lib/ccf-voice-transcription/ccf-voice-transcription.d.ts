import { ContactData } from '@nice-devone/common-sdk';
import React from 'react';
export interface VoiceTranscriptionProps {
    contact?: ContactData | null;
    selectedInteractionId?: string;
}
/**
 * VoiceTranscription component displays the transcription for a given contact.
 *
 * @param contactId - The ID of the contact whose transcription is displayed.
 * @example \<CcfVoiceTranscription contactId=\{\}\>
 */
export declare const CcfVoiceTranscription: React.FC<VoiceTranscriptionProps>;
export default CcfVoiceTranscription;
