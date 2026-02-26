/**
 * @example styles for pop over component
 */
export const ccfContactAssignmentStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return {
        popOverCollapsed: {
            '.MuiPaper-root': { left: '65px !important' },
        },
        popOver: {
            '.MuiPaper-root': { left: '60px !important' },
        },
        popOverCollapsedNotSmView: {
            '.MuiPaper-root': { left: '125px !important' },
        },
        container: {
            display: 'flex',
            height: '100%',
            position: 'relative',
            boxSizing: 'border-box',
            backgroundColor: '#e3e9ee',
        },
        expandedInbox: {
            backgroundColor: '#e3e9ee',
            transition: 'all 0.3s ease',
            width: '100%',
        },
        collapsedInbox: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            transition: 'all 0.3s ease',
        },
        assignmentHeaderExpanded: {
            padding: '0.688rem 0.5rem 0.625rem 0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        assignmentHeaderCollapsed: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '150px',
            flexDirection: 'column',
        },
        collapseIcon: {
            cursor: 'pointer',
        },
        expandIcon: Object.assign(Object.assign({ cursor: 'pointer', transform: 'rotate(180deg)' }, (theme.direction === 'ltr' && {
            transform: 'scale(-1, -1)',
        })), (theme.direction === 'rtl' && {
            transform: 'scale(1, 1)',
        })),
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        cardsContainer: {
            overflow: 'auto',
            paddingTop: '0.063rem',
            boxSizing: 'border-box',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        cardContainerCollpased: {
            height: 'calc(100% - 67px)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            '&.upAndDownArrow': {
                height: 'calc(100% - 67px - 40px)',
                '&.isSortIconPresent': {
                    height: 'calc(100% - 67px - 40px - 32px)',
                },
            },
            '&.upOrDownArrow': {
                height: 'calc(100% - 67px - 20px)',
                '&.isSortIconPresent': {
                    height: 'calc(100% - 67px - 20px - 32px)',
                },
            },
            '&.isSortIconPresent': {
                height: 'calc(100% - 67px - 32px)',
            },
        },
        cardContainerExpanded: {
            width: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            height: 'calc(100% - 45px)',
            '&.upAndDownArrow': {
                height: 'calc(100% - 45px - 40px)',
            },
            '&.upOrDownArrow': {
                height: 'calc(100% - 45px - 20px)',
            },
        },
        noAssignmentDivCollapsed: {
            width: '100%',
            textAlign: 'center',
            boxSizing: 'border-box',
        },
        noAssignmentDivExpanded: {
            textAlign: 'center',
            boxSizing: 'border-box',
        },
        inboundOutboundIcons: {
            display: 'block',
            margin: 'auto',
        },
        inboundOutboundIconsModified: {
            display: 'block',
            margin: 'auto',
            marginLeft: '0.188rem',
        },
        newInboundOutboundIcons: {
            display: 'block',
            margin: 'auto',
            marginLeft: '0.375rem',
        },
        MuiIconButtonRootPopOverOverflow: {
            padding: 0,
        },
        iconDownArrowContainer: {
            display: 'flex',
            width: '100%',
            boxSizing: 'content-box',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20px',
        },
        iconUpArrowContainer: {
            display: 'flex',
            width: '100%',
            boxSizing: 'content-box',
            transform: 'rotate(180deg)',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20px',
        },
        svgIcon: {
            width: '0.6em',
            height: '0.6em',
        },
        footerContainer: {
            width: '100%',
            position: 'absolute',
            bottom: '0px',
            zIndex: '2',
        },
        ovrflowDownArrow: {
            backgroundColor: `${theme.palette.background.paper}`,
            boxShadow: `0px -1px 1px 0px ${(_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.boxshadow) === null || _d === void 0 ? void 0 : _d.main}`,
            stroke: `${(_e = theme.palette) === null || _e === void 0 ? void 0 : _e.grey[500]}`,
        },
        ovrflowUpArrow: {
            backgroundColor: `${theme.palette.background.paper}`,
            boxShadow: `0px -1px 1px 0px ${(_g = (_f = theme.palette) === null || _f === void 0 ? void 0 : _f.boxshadow) === null || _g === void 0 ? void 0 : _g.main}`,
            stroke: `${(_h = theme.palette) === null || _h === void 0 ? void 0 : _h.grey[500]}`,
        },
        inboundOutbound: {
            width: '1.813rem',
            height: '1.25rem',
            borderRadius: '0.25rem',
            marginRight: '0.438rem',
            cursor: 'pointer',
        },
        noAssignmentCollpased: {
            font: `normal normal 500 0.5rem/0.563rem ${(_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.fontFamily}`,
        },
        noAssignmentExpanded: {
            font: `normal normal 600 0.875rem/1.5rem ${(_k = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _k === void 0 ? void 0 : _k.fontFamily}`,
        },
        noAssignmentTextCommon: {
            letterSpacing: '0rem',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            opacity: '1',
        },
        sortedIcon: {
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};
export default ccfContactAssignmentStyles;
//# sourceMappingURL=ccf-contact-assignment.style.js.map