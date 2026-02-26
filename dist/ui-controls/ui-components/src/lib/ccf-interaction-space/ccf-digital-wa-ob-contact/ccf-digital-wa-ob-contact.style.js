/**
 * style object for ccf-digital-wa-ob-contact
 * @returns CcfDigitalWAOBContactStyles object
 * ```
 * @example
 * <CcfDigitalWAOBContactStyles/>
 * ```
 */
const CcfDigitalWAOBContactStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const styles = {
        headerContainer: {
            display: 'flex',
            background: `0% 0% no-repeat padding-box ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper}`,
            borderBottom: `1px solid ${(_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main}`,
            font: `normal normal ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.h6) === null || _f === void 0 ? void 0 : _f.fontSize}/${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h6) === null || _h === void 0 ? void 0 : _h.fontSize} ${(_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.fontFamily}`,
            paddingTop: '6px',
            paddingBottom: '12px',
        },
        statusBox: { display: 'flex', paddingTop: '1px', marginLeft: '15px' },
        caseStatus: { paddingLeft: '2px' },
        privateText: { paddingRight: '2px' },
        whatsAppNotificationContainer: {
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '4px',
            margin: '0.5rem',
            padding: '0.5rem',
        },
        whatsAppNotificationContentContainer: {
            display: 'flex',
        },
        whatsAppNotificationText: {
            color: theme.palette.text.contrastText,
            fontSize: '0.75rem',
            fontWeight: '400',
            marginLeft: '6px',
        },
        recipientBox: {
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
        },
        quickRepliesBtn: {
            width: '88px',
            height: '28px',
            marginLeft: 'auto',
            color: theme.palette.text.secondary,
            borderColor: theme.palette.border.main,
        },
        discardDraftContainer: {
            borderTop: 1,
            borderColor: `${theme.palette.border.main}`,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        contentHeight: {
            minHeight: 'calc(100vh - 360px)',
            [theme.breakpoints.down('xl')]: {
                minHeight: 'calc(93vh - 310px)',
            },
        },
    };
    return styles;
};
export default CcfDigitalWAOBContactStyles;
//# sourceMappingURL=ccf-digital-wa-ob-contact.style.js.map