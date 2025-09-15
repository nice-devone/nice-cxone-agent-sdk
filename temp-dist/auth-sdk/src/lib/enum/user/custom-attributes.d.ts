/**
 * Enum for Custom Attributes for user
 */
export declare enum UserCustomAttributes {
    /**
     * Customer Card Attribute
     */
    CUSTOMER_CARD = "customerCard",
    /**
     * Digital Enagement Attribute
     */
    DIGITAL_ENGAGEMENT = "digitalEngagement",
    /**
     * SmartReach
     * Ref:
     * - CRM-9979
     * - OB-19327
     */
    SMART_REACH_AGENT = "hasSmartReachAgentAccess",
    SMART_REACH_USER = "hasSmartReachUserAccess",
    /**
     * SmartReach Desk & ECC Access
     * Ref:
     * - UH-55772
     */
    SMART_REACH_DESK = "smartReachDeskAccess",
    SMART_REACH_ECC = "smartReachECCAccess"
}
