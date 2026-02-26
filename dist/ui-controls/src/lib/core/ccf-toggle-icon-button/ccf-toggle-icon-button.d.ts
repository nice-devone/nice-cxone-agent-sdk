import { IconButtonProps } from '@mui/material';
import React from 'react';
export interface CCfToggleIconButtonProps extends IconButtonProps {
    icon: React.ReactNode;
    toggleIcon: React.ReactNode;
    onClick?: () => void;
    isToggled?: boolean;
}
/**
 * Display toggle icon buttons
 * @param props - CCfToggleIconButtonProps
 * @example <CCfToggleIconButton />
 * @returns
 */
export declare function CCfToggleIconButton(props: CCfToggleIconButtonProps): JSX.Element;
export default CCfToggleIconButton;
