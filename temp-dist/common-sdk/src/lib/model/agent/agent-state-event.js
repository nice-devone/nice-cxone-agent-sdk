"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStateEvent = void 0;
const utility_1 = require("../../../util/utility");
const cxone_event_1 = require("./cxone-event");
/**
 * Class to capture agent state event
 */
class AgentStateEvent extends cxone_event_1.CXoneEvent {
    constructor() {
        super(...arguments);
        this.currentState = {
            state: '',
            reason: '',
            startTime: 0,
            acwTimeout: 0,
            isACW: false,
            skillName: '',
            isPersonalConnection: false,
            cxoneState: '',
        };
    }
    /**
     * This method to parse agent state event data
     * @param data -
     * @example -
     * ```
     *parse(data);
     * ```
     */
    parse(data) {
        this.agentStateData = data;
        this.currentState.state = data.CurrentState;
        this.currentState.cxoneState = data.CurrentState;
        this.currentState.reason = data.CurrentOutReason;
        this.currentState.startTime = data.StartTimeUTC
            ? new Date(data.StartTimeUTC).getTime()
            : 0;
        this.currentState.acwTimeout = data.AcwTimeout
            ? (0, utility_1.parseInteger)(data.AcwTimeout)
            : 0;
        this.currentState.isACW = (0, utility_1.parseBooleanString)(data.IsAcw);
        if (typeof data.NextStates === 'object') {
            for (let i = 0; i < data.NextStates.length; i++) {
                if (i === 0) {
                    const nState = {
                        state: data.NextStates[i].State,
                        reason: data.NextStates[i].OutReason,
                        isACW: (0, utility_1.parseBooleanString)(data.NextIsAcw),
                    };
                    this.nextState = nState;
                }
                else if (i === 1) {
                    const nnState = {
                        state: data.NextStates[i].State,
                        reason: data.NextStates[i].OutReason,
                        isACW: (0, utility_1.parseBooleanString)(data.NextIsAcw),
                    };
                    this.nNextState = nnState;
                }
            }
        }
    }
}
exports.AgentStateEvent = AgentStateEvent;
//# sourceMappingURL=agent-state-event.js.map