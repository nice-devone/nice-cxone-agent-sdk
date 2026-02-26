/**
 * @param theme - Theme palette
 * @param ccfLoaderOptions - isPrimary and brandingColor options
 * @returns ccfLoaderStyles
 * @example - ccfLoaderStyles
 */
const ccfLoaderStyles = (theme, options) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
            width: '4px',
            height: '9px',
            background: brandingBackGround,
            margin: '10px 4px',
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
        loaderColor: {
            color: options.isPrimary ? (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.main : (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.paper,
        },
    };
    return styles;
};
export default ccfLoaderStyles;
//# sourceMappingURL=ccf-loader.styles.js.map