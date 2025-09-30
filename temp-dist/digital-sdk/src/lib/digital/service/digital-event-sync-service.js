import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Class to handle synchronous control flow between the DigitalContactService and the DigitalContactManager.
 */
export class DigitalEventSyncService {
    constructor() {
        this.logger = new CcfLogger('DigitalSDK', 'DigitalEventSyncService');
        /**
         * Initializes the digital event synchronization service with a custom handler.
         * @param handler - A callback function that processes digital event synchronization.
         * @example digitalEventSyncService.initDigitalEventSync((args));
        */
        this.initDigitalEventSync = (handler) => {
            DigitalEventSyncService.handleDigitalSync = handler;
        };
        /**
         * Handles the digital event synchronization by invoking the registered handler.
         * @param digitalEventSync - The arguments required for digital event synchronization.
         * @returns A boolean based on the result of the handler.
         * @example const result = digitalEventSyncService.handleDigitalEventSync(args);
        */
        this.handleDigitalEventSync = (digitalEventSync) => {
            if (DigitalEventSyncService.handleDigitalSync) {
                return DigitalEventSyncService.handleDigitalSync(digitalEventSync);
            }
            else {
                this.logger.error('handleDigitalEventSync', 'Digital event sync handler is not initialized.');
                return false;
            }
        };
    }
    /**
     * Retrieves the singleton instance of the DigitalEventSyncService.
     * If the instance does not exist, it creates one.
     * @returns DigitalEventSyncService singleton instance.
     * @example const instance = DigitalEventSyncService.instance();
     */
    static get instance() {
        if (!DigitalEventSyncService.singleton) {
            DigitalEventSyncService.singleton = new DigitalEventSyncService();
        }
        return DigitalEventSyncService.singleton;
    }
}
//# sourceMappingURL=digital-event-sync-service.js.map