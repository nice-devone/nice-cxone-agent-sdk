import { SxProps, Theme } from '@mui/material';
import React from 'react';
interface Option {
    value: string;
    label: string;
}
interface CcfToggleButtonGroupProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    toggleButtonStyle?: SxProps<Theme> | undefined;
}
/**
 * A single select group component using ToggleButtonGroup
 * @example -
 */
export declare const CcfToggleButtonGroup: React.FC<CcfToggleButtonGroupProps>;
export {};
