export interface CcfDialerControlsProps {
    ansMachineOverride: boolean;
    ansMachineOverrideEndTime: string;
    contactID: string;
    isLinked: boolean;
    agentOverrideOptionAnsweringMachine: boolean;
    agentOverrideOptionBadNumber: boolean;
    agentOverrideOptionFax: boolean;
    status: string;
}
/**
 * Component to display dialer controls
 * @param props - None
 * ```
 * @example-
 * <CcfDialerControls />
 * ```
 */
export declare const CcfDialerControls: (props: CcfDialerControlsProps) => JSX.Element;
