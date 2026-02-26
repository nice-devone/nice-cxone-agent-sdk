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
        padding: string;
        '& .MuiInputBase-input': {
            fontSize: string;
            color: string;
            '&::placeholder': {
                opacity: number;
            };
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
