/**
 * Component displays copilot task assistance.
 * @param contactId - contact Id.
 * @param width- width for style
 * @param popoverAnchor - The anchor element for the popover.
 * @param setPopoverAnchor - Function to set the popover anchor element.
 * @param handleClosePopover - Function to close the popover.
 * @example
 * ```
 * <CcfAgentCopilotTaskAssist
 *   contactId="1231"
 *   width={300}
 *   popoverAnchor={popoverAnchor}
 *   setPopoverAnchor={setPopoverAnchor}
 *   handleClosePopover={handleClosePopover}
 * ```
 */
export declare const CcfAgentCopilotTaskAssist: ({ contactId, width, popoverAnchor, setPopoverAnchor, handleClosePopover, }: {
    contactId: string;
    width: number;
    popoverAnchor: HTMLElement | null;
    setPopoverAnchor: (anchor: HTMLElement | null) => void;
    handleClosePopover: () => void;
}) => JSX.Element | null;
export default CcfAgentCopilotTaskAssist;
