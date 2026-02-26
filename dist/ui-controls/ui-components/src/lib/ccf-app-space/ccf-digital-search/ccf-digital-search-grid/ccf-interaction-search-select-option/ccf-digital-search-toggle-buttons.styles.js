import { Block } from '@mui/icons-material';
/**
 * style object for ccf-interaction-search-assignment
 * @returns CcfDigitalSearchToggleButtonsStyle style object
 * @example CcfDigitalSearchToggleButtonsStyle(theme)
 */
const CcfDigitalSearchToggleButtonsStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    const styles = {
        headerContainer: {
            display: 'flex',
            width: '100%',
            gap: '1rem',
            flexDirection: 'row',
            [(_a = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _a === void 0 ? void 0 : _a.down('xl')]: {
                flexDirection: 'column',
            },
        },
        parentTabBox: {
            margin: '0.625rem 0.938rem',
        },
        bulkModificationButtons: {
            width: '100%',
            'button.MuiToggleButton-root': {
                border: 'none !important',
                color: `${theme.palette.text.clearText} !important`,
                height: '2rem',
                padding: '5px',
                margin: '0',
                marginRight: '3%',
            },
            '.MuiToggleButton-root.Mui-selected': {
                color: `${theme.palette.text.clearText} !important`,
                backgroundColor: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.main,
                padding: '5px',
            },
        },
        tabHeading: {
            fontWeight: '600',
            fontSize: theme.typography.h5.fontSize,
        },
        agentListSelect: {
            width: '5.5rem',
            fontSize: theme.typography.h4.fontSize,
            overflow: 'hidden',
            height: '2rem',
            lineHeight: '1.6rem',
            color: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.secondary) === null || _e === void 0 ? void 0 : _e.main,
            background: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.background) === null || _g === void 0 ? void 0 : _g.paper,
        },
        menuItemStyle: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'flex',
        },
        listItemStyle: {
            '.MuiListItemText-primary': {
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.text.filter,
            },
        },
        subHeaderStyle: {
            alignSelf: 'start',
            fontWeight: '600',
            color: theme.palette.text.contrastText,
            fontSize: theme.typography.h6.fontSize,
            marginBottom: '0.5rem',
        },
        actionButton: {
            padding: '4px 19px',
            fontSize: theme.typography.h5.fontSize,
            width: '5.5rem',
            height: '1.875rem',
        },
        tabContainer: {
            display: 'flex',
            flexDirection: 'column',
            margin: '1rem 0',
        },
        icon: {
            fontSize: theme.typography.h3.fontSize,
            marginLeft: '4px',
        },
        assignDropdown: {
            width: '17rem',
            background: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.paper,
        },
        statusMenuItem: {
            fontSize: theme.typography.h5.fontSize,
            color: theme.palette.text.filter,
        },
        statusMessage: {
            display: 'inline',
            marginTop: '.5rem',
            alignSelf: 'start',
            fontSize: theme.typography.h5.fontSize,
            width: '100%',
        },
        statusInput: {
            background: (_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.background) === null || _l === void 0 ? void 0 : _l.paper,
            maxWidth: '332px',
            width: '100%',
            height: '32px',
            '.MuiSelect-select': {
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.text.filter,
                minHeight: 'auto !important',
            },
            '.MuiInputBase-root': {
                height: '32px',
            },
        },
        interactionReplyBox: {
            margin: '0',
            [(_m = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _m === void 0 ? void 0 : _m.down('md')]: {
                width: '100%',
            },
        },
        bulkReplyInput: {
            '#Bulk-text-input': {
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.text,
                height: '97px',
                background: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper,
            },
        },
        bulkReplyHeader: {
            display: Block,
            width: '100%',
            gap: '1rem',
        },
        interactionbuttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.header,
            '#interactionReplySendButton': {
                width: '80px',
                height: '32px',
            },
            '#interaction-text-caption': {
                fontSize: theme.typography.h5.fontSize,
            },
        },
        alignButton: {
            color: `${theme.palette.grey[800]}`,
            minWidth: '34px',
            marginRight: '0.2rem',
            '&:hover': {
                backgroundColor: `${theme.palette.action.hover}`,
            },
            padding: 0,
        },
        alignButtonActive: {
            background: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.main,
        },
        interactionleftSideBox: {
            justifyContent: 'flex-start',
            height: '40px',
        },
        assignToMenuItem: {
            maxWidth: '17rem',
            fontSize: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _u === void 0 ? void 0 : _u.h6) === null || _v === void 0 ? void 0 : _v.fontSize,
            maxHeight: '18.75rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        assignToListItem: {
            fontSize: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _w === void 0 ? void 0 : _w.h5) === null || _x === void 0 ? void 0 : _x.fontSize,
            color: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.filter,
        },
        assignToSomeoneHeader: {
            fontWeight: 700,
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.filter,
            fontSize: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _2 === void 0 ? void 0 : _2.h5) === null || _3 === void 0 ? void 0 : _3.fontSize,
            marginLeft: '-0.438rem',
        },
        backIcon: {
            color: theme.palette.text.clearText,
            width: '1rem',
            transform: 'rotate(180deg)',
            margin: '0 5px 0 -5px',
        },
        downIcon: {
            color: theme.palette.text.clearText,
            width: '1rem',
            transform: 'rotate(-90deg)',
            margin: '0 5px 8px 0',
        },
        nonClosedCaseText: {
            fontWeight: 'bold',
            fontSize: theme.typography.h5.fontSize,
        },
        closedCaseText: {
            fontWeight: 'bold',
            paddingRight: '3px',
            fontSize: theme.typography.h5.fontSize,
        },
        messageWrapper: {
            display: 'flex',
            alignItems: 'end',
            marginTop: '1rem',
            marginLeft: '-7px',
        },
    };
    return styles;
};
export default CcfDigitalSearchToggleButtonsStyle;
//# sourceMappingURL=ccf-digital-search-toggle-buttons.styles.js.map