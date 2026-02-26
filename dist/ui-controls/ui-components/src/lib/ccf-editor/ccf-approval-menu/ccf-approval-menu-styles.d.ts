import { Theme } from '@mui/material';
/**
 * style object for ccf-approval-menu
 * @returns CcfApprovalMenuStyles styles object
 * ```
 * @example
 * <CcfApprovalMenuStyles/>
 * ```
 */
declare const CcfApprovalMenuStyles: (theme: Theme, queue: string) => {
    approvalBtnGroup: {
        marginRight: string;
    };
    searchIcon: {
        paddingRight: number;
        marginRight: number;
    };
    sendMessageText: {
        paddingLeft: number;
    };
    queueDivider: {
        marginBottom: string;
    };
    noResultsMessage: {
        width: string;
        height: string;
    };
    sendRequestBtn: {
        borderRadius: string;
    };
    requestApprovalBtnContainer: {
        borderLeft: string;
    };
    requestApprovalBtn: {
        padding: string;
        borderRadius: string;
        height: string;
    };
    focusedElement: {
        border: string;
        '&:focus': {
            borderColor: string;
            borderRadius: string;
        };
    };
    menu: {
        '& .MuiMenu-paper': {
            width: string;
            maxHeight: string;
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
                background: string;
            };
        };
        '& .MuiMenuItem-root': {
            color: string;
        };
        '& .MuiListSubheader-root': {
            position: string;
            bottom: number;
            '& .Mui-selected': {
                background: string;
            };
        };
        '& .Mui-selected': {
            background: string;
        };
    };
    revampButtonGroup: {
        marginRight: string;
        height: string;
        minWidth: string;
    };
};
export default CcfApprovalMenuStyles;
