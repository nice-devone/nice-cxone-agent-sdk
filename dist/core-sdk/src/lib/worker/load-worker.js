import utilityWorkerCode from './util-worker';
import wemWorkerCode from './wem-notification-worker';
import wsWorkerCode from './ws-worker';
import userSlotWorkerCode from './user-slot-worker';
import eventHubWorkerCode from './event-hub-worker';
import wsWorkerACPCode from './ws-worker-acp';
import wsWorkerAgentAssistCode from './ws-worker-agent-assist';
import wsWorkerAgenticCode from './ws-agentic-worker';
import uiqWorkerCode from './uiq-worker';
import { attachWorkerDiagnostics, instrumentWorkerScript, } from '../diagnostic-capture/instrumentation/worker-diagnostics';
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
        let workerScript;
        switch (workerScriptName) {
            case 'ws-worker':
                workerScript = wsWorkerCode;
                break;
            case 'util-worker':
                workerScript = utilityWorkerCode;
                break;
            case 'wem-notification-worker':
                workerScript = wemWorkerCode;
                break;
            case 'user-slot-worker':
                workerScript = userSlotWorkerCode;
                break;
            case 'event-hub-worker':
                workerScript = eventHubWorkerCode;
                break;
            case 'ws-worker-acp':
                workerScript = wsWorkerACPCode;
                break;
            case 'ws-worker-agentic':
                workerScript = wsWorkerAgenticCode;
                break;
            case 'ws-worker-agent-assist':
                workerScript = wsWorkerAgentAssistCode;
                break;
            case 'uiq-worker':
                workerScript = uiqWorkerCode;
                break;
        }
        if (!workerScript)
            return undefined;
        const worker = this.initWorker(instrumentWorkerScript(workerScriptName, workerName, workerScript), workerName);
        attachWorkerDiagnostics(workerScriptName, worker);
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