/**
 * Styling for ccfImageWithZoomStyles
 * @returns ccfImageWithZoomStyles CSS properties as a JSON object
 * @example ccfImageWithZoomStylesStyles(theme)
*/
const ccfImageWithZoomStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        widthInputCollapsed: {
            width: 'calc(100% - 7.5rem)',
            height: 'calc(100% - 3.5rem)',
        },
        widthBelowMd: {
            width: 'calc(100% - 3.5rem)',
            height: '25rem',
        },
        expandedDialog: {
            position: 'fixed',
            top: 'auto',
            right: '0',
            bottom: '0',
            left: 'auto',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            width: 'calc(100% - 18.313rem)',
            height: 'calc(100% - 3.5rem)',
            [theme.breakpoints.down('md')]: {
                top: '6.75rem',
                left: '3.5rem',
            },
            '& .MuiPaper-root': {
                maxWidth: 'none',
                width: '100%',
                height: '100%',
                boxShadow: 'none',
                background: 'none',
            },
            '& .MuiBackdrop-root': {
                left: 'auto',
                top: 'auto',
            },
        },
        closeDialog: {
            marginLeft: 'auto',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white,
        },
        dialogImage: {
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
        },
        dialogActions: {
            justifyContent: 'center',
        },
        dialogButtons: {
            border: `0.063rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.zoomIconsBackground}`,
            background: theme.palette.text.white,
        },
        zoomOutButton: {
            paddingTop: '0.5rem',
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.zoomIconsBackground,
        },
        zoomInButton: {
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.zoomIconsBackground,
        },
    };
    return styles;
};
export default ccfImageWithZoomStyles;
//# sourceMappingURL=ccf-image-with-zoom.style.js.map