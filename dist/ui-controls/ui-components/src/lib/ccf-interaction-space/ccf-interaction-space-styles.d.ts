import { Theme } from '@mui/material';
/**
 * style object for ccf-interaction-space-styles
 * @returns CcfInteractionSpaceStyles styles object
 * ```
 * @example
 * <CcfInteractionSpaceStyles/>
 * ```
 */
declare const CcfInteractionSpaceStyles: (theme: Theme, _dispositionHeaderShown: boolean) => {
    rightGridContainer: {
        [x: string]: string | {
            padding: string;
            height: string;
        };
        display: string;
        height: string;
        flex: string;
        overflowY: string;
    };
    heightFull: {
        [x: string]: string | {
            display: string;
        };
        height: string;
    };
};
export default CcfInteractionSpaceStyles;
