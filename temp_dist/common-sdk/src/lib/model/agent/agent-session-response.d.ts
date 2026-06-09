import { AgentSessionStatus } from '../../enum/agent-session-status';
import { HttpResponse } from '../../http/http-response/http-response';
import { CXoneSdkError } from '../error/cxone-sdk-error';
import { AgentSessionEndEvent } from './agent-session-end-event';
import { AgentSessionStartEvent } from './agent-session-start-event';
export interface AgentSessionResponse {
    /**
     * @remarks - current agent session status
     */
    status: AgentSessionStatus;
    /**
     * @remarks - agent session response on agent session state update
     */
    data?: AgentSessionStartEvent | AgentSessionEndEvent | HttpResponse | CXoneSdkError;
}
