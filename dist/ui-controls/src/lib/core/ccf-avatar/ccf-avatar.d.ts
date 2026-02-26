import { SxProps, Theme } from '@mui/material';
export interface CcfAvatarProps {
    width?: number;
    height?: number;
    fontSize?: number | string;
    color?: string;
    bgcolor?: string;
    border?: boolean;
    borderColor?: string;
    alt?: string;
    variant?: 'circular' | 'rounded' | 'square';
    children?: string;
    className?: string;
    sx?: SxProps<Theme>;
}
/**
 * Function is set as wrapper for material UI Avatar component
 * @param param0 - CcfAvatarProps
 * @returns material ui Avatar component
 * @example <CcfAvatar />
 */
export declare const CcfAvatar: ({ sx, ...props }: CcfAvatarProps) => JSX.Element;
