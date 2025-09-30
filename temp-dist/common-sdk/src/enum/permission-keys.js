"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionKeys = void 0;
/**
 * Enum for CXone Agent related permission keys.
 * @readonly
 * @example PermissionKeys
 */
var PermissionKeys;
(function (PermissionKeys) {
    /**
     * permission key of Agent soft phone login access
     */
    PermissionKeys["AGENT_SOFTPHONE"] = "AgentSoftPhone";
    /**
     * permission key of Agent normal phone login access
     */
    PermissionKeys["AGENT_PHONE"] = "AgentPhone";
    /**
     * permission key of Agent station login access
     */
    PermissionKeys["AGENT_STATION"] = "AgentStation";
    /**
     * permission key whether Agent soft phone login allow auto accept of contacts
     */
    PermissionKeys["AGENTLEG_AUTOACCEPT"] = "AgentSoftPhoneAutoAccept";
    /**
     * permission key for Commitment hide feature
     */
    PermissionKeys["HIDE_CREATE_COMMITMENTS"] = "HideCreateCommitments";
    /**
     * permission key for checking CXOne Agent access given
     */
    PermissionKeys["CXONE_AGENT"] = "CxoneAgent";
    /**
     * permission key of Case tab of Digital interaction search
     */
    PermissionKeys["DIGITAL_SEARCH_CASES"] = "deSearchCases";
    /**
     * permission key of Message tab of Digital interaction search
     */
    PermissionKeys["DIGITAL_SEARCH_MESSAGES"] = "deSearchMessages";
    /**
     * permission key of Customer tab of Digital interaction search
     */
    PermissionKeys["DIGITAL_SEARCH_CUSTOMERS"] = "deSearchCustomers";
    /**
     * permission key of Thread tab of Digital interaction search
     */
    PermissionKeys["DIGITAL_SEARCH_THREADS"] = "deSearchPosts";
    /**
     * permission key of showing or hiding the ACS radio button during
     * preference selection after the user logged in the application.
     */
    PermissionKeys["ACS"] = "LaunchACS";
    /**
     * permission key whether Agent soft phone login allow auto accept of contacts
     */
    PermissionKeys["HIDE_CALLER_PHONE_NUMBER"] = "HideCallerPhoneNumber";
    /**
     * permission key whether disable integrated softphone settings options are enabled
     */
    PermissionKeys["DISABLE_INTEGRATED_SOFTPHONE_SETTINGS"] = "DisableIntegratedSoftphoneSettings";
    /**
     * permission key for enabling or disabling the voice transcript feature
     */
    PermissionKeys["VOICE_TRANSCRIPT"] = "VoiceTranscript";
})(PermissionKeys = exports.PermissionKeys || (exports.PermissionKeys = {}));
//# sourceMappingURL=permission-keys.js.map