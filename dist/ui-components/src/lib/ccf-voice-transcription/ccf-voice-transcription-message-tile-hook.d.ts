/**
 * Hook interface for voice transcription message tile functionality
 */
export interface UseVoiceTranscriptionMessageTileHook {
    (): {
        userInfo?: {
            firstName?: string;
            lastName?: string;
        };
    };
}
/**
 * Default hook implementation (no-op)
 * Consumer should provide custom hook via useVoiceTranscriptionMessageTileHook prop
 * @returns Object containing empty user information
 * @example
 * ```
 * const { userInfo } = useDefaultVoiceTranscriptionMessageTile();
 * ```
 */
export declare const useDefaultVoiceTranscriptionMessageTile: UseVoiceTranscriptionMessageTileHook;
