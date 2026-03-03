import { Theme } from '@mui/material';
import { CcfAvatarProps } from './ccf-avatar';
/**
 * @example styles for avatar component
 */
declare const ccfAvatarStyle: (theme: Theme, props: CcfAvatarProps) => {
    root: {
        width: number | undefined;
        height: number | undefined;
        fontSize: string | number | undefined;
        color: string;
        backgroundcolor: string;
        border: string;
        alt: string | undefined;
        variant: "square" | "circular" | "rounded" | undefined;
        children: string | undefined;
    };
};
export default ccfAvatarStyle;
