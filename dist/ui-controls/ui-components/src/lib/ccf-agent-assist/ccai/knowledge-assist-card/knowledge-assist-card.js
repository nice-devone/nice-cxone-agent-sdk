import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { KnowledgeArticleTypeEnum } from '@nice-devone/common-sdk';
import { useTheme, Box, Snackbar, SnackbarContent } from '@mui/material';
import sortNumericDownIcon from '../../../../assets/agent-assist/ccai/sort-desc.svg';
import knowledgeAssistCardStyles from './knowledge-assist-card.styles';
import { ArticleIcon, FAQIcon, CopyIcon } from '../../constants/ccai-icons';
import { CcfButton, useTranslator } from '@nice-devone/ui-controls';
/**
 * Knowledge Assist Card component
 * @example - <KnowledgeAssistCard />
 */
export function KnowledgeAssistCard(props) {
    const [translate] = useTranslator();
    const [toastOpen, setToastOpen] = useState(false);
    const toastTimeOut = 2000;
    const isFaq = props.article.type === 'FAQ';
    const theme = useTheme();
    const kaCardStyles = knowledgeAssistCardStyles(theme);
    const combinedFaqTagStyles = Object.assign(Object.assign({}, kaCardStyles.tag), kaCardStyles.faq);
    const combinedArticleTagStyles = Object.assign(Object.assign({}, kaCardStyles.tag), kaCardStyles.article);
    /**
     * Function to copy the card text to clipboard
     * @example - copyToClipboard();
     */
    const copyToClipboard = () => {
        const cardText = isFaq
            ? Array.isArray(props.article.descriptions) && props.article.descriptions[0]
            : encodeURI(props.article.uri);
        // Copy to clipboard
        navigator.clipboard.writeText(cardText).then(() => {
            // Show success message
            setToastOpen(true);
        });
    };
    /**
     * Function to handle the close of toast message
     * @example - handleToastClose();
     */
    const handleToastClose = () => {
        setToastOpen(false);
    };
    /**
     * Function to get styles for article relevance copy container
     * @example
     * ```
     * const styles = getStyleArticleRelevanceCopyContainer();
     * ```
     */
    const getStyleArticleRelevanceCopyContainer = () => {
        return props.isBelowMd ? kaCardStyles.smViewArticleRelevanceCopyContainer : kaCardStyles.articleRelevanceCopyContainer;
    };
    return (_jsxs(Box, Object.assign({ style: kaCardStyles.mainBox }, { children: [_jsxs("div", Object.assign({ style: kaCardStyles.mainFlexContainer }, { children: [_jsxs("div", { children: [isFaq && (_jsx("div", Object.assign({ style: kaCardStyles.faqIcon }, { children: _jsx(FAQIcon, { imageSize: 20 }) }))), !isFaq && props.article.type === KnowledgeArticleTypeEnum.ARTICLE && (_jsx("div", Object.assign({ style: kaCardStyles.articleIcon }, { children: _jsx(ArticleIcon, { imageSize: 20 }) })))] }), _jsxs("div", Object.assign({ style: kaCardStyles.innerFlexContainer }, { children: [isFaq && (_jsxs("div", Object.assign({ style: kaCardStyles.articleFlexContainer }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ style: combinedFaqTagStyles }, { children: props.article.type })) }), _jsx("div", { children: _jsx("div", { children: _jsx("h5", Object.assign({ style: kaCardStyles.h5Margin }, { children: props.article.title })) }) }), _jsx("div", { children: props.article.descriptions.map((description, index) => (_jsx("div", Object.assign({ style: kaCardStyles.articleDescription }, { children: description }), index))) })] }))), !isFaq && props.article.type === KnowledgeArticleTypeEnum.ARTICLE && (_jsxs("div", Object.assign({ style: kaCardStyles.articleFlexContainer }, { children: [_jsx("div", { children: _jsx("span", Object.assign({ style: combinedArticleTagStyles }, { children: props.article.type })) }), _jsx("div", { children: _jsx("a", Object.assign({ href: props.article.uri, title: props.article.title, target: "_blank", rel: "noopener noreferrer" }, { children: _jsx("h5", Object.assign({ style: kaCardStyles.h5Margin }, { children: props.article.title })) })) }), _jsx("div", { children: props.article.descriptions.map((description, index) => (_jsx("div", Object.assign({ style: kaCardStyles.articleDescription }, { children: description }), index))) })] }))), _jsxs("div", Object.assign({ style: getStyleArticleRelevanceCopyContainer() }, { children: [_jsx("div", Object.assign({ style: kaCardStyles.relevanceContainerWidth }, { children: props.article.confidence && (_jsxs("div", Object.assign({ style: kaCardStyles.relevanceScoreContainer }, { children: [_jsx("img", { src: sortNumericDownIcon, alt: "Sort Icon", width: '16px', height: '16px' }), _jsxs("div", Object.assign({ style: kaCardStyles.relevanceScoreText }, { children: [translate('relevance'), ": ", (props.article.confidence * 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })] }))] }))) })), _jsx("div", { children: _jsx(CcfButton, Object.assign({ variant: "outlined", style: kaCardStyles.copyButton, onClick: copyToClipboard }, { children: _jsxs("div", Object.assign({ style: kaCardStyles.copyButtonContent }, { children: [_jsx(CopyIcon, { imageSize: 12 }), _jsxs("h5", { children: ["\u00A0", translate('copy')] })] })) })) })] }))] }))] })), _jsx(Snackbar, Object.assign({ anchorOrigin: { vertical: 'top', horizontal: 'right' }, open: toastOpen, autoHideDuration: toastTimeOut, onClose: handleToastClose }, { children: _jsx(SnackbarContent, { sx: kaCardStyles.copySnackBar, message: "Copied" }) }))] })));
}
//# sourceMappingURL=knowledge-assist-card.js.map