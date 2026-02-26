import { configureStore } from '@reduxjs/toolkit';
import { voicePreferenceReducer, VOICE_PREFERNCE_FEATURE_KEY, } from './lib/ccf-acd-session/ccf-acd-session.slice';
import { agentWemNotificationsReducer, AGENT_NOTIFICATION_KEY, } from './lib/ccf-agent-notification/ccf-agent-notification.slice';
import { agentStateReducer, AGENT_STATE_KEY, } from './lib/ccf-agent-state/ccf-agent-state.slice';
import { CcfAppScheduleReducer, CCF_APP_SCHEDULER_KEY, } from './lib/ccf-app-schedule/ccf-app-schedule.slice';
import { appSpaceReducer, CCF_APP_SPACE_KEY, } from './lib/ccf-app-space/ccf-app-space.slice';
import { ASSIGNMENT_KEY, CcfAssignmentReducer, } from './lib/ccf-assignment-panel/ccf-assignment-panel.slice';
import { agentDirectoryReducer, CCF_DIRECTORY_FEATURE_KEY, } from './lib/ccf-directory/+state/ccf-directory.slice';
import { CCF_SCREEN_POP_FEATURE_KEY, CcfScreenPopReducer, } from './lib/ccf-screen-pop/ccf-screen-pop.slice';
import { globalReducer, GLOBAL_APP_FEATURE_KEY } from './lib/global.app.slice';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { acdSessionEventMiddleware } from './lib/ccf-acd-session/acdSessionEventMiddleware';
import { agentActivityMiddleware } from './lib/ccf-directory/+state/agentActivityMiddleware';
import { agentLegMiddleware } from './lib/ccf-agent-leg/agentLegMiddleware';
import { skillActivityMiddleware } from './lib/ccf-directory/+state/skillActivityMiddleware';
import { agentSettingsReducer, AGENT_SETTINGS_KEY, } from './lib/ccf-agent-setting/ccf-agent-setting-slice';
import { agentSkillDetailsReducer, AGENT_SKILL_DETAILS_KEY, } from './lib/ccf-agent-skill/ccf-agent-skill-details-slice';
import { CcfAuthenticationReducer, CCF_AUTHENTICATION_FEATURE_KEY, } from './lib/ccf-authentication/ccf-authentication.slice';
import { screenPopEventMiddleware } from './lib/ccf-screen-pop/screenPopEventMiddleware';
import { skillDetailsMiddleware } from './lib/ccf-skill-details/skillDetailsMiddleware';
import { commitmentReducer, CCF_COMMITMENT_FEATURE_KEY } from './lib/ccf-commitment/ccf-commitment.slice';
import { CcfContactEditorReducer, CONTACT_EDITOR_KEY } from './lib/ccf-editor/ccf-contact-editor.slice';
import { notificationsSettingsReducer, NOTIFICATION_SETTINGS_KEY } from './lib/ccf-settings/ccf-notification-settings.slice';
import { reportingReducer, CCF_REPORTING_FEATURE_KEY } from './lib/ccf-reporting/ccf-reporting.slice';
import { agentCopilotMiddleware } from './lib/ccf-agent-copilot/ccf-agent-copilot-middleware';
import { CCF_COPILOT_KEY, CcfCopilotReducer } from './lib/ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { agentAssistMiddleware } from './lib/ccf-agent-assist/features/agent-assist-middleware';
import { VOICE_TRANSCRIPTION_SLICE_KEY, CcfVoiceTranscriptionReducer } from './lib/slices/ccf-voice-transcription.slice';
import { AGENT_HIVE_FEATURE_KEY, agentHiveReducer } from './lib/ccf-agent-chat/ccf-agent-chat.slice';
const epicMiddleware = createEpicMiddleware({
    dependencies: {
        /**
         * Method to get store access dispatch in epics
         * ```
         * @example
         *
         * ```
         */ get store() {
            return store;
        },
    },
});
export const rootEpic = combineEpics(acdSessionEventMiddleware, agentActivityMiddleware, agentLegMiddleware, skillActivityMiddleware, screenPopEventMiddleware, skillDetailsMiddleware, agentCopilotMiddleware, agentAssistMiddleware);
const store = configureStore({
    reducer: {
        [VOICE_PREFERNCE_FEATURE_KEY]: voicePreferenceReducer,
        [CCF_DIRECTORY_FEATURE_KEY]: agentDirectoryReducer,
        [AGENT_STATE_KEY]: agentStateReducer,
        [AGENT_SETTINGS_KEY]: agentSettingsReducer,
        [AGENT_SKILL_DETAILS_KEY]: agentSkillDetailsReducer,
        [GLOBAL_APP_FEATURE_KEY]: globalReducer,
        [CCF_AUTHENTICATION_FEATURE_KEY]: CcfAuthenticationReducer,
        [CCF_SCREEN_POP_FEATURE_KEY]: CcfScreenPopReducer,
        [ASSIGNMENT_KEY]: CcfAssignmentReducer,
        [CCF_APP_SCHEDULER_KEY]: CcfAppScheduleReducer,
        [CCF_APP_SPACE_KEY]: appSpaceReducer,
        [AGENT_NOTIFICATION_KEY]: agentWemNotificationsReducer,
        [CCF_COMMITMENT_FEATURE_KEY]: commitmentReducer,
        [CONTACT_EDITOR_KEY]: CcfContactEditorReducer,
        [NOTIFICATION_SETTINGS_KEY]: notificationsSettingsReducer,
        [CCF_REPORTING_FEATURE_KEY]: reportingReducer,
        [CCF_COPILOT_KEY]: CcfCopilotReducer,
        [VOICE_TRANSCRIPTION_SLICE_KEY]: CcfVoiceTranscriptionReducer,
        [AGENT_HIVE_FEATURE_KEY]: agentHiveReducer,
    },
});
epicMiddleware.run(rootEpic);
export default store;
//# sourceMappingURL=storybook-store.js.map