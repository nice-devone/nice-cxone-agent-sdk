/// <reference types="react" />
import { SvgIconProps } from '@mui/material';
import { PopOverData } from '@nice-devone/ui-controls';
/**
 * Used for SvgIcon styling and along with popover style handling
 * We will need this for upcoming funtionality development
 **/
export interface CustomPopoverProps extends SvgIconProps {
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    iconWidth?: string;
    isContact?: boolean;
    labelComponent?: React.ReactNode;
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
}
export declare const defaultPopOverState: PopOverData;
/**
 * Used for creating a PopOver Dialogue for Launch indicator on Navigation bar and in contact card
 * @example `<CustomWorkspacePopover />`
 * @example `<CustomWorkspacePopover htmlColor={htmlColor} viewBox={viewBox} isContact />`
 */
export declare const CustomWorkspacePopover: ({ anchorOrigin, transformOrigin, htmlColor, viewBox, labelComponent, }: CustomPopoverProps) => JSX.Element;
