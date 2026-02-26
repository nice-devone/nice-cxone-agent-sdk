/**
 * style object for ccf-digital-grid
 * @returns CcfDigitalGridStyle object
 * @example CcfDigitalGridStyle()
 */
const CcfDigitalSearchGridStyle = ({ theme, selections, isLoading, maximumRowSelection, maxRowSelectionAllowed, enableRowCursor, isKebabMenuPinned }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21;
    const styles = {
        dataGridContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: selections.length > 0 ? '0 0 0 0' : '1rem 0 0 0',
            background: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.header,
            position: isKebabMenuPinned ? 'relative' : 'static',
        },
        dataGridStyles: Object.assign({ background: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper, minHeight: '300px', '.columnColor': {
                color: `${theme.palette.text.primary}`,
            }, '.columnCapitalize': {
                textTransform: 'capitalize',
            }, '.MuiDataGrid-columnHeaders': {
                color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText,
                borderBottom: '0.3125rem solid ' + ((_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.LogoColor),
                fontWeight: '600',
                boxShadow: '0px 0.0625rem 0.0625rem ' + ((_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.boxshadow) === null || _k === void 0 ? void 0 : _k.main),
                '.MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 600,
                    fontSize: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.h5) === null || _m === void 0 ? void 0 : _m.fontSize,
                },
                '.MuiDataGrid-columnHeader': {
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                },
            }, '.MuiDataGrid-footerContainer': {
                button: {
                    pointerEvents: isLoading ? 'none' : 'auto',
                    opacity: isLoading ? 0.3 : 1,
                    '.MuiTouchRipple-root': {
                        display: 'none',
                    },
                },
                '.MuiTouchRipple-root': {
                    display: 'none',
                },
                '.MuiIconButton-root:not(.Mui-disabled)': {
                    color: (_p = (_o = theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.clearText,
                    '&:hover': {
                        backgroundColor: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.PaginationHover,
                    },
                    '&:focus': {
                        backgroundColor: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.background) === null || _t === void 0 ? void 0 : _t.PaginationFocus,
                    },
                    '&:focus-visible': {
                        backgroundColor: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.PaginationHover,
                        outline: `.0625rem solid ${(_x = (_w = theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.menuItemHighlight}`,
                    },
                },
            }, '.MuiDataGrid-root .MuiDataGrid-row .MuiDataGrid-cell': maxRowSelectionAllowed && (selections === null || selections === void 0 ? void 0 : selections.length) >= maxRowSelectionAllowed
                ? {
                    overflow: 'visible',
                }
                : {}, '.MuiDataGrid-row': Object.assign({ borderTop: '0.1875rem solid ' + ((_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.LogoColor), borderBottom: '0.1875rem solid ' + ((_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.background) === null || _1 === void 0 ? void 0 : _1.LogoColor), color: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.contrastText, fontWeight: '400', fontSize: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _4 === void 0 ? void 0 : _4.h4) === null || _5 === void 0 ? void 0 : _5.fontSize, lineHeight: '125%', cursor: enableRowCursor ? 'pointer' : 'default', '&:hover,.Mui-hovered': {
                    backgroundColor: `${(_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.tableRowHover} !important`,
                }, '.MuiCheckbox-colorPrimary:not(.Mui-checked) ': maxRowSelectionAllowed && selections.length >= maxRowSelectionAllowed
                    ? {
                        cursor: 'not-allowed',
                        '.MuiSvgIcon-root': {
                            opacity: 0.3,
                        },
                        ':hover::after': {
                            content: `"${maxRowSelectionAllowed} ${maximumRowSelection}"`,
                            position: 'absolute',
                            top: '100%',
                            left: '100%',
                            padding: '0.125rem 0.3125rem',
                            background: (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.text) === null || _9 === void 0 ? void 0 : _9.black,
                            color: (_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.background) === null || _11 === void 0 ? void 0 : _11.main,
                            fontSize: '.7rem',
                            opacity: 0.8,
                        },
                    }
                    : {} }, Object.entries({
                new: theme.palette.digitalStatus.newDark,
                open: theme.palette.digitalStatus.openDark,
                pending: theme.palette.digitalStatus.pendingDark,
                escalated: theme.palette.digitalStatus.escalatedDark,
                resolved: theme.palette.digitalStatus.resolvedDark,
                closed: theme.palette.digitalStatus.closedDark,
            }).reduce((styleMap, [status, color]) => {
                styleMap[`[title="${status}"]`] = {
                    '::before': {
                        content: '""',
                        display: 'inline-block',
                        width: '0.6rem',
                        height: '0.6rem',
                        borderRadius: '50%',
                        marginRight: '0.5rem',
                        backgroundColor: color,
                    },
                };
                return styleMap;
            }, {})), '.MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
                border: `0.013rem solid ${(_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.text) === null || _13 === void 0 ? void 0 : _13.noteLabel}`,
            } }, (isKebabMenuPinned
            ? {
                '& .MuiDataGrid-row:hover, & .MuiDataGrid-row:hover .MuiDataGrid-cell.sticky-right-column': {
                    backgroundColor: (_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.grid) === null || _15 === void 0 ? void 0 : _15.hover,
                },
                '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell.sticky-right-column': {
                    backgroundColor: (_17 = (_16 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _16 === void 0 ? void 0 : _16.grid) === null || _17 === void 0 ? void 0 : _17.selected,
                },
                '& .MuiDataGrid-row.Mui-selected:hover, & .MuiDataGrid-row.Mui-selected:hover .MuiDataGrid-cell.sticky-right-column': {
                    backgroundColor: (_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.grid) === null || _19 === void 0 ? void 0 : _19.selectedHover,
                },
                '& .MuiDataGrid-cell.sticky-right-column': {
                    position: 'sticky',
                    right: 0,
                    zIndex: 101,
                    padding: '0 16px',
                    borderBottom: '0.375rem solid ' + ((_21 = (_20 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _20 === void 0 ? void 0 : _20.background) === null || _21 === void 0 ? void 0 : _21.LogoColor),
                    backgroundColor: 'background.paper',
                },
            }
            : {})),
    };
    return styles;
};
export default CcfDigitalSearchGridStyle;
//# sourceMappingURL=ccf-digital-search-grid-styles.js.map