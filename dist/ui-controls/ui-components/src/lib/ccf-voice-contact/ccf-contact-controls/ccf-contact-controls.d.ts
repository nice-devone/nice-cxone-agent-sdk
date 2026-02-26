import { CallControlButton } from '@nice-devone/agent-sdk';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
export interface CcfContactControlsProps {
    type: string;
    voiceContact: CXoneVoiceContact;
    onlyShowHangup?: boolean;
    elevatedFrom?: string;
    showKeypad?: boolean;
}
/**
 * This method is to return the count of call controls buttons
 * @param voiceContact-CXoneVoiceContact
 * @example getCallControlCount
 */
export declare const getCallControlCount: (controls: CallControlButton) => number;
/**
 * Component to display contact control panel
 * @param props - CcfContactControlsProps
 * ```
 * @example-
 * <CcfContactControls />
 * ```
 */
export declare function CcfContactControls(props: CcfContactControlsProps): JSX.Element | null;
export default CcfContactControls;
