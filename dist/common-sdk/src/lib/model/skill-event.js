"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillEvent = void 0;
const utility_1 = require("../../util/utility");
const cxone_event_1 = require("./agent/cxone-event");
/**
 * Model class for skill
 */
class SkillEvent extends cxone_event_1.CXoneEvent {
    /**
     * This method to parse skill data
     * @param data - key value pair data
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.mediaType = (0, utility_1.parseInteger)(data.MediaType);
        this.mediaName = data.MediaName;
        this.isOutbound = (0, utility_1.parseBooleanString)(data.IsOutbound);
        this.isActive = (0, utility_1.parseBooleanString)(data.IsActive);
        this.skillId = data.SkillId;
        this.skillName = data.SkillName;
        this.lastPollTime = new Date(data.lastPollTime);
        this.lastUpdateTime = new Date(data.lastUpdateTime);
    }
}
exports.SkillEvent = SkillEvent;
;
//# sourceMappingURL=skill-event.js.map