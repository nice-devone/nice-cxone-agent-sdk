/**
 * Enum for Custom Attributes for user
 */
export var UserCustomAttributes;
(function (UserCustomAttributes) {
    /**
     * Customer Card Attribute
     */
    UserCustomAttributes["CUSTOMER_CARD"] = "customerCard";
    /**
     * Digital Enagement Attribute
     */
    UserCustomAttributes["DIGITAL_ENGAGEMENT"] = "digitalEngagement";
    /**
     * SmartReach
     * Ref:
     * - CRM-9979
     * - OB-19327
     */
    UserCustomAttributes["SMART_REACH_AGENT"] = "hasSmartReachAgentAccess";
    UserCustomAttributes["SMART_REACH_USER"] = "hasSmartReachUserAccess";
    /**
     * SmartReach Desk & ECC Access
     * Ref:
     * - UH-55772
     */
    UserCustomAttributes["SMART_REACH_DESK"] = "smartReachDeskAccess";
    UserCustomAttributes["SMART_REACH_ECC"] = "smartReachECCAccess";
})(UserCustomAttributes || (UserCustomAttributes = {}));
//# sourceMappingURL=custom-attributes.js.map