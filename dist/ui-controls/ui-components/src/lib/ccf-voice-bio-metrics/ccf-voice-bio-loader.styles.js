/**
 * @param theme - Theme palette
 * @param ccfLoaderOptions - isPrimary and brandingColor options
 * @returns ccfLoaderStyles
 * @example - ccfLoaderStyles
 */
const ccfVoiceBioLoaderStyles = (theme, options) => {
    var _a, _b, _c, _d;
    let brandingBackGround = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper;
    if (options.brandingColor) {
        brandingBackGround = options.brandingColor;
    }
    else if (options.isPrimary) {
        brandingBackGround = (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.main;
    }
    const styles = {
        loaderContainer: {
            display: 'inline-flex',
        },
        loaderBox: {
            margin: 0,
            display: 'flex',
            paddingLeft: 0,
        },
        loader: {
            '@keyframes animate': {
                '0%': {
                    transform: 'scaleY(1)',
                },
                '25%': {
                    transform: 'scaleY(1)',
                },
                '50%': {
                    transform: 'scaleY(1)',
                },
                '75%': {
                    transform: 'scaleY(1)',
                },
                '100%': {
                    transform: 'scaleY(3)',
                },
            },
            listStyle: 'none',
            width: '2px',
            height: '5px',
            background: brandingBackGround,
            margin: '10px 1px',
            animation: 'animate .7s infinite alternate',
        },
        firstLoaderBar: {
            animationDelay: '0.1s',
        },
        secondLoaderBar: {
            animationDelay: '0.2s',
        },
        thirdLoaderBar: {
            animationDelay: '0.3s',
        },
    };
    return styles;
};
export default ccfVoiceBioLoaderStyles;
//# sourceMappingURL=ccf-voice-bio-loader.styles.js.map