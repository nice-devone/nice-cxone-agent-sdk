/**
 * Styling for CcfAgentCopilotTaskAssist
 * @returns CcfAgentCopilotTaskAssist CSS properties as a JSON object
 * @example CcfAgentCopilotTaskAssistStyles(theme)
*/
const CcfAgentCopilotTaskAssistStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
    const commonTextStyles = {
        fontWeight: 600,
        letterSpacing: '0.5px',
    };
    const listItemStyles = {
        mb: 1.5,
        borderRadius: 1,
        border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.lightGray}`,
        padding: 1,
        backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.callControlHeader,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.action) === null || _f === void 0 ? void 0 : _f.hover,
        },
    };
    return {
        button: {
            padding: '0',
            width: '30px',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.primary,
            borderColor: (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.divider,
            '& span': {
                margin: '0',
            },
        },
        sparklesIcon: {
            height: '2rem',
            width: '2rem',
        },
        popover: {
            transform: 'translate(-1rem, -3.5rem)',
        },
        popoverPaper: {
            width: '19.875rem',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
            backgroundColor: (_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.background) === null || _l === void 0 ? void 0 : _l.callControlHeader,
        },
        headerTitle: {
            display: 'flex',
            alignItems: 'center',
        },
        taskList: {
            maxHeight: '30vh',
            minHeight: '30vh',
            overflowY: 'auto',
            padding: 2,
            paddingTop: 0.5,
            '&::-webkit-scrollbar': {
                width: '0.3rem',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.background) === null || _o === void 0 ? void 0 : _o.scrollThumb,
                borderRadius: '2rem',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: (_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.background) === null || _q === void 0 ? void 0 : _q.scrollTrack,
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: (_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.background) === null || _s === void 0 ? void 0 : _s.scrollThumbHover,
            },
        },
        sparklesIconHeader: {
            marginTop: 1,
            marginLeft: 1,
        },
        headerText: Object.assign(Object.assign({}, commonTextStyles), { marginLeft: 1 }),
        displayName: Object.assign(Object.assign({}, commonTextStyles), { fontSize: (_u = (_t = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _t === void 0 ? void 0 : _t.h6) === null || _u === void 0 ? void 0 : _u.fontSize, color: (_w = (_v = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _v === void 0 ? void 0 : _v.text) === null || _w === void 0 ? void 0 : _w.filter, paddingBottom: 0.5 }),
        intentDescription: {
            fontWeight: 400,
            fontSize: (_y = (_x = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _x === void 0 ? void 0 : _x.h6) === null || _y === void 0 ? void 0 : _y.fontSize,
            color: (_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.text) === null || _0 === void 0 ? void 0 : _0.filter,
        },
        listItem: Object.assign({}, listItemStyles),
        listItemError: Object.assign(Object.assign({}, listItemStyles), { cursor: 'default', backgroundColor: `${(_2 = (_1 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _1 === void 0 ? void 0 : _1.background) === null || _2 === void 0 ? void 0 : _2.callControls}30`, '&:hover': {
                backgroundColor: 'none',
            } }),
        errorName: Object.assign(Object.assign({}, commonTextStyles), { fontSize: (_4 = (_3 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _3 === void 0 ? void 0 : _3.h6) === null || _4 === void 0 ? void 0 : _4.fontSize, color: (_6 = (_5 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _5 === void 0 ? void 0 : _5.error) === null || _6 === void 0 ? void 0 : _6.dark }),
        errorDescription: {
            fontWeight: 400,
            fontSize: (_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _7 === void 0 ? void 0 : _7.h6) === null || _8 === void 0 ? void 0 : _8.fontSize,
            color: (_10 = (_9 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _9 === void 0 ? void 0 : _9.error) === null || _10 === void 0 ? void 0 : _10.light,
        },
        searchBox: {
            maxHeight: '50vh',
            overflowY: 'auto',
            padding: 2,
            paddingBottom: '0',
            paddingRight: 2.5,
        },
        copilotContent: {
            color: (_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.text) === null || _12 === void 0 ? void 0 : _12.contrastText,
            border: `0.063rem solid ${(_14 = (_13 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _13 === void 0 ? void 0 : _13.background) === null || _14 === void 0 ? void 0 : _14.copilotCardContent}`,
            margin: '0.625rem',
            borderRadius: '0.5rem',
            backgroundColor: (_16 = (_15 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _15 === void 0 ? void 0 : _15.background) === null || _16 === void 0 ? void 0 : _16.paper,
        },
        expandablePopover: {
            paper: {
                boxShadow: 'none',
                position: 'relative',
                marginRight: '0.625rem',
                marginBottom: '0.625rem',
                pointerEvents: 'auto',
            },
            container: {
                pointerEvents: 'none',
                transform: 'translate(0rem, -4rem)',
                '& .MuiBackdrop-root': {
                    backgroundColor: 'transparent',
                },
            },
            closeButton: {
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                zIndex: 1,
            },
        },
    };
};
export default CcfAgentCopilotTaskAssistStyles;
//# sourceMappingURL=ccf-agent-copilot-task-assist.styles.js.map