import { Theme } from '@mui/material';
/**
 * style object for ccf-digital-search
 * @returns CcfDigitalSearchStyle object
 * @example CcfDigitalSearchStyle()
 */
declare const CcfDigitalSearchStyle: (theme: Theme) => {
    gridItemInContainer: {
        height: string;
        '& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted):hover .MuiDataGrid-sortIcon': {
            opacity: string;
        };
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            '.MuiIconButton-root:not(.Mui-disabled)': {
                color: string;
                '.MuiTouchRipple-root': {
                    display: string;
                };
                '&:hover': {
                    backgroundColor: string;
                };
                '&:focus': {
                    backgroundColor: string;
                };
                '&:focus-visible': {
                    backgroundColor: string;
                    outline: string;
                };
            };
            '.MuiTouchRipple-root': {
                display: string;
            };
        };
    };
    interactionSearchTitle: {
        color: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    searchInput: {
        input: {
            padding: string;
        };
        button: {
            padding: string;
            margin: string;
        };
        width: string;
        '& .MuiInputBase-adornedStart': {
            paddingLeft: string;
        };
        '& .MuiInputBase-adornedEnd': {
            paddingRight: string;
        };
        '& .MuiOutlinedInput-input': {
            padding: string;
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            '&::placeholder': {
                color: string;
                opacity: number;
            };
        };
        '& .MuiOutlinedInput-notchedOutline': {
            paddingRight: number;
        };
        '& svg': {
            right: string;
        };
    };
    menuOptions: {
        fontSize: string;
        fontWeight: number;
    };
    listSubheader: {
        display: string;
        justifyContent: string;
        marginTop: string;
        paddingRight: string;
        alignItems: string;
    };
    customizeText: {
        fontWeight: number;
        color: string;
        fontSize: string;
    };
    closeIcon: {
        cursor: string;
        color: string;
        padding: number;
        margin: number;
        border: string;
        boxShadow: string;
        minWidth: string;
        '&:focus,&:hover,&:focus-visible': {
            border: string;
            boxShadow: string;
        };
        '& svg': {
            fontSize: string;
            fontWeight: string;
            width: string;
        };
    };
    menuItem: {
        cursor: string;
        padding: string;
    };
    divider: {
        borderColor: string;
    };
    menu: {
        '& .MuiMenu-paper': {
            border: string;
            '&::-webkit-scrollbar': {
                width: string;
            };
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: string;
                borderRadius: string;
            };
            '&::-webkit-scrollbar-track': {
                backgroundColor: string;
            };
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: string;
            };
            '& .MuiMenu-list': {
                paddingTop: number;
                paddingBottom: number;
            };
        };
    };
    contactInfo: {
        [x: string]: string | number | {
            width: string;
        };
        zIndex: number;
        position: string;
        bottom: number;
        right: number;
        border: string;
        margin: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        backgroundColor: string;
    };
    searchBox: {
        display: string;
        width: string;
        color: string;
        background: string;
    };
    searchOption: {
        height: string;
        lineHeight: string;
        fontSize: string;
        color: string;
    };
    searchOptionControl: {
        width: string;
    };
    searchOptionList: {
        fontSize: string;
    };
    searchCloseIcon: {
        color: string;
    };
    smKebabMenu: {
        display: string;
        justifyContent: string;
        '& label': {
            color: string;
        };
        '& svg': {
            marginLeft: string;
        };
    };
    kebabMenuBtnWrapper: {
        display: string;
        gap: number;
    };
    kebabMenuBtn: {
        width: string;
        height: string;
        padding: string;
        color: string;
        borderColor: string;
        alignContent: string;
        fontSize: string;
        fontWeight: number;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        background: string;
    };
    filterIcon: {
        width: string;
        color: string;
    };
    columnIcon: {
        display: string;
        marginRight: string;
    };
    customerBox: {
        display: string;
        flexDirection: string;
        alignItems: string;
    };
    customerIcon: {
        height: string;
        width: string;
        borderRadius: string;
        marginRight: string;
    };
    parentContainer: {
        display: string;
        justifyContent: string;
        margin: string;
    };
    gridBackground: {
        backgroundColor: string;
    };
    buttonsAndSearchBox: {
        display: string;
        gap: number;
    };
    showMessage: {
        display: string;
        justifyCcontent: string;
        alignItems: string;
        openArrow: {
            fontSize: string;
        };
    };
    textWithEllipsis: {
        width: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    tags: {
        padding: string;
    };
    showCursor: {
        cursor: string;
    };
    listBox: {
        '& .MuiPaper-root': {
            border: string;
            '&::-webkit-scrollbar': {
                width: string;
            };
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: string;
                borderRadius: string;
            };
            '&::-webkit-scrollbar-track': {
                backgroundColor: string;
            };
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: string;
            };
        };
    };
    filterCustomizeButton: {
        float: string;
        flexDirection: string;
        gap: string;
        paddingRight: string;
    };
    loadMoreButton: {
        color: string | undefined;
        fontSize: string;
        fontWeight: number;
        textDecoration: string;
        cursor: string;
    };
    dropdownOptionsCount: {
        color: string;
        fontSize: string;
        fontWeight: number;
        marginLeft: string;
        lineHeight: string;
        padding: string;
    };
};
export default CcfDigitalSearchStyle;
