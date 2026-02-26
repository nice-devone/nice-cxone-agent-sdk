import React from 'react';
import { InteractionData } from '@nice-devone/common-sdk';
export interface CcfInteractionProps {
    interaction: InteractionData;
}
export declare type AnimationText = 'REJECT' | 'DISCONNECT' | '';
/**
 * CCF Interaction Component
 * @example - <CcfInteraction />
 */
export declare const CcfInteraction: React.MemoExoticComponent<React.ForwardRefExoticComponent<CcfInteractionProps & React.RefAttributes<unknown>>>;
export default CcfInteraction;
