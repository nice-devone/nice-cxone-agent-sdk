import { Theme } from '@mui/material';
/**
 * style object for ccf-contact-content-header
 * @returns CcfDigitalEmailContactHeaderStyles styles object
 * ```
 * @example CcfDigitalEmailContactHeaderStyles(theme)
 * ```
 */
declare const CcfDigitalEmailContactHeaderStyles: (theme: Theme) => {
    doubleArrowIcon: {
        height: string;
        width: string;
    };
    upArrow: {
        transform: string;
    };
    dotBackground: {
        marginLeft: string;
        height: string;
        width: string;
        backgroundColor: string;
        borderRadius: string;
        display: string;
        marginRight: string;
    };
    dot: {
        height: string;
        width: string;
        backgroundColor: string;
        borderRadius: string;
        display: string;
        marginBottom: string;
        marginRight: string;
    };
    subjectLabel: {
        marginTop: string;
        fontSize: string;
        fontWeight: string;
        display: string;
    };
    bookmark: {
        width: string;
        background: string;
        borderBottom: string;
    };
    customFieldScroll: {
        overflowY: string;
        maxHeight: string;
    };
    bookmarkContent: {
        [x: string]: string | number | {
            fontSize: string;
            lineHeight: string;
            display: string;
            flexFlow: string;
            justifyContent: string;
            border?: undefined;
            alignItems?: undefined;
            '& > span:first-of-type'?: undefined;
            '& > button'?: undefined;
        } | {
            border: string;
            fontSize?: undefined;
            lineHeight?: undefined;
            display?: undefined;
            flexFlow?: undefined;
            justifyContent?: undefined;
            alignItems?: undefined;
            '& > span:first-of-type'?: undefined;
            '& > button'?: undefined;
        } | {
            [x: string]: string | {
                marginLeft: string;
                '& > p'?: undefined;
            } | {
                '& > p': {
                    lineHeight: number;
                    font: string;
                };
                marginLeft?: undefined;
            };
            display: string;
            alignItems: string;
            '& > span:first-of-type': {
                '& > p': {
                    lineHeight: number;
                    font: string;
                };
            };
            fontSize?: undefined;
            lineHeight?: undefined;
            flexFlow?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            '& > button'?: undefined;
        } | {
            '& > button': {
                padding: number;
            };
            fontSize?: undefined;
            lineHeight?: undefined;
            display?: undefined;
            flexFlow?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            alignItems?: undefined;
            '& > span:first-of-type'?: undefined;
        };
        display: string;
        justifyContent: string;
        font: string;
        flexWrap: string;
        letterSpacing: number;
        color: string;
        alignItems: string;
        padding: string;
        '&:hover, &:active, &:focus': {
            border: string;
        };
        '& > div': {
            [x: string]: string | {
                marginLeft: string;
                '& > p'?: undefined;
            } | {
                '& > p': {
                    lineHeight: number;
                    font: string;
                };
                marginLeft?: undefined;
            };
            display: string;
            alignItems: string;
            '& > span:first-of-type': {
                '& > p': {
                    lineHeight: number;
                    font: string;
                };
            };
        };
        '& > p': {
            '& > button': {
                padding: number;
            };
        };
    };
    sticky_bookmarkContent: {
        position: string;
        top: number;
        background: string;
        zIndex: number;
    };
    sticky_bookmarkContent_border: {
        borderBottom: string;
        '&:hover, &:focus, &:active': {
            borderBottom: string;
        };
    };
    bookmarkContentHeader: {
        [x: string]: string | {
            maxWidth: string;
        };
        maxWidth: string;
    };
    bookmarkContentSubHeader: {
        [x: string]: string | number | {
            overflow: string;
            marginRight: string;
            marginLeft: string;
        };
        fontWeight: number;
        marginBottom: string;
        color: string;
        whiteSpace: string;
        textOverflow: string;
        overflow: string;
        height: string;
        marginTop: string;
        marginLeft: string;
    };
    viewButtonContainer: {
        [x: string]: string | {
            marginRight: string;
            justifyContent: string;
            width: string;
        };
        display: string;
        alignItems: string;
        maxHeight: string;
        marginRight: string;
        marginLeft: string;
    };
    viewButton: {
        border: string;
        background: string;
        font: string;
        color: string;
        padding: number;
        display: string;
        alignItems: string;
        cursor: string;
        marginLeft: string;
        '&>p': {
            [x: string]: string | number | {
                fontSize: string;
            };
            font: string;
            lineHeight: number;
        };
    };
    minimizePanelIcon: {
        width: string;
        height: string;
        color: string;
        opacity: number;
    };
    viewDetailsContent: {
        textAlign: string;
        font: string;
        letterSpacing: number;
        color: string;
        opacity: number;
        marginTop: string;
    };
    formatViewDetails: {
        paddingLeft: string;
        textAlign: string;
        font: string;
        letterSpacing: number;
        color: string;
        opacity: number;
    };
    showStatusLg: {
        [x: string]: {
            display: string;
        };
    };
    caseDetailWrapper: {
        [x: string]: string | number | {
            maxWidth: string;
            flexWrap?: undefined;
        } | {
            flexWrap: string;
            maxWidth?: undefined;
        };
        display: string;
        gap: string;
        alignItems: string;
        color: string;
        fontWeight: number;
    };
    channelTypeSubheader: {
        display: string;
    };
};
export default CcfDigitalEmailContactHeaderStyles;
