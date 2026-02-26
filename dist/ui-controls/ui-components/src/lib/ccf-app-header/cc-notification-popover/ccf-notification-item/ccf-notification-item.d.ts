/// <reference types="react" />
import { AgentMessageNotification, WemNotificationDisplayData } from '@nice-devone/common-sdk';
interface CcfNotificationItemProps {
    item: WemNotificationDisplayData | AgentMessageNotification;
}
/**-
 * component for CcfNotificationItem
 * @returns component for rendering the Notification Item
 * @example <CcfNotificationItem />
 */
declare const CcfNotificationItem: import("react").ForwardRefExoticComponent<CcfNotificationItemProps & import("react").RefAttributes<unknown>>;
export default CcfNotificationItem;
