/**
 *
 * @returns SkipToContentStyles
 * @example - SkipToContentStyles()
 */
export const SkipToContentStyles = (theme) => ({
    button: {
        backgroundColor: `${theme.palette.text.white}`,
        color: '#003D7A',
        padding: '0.3125rem 1rem',
        borderRadius: '0.5rem',
        border: `0.1875rem solid ${theme.palette.primary.main}`,
        fontWeight: 600,
        fontSize: '0.8125rem',
        textTransform: 'none',
        outline: '0.125rem solid transparent',
        boxShadow: 'none',
        ':hover, :focus, :focus-visible': {
            backgroundColor: '#f0f8ff',
            outline: `0.125rem solid ${theme.palette.text.white}`,
            border: `0.1875rem solid ${theme.palette.primary.main}`,
            boxShadow: 'none',
        },
        [theme.breakpoints.down('md')]: {
            padding: '.3125rem .625rem',
        },
    },
});
export default SkipToContentStyles;
//# sourceMappingURL=ccf-skip-to-content-styles.js.map