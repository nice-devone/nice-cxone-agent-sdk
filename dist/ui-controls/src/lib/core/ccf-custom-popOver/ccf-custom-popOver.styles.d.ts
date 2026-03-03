import { Theme } from '@mui/material';
/**
 * style object for CcfCustomPopOver control
 * @returns CcfCustomPopOverStyles styles object
 * ```
 * @example
 * <CcfCustomPopOverStyles/>
 * ```
 */
declare const CcfCustomPopOverStyles: (theme: Theme, isMobile?: boolean, popoverMaxWidth?: string | number) => {
    popOverStyles: {
        minWidth: string;
        transform: string;
        borderRadius: string;
        boxShadow: string;
        maxWidth: string | number | undefined;
    };
};
export default CcfCustomPopOverStyles;
