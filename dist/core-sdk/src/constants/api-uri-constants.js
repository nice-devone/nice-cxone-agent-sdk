/**
 * Class to add api uris for the application
 */
export class ApiUriConstants {
}
//Regional Token Endpoint
ApiUriConstants.REGIONAL_AUTH_TOKEN = '/public/authentication/v1/token';
ApiUriConstants.REGIONAL_AUTH_REFRESH_TOKEN = '/public/authentication/v1/refresh';
ApiUriConstants.AGENT_SESSION_URI = '/InContactAPI/services/v23.0/agent-sessions';
ApiUriConstants.JOIN_AGENT_SESSION_URI = '/InContactAPI/services/v23.0/agent-sessions/join';
ApiUriConstants.GET_NEXT_EVENT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/get-next-event?timeout={timeoutSec}';
ApiUriConstants.GET_NEXT_EVENT_TIMEOUT = '60';
ApiUriConstants.KEEP_ALIVE_URI = '/InContactAPI/services/v31.0/agent-sessions/{sessionId}/keep-alive';
ApiUriConstants.TOTAL_RETRY_ATTEMPTS_FOR_OFFLINE_EVENTS = 60;
ApiUriConstants.ERROR_RETRY_INTERVAL = 10000;
ApiUriConstants.HOLD_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/hold';
ApiUriConstants.RESUME_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/resume';
ApiUriConstants.MUTE_AGENT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/agent-phone/mute';
ApiUriConstants.UNMUTE_AGENT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/agent-phone/unmute';
ApiUriConstants.DIAL_PHONE_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/dial-phone';
ApiUriConstants.MASK_CALL_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/mask';
ApiUriConstants.UNMASK_CALL_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/unmask';
ApiUriConstants.RECORD_CALL_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/record';
ApiUriConstants.END_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/end';
ApiUriConstants.AGENT_STATE_URI = '/InContactAPI/services/v27.0/cache/agentstate';
ApiUriConstants.SKILL_ACTIVITY_URI = '/InContactAPI/services/v23.0/skills/activity';
ApiUriConstants.CONFERENCE_CALL_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/conference-calls';
ApiUriConstants.CONFERENCE_HOLD_URI = '/InContactAPI/services/v31.0/agent-sessions/{sessionId}/interactions/conference-hold';
ApiUriConstants.CONFERENCE_RESUME_URI = '/InContactAPI/services/v31.0/agent-sessions/{sessionId}/interactions/conference-resume';
ApiUriConstants.CONFERENCE_JOIN_URI = '/InContactAPI/services/v31.0/agent-sessions/{sessionId}/interactions/{contactId}/join-conference';
ApiUriConstants.CONSULT_AGENT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/consult-agent';
ApiUriConstants.DIAL_AGENT_LEG_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/agent-phone/dial';
ApiUriConstants.END_AGENT_LEG_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/agent-phone/end';
ApiUriConstants.ADD_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/add-contact';
ApiUriConstants.ACTIVATE_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/activate';
// Api for urls for address book
ApiUriConstants.ADDRESS_BOOK_URI = '/incontactapi/services/v23.0/agents/{agentId}/address-books';
ApiUriConstants.STANDARD_ADDRESS_BOOK_URI = '/incontactapi//services/v23.0/address-books/{addressBookId}/entries';
ApiUriConstants.GET_AGENT_SKILLS_URI = '/InContactAPI/services/v23.0/agents/{agentId}/skills';
ApiUriConstants.GET_SKILL_WITH_ID_URI = '/InContactAPI/services/v23.0/skills/{skillId}';
ApiUriConstants.SET_AGENT_STATE_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/state';
ApiUriConstants.PC_DIALER_LOGIN = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/dialer-login';
ApiUriConstants.PC_DIALER_LOGOUT = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/dialer-logout';
ApiUriConstants.DIAL_AGENT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/dial-agent';
ApiUriConstants.DIAL_SKILL_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/dial-skill';
ApiUriConstants.TRANSFER_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/transfer-calls';
ApiUriConstants.TRANSFER_VOICEMAIL_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/transfer-voicemail-to-agent';
ApiUriConstants.TRANSFER_WORK_ITEM_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/transfer-work-item-to-agent';
ApiUriConstants.SEND_DTMF = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/send-dtmf';
ApiUriConstants.SKILL_CACHE_URI = '/InContactAPI/services/v23.0/cache/skills';
ApiUriConstants.AGENT_QUEUE_URI = '/incontactapi/services/v23.0/agents/{agentId}/queues';
ApiUriConstants.AGENT_QUEUE_DETAIL_URI = '/incontactapi/services/v23.0/agents/{agentId}/queues-detail';
//Api uris to accept and reject inbound contact
ApiUriConstants.ACCEPT_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/accept';
ApiUriConstants.REJECT_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/reject';
ApiUriConstants.POST_CUSTOM_FORM_DATA = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/custom-data';
//Api uris for out of network preview dialer
ApiUriConstants.SNOOZE_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/snooze';
ApiUriConstants.RESCHEDULE_SAVE_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/disposition';
ApiUriConstants.INDEPENDENT_DIAL = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/independent-dial';
ApiUriConstants.INDEPENDENT_DIAL_OUTCOME = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/independent-dial-outcome';
//Api uris to accept and reject inbound contact for consult
ApiUriConstants.ACCEPT_CONSULT_CONTACT_URI = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/accept-consult';
//Dynamic Entries API's
ApiUriConstants.DIRECTORY_ENTRIES = '/rtd/v1/agents/{agentId}/directories/{directoryId}/entries';
//Api uris for getting all directories
ApiUriConstants.GET_DIRECTORIES = '/rtd/v1/agents/{agentId}/directories';
ApiUriConstants.GET_DIRECTORY_METADATA = '/rtd/v1/agents/{agentId}/directories/{directoryId}/metadata';
ApiUriConstants.UH_GET_USERS = '/user-management/v1/users/';
//Api to search directories
ApiUriConstants.SEARCH_DIRECTORIES = '/rtd/v2/agents/directories/entries/search';
// API uri for PRESENCE SYNC WebSocket
ApiUriConstants.PRESENCE_SYNC_WEBSOCKET = '/directory/ws';
// IEX uri for fetching IEX schedules
ApiUriConstants.GET_IEXSCHEDULE = '/incontactapi/services/v8.0/agents/{agentId}/wfm-schedule?startDate={startDate}&endDate={endDate}';
//Disposition APIs
// Using v12.0 so agent with no View permission on Skills
// will not get stuck in ACW state
ApiUriConstants.GET_DISPOSITION_URI = '/InContactAPI/services/v12.0/skills/{skillId}/dispositions';
ApiUriConstants.GET_TAGS_URI = '/InContactAPI/services/v12.0/skills/{skillId}/tags';
ApiUriConstants.SAVE_TAGS_URI = '/InContactAPI/services/v23.0/contacts/{contactId}/tags';
ApiUriConstants.GENERATE_AUTO_SUMMARY_URI = '/autosummary/digital-events-consumer/public/v1/contacts/{caseId}/summarize';
//Agent messages URI
ApiUriConstants.AGENT_MESSAGES_URI = '/InContactAPI/services/v23.0/agents/{agentId}/messages';
//server time URI
ApiUriConstants.SERVER_TIME_URI = '/InContactAPI/services/v23.0/server-time';
//Embedded page URI
ApiUriConstants.EMBEDDED_PAGE_URI = '/navigation_data/links/embedded-client';
// Digital APIs Start here
// Get all channels
ApiUriConstants.DIGITAL_CHANNELS_LIST = '/dfo/3.0/channels';
ApiUriConstants.DIGITAL_SEND_REPLY_URI = '/dfo/3.0/channels/{channelId}/outbound';
ApiUriConstants.DIGITAL_ATTACHMENT_UPLOAD = '/dfo/3.0/attachments/temporary';
ApiUriConstants.DOWNLOAD_ALL_ATTACHMENTS = '/dfo/3.0/attachments/download';
ApiUriConstants.DIGITAL_CONTACT_STATUS = '/dfo/3.0/contacts/{contactId}/status';
ApiUriConstants.DIGITAL_BULK_REPLY = '/dfo/3.0/batch-actions';
ApiUriConstants.GET_BULK_REPLY_HISTORY = ApiUriConstants.DIGITAL_BULK_REPLY + '?jobType=sendReply';
// Assign or Unassign Customer contact API endpoint is same
ApiUriConstants.CUSTOMER_CONTACT_ASSIGNMENT = '/dfo/3.0/contacts/{contactId}/inbox-assignment';
ApiUriConstants.CHANGE_ROUTING_QUEUE = '/dfo/3.0/contacts/{contactId}/routing-queue';
// TODO: Using v2 of Userslot API for now, will be updated with v3 once API is ready
ApiUriConstants.USER_SLOTS = '/engager/2.0/users/{userId}/user-slots';
ApiUriConstants.DIGITAL_USER_DETAILS = '/dfo/3.0/me';
ApiUriConstants.DIGITAL_CONTACT_DETAILS = '/dfo/3.0/contacts/{contactId}/detail';
ApiUriConstants.DIGITAL_QUICK_REPLIES = '/dfo/3.0/contacts/{contactId}/quick-replies';
ApiUriConstants.DIGITAL_REPLACE_VARIABLES = '/dfo/3.0/contacts/{contactId}/quick-replies/{quickReplyId}/replace-variables';
ApiUriConstants.DIGITAL_CASE_HISTORY = '/dfo/3.0/contacts/{contactId}/history?page={pageNumber}&size={pageSize}&withContext=1';
ApiUriConstants.DIGITAL_TRANSLATION_AVAILABLE_LANGUAGES = '/dfo/3.0/translate/available-languages';
ApiUriConstants.DIGITAL_MESSAGE_TRANSLATION = '/dfo/3.0/translate';
ApiUriConstants.GET_UNAVAILABLE_CODES_URI = '/InContactAPI/services/v23.0/teams/{teamId}/unavailable-codes';
//Api uris to get team list
ApiUriConstants.GET_TEAMS = '/InContactAPI/services/v23.0/teams';
//API for event hub subscription
ApiUriConstants.EVENT_HUB_SUBSCRIPTION_URI = '/dfo/3.0/event-hub-subscriptions';
//Api uris to get agent list
ApiUriConstants.GET_AGENT_WITH_TEAM_ID = '/InContactAPI/services/v23.0/teams/{teamId}/agents';
// API uri to get agent info by agent id
ApiUriConstants.GET_AGENT_WITH_AGENT_ID = '/InContactAPI/services/v23.0/agents/{agentId}';
//Api uris to get agent schedule
ApiUriConstants.GET_AGENT_SCHEDULE = '/schedules/user/{userId}?start={startDate}&end={endDate}';
ApiUriConstants.GET_CUSTOM_FIELD_DEFINITIONS = '/dfo/3.0/customers/custom-field-definitions';
//Api uris to get custom field definitions
ApiUriConstants.CONTACT_CUSTOM_FIELD_DEFINITIONS = '/dfo/3.0/contacts/custom-field-definitions';
ApiUriConstants.UPDATE_CUSTOMER_CUSTOM_FIELD = '/dfo/3.0/customers/{customersId}/custom-fields';
ApiUriConstants.GET_CONTACT_DETAILS_BY_ID = '/dfo/3.0/contacts';
ApiUriConstants.GET_CUSTOMER_DETAILS_BY_ID = '/dfo/3.0/customers';
ApiUriConstants.MERGE_CUSTOMER_CARD_BY_ID = ApiUriConstants.GET_CUSTOMER_DETAILS_BY_ID + '/{customerId}/merge';
ApiUriConstants.GET_AGENT_VOICE_CONTACT_HISTORY = '/InContactAPI/services/v23.0/contacts/completed';
ApiUriConstants.UPDATE_DIGITAL_USER_STATUS = '/engager/2.0/users/{dfoAgentId}/status';
ApiUriConstants.GET_DIGITAL_USER_STATUS = '/engager/2.0/user-statuses';
ApiUriConstants.GET_MESSAGE_BY_ID = '/dfo/3.0/messages/{messageId}';
// Play Voicemail API
ApiUriConstants.PLAY_VOICEMAIL = '/incontactapi/services/V4.0/agent-sessions/{sessionId}/interactions/{contactId}/play-voicemail';
// Customer Notes API
ApiUriConstants.GET_CREATE_CUSTOMER_NOTE = '/dfo/3.0/customers/{customerId}/notes';
ApiUriConstants.UPDATE_DELETE_CUSTOMER_NOTE = '/dfo/3.0/customers/{customerId}/notes/{noteId}';
//Api uri to get team by team id
ApiUriConstants.GET_TEAM_WITH_TEAM_ID = '/InContactAPI/services/v23.0/teams/{teamId}';
//Personal Connection Dialer APIs
ApiUriConstants.POST_AMD_OVERRIDE = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/amd-override';
ApiUriConstants.GET_SKILL_DELIVERY_PREFERENCES = '/InContactAPI/services/v23.0/skills/{skillId}/parameters/delivery-preferences';
ApiUriConstants.GET_SKILL_CPA_MANAGEMENT_PARAMETERS = '/InContactAPI/services/v23.0/skills/{skillId}/parameters/cpa-management';
ApiUriConstants.POST_ANS_MACHINE_OVERRIDE = '/InContactAPI/services/v23.0/agent-sessions/{sessionId}/interactions/{contactId}/ans-machine-override';
// Workflow APIs
ApiUriConstants.GET_AGENT_INTEGRATION_WORKFLOW_URI = '/InContactAPI/services/v26.0/agent-integration/configuration/{configurationId}/workflow';
ApiUriConstants.GET_AGENT_INTEGRATION_CONFIGURATION_URI = '/InContactAPI/services/v26.0/agent-integration/configuration';
ApiUriConstants.GET_AGENT_INTEGRATION_DATA_MAPPING_URI = '/InContactAPI/services/v27.0/agent-integration/configuration/{configurationId}/data-mappings';
ApiUriConstants.GET_AGENT_INTEGRATION_DYNAMIC_DATA_MAPPING_URI = '/InContactAPI/services/v29.0/agent-integration/configuration/{configurationId}/dynamic-data-mappings';
ApiUriConstants.MESSAGE_TAG = '/dfo/3.0/messages/{messageId}/tags/{tagId}';
ApiUriConstants.GET_MESSAGE_TAG = '/dfo/3.0/tags';
ApiUriConstants.GET_MESSAGE_TAGS_BY_PAGE = '/dfo/3.0/tags?page={pageNumber}';
ApiUriConstants.SEARCH_DIGITAL_TAG = '/dfo/3.0/tags?nameContains={tagName}&page={pageNumber}&includeDeleted=false';
//API uri to update isRead flag for a digital contact
ApiUriConstants.UPDATE_MESSAGE_READ_STATUS = '/dfo/3.0/messages/{messageId}/read';
//Transcript APIs
ApiUriConstants.SEND_TRANSCRIPT = '/dfo/3.0/contacts/{contactId}/transcript';
//Continue reskill
ApiUriConstants.CONTINUE_RESKILL = '/inContactapi/services/v23.0/agent-sessions/{sessionId}/continue-reskill';
ApiUriConstants.GET_PRESENCE_SYNC_RULE = '/adapter-apis/v1/{partnerName}/rule/{partnerId}';
ApiUriConstants.GET_AGENT_LOCATION = '/user-management/v1/users/location/evaluate';
ApiUriConstants.SELECT_AGENT_LOCATION = '/user-management/v1/users/location/select-location';
;
//# sourceMappingURL=api-uri-constants.js.map