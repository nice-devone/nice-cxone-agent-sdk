/// <reference types="react" />
import { ContactData } from '@nice-devone/common-sdk';
export interface CcfPcDialerControlsProps {
    contact: ContactData;
    handleCallPlaced: (e: React.SyntheticEvent) => void;
    handlePcCallEnd: (e: React.SyntheticEvent) => void;
}
/**
 * CcfPcDialerControls - returns PC dialer controls
 * @param props -?-CcfPcDialerControlsProps
 * @example <CcfPcDialerControls />
 */
export declare const CcfPcDialerControls: (props: CcfPcDialerControlsProps) => JSX.Element;
export default CcfPcDialerControls;
