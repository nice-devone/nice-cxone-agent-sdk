import { CXoneSkillActivityProvider } from '../provider/cxone-skill-activity-provider';
import { CXoneClient } from '../../cxone-client';
import { Subject } from 'rxjs';
import { CXoneAgentQueuesProvider } from '../provider/cxone-agent-queues-provider';
import { CXoneAgentQueuesDetailProvider } from '../provider/cxone-agent-queues-detail-provider';
import { AgentQueuesDetail, AgentQueues } from '@nice-devone/common-sdk';
import { SkillActivityPollingRequest } from '../model/skill-activity-polling-request';
import { SkillActivityResponse } from '../model/skill-activity-response';
/** This is the base class for ACD */
export declare class CXoneSkillActivityQueue {
    agentQueueProvider: CXoneAgentQueuesProvider;
    agentQueuesDetailProvider: CXoneAgentQueuesDetailProvider;
    agentQueueSubject: Subject<AgentQueues>;
    agentQueuesDetailSubject: Subject<AgentQueuesDetail[]>;
    skillActivityProvider: CXoneSkillActivityProvider;
    skillActivityEvent: Subject<SkillActivityResponse>;
    /**
     * get instance for agent session and admin service
     * @example
     * ```
     * const cxoneSkillActivity = new CXoneSkillActivity(cxoneClient);
     * ```
     */
    constructor(cxoneClient: CXoneClient);
    /**
     * Used to start the skill activity polling
     * @example -
     * ```
     * this.startSkillActivityPolling()
     * ```
     */
    startSkillActivityPolling(skillActivityPollingRequest: SkillActivityPollingRequest): void;
    /**
     * Used to terminate the skill activity polling
     * @example -
     * ```
     * this..terminateSkillActivityPolling()
     * ```
     */
    terminateSkillActivityPolling(): void;
    /**
     * Used to start the agent queue polling
     * Note - while the parameter isn't used anymore there is a strange call to this method in cxone-client.ts
     * that I don't understand and don't want to mess with so keeping it as is for now.
     * @example -
     * ```
     * this.cxoneQueue.startAgentQueuesPolling()
     * ```
     */
    startAgentQueuesPolling(agentId: string): void;
    /**
     * Used to terminate the agent queue polling
     * @example -
     * ```
     * this.cxoneQueue.terminateAgentQueuePolling()
     * ```
     */
    terminateAgentQueuePolling(): void;
}
