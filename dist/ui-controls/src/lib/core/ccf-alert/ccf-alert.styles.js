/**
 * @example styles for alert component
 */
const ccfAlertStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const styles = {
        successToast: {
            '& .MuiAlert-filledSuccess': {
                background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.success) === null || _b === void 0 ? void 0 : _b.dark} 0% 0% no-repeat padding-box`,
                opacity: '0.9',
                width: '340px',
                height: '70px',
                font: `normal normal normal 14px/20px ${(_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.fontFamily}`,
                letterSpacing: '0px',
                color: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.background) === null || _e === void 0 ? void 0 : _e.paper,
                display: 'flex',
                alignItems: 'center',
                borderRadius: '0px',
            },
        },
        successTick: {
            color: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.background) === null || _g === void 0 ? void 0 : _g.paper,
        },
        closeIcon: {
            color: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.paper,
            fontSize: '12px',
            opacity: '0.6',
        },
    };
    return styles;
};
export default ccfAlertStyle;
//# sourceMappingURL=ccf-alert.styles.js.map