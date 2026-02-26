import { Theme } from '@mui/material';
/**
 * style object for ccf-digital-email-v2-reply-container component
 * @returns CcfDigitalEmailV2ReplyContainer styles object
 * ```
 * @example
 * <CcfDigitalEmailV2ReplyContainerStyles/>
 * ```
 */
declare const CcfDigitalEmailV2ReplyContainerStyles: (theme: Theme) => {
    boxContainer: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
    };
    popOverMenuItemStyles: {
        '& .popOverActionLabelWrapper .popOverActionLabel': {
            color: string;
            fontWeight: number;
        };
        '&:hover': {
            border: string;
            borderRadius: string;
        };
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    deleteContent: {
        color: string;
        marginBottom: string;
        marginTop: string;
    };
    deleteAuthorName: {
        color: string;
        marginTop: string;
        marginBottom: string;
    };
    iconButton: {
        paddingRight: number;
        marginTop: string;
    };
    iconButtonForward: {
        paddingRight: number;
        marginTop: string;
        left: string;
    };
    replyIcon: {
        color: string;
        marginTop: string;
        cursor: string;
    };
};
export default CcfDigitalEmailV2ReplyContainerStyles;
