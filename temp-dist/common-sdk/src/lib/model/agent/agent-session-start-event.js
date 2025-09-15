"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSessionStartEvent = void 0;
const utility_1 = require("../../../util/utility");
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for agent session start event
 */
class AgentSessionStartEvent extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The parse method will take the data object and assign the values to the AgentSessionStartEvent class properties
     * @param data - Data object received
     * @example -
     * ```
     *parse(data);
     * ```
     */
    parse(data) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.iisHost = data.IISHost,
            this.vcHost = data.VCHost,
            this.busNo = data.BusNo,
            this.agentId = data.AgentId,
            this.stationId = data.StationId,
            this.stationPhoneNumber = data.StationPhoneNumber,
            this.stationCallerId = data.StationCallerId,
            this.sessionId = data.SessionId,
            this.dialerCampaign = data.DialerCampaign,
            this.dialerCampaignStartTime = new Date(data.DialerCampaignStartTime),
            this.supervisorPermissionLevel = (0, utility_1.parseInteger)(data.SupervisorPermissionLevel),
            this.canMask = (0, utility_1.parseBooleanString)(data.CanMask),
            this.agentSchedulePermission = data.AgentSchedulePermission,
            this.scoreRecordingsPermission = (0, utility_1.parseBooleanString)(data.ScoreRecordingsPermission),
            this.hideAgentStatePermission = data.HideAgentStatePermission,
            this.clientConnectorPort = (0, utility_1.parseInteger)(data.ClientConnectorPort),
            this.canMultiPartyConference = (0, utility_1.parseBooleanString)(data.CanMultiPartyConference),
            this.maxConcurrentChats = (0, utility_1.parseInteger)(data.MaxConcurrentChats),
            this.canRecord = (0, utility_1.parseBooleanString)(data.CanRecord),
            this.enabledForMCH = (0, utility_1.parseBooleanString)(data.EnabledForMCH),
            this.useCustomerCard = (0, utility_1.parseBooleanString)(data.UseCustomerCard),
            this.agentUUId = data.AgentUUId,
            this.entityMode = (0, utility_1.parseBooleanString)(data.EntityMode);
        this.screenAgentPort = (data.portNo) ? (0, utility_1.parseInteger)(data.portNo) : 31322;
    }
}
exports.AgentSessionStartEvent = AgentSessionStartEvent;
//# sourceMappingURL=agent-session-start-event.js.map