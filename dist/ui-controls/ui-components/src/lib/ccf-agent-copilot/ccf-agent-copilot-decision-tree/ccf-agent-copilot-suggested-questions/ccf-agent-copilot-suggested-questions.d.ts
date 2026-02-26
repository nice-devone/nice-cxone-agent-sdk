import React from 'react';
import { DecisionTreeData } from '@nice-devone/common-sdk';
/**
 * Library component that displays Copilot Decision Tree suggested (FNOL) questions.
 * Optional (non-mandatory) questions render a skip button allowing the agent to dismiss them.
 *
 * Rendering rules:
 * - Emits empty state if no sections / questions.
 * - Required questions (`mandatory`) never show skip control.
 */
/**
 * Props for `CcfAgentCopilotSuggestedQuestions` component.
 */
export interface CcfAgentCopilotSuggestedQuestionsProps {
    /** Decision tree data containing suggested question sections. */
    decisionTree: DecisionTreeData;
}
/**
 * Component that renders suggested decision tree questions and allows skipping optional ones.
 * @param decisionTree - decision tree data structure containing suggested questions
 * @returns React element containing sections and questions list
 * @example
 * ```tsx
 * <CcfAgentCopilotSuggestedQuestions
 *   decisionTree={decisionTreeData}
 * />
 * ```
 */
export declare const CcfAgentCopilotSuggestedQuestions: React.FC<CcfAgentCopilotSuggestedQuestionsProps>;
export default CcfAgentCopilotSuggestedQuestions;
