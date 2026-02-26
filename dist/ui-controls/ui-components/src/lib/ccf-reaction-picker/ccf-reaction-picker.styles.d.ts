import { Theme } from '@mui/material';
/**
 * Used to get the reactionPicker styles object
 * @example -
 * ```
 * import reactionPickerStyles from './ccf-reaction-picker.styles';
 *
 * const theme = useTheme();
 * const styles = reactionPickerStyles(theme);
 *
 * sx={styles.button}
 * ```
 */
declare const reactionPickerStyles: (theme: Theme) => {
    pickerPosition: {
        display: string;
        margin: string;
    };
    reactionBtn: {
        [x: string]: string | {
            border: string;
            minWidth?: undefined;
        } | {
            minWidth: string;
            border?: undefined;
        };
        border: string;
        boxShadow: string;
        cursor: string;
        maxWidth: string;
        height: string;
        fontSize: string;
        whiteSpace: string;
        color: string;
        '&:hover': {
            border: string;
        };
    };
    reactionBtnSelect: {
        background: string;
        color: string;
        boxShadow: string;
        '&:hover': {
            color: string;
            background: string;
        };
    };
    reactionIconPosition: {
        [x: string]: string | {
            margin: string;
        };
        margin: string;
    };
};
export default reactionPickerStyles;
