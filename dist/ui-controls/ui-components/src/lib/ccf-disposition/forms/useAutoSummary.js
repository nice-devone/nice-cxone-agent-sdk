import { useDispatch, useSelector } from 'react-redux';
import { fetchGeneratedFinalSummary } from '../../ccf-agent-copilot/ccf-agent-copilot-middleware';
import { dispositionInteractionActions, getAttemptCount, getCoolingDown, getRetryCountdown, getRetryStartTime } from '../ccf-disposition-slice';
import { useEffect } from 'react';
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
export const useAutoSummary = (activeContact) => {
    var _a;
    const dispatch = useDispatch();
    const isCoolingDown = useSelector(getCoolingDown());
    const attemptCount = (_a = useSelector(getAttemptCount())) !== null && _a !== void 0 ? _a : 0;
    const retryCountdown = useSelector(getRetryCountdown());
    const maxRetryCount = 3;
    const initialRetryDelay = 10000; // 10 seconds
    const lastAttemptAt = useSelector(getRetryStartTime());
    /**
     * Handles the retry button click event for fetching the final summary.
     * Increments the retry count and disables the retry button if the maximum retry count is reached.
     * Initiates the process to fetch the generated final summary for the active contact.
     *
     * @remarks
     * - Prevents further retries if the maximum retry count (`maxRetryCount`) is reached.
     * - Updates UI state to indicate fetching and hides unavailable auto summary.
     * - Dispatches an action to fetch the final summary using the active contact's ID.
     * @example
     * handleRetry();
     */
    const handleRetry = () => {
        const safeAttemptCount = attemptCount !== null && attemptCount !== void 0 ? attemptCount : 0;
        if (safeAttemptCount >= maxRetryCount)
            return;
        dispatch(dispositionInteractionActions.setCoolingDown(true));
        dispatch(dispositionInteractionActions.setAttemptCount(safeAttemptCount + 1));
        dispatch(dispositionInteractionActions.setCanRetry(Date.now()));
        // actual retry logic
        dispatch(fetchGeneratedFinalSummary({ contactId: activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId }));
    };
    useEffect(() => {
        let interval;
        if (isCoolingDown && lastAttemptAt) {
            const retryDelay = initialRetryDelay * Math.pow(2, (attemptCount !== null && attemptCount !== void 0 ? attemptCount : 1) - 1); // 10s, 20s, 40s
            /**
             * Calculates the remaining seconds for the retry countdown.
             * @returns The number of seconds remaining until the retry is enabled.
             * @example
             * const secondsLeft = getRemaining();
             */
            const getRemaining = () => {
                const elapsed = Date.now() - Number(lastAttemptAt);
                return Math.max(Math.ceil((retryDelay - elapsed) / 1000), 0);
            };
            dispatch(dispositionInteractionActions.setRetryCountdown(getRemaining()));
            interval = setInterval(() => {
                const remainingSeconds = getRemaining();
                dispatch(dispositionInteractionActions.setRetryCountdown(remainingSeconds));
                if (remainingSeconds <= 0) {
                    clearInterval(interval);
                    dispatch(dispositionInteractionActions.setCoolingDown(false));
                    dispatch(dispositionInteractionActions.setCanRetry(null));
                }
            }, 500);
            return () => clearInterval(interval);
        }
        return undefined;
    }, [isCoolingDown, attemptCount, lastAttemptAt, dispatch]);
    return { handleRetry, isCoolingDown, attemptCount, retryCountdown, maxRetryCount, initialRetryDelay, lastAttemptAt };
};
//# sourceMappingURL=useAutoSummary.js.map