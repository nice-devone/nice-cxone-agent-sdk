import { CXoneVoiceMailContact } from '@nice-devone/acd-sdk';
interface CcfVoiceMailContactPanelProps {
    voiceMailContact: CXoneVoiceMailContact;
}
/**
 *
 * @param props - CcfVoiceMailContactPanelProps
 * @returns - Voicemail contact panel with controls
 * @example - <CcfVoiceMailContactPanel />
 */
export declare const CcfVoiceMailContactPanel: ({ voiceMailContact }: CcfVoiceMailContactPanelProps) => JSX.Element;
export {};
