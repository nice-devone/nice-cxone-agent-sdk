"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const utility_1 = require("../../../util/utility");
const cxone_event_1 = require("./cxone-event");
/**
 * Class to capture agent queues API
 */
class Queue extends cxone_event_1.CXoneEvent {
    /**
     * This method to parse agent queue data
     * @param data - Agent queues data
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.businessUnitId = (0, utility_1.parseInteger)(data.businessUnitId);
        this.skillId = (0, utility_1.parseInteger)(data.skillId);
        this.skillName = data.skillName;
        this.campaignId = (0, utility_1.parseInteger)(data.campaignId);
        this.mediaType = (0, utility_1.parseInteger)(data.mediaType);
        this.channelNo = (0, utility_1.parseInteger)(data.channelNo);
        this.channelName = data.channelName;
        this.queueCount = (0, utility_1.parseInteger)(data.queueCount);
        this.longestQueueTimeInSeconds = data.longestQueueTimeInSeconds;
        this.earliestQueueTimeInUTC = new Date(data.earliestQueueTimeInUTC);
        this.agentId = (0, utility_1.parseInteger)(data.agentId);
    }
}
exports.Queue = Queue;
//# sourceMappingURL=agent-queues.js.map