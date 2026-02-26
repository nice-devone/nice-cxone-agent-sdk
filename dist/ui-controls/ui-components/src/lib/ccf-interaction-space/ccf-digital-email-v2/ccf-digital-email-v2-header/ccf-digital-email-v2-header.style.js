import { DigitalContactDirection } from '@nice-devone/common-sdk';
/**
 * style object for ccf-digital-email-v2-header component
 * @returns CcfDigitalEmailV2Header styles object
 * ```
 * @example
 * <CcfDigitalEmailV2HeaderStyles/>
 * ```
 */
const CcfDigitalEmailV2HeaderStyles = (theme, isMobile, messageDirection, isAuthorNameRemoved) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const styles = {
        avatar: {
            bgcolor: messageDirection === DigitalContactDirection.OUTBOUND ? (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background.checkboxHover : (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.avatarBackground,
            fontWeight: 600,
            color: messageDirection === DigitalContactDirection.INBOUND ? (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.ibAvatar : (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.obAvatar,
            width: '2.5rem',
            height: '2.5rem',
            fontSize: '1rem',
            transform: isMobile ? 'translateY(-0.813rem)' : 'translateY(-0.188rem)',
        },
        displayName: {
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '70%',
            marginRight: '0.8rem',
            lineHeight: 'inherit',
            fontSize: '0.875rem',
            marginTop: '0.063rem',
            fontStyle: isAuthorNameRemoved ? 'italic' : 'normal',
            color: isAuthorNameRemoved ? (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.text) === null || _j === void 0 ? void 0 : _j.header : (_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.text) === null || _l === void 0 ? void 0 : _l.contrastText,
        },
        displayNameContainer: {
            height: '1.375rem',
        },
        toField: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '0.688rem',
            fontWeight: 400,
        },
        toContainer: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: 'normal',
        },
        downArrowIconStyle: {
            fontSize: 'medium',
            cursor: 'pointer',
            color: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.text) === null || _o === void 0 ? void 0 : _o.contrastText,
        },
        addressContainer: {
            [(_p = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _p === void 0 ? void 0 : _p.up('md')]: {
                width: '60%',
            },
            lineHeight: '1',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'space-between',
        },
        iconContainer: {
            [(_q = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _q === void 0 ? void 0 : _q.up('md')]: {
                width: '40%',
                fonSize: '0.688rem',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            transform: 'translateY(-0.438rem)',
        },
        dateTimeStyle: {
            color: theme.palette.text.contrastText,
            fontSize: '0.688rem',
            fontWeight: 400,
            lineHeight: 1,
        },
        buttonContainer: {
            display: 'flex',
            height: '2rem',
            marginTop: '0.188rem',
        },
        toFieldContainer: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'flex',
            width: '60%',
        },
        popOverStyles: {
            minWidth: '20rem',
            transform: isMobile ? 'translateX(10px)' : 'translateX(0px)',
            borderRadius: '0.75rem',
            boxShadow: '0 0 0.5rem -0.125rem' + ((_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.boxshadow) === null || _s === void 0 ? void 0 : _s.main),
        },
        dateStyles: {
            fontSize: '0.688rem',
            transform: 'translateY(-0.188rem)',
            marginRight: '0.5rem',
        },
        tagsStyle: {
            transform: 'translateX(-0.75rem) translateY(-0.063rem)',
        },
    };
    return styles;
};
export default CcfDigitalEmailV2HeaderStyles;
//# sourceMappingURL=ccf-digital-email-v2-header.style.js.map