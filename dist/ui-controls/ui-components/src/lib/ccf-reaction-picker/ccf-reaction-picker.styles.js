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
const reactionPickerStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        pickerPosition: {
            display: 'inline-block',
            margin: '0.1rem',
        },
        reactionBtn: {
            border: `1px solid ${(_a = theme.palette) === null || _a === void 0 ? void 0 : _a.border.main}`,
            boxShadow: `0px 2px 0px ${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.border.main}`,
            cursor: 'pointer',
            maxWidth: '5.17rem',
            height: '1.75rem',
            fontSize: '0.7rem',
            whiteSpace: 'nowrap',
            color: theme.palette.background.socialReaction,
            '&:hover': {
                border: `1px solid ${(_c = theme.palette) === null || _c === void 0 ? void 0 : _c.border.main}`,
            },
            [theme.breakpoints.down('md')]: {
                minWidth: '2.5rem',
            },
        },
        reactionBtnSelect: {
            background: `${theme.palette.background.socialReaction} 0% 0% no-repeat padding-box`,
            color: theme.palette.background.default,
            boxShadow: `0px 1px 0px ${(_d = theme.palette) === null || _d === void 0 ? void 0 : _d.border.main}`,
            '&:hover': {
                color: theme.palette.background.default,
                background: `${theme.palette.background.socialReaction} 0% 0% no-repeat padding-box`,
            },
        },
        reactionIconPosition: {
            margin: '0.3rem 0.4rem 0 0',
            [theme.breakpoints.down('md')]: {
                margin: '0.3rem 0 0 0',
            },
        },
    };
    return styles;
};
export default reactionPickerStyles;
//# sourceMappingURL=ccf-reaction-picker.styles.js.map