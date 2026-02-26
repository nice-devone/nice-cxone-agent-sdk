/**
 * style object for ccf-agent-skills
 * @returns CcfAgentSkillsStyle object
 * @example CcfAgentSkillsStyle()
 */
const CcfAgentSkillsStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    const styles = {
        filterIcon: {
            width: '1rem',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.grey,
            cursor: 'pointer',
            paddingTop: '4px',
        },
        focusedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        filtersText: {
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.filter,
            fontSize: theme.typography.h5,
            fontWeight: 700,
        },
        selectedTxt: {
            width: '100%',
            '.MuiInputBase-input': { fontSize: theme.typography.h5 },
        },
        applyBtn: {
            boxShadow: 'none !important',
            height: '28px',
        },
        secondaryButton: {
            marginRight: '0.5rem',
            boxShadow: 'none !important',
            color: `${theme.palette.text.clearText} !important`,
            height: '28px',
        },
        boxBtn: {
            padding: '15px',
            width: '100%',
            display: 'flex',
            justifyItems: 'end',
            justifyContent: 'flex-end',
        },
        boxDropdown: {
            margin: '10px',
            fontSize: '13px',
            fontWeight: '400',
            marginLeft: '1rem',
            marginTop: '1rem',
        },
        selectedMenuItem: {
            '&:hover': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.menuItemHighlight,
            },
            '&.Mui-selected': {
                backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.action) === null || _k === void 0 ? void 0 : _k.selected,
                '&:hover': {
                    backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.grid) === null || _m === void 0 ? void 0 : _m.selectedHover,
                },
            },
            '&.Mui-focusVisible, &:focus': {
                outline: 'none',
                border: `0.0625rem solid ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.border) === null || _p === void 0 ? void 0 : _p.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        contentDiv: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0.6rem',
            marginLeft: '1rem',
            marginTop: '1rem',
        },
        tableStyle: {
            width: '100%',
            tableLayout: 'fixed',
        },
        tableHeadRow: {
            'td,th': {
                color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.primary,
                fontWeight: 600,
                textAlign: 'left',
                padding: '8px 16px',
                fontSize: '13px',
                background: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.paper,
            },
            borderBottom: '1.5px solid',
            borderBottomColor: theme.palette.text.messageText,
        },
        tableBodyRow: {
            'td, th': {
                fontSize: theme.typography.h5,
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        iconHeaderClasses: {
            marginLeft: '5px',
            color: 'black',
            fontWeight: 'normal',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        helperText: {
            textTransform: 'uppercase',
            fontSize: theme.typography.h5,
            fontWeight: '600',
            marginBottom: '3px',
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.black,
        },
        closebutton: {
            boxShadow: 'none',
        },
        infoIcon: {
            padding: '0px',
        },
        tooltip: {
            backgroundColor: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.paper,
            color: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.dark,
            boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.24)',
        },
        skillsTooltipArrow: {
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.background) === null || _1 === void 0 ? void 0 : _1.paper,
        },
        chipStyle: {
            width: 'fit-content',
            fontSize: '12px',
            border: '1px solid' + theme.palette.text.header,
            '&.MuiButtonBase-root': {
                marginLeft: '1rem',
                marginBottom: '0.6rem',
            },
            '&.Mui-focusVisible': {
                border: '2px solid' + theme.palette.text.header,
            },
        },
        noSkillsFound: {
            marginTop: '3.75rem',
            fontSize: theme.typography.h4,
            color: theme.palette.text.noResult,
            fontWeight: '700',
        },
        btnText: {
            fontSize: '0.813rem',
            fontWeight: '600',
        },
    };
    return styles;
};
export default CcfAgentSkillsStyle;
//# sourceMappingURL=ccf-agent-skills.styles.js.map