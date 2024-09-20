"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentStateResponse = void 0;
const utility_1 = require("../../util/utility");
const cxone_event_1 = require("./agent/cxone-event");
/**
 * Model class for agent state
 */
class AgentStateResponse extends cxone_event_1.CXoneEvent {
    /**
       * This method to parse agent state response
       * @param data - agent state object
       * @example -
       * ```
       * parse(data);
       * ```
       */
    parse(data) {
        this.agentId = (0, utility_1.parseInteger)(data.agentId);
        this.userId = data.userId;
        this.agentStateName = data.agentStateName;
        this.contactId = data.contactId;
        this.firstName = data.firstName;
        this.isActive = (0, utility_1.parseBooleanString)(data.isActive);
        this.isOutbound = (0, utility_1.parseBooleanString)(data.isOutbound);
        this.lastName = data.lastName;
        this.lastPollTime = new Date(data.lastPollTime);
        this.lastUpdateTime = new Date(data.lastUpdateTime);
        this.mediaName = data.mediaName;
        this.outStateCode = (0, utility_1.parseInteger)(data.outStateCode);
        this.outStateDescription = data.outStateDescription;
        this.skillId = data.skillId;
        this.skillName = data.skillName;
        this.startDate = new Date(data.startDate);
        this.stationPhoneNumber = (0, utility_1.parseInteger)(data.stationPhoneNumber);
        this.teamId = (0, utility_1.parseInteger)(data === null || data === void 0 ? void 0 : data.teamId);
        this.teamName = data.teamName;
        this.userName = data.userName;
        this.isFavorite = false;
    }
}
exports.AgentStateResponse = AgentStateResponse;
;
//# sourceMappingURL=agent-state-response.js.map