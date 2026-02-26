import { Theme } from '@mui/material';
/**
 * style object for ccf-voice-contact-info.tsx
 * @returns CcfVoiceContactInfoStyles styles object
 * ```
 * @example
 * <CcfVoiceContactInfoStyles />
 * ```
 */
declare const CcfVoiceContactInfoStyles: (theme: Theme) => {
    phoneNumber: {
        font: string;
        margin: string;
        padding: string;
        letterSpacing: string;
    };
    phoneNumberPC: {
        [x: string]: string | {
            margin: string;
            padding: string;
        };
        font: string;
        margin: string;
        padding: string;
        letterSpacing: string;
    };
    cardHeader: {
        display: string;
        flexDirection: string;
    };
};
export default CcfVoiceContactInfoStyles;
