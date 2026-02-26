import { SEND_MESSAGE } from './ccf-approval-menu';
/**
 * style object for ccf-approval-menu
 * @returns CcfApprovalMenuStyles styles object
 * ```
 * @example
 * <CcfApprovalMenuStyles/>
 * ```
 */
const CcfApprovalMenuStyles = (theme, queue) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const styles = {
        approvalBtnGroup: {
            marginRight: '6px',
        },
        searchIcon: {
            paddingRight: 0,
            marginRight: 0,
        },
        sendMessageText: {
            paddingLeft: 0,
        },
        queueDivider: {
            marginBottom: '4px',
        },
        noResultsMessage: {
            width: '100%',
            height: '120px',
        },
        sendRequestBtn: {
            borderRadius: '.25rem 0 0 .25rem',
        },
        requestApprovalBtnContainer: {
            borderLeft: '1px solid',
        },
        requestApprovalBtn: {
            padding: '6px 10px',
            borderRadius: '0 .25rem .25rem 0',
            height: '100%',
        },
        focusedElement: {
            border: '0.125rem solid transparent !important',
            '&:focus': {
                borderColor: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}!important`,
                borderRadius: '0.25rem',
            },
        },
        menu: {
            '& .MuiMenu-paper': {
                width: queue === SEND_MESSAGE ? '152px' : '172px',
                maxHeight: '410px',
                border: `1px solid ${theme.palette.text.grey}`,
                '&::-webkit-scrollbar': {
                    width: '0.6rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.scrollThumb,
                    borderRadius: '2rem',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.scrollThumbHover,
                },
                '& .MuiMenu-list': {
                    paddingTop: 0,
                    background: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper,
                },
            },
            '& .MuiMenuItem-root': {
                color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            },
            '& .MuiListSubheader-root': {
                position: 'sticky',
                bottom: 0,
                '& .Mui-selected': {
                    background: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.selectedQueue,
                },
            },
            '& .Mui-selected': {
                background: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.selectedQueue,
            },
        },
        revampButtonGroup: {
            marginRight: '0.375rem',
            height: '1.75rem',
            minWidth: queue === SEND_MESSAGE ? '10rem' : '11rem',
        },
    };
    return styles;
};
export default CcfApprovalMenuStyles;
//# sourceMappingURL=ccf-approval-menu-styles.js.map