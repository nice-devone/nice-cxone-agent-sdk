"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentQueuesDetail = void 0;
const utility_1 = require("../../../util/utility");
const cxone_event_1 = require("./cxone-event");
/**
 * Class to parse agent queues contact detail
 */
class AgentQueuesDetail extends cxone_event_1.CXoneEvent {
    /**
     * This method to parse agent queues contact detail data
     * @param data - Agent queues contact detail
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.agentId = (0, utility_1.parseInteger)(data.agentId);
        this.businessUnitId = (0, utility_1.parseInteger)(data.businessUnitId);
        this.campaignName = data.campaignName;
        this.campaignId = (0, utility_1.parseInteger)(data.campaignId);
        this.contactId = data.contactId;
        this.contactStateCode = (0, utility_1.parseInteger)(data.contactStateCode);
        this.currentContactState = data.currentContactState;
        this.firstName = data.firstName;
        this.fromAddr = data.fromAddr;
        this.lastName = data.lastName;
        this.lastUpdateTime = new Date(data.lastUpdateTime);
        this.masterContactId = (0, utility_1.parseInteger)(data.masterContactId);
        this.interactionId = (0, utility_1.parseInteger)(data.interactionId);
        this.mediaName = data.mediaName;
        this.mediaType = (0, utility_1.parseInteger)(data.mediaType);
        this.channelNo = (0, utility_1.parseInteger)(data.channelNo);
        this.channelName = data.channelName;
        this.skillName = data.skillName;
        this.skillId = (0, utility_1.parseInteger)(data.skillId);
        this.startDate = new Date(data.startDate);
        this.teamName = data.teamName;
        this.teamId = (0, utility_1.parseInteger)(data === null || data === void 0 ? void 0 : data.teamId);
        this.toAddr = data.toAddr;
    }
}
exports.AgentQueuesDetail = AgentQueuesDetail;
//# sourceMappingURL=agent-queues-detail.js.map