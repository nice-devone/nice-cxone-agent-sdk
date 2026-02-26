/**
   * style object for ccf-digital-contact-sla-timer
   * @returns ccfDigitalContactSLATimerStyles styles object
   * ```
   * @example
   * <CcfDigitalContactSLATimerStyles />
   * ```
   */
const CcfDigitalContactSLATimerStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const styles = {
        timerBox: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 0.3rem',
            '@media (hover: none)': {
                borderBottom: '1px solid #dae2e8',
                padding: '0.3rem 0',
                '.MuiBox-root': {
                    paddingLeft: 0,
                    paddingBottom: '0.2rem',
                    marginLeft: '0.5rem',
                    marginRight: '1rem',
                },
            },
        },
        timer: {
            fontWeight: 'bold',
            fontSize: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h6) === null || _b === void 0 ? void 0 : _b.fontSize}`,
        },
        yellowWarning: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.yellowWarning,
        },
        redWarning: {
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.main,
        },
        restTimer: {
            'button': {
                padding: 0,
                boxShadow: 'none',
                cursor: 'pointer',
                borderRadius: '0.12rem',
                lineHeight: '1.2rem',
                minWidth: '3.5rem',
            },
        },
        addIcon: {
            fontSize: `${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h5) === null || _h === void 0 ? void 0 : _h.fontSize}`,
        },
        timeText: {
            color: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.searchTitle}`,
            fontSize: `${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.h5) === null || _m === void 0 ? void 0 : _m.fontSize}`,
            fontWeight: (_o = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _o === void 0 ? void 0 : _o.fontWeightBold,
        },
        slaTooltip: {
            width: '12rem',
            paddingBottom: '0.5rem',
        },
        channelTypeTimer: {
            fontWeight: 'bold',
            fontSize: `${(_q = (_p = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _p === void 0 ? void 0 : _p.h5) === null || _q === void 0 ? void 0 : _q.fontSize}`,
            padding: '0.5rem 1rem',
        },
        timerTitle: {
            padding: '0.3rem',
        },
        collapsedTimerTitle: {
            padding: '0.2rem 0 0 0.8rem',
        },
    };
    return styles;
};
export default CcfDigitalContactSLATimerStyles;
//# sourceMappingURL=ccf-digital-contact-sla-timer.style.js.map