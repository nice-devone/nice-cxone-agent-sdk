import { Theme } from '@mui/material';
/**
 * Styling for CcfVoiceRecorder
 * @param theme - MUI theme object
 * @returns CcfVoiceRecorder CSS properties as a JSON object
 * @example CcfVoiceRecorderStyles(theme)
*/
declare const VoiceRecorderStyles: (theme: Theme) => {
    button: {
        color: string;
        minWidth: string;
        border: string;
        '&:hover': {
            backgroundColor: string;
        };
        '&:focus': {
            borderColor: string | undefined;
        };
        padding: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
};
export default VoiceRecorderStyles;
