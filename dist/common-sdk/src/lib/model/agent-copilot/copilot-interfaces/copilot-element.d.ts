import { AgentCopilotCardType } from '../../../enum/agent-copilot-card-type';
import { AgentCopilotContentType } from '../../../enum/agent-copilot-content-type';
import { CopilotSummary, CopilotAdaptiveCard, CopilotNextBestResponse, CopilotSentimentCardData, CopilotRequestStatus, CopilotEmailCardData } from './index';
/**
 * model interface for copilot  element
 */
export interface CopilotElement {
    /**
     * content type of element
     */
    contentType: AgentCopilotContentType.RT_SUMMARY | AgentCopilotContentType.NEXT_BEST_RESPONSE | AgentCopilotContentType.NEXT_BEST_RESPONSE_LLM | AgentCopilotContentType.NEXT_BEST_RESPONSE_EXPERT | AgentCopilotContentType.SENTIMENT | AgentCopilotContentType.FINAL_SUMMARY_NOTES | AgentCopilotContentType.COPILOT_REQUEST_STATUS | AgentCopilotContentType.KB_COMBO | AgentCopilotContentType.KB_COMBO_VOICE | AgentCopilotContentType.TRANSFER_SUMMARY | AgentCopilotContentType.EMAIL_CREATION_CARD | AgentCopilotContentType.EMAIL_RESPONSE_CARD;
    /**
     * content of element
     */
    content?: CopilotSummary | CopilotAdaptiveCard | CopilotNextBestResponse | CopilotSentimentCardData | CopilotRequestStatus | CopilotEmailCardData;
    /**
     * card type of element
     */
    cardType: AgentCopilotCardType.ADAPTIVE_CARD | AgentCopilotCardType.TEXT;
    /**
     * object id of element
     */
    objectId: string;
}
