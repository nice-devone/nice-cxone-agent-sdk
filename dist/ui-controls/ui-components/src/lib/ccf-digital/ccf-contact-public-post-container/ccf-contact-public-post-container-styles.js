import CcfContactMessageContainerStyle from '../ccf-contact-message-container/ccf-contact-message-container-styles';
/**
 * style object for ccf-contact-message-container
 * @returns CcfContactPublicPostContainerStyle styles object
 * ```
 * @example
 * <CcfContactPublicPostContainerStyle/>
 * ```
 */
const CcfContactPublicPostContainerStyle = (theme, isSmView) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
    const styles = Object.assign(Object.assign({}, CcfContactMessageContainerStyle), { publicPostContentWrapper: {
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '0.5rem',
            height: '100%',
        }, originalPublicPost: {
            maxWidth: '100%',
            flexGrow: 1,
            border: 'none',
            boxShadow: 'none',
            marginLeft: '1%',
            marginRight: '1rem',
        }, titleBox: {
            display: 'flex',
            width: `${isSmView ? '50%' : '60%'}`,
        }, inboundMessageTimeStamp: {
            fontSize: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h6) === null || _b === void 0 ? void 0 : _b.fontSize}`,
            lineHeight: '1rem',
            letterSpacing: '0rem',
            color: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.light}`,
            display: 'inline-block',
            width: `${isSmView}` ? 'calc(95% - 2rem)' : 'auto',
            overflow: `${isSmView}` ? 'hidden' : 'visible',
            textOverflow: `${isSmView}` ? 'ellipsis' : '',
            whiteSpace: `${isSmView}` ? 'nowrap' : '',
        }, outboundMessageTimeStamp: {
            fontSize: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.h6) === null || _f === void 0 ? void 0 : _f.fontSize}`,
            display: 'inline',
        }, messageCard: {
            width: '100%',
            marginBottom: '1rem',
            border: `0.125rem solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.boxshadow) === null || _h === void 0 ? void 0 : _h.light}`,
        }, message: {
            fontSize: `${(_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.h6.fontSize}`,
            maxWidth: '90%',
            textAlign: 'left',
            letterSpacing: '0rem',
            opacity: '1',
            color: `${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.text) === null || _l === void 0 ? void 0 : _l.dark}`,
        }, messageAuthor: {
            fontSize: `${(_o = (_m = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _m === void 0 ? void 0 : _m.h5) === null || _o === void 0 ? void 0 : _o.fontSize}`,
            fontWeight: '600',
            lineHeight: '1rem',
            letterSpacing: '0rem',
            color: `${(_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.contrastText}`,
            opacity: '1',
            marginBottom: '0.20rem',
            overflow: 'hidden',
            maxWidth: '150px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }, anonymousAuthorName: {
            fontWeight: 200,
            fontStyle: 'italic',
        }, reactionCounter: {
            fontSize: `${(_s = (_r = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _r === void 0 ? void 0 : _r.h6) === null || _s === void 0 ? void 0 : _s.fontSize}`,
            color: `${(_u = (_t = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _t === void 0 ? void 0 : _t.text) === null || _u === void 0 ? void 0 : _u.light}`,
            margin: '0.15rem 0 0 0',
        }, authorAvtar: {
            width: '1.5rem',
            height: '1.5rem',
        }, attachmentsContainer: {
            overflow: 'hidden',
            marginTop: '0.5rem',
        }, replyButton: {
            border: `1px solid ${(_v = theme.palette) === null || _v === void 0 ? void 0 : _v.border.main}`,
            boxShadow: `0px 2px 0px ${(_w = theme.palette) === null || _w === void 0 ? void 0 : _w.border.main}`,
            maxWidth: '5.17rem',
            height: '1.75rem',
            fontSize: '0.7rem',
            background: '#007AB8',
            [theme.breakpoints.down('md')]: {
                minWidth: '2.5rem',
            },
        }, replyButtonBox: {
            display: 'inline-block',
            margin: '0.1rem',
        }, messageTitle: {
            display: 'flex',
            flexWrap: 'wrap',
        }, replyIcon: {
            fontSize: '1rem',
            marginTop: '0.3rem',
            [theme.breakpoints.down('md')]: {
                marginRight: '0',
            },
        }, hiddenMessage: {
            fontSize: '.9rem',
            fontWeight: '600',
            padding: '2px',
            marginTop: '0px',
            marginLeft: '5%',
            marginBottom: '5%',
            backgroundColor: theme.palette.text.disabled,
            display: 'inline-block',
        }, hideDeleteChip: {
            fontWeight: '500',
            lineHeight: '1rem',
            textAlign: 'center',
            color: `${theme.palette.text.messageText}`,
            height: '22px',
        }, separator: {
            color: `${(_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.text) === null || _y === void 0 ? void 0 : _y.light}`,
        }, commentReplyCounter: {
            fontSize: `${(_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _z === void 0 ? void 0 : _z.h6) === null || _0 === void 0 ? void 0 : _0.fontSize}`,
            color: `${(_2 = (_1 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _1 === void 0 ? void 0 : _1.text) === null || _2 === void 0 ? void 0 : _2.light}`,
            paddingLeft: '3px',
            margin: '0.15rem 0 0 0',
        }, treeContent: {
            '.MuiTreeItem-root > .MuiTreeItem-content': {
                padding: '0 0.8rem',
                '.MuiTreeItem-label': {
                    paddingRight: '0.2rem',
                    paddingLeft: '0',
                },
                '.MuiTreeItem-iconContainer': {
                    [theme.breakpoints.down('md')]: {
                        width: '0.2rem',
                    },
                },
                '&:hover': {
                    backgroundColor: theme.palette.background.transparent,
                    cursor: 'unset',
                },
                '&.Mui-focused': {
                    backgroundColor: theme.palette.background.transparent,
                },
            },
        }, cardHeaderPosition: {
            padding: '0.3rem 0.7rem',
            '.MuiCardHeader-avatar': {
                marginRight: '0.4rem',
            },
            '.MuiCardHeader-content': {
                width: '30%',
            },
            '.MuiCardHeader-content p': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
        }, cardContentPosition: {
            padding: '0.3rem 0.3rem',
        }, gridItemPosition: {
            padding: '0rem 0.2rem',
        }, draftMessageContentBody: {
            width: '95%',
            textAlign: 'left',
            padding: '0px 15px',
            letterSpacing: '0px',
            opacity: '1',
            '& > span': {
                fontSize: '12px',
                overflowY: 'hidden',
                display: 'block',
            },
            '& ul': {
                listStylePosition: 'inside',
            },
            lineHeight: 'initial',
            overflowX: 'visble',
            overflowY: 'hidden',
            paddingBottom: '0.313rem',
        }, approvalInfoContainer: {
            clear: 'both',
            width: '100%',
        }, messageDraftCard: {
            marginBottom: '0',
            width: '100%',
            border: `0.125rem solid ${(_4 = (_3 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _3 === void 0 ? void 0 : _3.boxshadow) === null || _4 === void 0 ? void 0 : _4.light}`,
        }, messageDraftCardContainer: {
            clear: 'both',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 0.8rem',
            margin: '0.625rem auto',
        }, treeItemContainer: {
            position: 'relative',
            '.MuiTreeItem-group': {
                marginLeft: '3rem',
                borderLeft: `0.120rem solid ${(_6 = (_5 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _5 === void 0 ? void 0 : _5.border) === null || _6 === void 0 ? void 0 : _6.main}`,
                paddingTop: '.87rem',
                marginTop: '-.87rem',
                [theme.breakpoints.down('md')]: {
                    marginLeft: '2rem',
                },
            },
            '.MuiTreeItem-root': {
                marginRight: '0.2rem',
            },
        }, 
        // This CSS style is applied to the public tree design parent node where the connector line is designed
        rootNodeDivider: {
            '&:before': {
                pointerEvents: 'none',
                content: '""',
                position: 'absolute',
                width: '4rem',
                height: '1rem',
                top: 70,
                'border-bottom-left-radius': '1rem',
            },
        }, 
        // This CSS style is applied to the public tree design child nodes where the curve line is designed for linking nested nodes
        nonRootNodeDivider: {
            '&:before': {
                pointerEvents: 'none',
                content: '""',
                position: 'absolute',
                width: '4rem',
                height: '1rem',
                top: 70,
                borderBottom: `.120rem solid ${(_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _7 === void 0 ? void 0 : _7.border) === null || _8 === void 0 ? void 0 : _8.main}`,
                'border-bottom-left-radius': '1rem',
            },
        }, deletedMessageContainer: {
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0.5rem 0.75rem',
            width: 'max-content',
            height: '2rem',
            border: `0.0625rem solid ${(_10 = (_9 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _9 === void 0 ? void 0 : _9.border) === null || _10 === void 0 ? void 0 : _10.lightGray}`,
            borderRadius: '0.5rem',
        }, deletedMessageText: {
            color: (_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.text) === null || _12 === void 0 ? void 0 : _12.header,
            fontSize: 'inherit',
            fontStyle: 'italic',
        }, originalPostContainer: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        } });
    return styles;
};
export default CcfContactPublicPostContainerStyle;
//# sourceMappingURL=ccf-contact-public-post-container-styles.js.map