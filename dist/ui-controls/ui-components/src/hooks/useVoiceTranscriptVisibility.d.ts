/**
 * Custom hook to watch for changes in localStorage value for voice transcript visibility
 * @returns current state of showTranscript
 * @example
 * ```tsx
 * const showTranscript = useVoiceTranscriptVisibility();
 *
 * // Component will re-render when showTranscript changes
 * ```
 */
export declare const useVoiceTranscriptVisibility: () => {
    showTranscript: any;
    updateTranscriptVisibility: (newValue: boolean) => void;
};
