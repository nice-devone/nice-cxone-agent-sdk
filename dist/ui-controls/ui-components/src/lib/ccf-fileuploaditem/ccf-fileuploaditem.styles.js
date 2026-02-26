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
const fileUploadItemStyles = (theme) => {
    const styles = {
        fileUploadItemContainer: {
            background: `${theme.palette.background.default} 0% 0% no-repeat padding-box`,
            width: '100%',
            height: '27px',
            borderRadius: '4px',
            opacity: '1,',
            margin: '4px 0',
        },
        primaryText: {
            color: theme.palette.text.information,
            textAlign: 'left',
            letterSpacing: '0px',
            font: 'normal normal 600 10px/14px Open Sans',
            maxWidth: '60%',
        },
        primaryTextLight: {
            color: '#8e98a0',
        },
        primaryIconColor: {
            color: theme.palette.text.information,
        },
        secondaryIconColor: {
            color: '#8e98a0',
        },
        secondaryText: {
            color: '#8e98a0',
            textAlign: 'left',
            font: 'normal normal 600 10px/14px Open Sans',
            letterSpacing: '0px',
            maxWidth: '20%',
            margin: '0 4px',
        },
        closeIconContainer: {
            right: '-10px',
        },
        closeIcon: {
            width: '13px',
            height: '13px',
            transform: 'matrix(0.71, 0.71, -0.71, 0.71, 0, 0)',
            opacity: '1',
            cursor: 'hand',
        },
        fileAvatarContainer: {
            minWidth: '0px',
        },
        fileAvatarIcon: {
            width: '13px',
            height: '13px',
            opacity: '1',
        },
    };
    return styles;
};
export default fileUploadItemStyles;
//# sourceMappingURL=ccf-fileuploaditem.styles.js.map