import { useMediaQuery } from '@mui/material';
/**
 * style object for ccf-grid-selection-banner
 * @returns CcfGridSelectionBannerStyle style object
 * @example CcfGridSelectionBannerStyle(theme)
 */
const CcfGridSelectionBannerStyle = (theme, isTwoColumnDesign) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = {
        gridSelectionContainer: {
            width: '85%',
            height: '10%',
            border: '1px solid',
            borderColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.main,
            borderRadius: '4px',
            padding: '0.3rem 0.5rem 0.3rem 0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: (isSmView && !isTwoColumnDesign) ? 'column' : 'row',
            gap: 0,
        },
        gridItems: {
            display: 'flex',
            justifyContent: 'center',
        },
        gridSelectionLabel: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.searchTitle,
            fontSize: '0.688rem',
            fontWeight: 800,
        },
        headerContainer: {
            display: 'flex',
        },
        actionButtonContainer: {
            display: 'flex',
            gap: '2px',
        },
        actionButton: {
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: '1.875rem',
            maxWidth: '10rem',
            padding: '0 1rem 0 1rem',
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.searchTitle,
            borderColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.main,
            alignContent: 'center',
            fontSize: '0.688rem',
            fontWeight: 800,
        },
    };
    return styles;
};
export default CcfGridSelectionBannerStyle;
//# sourceMappingURL=ccf-grid-selection-banner-styles.js.map