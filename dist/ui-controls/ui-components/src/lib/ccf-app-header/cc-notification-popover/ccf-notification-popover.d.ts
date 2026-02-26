/// <reference types="react" />
export interface CcfNotificationPopoverProps {
    iconComponent: React.ReactNode;
    setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
    isConversationsStandAlone?: boolean;
}
export interface NotificationPopOverMenuItems {
    items: Array<NotificatonPopOverMenuItem>;
}
export interface NotificatonPopOverMenuItem {
    label?: React.ReactElement | string;
    type?: string;
}
export interface NotificationPopOverData {
    popOverHeader?: string;
    menuItems: Array<NotificationPopOverMenuItems>;
}
/**
 * Function is used to display notification popup component on bell icon
 * @param props -CcfNotificationPopover
 * @returns Popup component displaying agent notifications
 * ```
 * @example <CcfNotificationPopover iconComponent={<CcfHeaderBellIcon />} />
 * ```
 */
export declare function CcfNotificationPopover({ iconComponent, setShowTooltip, isConversationsStandAlone, }: CcfNotificationPopoverProps): JSX.Element;
export default CcfNotificationPopover;
