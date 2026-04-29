import { Theme } from '@mui/material';
/**
 * Styling for ccf-acd-session
 * @returns ccf-acd-session CSS properties as a JSON object
 * @example CcfAcdSessionStyles()
 */
declare const CcfAcdSessionStyles: (theme: Theme) => {
    voicePreferenceCard: {
        border: string;
        width: string;
        '& .MuiCardContent-root': {
            paddingBottom: string;
        };
        marginTop: string;
        marginBottom: string;
    };
    agentHeader: {
        display: string;
        height: string;
        padding: string;
    };
    voicePrefernceParent: {
        height: string;
        overflow: string;
        width: string;
    };
    loginContainer: {
        backgroundColor: string;
        height: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        flexDirection: string;
    };
    voicePrefCardWrapper: {
        padding: string;
    };
    buttonWrapper: {
        width: string;
        marginTop: string;
        padding: string;
        '& .MuiButton-root': {
            boxShadow: string;
            '&:hover': {
                backgroundColor: string;
                boxShadow: string;
            };
            '&:active': {
                backgroundColor: string;
                outline: string;
                outlineColor: string | undefined;
                outlineOffset: string;
                borderRadius: string;
            };
            '&.Mui-focusVisible, &:focus-visible': {
                outline: string;
                outlineColor: string | undefined;
                outlineOffset: string;
                borderRadius: string;
            };
        };
    };
    preferenceSelectorContainer: {
        '& .MuiFormControl-root, .MuiFormControl-root .MuiFormGroup-root': {
            display: string;
            justifyContent: string;
            width: string;
        };
        '& .MuiFormControl-root .MuiFormGroup-root .MuiFormControlLabel-root': {
            margin: string;
        };
        '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
            '-webkit-appearance': string;
            margin: string;
        };
        '& input[type="number"]': {
            '-moz-appearance': string;
        };
        '& .MuiFormGroup-root': {
            padding: string;
        };
    };
    errorFallback: {
        height: string;
        overflow: string;
        width: string;
    };
    errorFallbackBack: {
        display: string;
        justifyContent: string;
        alignItems: string;
        margin: string;
    };
    rememberWrapper: {
        width: string;
        textAlign: string;
        '[dir=\'rtl\'] &': {
            marginRight: string;
            textAlign: string;
        };
        '& .MuiTypography-body1': {
            fontSize: string;
            color: string;
        };
    };
    header: {
        color: string;
        textTransform: string;
        padding: string;
        '& .MuiTypography-root': {
            fontWeight: string;
            fontSize: string;
        };
    };
    agentHeaderText: {
        padding: string;
        fontWeight: string;
        fontSize: string;
        marginLeft: string;
    };
    rememberSetting: {
        color: string;
        padding: string;
        '& .MuiFormControlLabel-label': {
            fontSize: string;
        };
        '& .MuiSvgIcon-root': {
            width: string;
        };
        '& .MuiCheckbox-root': {
            padding: string;
            '&.Mui-focusVisible, &:focus-visible': {
                border: string;
                borderRadius: string;
                outline: string;
            };
            '&:active': {
                backgroundColor: string;
                border: string;
                borderRadius: string;
            };
            '&.Mui-checked': {
                backgroundColor: string;
                border: string;
                borderRadius: string;
            };
            '&.Mui-focusVisible.Mui-checked, &:focus-visible.Mui-checked': {
                backgroundColor: string;
                border: string;
                borderRadius: string;
            };
        };
    };
    locationHeader: {
        padding: string;
    };
    voicePreferenceDivider: {
        paddingTop: string;
        borderColor: string;
    };
    agentHeaderDivider: {
        paddingTop: string;
        borderColor: string;
    };
    cxoneLogo: {
        width: string;
        height: string;
    };
    voicePreferenceInputField: {
        border: string;
        padding: string;
        '& .MuiInputBase-input': {
            fontSize: string;
            color: string;
            '&::placeholder': {
                opacity: number;
            };
        };
        '&& .MuiOutlinedInput-root': {
            '&.Mui-error': {
                color: string;
            };
            '& .MuiOutlinedInput-notchedOutline': {
                border: string;
            };
            '&.Mui-focused': {
                outline: string;
                outlineColor: string | undefined;
                outlineOffset: string;
                borderRadius: string;
            };
            '&:active .MuiOutlinedInput-notchedOutline, &.Mui-active .MuiOutlinedInput-notchedOutline': {
                borderColor: string;
            };
        };
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: string | undefined;
        };
        '& .MuiOutlinedInput-root.Mui-error .MuiInputBase-input': {
            color: string | undefined;
        };
        '& .MuiOutlinedInput-root:hover': {
            backgroundColor: string;
        };
    };
    voicePreferenceRadioHighlight: {
        padding: string;
        '& .MuiFormGroup-root': {
            padding: string;
        };
    };
    disclaimerText: {
        color: string;
        fontSize: string;
        fontWeight: string;
        margin: string;
        textAlign: string;
    };
};
export default CcfAcdSessionStyles;
