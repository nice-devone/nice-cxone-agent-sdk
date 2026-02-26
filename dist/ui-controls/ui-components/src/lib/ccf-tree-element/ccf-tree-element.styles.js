/**
 * Used to get the treeElement styles object
 * @example -
 * ```
 * import treeElementStyles from './ccf-tree-element.styles';
 *
 * const theme = useTheme();
 * const styles = treeElementStyles(theme);
 *
 * sx={styles.button}
 * ```
 */
const treeElementStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        treeContainer: {
            width: '12.2rem',
            overflowX: 'hidden',
            maxHeight: '12rem',
            flexGrow: 1,
            maxWidth: 200,
            fontSize: '12px',
            color: theme.palette.text.secondary,
            '& .MuiTreeItem-content .MuiTreeItem-label': {
                fontSize: '12px',
            },
            '& .MuiTreeItem-groupTransition': {
                padding: 0,
            },
            '& .Mui-expanded .Mui-selected': {
                '&:hover': {
                    backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.hover,
                },
            },
            '& .parentNode > .Mui-expanded': {
                backgroundColor: '#E3E4E5',
                color: theme.palette.text.secondary,
                borderTop: '1px solid #ADADAD',
                borderBottom: '1px solid #ADADAD',
                borderRadius: 0,
            },
            '& .lastExpanded > .Mui-expanded': {
                backgroundColor: '#007AB8',
                color: '#fff',
                borderRadius: 0,
            },
            '& .leafNode > .Mui-selected': {
                backgroundColor: '#E9EDFF',
                color: theme.palette.text.secondary,
            },
        },
        dropdownIcon: {
            height: '21px',
            padding: 0,
            color: theme.palette.text.secondary,
        },
        backIcon: {
            width: '10px',
            height: '8px',
            color: theme.palette.text.secondary,
            padding: '2px',
            transform: 'scale(0.7)',
        },
        backButton: {
            display: 'flex',
            fontSize: '12px',
            padding: '10px 12px',
        },
        clearField: {
            fontSize: '10px',
            padding: '0',
            minWidth: '10px',
        },
        inputFields: {
            height: '22px',
            fontSize: '12px',
            color: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.header,
            flex: '1 1 20px',
        },
        savedInputFields: {
            '& .MuiOutlinedInput-root': {
                padding: 0,
                borderRadius: 0,
                border: `1px solid ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.customField}`,
            },
            '& .MuiOutlinedInput-input::placeholder': {
                color: `${(_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.placeholder}`,
                opacity: 1,
            },
            '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.contrastText,
                color: (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            },
        },
        ccfPopOver: {
            '& .flexDisplay': {
                display: 'flex',
                alignItems: 'center',
            },
            '& .startoverButton': {
                justifyContent: 'flex-start',
                gap: '10px',
                fontSize: '12px',
                width: '100%',
                padding: '5px 10px',
                fontWeight: 600,
                borderTop: '1px solid #ADADAD',
                BorderBottom: '1px solid #ADADAD',
            },
            '& .MuiPaper-root .MuiPopover-paper': {
                border: '1px solid #ADADAD',
                borderRadius: 0,
                boxShadow: 'none',
                borderTop: 'none',
            },
        },
    };
    return styles;
};
export default treeElementStyles;
//# sourceMappingURL=ccf-tree-element.styles.js.map