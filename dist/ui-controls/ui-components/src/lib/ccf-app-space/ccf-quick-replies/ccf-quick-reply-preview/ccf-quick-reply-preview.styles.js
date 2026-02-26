/**
 * Styling for ccf-app-space-quick-replies-preview
 * @returns ccf-app-space-quick-replies-preview CSS properties as a JSON object
 * @example ccfQuickRepliesPreviewStyles(theme)
*/
const ccfQuickRepliesPreviewStyles = (theme, placeHolderArrayLength, error) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
    const styles = {
        replyCardWrapper: {
            flexDirection: 'column',
            height: '100%',
            display: 'flex',
            paddingTop: '20px',
            '*': {
                wordBreak: 'break-word',
            },
        },
        backSection: {
            display: 'flex',
            padding: '0px 10px 10px',
            width: '100%',
            cursor: 'pointer',
        },
        backBtn: {
            padding: '0px',
        },
        breadcrumbLabel: {
            letterSpacing: 0,
            color: theme.palette.text.dark,
            fontSize: '11px',
            fontWeight: '600',
        },
        backIcon: {
            fill: theme.palette.text.dark,
            fontSize: '14px',
        },
        replyCardInfo: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '44px',
            background: `${theme.palette.background.default} 0% 0% no-repeat padding-box`,
            paddingLeft: '10px',
            width: '100%',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        hoveredElement: {
            '&:hover': {
                backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.menuItemHighlight,
                borderRadius: '0.25rem',
            },
        },
        replyTitle: {
            display: 'flex',
            alignItems: 'center',
            font: 'normal normal bold 14px/19px Open Sans',
            letterSpacing: '0px',
            color: theme.palette.text.contrastText,
        },
        replyFavIcon: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        replyBodySection: {
            padding: '10px',
            flexGrow: 1,
            maxHeight: 'calc(100% - 117px)',
            overflowY: 'auto',
        },
        replyContentBody: {
            letterSpacing: 0,
            color: theme.palette.text.contrastText,
            fontSize: '14px',
            display: 'block',
            borderBottom: placeHolderArrayLength && `1px solid ${theme.palette.border.main}`,
            paddingBottom: '20px',
            '.placeholder': {
                display: 'inline-block',
                margin: '0 5px',
                position: 'relative',
                bottom: '2px',
            },
            [theme.breakpoints.down('xl')]: {
                fontSize: '12px',
            },
        },
        favReply: {
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.digitalStatus) === null || _f === void 0 ? void 0 : _f.openDark,
        },
        nonFavReply: {
            color: theme.palette.border.main,
        },
        editableVarFieldContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            margin: '5px 0',
            maxWidth: '120px',
            'input': {
                padding: '2px',
                width: '100%',
                fontSize: '14px',
                textOverflow: 'ellipsis',
            },
            '.MuiOutlinedInput-notchedOutline': {
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                borderColor: `${theme.palette.border.main} !important`,
            },
            [theme.breakpoints.down('xl')]: {
                fontSize: '12px',
            },
        },
        inputLabel: {
            font: 'normal normal normal 14px/19px Open Sans',
            letterSpacing: 0,
            color: theme.palette.text.light,
        },
        sendBtn: {
            boxShadow: 'none',
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '3px',
            font: 'normal normal 500 14px/19px Open Sans',
            letterSpacing: '0px',
        },
        activeSend: {
            background: `${theme.palette.primary.main} 0% 0% no-repeat padding-box`,
            borderRadius: '3px',
            font: 'normal normal 500 14px/19px Open Sans',
            letterSpacing: '0px',
            color: theme.palette.background.paper,
        },
        sendButtonBox: {
            width: '100%',
            justifyContent: 'flex-end',
            'button': {
                margin: '10px',
                boxShadow: 'none',
                cursor: 'pointer',
                ':hover': {
                    boxShadow: 'none',
                },
            },
        },
        loader: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px',
            height: '100%',
        },
        inputContainer: {
            marginTop: '20px',
        },
        label: {
            marginBottom: '5px',
        },
        input: {
            marginBottom: '10px',
        },
        timerReplayContent: {
            buttonBox: {
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
            },
            chip: {
                color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.primary) === null || _h === void 0 ? void 0 : _h.main,
                fontWeight: '800',
                margin: '0.5rem 0.5rem 0.5rem 0',
                backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.noteInput,
            },
            date: {
                color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.secondary,
                paddingBottom: '0.2rem',
                fontSize: '0.9rem',
            },
            timeSlotContainer: {
                padding: '1rem 1rem 0 1rem',
            },
            icon: {
                height: '1.5rem',
                width: '1.5rem',
                color: error ? (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.disabled : (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.clearText,
            },
            buttonText: {
                fontSize: '0.75',
                fontWeight: '600',
                fontStyle: 'bold',
                marginLeft: '0.313rem',
                color: error ? (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.disabled : (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.clearText,
            },
            sendBtn: {
                ':hover': {
                    border: `0.0625rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
                '&:focus': {
                    border: `0.0625rem solid ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
            },
            slotsSection: {
                overflowY: 'auto',
            },
            contentBody: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowY: 'auto',
            },
            container: {
                PaddingLeft: '0.5rem',
                marginTop: '0.5rem',
            },
            label: {
                fontSize: '0.875rem',
                fontWeight: '700',
                paddingLeft: '0.5rem',
            },
            label2: {
                fontSize: '0.75rem',
                fontWeight: '400',
                paddingLeft: '0.5rem',
            },
            durationList: {
                width: '9.5rem',
                fontSize: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _0 === void 0 ? void 0 : _0.h4) === null || _1 === void 0 ? void 0 : _1.fontSize,
                overflow: 'hidden',
                height: '2.5rem',
                lineHeight: '1.6rem',
                color: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.secondary) === null || _3 === void 0 ? void 0 : _3.main,
                background: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.background) === null || _5 === void 0 ? void 0 : _5.paper,
                '&:focus': {
                    border: `0.0625rem solid ${(_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.border) === null || _7 === void 0 ? void 0 : _7.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
            },
            footer: {
                padding: '0 0.5rem 0.5rem 0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
            },
            calenderInput: {
                paddingLeft: '0.5rem',
                width: '100%',
                paddingRight: '0.5rem',
            },
            removeBtn: {
                border: 'none',
                boxShadow: 'none',
                ':hover': {
                    backgroundColor: (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.background) === null || _9 === void 0 ? void 0 : _9.menuItemHighlight,
                    borderRadius: '0.25rem',
                    boxShadow: 'none',
                },
                '&:focus': {
                    border: `0.0625rem solid ${(_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.border) === null || _11 === void 0 ? void 0 : _11.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
                '&.Mui-disabled': {
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                },
            },
        },
        secureFormLinkText: {
            padding: '0.625rem',
            fontSize: theme === null || theme === void 0 ? void 0 : theme.typography.h5,
        },
        formSendButtonBox: {
            width: '100%',
            justifyContent: 'flex-end',
            'button': {
                border: '0.0625rem solid transparent',
                margin: '0.625rem',
                boxShadow: 'none',
                cursor: 'pointer',
                ':hover': {
                    border: `0.0625rem solid ${(_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.border) === null || _13 === void 0 ? void 0 : _13.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                    boxShadow: 'none',
                },
                '&:focus': {
                    border: `0.0625rem solid ${(_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.border) === null || _15 === void 0 ? void 0 : _15.menuItemHighlight}`,
                    borderRadius: '0.25rem',
                },
            },
        },
        menuItem: {
            border: '0.0625rem solid transparent',
            '&:hover': {
                backgroundColor: (_17 = (_16 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _16 === void 0 ? void 0 : _16.background) === null || _17 === void 0 ? void 0 : _17.menuItemHighlight,
            },
            '&:focus': {
                border: `0.063rem solid ${(_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.border) === null || _19 === void 0 ? void 0 : _19.menuItemHighlight} `,
            },
        },
    };
    return styles;
};
export default ccfQuickRepliesPreviewStyles;
//# sourceMappingURL=ccf-quick-reply-preview.styles.js.map