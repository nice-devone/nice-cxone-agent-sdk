/**
 * Default hook implementation (no-op)
 * Consumer should provide custom hook via useVoiceTranscriptionMessageTileHook prop
 * @returns Object containing empty user information
 * @example
 * ```
 * const { userInfo } = useDefaultVoiceTranscriptionMessageTile();
 * ```
 */
export const useDefaultVoiceTranscriptionMessageTile = () => {
    return {
        userInfo: undefined,
    };
};
//# sourceMappingURL=ccf-voice-transcription-message-tile-hook.js.map