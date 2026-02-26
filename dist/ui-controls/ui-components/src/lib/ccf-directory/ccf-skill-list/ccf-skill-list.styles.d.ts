import { Theme } from '@mui/material';
/**
 * return styles used for the component
 * @example <ccfSkillListStyles />
 * @returns styles
 */
declare const ccfSkillListStyles: (theme: Theme) => {
    headerText: {
        marginLeft: string;
        color: string;
        height: string;
        fontWeight: string;
        fontSize: string;
        marginTop: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        width: string;
        display: string;
    };
    phoneIconBox: {
        backgroundColor: string;
        color: string;
        width: string;
        borderRadius: string;
        '&:hover': {
            backgroundColor: string;
            color: string;
        };
    };
};
export default ccfSkillListStyles;
