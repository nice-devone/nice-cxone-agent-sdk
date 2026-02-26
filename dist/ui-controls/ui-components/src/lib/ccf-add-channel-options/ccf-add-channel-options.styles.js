/**
 * return styles used for the component
 * @example ccfAddChannelOptionsStyles(theme)
 * @returns styles
 */
const ccfAddChannelOptionsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return {
        container: {
            width: '18.75rem',
            paddingBottom: '0.313rem',
        },
        listSubheader: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '0.5rem',
            paddingTop: '1rem',
            paddingBottom: '0.75rem',
        },
        customizeText: {
            fontWeight: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontWeightBold,
            color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.black,
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.black,
        },
        closeButton: {
            border: '0.125rem solid transparent !important',
            '&:focus': {
                borderColor: `${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.border) === null || _g === void 0 ? void 0 : _g.menuItemHighlight}!important`,
                borderRadius: '0.25rem',
            },
            '&:hover': {
                border: '0.125rem solid transparent !important',
            },
            boxShadow: 'none',
            marginTop: '-0.5rem',
        },
        outboundOptionsText: {
            fontSize: '0.938rem',
            fontWeight: 600,
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        numberOptionsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        voiceCallIcon: {
            fill: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.info) === null || _j === void 0 ? void 0 : _j.light,
            marginTop: '3px',
        },
        optionContainer: {
            padding: '0.25rem 1rem',
            '&:hover': { backgroundColor: (_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.background) === null || _l === void 0 ? void 0 : _l.outboundOptionBg },
        },
        emailDetails: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            cursor: 'pointer',
        },
        iconContainer: {
            padding: '0.313rem',
            cursor: 'pointer',
            '&:hover': {
                borderRadius: '0.25rem',
                backgroundColor: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.background) === null || _o === void 0 ? void 0 : _o.main,
            },
        },
        disabledIconContainer: {
            cursor: 'default',
            pointerEvents: 'none',
        },
        disabledIcon: {
            fill: (_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.light,
        },
        phoneNumber: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginTop: '0.125rem',
            width: '8.5rem',
        },
        phoneListContainer: {
            margin: '0.75rem 0',
        },
        collapse: {
            width: '100%',
            padding: '0.313rem 0',
        },
        emailText: {
            marginLeft: '0.625rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        emailListContainer: {
            margin: '0.75rem 0',
        },
        phoneEmailText: {
            padding: '0 1rem 0.5rem',
        },
        ellipsisBox: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    };
};
export default ccfAddChannelOptionsStyles;
//# sourceMappingURL=ccf-add-channel-options.styles.js.map