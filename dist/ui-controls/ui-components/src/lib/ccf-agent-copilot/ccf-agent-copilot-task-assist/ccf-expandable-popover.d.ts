import React from 'react';
interface ExpandablePopoverProps {
    width: number;
    height: number;
    tooltipTitle: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    closeIcon?: React.ReactNode;
}
/**
 * `ExpandablePopover` is a reusable React functional component that displays a trigger icon button.
 * When clicked, it shows a popover that can expand to a specified width and height and renders any children passed to it.
 *
 * The component supports customization options including tooltip title, icons for open/close
 *
 * @param props - Props to configure the ExpandablePopover.
 * @param width - The width of the popover.
 * @param height - The height of the popover.
 * @param tooltipTitle - Tooltip text to display on hover of the trigger icon.
 * @param children - React nodes to render inside the popover.
 * @param icon - Optional custom icon to display for expanding the popover.
 * @param closeIcon - Optional custom icon to display for collapsing the popover.
 *
 * @example
 * ```
 * <ExpandablePopover
 *   width={300}
 *   height={400}
 *   tooltipTitle="Show More"
 *   icon={<ExpandIcon />}
 *   closeIcon={<CollapseIcon />}
 * >
 *   <div>Popover Content Here</div>
 * </ExpandablePopover>
 * ```
 */
export declare const ExpandablePopover: React.FC<ExpandablePopoverProps>;
export default ExpandablePopover;
