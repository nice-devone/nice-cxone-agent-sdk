import { keyframes } from '@mui/material';
import { SLAIndicatorType } from '@nice-devone/common-sdk';
/**
 * style object for ccf-assignment-card
 * @returns CcfAssignmentCardStyle styles object
 * ```
 * @example
 * <CcfAssignmentCardStyle />
 * ```
 */
const ccfAssignmentCardStyle = (theme, slaWarning, viewOnlyCase = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83;
    let activeBorderColor = null;
    if (slaWarning && slaWarning !== SLAIndicatorType.NORMAL) {
        activeBorderColor = slaWarning === SLAIndicatorType.WARNING ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.yellowWarning : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.main;
    }
    // Animations need to be handled separately like this, as we need reusable animation unlike it's handled inside in loader file
    const animated = keyframes `
  100% { opacity: 1; transform: translateX(0); }
  0% { opacity: 1; transform: translateX(100%); }
`;
    const slide = keyframes `
  0% { opacity: 1; transform: translateX(0); }
  90% { opacity: 1; transform: translateX(0); }
  99% { opacity: 1; transform: translateX(160px); }
  100% { opacity: 0; transform: translateX(294px); overflow: hidden; display: none; }
`;
    const slideIn = keyframes `
  100% { opacity: 0; transform: translateX(0); }
  30% { opacity: 1; transform: translateX(0); }
  0% { opacity: 1; transform: translateX(100px); }
`;
    const hideRejectIconText = keyframes `
  0% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; }
`;
    const textSlide = keyframes `
  0% { opacity: 0; }
  30% { opacity: 0; }
  60% { opacity: 1; }
  95% { opacity: 1; }
  100% { opacity: 0; }
`;
    const styles = {
        inactiveCardCollapsed: {
            width: 'inherit',
            height: '3.5rem',
            marginBottom: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: `0.063rem solid ${viewOnlyCase} ? ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.digitalTag} : ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.default}`,
            backgroundColor: viewOnlyCase ? (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.digitalTag : (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.paper,
            '[dir=\'rtl\'] &': {
                marginLeft: '0.25rem',
                borderRight: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.transparent}`,
            },
            '[dir=\'ltr\'] &': {
                borderLeft: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.transparent}`,
            },
        },
        activeCardCollapsed: {
            width: 'inherit',
            height: '3.5rem',
            marginBottom: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: viewOnlyCase ? (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.digitalTag : (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.default,
            borderTop: `0.063rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.main}`,
            borderBottom: `0.063rem solid ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.border) === null || _z === void 0 ? void 0 : _z.main}`,
            background: `(${viewOnlyCase} ? ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.background) === null || _1 === void 0 ? void 0 : _1.digitalTag} : #F2F2F3) 0% 0% no-repeat padding-box`,
            boxShadow: 'inset -2px 2px 2px #0000001A',
            border: '1px solid #3B599833',
            borderRadius: '4px',
            opacity: '1',
            '[dir=\'rtl\'] &': {
                marginRight: '0.5rem',
                borderRight: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.active}`,
            },
            '[dir=\'ltr\'] &': {
                borderLeft: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.text) === null || _5 === void 0 ? void 0 : _5.active}`,
            },
            callStatusWrapper: {
                paddingTop: '0.313rem',
            },
        },
        selectedCardColor: {
            backgroundColor: viewOnlyCase ? (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.digitalTag : (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.background) === null || _9 === void 0 ? void 0 : _9.default,
        },
        active: {
            backgroundColor: viewOnlyCase ? (_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.background) === null || _11 === void 0 ? void 0 : _11.digitalTag : (_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.background) === null || _13 === void 0 ? void 0 : _13.default,
            borderTop: `0.063rem solid ${(_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.boxshadow) === null || _15 === void 0 ? void 0 : _15.main}`,
            borderBottom: `0.063rem solid ${(_17 = (_16 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _16 === void 0 ? void 0 : _16.boxshadow) === null || _17 === void 0 ? void 0 : _17.main}`,
            marginBottom: '0.5rem',
            boxShadow: 'none',
            color: (_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.text) === null || _19 === void 0 ? void 0 : _19.primary,
            '[dir=\'ltr\'] &': {
                borderLeft: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_21 = (_20 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _20 === void 0 ? void 0 : _20.text) === null || _21 === void 0 ? void 0 : _21.active}`,
                borderTopRightRadius: '0rem',
                borderBottomRightRadius: '0rem',
                marginLeft: '0.25rem',
            },
            '[dir=\'rtl\'] &': {
                borderRight: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_23 = (_22 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _22 === void 0 ? void 0 : _22.text) === null || _23 === void 0 ? void 0 : _23.active}`,
                borderTopLeftRadius: '0rem',
                borderBottomLeftRadius: '0rem',
                marginRight: '0.25rem',
            },
        },
        inactive: {
            boxShadow: `0rem 0.063rem 0.188rem ${(_25 = (_24 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _24 === void 0 ? void 0 : _24.boxshadow) === null || _25 === void 0 ? void 0 : _25.main}`,
            borderRadius: '0.25rem',
            marginBottom: '0.5rem',
            '[dir=\'rtl\'] &': {
                marginLeft: '0.25rem',
                marginRight: '0.5rem',
                borderRight: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_27 = (_26 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _26 === void 0 ? void 0 : _26.background) === null || _27 === void 0 ? void 0 : _27.transparent}`,
            },
            '[dir=\'ltr\'] &': {
                marginLeft: '0.25rem',
                marginRight: '0.25rem',
                borderLeft: `0.25rem solid ${activeBorderColor !== null && activeBorderColor !== void 0 ? activeBorderColor : (_29 = (_28 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _28 === void 0 ? void 0 : _28.background) === null || _29 === void 0 ? void 0 : _29.transparent}`,
            },
        },
        smallViewInactive: {
            backgroundColor: '#444D57',
            color: (_31 = (_30 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _30 === void 0 ? void 0 : _30.background) === null || _31 === void 0 ? void 0 : _31.paper,
            boxShadow: `0rem 0.063rem 0.188rem ${(_33 = (_32 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _32 === void 0 ? void 0 : _32.boxshadow) === null || _33 === void 0 ? void 0 : _33.main}`,
            borderRadius: '0.25rem',
            marginBottom: '0.5rem',
            '[dir=\'rtl\'] &': {
                marginLeft: '0.25rem',
                marginRight: '0.5rem',
            },
            '[dir=\'ltr\'] &': {
                marginLeft: '0.25rem',
                marginRight: '0.25rem',
            },
        },
        smallViewPcInactive: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: viewOnlyCase ? (_35 = (_34 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _34 === void 0 ? void 0 : _34.background) === null || _35 === void 0 ? void 0 : _35.digitalTag : (_37 = (_36 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _36 === void 0 ? void 0 : _36.background) === null || _37 === void 0 ? void 0 : _37.default,
            alignItems: 'center',
            boxShadow: `0rem 0.063rem 0.188rem ${(_39 = (_38 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _38 === void 0 ? void 0 : _38.boxshadow) === null || _39 === void 0 ? void 0 : _39.main}`,
            borderRadius: '0.25rem',
            marginBottom: '0.5rem',
            '[dir=\'rtl\'] &': {
                marginLeft: '0.25rem',
                marginRight: '0.5rem',
            },
            '[dir=\'ltr\'] &': {
                marginLeft: '0.25rem',
                marginRight: '0.25rem',
            },
        },
        collapsedIcon: {
            marginLeft: '11px',
        },
        expandedIcon: {
            marginLeft: '0px',
        },
        requiredDisposition: {
            stroke: (_41 = (_40 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _40 === void 0 ? void 0 : _40.disposition) === null || _41 === void 0 ? void 0 : _41.required,
        },
        optionalDisposition: {
            stroke: (_43 = (_42 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _42 === void 0 ? void 0 : _42.disposition) === null || _43 === void 0 ? void 0 : _43.optional,
        },
        cardHeader: {
            display: 'flex',
            flexDirection: 'row',
        },
        cardHeaderVoiceMail: {
            display: 'flex',
            flexDirection: 'column',
        },
        skillOrQueueToolTip: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginTop: '0.125rem',
        },
        directionIcon: {
            marginLeft: '-0.25rem',
            marginRight: '-0.188rem',
        },
        textReject: {
            textAlign: 'left',
            font: `normal normal bold 1.125rem/1.5rem ${(_44 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _44 === void 0 ? void 0 : _44.fontFamily}`,
            letterSpacing: '0rem',
            color: (_46 = (_45 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _45 === void 0 ? void 0 : _45.text) === null || _46 === void 0 ? void 0 : _46.primary,
            verticalAlign: 'super',
            paddingLeft: '7.5px',
            paddingTop: '2.5px',
            animation: `${slideIn} 2s, ${hideRejectIconText} 2s    forwards`,
        },
        cardDivider: {
            backgroundColor: (_48 = (_47 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _47 === void 0 ? void 0 : _47.background) === null || _48 === void 0 ? void 0 : _48.default,
            height: '3.5rem',
            marginTop: '0.75rem',
        },
        customerName: {
            font: `normal normal bold 0.875rem/1.188rem ${(_49 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _49 === void 0 ? void 0 : _49.fontFamily}`,
            display: 'block',
            padding: '0.124rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
            onHold: {
                color: '#E4263C',
            },
        },
        contentWrap: {
            wordBreak: 'break-all',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
            whiteSpace: 'pre-line',
        },
        timer: {
            font: `normal normal bold 0.875rem/1.188rem ${(_50 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _50 === void 0 ? void 0 : _50.fontFamily}`,
            padding: '0.124rem',
        },
        activeTimer: {
            font: `normal normal bold 0.813rem/1.125rem ${(_51 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _51 === void 0 ? void 0 : _51.fontFamily}`,
            padding: '0.124rem',
        },
        channelDetail2: {
            font: `normal normal 600 0.75rem/1.063rem ${(_52 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _52 === void 0 ? void 0 : _52.fontFamily}`,
            color: (_54 = (_53 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _53 === void 0 ? void 0 : _53.text) === null || _54 === void 0 ? void 0 : _54.secondary,
            padding: '0.124rem',
            letterSpacing: '0rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre',
        },
        notificationBadge: {
            '& .MuiBadge-badge': {
                backgroundColor: (_56 = (_55 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _55 === void 0 ? void 0 : _55.error) === null || _56 === void 0 ? void 0 : _56.main,
                height: '0.75rem',
                minWidth: '0.75rem',
                borderRadius: '0.375rem',
            },
        },
        smallViewChannelDetail2: {
            color: (_58 = (_57 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _57 === void 0 ? void 0 : _57.text) === null || _58 === void 0 ? void 0 : _58.white,
            padding: '0.124rem',
            letterSpacing: '0rem',
        },
        phoneNumber: {
            font: `normal normal normal 0.813rem/1.125rem ${(_59 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _59 === void 0 ? void 0 : _59.fontFamily}`,
            margin: '0.313rem',
            padding: '0.124rem',
            letterSpacing: '0rem',
        },
        hungUpText: {
            textAlign: 'left',
            font: `normal normal bold 1.2rem ${(_60 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _60 === void 0 ? void 0 : _60.fontFamily}`,
            letterSpacing: '0rem',
            color: (_62 = (_61 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _61 === void 0 ? void 0 : _61.text) === null || _62 === void 0 ? void 0 : _62.primary,
            verticalAlign: 'super',
            animation: `${textSlide} 2s 1 linear forwards`,
            paddingRight: '15px',
            paddingBottom: '5px',
        },
        hungUpIcon: {
            fontSize: '2.6rem',
            fill: (_64 = (_63 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _63 === void 0 ? void 0 : _63.success) === null || _64 === void 0 ? void 0 : _64.main,
            animation: `${textSlide} 2s 1 linear forwards`,
            paddingTop: '7.5px',
            paddingLeft: '10px',
            textAlign: 'right',
        },
        rejectIcon: {
            fontSize: '3.5rem',
            fill: (_66 = (_65 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _65 === void 0 ? void 0 : _65.error) === null || _66 === void 0 ? void 0 : _66.main,
            paddingLeft: '30px',
            paddingBottom: '25px',
            animation: `${slideIn} 2s, ${hideRejectIconText} 2s    forwards`,
        },
        hungUpBorder: {
            height: '19rem',
            '[dir=\'rtl\'] &': {
                borderRight: `0.25rem solid ${(_68 = (_67 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _67 === void 0 ? void 0 : _67.text) === null || _68 === void 0 ? void 0 : _68.active}`,
                borderRadius: '0rem 0.25rem 0.25rem 0rem',
            },
            '[dir=\'ltr\'] &': {
                borderLeft: `0.25rem solid ${(_70 = (_69 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _69 === void 0 ? void 0 : _69.text) === null || _70 === void 0 ? void 0 : _70.active}`,
                borderRadius: '0.25rem 0rem 0rem 0.25rem',
            },
        },
        sectionTop: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        cardLeft: {
            width: '9.688rem',
            padding: '0.5rem 0.563rem 0rem 0.563rem',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '6rem',
        },
        cardLeftActive: {
            width: 'auto',
        },
        cardRight: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '4rem',
            padding: '0.625rem 0 0.313rem 0',
            justifyContent: 'center',
        },
        digitalCollapsedTimer: {
            paddingTop: '0.438rem',
        },
        '.MuiButtonBase-root.MuiButton-root.MuiButton-contained': {
            borderRadius: '0.188rem',
            textTransform: 'capitalize',
            fontSize: '0.875rem',
        },
        carControlPanelContainer: {
            margin: '0 0.188rem 0.5rem 0.188rem',
        },
        buttonControls: {
            margin: '0.563rem',
            padding: '0.563rem 1.25rem',
        },
        skillQueueNameContainer: {
            font: `normal normal 600 0.75rem/1.063rem ${(_71 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _71 === void 0 ? void 0 : _71.fontFamily}`,
            color: (_73 = (_72 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _72 === void 0 ? void 0 : _72.text) === null || _73 === void 0 ? void 0 : _73.secondary,
            padding: '0.124rem',
            letterSpacing: '0rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre',
        },
        newBox: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        boxReject: {
            height: '5rem',
            width: '100%',
            borderLeft: '4px solid red',
            borderRadius: '0.313rem 0 0 0.313rem',
            padding: '1.563rem 0.625rem 0.625rem 0.625rem',
            textAlign: 'left',
            fontWeight: 'bold',
            backgroundColor: (_75 = (_74 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _74 === void 0 ? void 0 : _74.background) === null || _75 === void 0 ? void 0 : _75.rejectBox,
            position: 'relative',
            animation: `${slide} 2.4s 1 linear forwards`,
        },
        hungUpContainer: {
            width: '100%',
            height: '18.5rem',
            justifyContent: 'space-around',
            alignItems: 'center',
            boxShadow: 'none',
            backgroundColor: (_77 = (_76 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _76 === void 0 ? void 0 : _76.background) === null || _77 === void 0 ? void 0 : _77.default,
            position: 'relative',
            animation: `${slide} 2.4s 1 linear forwards`,
            padding: '0.438rem 1.563rem 0.438rem 1.563rem',
            borderRadius: '0.313rem 0 0 0.313rem',
        },
        hungUpClass: {
            height: '4.375rem',
            transition: 'all 0.35s ease-out',
        },
        hungUpAnimation: {
            marginRight: '0.4rem',
            marginLeft: '0.4rem',
            backgroundColor: (_79 = (_78 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _78 === void 0 ? void 0 : _78.background) === null || _79 === void 0 ? void 0 : _79.default,
        },
        animate: {
            animation: `${animated} 0.8s 1 linear forwards`,
        },
        globeIconWrapper: {
            width: '0',
            height: '0',
            position: 'absolute',
            borderTopLeftRadius: '4px',
            zIndex: '1',
        },
        expandedGlobeIconWrapper: {
            borderTop: `36px solid ${(_81 = (_80 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _80 === void 0 ? void 0 : _80.background) === null || _81 === void 0 ? void 0 : _81.darkYellow}`,
            borderRight: '35px solid transparent',
            marginLeft: '0.25rem',
        },
        collapsedGlobeIconWrapper: {
            borderTop: `29px solid ${(_83 = (_82 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _82 === void 0 ? void 0 : _82.background) === null || _83 === void 0 ? void 0 : _83.darkYellow}`,
            borderRight: '29px solid transparent',
            marginLeft: '0',
        },
        globeIconCollapsed: {
            transform: 'translate(5%, -195%)',
            position: 'absolute',
        },
        globeIconExpanded: {
            transform: 'translate(15%, -230%)',
            position: 'absolute',
        },
    };
    return styles;
};
export default ccfAssignmentCardStyle;
//# sourceMappingURL=ccf-assignment-card.style.js.map