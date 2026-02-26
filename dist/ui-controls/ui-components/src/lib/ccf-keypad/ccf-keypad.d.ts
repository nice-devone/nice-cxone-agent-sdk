import { ContactControlButtonProps } from '@nice-devone/agent-sdk';
import React from 'react';
/**
 * Interface for defining props of CcfKeyPad component
 */
export interface CcfKeyPadProps {
    callControlMuteButton?: ContactControlButtonProps;
    handleOnClick?: (e: React.MouseEvent) => void;
}
/**
 * Component displays Keypad
 * @returns component for dailpad
 * @example <CcfKeyPad/>
 */
export declare function CcfKeyPad(props: CcfKeyPadProps): JSX.Element;
export default CcfKeyPad;
