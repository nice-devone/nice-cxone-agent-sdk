/// <reference types="react" />
import { Navigation } from '../../enums/navigation-menus';
import { TooltipProps } from '@mui/material';
export interface NavigationItemLS {
    menuName: Navigation;
}
export interface NavigationItem {
    menuName: Navigation;
    icon?: React.ReactElement;
    tooltip: string;
    toolTipPlacement?: TooltipProps['placement'];
    className?: string;
    contactApp?: boolean;
    onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>, ...rest: any) => void;
    children?: React.ReactNode;
    /**
     * showBadge: if true, Badge Component will be shown beside the menuitem
     */
    showBadge?: boolean;
    /**
     * appSpaceComponent: React Component, to be shown in App Space
     */
    appSpaceComponent?: React.ReactElement | any;
    /**
     * workSpaceComponent: React Component, to be shown in workspace
     */
    workSpaceComponent?: React.ReactElement | any;
    /**
     * allowMessaging: communicates with external apps in iframe through postMessage if true
     */
    allowMessaging?: boolean;
    /**
     * externalUrl: Url to load in iframe for external apps
     */
    externalUrl?: string;
    /**
     * productId: show this item only when the product is enabled in TM product catalog (e.g. WEM)
     */
    productId?: string;
    isActive?: boolean;
    isHidden?: boolean;
    showAppSpace?: boolean;
    /**
     * helpUrl: Link to help document
     */
    helpUrl?: string;
}
/**
 * This component is used to fetch the list of available navigation items for AppSpace and Workspace
 * @example - NavigationItems()
 */
export declare function useNavigationItems(isAppSpace?: boolean, isBelowLg?: boolean, helpUrl?: string): NavigationItem[];
