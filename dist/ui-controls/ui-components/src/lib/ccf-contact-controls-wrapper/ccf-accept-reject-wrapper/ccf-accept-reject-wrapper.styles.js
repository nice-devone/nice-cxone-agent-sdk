/**
 * CcfAcceptRejectWrapper styles
 * @example <acceptRejectWrapperStyles />
 */
const acceptRejectWrapperStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const styles = {
        getFooterForSmallView: {
            display: 'grid',
            gridTemplateColumns: '95% 3%',
            gap: '2%',
            alignItems: 'center',
        },
        contactControlStyle: {
            [theme.breakpoints.down('sm')]: {
                width: '108px',
            },
        },
        controlPanel: {
            borderRadius: '8px',
            border: `1px solid ${(_a = theme.palette) === null || _a === void 0 ? void 0 : _a.border.main}`,
            boxShadow: `0px 1px 3px ${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.boxshadow.main}`,
            [theme.breakpoints.down('xl')]: {
                marginTop: 'auto',
                backgroundColor: `${(_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background.footer}`,
                boxShadow: `0px -3px 6px ${(_d = theme.palette) === null || _d === void 0 ? void 0 : _d.boxshadow.main}`,
                borderRadius: '0px 0px 5px 5px',
            },
        },
        customerName: {
            font: `normal normal bold 0.875rem/1.188rem ${(_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.fontFamily}`,
            display: 'block',
            padding: '0.124rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
        },
        cardHeader: {
            display: 'flex',
            flexDirection: 'row',
        },
        channelDetail2: {
            font: `normal normal 600 0.75rem/1.063rem ${(_f = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _f === void 0 ? void 0 : _f.fontFamily}`,
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.secondary,
            padding: '0.124rem',
            letterSpacing: '0rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre',
        },
        skillOrQueueToolTip: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginTop: '0.125rem',
        },
        smallViewChannelDetail2: {
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.white,
            padding: '0.124rem',
            letterSpacing: '0rem',
        },
    };
    return styles;
};
export default acceptRejectWrapperStyles;
//# sourceMappingURL=ccf-accept-reject-wrapper.styles.js.map