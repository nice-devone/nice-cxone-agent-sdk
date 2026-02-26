/// <reference types="react" />
import { AgentContactHistory } from './ccf-agent-card-contact-history';
/**
 * Props interface for CcfAgentCardContactHistoryView component
 */
export interface CcfAgentCardContactHistoryViewProps {
    contactHistory: AgentContactHistory[];
    integratedView: boolean;
    hostConfig: {
        fontFamily: string;
    };
    selectedContactHistory: AgentContactHistory | null;
    DispositionModal: JSX.Element | null;
    onExecuteAction: (history: AgentContactHistory) => void;
}
/**
 * Component used to display agent contact history view
 * @param props - CcfAgentCardContactHistoryViewProps
 * @example
 * ```tsx
 * <CcfAgentCardContactHistoryView
 *   contactHistory={contactHistory}
 *   template={template}
 *   integratedView={integratedView}
 *   hostConfig={hostConfig}
 *   selectedContactHistory={selectedContactHistory}
 *   DispositionModal={DispositionModal}
 *   onExecuteAction={onExecuteAction}
 * />
 * ```
 * @returns
 */
export declare function CcfAgentCardContactHistoryView({ contactHistory, integratedView, hostConfig, selectedContactHistory, DispositionModal, onExecuteAction, }: CcfAgentCardContactHistoryViewProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfAgentCardContactHistoryView>;
export default _default;
