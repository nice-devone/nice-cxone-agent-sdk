export interface Abort {
    /**
     * @remarks - Aborts the ongoing request execution. Can optionally pass a reason indicating why the request was aborted).
     */
    abort(reason?: string): void;
    /**
     * @remarks - Indicates whether the request has already been aborted.
     */
    aborted: boolean;
    /**
     * @remarks - AbortSignal associated with the request.
     */
    signal: AbortSignal;
}
