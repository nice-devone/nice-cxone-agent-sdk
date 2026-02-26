import { Theme } from '@mui/material';
/**
 * Styling for Advance workflow execute editor custom search Screen Component
 * @returns CcfEnhancedPrimaryPhoneEmailSearchStyles CSS properties as a JSON object
 * @example CcfEnhancedPrimaryPhoneEmailSearchStyles
 */
declare const CcfEnhancedPrimaryPhoneEmailSearchStyles: (theme: Theme) => {
    mainContainer: {
        width: string;
        display: string;
        flexDirection: string;
        height: string;
        overflow: string;
    };
    phoneEmailInputContainer: {
        display: string;
        justifyContent: string;
        borderRadius: string;
        flexDirection: string;
        gap: string;
        maxWidth: string;
        '& input': {
            padding: string;
        };
    };
    infoContainer: {
        padding: string;
        marginBottom: string;
    };
    inputPlaceHolder: {
        height: string;
        '& .MuiOutlinedInput-root': {
            '& input::placeholder': {
                color: string;
                opacity: string;
                textOverflow: string;
                fontSize: string;
                fontStyle: string;
                fontWeight: number;
                lineHeight: string;
            };
        };
    };
    labelTypography: {
        textAlign: string;
        color: string;
        fontSize: string;
        lineHeight: string;
    };
};
export default CcfEnhancedPrimaryPhoneEmailSearchStyles;
