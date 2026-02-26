import { Theme } from '@mui/material';
/**
 * @example styles for pop over component
 */
declare const ccfPopOverStyles: (theme: Theme) => {
    popOverMain: {
        display: string;
        flexDirection: string;
        height: string;
        minWidth: string;
        justifyContent: string;
        alignContent: string;
        alignItems: string;
        background: string;
        boxShadow: string;
        borderRadius: string;
        opacity: string;
        padding: string;
    };
    popOverOptions: {
        width: string;
        padding: string;
        minHeight: string;
        cursor: string;
        color: string;
        '&:hover': {
            backgroundColor: string | undefined;
            fontWeight: string;
        };
    };
    popOverOverflow: {
        fill: string;
        cursor: string;
    };
    divider: {
        width: string;
        backgroundColor: string;
        margin: string;
    };
    ccfPopOver: {
        '& .flexDisplay': {
            display: string;
            alignItems: string;
        };
        '& .header': {
            justifyContent: string;
            fontSize: string;
            width: string;
            padding: string;
            fontWeight: number;
        };
        '& .popOverActionIconWrapper': {
            display: string;
            marginRight: string;
            minWidth: string;
        };
        '& .headerTitle': {
            marginTop: string;
        };
        '& .popOverActionLabelWrapper': {
            display: string;
            alignItems: string;
            justifyContent: string;
            '& span': {
                whiteSpace: string;
                textOverflow: string;
                overflow: string;
            };
        };
        '& .popOverActionLabelWrapper .popOverActionLabel': {
            fontSize: string;
        };
    };
};
export default ccfPopOverStyles;
