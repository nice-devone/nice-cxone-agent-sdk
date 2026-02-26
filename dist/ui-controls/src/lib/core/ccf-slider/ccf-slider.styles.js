/**
 * Styling for ccfSliderStyles
 * @returns ccfSliderStyles CSS properties as a JSON object
 * @example ccfSliderStyles
 */
const ccfSliderStyles = (theme) => {
    const styles = {
        root: {
            width: 300,
            margin: '0 10px',
        },
        margin: {
            height: theme.spacing(3),
        },
        slider: {
            height: 2,
            padding: '5px 0',
            background: 'linear-gradient(90deg, #2ad28b 30%, #F4732E 60%)',
            pointerEvents: 'none',
            '& .MuiSlider-thumb': {
                height: 18,
                width: 18,
                backgroundColor: 'transparent',
                border: '4px solid #6d6e70',
                pointerEvents: 'none',
                marginTop: '-9px',
                marginLeft: '-12px',
                '&:focus, &:hover, &$active': {
                    boxShadow: 'inherit',
                },
            },
            '& .MuiSlider-valueLabel': {
                left: 'calc(-50% + -6px)',
                top: 22,
                '& *': {
                    background: 'transparent',
                    font: 'normal normal 600 16px/18px Open Sans !important',
                    color: '#7C96A3',
                },
            },
            '& .MuiSlider-track': {
                height: 0,
            },
            '& .MuiSlider-rail': {
                opacity: 1,
                height: 0,
            },
            '& .MuiSlider-mark': {
                backgroundColor: '#000',
                height: '8px',
                width: '1px',
                marginTop: '-3px',
            },
            '& .MuiSlider-markActive': {
                opacity: 1,
            },
        },
    };
    return styles;
};
export default ccfSliderStyles;
//# sourceMappingURL=ccf-slider.styles.js.map