import { DigitalContactManager } from '../../contact/digital-contact-manager';
/**
 * UserSlot Provider Class
 */
export declare class CXoneUserSlotProvider {
    private logger;
    private auth;
    private user;
    private utilService;
    private digitalContactManager;
    userSlotWorker: any;
    private USER_SLOT_POLLING_INTERVAL_MS;
    private DIGITAL_STATE_POLLING_INTERVAL_MS;
    private acdSession;
    private agentStateSubject;
    private loader;
    private getUserSlotPollingisActive;
    private updateUserSlotPollingisActive;
    /**
     * Constructor for CXoneUserSlotProvider
     * @example
     * ```
     * new CXoneUserSlotProvider();
     * ```
     */
    constructor();
    /**
     * Used to set the acd sdk base instance to access the subject from the base class
     * @example -
     */
    setUserSlotBaseInstance(DigitalContactManager: DigitalContactManager): void;
    /**
     * Method to initiate UserSlot worker for digital contact
     * @example - getUserSlots()
    */
    getUserSlots(): void;
    /**
     * Method to initiate digital agent status worker
     * @example -
     * ```
     * this.updateDigitalStatus()
     * ```
     */
    updateDigitalStatus(): void;
    /**
     * Callback method which will passed on to the worker and will be executed after digital user status api response
     * then will use where we need
     * @param response - Digital user status subscription response
     * @example -
     * ```
     * handleResponse(response);
     * ```
     */
    private handleResponse;
    /**
     * Callback method which will passed on to the worker and will be executed after user slot epi response
     * then will use where we need
     * @param response - user slot subscription response
     * @example -
     * ```
     * handleUserSlotSubscriptionResponse(response);
     * ```
     */
    private handleUserSlotSubscriptionResponse;
    /**
     * Used for initializing the user slot worker and will return the method inside the worker
     * @example -
     * ```
     * this.initUserSlotWorker()
     * ```
     */
    initUserSlotWorker(): void;
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    private restartWorker;
    /**
     * Used to terminate the polling of user slot api
     * @example -
     * ```
     * this.userSlotProvider.terminatePolling();
     * ```
     */
    terminatePolling(ifRestart?: boolean): void;
    /**
     * Used to terminate the polling of user slot api
     * @example -
     * ```
     * this.userSlotProvider.terminateUserSlotPolling();
     * ```
     */
    terminateUserSlotPolling(): void;
}
