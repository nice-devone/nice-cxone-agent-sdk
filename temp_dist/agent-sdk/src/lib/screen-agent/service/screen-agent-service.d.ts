import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
 * Class to perform screen agent service
 */
export declare class ScreenAgentService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private validationUtils;
    SCREEN_AGENT_CONNECT_API: string;
    SCREEN_AGENT_DISCONNECT_API: string;
    maxRetryAttempts: number;
    /**
     * Method to connect screen agent recording
     * @param portNo  - screen agent portno.
     * @returns -
     * ```
     * @example
     * connectScreenAgent()
     * ```
     */
    connectScreenAgent(portNo: number): void;
    /**
     * Method to disconnect screen agent recording
     * @param portNo  - screen agent portno.
     * @returns -
     * ```
     * @example
     * disconnectScreenAgent()
     * ```
     */
    disconnectScreenAgent(portNo: number): void;
}
