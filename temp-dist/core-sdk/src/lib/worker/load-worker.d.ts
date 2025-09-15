/**
 * Class to create and load worker based on provided script
 */
export declare class LoadWorker {
    /**
     * Use to get worker after initializing based on worker name
     * @example
     * ```
     * this.getWorker(workerScriptName,workerName);
     * ```
     */
    getWorker(workerScriptName: string, workerName: string): any;
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initUtilWorker();
     * ```
     */
    initWorker(workerScript: string, name: string): Worker;
}
