import { SxProps, Theme } from '@mui/material';
import { AlertProps } from '@mui/lab';
export interface CcfAlertProps extends AlertProps {
    autoHideDuration?: number;
    closeAlert(): void;
    sx?: SxProps<Theme>;
}
/**
 * Function is sed as wrapper for material UI alert component
 * @param param0 -CcfAlertProps
 * @returns material ui alert component
 * @example <CcfAlert/>
 */
export declare function CcfAlert({ closeAlert, children, severity, variant, autoHideDuration, sx, ...other }: CcfAlertProps): JSX.Element;
export default CcfAlert;
