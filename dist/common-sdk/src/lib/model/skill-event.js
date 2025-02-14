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
        this.mediaTypeId = (0, utility_1.parseInteger)(data.mediaTypeId);
        this.mediaTypeName = data.mediaTypeName;
        this.isOutbound = (0, utility_1.parseBooleanString)(data.isOutbound);
        this.isActive = (0, utility_1.parseBooleanString)(data.isActive);
        this.skillId = data.skillId;
        this.skillName = data.skillName;
    }
}
exports.SkillEvent = SkillEvent;
;
//# sourceMappingURL=skill-event.js.map