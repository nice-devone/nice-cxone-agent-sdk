import { Theme } from '@mui/material';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardSearchStyles
 * @example <customerCardSearchStyles />
 */
declare const customerCardSearchStyles: (theme: Theme) => {
    textField: {
        padding: string;
    };
    searchHeader: {
        display: string;
        backgroundColor: string | undefined;
        padding: string;
        color: string;
        boxShadow: string;
    };
    searchHeaderTypography: {
        fontWeight: number;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        lineHeight: string;
    };
    accordionIcon: {
        fontSize: string;
        transform: string;
    };
    backIconButton: {
        height: string;
        alignSelf: string;
    };
    backIcon: {
        fontSize: string;
        transform: string;
    };
    customerNameTitle: {
        fontWeight: number;
        lineHeight: string;
        textTransform: string;
    };
    customerCardWrapper: {
        display: string;
        flexDirection: string;
        height: string;
        overflowY: string;
    };
    customerCardContainer: {
        height: string;
        overflowY: string;
        position: string;
    };
    loaderContainer: {
        opacity: string;
    };
    customDetailField: {
        fontSize: string;
        wordBreak: string;
        display: string;
        alignItems: string;
        svg: {
            fontSize: string;
        };
    };
    leftPad10: {
        paddingLeft: string;
    };
    customerDetailAccordion: {
        boxShadow: string;
        margin: string;
        '.Mui-expanded': {
            margin: string;
        };
    };
};
export default customerCardSearchStyles;
