import { RetryOptions } from '../retry-options/retry-options';
/**
 * model interface for WEM notification information
 */
export interface WemNotificationRequestData {
    /**
 * @remarks user locale
 */
    locale: string;
    /**
 * @remarks user timezone
 */
    timezone: string;
    /**
 * @remarks retry options for ws reconnection
 */
    retryOptions?: RetryOptions;
}
