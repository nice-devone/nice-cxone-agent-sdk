"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneAgentAssist = void 0;
/**
 * Model class for CXoneAgentAssist event
 */
class CXoneAgentAssist {
    /**
      * The constructor will take the event object and assign the values to the CXoneAgentAssist properties
      * @param event - event object
      * @example - new CXoneAgentAssist(event)
      **/
    constructor(event) {
        this.appUri = event['AppUri'];
        this.contactId = event['ContactId'];
        this.appTitle = event['AppTitle'];
        this.allParams = event;
    }
}
exports.CXoneAgentAssist = CXoneAgentAssist;
//# sourceMappingURL=cxone-agent-assist.js.map