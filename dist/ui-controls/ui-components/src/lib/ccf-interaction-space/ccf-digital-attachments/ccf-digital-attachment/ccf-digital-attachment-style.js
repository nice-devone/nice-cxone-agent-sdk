/**
 * @example styles for single/individual digital attachment component
 */
const CcfDigitalAttachmentStyles = (theme, size, isRegularSize) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const styles = {
        wrapper: {
            position: 'relative',
            height: size,
            width: size,
        },
        actions: {
            position: 'absolute',
            top: '0',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.default,
            opacity: '0.86',
            padding: isRegularSize ? '0.25rem 0.125rem' : '0',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: isRegularSize ? '1.625rem' : '0',
            transition: 'height 0.3s ease-in-out',
            '&:hover': {
                height: '100%',
                transition: 'height 0.3s ease-in-out',
            },
        },
        image: {
            borderRadius: '0.25rem',
            height: '100%',
            '&:hover ~ $actions': {
                height: '100%',
                transition: 'height 0.3s ease-in-out',
            },
        },
        attachmentDetails: {
            display: isRegularSize ? '-webkit-box' : 'none',
            flexDirection: 'column',
            fontSize: '7px',
            flexBasis: '80%',
            lineHeight: '0.625rem',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.main,
            fontWeight: '600',
            letterSpacing: '0.2px',
            alignSelf: 'center',
            width: '75%',
            overflowWrap: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
        },
        metaData: {
            display: 'flex',
        },
        icons: {
            marginTop: isRegularSize ? '1.25rem' : '',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            fontSize: '9px',
            fontWeight: 900,
            padding: '0 0.125rem',
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.main,
        },
        icon: {
            display: 'flex',
            flexDirection: 'column',
            width: isRegularSize ? '50%' : '20%',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
                textDecoration: 'none',
                color: 'inherit',
            },
            '&:focus': {
                textDecoration: 'none',
                color: 'inherit',
            },
            '&:active': {
                textDecoration: 'none',
                color: 'inherit',
            },
        },
        previewIcon: {
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.primary) === null || _h === void 0 ? void 0 : _h.main,
            cursor: 'pointer',
        },
        imageIcon: {
            margin: '0 0.25rem',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.primary) === null || _k === void 0 ? void 0 : _k.main,
        },
        pdfLargeIcon: {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.main,
            backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.boxshadow) === null || _p === void 0 ? void 0 : _p.main,
        },
        audioAttachment: {
            paddingRight: '4.6rem',
        },
    };
    return styles;
};
export default CcfDigitalAttachmentStyles;
//# sourceMappingURL=ccf-digital-attachment-style.js.map