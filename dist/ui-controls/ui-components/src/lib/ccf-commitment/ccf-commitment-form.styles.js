/**
 * return styles used for the component
 * @example <directoryStyles />
 * @returns styles
 */
const ccfCommitmentStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
    return {
        formWrapper: {
            width: '100%',
            height: '100%',
            '>button, >button:hover': {
                border: '0',
                background: 'none',
                color: theme.palette.text.active,
                boxShadow: 'none',
                padding: '0',
                justifyContent: 'left',
            },
        },
        formWrapperLargeView: {
            height: 'calc(100% - 30px)',
            flexWrap: 'inherit',
        },
        titleContainer: {
            width: '100%',
        },
        formContainer: {
            width: '100%',
            padding: '0 8px',
            height: 'calc(100% - 52px)',
            overflowY: 'auto',
        },
        iconContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: '11px 0 0 8px',
            fontSize: theme.typography.h4,
            button: {
                padding: '0',
                fontSize: theme.typography.h3,
                svg: {
                    fontSize: theme.typography.h5,
                },
            },
            '>h5': {
                padding: '0',
            },
        },
        dividerStyles: {
            margin: '10px 0',
            width: '100%',
        },
        textFieldWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '49%',
        },
        formLabelBold: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText,
            fontSize: theme.typography.h5,
            fontWeight: theme.typography.fontWeightBold,
            paddingBottom: '5px',
        },
        formLabel: {
            padding: '0 0 8px 0',
            span: {
                fontSize: theme.typography.h5,
                padding: '0',
                input: {
                    padding: '0',
                },
            },
            label: {
                margin: '0',
                '.MuiFormControlLabel-label': {
                    padding: '0 15px 0 5px',
                },
            },
        },
        formLabelBoldRequired: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
            fontSize: theme.typography.h5,
            fontWeight: theme.typography.fontWeightBold,
            paddingBottom: '5px',
            '&::after': {
                content: '" *"',
                color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.asteriskRed,
            },
        },
        labelFont: {
            paddingTop: '5px',
            fontSize: theme.typography.h5,
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
            '&::after': {
                content: '" *"',
                color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.asteriskRed,
            },
        },
        datePicker: {
            '>div': {
                paddingRight: '13px',
                fontSize: theme.typography.h6,
            },
            button: {
                paddingRight: '0px',
                marginLeft: '-15px',
                '&:hover': {
                    backgroundColor: 'unset',
                },
            },
        },
        wrappperContainer: {
            padding: '20px 0 0 0',
        },
        contactStyles: {
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: '4px',
            fontSize: theme.typography.h5,
            padding: '8px 8px',
            textAlign: 'center',
            width: '20%',
            backgroundColor: theme.palette.background.default,
            height: 'fit-content',
        },
        buttonWrapper: {
            padding: '15px 0 10px 0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            gap: '10px',
        },
        timeZoneStyles: {
            fontSize: theme.typography.h5,
        },
        selectOption: {
            maxWidth: '20%',
        },
        textStyles: {
            fontSize: theme.typography.h5,
        },
        textFieldStyles: {
            input: {
                fontSize: theme.typography.h5,
            },
        },
        textAreaStyles: {
            textarea: {
                fontSize: theme.typography.h5,
            },
        },
        contactTextFieldStyles: {
            width: '78%',
            input: {
                fontSize: theme.typography.h5,
            },
        },
        helperTextStyles: {
            margin: 0,
        },
        menuItemStyle: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'block',
        },
        container: {
            display: 'flex',
            gap: '5px',
        },
        commitmentDetailsWrapper: {
            background: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.paper,
            height: 'auto',
            width: '260px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            '& p': {
                margin: '0',
                fontSize: '14px',
            },
            '& + Mui-Tooltip-arrow': {
                color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper,
                background: 'black',
            },
        },
        headingWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        tooltipArrow: {
            '& span.MuiTooltip-arrow': {
                color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.paper,
                '&::before': {
                    border: `1px solid ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.boxshadow) === null || _t === void 0 ? void 0 : _t.light}`,
                },
            },
        },
        heading: {
            fontWeight: '700',
            fontSize: '0.875rem !important',
            lineHeight: '1.5',
        },
        commitmentTitle: {
            textDecoration: 'underline',
            fontWeight: '600',
            fontSize: '14px',
        },
        detail: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        icon: {
            color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.secondary) === null || _v === void 0 ? void 0 : _v.main,
            height: '20px',
            width: '20px',
        },
        buttonWrapperTooltip: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10px',
            gap: '7px',
        },
        btn: {
            padding: '2px',
            '& p': {
                fontWeight: '600',
                fontSize: '14px',
            },
        },
        textArea: {
            '& div.MuiInputBase-root': {
                padding: '10px',
                marginBottom: '10px',
                fontSize: '14px',
            },
        },
        circle: {
            height: '16px',
            width: '16px',
            background: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.accent) === null || _x === void 0 ? void 0 : _x.main,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3px',
            '&::before': {
                content: '""',
                background: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.paper,
                height: '6px',
                width: '6px',
                borderRadius: '50%',
            },
        },
        circleIEX: {
            height: '16px',
            width: '16px',
            background: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.primary) === null || _1 === void 0 ? void 0 : _1.dark,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4px',
            '&::before': {
                content: '""',
                background: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.paper,
                height: '6px',
                width: '6px',
                borderRadius: '50%',
            },
        },
        notesHelperTextStyles: {
            margin: '0',
            marginBottom: '10px',
        },
        fcEventTitleContainer: {
            flexGrow: 0,
            paddingRight: '2px',
            width: '100%',
            marginLeft: '10px',
        },
        fcEventTitle: {
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '0.64rem',
            paddingLeft: '6px',
            paddingRight: '2px',
        },
        fcSticky: {
            position: 'static',
        },
        fcEventMainFrame: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        fcEventMainFrameBorder: {
            height: '100%',
            position: 'absolute',
            margin: '2px',
            left: '1px',
            top: '-2px',
        },
        commitmentNotes: {
            font: `normal normal 600 0.75rem/1.063rem ${(_4 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _4 === void 0 ? void 0 : _4.fontFamily}`,
            color: (_6 = (_5 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _5 === void 0 ? void 0 : _5.text) === null || _6 === void 0 ? void 0 : _6.secondary,
            padding: '0.125rem',
            paddingLeft: '0.500rem',
            letterSpacing: '0rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre',
        },
        commitmentControls: {
            display: 'flex',
            gap: '5px',
            padding: '10px',
        },
        commitmentControlButton: {
            '>p': {
                fontSize: '14px',
            },
        },
        commitmentControlsSmallView: {
            gap: '5px',
            padding: '10px',
            marginLeft: 'auto',
        },
        commitmentControlButtonSmallView: {
            [theme.breakpoints.down('md')]: {
                width: '6rem',
            },
            width: '7rem',
            height: '2.5rem',
            margin: '5px',
        },
        deleteIconButton: {
            padding: '2px',
        },
        disabled: {
            backgroundColor: (_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _7 === void 0 ? void 0 : _7.background) === null || _8 === void 0 ? void 0 : _8.default,
        },
        tooltip: {
            '&.MuiTooltip-tooltip': {
                backgroundColor: (_10 = (_9 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _9 === void 0 ? void 0 : _9.background) === null || _10 === void 0 ? void 0 : _10.paper,
                color: (_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.text) === null || _12 === void 0 ? void 0 : _12.black,
                fontSize: (_13 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _13 === void 0 ? void 0 : _13.h5,
                border: `1px solid ${(_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.boxshadow) === null || _15 === void 0 ? void 0 : _15.light}`,
            },
        },
        customerName: {
            font: `normal normal bold 0.875rem/1.188rem ${(_16 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _16 === void 0 ? void 0 : _16.fontFamily}`,
            display: 'block',
            padding: '0.124rem',
            letterSpacing: '0rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre',
        },
        cardHeader: {
            display: 'flex',
            flexDirection: 'row',
        },
        channelDetail2: {
            display: 'flex',
            flexDirection: 'row',
            font: `normal normal 600 0.75rem/1.063rem ${(_17 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _17 === void 0 ? void 0 : _17.fontFamily}`,
            color: (_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.text) === null || _19 === void 0 ? void 0 : _19.secondary,
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
        mediaIcon: {
            fill: (_21 = (_20 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _20 === void 0 ? void 0 : _20.info) === null || _21 === void 0 ? void 0 : _21.light,
            width: '2.2rem',
            height: '2.2rem',
            verticalAlign: 'bottom',
            marginLeft: '10px',
            marginRight: '5px',
        },
        directionIcon: {
            marginLeft: '-0.25rem',
            marginRight: '-0.188rem',
        },
    };
};
export default ccfCommitmentStyles;
//# sourceMappingURL=ccf-commitment-form.styles.js.map