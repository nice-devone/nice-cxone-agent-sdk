import { Theme } from '@mui/material';
/**
 * Used to get the fileUplodItem styles object
 * @example -
 * ```
 * import fileUploadItemStyles from './ccf-fileuploaditem.styles';
 *
 * const theme = useTheme();
 * const styles = fileUploadItemStyles(theme);
 *
 * sx={styles.fileUploadItemContainer}
 * ```
 */
declare const fileUploadItemStyles: (theme: Theme) => {
    fileUploadItemContainer: {
        background: string;
        width: string;
        height: string;
        borderRadius: string;
        opacity: string;
        margin: string;
    };
    primaryText: {
        color: string;
        textAlign: string;
        letterSpacing: string;
        font: string;
        maxWidth: string;
    };
    primaryTextLight: {
        color: string;
    };
    primaryIconColor: {
        color: string;
    };
    secondaryIconColor: {
        color: string;
    };
    secondaryText: {
        color: string;
        textAlign: string;
        font: string;
        letterSpacing: string;
        maxWidth: string;
        margin: string;
    };
    closeIconContainer: {
        right: string;
    };
    closeIcon: {
        width: string;
        height: string;
        transform: string;
        opacity: string;
        cursor: string;
    };
    fileAvatarContainer: {
        minWidth: string;
    };
    fileAvatarIcon: {
        width: string;
        height: string;
        opacity: string;
    };
};
export default fileUploadItemStyles;
