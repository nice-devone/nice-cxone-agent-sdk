/**
 * styles for CcfContactControls
 * @returns ccfContactControlsStyles styles object
 * @example <ccfContactControlsStyles />
 */
export const ccfContactControlsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        controlPanelContainer: {
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('xl')]: {
                position: 'absolute',
                bottom: '0',
                width: '100%',
            },
        },
        dockedControls: {
            display: 'flex',
            width: '15.313rem',
            marginLeft: '15px',
            flexDirection: 'unset',
        },
        contactControlButton: {
            margin: '0px 5px',
        },
        controlPanel: {
            borderRadius: '8px',
            border: `1px solid ${(_a = theme.palette) === null || _a === void 0 ? void 0 : _a.border.main}`,
            boxShadow: `0px 1px 3px ${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.boxshadow.main}`,
            [theme.breakpoints.down('xl')]: {
                marginTop: 'auto',
                backgroundColor: `${(_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background.default}`,
                boxShadow: `0px -3px 6px ${(_d = theme.palette) === null || _d === void 0 ? void 0 : _d.boxshadow.main}`,
                borderRadius: '0px 0px 5px 5px',
            },
        },
        digitalPanelButtonConf: {
            width: '20px',
            cursor: 'pointer',
            height: '20px',
            margin: '5px 5px',
            display: 'flex',
            padding: '0px',
            alignItems: 'center',
            justifyContent: 'center',
        },
        hungUp: {
            width: '68px',
            margin: '0px',
            [theme.breakpoints.down('xl')]: {
                width: 'unset',
            },
        },
        hungUp1: {
            width: '28px',
            margin: '0px',
            [theme.breakpoints.down('xl')]: {
                width: 'unset',
            },
        },
        contactControlPanel: {
            backgroundColor: `${(_e = theme.palette) === null || _e === void 0 ? void 0 : _e.background.paper}`,
            display: 'flex',
            justifyContent: 'space-evenly',
            flexFlow: 'row wrap',
            [theme.breakpoints.down('xl')]: {
                backgroundColor: `${(_f = theme.palette) === null || _f === void 0 ? void 0 : _f.background.default}`,
                margin: '0px 8px 10px',
            },
        },
        contactControlPanelConf: {
            justifyContent: 'flex-start',
        },
        markAsResolved: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: '4px',
            paddingTop: '4px',
            '&:hover': {
                backgroundColor: `${(_g = theme.palette) === null || _g === void 0 ? void 0 : _g.background.default}`,
            },
            [theme.breakpoints.down('xl')]: {
                width: 'unset',
            },
        },
        controlsGrid: {
            justifyContent: 'space-around',
            padding: '0px 30px',
            marginBottom: '0px',
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            [theme.breakpoints.down('xl')]: {
                justifyContent: 'space-evenly',
                flexFlow: 'wrap',
                width: '100%',
                padding: '0px',
                alignItems: 'center',
            },
        },
        consultConferenceGrid: {
            padding: '0 0 0 25px',
            marginBottom: '0px',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xl')]: {
                justifyContent: 'space-around',
                flexFlow: 'wrap',
                width: '100%',
                padding: '0px',
                alignItems: 'center',
            },
        },
        integratedHeader: {
            backgroundColor: `${(_h = theme.palette) === null || _h === void 0 ? void 0 : _h.background.default}`,
            boxShadow: `0px -3px 6px ${(_j = theme.palette) === null || _j === void 0 ? void 0 : _j.boxshadow.main}`,
            borderRadius: '0px 0px 5px 5px',
        },
        resolvedIcon: {
            fill: `${(_k = theme.palette) === null || _k === void 0 ? void 0 : _k.background.dark} !important`,
            fontSize: '1.625rem !important',
        },
        responsiveControls: {
            padding: '0px',
        },
        callControlDisabled: {
            '& .Mui-disabled': {
                opacity: '0.8',
                pointerEvents: 'none !important',
                cursor: 'not-allowed !important',
            },
        },
        timerStyles: {
            font: `normal normal bold 0.875rem / 1.188rem  ${(_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.fontFamily}`,
            display: 'block',
            padding: '0.75rem',
            letterSpacing: '0rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
        },
        timerDisable: {
            color: `${(_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.grey[400]}`,
        },
    };
    return styles;
};
export default ccfContactControlsStyles;
//# sourceMappingURL=ccf-contact-controls.style.js.map