import { OverallContactFeedbackData } from '@nice-devone/common-sdk';
export declare type CcfAgentCopilotComprehensiveCardProps = {
    comprehensiveCardData: OverallContactFeedbackData;
    contactId: string;
    interactionStatus: boolean;
};
/**
 * Component to display copilot comprehensive card
 * @returns
 * @example
 */
declare const CcfAgentCopilotComprehensiveCard: ({ comprehensiveCardData, contactId, interactionStatus }: CcfAgentCopilotComprehensiveCardProps) => JSX.Element;
export default CcfAgentCopilotComprehensiveCard;
