/**
 * Styling for ccf-agent-chat
 * @returns ccf-agent-chat CSS properties as a JSON object
 * @example ccfAgentChatStyles(theme, props)
*/
const ccfAgentChatStyles = (theme, isConversationsStandAlone = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67;
    const styles = {
        AgentChatMainContainer: {
            boxShadow: `0 1px 3px ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.boxshadow) === null || _b === void 0 ? void 0 : _b.main}`,
            border: `1px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main}`,
            borderRadius: '8px',
            padding: 0,
            height: '100%',
        },
        AgentChatContainer: {
            display: 'flex',
            gap: '8px',
            height: 'calc(100% - 42px)',
        },
        AgentChatLeftContainer: {},
        AgentChatRightContainer: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            [(_e = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _e === void 0 ? void 0 : _e.up('md')]: {
                width: 'calc(100% - 260px)',
            },
            [(_f = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _f === void 0 ? void 0 : _f.down('md')]: {
                width: '100%',
            },
            height: '100%',
        },
        AgentChatNoMessageWindow: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            [(_g = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _g === void 0 ? void 0 : _g.down('lg')]: {
                height: '62vh',
            },
            [(_h = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _h === void 0 ? void 0 : _h.up('lg')]: {
                height: '68vh',
            },
        },
        headerText: {
            background: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.header,
            borderRadius: '0.313rem 0.313rem 0 0',
            borderBottom: `1px solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.main}`,
        },
        headerContent: {
            display: 'flex',
            alignItems: 'center',
            gap: '5%',
        },
        groupHeader: {
            fontFamily: 'Open Sans',
            fontWeight: '600',
            fontSize: '13px',
            lineHeight: '22px',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            position: 'sticky',
            top: '-8px',
            padding: '4px 10px',
            backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper,
            zIndex: 9999,
        },
        groupItems: {
            padding: 0,
        },
        AgentChatHeader: {
            borderBottom: `1px solid ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.border) === null || _r === void 0 ? void 0 : _r.main}`,
            [(_s = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _s === void 0 ? void 0 : _s.up('lg')]: {
                padding: '8px 4px',
                paddingBottom: '12px',
            },
            [(_t = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _t === void 0 ? void 0 : _t.down('lg')]: {
                padding: '4px',
            },
        },
        AgentChatHeaderContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        },
        AgentChatHeaderXL: {
            flexGrow: 1,
            [(_u = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _u === void 0 ? void 0 : _u.up('lg')]: {
                justifyContent: 'space-between',
            },
            [(_v = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _v === void 0 ? void 0 : _v.down('lg')]: {
                justifyContent: 'center',
            },
        },
        AgentChatInnerContent: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: '90%',
        },
        AgentChatText: {
            color: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.contrastText,
        },
        expandedIcon: {
            transform: 'rotate(180deg)',
            height: '18px',
            width: '20px',
            background: `${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.content} 0% 0% no-repeat padding-box`,
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.disabled,
        },
        accordionHeaderExpand: {
            flexDirection: 'row-reverse',
            padding: '8px 0',
            minHeight: '0 !important',
            '& .MuiAccordionSummary-content': {
                margin: '0 !important',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            },
            '& #plus': {
                height: '16px',
                width: '16px',
            },
        },
        AgentChatAccordionContainer: {
            maxHeight: '85%',
            paddingRight: '8px',
            paddingLeft: '4px',
            overflow: 'auto',
            [theme === null || theme === void 0 ? void 0 : theme.breakpoints.down('xl')]: {
                height: 'calc(100vh - 200px)',
            },
            [theme === null || theme === void 0 ? void 0 : theme.breakpoints.up('xl')]: {
                height: 'calc(100vh - 177px)',
            },
        },
        accordionContainer: {
            boxShadow: 'none',
            display: 'block',
            margin: '0 !important',
            paddingBottom: '4px',
        },
        accordionHeader: {
            color: (_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.header,
            textTransform: 'Uppercase',
            margin: '0',
        },
        coversationHeader: {
            color: (_5 = (_4 = theme.palette) === null || _4 === void 0 ? void 0 : _4.text) === null || _5 === void 0 ? void 0 : _5.header,
            textTransform: 'titlecase',
            fontweight: 700,
            fontSize: '14px',
            margin: '0px',
        },
        searchBox: {
            minWidth: '50%',
            marginLeft: isConversationsStandAlone ? '18rem' : '5.625rem',
            [(_6 = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _6 === void 0 ? void 0 : _6.up('xl')]: {
                marginLeft: isConversationsStandAlone && 'auto',
                marginRight: isConversationsStandAlone && 'auto',
            },
            '& .MuiOutlinedInput-root': {
                padding: '0 0 0 4px !important',
            },
            '& svg': {
                height: '1.5rem',
                width: '1.5rem',
            },
        },
        AgentChatStatus: {
            '& .MuiSvgIcon-root': {
                height: '13px',
                width: '12px',
            },
        },
        RightBorder: {
            borderRight: `1px solid ${(_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _7 === void 0 ? void 0 : _7.background) === null || _8 === void 0 ? void 0 : _8.main}`,
            [(_9 = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _9 === void 0 ? void 0 : _9.up('md')]: {
                width: '250px',
            },
            [(_10 = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _10 === void 0 ? void 0 : _10.down('md')]: {
                width: '100%',
            },
            height: '100%',
        },
        BorderBottom: {
            borderBottom: `1px solid ${(_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.background) === null || _12 === void 0 ? void 0 : _12.main}`,
        },
        AgentChatNormalText: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: (_14 = (_13 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _13 === void 0 ? void 0 : _13.text) === null || _14 === void 0 ? void 0 : _14.contrastText,
            flexShrink: 0, // Prevent shrinking of this element
        },
        AgentChatStrongText: {
            fontSize: '0.75rem',
            fontWeight: 700,
            color: (_16 = (_15 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _15 === void 0 ? void 0 : _15.text) === null || _16 === void 0 ? void 0 : _16.contrastText,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '80%', // Limit the width of the displayName to prevent it from taking up too much space
        },
        AgentChatExtraStrongText: {
            fontSize: '0.875rem',
            fontWeight: 700,
            color: (_18 = (_17 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _17 === void 0 ? void 0 : _17.text) === null || _18 === void 0 ? void 0 : _18.contrastText,
        },
        AgentChatAddmemberText: {
            display: 'flex',
            gap: '8px',
            padding: '0 8px',
            cursor: 'pointer',
        },
        AgentMessageContent: {
            borderBottom: `1px solid ${(_20 = (_19 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _19 === void 0 ? void 0 : _19.border) === null || _20 === void 0 ? void 0 : _20.main}`,
        },
        AgentNames: {
            cursor: 'default',
            borderRadius: '4px',
            color: (_22 = (_21 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _21 === void 0 ? void 0 : _21.text) === null || _22 === void 0 ? void 0 : _22.contrastText,
        },
        AgentNameIcon: {
            alignItems: 'center',
            padding: '4px 8px !important',
            justifyContent: 'space-between',
            display: 'flex',
            gap: '8px',
        },
        AgentNameIconHeader: {
            display: 'flex',
            Width: '500px',
            gap: '8px',
            padding: '8px',
            '& #left_arrow': {
                height: '14px',
                width: '8px',
            },
        },
        MessagesContent: {
            paddingBottom: '20px',
        },
        AgentNewChatSearchIcon: {
            margin: '4px',
        },
        AgentNewChat: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '8px 4px',
        },
        AgentNewChatForIsSmView: {
            justifyContent: 'space-between',
        },
        AgentNewChatIcon: {
            cursor: 'pointer',
            height: '16px',
            width: '16px',
        },
        AgentNewGroupIcon: {
            display: 'inline-flex',
            cursor: 'pointer',
            marginLeft: 'auto',
            top: '5px',
            position: 'absolute',
            right: '0px',
            fontSize: '16px',
            '& svg': {
                width: '16px',
                height: '16px',
            },
        },
        AccordionContent: {
            padding: '0',
            '& .MuiBox-root': {
                padding: '0',
            },
        },
        UnReadText: {
            fontSize: '10px',
            fontWeight: 600,
            backgroundColor: (_24 = (_23 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _23 === void 0 ? void 0 : _23.text) === null || _24 === void 0 ? void 0 : _24.noteLabel,
            borderRadius: '50%',
            padding: '1px 6px',
            color: `${(_26 = (_25 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _25 === void 0 ? void 0 : _25.text) === null || _26 === void 0 ? void 0 : _26.white} !important`,
            textAlign: 'right',
            marginLeft: 'auto',
            position: 'absolute',
            right: '8px',
        },
        AgentMessageRight: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '8px 12px',
            flex: 1,
        },
        AgentChatCurrentUser: {
            width: '2px',
            height: '20px',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            backgroundColor: (_28 = (_27 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _27 === void 0 ? void 0 : _27.text) === null || _28 === void 0 ? void 0 : _28.noteLabel,
            position: 'absolute',
            left: '-10px',
            top: '62%',
            transform: 'translateY(-50%)',
        },
        AgentMessage: {
            padding: '8px 12px',
            flex: 1,
        },
        AgentChatMessageBox: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
        },
        AgentChatMessageRight: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingLeft: '180px',
            paddingRight: '0', // Remove any padding on the right
        },
        AgentChatMessageLeft: {
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: '0', // Remove any padding on the left
        },
        AgentNameAvatar: {
            fontWeight: 600,
            fontSize: '13px',
            height: '30px',
            width: '30px',
            marginTop: '8px',
        },
        AgentMessageTime: {
            paddingLeft: '4px',
            fontSize: '0.625rem',
        },
        AgentMessageDate: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        AgentMessageDateHRline: {
            flex: 1,
            borderBottom: `1px solid ${(_30 = (_29 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _29 === void 0 ? void 0 : _29.background) === null || _30 === void 0 ? void 0 : _30.main}`,
        },
        AgentNoMessage: {
            fontWeight: 600,
            fontSize: '13px',
            color: (_32 = (_31 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _31 === void 0 ? void 0 : _31.text) === null || _32 === void 0 ? void 0 : _32.contrastText,
        },
        noMessageContent: {
            [(_33 = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _33 === void 0 ? void 0 : _33.up('xl')]: {
                display: 'flex', alignItems: 'center',
            },
            '& p.MuiTypography-root': {
                [(_34 = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _34 === void 0 ? void 0 : _34.down('xl')]: {
                    display: 'inline-block',
                    verticalAlign: 'middle',
                },
            },
        },
        AgentNewMessage: {
            fontWeight: 600,
            fontSize: '13px',
            color: (_36 = (_35 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _35 === void 0 ? void 0 : _35.text) === null || _36 === void 0 ? void 0 : _36.contrastText,
            border: '1px solid ' + ((_38 = (_37 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _37 === void 0 ? void 0 : _37.background) === null || _38 === void 0 ? void 0 : _38.digitalTag),
            borderRadius: '4px',
            padding: '0 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            marginTop: '7px',
        },
        AgentNoMessageIcon: {
            '& #no_message': {
                height: '79px',
                width: '79px',
            },
        },
        AgentGroupInputs: {
            paddingBottom: '12px',
        },
        AddMemberIcon: {
            '& .MuiSvgIcon-fontSizeMedium': {
                height: '16px',
                width: '16px',
                marginTop: '7px',
            },
        },
        MembersDownArrow: {
            display: 'inline-flex',
            flexShrink: 0,
            marginLeft: '8px',
            cursor: 'pointer',
            transform: 'rotate(-90deg)',
            '& .MuiSvgIcon-fontSizeMedium': {
                height: '18px',
                width: '10px',
                paddingTop: '8px',
            },
            '& .MuiSvgIcon-root#left_arrow': {
                height: '20px',
                width: '6px',
            },
        },
        AgentNamesAccordion: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: (_40 = (_39 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _39 === void 0 ? void 0 : _39.text) === null || _40 === void 0 ? void 0 : _40.white,
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: (_42 = (_41 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _41 === void 0 ? void 0 : _41.text) === null || _42 === void 0 ? void 0 : _42.grey,
            },
            '& .MuiTypography-root': {
                color: (_44 = (_43 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _43 === void 0 ? void 0 : _43.text) === null || _44 === void 0 ? void 0 : _44.primary,
            },
            maxWidth: '100%',
        },
        SelectedAgentNamesAccordian: {
            backgroundColor: (_46 = (_45 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _45 === void 0 ? void 0 : _45.text) === null || _46 === void 0 ? void 0 : _46.noteLabel,
            '&:hover': {
                backgroundColor: (_48 = (_47 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _47 === void 0 ? void 0 : _47.text) === null || _48 === void 0 ? void 0 : _48.noteLabel,
            },
            '& .MuiTypography-root': {
                color: (_50 = (_49 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _49 === void 0 ? void 0 : _49.text) === null || _50 === void 0 ? void 0 : _50.white,
            },
        },
        AgentGroupTitle: {
            fontSize: '12px',
            padding: '2px 4px',
            textTransform: 'uppercase',
            fontWeight: 600,
        },
        // Editor styles
        AgentChatEditor: {
            padding: '8px 0',
            position: 'relative',
            '& #dropzone .MuiButtonBase-root.MuiButton-root': {
                boxShadow: 'none',
                border: 'none',
            },
            '& #dropzone p.MuiTypography-root': {
                maxWidth: 'calc(100% - 35px)',
                overflowWrap: 'break-word',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': '4',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
            },
        },
        EditorPlaceholder: {
            color: (_51 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _51 === void 0 ? void 0 : _51.text.header,
            overflow: 'hidden',
            position: 'absolute',
            top: '18px',
            left: '13px',
            userSelect: 'none',
            pointerEvents: 'none',
        },
        SendBtn: {
            marginTop: '-39px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
            '& p.MuiTypography-root': {
                display: 'flex',
                alignItems: 'center',
            },
            '& svg.MuiSvgIcon-root': {
                height: '16px',
                width: '16px',
            },
        },
        MenuItemContent: {
            '& .MuiSvgIcon-root': {
                height: '16px',
                width: '16px',
            },
        },
        AgentChatKebab: {
            '& li.MuiMenuItem-root': {
                color: (_53 = (_52 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _52 === void 0 ? void 0 : _52.background) === null || _53 === void 0 ? void 0 : _53.callControls,
            },
        },
        MenuItemNameBold: {
            fontWeight: 700,
            fontSize: '14px',
        },
        //search group members
        searchItemElement: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
            transition: 'height 250ms ease-in',
            overflow: 'hidden',
            position: 'relative',
            zIndex: '1',
        },
        searchUser: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: '0',
            '> svg': {
                width: '1.2rem',
                height: '1.2rem',
            },
        },
        searchUserNameLabel: {
            marginLeft: '4px',
            fontWeight: '800',
            fontSize: (_55 = (_54 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _54 === void 0 ? void 0 : _54.h5) === null || _55 === void 0 ? void 0 : _55.fontSize,
        },
        ellipsisWithTooltip: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            width: '100%',
        },
        searchItemUserStatus: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            paddingBottom: '0',
            paddingTop: '0',
            minHeight: '40px',
            width: '100%',
            height: 50,
        },
        icon: {
            fontSize: (_57 = (_56 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _56 === void 0 ? void 0 : _56.h3) === null || _57 === void 0 ? void 0 : _57.fontSize,
            marginLeft: '4px',
        },
        statusText: {
            marginLeft: '4px',
            fontSize: (_59 = (_58 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _58 === void 0 ? void 0 : _58.h6) === null || _59 === void 0 ? void 0 : _59.fontSize,
            color: (_61 = (_60 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _60 === void 0 ? void 0 : _60.secondary) === null || _61 === void 0 ? void 0 : _61.main,
            lineSpacing: 17,
        },
        CrossIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '4px',
            '& .MuiSvgIcon-root': {
                width: '9px',
                height: '9px',
            },
        },
        searchMembers: {
            padding: '0 3px',
            '> div': {
                paddingBottom: '2px !important',
                paddingTop: '2px !important',
                paddingLeft: '4px !important',
            },
            '.MuiInputBase-root': {
                padding: '0 8px',
            },
        },
        searchIcon: {
            paddingRight: 0,
            marginRight: 0,
            cursor: 'pointer',
        },
        addFavoriteIcon: {
            display: 'flex',
            cursor: 'pointer',
            marginRight: '0',
        },
        searchBoxforGroup: {
            marginLeft: '0',
            '> .MuiAutocomplete-root': {
                paddingLeft: '0',
                '> div': {
                    paddingLeft: '0 !important',
                    '> .MuiInputBase-root': {
                        padding: '0 0 0 5px',
                    },
                },
            },
        },
        createGroupText: {
            padding: '6px 0',
        },
        AgentChatSelectedContact: {
            minHeight: 'calc(10vh)',
            maxHeight: 'calc(50vh - 100px)',
            overflowY: 'auto',
        },
        AgentChatStatusIcon: {
            position: 'absolute',
            bottom: '2px',
            right: 0,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
        },
        AgentDisplayName: {
            width: '90%',
        },
        GroupSearchInput: {
            '&.MuiOutlinedInput-root': {
                paddingLeft: '10px',
            },
            '#search-input-for-group': {
                padding: '4px',
            },
        },
        GroupActivityText: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: (_63 = (_62 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _62 === void 0 ? void 0 : _62.text) === null || _63 === void 0 ? void 0 : _63.secondary,
        },
        GroupActionContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '12px',
        },
        GroupActionSummary: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '14px',
            paddingRight: '8px',
            width: 'fit-content',
            gap: '8px',
            '& svg': {
                fontSize: '16px',
                color: (_65 = (_64 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _64 === void 0 ? void 0 : _64.text) === null || _65 === void 0 ? void 0 : _65.secondary,
            },
            '& svg:first-of-type': {
                marginRight: '6px',
            },
        },
        GroupActionMembersList: {
            marginTop: '4px',
            marginLeft: '120px',
            maxWidth: 'fit-content',
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            rowGap: '12px',
            columnGap: '28px',
            color: (_67 = (_66 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _66 === void 0 ? void 0 : _66.text) === null || _67 === void 0 ? void 0 : _67.secondary,
            fontSize: '0.75rem',
        },
        ChatMessageContainer: {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            border: '1px solid #D2D8DB',
            padding: '8px',
            marginBottom: '6px',
            boxSizing: 'border-box',
            cursor: 'pointer',
        },
    };
    return styles;
};
export default ccfAgentChatStyles;
//# sourceMappingURL=ccf-agent-chat.styles.js.map