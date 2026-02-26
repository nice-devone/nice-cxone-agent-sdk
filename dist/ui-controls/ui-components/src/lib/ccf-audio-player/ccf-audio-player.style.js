import { keyframes } from '@mui/material';
/**
 * style object for ccf-audio-player component
 * @returns CcfAudioPlayerStyle object
 * ```
 * @example
 * <CcfAudioPlayerStyle />
 * ```
 */
const CcfAudioPlayerStyle = (theme, conatinerWidth = '150%', isInboundDirection = false, shouldShowCloseIcon) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    const spin = keyframes `
        0% {
        transform: scale(1);
    }
    15% {
        box-shadow: 0 0 0 5px rgba(52, 152, 219,0.1);
    }
    25% {
        box-shadow: 0 0 0 10px rgba(52, 152, 219,0.1), 0 0 0 20px rgba(52, 152, 219,0.1);
    }
    25% {
        box-shadow: 0 0 0 15px rgba(52, 152, 219,0.1), 0 0 0 30px rgbargba(52, 152, 219,0.1);
    }
    `;
    const styles = {
        mainContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: conatinerWidth,
            margin: '0.063rem',
            borderRadius: '0.375rem',
            height: '3.254rem',
        },
        audioHoldIcon: {
            fontSize: 10,
            marginLeft: 0,
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
        },
        audioResumeIcon: {
            fontSize: 10,
            marginLeft: '0.3125rem',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper,
        },
        fabButton: {
            height: '2.146rem',
            width: '2.146rem',
            minHeight: '2.1rem',
            padding: '0.125rem 0 0 0.125rem',
            backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.audioPlayerColor,
            '&:hover': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.audioPlayerColor,
            },
        },
        recordInprogress: {
            margin: '0.9rem 0 0 0.625rem',
            position: 'absolute',
        },
        closeIcon: {
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.primary) === null || _k === void 0 ? void 0 : _k.secondary,
            fontSize: '1.25rem',
            cursor: 'pointer',
            marginRight: '0.5rem',
            marginLeft: '0.5rem',
            height: '1rem',
            width: '1rem',
        },
        audioPlayerPlayButton: {
            '& .rhap_button-clear': {
                overflow: 'visible',
                marginBottom: '0.625rem',
                borderRadius: '0.438rem',
            },
            '& .rhap_progress-indicator': {
                background: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.audioPlayerColor,
                top: '-0.375rem',
                height: '0.875rem',
                width: '0.875rem',
                [theme.breakpoints.down('xs')]: {
                    width: '0.575rem',
                },
            },
            '& .rhap_container': {
                borderRadius: '0.375rem',
                height: '3.254rem',
                padding: '0',
                [theme.breakpoints.down('md')]: {
                    width: shouldShowCloseIcon ? '100%' : '90%',
                },
            },
            '& .rhap_progress-bar-show-download': {
                color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.audioPlayerColor,
                height: '0.125rem',
            },
            '& .rhap_time': {
                fontSize: '0.75rem',
            },
            '& .rhap_controls-section': {
                marginLeft: '0.25rem',
                flexGrow: 'revert',
            },
            '& .rhap_play-pause-button': {
                zIndex: '997',
                marginBottom: '0.938rem',
            },
        },
        circularProgress: {
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
            height: '2.208rem',
            width: '2.208rem',
            [theme.breakpoints.down('xl')]: {
                top: 0,
                left: 0,
                height: 38,
                width: 38,
            },
        },
        downloadIcon: {
            cursor: 'pointer',
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.audioPlayerColor,
        },
        audioAttachmentContainer: {
            overflow: 'visible',
            backgroundColor: isInboundDirection ? (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.slateGrey : (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.paper,
        },
        pulseAnimation: {
            margin: '8 0 0 8',
            background: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.primary) === null || _x === void 0 ? void 0 : _x.main,
            width: '2.25rem',
            height: '2.313rem',
            position: 'relative',
            borderRadius: '90%',
            border: `solid 0.313rem ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.paper}`,
            animation: `${spin} 2s ease infinite`,
            '&::-webkit-backface-visibility': 'hidden',
            '&::-moz-backface-visibility': 'hidden',
            '&::-ms-backface-visibility': 'hidden',
            backfaceVisibility: 'hidden',
        },
        recordTimer: {
            marginRight: '0.25rem',
        },
        tooltipArea: {
            width: '100%',
        },
        audioPlayerColor: {
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.background) === null || _1 === void 0 ? void 0 : _1.audioPlayerColor,
        },
        fab: {
            position: 'relative',
            height: '2.5rem',
            width: '2.5rem',
            margin: '2 0 2 0',
            border: `0.1875rem  solid ${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.darkGrey}`,
            backgroundColor: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.background) === null || _5 === void 0 ? void 0 : _5.audioPlayerColor,
            '&:hover': {
                backgroundColor: (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.audioPlayerColor,
            },
        },
    };
    return styles;
};
export default CcfAudioPlayerStyle;
//# sourceMappingURL=ccf-audio-player.style.js.map