import { Theme } from '@mui/material';
/**
 * Styling for ccfMessageTemplatesStyles
 * @returns ccfMessageTemplatesStyles CSS properties as a JSON object
 * @example ccfMessageTemplatesStyles(theme)
*/
declare const ccfMessageTemplatesStyles: (theme: Theme) => {
    messageTemplatesContainer: {
        boxSizing: string;
        height: string;
        '>div:first-child': {
            height: string;
        };
        div: {
            boxSizing: string;
        };
        listContainer: {
            height: string;
        };
        cardsContainer: {
            /**
             * Card container height is adjusted by minus size of search box and tab header which is total of 78 pixels
             */
            height: string;
            overflowY: string;
        };
        listSection: {
            paddingTop: string;
            borderRadius: string;
            height: string;
            boxShadow: string;
        };
        previewSection: {
            borderRadius: number;
            height: string;
            boxShadow: string;
        };
        loader: {
            display: string;
            justifyContent: string;
            paddingTop: string;
        };
    };
    searchContainer: {
        display: string;
        margin: string;
    };
    searchInput: {
        background: string;
        opacity: number;
        height: string;
        '>div': {
            paddingLeft: string;
        };
        input: {
            padding: string;
        };
    };
    tabsContainer: {
        height: string;
        minHeight: string;
        margin: string;
        '& .MuiTab-root': {
            minWidth: string;
            maxWidth: string;
            margin: string;
            height: string;
            minHeight: string;
            padding: string;
            fontSize: string;
            letterSpacing: string;
            color: string;
        };
        '& .Mui-selected': {
            background: string;
            borderRadius: string;
            fontWeight: string;
        };
    };
    noMatchFound: {
        color: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        paddingTop: string;
    };
    noResultFoundIcon: {
        width: string;
        height: string;
    };
    replyCard: {
        background: string;
        boxShadow: string;
        padding: string;
        borderRadius: string;
        margin: string;
        cursor: string;
        '*': {
            wordBreak: string;
        };
        '&:hover': {
            background: string;
        };
    };
    category: {
        background: string;
        boxShadow: string;
        padding: string;
        fontSize: string;
        fontWeight: string;
        letterSpacing: string;
        borderRadius: string;
        cursor: string;
        '*': {
            wordBreak: string;
        };
    };
    nonFavReply: {
        color: string;
    };
    quickReplyHeader: {
        padding: string;
        maxHeight: string;
        marginBottom: string;
        '& .MuiCardHeader-title': {
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            fontWeight: number;
            letterSpacing: number;
            color: string;
            opacity: number;
        };
    };
    replyContent: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        letterSpacing: string;
        color: string;
    };
};
export default ccfMessageTemplatesStyles;
