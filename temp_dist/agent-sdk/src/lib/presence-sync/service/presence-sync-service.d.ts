import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { AgentStateEvent, CXonePartnerPresenceSyncRuleMapping } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
/**
 * Class to get the presence sync rules to sync the agent status
 */
export declare class PresenceSyncService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    agentStateSubject: Subject<AgentStateEvent>;
    /**
     *
     * ```
     * @example
     * const presenceSync = new PresenceSyncService();
     * ```
     */
    constructor();
    /**
     * Service method to get presence sync rule
     * @param partnerAccountId - partner account id
     * @param partnerName - partner account name
     * @returns - response from the getPresenceSyncRule api
     * @example
     * ```
     * getPresenceSyncRule('partnerAccountId', 'partnerName')
     * ```
     */
    getPresenceSyncRule(partnerAccountId: string, partnerName: string): Promise<CXonePartnerPresenceSyncRuleMapping>;
}
