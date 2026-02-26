import { keyframes } from '@mui/material';
/**
 * @returns CcfAnimatedEllipsisControlStyles
 * @example - CcfAnimatedEllipsisControlStyles
 */
export const CcfAnimatedEllipsisControlStyles = (theme) => {
    // Keyframes for the pseudo dot before and after main dot
    // the keyframes modifes the size of the dots and
    /**
     * method to return keyframes based on dot
     * @param ellipsisDotPosition - represents the position of the dot (1,2 or 3)
     * @example - getAnimationsForDot(1)
     * @returns - animations object
     */
    const getAnimationsForDot = (ellipsisDotPosition) => {
        return keyframes `
      0% { transform: scale(1, 1)};
      ${ellipsisDotPosition === 1 ? '25% { transform: scale(1.25)}' : '25% {transform: scale(1)}'};
      ${ellipsisDotPosition === 2 ? '50% { transform: scale(1.25)}' : '50% { transform: scale(0.75)}'};
      ${ellipsisDotPosition === 3 ? '75% { transform: scale(1.25)}' : '75% {transform: scale(1)}'};
      100% { transform: scale(1, 1)};
    `;
    };
    /**
     * method to return styles based on dot
     * @param ellipsisDotPosition - represents the position of the dot (1,2 or 3)
     * @example - getStylesForDot(1)
     * @returns - style object
     */
    const getStylesForDot = (ellipsisDotPosition) => {
        var _a, _b, _c, _d;
        return {
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '5px',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.darkGrey,
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.darkGrey,
            position: (ellipsisDotPosition === 2) ? 'relative' : 'absolute',
            left: (ellipsisDotPosition === 1) ? '-0.688rem' : '0.688rem',
            animation: `${getAnimationsForDot(ellipsisDotPosition)} 1s infinite linear`,
            //breakpoints for responsiveness
            [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
                width: '0.3rem',
                height: '0.3rem',
                left: (ellipsisDotPosition === 1) ? '-0.5rem' : '0.5rem',
            },
            [theme.breakpoints.up(theme.breakpoints.values.md)]: {
                width: '0.4rem',
                height: '0.4rem',
                left: (ellipsisDotPosition === 1) ? '-0.563rem' : '0.563rem',
            },
            [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
                width: '0.5rem',
                height: '0.5rem',
                left: (ellipsisDotPosition === 1) ? '-0.688rem' : '0.688rem',
            },
            [theme.breakpoints.up(theme.breakpoints.values.xl)]: {
                width: '0.5rem',
                height: '0.5rem',
                left: (ellipsisDotPosition === 1) ? '-0.688rem' : '0.688rem',
            },
        };
    };
    const styles = {
        dotElastic: Object.assign(Object.assign({}, getStylesForDot(2)), { 
            // Pseudo-elements for additional dots, adds one dot before and after. first aand third dot
            //for these dots both size and the position changes through animation.
            '&::before, &::after': {
                content: '""',
                display: 'inline-block',
                top: '0',
            }, 
            // Styles for the first dot 
            '&::before': Object.assign({}, getStylesForDot(1)), 
            // Styles for the third dot
            '&::after': Object.assign({}, getStylesForDot(3)) }),
    };
    return styles;
};
export default CcfAnimatedEllipsisControlStyles;
//# sourceMappingURL=ccf-animated-ellipsis-control.styles.js.map