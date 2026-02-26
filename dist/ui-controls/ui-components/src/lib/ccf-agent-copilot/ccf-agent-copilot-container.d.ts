import { CopilotSummary } from '@nice-devone/common-sdk';
import { AllAdaptiveCardsData } from './ccf-agent-copilot-container.slice';
export interface ContactCopilotState {
    contactId: string;
    rtSummary: CopilotSummary;
    adaptiveCardData: AllAdaptiveCardsData[];
}
/**
 * Component displays copilot container with adaptive cards
 * @example <CcfAgentCopilotContainer/>
 */
export declare function CcfAgentCopilotContainer(): JSX.Element;
export default CcfAgentCopilotContainer;
