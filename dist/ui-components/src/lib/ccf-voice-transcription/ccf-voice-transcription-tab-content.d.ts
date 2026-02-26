/// <reference types="react" />
/**
 * Renders the voice transcription tab content for a given contact.
 *
 * @param contactId - The unique identifier for the contact whose transcription is displayed.
 * @returns The JSX element representing the transcription tab content.
 * @example CcfVoiceTranscriptionTabContent contactId=\{contactId\}
 */
export declare function CcfVoiceTranscriptionTabContent({ contactId }: {
    contactId: string;
}): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfVoiceTranscriptionTabContent>;
export default _default;
