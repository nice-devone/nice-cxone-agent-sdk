export const StorageKeys = {
    OIDC_CONFIG: 'oidc_config',
    CXONE_CONFIG: 'cxone_config',
    AUTH_TOKEN: 'auth_token',
    CODE_VERIFIER: 'code_verifier',
    ACD_SESSION_ID: 'acd_session_id',
    PERMISSIONS: 'permissions',
    AGENT_SETTINGS: 'agent_settings',
    BUSINESS_UNIT: 'business_unit',
    CLIENT_DATA: 'client_data',
    BRANDING_PROFILES: 'branding_profiles',
    SKILL_LIST: 'skill-list',
    AGENT_INFO: 'agent_info',
    CONNECTED_AC_SERVER: 'connected_ac_server',
    AGENT_LEG_CALL: 'agent_leg_call',
    CONTACTS: 'contacts',
    IS_SKILL_ACTIVITY_POLLING: 'is_skill_activity',
    DIRECTORY_POLLING_CONFIG: 'dir_poll_config',
    SERVER_TIME_OFFSET: 'server_time_offset',
    WEM_NOTIFICATION_POLLING_CONFIG: 'notification_poll_config',
    UNAVAILABLE_CODES: 'unavailable_codes',
    USER_INFO: 'user_info',
    CONTACT_CUSTOM_FIELD_DEFINITION_DETAILS: 'contact_custom_field_definition_details',
    LAST_LOGGED_IN_AGENT_ID: 'lastLoggedInAgentId',
    CXONE_NAVIGATION_ITEMS: 'CXoneNavigationItems',
    EXTERNAL_PRODUCT_URLS: 'externalProductUrls',
    DIGITAL_USER_ID: 'digitalUserId',
    SKILL_ACTIVITY_POLLING_REQUEST_PARAMS: 'skill_activity_polling_params',
    IS_SCREEEN_AGENT_CONNECTED: 'IsScreenAgentConnected',
    IS_SCREEEN_AGENT_API_IN_PROGRESS: 'IsScreenAgentAPIInProgress',
    DIGITAL_AGENT_STATUS: 'digital_agent_status',
    CXONE_ACTIVITY_CONFIG: 'cxone_activity_config',
    CXONE_BROWSER_RELOAD: 'cxone_browser_reload',
    AGENT_DETAILS: 'agent_details',
    COPILOT_DETAILS: 'copilot_details',
    IS_USER_LOGGED_IN: 'isUserLoggedIn',
    DIGITAL_CONTACT_USER_SAVED_PROPS: 'digital_contact_saved_props',
    SELECTED_CASE_ID: 'selected_case_id',
    APPSPACE_RATIO: 'app_Space_ratio',
    FOCUSED_CONTACT_ID: 'current_focused_contact',
    CC_LINKED_ACTIVITIES: 'cc_linked_activities',
    WEBRTC_EXTENSION_INSTALL_REMINDER: 'webrtc_extension_install_reminder',
    WEBRTC_EXT_INSTALL_REMINDER_DISPLAYED: 'webrtc_ext_install_reminder_displayed',
    USER_DETAILS: 'user_details',
    CRM_BASE_URL: 'crm_base_url',
    ACTIVE_CUSTOMWORKSPACE: 'active_CustomWorkspace',
    OUTBOUND_DIGITAL_CONTACTS: 'ob_digital_contact',
    CLICK_TO_DIAL_DATA: 'click_to_dial_data',
    DRAFT_DISPOSITION_CONTACTS: 'draft_disposition_details',
    SORT_ORDER_DIGITAL: 'sort_order_digital',
    SORT_CRITERIA_DIGITAL: 'sort_criteria_digital',
    PINNED_MENU_ITEM: 'pinned_menu_item',
    ISINBOXCOLLAPSED: 'isInboxCollapsed',
    IS_RECORDING_ENABLED: 'isRecordingEnabled',
    QUEUED_AGENT_ID: 'queued_agent_id',
    INTERACTION_SPACE_VERTICAL_RATIO: 'interaction_vertical_splitter_ratio',
    CUSTOMEVENT_DATA: 'customeventData',
    AGENT_MESSAGE_POPOVER: 'agent_message_popover',
    AGENT_WORKFLOW_CONFIGURATION_EVENT: 'agentWorkflowConfigurationEvent',
    AGENT_WORKFLOW_EVENT: 'agentWorkflowEvent',
    PARENT_APP: 'parentApp',
    AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS: 'acp_adaptive_card_schemas',
    CRM_PIN_RECORDS: 'crmPinRecords',
    SELECTED_INTERACTION_ID: 'selected_interaction_id',
    CRM_NAVIGATION_DATA: 'crmNavigationData',
    COBROWSE_DATA: 'coBrowseData',
    LOGGING_LEVEL: 'loggingLevel',
    DIGITAL_ATTACHMENTS: 'digital_attachments_',
    CC_RELATESTO_ACTIVITIES: 'cc_related_activities',
    FINGERPRINT_SHOW: 'fingerPrintShow',
    VOICE_PREFERENCE: 'voice_preference',
    /**
     * This key is used to store the ACS email id used during session initiation
     */
    ACS_EMAIL_ID: 'acsEmailId',
    ABLE_TO_ERASE_CONTENT_AUTHOR: 'ableToEraseContentAndAuthor',
    IMAGE_PASTE_ERROR: 'imagePasteError',
    VOICE_BIO_HUB_DATA: 'voiceBioHubData',
    VOICE_BIO_HUB_AGENT_ASSIST: 'voiceBioHubAgentAssist',
};
export const NotificationSettings = {
    ACCESSIBILITY: 'Accessibility',
    AUDIO_AGENT_MESSAGE: 'audioAgentMessage',
    AUDIO_AGENT_MESSAGE_TONE: 'audioAgentMessageTone',
    AUDIO_END_CONTACT: 'audioEndContact',
    AUDIO_END_CONTACT_TONE: 'audioEndContactTone',
    AUDIO_NEW_CHAT: 'AudioNewChat',
    AUDIO_NEW_CONTACT: 'audioNewContact',
    AUDIO_NEW_CONTACT_TONE: 'audioNewContactTone',
    AUIDO_NEW_CONTACT_REPLY: 'audioNewContactReply',
    AUIDO_NEW_CONTACT_REPLY_TONE: 'audioNewContactReplyTone',
    AUTO_ACCEPT: 'AutoAccept',
    DISPLAY: 'Display',
    ENABLE_VISUAL_NOTIFICATIONS: 'EnableVisualNotifications',
    PANEL_POPOUT: 'PanelPopout',
    RINGTONE: 'Ringtone',
    RINGTONE_SETTING: 'RingtoneSetting',
    SECONDARY_DEVICE: 'SecondaryDevice',
    SECONDARY_DEVICE_DELAY: 'SecondaryDeviceDelay',
    SECONDARY_DEVICE_SETTING: 'SecondaryDeviceSetting',
    SOFTPHONE_SETTINGS_MENU: 'SoftphoneSettingsMenu',
    SOFTPHONE_VOLUME: 'SoftPhoneVolume',
    TWENTY_FOUR_HOUR_TIME: 'TwentyFourHourTime',
    VISUAL_AGENT_MESSAGE: 'visualAgentMessage',
    VISUAL_END_CONTACT: 'visualEndContact',
    VISUAL_NEW_CHAT: 'VisualNewChat',
    VISUAL_NEW_CONTACT: 'visualNewContact',
    VISUAL_NEW_CONTACT_REPLY: 'visualNewContactReply',
    NOISE_CANCELLATION_MIC_SLIDER: 'noiseCancellationMicSlider',
    NOISE_CANCELLATION_SPEAKER_SLIDER: 'noiseCancellationSpeakerSlider',
    NOISE_CANCELLATION_MIC_TOGGLE: 'noiseCancellationMicCheckToggle',
    NOISE_CANCELLATION_SPEAKER_TOGGLE: 'noiseCancellationSpeakerCheckToggle',
    SEND_WITH_ENTER: 'sendWithEnter',
};
//# sourceMappingURL=storage-key.js.map