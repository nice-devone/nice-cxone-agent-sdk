/**
 * Styling for ccf-rich-editor-wrapper
 * @returns ccf-rich-editor-wrapper CSS properties as a JSON object
 * @example CcfContactEditorStyles(theme)
*/
const CcfContactEditorStyles = (theme, isOBContact, isDraft) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const styles = {
        iconContainer: {
            height: '1rem',
            width: '1rem',
        },
        revampedAddNotesContainer: {
            height: '1.25rem',
            width: '1.25rem',
        },
        commonBox: {
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            // float: 'right',
            button: {
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                    border: 'none',
                    boxShadow: 'none',
                },
            },
            marginTop: '0.3rem',
            marginBottom: '0.5rem',
        },
        revampCommonBox: {
            flexWrap: 'no-wrap',
            gap: '0.753rem',
        },
        rightSideBox: {
            [theme.breakpoints.down('xl')]: {
                paddingBottom: '.75rem',
            },
        },
        leftSideBox: {
            [theme.breakpoints.between('sm', 'md')]: {
            // float: 'left',
            },
        },
        btnContainer: {
            'min-width': '34px !important',
            padding: 0,
        },
        button: {
            color: `${(_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.grey[800]}`,
            minWidth: '1.5rem',
            '&:hover': {
                backgroundColor: `${theme.palette.action.hover}`,
            },
            padding: 0,
        },
        buttonActive: {
            background: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.main,
            marginRight: '0.2rem',
        },
        clearRelpyBtn: {
            color: `${(_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.primary) === null || _e === void 0 ? void 0 : _e.main} !important`,
            width: '4rem',
        },
        revampedEmailClearReplyBtn: {
            color: `${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.primary) === null || _g === void 0 ? void 0 : _g.main} !important`,
            width: '1.5rem',
            height: '1.5rem',
        },
        revampedClearReplyContainer: {
            'height': '1.625rem', 'width': '1.625rem',
        },
        focusedElement: {
            border: '0.125rem solid transparent !important',
            '&:focus': {
                borderColor: `${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.border) === null || _j === void 0 ? void 0 : _j.menuItemHighlight}!important`,
                borderRadius: '0.25rem',
            },
        },
        addNotesBtn: {
            width: '4rem',
        },
        revampedAddNotesBtn: {
            width: '1.5rem',
            height: '1.5rem',
        },
        sendButtonElement: {
            marginRight: '1rem',
        },
        revampedSendButton: {
            marginRight: '1rem',
            height: '1.75rem',
            minWidth: '8.125rem',
        },
        editorContainer: {
            'overflow-y': isOBContact !== null && isOBContact !== void 0 ? isOBContact : 'scroll',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            gridTemplateColumns: 'minmax(0,1fr)',
            height: '97%',
            borderRadius: '0.25rem',
            width: isDraft !== null && isDraft !== void 0 ? isDraft : '98%',
            margin: isDraft ? '0 0.625rem 0 0.625rem' : '0.625rem 0.625rem 0 0.625rem',
            boxShadow: `${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.background) === null || _l === void 0 ? void 0 : _l.editorBoxShadow} 0 2px 5px 2px`,
        },
        customerNameBox: {
            width: '100%',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            customerNameDisplay: {
                display: 'inline',
                padding: '0 0.13rem 0 1.5rem',
                width: '90%',
                fontWeight: 500,
                fontSize: `${(_o = (_m = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _m === void 0 ? void 0 : _m.h6) === null || _o === void 0 ? void 0 : _o.fontSize}`,
                lineHeight: 1.6,
            },
            discardBtnTooltip: {
                width: '10%',
            },
        },
    };
    return styles;
};
export default CcfContactEditorStyles;
//# sourceMappingURL=ccf-contact-editor.styles.js.map