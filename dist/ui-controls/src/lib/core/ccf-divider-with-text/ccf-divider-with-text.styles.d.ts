import { Theme } from '@mui/material';
/**
 * @example styles for CcfDividerWithText component
 */
declare const CcfDividerWithTextStyle: (theme: Theme) => {
    root: {
        marginTop: number;
        fontSize: import("csstype").Property.FontSize<string | number>;
        color: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        textAlign: string;
        '& > hr': {
            minWidth: string;
            flex: number;
        };
        '& > span': {
            maxWidth: string;
            marginInline: number;
        };
    };
};
export default CcfDividerWithTextStyle;
