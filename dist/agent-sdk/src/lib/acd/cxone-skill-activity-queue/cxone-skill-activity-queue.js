import { CXoneSkillActivityProvider } from '../provider/cxone-skill-activity-provider';
import { Subject } from 'rxjs';
import { CXoneAgentQueuesProvider } from '../provider/cxone-agent-queues-provider';
import { CXoneAgentQueuesDetailProvider } from '../provider/cxone-agent-queues-detail-provider';
import { CXoneLeaderElector, MessageBus, MessageType } from '@nice-devone/common-sdk';
/** This is the base class for ACD */
export class CXoneSkillActivityQueue {
    /**
     * get instance for agent session and admin service
     * @example
     * ```
     * const cxoneSkillActivity = new CXoneSkillActivity(cxoneClient);
     * ```
     */
    constructor(cxoneClient) {
        this.agentQueueProvider = {};
        this.agentQueuesDetailProvider = {};
        this.agentQueueSubject = new Subject();
        this.agentQueuesDetailSubject = new Subject();
        this.skillActivityProvider = {};
        this.skillActivityEvent = new Subject();
        this.agentQueueProvider = new CXoneAgentQueuesProvider();
        this.agentQueuesDetailProvider = new CXoneAgentQueuesDetailProvider();
        this.agentQueueProvider.setACDSdkBaseInstance(cxoneClient);
        this.agentQueuesDetailProvider.setACDSdkBaseInstance(cxoneClient);
        this.skillActivityProvider = new CXoneSkillActivityProvider();
        this.skillActivityProvider.setACDSdkBaseInstance(cxoneClient);
    }
    /**
     * Used to start the skill activity polling
     * @example -
     * ```
     * this.startSkillActivityPolling()
     * ```
     */
    startSkillActivityPolling(skillActivityPollingRequest) {
        if (skillActivityPollingRequest) {
            this.skillActivityProvider.startPolling(skillActivityPollingRequest);
        }
    }
    /**
     * Used to terminate the skill activity polling
     * @example -
     * ```
     * this..terminateSkillActivityPolling()
     * ```
     */
    terminateSkillActivityPolling() {
        this.skillActivityProvider.terminatePolling();
    }
    /**
     * Used to start the agent queue polling
     * Note - while the parameter isn't used anymore there is a strange call to this method in cxone-client.ts
     * that I don't understand and don't want to mess with so keeping it as is for now.
     * @example -
     * ```
     * this.cxoneQueue.startAgentQueuesPolling()
     * ```
     */
    startAgentQueuesPolling(agentId) {
        if (CXoneLeaderElector.instance.isLeader) {
            this.agentQueueProvider.agentQueuesPolling(agentId);
            this.agentQueuesDetailProvider.agentQueuesDetailsPolling(agentId);
        }
        else {
            // broadcast data
            const msg = {
                type: MessageType.AGENT_QUEUE_POLLING,
                data: agentId,
            };
            MessageBus.instance.postRequest(msg);
        }
    }
    /**
     * Used to terminate the agent queue polling
     * @example -
     * ```
     * this.cxoneQueue.terminateAgentQueuePolling()
     * ```
     */
    terminateAgentQueuePolling() {
        if (CXoneLeaderElector.instance.isLeader) {
            this.agentQueueProvider.terminatePolling();
            this.agentQueuesDetailProvider.terminatePolling();
        }
        else {
            const msg = {
                type: MessageType.TERMINATE_AGENT_QUEUE_POLLING,
            };
            MessageBus.instance.postRequest(msg);
        }
    }
}
//# sourceMappingURL=cxone-skill-activity-queue.js.map