"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitmentEvent = void 0;
/**
 * Class to capture commitment PromiseKeeper event
 */
class CommitmentEvent {
    /**
     * This method to parse promise keeper event data
     * @param data -
     * @example -
     * ```
     *parse(data);
     * ```
     */
    parse(data) {
        this.agentId = data.AgentId;
        this.callbackExpireTime = data.CallbackExpireTime;
        this.callbackId = data.CallbackId;
        this.callbackTime = data.CallbackTime;
        this.deliveryTime = data.DeliveryTime;
        this.dialNumber = data.DialNumber;
        this.firstName = data.FirstName;
        this.lastName = data.LastName;
        this.notes = data.Notes;
        this.origNumber = data.OrigNumber;
        this.skillId = data.SkillId;
        this.targetType = data.TargetType;
    }
}
exports.CommitmentEvent = CommitmentEvent;
//# sourceMappingURL=commitment-event.js.map