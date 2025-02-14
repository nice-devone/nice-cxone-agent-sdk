import utilityWorkerCode from './util-worker';
import wemWorkerCode from './wem-notification-worker';
import wsWorkerCode from './ws-worker';
import userSlotWorkerCode from './user-slot-worker';
import eventHubWorkerCode from './event-hub-worker';
import wsWorkerACPCode from './ws-worker-acp';
import wsWorkerAgentAssistCode from './ws-worker-agent-assist';
/**
 * Class to create and load worker based on provided script
 */
export class LoadWorker {
    /**
     * Use to get worker after initializing based on worker name
     * @example
     * ```
     * this.getWorker(workerScriptName,workerName);
     * ```
     */
    getWorker(workerScriptName, workerName) {
        let worker;
        switch (workerScriptName) {
            case 'ws-worker':
                worker = this.initWorker(wsWorkerCode, workerName);
                break;
            case 'util-worker':
                worker = this.initWorker(utilityWorkerCode, workerName);
                break;
            case 'wem-notification-worker':
                worker = this.initWorker(wemWorkerCode, workerName);
                break;
            case 'user-slot-worker':
                worker = this.initWorker(userSlotWorkerCode, workerName);
                break;
            case 'event-hub-worker':
                worker = this.initWorker(eventHubWorkerCode, workerName);
                break;
            case 'ws-worker-acp':
                worker = this.initWorker(wsWorkerACPCode, workerName);
                break;
            case 'ws-worker-agent-assist':
                worker = this.initWorker(wsWorkerAgentAssistCode, workerName);
                break;
        }
        return worker;
    }
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initUtilWorker();
     * ```
     */
    initWorker(workerScript, name) {
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        const worker_script = URL.createObjectURL(blob);
        return new Worker(worker_script, {
            name: name,
        });
    }
}
//# sourceMappingURL=load-worker.js.map