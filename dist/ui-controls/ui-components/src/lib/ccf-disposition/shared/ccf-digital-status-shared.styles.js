/**
 * @example - styles for digital status shared
 * @param theme - color theme
 * @param renderedInOutcomesPanel - This determines which size we want to render to
 * @param colorFinder - determines color for status/background/border.
 */
const CcfDigitalStatusSharedStyles = (largeComponent, colorFinder) => {
    const styles = {
        menu: {
            '& .MuiOutlinedInput-root': {
                padding: '0',
                marginTop: largeComponent ? '0px' : '1px',
                marginBottom: largeComponent ? '4px' : '1px',
                background: '#ffffff',
                width: largeComponent ? '100%' : '120px',
                height: largeComponent ? 'inherit' : '20px',
                fontSize: largeComponent ? 'inherit' : '11px',
                heightalign: 'middle',
                fontWeight: 700,
                '&:hover': {
                    background: colorFinder(true),
                }, '&.Mui-disabled:hover': {
                    background: '#ffffff',
                }, '.MuiOutlinedInput-notchedOutline': {
                    borderColor: colorFinder(),
                    borderWidth: '2px',
                },
            },
        },
        menuList: {
            height: 'fit-content',
            paddingTop: 0,
        },
        statusHelperText: {
            fontSize: '12px',
            fontWeight: 400,
            margin: 0,
        },
        statusTextStartAdornment: {
            content: '""',
            display: 'inline-block',
            position: 'relative',
            width: '0.6rem',
            height: '0.6rem',
            borderRadius: '50%',
        },
    };
    return styles;
};
export default CcfDigitalStatusSharedStyles;
//# sourceMappingURL=ccf-digital-status-shared.styles.js.map