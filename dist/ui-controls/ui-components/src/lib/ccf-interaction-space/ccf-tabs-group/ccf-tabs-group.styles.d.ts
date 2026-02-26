import { Theme } from '@mui/material';
/**
 * @returns -
 * @example -
 */
export declare const tabGroupStyles: (theme: Theme, wrapperWidth: number, tabsLength: number) => {
    tabGroup: {
        width: string;
        height: string;
        boxShadow: string;
        border: string;
        borderRadius: string;
    };
    tabPanel: {
        height: string;
    };
    tabWrapper: {
        '& .MuiTabs-fixed': {
            '.MuiTabs-flexContainer': {
                maxWidth: number;
                overflow: string;
            };
            button: {
                [x: string]: string | {
                    minWidth: string;
                };
                position: string;
                minWidth: string;
            };
            'button:not(.Mui-selected):after': {
                position: string;
                content: string;
                backgroundColor: string;
                width: string;
                height: string;
                top: string;
                right: number;
            };
            'button:has(+ button.Mui-selected):after': {
                content: string;
            };
        };
        display: string;
        background: string | undefined;
        paddingTop: string;
        borderTopLeftRadius: string;
        borderTopRightRadius: string;
        '& button': {
            textTransform: string;
            minHeight: string;
            padding: string;
        };
        '& button.MuiTab-root': {
            width: string;
            padding: string;
        };
        '& button.Mui-selected': {
            color: string;
            position: string;
        };
        '& .MuiTabs-root': {
            minHeight: string;
        };
    };
    addButton: {
        background: string;
        padding: string;
        minWidth: string;
        color: string;
        maxHeight: string;
        fontSize: string;
        boxShadow: string;
        border: string;
        '&:hover': {
            background: string;
        };
        '&:disabled': {
            boxShadow: string;
        };
    };
};
