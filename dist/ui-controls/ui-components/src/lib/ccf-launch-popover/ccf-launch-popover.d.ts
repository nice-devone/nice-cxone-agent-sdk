/// <reference types="react" />
import { Theme, SvgIconProps, SxProps } from '@mui/material';
import { PopOverData, ToolTipPlacement } from '@nice-devone/ui-controls';
import { CXoneIndicator } from '@nice-devone/common-sdk';
interface LaunchPopoverProps extends SvgIconProps {
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    buttonSx?: SxProps<Theme>;
    disableTooltip?: boolean;
    isContact?: boolean;
    labelComponent?: React.ReactNode;
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    isDrawerOpen?: boolean;
    toggleDrawer?: (isDrawerOpen: boolean) => void;
    tooltipPlacement?: ToolTipPlacement;
    parentIndicators?: CXoneIndicator[];
    HamburgermenuLaunch?: boolean;
    isQuickAppLaunchMenu?: boolean;
    isRevampedIcon?: boolean;
    contactId?: string;
}
export declare const defaultPopOverState: PopOverData;
/**
 * Used for creating a PopOver Dialogue for Launch indicator on Navigation bar and in contact card
 * @example `<LaunchPopover />`
 * @example `<LaunchPopover htmlColor={htmlColor} isContact />`
 */
export declare const LaunchPopover: ({ anchorOrigin, buttonSx, disableTooltip, transformOrigin, htmlColor, isContact, labelComponent, isDrawerOpen, toggleDrawer, parentIndicators, HamburgermenuLaunch, isQuickAppLaunchMenu, isRevampedIcon, contactId, }: LaunchPopoverProps) => JSX.Element;
export {};
