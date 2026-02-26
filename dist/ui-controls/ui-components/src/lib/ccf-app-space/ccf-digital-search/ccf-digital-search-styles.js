/**
 * style object for ccf-digital-search
 * @returns CcfDigitalSearchStyle object
 * @example CcfDigitalSearchStyle()
 */
const CcfDigitalSearchStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47;
    const styles = {
        gridItemInContainer: {
            height: 'calc(100% - 80px)',
            '& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted):hover .MuiDataGrid-sortIcon': {
                opacity: '1 !important',
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
                '.MuiIconButton-root:not(.Mui-disabled)': {
                    color: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.clearText,
                    '.MuiTouchRipple-root': {
                        display: 'none',
                    },
                    '&:hover': {
                        backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.PaginationHover,
                    },
                    '&:focus': {
                        backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.PaginationFocus,
                    },
                    '&:focus-visible': {
                        backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.PaginationHover,
                        outline: `.0625rem solid ${(_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight}`,
                    },
                },
                '.MuiTouchRipple-root': {
                    display: 'none',
                },
            },
        },
        interactionSearchTitle: {
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.searchTitle,
            fontWeight: 600,
            fontSize: '.8rem',
            lineHeight: '1.188rem',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.border) === null || _p === void 0 ? void 0 : _p.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        searchInput: {
            input: {
                padding: '0.4rem 0.313rem 0.4rem 0.6rem',
            },
            button: {
                padding: '0',
                margin: '0 .5rem',
            },
            width: '100%',
            '& .MuiInputBase-adornedStart': {
                paddingLeft: '0.3rem',
            },
            '& .MuiInputBase-adornedEnd': {
                paddingRight: '0rem',
            },
            '& .MuiOutlinedInput-input': {
                padding: '0.32rem 0.65rem',
                fontSize: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _q === void 0 ? void 0 : _q.h5) === null || _r === void 0 ? void 0 : _r.fontSize,
                '&::placeholder': {
                    color: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.placeholder,
                    opacity: 1,
                },
            },
            '& .MuiOutlinedInput-notchedOutline': {
                paddingRight: 0,
            },
            '& svg': {
                right: '0rem',
            },
        },
        menuOptions: {
            fontSize: '0.75rem',
            fontWeight: 800,
        },
        listSubheader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            paddingRight: '0.5rem',
            alignItems: 'center',
        },
        customizeText: {
            fontWeight: 700,
            color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.black,
            fontSize: '.8125rem',
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.black,
            padding: 0,
            margin: 0,
            border: `2px solid ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.transparent}`,
            boxShadow: 'none',
            minWidth: 'auto',
            '&:focus,&:hover,&:focus-visible': {
                border: `2px solid ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.black}`,
                boxShadow: 'none',
            },
            '& svg': {
                fontSize: '1.25rem',
                fontWeight: 'bolder',
                width: 'auto',
            },
        },
        menuItem: {
            cursor: 'grab',
            padding: '0 0.5rem',
        },
        divider: {
            borderColor: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.grey,
        },
        menu: {
            '& .MuiMenu-paper': {
                border: `1px solid ${(_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.text) === null || _5 === void 0 ? void 0 : _5.grey}`,
                '&::-webkit-scrollbar': {
                    width: '0.3rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.scrollThumb,
                    borderRadius: '2rem',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.background) === null || _9 === void 0 ? void 0 : _9.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.background) === null || _11 === void 0 ? void 0 : _11.scrollThumbHover,
                },
                '& .MuiMenu-list': {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
        },
        contactInfo: {
            zIndex: 1,
            position: 'absolute',
            bottom: 0,
            right: 0,
            border: `0.063rem solid ${(_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.border) === null || _13 === void 0 ? void 0 : _13.main}`,
            margin: '0.625rem',
            width: '30%',
            maxHeight: '70%',
            overflowY: 'scroll',
            backgroundColor: (_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.text) === null || _15 === void 0 ? void 0 : _15.white,
            [theme.breakpoints.down(480)]: {
                width: '60%',
            },
        },
        searchBox: {
            display: 'flex',
            width: '100%',
            color: (_17 = (_16 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _16 === void 0 ? void 0 : _16.secondary) === null || _17 === void 0 ? void 0 : _17.main,
            background: (_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.background) === null || _19 === void 0 ? void 0 : _19.paper,
        },
        searchOption: {
            height: '1.6rem',
            lineHeight: '1.6rem',
            fontSize: '0.8rem',
            color: (_21 = (_20 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _20 === void 0 ? void 0 : _20.secondary) === null || _21 === void 0 ? void 0 : _21.main,
        },
        searchOptionControl: {
            width: '4.8rem',
        },
        searchOptionList: {
            fontSize: '0.8rem',
        },
        searchCloseIcon: {
            color: (_23 = (_22 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _22 === void 0 ? void 0 : _22.secondary) === null || _23 === void 0 ? void 0 : _23.main,
        },
        smKebabMenu: {
            display: 'flex',
            justifyContent: 'space-between',
            '& label': {
                color: (_25 = (_24 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _24 === void 0 ? void 0 : _24.text) === null || _25 === void 0 ? void 0 : _25.secondary,
            },
            '& svg': {
                marginLeft: '-0.5rem',
            },
        },
        kebabMenuBtnWrapper: {
            display: 'flex',
            gap: 1,
        },
        kebabMenuBtn: {
            width: 'auto',
            height: '1.875rem',
            padding: '0.563rem 1.25rem 0.563rem 1.125rem',
            color: (_27 = (_26 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _26 === void 0 ? void 0 : _26.text) === null || _27 === void 0 ? void 0 : _27.searchTitle,
            borderColor: (_29 = (_28 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _28 === void 0 ? void 0 : _28.border) === null || _29 === void 0 ? void 0 : _29.main,
            alignContent: 'center',
            fontSize: '0.688rem',
            fontWeight: 800,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            background: (_31 = (_30 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _30 === void 0 ? void 0 : _30.text) === null || _31 === void 0 ? void 0 : _31.white,
        },
        filterIcon: {
            width: '0.8rem',
            color: (_33 = (_32 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _32 === void 0 ? void 0 : _32.text) === null || _33 === void 0 ? void 0 : _33.grey,
        },
        columnIcon: {
            display: 'flex',
            marginRight: '0.5rem',
        },
        customerBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        customerIcon: {
            height: '2.25rem',
            width: '2.25rem',
            borderRadius: '0.125rem',
            marginRight: '0.25rem',
        },
        //common styles for all digital search tabs
        parentContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0.625rem 0.938rem',
        },
        gridBackground: {
            backgroundColor: (_35 = (_34 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _34 === void 0 ? void 0 : _34.background) === null || _35 === void 0 ? void 0 : _35.header,
        },
        buttonsAndSearchBox: {
            display: 'flex',
            gap: 1,
        },
        showMessage: {
            display: 'flex',
            justifyCcontent: 'center',
            alignItems: 'center',
            openArrow: {
                fontSize: '1rem',
            },
        },
        textWithEllipsis: {
            width: '2.188rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        tags: {
            padding: '0 0.2rem 0 0',
        },
        showCursor: {
            cursor: 'pointer',
        },
        listBox: {
            '& .MuiPaper-root': {
                border: `1px solid ${(_37 = (_36 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _36 === void 0 ? void 0 : _36.text) === null || _37 === void 0 ? void 0 : _37.grey}`,
                '&::-webkit-scrollbar': {
                    width: '0.3rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (_39 = (_38 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _38 === void 0 ? void 0 : _38.background) === null || _39 === void 0 ? void 0 : _39.scrollThumb,
                    borderRadius: '2rem',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: (_41 = (_40 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _40 === void 0 ? void 0 : _40.background) === null || _41 === void 0 ? void 0 : _41.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (_43 = (_42 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _42 === void 0 ? void 0 : _42.background) === null || _43 === void 0 ? void 0 : _43.scrollThumbHover,
                },
            },
        },
        filterCustomizeButton: {
            float: 'right',
            flexDirection: 'row-reverse',
            gap: '0.25rem',
            paddingRight: '0.5rem',
        },
        loadMoreButton: {
            color: (_45 = (_44 = theme.palette) === null || _44 === void 0 ? void 0 : _44.text) === null || _45 === void 0 ? void 0 : _45.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        dropdownOptionsCount: {
            color: (_47 = (_46 = theme.palette) === null || _46 === void 0 ? void 0 : _46.text) === null || _47 === void 0 ? void 0 : _47.header,
            fontSize: '0.75rem',
            fontWeight: 500,
            marginLeft: '1.563rem',
            lineHeight: '0.938rem',
            padding: '0.313rem 0 0.313rem 0',
        },
    };
    return styles;
};
export default CcfDigitalSearchStyle;
//# sourceMappingURL=ccf-digital-search-styles.js.map