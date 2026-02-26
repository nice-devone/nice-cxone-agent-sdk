/**
 * styles for reply to message component
 * @example CcfReplyToMessageStyles(theme)
 */
const CcfReplyToMessageStyles = (theme) => {
    var _a, _b, _c, _d, _e;
    const styles = {
        replyToMessageContainer: {
            width: '15.688rem',
            minHeight: '2.938rem',
            height: 'auto',
            background: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.replyToMessageCardBackground,
            borderRadius: '0.125rem',
            border: `solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText}`,
            borderWidth: '0.063rem 0.063rem 0.063rem 0.188rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '0.438rem',
            marginBottom: '0.125rem',
            [theme.breakpoints.down('md')]: {
                width: '16.073rem',
                height: '3.605rem',
            },
        },
        authorAndTimestamp: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: '1.111rem',
        },
        messageContent: {
            overflow: 'hidden',
            maxHeight: '2.222rem',
            width: '14.5rem',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            lineClamp: 1,
            [theme.breakpoints.down('md')]: {
                width: '14.313rem',
                maxHeight: '1.817rem',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                lineClamp: 2,
            },
        },
        textStyles: {
            fontFamily: `${(_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.fontFamily}`,
            lineHeight: '0.851rem',
            fontSize: '0.625rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        subText: {
            fontWeight: 400,
        },
        mainText: {
            fontWeight: 700,
        },
        name: {
            maxWidth: '7.375rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginRight: '0.125rem',
        },
        closeIcon: {
            width: '0.875rem',
            height: '1.111rem',
            cursor: 'pointer',
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        attachmentsContainer: {
            'display': 'flex',
            'flexDirection': 'row',
            'flexWrap': 'wrap',
            'maxWidth': '15.75rem',
        },
    };
    return styles;
};
export default CcfReplyToMessageStyles;
//# sourceMappingURL=ccf-reply-to-message-styles.js.map