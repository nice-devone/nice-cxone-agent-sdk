/**
 * @example styles for ccfNetworkLatencyBar component
 */
export const ccfNetworkLatencyBarStyles = (theme, isSmView) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const styles = {
        latencyBarAndMarkerContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '0.5rem',
        },
        latencyBar: {
            height: '1rem',
            width: '100%',
            backgroundImage: `linear-gradient(to right, ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.success) === null || _b === void 0 ? void 0 : _b.main}, ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.accent) === null || _d === void 0 ? void 0 : _d.main}, ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.digitalStatus) === null || _f === void 0 ? void 0 : _f.newDark})`,
            position: 'relative',
        },
        minMaxLabels: {
            width: '60%',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            marginTop: '0.25rem',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.latencyBarLabel,
        },
        currentLatency: {
            position: 'absolute',
            transform: 'translateX(-50%)',
            top: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
        },
        triangleMarker: {
            width: 0,
            height: 0,
            borderLeft: '0.375rem solid transparent',
            borderRight: '0.375rem solid transparent',
            borderBottom: `0.5rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.black}`,
            marginBottom: '0.125rem',
        },
        sliderContainer: {
            display: 'flex',
            verticalAlign: 'middle',
            backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.paper,
            padding: '0 0.5rem',
            fontSize: '0.75rem',
            margin: '1rem 0.5rem',
            flexDirection: 'column',
            alignItems: 'center',
            width: isSmView ? '100%' : '50%',
        },
        currentLatencyValue: { fontSize: '0.75rem',
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.latencyBarLabel },
        latencyFont: { fontSize: '0.75rem' },
        latencyBarLabel: { marginBottom: '0.25rem',
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.latencyBarLabel },
        barWrapper: {
            flex: 1,
            position: 'relative',
        },
    };
    return styles;
};
//# sourceMappingURL=ccf-network-latencybar.style.js.map