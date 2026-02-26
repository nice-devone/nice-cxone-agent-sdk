/// <reference types="react" />
export interface CcfReschedulePopoverProps {
    handlePopoverClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    snoozeButtonEnabled: boolean;
}
/**
 * @example <CcfReschedulePopover />
 * @returns Reschedule popover
 */
export declare function CcfReschedulePopover(props: CcfReschedulePopoverProps): JSX.Element;
export default CcfReschedulePopover;
