import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, Button, Box, useTheme } from '@mui/material';
import { CcfLeftArrowIcon } from '../../icons/ccf-left-arrow-icon/ccf-left-arrow-icon';
import { CcfRightArrowIcon } from '../../icons/ccf-right-arrow-icon/ccf-right-arrow-icon';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import ccfCarouselStyles from './ccf-carousel.styles';
/**
 * Functional component is a wrapper for material UI card component
 * @returns material UI carousel element
 * @example <CcfCarousel/>
 */
export function CcfCarousel({ children = [], isVoiceContact = false, index }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [cardIndex, setCardIndex] = useState(index !== null && index !== void 0 ? index : 0);
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = ccfCarouselStyles(theme);
    const cardContentStyle = Object.assign(Object.assign({}, ((styles === null || styles === void 0 ? void 0 : styles.cardContent) || {})), { '&.MuiCardContent-root': {
            padding: children && children.length === 1 ? '0.625rem' : 0,
        } });
    /**
      * method to handle click of left arrow icon
      * @example
      * ```
      * handleLeftArrowClick()
      * ```
    */
    const handleLeftArrowClick = () => {
        setCardIndex((prevCard) => (prevCard - 1 + children.length) % children.length);
    };
    /**
      * method to handle click of right arrow icon
      * @example
      * ```
      * handleRightArrowClick()
      * ```
     */
    const handleRightArrowClick = () => {
        setCardIndex((prevCard) => (prevCard + 1) % children.length);
    };
    const backgroundColor = isVoiceContact ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.default : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper;
    return (_jsxs(Box, { children: [_jsxs(Box, Object.assign({ sx: styles === null || styles === void 0 ? void 0 : styles.mainCard }, { children: [(children === null || children === void 0 ? void 0 : children.length) > 1 && (_jsx(CcfTooltip, Object.assign({ title: translate('previousResponse'), arrow: true }, { children: _jsx(Button, Object.assign({ size: "small", sx: styles === null || styles === void 0 ? void 0 : styles.arrow }, { children: _jsx(CcfLeftArrowIcon, { onClick: () => handleLeftArrowClick(), "data-testid": "left-arrow-icon", sx: styles === null || styles === void 0 ? void 0 : styles.iconsHover, fill: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.dark }) })) }))), _jsx(Card, Object.assign({ sx: Object.assign(Object.assign({}, styles.card), { backgroundColor }) }, { children: (children === null || children === void 0 ? void 0 : children.length) > 0 && (_jsx(CardContent, Object.assign({ sx: cardContentStyle, "data-testid": "cardcontent" }, { children: _jsx(Box, { children: children[cardIndex] }) }))) })), (children === null || children === void 0 ? void 0 : children.length) > 1 && (_jsx(CcfTooltip, Object.assign({ title: translate('nextResponse'), arrow: true }, { children: _jsx(Button, Object.assign({ size: "small", sx: styles === null || styles === void 0 ? void 0 : styles.arrow }, { children: _jsx(CcfRightArrowIcon, { onClick: () => handleRightArrowClick(), "data-testid": "right-arrow-icon", sx: styles === null || styles === void 0 ? void 0 : styles.iconsHover, fill: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.dark }) })) })))] })), children.length > 1 && (_jsx(Box, Object.assign({ sx: styles === null || styles === void 0 ? void 0 : styles.carouselDots }, { children: children.map((_, index) => (
                /* chilren contains react element which does not have any unique property to be used as key.
                 * Also the map function value is not used inside the map function. Using index as key is not recommended.
                 */
                // eslint-disable-next-line react/jsx-key
                _jsx(Button, { sx: index === cardIndex ? Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.activeIndicator) : Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.indicator) }))) })))] }));
}
//# sourceMappingURL=ccf-carousel.js.map