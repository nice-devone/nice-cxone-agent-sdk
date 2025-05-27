/**
 * Enum for CXone agent Event types
 */
export declare enum CXoneAgentEvents {
    /**
     * @remarks - enum for screen pop event
     */
    CXONE_SCREEN_POP_EVENT = "ScreenPopEvent",
    /**
     *@remarks - enum for click to call event
     */
    CXONE_CLICK_TO_DIAL_EVENT = "ClickToDialEvent",
    /**
     * @remarks - enum for voice contact type
     */
    CXONE_VOICE_CONTACT_EVENT = "VoiceContact",
    /**
     * @remarks - enum for digital contact type
     */
    CXONE_DIGITAL_CONTACT_EVENT = "DigitalContactEvent",
    /**
     * @remarks - enum for agent state change
     */
    CXONE_AGENT_STATE_CHANGE = "AgentStateChange",
    /**
     * @remarks - enum for locale request to integration app (e.g. ms teams)
     */
    CXONE_AGENT_APP_INITIALIZED = "AgentAppInitialized",
    /**
     * @remarks - This event will be emitted when the teams app receives the authentication URL.
     */
    CXONE_AGENT_AUTH_REQUEST = "CXoneAgentAuthRequest",
    /**
     * @remarks - This event will be fired when the user has completed the SSO authentication and we want to redirect to the home page.
     */
    CXONE_AGENT_AUTH_RESPONSE = "CXoneAgentAuthResponse",
    /**
     * @remarks - enum for agent locale received
     */
    CXONE_AGENT_UPDATE_LOCALE_EVENT = "AgentUpdateLocaleEvent",
    /**
     * @remarks -Event to dispatch to CXone App once the Embedded App is successfully initialized
     * This event will basically help CXone to understand if it needs to execute only after the
     * embedded-app has initialized.
     */
    EMBEDDED_APP_INITIALIZED = "EmbeddedAppInitialized",
    /**
     * @remarks - enum for agent logoff
     */
    CXONE_AGENT_LOG_OFF = "CXoneAgentLogOff",
    /**
     * @remarks - enum for agent logoff
     */
    CXONE_VISUAL_NOTIFICATION = "CXoneVisualNotification",
    /**
     * @remarks - enum for contact switch event
     */
    CONTACT_SWITCH_EVENT = "ContactSwitchEvent",
    /**
    * @remarks - enum for presence sync rules
    */
    CXONE_PRESENCE_SYNC_EVENT = "CXonePresenceSyncEvent",
    /**
     * @remarks -
     */
    CXONE_AGENT_PRESENCE_SYNC_RULE = "CXoneAgentPresenceSyncRules",
    /**
     * @remarks
     */
    CXONE_AGENT_SET_PRESENCE_STATE = "CXoneAgentSetPresenceState",
    /**
     * @remarks
     */
    CXONE_AGENT_HOME_INITIALIZED = "CXoneAgentHomeInitialized",
    /**
     * @remarks - enum for capturing the events when the CRM entity navigation is changed
     */
    CXONE_CRM_ENTITY_NAVIGATION_CHANGE = "CxoneCRMEntityNavigationChange",
    /**
     * @remarks - enum for voicemail contact type
     */
    CXONE_VOICE_MAIL_CONTACT_EVENT = "VoiceMailContact",
    /**
     * @remarks - enum for workitem contact type
     */
    CXONE_WORKITEM_CONTACT_EVENT = "WorkItemContact"
}
