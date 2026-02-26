import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { getNonIncomingActiveContactInSelectedInteraction, selectInboxCollapsedState, getCxoneDigitalContactUserSavedProperties, getActiveContactInSelectedInteraction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import ccfCopilotCardStyles from './ccf-agent-copilot-container.styles';
import { useTheme, useMediaQuery, Box, Divider } from '@mui/material';
import { CcfBox, CcfCard, CcfCarousel, CcfTypography, CcfImageWithZoom, CcfAppToastMessage, CcfAnimatedEllipsisControl, CcfSparklesIcon, useTranslator, } from '@nice-devone/ui-controls';
import { AdaptiveCard } from 'adaptivecards-react';
import * as ACData from 'adaptivecards-templating';
import { useRef, useEffect, useState, useMemo } from 'react';
import { MediaType, DigitalChannelStatus, AgentAssistConfigACPParamsKeys, AgentCopilotContentType, AgentCopilotCardType, VoiceContactStatus } from '@nice-devone/common-sdk';
import { getAdaptiveCards, getNextBestResponses, selectRunningSummary, getCopilotStatus, getCopilotRequestStatus, isAgentAssistConfigParamsEnabledForContact, CcfCopilotActions, getEmailIdentifier, getCurrentTopicCardUid, getComprehensiveFeedbackData, getIsFilterCardShown, getScriptParamsForContact, addAdaptiveCard, getIsComprehensiveFeedbackSent, getGenerateComprehensiveCard, getJourneySummaryAdaptiveCard, getIsJourneySummaryExpanded, getIsFinalSummaryRegenerating, getCopilotTaskAssistCardData, getIsAutoSummaryExpanded, getAutoSummaryAdaptiveCard, getAutoSummaryCardFeatures, getDecisionTreeOpenStatus, getDecisionTreeData, isKnowledgeHubConfigEnabledForContact } from './ccf-agent-copilot-container.slice';
import CcfAgentCopilotRunningSummary from './ccf-agent-copilot-running-summary/ccf-agent-copilot-running-summary';
import { toast, ToastContainer } from 'react-toastify';
import CcfEmptyCopilotState from './ccf-empty-copilot-state/ccf-empty-copilot-state';
import { CcfAgentCopilotContainerFunctions, CardActions, actionsForOpenContainer, actionToContainerId, ContainerId } from './ccf-agent-copilot-helper';
import CcfTypingIndicator from '../ccf-typing-preview/ccf-typing-indicator';
import { CcfAgentCopilotSearchContainer } from './ccf-agent-copilot-search-container/ccf-agent-copilot-search-container';
import { getApplicationLanguageTranslations } from '../global.app.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import CcfAgentCopilotComprehensiveCard from './ccf-agent-copilot-comprehensive-card/ccf-agent-copilot-comprehensive-card';
import { getJourneySummaryData } from './ccf-agent-copilot-middleware';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import CcfAgentCopilotTaskAssist from './ccf-agent-copilot-task-assist/ccf-agent-copilot-task-assist';
import ExpandablePopover from './ccf-agent-copilot-task-assist/ccf-expandable-popover';
import CcfInteractiveAdaptiveCard from './ccf-interactive-adaptive-card/CcfInteractiveAdaptiveCard';
import { CcfAgentCopilotDecisionTree } from './ccf-agent-copilot-decision-tree/ccf-agent-copilot-decision-tree';
/**
 * These are the content types for which schemas should be translated at runtime
 */
const adaptiveCardSchemasToTranslate = [
    AgentCopilotContentType.SENTIMENT,
    AgentCopilotContentType.TRANSFER_SUMMARY,
    AgentCopilotContentType.EMAIL_CREATION_CARD,
    AgentCopilotContentType.EMAIL_RESPONSE_CARD,
    AgentCopilotContentType.AUTOPILOT_TRANSFER_SUMMARY,
    AgentCopilotContentType.TASK_ASSIST,
    AgentCopilotContentType.FINAL_SUMMARY_NOTES
];
/**
 * Valid actions for feedback guidance
 */
const feedbackActions = [
    CardActions.LIKE,
    CardActions.DISLIKE,
    CardActions.LIKE_INDIVIDUAL_SUBCARDS,
    CardActions.DISLIKE_INDIVIDUAL_SUBCARDS,
    CardActions.LIKE_OVERALL_SUBCARD,
    CardActions.DISLIKE_OVERALL_SUBCARD
];
const ENABLE_DIRECT_QUERY_FROM_KNOWLEDGE_HUB = 'enableDirectQuery'; //To-do : Move to enum AgentAssistConfigACPParamsKeys
/**
 * Component displays copilot container with adaptive cards
 * @example <CcfAgentCopilotContainer/>
 */
export function CcfAgentCopilotContainer() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const theme = useTheme();
    const cardStyles = ccfCopilotCardStyles(theme);
    const hostConfig = {
        fontFamily: theme.typography.fontFamily,
        separator: {
            lineThickness: 1,
            lineColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteInput,
        },
        supportsInteractivity: true,
        containerStyles: {
            default: {
                foregroundColors: {
                    default: {
                        default: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.secondary) === null || _d === void 0 ? void 0 : _d.main,
                        subtle: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.secondary) === null || _f === void 0 ? void 0 : _f.main,
                    },
                    dark: {
                        default: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
                    },
                },
            },
        },
    };
    const isVoiceContact = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE ? true : false;
    const activeCaseId = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || `${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId}`;
    const containerRef = useRef(null);
    const existingAdaptiveCards = useSelector(getAdaptiveCards(activeCaseId || ''));
    const nextBestResponses = useSelector(getNextBestResponses(activeCaseId || ''));
    const currentRequestStatus = useSelector(getCopilotRequestStatus(activeCaseId || ''));
    const [isResponseLoading, setResponseLoading] = useState(currentRequestStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const rtSummary = useSelector(selectRunningSummary(activeCaseId || ''));
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const isCopilotAvailable = useSelector(getCopilotStatus());
    const [imageExpand, setimageExpand] = useState({ url: '', altText: '' });
    const agentSearchVisibilityFlag = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.KNOWLEDGE_BASE_AGENT_MANUAL_QUERY_INPUT));
    const isKHConfigEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.ENABLE_INPUT_JSON_FILE));
    const agentSearchVisibilityFlagForKHConfig = useSelector(isKnowledgeHubConfigEnabledForContact(ENABLE_DIRECT_QUERY_FROM_KNOWLEDGE_HUB));
    const primaryIconColor = ((_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.primary) === null || _k === void 0 ? void 0 : _k.main);
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const savedDigitalContactDetails = digitalContactUserSavedProperties === null || digitalContactUserSavedProperties === void 0 ? void 0 : digitalContactUserSavedProperties[activeCaseId];
    const emailIdentifier = useSelector(getEmailIdentifier(activeCaseId));
    const comprehensiveFeedbackData = useSelector(getComprehensiveFeedbackData(activeCaseId));
    const presentEmailIdentifier = useSelector(getCurrentTopicCardUid(activeCaseId));
    const translationsStrings = useSelector(getApplicationLanguageTranslations).text;
    const adaptiveCardTranslations = useMemo(() => {
        const translations = {};
        Object.keys(translationsStrings).forEach((key) => {
            if (key.startsWith('adp_')) {
                translations[key] = translationsStrings[key];
            }
        });
        return translations;
    }, [translationsStrings]);
    const [translate] = useTranslator();
    const scriptParams = useSelector(getScriptParamsForContact);
    const scriptParamsData = JSON.parse(scriptParams);
    const copilotFilterTags = (_l = scriptParamsData === null || scriptParamsData === void 0 ? void 0 : scriptParamsData.expertTags) !== null && _l !== void 0 ? _l : [];
    const isFilterCardShown = useSelector(getIsFilterCardShown(activeCaseId || ''));
    const isCopilotFilterCardPresent = existingAdaptiveCards.some(card => card.contentType === AgentCopilotContentType.COPILOT_FILTER_CARD);
    const isComprehensiveFeedbackSent = useSelector(getIsComprehensiveFeedbackSent(activeCaseId));
    const generateComprehensiveCard = useSelector(getGenerateComprehensiveCard(activeCaseId));
    const isFinalSummaryRegenerating = useSelector(getIsFinalSummaryRegenerating(activeCaseId));
    const cardRefs = useRef({});
    const prevAdaptiveCardsRef = useRef(existingAdaptiveCards);
    const isJourneySummaryExpanded = useSelector(getIsJourneySummaryExpanded(activeCaseId || ''));
    const journeySummaryCard = useSelector(getJourneySummaryAdaptiveCard(activeCaseId || ''));
    const journeySummaryFlag = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.JOURNEY_SUMMARY)) || false;
    const isLegalDisclosureEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.LEGAL_DISCLOSURE));
    const disclosureCardTitle = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.DISCLOSURE_CARD_TITLE));
    const disclosureDescription = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.DISCLOSURE_DESCRIPTION));
    const isCopilotDisclosureCardPresent = existingAdaptiveCards.some(card => card.contentType === AgentCopilotContentType.DISCLOSURE);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isTaskAssistFeatureToggleEnabled = isFeatureEnabled("release-agentcopilot-taskassist-ILLUM-7077" /* FeatureToggles.COPILOT_TASK_ASSIST_FEATURE_TOGGLE */) || false;
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const copilotTaskAssistCardData = useSelector(getCopilotTaskAssistCardData(activeCaseId || ''));
    const isAutoSummaryExpanded = useSelector(getIsAutoSummaryExpanded(activeCaseId || ''));
    const autoSummaryCard = useSelector(getAutoSummaryAdaptiveCard(activeCaseId || ''));
    const autoSummaryCardFeatures = useSelector(getAutoSummaryCardFeatures(activeCaseId || ''));
    const hasCopyIcon = (_m = autoSummaryCardFeatures === null || autoSummaryCardFeatures === void 0 ? void 0 : autoSummaryCardFeatures.some((feature) => feature.value === 'copyToClipboard')) !== null && _m !== void 0 ? _m : false;
    const isDecisionTreeOpen = useSelector(getDecisionTreeOpenStatus(activeCaseId || ''));
    const decisionTreeData = useSelector(getDecisionTreeData(activeCaseId || ''));
    /**
     * Function to transform expertData from config to the way needed by copilot filters adaptive card
     * @param copilotFilterTags - expert tags from script
     * @example transformData(copilotFilterTags)
     */
    const transformData = (copilotFilterTags) => {
        var _a;
        return {
            copilotFilters: {
                title: translate('adp_copilotFilters'),
                description: translate('adp_copilotFiltersSubtext'),
            },
            filters: {
                title: `${translate('adp_standardFilters')}`,
                values: (_a = copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.standard) !== null && _a !== void 0 ? _a : [],
            },
            customFilters: copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.custom.filter((filter) => {
                var _a, _b;
                return ((filter === null || filter === void 0 ? void 0 : filter.selected) && ((_a = filter === null || filter === void 0 ? void 0 : filter.selected) === null || _a === void 0 ? void 0 : _a.length) > 0) || ((filter === null || filter === void 0 ? void 0 : filter.default) && ((_b = filter === null || filter === void 0 ? void 0 : filter.default) === null || _b === void 0 ? void 0 : _b.length) > 0);
            }).slice(0, 5).map((filter) => {
                var _a;
                return ({
                    title: filter === null || filter === void 0 ? void 0 : filter.name,
                    values: (filter === null || filter === void 0 ? void 0 : filter.selected) && ((_a = filter === null || filter === void 0 ? void 0 : filter.selected) === null || _a === void 0 ? void 0 : _a.length) > 0 ? filter === null || filter === void 0 ? void 0 : filter.selected : filter === null || filter === void 0 ? void 0 : filter.default,
                });
            }),
        };
    };
    useEffect(() => {
        if ((savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isResponse) && presentEmailIdentifier !== emailIdentifier) {
            dispatch(CcfCopilotActions.updateAdaptiveCardsEmail(activeCaseId));
        }
    }, [savedDigitalContactDetails === null || savedDigitalContactDetails === void 0 ? void 0 : savedDigitalContactDetails.isResponse, emailIdentifier]);
    useEffect(() => {
        if (!isCopilotAvailable) {
            toast.warn(_jsx(CcfAppToastMessage, { type: "warning", messageKey: "copilotUnavaliableMessage", descriptionKey: 'copilotReconnectMessage' }), {
                autoClose: 5000,
                containerId: 'CopilotToastContainer',
                style: {
                    width: isVoiceContact ? '50%' : '100%',
                },
            });
        }
    }, []);
    useEffect(() => {
        if (isComprehensiveFeedbackSent) {
            toast.success(_jsx(CcfAppToastMessage, { type: "success", messageKey: "comprehensiveFeedbackSent" }), {
                autoClose: false,
                containerId: 'CopilotToastContainer',
                className: 'copilotFeedbackToast',
                hideProgressBar: true,
                style: {
                    width: isVoiceContact ? '50%' : '100%',
                },
            });
            dispatch(CcfCopilotActions.setIsComprehensiveFeedbackSent({ caseId: activeCaseId, isComprehensiveFeedbackSent: false }));
        }
    }, [isComprehensiveFeedbackSent]);
    useEffect(() => {
        setResponseLoading(currentRequestStatus);
    }, [currentRequestStatus]);
    useEffect(() => {
        let timeoutId = null;
        if (isResponseLoading) {
            timeoutId = setTimeout(() => {
                setResponseLoading(false);
                dispatch(CcfCopilotActions.clearCopilotRequestStatus(activeCaseId));
            }, 10000);
        }
        return () => clearTimeout(timeoutId);
    }, [isResponseLoading]);
    useEffect(() => {
        if (!isFilterCardShown) {
            if ((copilotFilterTags === null || copilotFilterTags === void 0 ? void 0 : copilotFilterTags.custom) && !isCopilotFilterCardPresent) {
                const filterCard = transformData(copilotFilterTags);
                const adaptiveCardToAdd = {
                    [activeCaseId]: {
                        acpAppElements: [
                            {
                                contentType: AgentCopilotContentType.COPILOT_FILTER_CARD,
                                cardType: AgentCopilotCardType.ADAPTIVE_CARD,
                                objectId: `filterCard_${activeCaseId}`,
                                content: filterCard,
                            }
                        ],
                    },
                };
                addAdaptiveCard(activeCaseId, adaptiveCardToAdd, dispatch);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFilterCardShown]);
    useEffect(() => {
        if (isLegalDisclosureEnabled && !isCopilotDisclosureCardPresent) {
            const disclosureContent = {
                icon: 'AdaptiveCardPixieDustIcon',
                title: disclosureCardTitle,
                description: disclosureDescription,
            };
            const adaptiveCardToAdd = {
                [activeCaseId]: {
                    acpAppElements: [
                        {
                            contentType: AgentCopilotContentType.DISCLOSURE,
                            cardType: AgentCopilotCardType.ADAPTIVE_CARD,
                            objectId: `DisclosureCard_${activeCaseId}`,
                            content: disclosureContent,
                        }
                    ],
                },
            };
            addAdaptiveCard(activeCaseId, adaptiveCardToAdd, dispatch);
        }
    }, []);
    const integratedView = useMediaQuery(theme.breakpoints.down(500));
    const context = {
        $root: Object.assign({ integratedView }, adaptiveCardTranslations),
    };
    useEffect(() => {
        // Scroll to the bottom of the container when new cards are added
        if (containerRef.current) {
            setTimeout(() => {
                var _a;
                (_a = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 0);
        }
        // Dev Comments - Hide the comprehensive card if new adaptive cards come up when the interaction is active
        const status = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus;
        const isActive = status &&
            ![DigitalChannelStatus.CLOSED, DigitalChannelStatus.RESOLVED, VoiceContactStatus.DISCONNECTED].includes(status);
        const hasFinalSummaryCard = existingAdaptiveCards.some((card) => card.contentType === AgentCopilotContentType.FINAL_SUMMARY_NOTES);
        const shouldHideFeedbackCard = !hasFinalSummaryCard && !isFinalSummaryRegenerating;
        const shouldHideAutoSummaryCard = hasFinalSummaryCard && !isFinalSummaryRegenerating;
        if (isActive) {
            if (shouldHideAutoSummaryCard) {
                dispatch(CcfCopilotActions.removeAutoSummaryCard(activeCaseId));
            }
            if (shouldHideFeedbackCard) {
                dispatch(CcfCopilotActions.generateComprehensiveCard({
                    caseId: activeCaseId,
                    generateComprehensiveCard: false,
                }));
            }
        }
    }, [(_o = existingAdaptiveCards[existingAdaptiveCards.length - 1]) === null || _o === void 0 ? void 0 : _o.objectId]);
    useEffect(() => {
        if (generateComprehensiveCard) {
            setTimeout(() => {
                var _a;
                (_a = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 0);
        }
    }, [generateComprehensiveCard]);
    useEffect(() => {
        // Scroll to the updated kb combo card
        const prevAdaptiveCards = prevAdaptiveCardsRef.current;
        existingAdaptiveCards.forEach((card, index) => {
            var _a;
            if (prevAdaptiveCards[index] && prevAdaptiveCards[index].objectId === card.objectId && JSON.stringify(prevAdaptiveCards[index]) !== JSON.stringify(card)) {
                if (cardRefs.current[card.objectId]) {
                    (_a = cardRefs.current[card.objectId]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }
        });
        prevAdaptiveCardsRef.current = existingAdaptiveCards;
    }, [existingAdaptiveCards]);
    useEffect(() => {
        if (journeySummaryCard.length === 0 && journeySummaryFlag) {
            dispatch(getJourneySummaryData({ activeCaseId, activeContactInSelectedInteraction }));
        }
    }, []);
    useEffect(() => {
        if (!(divRef === null || divRef === void 0 ? void 0 : divRef.current))
            return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setWidth(width);
                setContainerHeight(height);
            }
        });
        if (divRef === null || divRef === void 0 ? void 0 : divRef.current) {
            observer.observe(divRef.current);
        }
        return () => {
            if (divRef === null || divRef === void 0 ? void 0 : divRef.current) {
                observer.unobserve(divRef.current);
            }
            observer.disconnect();
        };
    }, []);
    /**
     * Function to handle on click event for expand image
     * @param imgUrl - string
     * @param imgAltText - string
     * @example handleExpandImageClick(imgUrl, imgAltText)
     */
    const handleExpandImageClick = (imgUrl, imgAltText) => {
        setimageExpand({ url: imgUrl, altText: imgAltText });
    };
    /**
     * Function to handle on click event for actions
     * @param action - ActionMetaData
     * @param cardItem - CardData
     * @param cardId - number
     * @example handleOnClick(action, cardItem, cardId)
     */
    const handleOnClick = (action, cardItem, cardId, objectId, kbInternalObject) => __awaiter(this, void 0, void 0, function* () {
        var _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
        const objectIdValue = objectId !== null && objectId !== void 0 ? objectId : '';
        const kbInternalObjectIdValue = (kbInternalObject === null || kbInternalObject === void 0 ? void 0 : kbInternalObject.length) === 1 && kbInternalObject[0].id || '';
        const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
        const caseId = activeCaseId || '';
        let individualObjectId = '';
        if (((_p = action.data) === null || _p === void 0 ? void 0 : _p.index) !== undefined) {
            const index = +((_q = action.data) === null || _q === void 0 ? void 0 : _q.index);
            const perSuggestionCards = cardItem.body.filter(item => { var _a; return (_a = item.id) === null || _a === void 0 ? void 0 : _a.includes('perSuggestionSubcards'); });
            individualObjectId = (_s = (_r = perSuggestionCards[index]) === null || _r === void 0 ? void 0 : _r.id) !== null && _s !== void 0 ? _s : '';
        }
        if (((_t = action.data) === null || _t === void 0 ? void 0 : _t.name) === CardActions.EXPAND_IMAGE) {
            setIsModalOpen(true);
        }
        else if (feedbackActions.includes((_u = action.data) === null || _u === void 0 ? void 0 : _u.name) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) !== DigitalChannelStatus.CLOSED) {
            const feedbackActionParams = {
                feedback: (_v = action.data) === null || _v === void 0 ? void 0 : _v.name,
                objectIdValue,
                kbInternalObjectIdValue,
                agentId,
                caseId,
                individualObjectId,
                cardItem,
                comprehensiveFeedbackData,
                containerId: action === null || action === void 0 ? void 0 : action.data.containerId,
            };
            CcfAgentCopilotContainerFunctions.dispatchFeedbackCardActions(feedbackActionParams, dispatch);
            if (((_w = action.data) === null || _w === void 0 ? void 0 : _w.name) === CardActions.LIKE_OVERALL_SUBCARD || ((_x = action.data) === null || _x === void 0 ? void 0 : _x.name) === CardActions.DISLIKE_OVERALL_SUBCARD) {
                individualObjectId = 'overallSubcard';
            }
        }
        if (actionsForOpenContainer.includes((_y = action.data) === null || _y === void 0 ? void 0 : _y.name)) {
            let containerId = '';
            const actionName = (_z = action.data) === null || _z === void 0 ? void 0 : _z.name;
            containerId = actionToContainerId[actionName];
            const containerCard = cardItem.body.find((container) => container.id === containerId);
            containerId &&
                containerCard &&
                CcfAgentCopilotContainerFunctions.handleContainerOpen(containerCard, cardId, containerId, caseId, dispatch);
        }
        const autoSummaryCardActions = [
            CardActions.COPY_SUMMARY,
            CardActions.EDIT_SUMMARY,
            CardActions.SAVE_SUMMARY,
            CardActions.EXPAND_AUTOSUMMARY
        ];
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) !== DigitalChannelStatus.CLOSED ||
            autoSummaryCardActions.includes((_0 = action.data) === null || _0 === void 0 ? void 0 : _0.name)) {
            yield CcfAgentCopilotContainerFunctions.handleClickActions({ action, cardItem, caseId, isSmView, cardId, emailIdentifier, objectIdValue, kbInternalObjectIdValue, individualObjectId, isVoiceContact, hasCopyIcon }, CcfAgentCopilotContainerFunctions.handleIconChange, handleExpandImageClick, dispatch);
        }
    });
    /**
     * Function to close modal
     * @example closeModal()
     */
    const closeModal = () => {
        setIsModalOpen(false);
    };
    /**
     * Closes the popover by resetting the anchor element.
     *
     * @example
     * ```
     * <Button onClick={handleClosePopover}>Close Popover</Button>
     * ```
     */
    const handleClosePopover = () => {
        setPopoverAnchor(null);
    };
    /**
     * Renders summary card panels based on expansion state.
     *
     * @param isExpanded - Boolean flag indicating whether the summary panel should be expanded/visible
     * @param cards - Array of CopilotElement objects containing the card data to render
     * @param cardType - The specific type of agent copilot content being rendered
     * @returns JSX.Element | null - Returns the rendered summary panel component or null if not expanded or no cards
     *
     * @example
     * ```
     * {renderSummaryPanel(isAutoSummaryExpanded, autoSummaryCards, AgentCopilotContentType.FINAL_SUMMARY_NOTES)}
     * ```
     */
    const renderSummaryPanel = (isExpanded, cards, cardType) => {
        if (!isExpanded || !cards.length)
            return null;
        return (_jsx(Box, Object.assign({ sx: cardStyles.summaryContainer }, { children: _jsx(CcfBox, Object.assign({ sx: cardStyles.cardsContainer }, { children: _jsx(CcfCard, Object.assign({ sx: cardStyles.copilotCard, "data-testid": "list-item" }, { children: cards.map((card) => {
                        var _a;
                        const cardId = existingAdaptiveCards.findIndex((c) => c.contentType === cardType);
                        let adaptiveCardContent = card.content;
                        if (adaptiveCardSchemasToTranslate.includes(card.contentType)) {
                            const updatedContent = JSON.stringify(card.content).replace(/adp_\w+/g, (match) => `\${${match}}`);
                            adaptiveCardContent = JSON.parse(updatedContent);
                        }
                        const template = new ACData.Template(adaptiveCardContent);
                        const copilotCard = template.expand(context);
                        return (_jsx(AdaptiveCard, { style: { fontFamily: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily }, payload: copilotCard, hostConfig: hostConfig, onExecuteAction: (action) => handleOnClick(action, copilotCard, cardId, card.objectId) }, `ad_${activeCaseId}_${card.objectId}`));
                    }) })) })) })));
    };
    return (_jsxs(Box, Object.assign({ sx: (agentSearchVisibilityFlag || (isKHConfigEnabled && agentSearchVisibilityFlagForKHConfig)) ? cardStyles.copilotContainer : cardStyles.copilotContainerAgentSearch, ref: divRef }, { children: [rtSummary && _jsx(CcfAgentCopilotRunningSummary, { summary: rtSummary.content.summary }), isDecisionTreeOpen ? (_jsx(CcfAgentCopilotDecisionTree, { decisionTreeData: decisionTreeData })) : (_jsxs(_Fragment, { children: [renderSummaryPanel(isAutoSummaryExpanded, autoSummaryCard, AgentCopilotContentType.FINAL_SUMMARY_NOTES), renderSummaryPanel(isJourneySummaryExpanded, journeySummaryCard, AgentCopilotContentType.JOURNEY_SUMMARY), (!isJourneySummaryExpanded && !isAutoSummaryExpanded) && (_jsx(CcfBox, Object.assign({ sx: cardStyles.cardsContainer }, { children: isCopilotAvailable && existingAdaptiveCards.length === 0 ? (_jsx(CcfEmptyCopilotState, {})) : (_jsx(CcfCard, Object.assign({ sx: cardStyles.copilotCard, "data-testid": "list-item" }, { children: _jsxs(Box, Object.assign({ ref: containerRef }, { children: [existingAdaptiveCards.map((card, cardId) => {
                                        var _a, _b;
                                        let adaptiveCardContent = card.content;
                                        if (adaptiveCardSchemasToTranslate.includes(card.contentType)) {
                                            const updatedContent = JSON.stringify(card.content).replace(/adp_\w+/g, (match) => `\${${match}}`);
                                            adaptiveCardContent = JSON.parse(updatedContent);
                                        }
                                        const kbInternalObject = adaptiveCardContent &&
                                            'body' in adaptiveCardContent &&
                                            adaptiveCardContent.body &&
                                            adaptiveCardContent.body.filter((item) => item && item.id && item.id.includes(ContainerId.KB_INTERNAL));
                                        if (card.contentType === AgentCopilotContentType.KB_COMBO) {
                                            const updatedContent = JSON.stringify(card.content).replace(/adp_no_answer_found/g, (match) => `\${${match}}`);
                                            adaptiveCardContent = JSON.parse(updatedContent);
                                        }
                                        const template = new ACData.Template(adaptiveCardContent);
                                        const copilotCard = template.expand(context);
                                        const isTaskAssistFormCapture = card.formCapture && card.contentType === AgentCopilotContentType.TASK_ASSIST;
                                        const boxId = isTaskAssistFormCapture ? 'formCaptureContent' : `card_${card.objectId}`;
                                        return (_jsxs(Box, Object.assign({ id: boxId, style: Object.assign(Object.assign({}, cardStyles.copilotContent), { display: 'flex', flexDirection: 'column', position: 'relative' }), ref: (el) => (cardRefs.current[card.objectId] = el) }, { children: [isTaskAssistFormCapture && (_jsx(Box, Object.assign({ sx: cardStyles.popoverButton }, { children: _jsx(ExpandablePopover, Object.assign({ width: width, height: containerHeight, tooltipTitle: "Expand" //To-Do translation will be added later
                                                     }, { children: _jsx(Box, Object.assign({ id: "formCaptureContent" }, { children: _jsx(CcfInteractiveAdaptiveCard, { style: { fontFamily: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.fontFamily, padding: '0 !important' }, payload: copilotCard, hostConfig: hostConfig, onExecuteAction: (action) => handleOnClick(action, copilotCard, cardId, card.objectId, kbInternalObject), onInputChange: (inputs) => {
                                                                    dispatch(CcfCopilotActions.addTaskAssistFormCard({
                                                                        contactId: activeCaseId,
                                                                        taskAssistFormData: Object.assign(Object.assign({}, copilotTaskAssistCardData), { data: Object.assign({}, inputs) }),
                                                                    }));
                                                                } }, `ad_${activeCaseId}_${card.objectId}`) })) })) }))), _jsx(CcfInteractiveAdaptiveCard, { style: { fontFamily: (_b = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _b === void 0 ? void 0 : _b.fontFamily }, payload: copilotCard, hostConfig: hostConfig, onExecuteAction: (action) => handleOnClick(action, copilotCard, cardId, card.objectId, kbInternalObject), onInputChange: (inputs) => {
                                                        if (isTaskAssistFormCapture) {
                                                            dispatch(CcfCopilotActions.addTaskAssistFormCard({
                                                                contactId: activeCaseId,
                                                                taskAssistFormData: Object.assign(Object.assign({}, copilotTaskAssistCardData), { data: Object.assign({}, inputs) }),
                                                            }));
                                                        }
                                                    } }, `ad_${activeCaseId}_${card.objectId}`), _jsx(CcfImageWithZoom, { isModalOpen: isModalOpen, closeModal: closeModal, isInboxCollapsed: isInboxCollapsed, imgUrl: imageExpand.url, imgAltText: imageExpand.altText })] }), `${activeCaseId}_${card.objectId}`));
                                    }), generateComprehensiveCard &&
                                        _jsx(Box, Object.assign({ style: cardStyles.copilotContent }, { children: _jsx(CcfAgentCopilotComprehensiveCard, { comprehensiveCardData: comprehensiveFeedbackData, contactId: activeCaseId, interactionStatus: true }) }))] })) }))) }))), isResponseLoading && (_jsx(Box, Object.assign({ sx: cardStyles.typingIndicator }, { children: _jsx(CcfTypingIndicator, { icon: _jsx(CcfAnimatedEllipsisControl, {}) }) }))), isVoiceContact && nextBestResponses && nextBestResponses.length > 0 && (_jsxs(Box, { children: [_jsx(Divider, { style: cardStyles.line }), _jsx(CcfBox, Object.assign({ sx: cardStyles.responseContainer }, { children: _jsx(CcfCarousel, Object.assign({ isVoiceContact: true }, { children: nextBestResponses === null || nextBestResponses === void 0 ? void 0 : nextBestResponses.map((response, i) => {
                                        const nextResponseId = `nbr_${activeCaseId}_${i}`;
                                        return (_jsxs(Box, Object.assign({ style: cardStyles.responseDiv, "data-testid": 'nextBestResponse' }, { children: [_jsx(CcfSparklesIcon, { htmlColor: primaryIconColor, sx: cardStyles.nbrSparkle }), _jsx(CcfTypography, Object.assign({ sx: cardStyles.responseText }, { children: response }))] }), nextResponseId));
                                    }) })) }))] })), (_jsx(ToastContainer, { enableMultiContainer: true, containerId: 'CopilotToastContainer', position: "bottom-center", closeOnClick: true, rtl: false })), _jsxs(Box, Object.assign({ sx: cardStyles.searchWrapper, onClick: () => { handleClosePopover(); }, "data-testid": "handle-modal" }, { children: [(agentSearchVisibilityFlag || (isKHConfigEnabled && agentSearchVisibilityFlagForKHConfig)) ? (_jsx(Box, Object.assign({ sx: cardStyles.searchSection }, { children: _jsx(CcfAgentCopilotSearchContainer, {}) }))) : (_jsx(Box, { sx: cardStyles.placeholderSpace }) // Keeps layout stable in case search bar is not present
                            ), isTaskAssistFeatureToggleEnabled && (_jsx(Box, Object.assign({ sx: cardStyles.taskAssistSection }, { children: _jsx(CcfAgentCopilotTaskAssist, { contactId: activeCaseId, width: width, popoverAnchor: popoverAnchor, setPopoverAnchor: setPopoverAnchor, handleClosePopover: handleClosePopover }) })))] }))] }))] })));
}
export default CcfAgentCopilotContainer;
//# sourceMappingURL=ccf-agent-copilot-container.js.map