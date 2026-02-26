import { ToolTipPlacement } from '@nice-devone/ui-controls';
import { SxProps, Theme } from '@mui/material';
export interface CcfLaunchButtonProps {
    contactId: string;
    isSmall?: boolean;
    htmlColor?: string;
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    sx?: SxProps<Theme>;
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'center' | 'left' | 'right';
    };
    tooltipPlacement?: ToolTipPlacement;
    isRevampedIcon?: boolean;
}
/**
 * Component for launch button
 * ```
 * @example-
 * <CcfLaunchButton />
 * ```
 */
export declare const CcfLaunchButton: (props: CcfLaunchButtonProps) => JSX.Element | null;
