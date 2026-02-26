/**
 *
 * @param theme - MUI theme object
 * @example - const styles = CreateDispositionStyles(theme)
 */
export const CreateDispositionModalStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const styles = {
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.paper',
            border: `0.063rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.dark}`,
            borderRadius: '0.313rem',
            boxShadow: '24',
            padding: '1.5rem',
            width: '26.25rem',
            fontSize: '0.813rem',
            [theme.breakpoints.down(500)]: {
                width: '21.25rem',
                fontSize: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.h6) === null || _d === void 0 ? void 0 : _d.fontSize,
            },
        },
        modalContentContainer: {
            display: 'flex',
            width: '100%',
        },
        modalContent: {
            '> :not(:first-of-type)': {
                marginTop: '0.7rem',
            },
            width: '100%',
            overflow: 'auto',
            wordBreak: 'break-word',
        },
        contactName: {
            fontSize: '1.25rem',
            fontWeight: 600,
            [theme.breakpoints.down(500)]: {
                fontSize: '1rem', // 16 px
            },
        },
        skillAndDateRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            wordBreak: 'break-word',
        },
        skillContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        skillText: {
            fontSize: 'inherit',
            margin: '0 0.625rem 0 0.313rem',
        },
        interactionDate: {
            fontSize: 'inherit',
        },
        dispositionAndDurationRow: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        dispositionContainer: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        dispositionTitle: {
            fontWeight: 700,
            fontSize: 'inherit',
            marginRight: '0.313rem',
        },
        dispositionStatus: {
            fontSize: 'inherit',
        },
        durationContainer: {
            display: 'flex',
            textWrap: 'nowrap',
        },
        interactionDuration: {
            fontSize: 'inherit',
        },
        dispositionNotesTitle: {
            fontWeight: 700,
            fontSize: 'inherit',
        },
        dispositionNotesText: {
            fontSize: 'inherit',
            marginTop: '0.4rem',
            overflowY: 'auto',
            maxHeight: '15rem',
        },
        closeButtonColumn: {
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'baseline',
            '> button': {
                padding: 0,
            },
        },
        dispositionTagsContainer: {
            marginTop: '0.313rem',
        },
        dispositionTags: {
            ':not(:last-of-type)': {
                marginRight: '0.188rem', // 3px
            },
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1.5rem',
            '> :not(:first-of-type)': {
                marginLeft: '0.5rem', // 8px
            },
        },
        closeButton: { color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText },
        button: {
            fontSize: 'inherit',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.clearText,
            border: `0.0625rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.digitalTag}`,
            '&:hover,&:active, &:focus, &:focus-visible': {
                border: `0.0625rem solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.digitalTag}`,
            },
            backgroundColor: 'transparent',
            '&:hover, &:focus, &:focus-visible': {
                backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.secondaryButtonPressed,
            },
            '&:active': {
                backgroundColor: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.filterButton,
            },
            '&:focus-visible': {
                outline: `0.0625rem solid ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.border) === null || _t === void 0 ? void 0 : _t.menuItemHighlight}`,
            },
        },
        scroll: {
            /* width */
            '*::-webkit-scrollbar': {
                width: '4px',
                height: '4px',
            },
            /* Track */
            '*::-webkit-scrollbar-track': {
                backgroundColor: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.scrollTrack,
            },
            /* Handle */
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.scrollThumb,
                borderRadius: '30px',
            },
            /* Handle on hover */
            '*::-webkit-scrollbar-thumb:hover': {
                backgroundColor: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.background) === null || _z === void 0 ? void 0 : _z.scrollThumbHover,
            },
        },
    };
    return styles;
};
//# sourceMappingURL=disposition-modal.styles.js.map