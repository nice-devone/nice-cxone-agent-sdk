import { acdSessionEventMiddleware } from './ccf-acd-session/acdSessionEventMiddleware';
import { agentAssistMiddleware } from './ccf-agent-assist/features/agent-assist-middleware';
import { agentCopilotMiddleware } from './ccf-agent-copilot/ccf-agent-copilot-middleware';
import { skillDetailsMiddleware } from './ccf-skill-details/skillDetailsMiddleware';
import { externalDirectorySearchMiddleware } from './ccf-directory/+state/externalDirectorySearchMiddleware';
import { screenPopEventMiddleware } from './ccf-screen-pop/screenPopEventMiddleware';
import { dispositionMiddleware } from './ccf-disposition/dispositionMiddleware';
import { skillActivityMiddleware } from './ccf-directory/+state/skillActivityMiddleware';
import { agentActivityMiddleware } from './ccf-directory/+state/agentActivityMiddleware';
import { agentLegMiddleware } from './ccf-agent-leg/agentLegMiddleware';
import { combineEpics } from 'redux-observable';
export const rootEpic = combineEpics(acdSessionEventMiddleware, agentLegMiddleware, agentActivityMiddleware, skillActivityMiddleware, dispositionMiddleware, screenPopEventMiddleware, externalDirectorySearchMiddleware, skillDetailsMiddleware, agentCopilotMiddleware, agentAssistMiddleware);
//# sourceMappingURL=middleware.js.map