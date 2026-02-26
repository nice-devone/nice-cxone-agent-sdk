import { Theme } from '@mui/material';
/**
 * style object for ccf-search-interactions
 * @returns CcfSearchInteractionStyles object
 * @example CcfSearchInteractionStyles()
 */
declare const CcfSearchInteractionStyles: (theme: Theme) => {
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
export default CcfSearchInteractionStyles;
