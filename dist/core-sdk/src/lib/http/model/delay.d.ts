export interface Delay {
    /**
     * @remarks - Reference to the active delay timer. Used to debounce requests by clearing and rescheduling execution.
     */
    delayTimer?: ReturnType<typeof setTimeout>;
    /**
     * @remarks - Indicates whether the request was executed after a delay.
     */
    isDelayed?: boolean;
}
