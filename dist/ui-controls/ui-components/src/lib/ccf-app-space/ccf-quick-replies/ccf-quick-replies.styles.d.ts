import { Theme } from '@mui/material';
/**
 * Styling for ccf-app-space-quick-replies
 * @returns ccf-app-space-quick-replies CSS properties as a JSON object
 * @example ccfQuickRepliesStyles(theme)
*/
declare const ccfQuickRepliesStyles: (theme: Theme, _isOutBound: boolean | undefined) => {
    quickReplyContainer: {
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
            height: string;
            borderBottom: string;
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
        paginationWrapper: {
            display: string;
            alignItems: string;
            justifyContent: string;
            height: string;
            paddingRight: string;
        };
        prevNextButton: {
            background: string;
            boxShadow: string;
            border: string;
            display: string;
            alignItems: string;
            justifyContent: string;
            minWidth: string;
            width: string;
            height: string;
            padding: number;
        };
    };
    favListContainer: {
        height: string;
        background: string;
        overflowY: string;
    };
    searchContainer: {
        display: string;
        margin: string;
    };
    searchInput: {
        background: string;
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
            font: string;
            letterSpacing: string;
            color: string;
            opacity: number;
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
    loadMoreContainer: {
        display: string;
        marginLeft: string;
        marginBottom: string;
        marginTop: string;
        cursor: string;
    };
    loadMoreButton: {
        color: string | undefined;
        fontSize: string;
        fontWeight: number;
        textDecoration: string;
        cursor: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    searchInputField: {
        '&::placeholder': {
            color: string;
            opacity: number;
        };
    };
};
export default ccfQuickRepliesStyles;
