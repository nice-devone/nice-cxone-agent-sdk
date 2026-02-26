import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { KnowledgeAssistGroup } from '../ccai/knowledge-assist-group/knowledge-assist-group';
import { SmartReplyGroup } from '../ccai/smart-reply-group/smart-reply-group';
import { getKnowledgeArticleSuggestionsForContactId, getSmartRepliesForContactId } from '../features/ccai-slice';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import ccaiStyles from './ccai.styles';
import { useTranslator } from '@nice-devone/ui-controls';
/**
 * CCAI App component
 * @example - <CcaiAppComponent />
 */
export function CcaiAppComponent(props) {
    const ccaiAppStyles = ccaiStyles();
    const [translate] = useTranslator();
    const knowledgeArticleSuggestions = useSelector(getKnowledgeArticleSuggestionsForContactId(props.selectedContactId));
    const smartReplies = useSelector(getSmartRepliesForContactId(props.selectedContactId));
    /**
     * Get Styles for Smart Reply List container
     * @example
     * ```
     * const styles = getStylesForSmartReplyContainer();
     * ```
     */
    const getStylesForSmartReplyContainer = () => {
        return props.isBelowMd ? ccaiAppStyles.smViewSmartReplyListContainer : ccaiAppStyles.smartReplyListContainer;
    };
    return (_jsxs("div", Object.assign({ style: ccaiAppStyles.mainFlexContainer }, { children: [knowledgeArticleSuggestions && (knowledgeArticleSuggestions === null || knowledgeArticleSuggestions === void 0 ? void 0 : knowledgeArticleSuggestions.length) > 0 && (_jsx("div", Object.assign({ style: smartReplies && smartReplies.length > 0 ? ccaiAppStyles.kbArticlesListMainBoxPartialView : ccaiAppStyles.kbArticlesListMainBoxFullView }, { children: _jsx("div", Object.assign({ style: ccaiAppStyles.kbArticlesListFlexBox }, { children: knowledgeArticleSuggestions.map((suggestion, index) => (_jsx(KnowledgeAssistGroup, { isBelowMd: props.isBelowMd, suggestion: suggestion }, `kaSuggestion_${index}`))) })) }))), knowledgeArticleSuggestions && (knowledgeArticleSuggestions === null || knowledgeArticleSuggestions === void 0 ? void 0 : knowledgeArticleSuggestions.length) === 0 && (_jsx("div", Object.assign({ style: smartReplies && smartReplies.length > 0 ? ccaiAppStyles.noKbArticlesContainerPartialView : ccaiAppStyles.noKbArticlesContainerFullView }, { children: _jsx("div", { children: translate('noKnowledgeArticles') }) }))), smartReplies && (smartReplies === null || smartReplies === void 0 ? void 0 : smartReplies.length) > 0 && (_jsx(Divider, { orientation: "horizontal", flexItem: true })), smartReplies && (smartReplies === null || smartReplies === void 0 ? void 0 : smartReplies.length) > 0 && (_jsx("div", Object.assign({ style: getStylesForSmartReplyContainer() }, { children: smartReplies.map((suggestion, index) => (_jsx(SmartReplyGroup, { suggestion: suggestion }, `smReply_${index}`))) })))] })));
}
//# sourceMappingURL=ccai.js.map