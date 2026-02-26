/**
 * @example styles for CcfOutboundOptions component
 */
const CcfOutboundOptionsStyle = (theme, IBcall, elevationPopover) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        hoverPopUpCallBtnMargin: {
            marginLeft: '5px',
        },
        skillSelect: {
            height: '35%',
            borderRadius: '0.45em',
            marginRight: (!elevationPopover && !IBcall) ? 4 : 0,
            flex: 1,
            background: theme.palette.background.paper,
            fontSize: theme.typography.h5.fontSize,
            overflow: 'hidden',
        },
        text: {
            display: 'inline-block',
            width: 'max-content',
            height: '100%',
            margin: '0px 10px',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.main,
        },
        liner: {
            border: `1px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.default}`,
            display: 'inline-block',
            width: '50%',
            margin: '3px 0px',
        },
        outboundOption: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0.33vw 1vw 0 1vw',
            alignItems: 'center',
            justifyContent: 'space-between',
            '&:hover': {
                backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.outboundOptionBg,
                cursor: 'pointer',
            },
        },
        noTriggerButton: {
            '&:hover': {
                cursor: 'pointer',
            },
        },
        disabledButton: {
            opacity: 0.5,
            pointerEvents: 'none',
        },
        textContainer: {
            display: 'inline-block',
            width: '100%',
        },
        outboundOptionIcon: {
            padding: '0.5vw 0.66vw 0.66vw 0.66vw',
        },
        outboundOptionText: {
            padding: '0.8vw 0.8vw 0.8vw 0.33vw',
        },
        customOutboundOptionText: {
            padding: '0.8vw 0.8vw 0.8vw 0.33vw',
            paddingLeft: '0.1875rem',
        },
        flexDisplay: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
            width: '100%',
        },
        menuItemTooltip: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textWrap: 'nowrap',
        },
    };
    return styles;
};
export default CcfOutboundOptionsStyle;
//# sourceMappingURL=ccf-outbound-options.styles.js.map