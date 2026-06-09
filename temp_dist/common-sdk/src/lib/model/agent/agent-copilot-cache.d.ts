import { CopilotElement } from '../agent-copilot/copilot-interfaces';
/**
 * keys types of the copilot cache objects
 */
export declare type AgentCopilotCacheKey = 'sentimentAndReason' | 'rtSummary';
/**
 * The structure of one element object to store in cache
 */
export declare type AgentCopilotCacheElement = {
    [key in AgentCopilotCacheKey]?: CopilotElement;
};
