import React from 'react';
export interface CcfAgentStateProps {
    agentStateForEmbeededView?: boolean;
    activeState?: {
        color: string;
    };
}
/**
 * Component displays popup with all code for agent state
 * @param props -CcfAgentStateProps
 * @returns popup component with all code for agent state
 * @example <CcfAgentState/>
 */
export declare function CcfAgentState(props?: CcfAgentStateProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfAgentState>;
export default _default;
