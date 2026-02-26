import React from 'react';
import * as AdaptiveCards from 'adaptivecards';
import { ActionMetaData } from '../ccf-agent-copilot-helper';
interface AdaptiveCardPayload {
    type: string;
    version: string;
    body?: unknown[];
    actions?: unknown[];
    [key: string]: unknown;
}
interface CcfInteractiveAdaptiveCardProps {
    payload: AdaptiveCardPayload;
    hostConfig?: AdaptiveCards.HostConfig | Record<string, unknown>;
    onInputChange?: (values: Record<string, string>) => void;
    onExecuteAction: (action: ActionMetaData) => Promise<void>;
    style?: React.CSSProperties;
}
/**
 * Component to render an Adaptive Card in real-time with input change handling
 * @example <CcfInteractiveAdaptiveCard/>
 */
declare const CcfInteractiveAdaptiveCard: React.FC<CcfInteractiveAdaptiveCardProps>;
export default CcfInteractiveAdaptiveCard;
