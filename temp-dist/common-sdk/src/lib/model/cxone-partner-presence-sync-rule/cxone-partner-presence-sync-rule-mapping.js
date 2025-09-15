"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXonePartnerPresenceSyncRuleMapping = void 0;
/**
 * Model class for CXone Partner Presence Sync Rule
 */
class CXonePartnerPresenceSyncRuleMapping {
    /**
     * The constructor will take the data object and assign the values to the cxone partner presence sync rule
     * @param data - Data object received
     * @example -
     * ```
     * CXonePartnerPresenceSyncRule.parse(data);
     * ```
     */
    parse(data) {
        this.publisherStateMapping = data.publisherStateMap.map((item) => {
            return {
                cxoneAgentState: item.incontactAgentState,
                partnerAgentState: item.partnerAgentState,
            };
        });
        this.subscriberStateMapping = data.subscriberStateMap.map((item) => {
            return {
                cxoneAgentState: item.incontactAgentState,
                partnerAgentState: item.partnerAgentState,
            };
        });
    }
}
exports.CXonePartnerPresenceSyncRuleMapping = CXonePartnerPresenceSyncRuleMapping;
//# sourceMappingURL=cxone-partner-presence-sync-rule-mapping.js.map