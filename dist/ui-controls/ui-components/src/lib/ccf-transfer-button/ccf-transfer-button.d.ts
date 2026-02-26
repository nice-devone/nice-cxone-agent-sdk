import { ToolTipPlacement } from '@nice-devone/ui-controls';
import { SxProps, Theme } from '@mui/material';
export interface CcfTransferButtonProps {
    sx?: SxProps<Theme>;
    toolTipPlacement?: ToolTipPlacement;
    disabled?: boolean;
}
/**
 * Component for transfer button
 * ```
 * @example-
 * <CcfTransferButton />
 * ```
 */
export declare const CcfTransferButton: ({ toolTipPlacement, disabled, sx }: CcfTransferButtonProps) => JSX.Element;
