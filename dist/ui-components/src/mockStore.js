import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { agentSettingsReducer, AGENT_SETTINGS_KEY } from './lib/ccf-agent-setting/ccf-agent-setting-slice';
import { agentSkillDetailsReducer, AGENT_SKILL_DETAILS_KEY } from './lib/ccf-agent-skill/ccf-agent-skill-details-slice';
import { agentStateReducer, AGENT_STATE_KEY } from './lib/ccf-agent-state/ccf-agent-state.slice';
import { ASSIGNMENT_KEY, CcfAssignmentReducer } from './lib/ccf-assignment-panel/ccf-assignment-panel.slice';
import { ccfChannelDetailsReducer, CHANNEL_DETAIL_KEY } from './lib/ccf-assignment-panel/ccf-contact-assignment/ccf-channel-details-slice';
import { globalReducer, GLOBAL_APP_FEATURE_KEY } from './lib/global.app.slice';
import { CcfScreenPopReducer, CCF_SCREEN_POP_FEATURE_KEY } from './lib/ccf-screen-pop/ccf-screen-pop.slice';
import { DISPOSITION_KEY, dispostionInteractionReducer } from './lib/ccf-disposition/ccf-disposition-slice';
import { CCF_CUSTOMERCARD_KEY, CcfCustomerCardReducer } from './lib/ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { appSpaceReducer, CCF_APP_SPACE_KEY } from './lib/ccf-app-space/ccf-app-space.slice';
import { CcfCaseCustomFieldReducer, CCF_CASE_CUSTOM_FIELD_KEY } from './lib/ccf-interaction-space/ccf-custom-fields/ccf-case-custom-field.slice';
import { voicePreferenceReducer, VOICE_PREFERNCE_FEATURE_KEY } from './lib/ccf-acd-session/ccf-acd-session.slice';
import { CcfAuthenticationReducer, CCF_AUTHENTICATION_FEATURE_KEY } from './lib/ccf-authentication/ccf-authentication.slice';
import { callConferenceReducer, CCF_CALL_CONFERENCE_FEATURE_KEY } from './lib/ccf-call-conference/ccf-call-conference.slice';
import { CCF_APP_SCHEDULER_KEY, CcfAppScheduleReducer } from './lib/ccf-app-schedule/ccf-app-schedule.slice';
import { AGENT_NOTIFICATION_KEY, agentWemNotificationsReducer } from './lib/ccf-agent-notification/ccf-agent-notification.slice';
import { AGENT_CONTACT_HISTORY_KEY, ccfAgentContactHistoryReducer } from './lib/ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { NOTIFICATION_SETTINGS_KEY, notificationsSettingsReducer } from './lib/ccf-settings/ccf-notification-settings.slice';
import { OBMessageTemplateReducer, OUTBOUND_TEMPLATE_PREVIEW_KEY } from './lib/ccf-app-space/ccf-quick-replies/ccf-message-templates/ccf-outbound-template-preview/ccf-outbound-template-preview.slice';
import { CCF_REPORTING_FEATURE_KEY, reportingReducer } from './lib/ccf-reporting/ccf-reporting.slice';
import { ccfDigitalSearchReducer, CCF_DIGITAL_SEARCH_FEATURE_KEY } from './lib/ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { CcfSettingsInformationReducer, SETTINGSINFORMATION_KEY } from './lib/ccf-system-information/ccf-system-information.slice';
import { CcfCopilotReducer, CCF_COPILOT_KEY } from './lib/ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { CONTACT_EDITOR_KEY, CcfContactEditorReducer } from './lib/ccf-editor/ccf-contact-editor.slice';
import { CCF_PARTNER_PRESENCE_SYNC_RULE_KEY, cxonePartnerPresenceSyncReducer } from './lib/ccf-partner-presence-sync-rule/ccf-partner-presence-sync-rule.slice';
import { AGENT_ASSIST_CCAI_KEY, ccfAgentAssistCCAIReducer } from './lib/ccf-agent-assist/features/ccai-slice';
import { AGENT_ASSIST_RTIG_KEY, ccfAgentAssistRTIGReducer } from './lib/ccf-agent-assist/features/rtig-slice';
import { AGENT_ASSIST_ACTIVE_PROVIDERS_KEY, ccfAgentAssistActiveProvidersReducer } from './lib/ccf-agent-assist/features/active-providers-slice';
import { CCF_VOICE_MAIL_CONTACT_FEATURE_KEY, ccfVoiceMailContactPanelReducer } from './lib/ccf-voicemail-contact/ccf-voicemail-contact-panel.slice';
import { SMART_REACH_KEY, lvAppSpaceReducer } from './lib/lv-app-space/lv-app-space.slice';
import { VOICE_TRANSCRIPTION_SLICE_KEY, CcfVoiceTranscriptionReducer } from './lib/slices/ccf-voice-transcription.slice';
import { CcfRejectedReasonReducer, REJECTED_REASON_KEY } from './lib/ccf-digital/ccf-approval-banner/ccf-rejected-reason/ccf-rejected-reason.slice';
const combinedReducer = combineReducers({
    [VOICE_PREFERNCE_FEATURE_KEY]: voicePreferenceReducer,
    [AGENT_STATE_KEY]: agentStateReducer,
    [AGENT_SETTINGS_KEY]: agentSettingsReducer,
    [AGENT_SKILL_DETAILS_KEY]: agentSkillDetailsReducer,
    [GLOBAL_APP_FEATURE_KEY]: globalReducer,
    [CCF_APP_SPACE_KEY]: appSpaceReducer,
    [CCF_AUTHENTICATION_FEATURE_KEY]: CcfAuthenticationReducer,
    [CCF_CUSTOMERCARD_KEY]: CcfCustomerCardReducer,
    [CCF_SCREEN_POP_FEATURE_KEY]: CcfScreenPopReducer,
    [ASSIGNMENT_KEY]: CcfAssignmentReducer,
    [CCF_APP_SCHEDULER_KEY]: CcfAppScheduleReducer,
    [AGENT_NOTIFICATION_KEY]: agentWemNotificationsReducer,
    [CHANNEL_DETAIL_KEY]: ccfChannelDetailsReducer,
    [AGENT_CONTACT_HISTORY_KEY]: ccfAgentContactHistoryReducer,
    [DISPOSITION_KEY]: dispostionInteractionReducer,
    [NOTIFICATION_SETTINGS_KEY]: notificationsSettingsReducer,
    [CCF_CASE_CUSTOM_FIELD_KEY]: CcfCaseCustomFieldReducer,
    [OUTBOUND_TEMPLATE_PREVIEW_KEY]: OBMessageTemplateReducer,
    [CCF_CALL_CONFERENCE_FEATURE_KEY]: callConferenceReducer,
    [CCF_REPORTING_FEATURE_KEY]: reportingReducer,
    [CCF_DIGITAL_SEARCH_FEATURE_KEY]: ccfDigitalSearchReducer,
    [SETTINGSINFORMATION_KEY]: CcfSettingsInformationReducer,
    [CCF_COPILOT_KEY]: CcfCopilotReducer,
    [CONTACT_EDITOR_KEY]: CcfContactEditorReducer,
    //[CCF_DIRECTORY_FEATURE_KEY]: agentDirectoryReducer,
    [CCF_PARTNER_PRESENCE_SYNC_RULE_KEY]: cxonePartnerPresenceSyncReducer,
    [AGENT_ASSIST_CCAI_KEY]: ccfAgentAssistCCAIReducer,
    [AGENT_ASSIST_RTIG_KEY]: ccfAgentAssistRTIGReducer,
    [AGENT_ASSIST_ACTIVE_PROVIDERS_KEY]: ccfAgentAssistActiveProvidersReducer,
    [CCF_VOICE_MAIL_CONTACT_FEATURE_KEY]: ccfVoiceMailContactPanelReducer,
    [SMART_REACH_KEY]: lvAppSpaceReducer,
    [VOICE_TRANSCRIPTION_SLICE_KEY]: CcfVoiceTranscriptionReducer,
    [REJECTED_REASON_KEY]: CcfRejectedReasonReducer,
});
/**
 * Method to combine the reducers
 * @example
 */
export const rootReducer = (state, action) => {
    return combinedReducer(state, action);
};
export const mockStore = configureStore({
    reducer: rootReducer,
});
//# sourceMappingURL=mockStore.js.map