"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneRunApp = void 0;
const cxone_agent_event_1 = require("../agent/cxone-agent-event");
/**
 * Model class for CXone run app Screen Pop
 */
class CXoneRunApp extends cxone_agent_event_1.CXoneAgentEvent {
    /**
     * The constructor will take the data object and assign the values to the cxone run app class properties
     * @param data - Data object received
     * @example -
     * ```
     * cxoneRunApp.parse(screenPop);
     * ```
     */
    parse(data) {
        this.actionType = data.ActionType;
        this.iisHost = data.IISHost;
        this.vcHost = data.VCHost;
        this.actionValue = data.ActionValue;
        this.actionType = data.ActionType;
        this.contactId = data.ContactId;
        this.waitTimeout = data.WaitTimeout;
    }
}
exports.CXoneRunApp = CXoneRunApp;
//# sourceMappingURL=cxone-run-app.js.map