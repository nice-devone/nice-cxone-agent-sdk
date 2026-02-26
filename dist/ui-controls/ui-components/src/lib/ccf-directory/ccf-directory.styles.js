/**
 * return styles used for the component
 * @example <directoryStyles />
 * @returns styles
 */
const ccfDirectoryStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return {
        icon: {
            fontSize: theme.typography.h3.fontSize,
            marginLeft: '4px',
        },
        directoryItem: {
            padding: theme.spacing(1),
            '&:hover, &:focus': {
                outline: 'none',
                backgroundColor: theme.palette.background.hover,
            },
        },
        iconContainer: {
            display: 'flex',
            height: '30px',
            width: '75%',
            alignItems: 'stretch',
        },
        heading: {
            width: '100px',
            textAlign: 'center',
        },
        interactionIconAlign: {
            display: 'inline-block',
            width: '10%',
            float: 'right',
            svg: {
                width: '20px',
                fill: (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text.noteLabel,
            },
        },
        headerText: {
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
            display: 'inline-block',
            color: theme.palette.text.primary,
        },
        menubook: {
            margin: '3px',
        },
        addressBookName: {
            marginLeft: '6px',
            marginTop: '4px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'inline-block',
        },
        text: {
            marginTop: '4px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
            display: 'inline-block',
        },
        textSecondary: {
            color: theme.palette.secondary.main,
            height: '30px',
            minWidth: '20px',
            borderRadius: '5px',
            padding: 'unset',
        },
        standardEntriesContainer: {
            width: '100%',
        },
        accordionContainer: {
            boxShadow: 'none',
            display: 'block',
        },
        accordionHeader: {
            flexDirection: 'row-reverse',
            paddingLeft: '5px',
            marginLeft: '1%',
            minHeight: 24,
            height: '48px',
            borderTop: `solid ${theme.palette.background.default} 1px`,
            'MuiAccordionDetails-root': {
                padding: '0% 0% 0% 8%',
            },
            '&.Mui-expanded': {
                minHeight: 24,
                height: '30px',
            },
        },
        accordionHeaderExpand: {
            flexDirection: 'row-reverse',
            paddingLeft: '10px',
            borderTop: `solid ${theme.palette.background.default} 1px`,
        },
        accordionHeaderActivityExpand: {
            flexDirection: 'row-reverse',
            paddingLeft: '10px',
            borderTop: `solid ${theme.palette.background.default} 1px`,
            boxShadow: `-1px 1px 1px ${theme.palette.background.toastBackground}`,
        },
        accordionIcon: {
            transform: 'rotate(180deg)',
            height: '25px',
            width: '25px',
            background: `${theme.palette.text.content} 0% 0% no-repeat padding-box`,
            color: theme.palette.text.disabled,
        },
        accordionTitle: {
            letterSpacing: '0px',
            color: theme.palette.text.primary,
            opacity: 1,
            fontWeight: 'bold',
        },
        drilldownToAddressBook: {
            display: 'flex',
            marginTop: '10px',
            cursor: 'pointer',
        },
        backIcon: {
            width: '3%',
            marginBottom: '10px',
            color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.dark,
            height: '.75em',
        },
        subHeading: {
            margin: '0% 0% 3% 4%',
        },
        skillSelect: {
            height: '35%',
            borderRadius: '0.45em',
            marginRight: 4,
            flex: 1,
            background: theme.palette.background.paper,
            fontSize: theme.typography.h5.fontSize,
            overflow: 'hidden',
        },
        padingMenuItem: {
            padding: '3%',
        },
        hoverPopUpCallBtnMargin: {
            marginLeft: '5px',
        },
        twoColumnStyles: {
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100%',
            overflowY: 'scroll',
        },
        displayNone: {
            display: 'none',
        },
        selectedBackground: {
            backgroundColor: theme.palette.background.default,
        },
        scrollerClass: {
            display: 'flex',
            height: '100%',
        },
        noAgentFoundTypography: {
            marginTop: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        outerContainerSkills: {
            padding: '13px 8px',
        },
        skillNametopContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        skillActivity: {
            display: 'flex',
            marginBottom: '20px',
            alignItems: 'center',
            color: theme.palette.secondary.main,
        },
        displayContent: {
            display: 'contents',
        },
        labelText: {
            marginLeft: '16px',
        },
        waitlabelText: {
            marginLeft: '16px',
        },
        skillText: {
            fontWeight: '600',
        },
        memberCountTag: {
            cursor: 'pointer',
        },
        drilldownHeader: {
            display: 'flex',
            fontSize: '16px',
            marginTop: '10px',
            marginLeft: '12px',
            '.backIcon': {
                width: '4%',
                cursor: 'pointer',
            },
        },
        marginLeft23: {
            marginLeft: '23px',
        },
        iconContainerInsideList: {
            display: 'flex',
            height: '30px',
            width: '75%',
            [theme.breakpoints.down(575)]: {
                width: '215px',
            },
        },
        fullViewDirectoryCard: {
            width: '100%',
            height: '100%',
            background: `${theme.palette.background.light} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${theme.palette.boxshadow.main}`,
            border: `1px solid ${theme.palette.border.main}`,
            [theme.breakpoints.down('xs')]: {
                borderRadius: 0,
            },
            [theme.breakpoints.up('xl')]: {
                borderRadius: '6px',
            },
            opacity: 1,
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiOutlinedInput-input': Object.assign(Object.assign({}, theme.typography.h4), { [theme.breakpoints.down('xl')]: Object.assign({}, theme.typography.h6) }),
        },
        directoryHeader: {
            background: `${theme.palette.background.light} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${theme.palette.boxshadow.main}`,
            borderRadius: '5px 5px 0px 0px',
            opacity: 1,
            height: '30px',
            '& label': {
                color: theme.palette.text.secondary,
            },
        },
        directoryUser: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            height: 50,
            paddingTop: '10px',
        },
        directoryUserNameLabel: {
            marginLeft: '4px',
            fontWeight: '800',
            fontSize: (_d = theme.typography) === null || _d === void 0 ? void 0 : _d.h5.fontSize,
        },
        ellipsisWithTooltip: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            width: '100%',
        },
        fullViewText: {
            marginLeft: '4px',
            fontWeight: '800',
            fontSize: theme.typography.h5.fontSize,
        },
        directoryItemElement: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            display: 'flex',
            padding: '0px 12px',
            width: '100%',
            height: 70,
            transition: 'height 250ms ease-in',
            background: 'inherit',
            overflow: 'hidden',
            position: 'relative',
            zIndex: '1',
            '&:hover, &:focus': {
                outline: 'none',
                backgroundColor: theme.palette.background.hover,
            },
        },
        statusText: {
            marginLeft: '4px',
            fontSize: theme.typography.h6.fontSize,
            color: theme.palette.secondary.main,
            lineSpacing: 17,
        },
        fullViewSecondoryText: {
            marginLeft: '4px',
            fontSize: theme.typography.h6.fontSize,
        },
        fullDirectoryItemUserStatus: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            paddingBottom: '12px',
            minHeight: '40px',
            width: '100%',
        },
        directoryItemUserStatus: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            paddingBottom: '20px',
            paddingTop: '10px',
            minHeight: '40px',
            width: '100%',
            height: 50,
        },
        hoverDisabledButton: {
            '&.MuiIconButton-root': {
                padding: '0 12px',
                '&:hover': {
                    backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.menuItemHighlight,
                    borderRadius: '0.25rem',
                },
            },
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        externalDirectoryUser: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: 50,
            paddingTop: '10px',
        },
        externalDirectoryItem: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            display: 'flex',
            padding: '0px 12px',
            width: '100%',
            height: 65,
            transition: 'height 250ms ease-in',
            background: 'inherit',
            overflow: 'hidden',
            '&:hover, &:focus': {
                outline: 'none',
                backgroundColor: theme.palette.background.hover,
            },
        },
        extDirFullViewSecondoryText: {
            marginLeft: '4px',
            fontSize: theme.typography.h5.fontSize,
        },
        externalDirectoryText: {
            marginLeft: '4px',
            fontSize: theme.typography.h5.fontSize,
            color: theme.palette.secondary.main,
            lineSpacing: 17,
        },
        phoneIconFullViewDirectory: {
            '&.Mui-disabled': {
                opacity: '0.8',
                pointerEvents: 'none',
                cursor: 'not-allowed',
            },
            '&.MuiButton-textSecondary': {
                color: theme.palette.secondary.main,
                minWidth: '48px',
                marginTop: '10px',
                height: '30px',
                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                },
            },
        },
        hoveredElement: {
            '&:hover': {
                backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.menuItemHighlight,
            },
        },
        selectableElement: {
            '&.Mui-selected': {
                backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.callControlHeader,
            },
        },
        favContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        addBookList: {
            width: '100%',
        },
    };
};
export default ccfDirectoryStyles;
//# sourceMappingURL=ccf-directory.styles.js.map