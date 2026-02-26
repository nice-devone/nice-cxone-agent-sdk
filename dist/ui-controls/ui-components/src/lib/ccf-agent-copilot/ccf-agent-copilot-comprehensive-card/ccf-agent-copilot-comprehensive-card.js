import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme, Container, Box, Collapse, IconButton, TextField, Button, Chip, } from '@mui/material';
import ccfCopilotCardStyles from '../ccf-agent-copilot-container.styles';
import { CcfAccordion, CcfAccordionDetails, CcfAccordionSummary, CcfDislikeFilledIcon, CcfDislikeUnfilledIcon, CcfFeedbackIcon, CcfLikeFilledIcon, CcfLikeUnfilledIcon, CcfTooltip, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { CardActions, CcfAgentCopilotContainerFunctions } from '../ccf-agent-copilot-helper';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CcfCopilotActions } from '../ccf-agent-copilot-container.slice';
/**
 * Component to display copilot comprehensive card
 * @returns
 * @example
 */
const CcfAgentCopilotComprehensiveCard = ({ comprehensiveCardData, contactId, interactionStatus }) => {
    var _a, _b;
    let updatedGuidanceFeedbackData = (comprehensiveCardData === null || comprehensiveCardData === void 0 ? void 0 : comprehensiveCardData.guidanceFeedbacks) ? [...comprehensiveCardData.guidanceFeedbacks] : [];
    const theme = useTheme();
    const dispatch = useDispatch();
    const cardStyles = ccfCopilotCardStyles(theme);
    const [, setComment] = useState('');
    const [translate] = useTranslator();
    const [comments, setComments] = useState([]);
    const cxoneClientInstance = CXoneClient.instance;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aahConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${contactId}`, true);
    const { Params } = aahConfiguration || {};
    const { unratedFeedback, positiveTagEnabled, negativeTagEnabled, guidanceFeedbackCards, positiveCommentEnabled, negativeCommentEnabled, overallSubcard, positiveFeedbackEnabled, negativeFeedbackEnabled, } = Params || {};
    useEffect(() => {
        var _a, _b;
        const initialComments = ((_a = comprehensiveCardData === null || comprehensiveCardData === void 0 ? void 0 : comprehensiveCardData.guidanceFeedbacks) === null || _a === void 0 ? void 0 : _a.map(feedback => ({
            objectId: feedback === null || feedback === void 0 ? void 0 : feedback.objectId,
            comment: (feedback === null || feedback === void 0 ? void 0 : feedback.comment) || '',
        }))) || [];
        initialComments.push({ objectId: 'overallSubcard', comment: ((_b = comprehensiveCardData === null || comprehensiveCardData === void 0 ? void 0 : comprehensiveCardData.contactFeedbackCard) === null || _b === void 0 ? void 0 : _b.comment) || '' });
        setComments(initialComments);
        overallSubcard && dispatch(CcfCopilotActions.addOverallSubcardData({ contactId }));
    }, []);
    /**
     * Function to store comment for individual card
     * @param data - GuidanceFeedbackData
     * @example handleCommentChange(event, objectId)
     */
    const handleCommentChange = (value, data) => {
        const updatedComments = [...comments];
        const commentIndex = updatedComments === null || updatedComments === void 0 ? void 0 : updatedComments.findIndex(comment => comment.objectId === data.objectId);
        if (commentIndex !== -1) {
            updatedComments[commentIndex] = { objectId: data.objectId, comment: value };
        }
        else {
            updatedComments.push({ objectId: data.objectId, comment: value });
        }
        setComments(updatedComments);
        const feedbackData = Object.assign(Object.assign({}, data), { comment: value });
        CcfAgentCopilotContainerFunctions.debouncedDispatch(value, feedbackData, dispatch);
    };
    updatedGuidanceFeedbackData = CcfAgentCopilotContainerFunctions.filterGuidanceFeedbacks(updatedGuidanceFeedbackData, unratedFeedback, positiveFeedbackEnabled, negativeFeedbackEnabled);
    /**
     * Function to get comment based on objectId
     * @param objectId - objectId of the accordion
     * @example getComment(objectId)
     */
    const getComment = (objectId) => {
        const commentObj = comments === null || comments === void 0 ? void 0 : comments.find(comment => comment.objectId === objectId);
        return commentObj ? commentObj.comment : '';
    };
    /**
     * Function to get feedback tags based on feedback
     * @param isPositiveFeedback - boolean feedback value based on positive or negative
     * @example getFeedbackTags(isPositiveFeedback)
     */
    const getFeedbackTags = (isPositiveFeedback) => {
        const positiveTags = [
            translate('adp_feedbackTagAccurate'),
            translate('adp_feedbackTagComplete'),
            translate('adp_feedbackTagRelevant'),
            translate('adp_feedbackTagOther')
        ];
        const negativeTags = [
            translate('adp_feedbackTagInaccurate'),
            translate('adp_feedbackTagIncomplete'),
            translate('adp_feedbackTagIrrelevant'),
            translate('adp_feedbackTagSlow'),
            translate('adp_feedbackTagOther')
        ];
        return isPositiveFeedback ? positiveTags : negativeTags;
    };
    const feedbackTooltipStyle = Object.assign(Object.assign({}, cardStyles.feedbackTooltipText), { color: cardStyles.feedbackTooltipText.color || 'inherit' });
    /**
     * Function to determine background color of guidance feedback tags
     * @param guidanceFeedbackTag - tag selected for the guidance feedback card in state
     * @param label - label of the select tag on UI
     * @param isInteractionStatusActive - to check if iteraction is active or closed
     * @param theme - theme object from materialui
     * @example getBackgroundColor(guidanceFeedbackTag, label, isInteractionStatusActive, theme)
     */
    const getBackgroundColor = (guidanceFeedbackTag, label, isInteractionStatusActive, theme) => {
        var _a, _b, _c, _d, _e;
        if (guidanceFeedbackTag === label) {
            return isInteractionStatusActive ? (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteInput : (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background.darkGrey;
        }
        return (_e = (_d = theme.palette) === null || _d === void 0 ? void 0 : _d.background) === null || _e === void 0 ? void 0 : _e.paper;
    };
    const feedback = (_a = comprehensiveCardData === null || comprehensiveCardData === void 0 ? void 0 : comprehensiveCardData.contactFeedbackCard) === null || _a === void 0 ? void 0 : _a.feedback;
    const expandContactFeedbackCard = feedback && ((feedback === CardActions.LIKE_OVERALL_SUBCARD && positiveCommentEnabled) || (feedback === CardActions.DISLIKE_OVERALL_SUBCARD && negativeCommentEnabled));
    return (_jsxs(Container, Object.assign({ sx: cardStyles.copilotCard, disableGutters: true, maxWidth: false }, { children: [_jsxs(Box, Object.assign({ style: cardStyles.feedbackCard }, { children: [_jsx(CcfFeedbackIcon, {}), _jsx(CcfTypography, { variant: 'h6', sx: cardStyles.responseText, translationKey: 'adp_feedbackTitle' })] })), _jsx(CcfTypography, { variant: 'body1', sx: cardStyles.comprehensiveText, mb: 1, translationKey: 'adp_feedbacksubTitle' }), overallSubcard && _jsx(Box, Object.assign({ mb: 1 }, { children: _jsxs(CcfAccordion, Object.assign({ sx: cardStyles.accordionBackground, disableGutters: true }, { children: [_jsx(CcfAccordionSummary, { children: _jsxs(Box, Object.assign({ sx: cardStyles.accordionBox }, { children: [_jsx(CcfTypography, Object.assign({ sx: cardStyles.responseText }, { children: (_b = comprehensiveCardData === null || comprehensiveCardData === void 0 ? void 0 : comprehensiveCardData.contactFeedbackCard) === null || _b === void 0 ? void 0 : _b.overallFeedbackTitle })), _jsxs(Box, Object.assign({ sx: { display: 'flex' } }, { children: [_jsx(CcfTooltip, Object.assign({ title: _jsx(CcfTypography, { sx: feedbackTooltipStyle, translationKey: 'adp_likeArticle' }), styles: { ccfTooltip: Object.assign({}, cardStyles.feedbackTooltip), ccfTooltipArrow: Object.assign({}, cardStyles.feedbackTooltipArrow) } }, { children: _jsx(IconButton, Object.assign({ size: "small", onClick: event => CcfAgentCopilotContainerFunctions.handleLikeDislike(event, { feedback: CardActions.LIKE_OVERALL_SUBCARD, objectId: 'overallSubcard', contactId }, dispatch), disabled: !interactionStatus, disableRipple: true, sx: {
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                        },
                                                    } }, { children: feedback === CardActions.LIKE_OVERALL_SUBCARD ? _jsx(CcfLikeFilledIcon, { sx: cardStyles.feedbackActionIcons }) : _jsx(CcfLikeUnfilledIcon, { sx: cardStyles.feedbackActionIcons }) })) })), _jsx(CcfTooltip, Object.assign({ title: _jsx(CcfTypography, { sx: feedbackTooltipStyle, translationKey: 'adp_dislikeArticle' }), styles: { ccfTooltip: Object.assign({}, cardStyles.feedbackTooltip), ccfTooltipArrow: Object.assign({}, cardStyles.feedbackTooltipArrow) } }, { children: _jsx(IconButton, Object.assign({ size: "small", onClick: event => CcfAgentCopilotContainerFunctions.handleLikeDislike(event, { feedback: CardActions.DISLIKE_OVERALL_SUBCARD, objectId: 'overallSubcard', contactId }, dispatch), disabled: !interactionStatus, disableRipple: true, sx: {
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                        },
                                                    } }, { children: feedback === CardActions.DISLIKE_OVERALL_SUBCARD ? _jsx(CcfDislikeFilledIcon, { sx: cardStyles.feedbackActionIcons }) : _jsx(CcfDislikeUnfilledIcon, { sx: cardStyles.feedbackActionIcons }) })) }))] }))] })) }), expandContactFeedbackCard && _jsx(CcfAccordionDetails, { children: _jsx(Collapse, Object.assign({ in: feedback !== null }, { children: _jsx(TextField, { fullWidth: true, placeholder: translate('adp_feedbackPlaceholder'), multiline: true, size: 'small', disabled: !interactionStatus, sx: cardStyles.feedbackCommentText, value: getComment('overallSubcard'), onChange: event => handleCommentChange(event.target.value, { objectId: 'overallSubcard', contactId, feedback }) }) })) })] })) })), guidanceFeedbackCards && updatedGuidanceFeedbackData.map(guidanceFeedback => {
                const positiveFeedback = CcfAgentCopilotContainerFunctions.checkFeedback(guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.feedback, [CardActions.LIKE, CardActions.LIKE_INDIVIDUAL_SUBCARDS]);
                const negativeFeedback = CcfAgentCopilotContainerFunctions.checkFeedback(guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.feedback, [CardActions.DISLIKE, CardActions.DISLIKE_INDIVIDUAL_SUBCARDS]);
                const expandGuidanceCardOnLike = CcfAgentCopilotContainerFunctions.shouldExpandGuidanceCard(positiveFeedback, positiveCommentEnabled, positiveTagEnabled);
                const expandGuidanceCardOnDislike = CcfAgentCopilotContainerFunctions.shouldExpandGuidanceCard(negativeFeedback, negativeCommentEnabled, negativeTagEnabled);
                return (_jsx(Box, Object.assign({ mb: 1 }, { children: _jsxs(CcfAccordion, Object.assign({ sx: cardStyles.accordionBackground, disableGutters: true }, { children: [_jsx(CcfAccordionSummary, { children: _jsxs(Box, Object.assign({ sx: cardStyles.accordionBox }, { children: [_jsx(CcfTypography, Object.assign({ sx: cardStyles.responseText }, { children: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.title })), _jsxs(Box, Object.assign({ sx: { display: 'flex' } }, { children: [_jsx(CcfTooltip, Object.assign({ title: _jsx(CcfTypography, { sx: feedbackTooltipStyle, translationKey: 'adp_likeArticle' }), styles: { ccfTooltip: Object.assign({}, cardStyles.feedbackTooltip), ccfTooltipArrow: Object.assign({}, cardStyles.feedbackTooltipArrow) } }, { children: _jsx(IconButton, Object.assign({ size: "small", onClick: event => CcfAgentCopilotContainerFunctions.handleLikeDislike(event, { feedback: CardActions.LIKE_INDIVIDUAL_SUBCARDS, objectId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.objectId, contactId, agentContactId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentContactId, agentId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentId, kbAnswerUid: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.kbAnswerUid, utteranceId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.utteranceId, title: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.title }, dispatch), disabled: !interactionStatus, disableRipple: true, sx: {
                                                            '&:hover': {
                                                                backgroundColor: 'transparent',
                                                            },
                                                        } }, { children: positiveFeedback ? _jsx(CcfLikeFilledIcon, { sx: cardStyles.feedbackActionIcons }) : _jsx(CcfLikeUnfilledIcon, { sx: cardStyles.feedbackActionIcons }) })) })), _jsx(CcfTooltip, Object.assign({ title: _jsx(CcfTypography, { sx: feedbackTooltipStyle, translationKey: 'adp_dislikeArticle' }), styles: { ccfTooltip: Object.assign({}, cardStyles.feedbackTooltip), ccfTooltipArrow: Object.assign({}, cardStyles.feedbackTooltipArrow) } }, { children: _jsx(IconButton, Object.assign({ size: "small", onClick: event => CcfAgentCopilotContainerFunctions.handleLikeDislike(event, { feedback: CardActions.DISLIKE_INDIVIDUAL_SUBCARDS, objectId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.objectId, contactId, agentContactId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentContactId, agentId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentId, kbAnswerUid: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.kbAnswerUid, utteranceId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.utteranceId, title: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.title }, dispatch), disabled: !interactionStatus, disableRipple: true, sx: {
                                                            '&:hover': {
                                                                backgroundColor: 'transparent',
                                                            },
                                                        } }, { children: negativeFeedback ? _jsx(CcfDislikeFilledIcon, { sx: cardStyles.feedbackActionIcons }) : _jsx(CcfDislikeUnfilledIcon, { sx: cardStyles.feedbackActionIcons }) })) }))] }))] })) }), (guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.feedback) && (expandGuidanceCardOnLike || expandGuidanceCardOnDislike) && _jsx(CcfAccordionDetails, { children: _jsxs(Collapse, Object.assign({ in: (guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.feedback) !== null }, { children: [((positiveFeedback && positiveTagEnabled) || (negativeFeedback && negativeTagEnabled)) && _jsx(Box, Object.assign({ sx: cardStyles.feedbackTagContainer }, { children: (positiveFeedback
                                                ? getFeedbackTags(true)
                                                : getFeedbackTags(false)).map((label) => (_jsx(Chip, { label: label, color: 'default', size: 'small', disabled: !interactionStatus, sx: Object.assign(Object.assign({}, cardStyles.feedbackTags), { background: getBackgroundColor(guidanceFeedback.tag || '', label, interactionStatus, theme) }), variant: CcfAgentCopilotContainerFunctions.getChipVariant(guidanceFeedback.tag || '', label), onClick: () => CcfAgentCopilotContainerFunctions.handleSelectedChip({ tag: label, objectId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.objectId, contactId, feedback: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.feedback, agentId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentId, agentContactId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentContactId, utteranceId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.utteranceId, kbAnswerUid: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.kbAnswerUid, title: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.title }, dispatch) }, label))) })), ((positiveFeedback && positiveCommentEnabled) || (negativeFeedback && negativeCommentEnabled)) && _jsx(TextField, { fullWidth: true, placeholder: translate('adp_feedbackPlaceholder'), multiline: true, size: 'small', disabled: !interactionStatus, sx: cardStyles.feedbackCommentText, value: getComment(guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.objectId), onChange: (event) => handleCommentChange(event.target.value, { objectId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.objectId, contactId, feedback: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.feedback, tag: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.tag, agentId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentId, agentContactId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.agentContactId, utteranceId: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.utteranceId, kbAnswerUid: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.kbAnswerUid, title: guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.title }) })] })) })] })) }), guidanceFeedback === null || guidanceFeedback === void 0 ? void 0 : guidanceFeedback.objectId));
            }), _jsx(Button, Object.assign({ variant: "contained", color: "primary", disabled: !interactionStatus, sx: cardStyles.comprehensiveFeedbackButton, onClick: () => CcfAgentCopilotContainerFunctions.sendFeedbackData(contactId, comprehensiveCardData, dispatch), disableRipple: true }, { children: translate('adp_saveFeedback') }))] })));
};
export default CcfAgentCopilotComprehensiveCard;
//# sourceMappingURL=ccf-agent-copilot-comprehensive-card.js.map