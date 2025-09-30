import { CcfLogger } from '@nice-devone/agent-sdk';
import { DigitalEventSync } from '@nice-devone/common-sdk';
/**
 * Class to handle synchronous control flow between the DigitalContactService and the DigitalContactManager.
 */
export declare class DigitalEventSyncService {
    protected logger: CcfLogger;
    private static singleton;
    private static handleDigitalSync;
    /**
     * Retrieves the singleton instance of the DigitalEventSyncService.
     * If the instance does not exist, it creates one.
     * @returns DigitalEventSyncService singleton instance.
     * @example const instance = DigitalEventSyncService.instance();
     */
    static get instance(): DigitalEventSyncService;
    /**
     * Initializes the digital event synchronization service with a custom handler.
     * @param handler - A callback function that processes digital event synchronization.
     * @example digitalEventSyncService.initDigitalEventSync((args));
    */
    initDigitalEventSync: (handler: (digitalEventSync: DigitalEventSync) => boolean) => void;
    /**
     * Handles the digital event synchronization by invoking the registered handler.
     * @param digitalEventSync - The arguments required for digital event synchronization.
     * @returns A boolean based on the result of the handler.
     * @example const result = digitalEventSyncService.handleDigitalEventSync(args);
    */
    handleDigitalEventSync: (digitalEventSync: DigitalEventSync) => boolean;
}
