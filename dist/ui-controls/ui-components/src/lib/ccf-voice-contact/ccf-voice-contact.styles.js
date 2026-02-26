/**
 * styles for CcfVoiceContact
 * @returns ccfVoiceContactStyles styles object
 * @example <ccfVoiceContactStyles />
 */
export const ccfVoiceContactStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const styles = {
        controlPanelContainer: {
            display: 'flex',
            zIndex: 9,
            flexDirection: 'column',
        },
        dockedControls: {
            display: 'flex',
            width: '15.313rem',
            flexDirection: 'unset',
            padding: '8px',
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
        keypad: {
            width: '215px',
            position: 'absolute',
            zIndex: theme.zIndex.appBar + 1,
            border: `1px solid ${(_e = theme.palette) === null || _e === void 0 ? void 0 : _e.border.main}`,
        },
        contactControlStyle: {
            [theme.breakpoints.down('sm')]: {
                width: '108px',
            },
        },
        timerStyles: {
            font: `normal normal bold 0.875rem / 1.188rem  ${(_f = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _f === void 0 ? void 0 : _f.fontFamily}`,
            display: 'block',
            letterSpacing: '0rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
            marginLeft: '5px',
            onHold: {
                color: '#E4263C',
                font: `normal normal 600 10px/14px ${(_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.fontFamily}`,
                letterSpacing: '0px',
            },
        },
        getFooterForSmallView: {
            display: 'grid',
            gridTemplateColumns: '90% 6%',
            gap: '4%',
            alignItems: 'center',
        },
    };
    return styles;
};
export default ccfVoiceContactStyles;
//# sourceMappingURL=ccf-voice-contact.styles.js.map