import { Theme } from '@mui/material';
/**
 * style object for ccf-contact-content-header
 * @returns CcfContactContentHeaderStyles styles object
 * ```
 * @example
 * <CcfContactContentHeaderStyles/>
 * ```
 */
declare const CcfContactContentHeaderStyles: (theme: Theme) => {
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
            border?: undefined;
            display?: undefined;
            marginLeft?: undefined;
            '& > span:first-of-type'?: undefined;
            '& > button'?: undefined;
        } | {
            border: string;
            fontSize?: undefined;
            lineHeight?: undefined;
            display?: undefined;
            marginLeft?: undefined;
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
            marginLeft: string;
            '& > span:first-of-type': {
                '& > p': {
                    lineHeight: number;
                    font: string;
                };
            };
            fontSize?: undefined;
            lineHeight?: undefined;
            border?: undefined;
            '& > button'?: undefined;
        } | {
            '& > button': {
                padding: number;
            };
            fontSize?: undefined;
            lineHeight?: undefined;
            border?: undefined;
            display?: undefined;
            marginLeft?: undefined;
            '& > span:first-of-type'?: undefined;
        };
        display: string;
        justifyContent: string;
        font: string;
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
            marginLeft: string;
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
            width: string;
        };
        maxWidth: string;
    };
    bookmarkContentSubHeader: {
        fontWeight: number;
        maxWidth: string;
        marginBottom: string;
    };
    viewButtonContainer: {
        [x: string]: string | {
            marginRight: string;
        };
        marginLeft: string;
        maxHeight: string;
        marginRight: string;
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
        [x: string]: string | {
            maxWidth: string;
            flexWrap?: undefined;
        } | {
            flexWrap: string;
            maxWidth?: undefined;
        };
        display: string;
        gap: string;
        alignItems: string;
    };
    channelTypeSubheader: {
        display: string;
    };
};
export default CcfContactContentHeaderStyles;
