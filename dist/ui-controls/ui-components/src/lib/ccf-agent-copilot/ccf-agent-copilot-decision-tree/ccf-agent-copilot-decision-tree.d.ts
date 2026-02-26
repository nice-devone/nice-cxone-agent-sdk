import React from 'react';
import { DecisionTreeData } from '@nice-devone/common-sdk';
/**
 * Props for CcfAgentCopilotDecisionTree component.
 */
export interface CcfAgentCopilotDecisionTreeProps {
    /**
     * Decision tree data to be displayed.
     */
    decisionTreeData: DecisionTreeData | null;
}
/**
 * Component that renders the Copilot Decision Tree UI including:
 * - Responsive layout (switches to compact mode below 900px width via ResizeObserver)
 * - Header with dynamic icon and decision tree title
 * - Two logical panels: "Suggested Questions" and "Capture Details" (content to be injected in future iterations)
 * - Accessible close button for dismissing the decision tree panel
 *
 * @param decisionTreeData - Decision tree domain object containing title, icon and nested question structures
 * @returns React element wrapping decision tree header and placeholder sections
 * @example
 * ```tsx
 * import { CcfAgentCopilotDecisionTree } from '@nice-devone/ui-components';
 *
 * <CcfAgentCopilotDecisionTree
 *   decisionTreeData={myDecisionTreeData}
 *   onClose={() => setShowDecisionTree(false)}
 * />
 * ```
 */
export declare const CcfAgentCopilotDecisionTree: React.FC<CcfAgentCopilotDecisionTreeProps>;
export default CcfAgentCopilotDecisionTree;
