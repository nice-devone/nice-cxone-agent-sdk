import { AgentCopilotCardType } from '../../../enum/agent-copilot-card-type';
import { AgentCopilotContentType } from '../../../enum/agent-copilot-content-type';
import { OverallContactFeedbackData } from './copilot-feedback-data';
import { CopilotSummary, CopilotAdaptiveCard, CopilotNextBestResponse, CopilotRequestStatus, CopilotKbAnswerCardData, CopilotFilterCardData, CopilotInformationCardData, CopilotJourneySummaryCardData } from './index';
/**
 * model interface for copilot  element
 */
export interface CopilotElement {
    /**
     * content type of element
     */
    contentType: AgentCopilotContentType.RT_SUMMARY | AgentCopilotContentType.NEXT_BEST_RESPONSE | AgentCopilotContentType.NEXT_BEST_RESPONSE_LLM | AgentCopilotContentType.NEXT_BEST_RESPONSE_EXPERT | AgentCopilotContentType.SENTIMENT | AgentCopilotContentType.FINAL_SUMMARY_NOTES | AgentCopilotContentType.COPILOT_REQUEST_STATUS | AgentCopilotContentType.KB_COMBO | AgentCopilotContentType.TRANSFER_SUMMARY | AgentCopilotContentType.EMAIL_CREATION_CARD | AgentCopilotContentType.EMAIL_RESPONSE_CARD | AgentCopilotContentType.COMPREHENSIVE_FEEDBACK | AgentCopilotContentType.COPILOT_FILTER_CARD | AgentCopilotContentType.JOURNEY_SUMMARY | AgentCopilotContentType.DISCLOSURE;
    content?: CopilotSummary | CopilotAdaptiveCard | CopilotNextBestResponse | CopilotRequestStatus | CopilotKbAnswerCardData | OverallContactFeedbackData | CopilotFilterCardData | CopilotInformationCardData | CopilotJourneySummaryCardData;
    /**
     * card type of element
     */
    cardType: AgentCopilotCardType.ADAPTIVE_CARD | AgentCopilotCardType.TEXT;
    /**
     * object id of element
     */
    objectId: string;
}
