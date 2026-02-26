import { combineReducers } from '@reduxjs/toolkit';
import { VOICE_PREFERNCE_FEATURE_KEY, voicePreferenceReducer } from './ccf-acd-session/ccf-acd-session.slice';
import { AGENT_ASSIST_ACTIVE_PROVIDERS_KEY, ccfAgentAssistActiveProvidersReducer } from './ccf-agent-assist/features/active-providers-slice';
import { AGENT_ASSIST_CCAI_KEY, ccfAgentAssistCCAIReducer } from './ccf-agent-assist/features/ccai-slice';
import { AGENT_ASSIST_RTIG_KEY, ccfAgentAssistRTIGReducer } from './ccf-agent-assist/features/rtig-slice';
import { CCF_COPILOT_KEY, CcfCopilotReducer } from './ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { AGENT_NOTIFICATION_KEY, agentWemNotificationsReducer } from './ccf-agent-notification/ccf-agent-notification.slice';
import { AGENT_SETTINGS_KEY, agentSettingsReducer } from './ccf-agent-setting/ccf-agent-setting-slice';
import { AGENT_SKILL_DETAILS_KEY, agentSkillDetailsReducer } from './ccf-agent-skill/ccf-agent-skill-details-slice';
import { AGENT_STATE_KEY, agentStateReducer } from './ccf-agent-state/ccf-agent-state.slice';
import { CCF_APP_SCHEDULER_KEY, CcfAppScheduleReducer } from './ccf-app-schedule/ccf-app-schedule.slice';
import { AGENT_CONTACT_HISTORY_KEY, ccfAgentContactHistoryReducer } from './ccf-app-space/ccf-agent-contact-history/ccf-agent-contact-history.slice';
import { CCF_APP_SPACE_KEY, appSpaceReducer } from './ccf-app-space/ccf-app-space.slice';
import { CCF_CUSTOMERCARD_KEY, CcfCustomerCardReducer } from './ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { CCF_DIGITAL_SEARCH_FEATURE_KEY, ccfDigitalSearchReducer } from './ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { OUTBOUND_TEMPLATE_PREVIEW_KEY, OBMessageTemplateReducer } from './ccf-app-space/ccf-quick-replies/ccf-message-templates/ccf-outbound-template-preview/ccf-outbound-template-preview.slice';
import { ASSIGNMENT_KEY, CcfAssignmentReducer } from './ccf-assignment-panel/ccf-assignment-panel.slice';
import { CHANNEL_DETAIL_KEY, ccfChannelDetailsReducer } from './ccf-assignment-panel/ccf-contact-assignment/ccf-channel-details-slice';
import { CCF_AUTHENTICATION_FEATURE_KEY, CcfAuthenticationReducer } from './ccf-authentication/ccf-authentication.slice';
import { CCF_CALL_CONFERENCE_FEATURE_KEY, callConferenceReducer } from './ccf-call-conference/ccf-call-conference.slice';
import { DISPOSITION_KEY, dispostionInteractionReducer } from './ccf-disposition/ccf-disposition-slice';
import { CONTACT_EDITOR_KEY, CcfContactEditorReducer } from './ccf-editor/ccf-contact-editor.slice';
import { CCF_CASE_CUSTOM_FIELD_KEY, CcfCaseCustomFieldReducer } from './ccf-interaction-space/ccf-custom-fields/ccf-case-custom-field.slice';
import { CCF_PARTNER_PRESENCE_SYNC_RULE_KEY, cxonePartnerPresenceSyncReducer } from './ccf-partner-presence-sync-rule/ccf-partner-presence-sync-rule.slice';
import { CCF_REPORTING_FEATURE_KEY, reportingReducer } from './ccf-reporting/ccf-reporting.slice';
import { CCF_SCREEN_POP_FEATURE_KEY, CcfScreenPopReducer } from './ccf-screen-pop/ccf-screen-pop.slice';
import { CCF_VOICE_MAIL_CONTACT_FEATURE_KEY, ccfVoiceMailContactPanelReducer } from './ccf-voicemail-contact/ccf-voicemail-contact-panel.slice';
import { NOTIFICATION_SETTINGS_KEY, notificationsSettingsReducer } from './ccf-settings/ccf-notification-settings.slice';
import { SETTINGSINFORMATION_KEY, CcfSettingsInformationReducer } from './ccf-system-information/ccf-system-information.slice';
import { GLOBAL_APP_FEATURE_KEY, globalReducer } from './global.app.slice';
import { CCF_COMMITMENT_FEATURE_KEY, commitmentReducer } from './ccf-commitment/ccf-commitment.slice';
import { CCF_DIRECTORY_FEATURE_KEY, agentDirectoryReducer } from './ccf-directory/+state/ccf-directory.slice';
import { FULL_SETTINGS_KEY, ccfFullSettingsReducer } from './ccf-settings/ccf-full-settings.slice';
import { VOICE_TRANSCRIPTION_SLICE_KEY, CcfVoiceTranscriptionReducer } from './slices/ccf-voice-transcription.slice';
import { CcfRejectedReasonReducer, REJECTED_REASON_KEY } from './ccf-digital/ccf-approval-banner/ccf-rejected-reason/ccf-rejected-reason.slice';
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
    [CCF_VOICE_MAIL_CONTACT_FEATURE_KEY]: ccfVoiceMailContactPanelReducer,
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
    [CCF_DIRECTORY_FEATURE_KEY]: agentDirectoryReducer,
    [CCF_PARTNER_PRESENCE_SYNC_RULE_KEY]: cxonePartnerPresenceSyncReducer,
    [AGENT_ASSIST_CCAI_KEY]: ccfAgentAssistCCAIReducer,
    [AGENT_ASSIST_RTIG_KEY]: ccfAgentAssistRTIGReducer,
    [AGENT_ASSIST_ACTIVE_PROVIDERS_KEY]: ccfAgentAssistActiveProvidersReducer,
    [CCF_COMMITMENT_FEATURE_KEY]: commitmentReducer,
    [FULL_SETTINGS_KEY]: ccfFullSettingsReducer,
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
//# sourceMappingURL=rootReducer.js.map