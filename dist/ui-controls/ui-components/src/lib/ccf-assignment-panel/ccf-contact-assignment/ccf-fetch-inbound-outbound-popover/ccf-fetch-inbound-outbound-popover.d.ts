/// <reference types="react" />
export interface CcfFetchInboundOutboundPopoverProps {
    initiateOutbound(): void;
    fetchInteraction(): void;
    iconComponent: React.ReactNode;
    userHaveObChannel: boolean;
}
/**
 * Function is used to display popup component on assignemnt section
 * @param props -CcfFetchInboundOutboundPopoverProps
 * @returns Popup component displaying fetching interaction and initiate outbound options
 * ```
 * @example <CcfFetchInboundOutboundPopover iconComponent={<CcfNewInteractionIcon />} initiateOutbound={outboundCallInitiate} fetchInteraction={fetchInteraction}/>
 * ```
 */
export declare function CcfFetchInboundOutboundPopover(props: CcfFetchInboundOutboundPopoverProps): JSX.Element;
export default CcfFetchInboundOutboundPopover;
