import { Theme } from '@mui/material';
/**
 * Create popover styles.
 * @example generateStyles();
 * @returns styles
 **/
declare const generateStyles: (theme: Theme, shouldOverflow: boolean, position: {
    top: number;
    left: number;
}) => string;
export default generateStyles;
