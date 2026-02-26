import { CXoneVoiceMailContact } from '@nice-devone/acd-sdk';
interface CcfVoiceMailControlsProps {
    /**
     * @remarks - voiceMailContact - the CXoneVoiceMailContact that holds information on the
     *  associated voicemail for these controls
     */
    voiceMailContact: CXoneVoiceMailContact;
}
/**
 * Component to display contact control panel
 * @param props - CcfVoiceMailControlsProps
 * ```
 * @example-
 * <CcfVoiceMailControls />
 * ```
 */
export declare const CcfVoiceMailControls: ({ voiceMailContact }: CcfVoiceMailControlsProps) => JSX.Element;
export {};
