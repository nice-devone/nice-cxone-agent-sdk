import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import copyIcon from '../../../../assets/copy.svg';
import { Button, Card, CardContent, Snackbar, useTheme } from '@mui/material';
import sortNumericDownIcon from '../../../../assets/agent-assist/ccai/sort-desc.svg';
import smartReplyCardStyles from './smart-reply-card.styles';
/**
 * Smart Reply Card component
 * @example - <SmartReplyCard />
 */
export function SmartReplyCard(props) {
    const theme = useTheme();
    const smartReplyCardSx = smartReplyCardStyles(theme);
    const [toastOpen, setToastOpen] = useState(false);
    const [elevationRaise, setElevationRaise] = useState(1);
    const toastTimeOut = 2000;
    /**
     * Function to copy the article title to clipboard
     * @example - copyToClipboard();
     */
    const copyToClipboard = () => {
        const cardText = props.article.title;
        // Copy to clipboard
        navigator.clipboard.writeText(cardText).then(() => {
            // Show success message
            setToastOpen(true);
        });
    };
    /**
     * Function to handle the toast message close
     * @example - handleToastClose();
     */
    const handleToastClose = () => {
        setToastOpen(false);
    };
    /**
     * function to handle mouse over event for Card
     * @example - onMouseOverEvent();
     */
    const onMouseOverEvent = () => { setElevationRaise(3); };
    /**
     * function to handle mouse out event for Card
     * @example - onMouseOutEvent();
     */
    const onMouseOutEvent = () => { setElevationRaise(1); };
    return (_jsxs(_Fragment, { children: [_jsx(Card, Object.assign({ elevation: elevationRaise, onMouseOver: onMouseOverEvent, onMouseOut: onMouseOutEvent, style: smartReplyCardSx.mainContainer }, { children: _jsx(CardContent, Object.assign({ style: smartReplyCardSx.paddingContainer }, { children: _jsxs("div", Object.assign({ style: smartReplyCardSx.mainFlexContainer }, { children: [_jsx("div", Object.assign({ style: smartReplyCardSx.articleTitleContainer }, { children: _jsx("span", Object.assign({ style: smartReplyCardSx.articleTitleText }, { children: props.article.title })) })), _jsxs("div", Object.assign({ style: smartReplyCardSx.cardFooterFlexContainer }, { children: [_jsxs("div", Object.assign({ style: smartReplyCardSx.confidenceFlexContainer }, { children: [_jsx("div", Object.assign({ style: smartReplyCardSx.numericIconContainer }, { children: _jsx("img", { src: sortNumericDownIcon, alt: "Sort Icon", width: '16px', height: '16px' }) })), _jsx("div", Object.assign({ style: smartReplyCardSx.confidenceScore }, { children: (props.article.confidence * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }))] })), _jsx("div", Object.assign({ style: smartReplyCardSx.copyButtonContainer }, { children: _jsx(Button, Object.assign({ variant: "outlined", title: "Copy", style: smartReplyCardSx.copyButton, onClick: copyToClipboard }, { children: _jsx("img", { src: copyIcon, alt: "Copy Icon" }) })) }))] }))] })) })) })), _jsx(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: toastOpen, autoHideDuration: toastTimeOut, onClose: handleToastClose, message: "Copied" })] }));
}
//# sourceMappingURL=smart-reply-card.js.map