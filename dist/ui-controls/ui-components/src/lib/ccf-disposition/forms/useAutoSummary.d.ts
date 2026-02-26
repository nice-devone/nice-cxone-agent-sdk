import { ContactData } from '@nice-devone/common-sdk';
/**
 * Manages retry logic for fetching the final auto summary.
 * Handles cooldowns, exponential delays (10s → 20s → 40s), and retry limits.
 *
 * @param activeContact - The active contact used for summary fetching.
 * @returns Object with retry handlers and state.
 *
 * @example
 * useAutoSummary(activeContact);
 */
export declare const useAutoSummary: (activeContact: ContactData | null) => {
    handleRetry: () => void;
    isCoolingDown: boolean | undefined;
    attemptCount: number;
    retryCountdown: number;
    maxRetryCount: number;
    initialRetryDelay: number;
    lastAttemptAt: number | null | undefined;
};
