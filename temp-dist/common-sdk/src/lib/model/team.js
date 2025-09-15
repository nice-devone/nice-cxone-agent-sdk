"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const cxone_event_1 = require("./agent/cxone-event");
const utility_1 = require("../../util/utility");
const agent_state_response_1 = require("./agent-state-response");
/**
 * Model class for team
 */
class Team extends cxone_event_1.CXoneEvent {
    /**
  * This method to parse team response
  * @param data - team object
  * @example -
  * ```
  * parse(data);
  * ```
  */
    parse(data) {
        this.teamId = (0, utility_1.parseInteger)(data === null || data === void 0 ? void 0 : data.teamId);
        this.isActive = typeof data.isActive === 'boolean' ? data.isActive : (0, utility_1.parseBooleanString)(data.isActive);
        this.teamName = data.teamName;
        this.agentCount = (0, utility_1.parseInteger)(data.agentCount);
        this.agents = this.parseAgentResponse(data.agents);
    }
    /**
       * This method to parse agent state response for a team
       * @param data - agent state object
       * @example -
       * ```
       * parseAgentResponse(data);
       * ```
       */
    parseAgentResponse(agentList) {
        const parseAgentList = [];
        agentList === null || agentList === void 0 ? void 0 : agentList.forEach((agent) => {
            const agents = new agent_state_response_1.AgentStateResponse();
            agents.parse(agent);
            parseAgentList.push(agents);
        });
        return parseAgentList;
    }
}
exports.Team = Team;
//# sourceMappingURL=team.js.map