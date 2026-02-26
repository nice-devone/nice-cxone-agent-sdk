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
 * Default hook implementation using Redux
 * @returns Object containing user information
 * @example
 * ```
 * const { userInfo } = useDefaultVoiceTranscriptionMessageTile();
 * ```
 */
export declare const useDefaultVoiceTranscriptionMessageTile: UseVoiceTranscriptionMessageTileHook;
