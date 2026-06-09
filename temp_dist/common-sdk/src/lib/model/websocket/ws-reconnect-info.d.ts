import { RetryOptions } from '../retry-options/retry-options';
export interface WsReconnectInfo {
    retryOptions: RetryOptions;
    url: string;
}
