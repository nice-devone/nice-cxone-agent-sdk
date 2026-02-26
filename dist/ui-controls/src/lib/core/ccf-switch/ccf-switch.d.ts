import { SxProps, Theme } from '@mui/material';
import { ChangeEvent } from 'react';
interface CcfSwitchButtonProps {
    id: string;
    className?: string;
    ariaLabel: string;
    status: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    sx?: SxProps<Theme>;
}
/**
 * CcfSwitchButton used to display switch button with on and off state
 * @param param - CcfSwitch
 * @example <CcfSwitchButton />
 */
export declare function CcfSwitchButton({ sx, ...rest }: CcfSwitchButtonProps): JSX.Element;
export default CcfSwitchButtonProps;
