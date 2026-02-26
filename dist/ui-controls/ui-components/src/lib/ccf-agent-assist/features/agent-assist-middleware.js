import { __awaiter } from "tslib";
import { CXoneClient } from '@nice-devone/agent-sdk';
import { filter, first, map } from 'rxjs/operators';
import { ccfAgentAssistCCAIActions } from './ccai-slice';
import { ACDSessionManager, getANI, GetNextEventSubCategory, LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { ccfAgentAssistActiveProvidersActions } from './active-providers-slice';
import { ccfAgentAssistRTIGActions } from './rtig-slice';
import { RTIGConstants, TypeMetric, MediaType, AgentAssistCommand, RtigOverallSentimentModel, RtigOverallSentimentMetric } from '@nice-devone/common-sdk';
import { dispositionInteractionActions } from '../../ccf-disposition/ccf-disposition-slice';
import { CcfAssignmentAction, voiceBioHubAgentLogin } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
import { CcfAuthenticationActions } from '../../ccf-authentication/ccf-authentication.slice';
import { CcfVoiceTranscriptionActions } from '../../slices/ccf-voice-transcription.slice';
const logger = new Logger('ui-state', 'agent-assist-middleware');
/**
 * Middleware for agent assist app
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const agentAssistMiddleware = (actions$, _state$, { store }) => {
    return actions$.pipe(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter((action) => action.type === CcfAuthenticationActions.logUserIn.type), first(), map(() => {
        ACDSessionManager.instance.agentAssistWSSubject.subscribe((resp) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (resp) {
                const activeProvidersPayload = {
                    contactId: resp.contactId,
                    providers: [resp.providerId],
                };
                store.dispatch(ccfAgentAssistActiveProvidersActions.updateActiveProvidersForContactId(activeProvidersPayload));
                if (resp.providerId === 'rtig') {
                    const rtigMetricConfigs = resp.metadata.rtigMetricConfigs;
                    const configType = resp.metadata.configType;
                    let overallSentimentMetric = {};
                    let assistEnlighten = false;
                    const processedRTIGMetricsList = [];
                    if (rtigMetricConfigs == null || (rtigMetricConfigs === null || rtigMetricConfigs === void 0 ? void 0 : rtigMetricConfigs.length) <= 0) {
                        assistEnlighten = false; // If assistEnlighten is false then only Phrases will be visible on admin ui
                    }
                    else {
                        assistEnlighten = true; // If assistEnlighten is true then both Enlighten/Sales and Phrases will be visible on admin ui
                    }
                    loadRTIGMetricConfigs(resp.metadata, processedRTIGMetricsList);
                    // Add sentiment metric
                    const mainGuageTag = (configType === null || configType === void 0 ? void 0 : configType.toLowerCase()) === RtigOverallSentimentModel.SALES ? RtigOverallSentimentMetric.LIKELIHOOD_TO_BUY : RtigOverallSentimentMetric.SENTIMENT;
                    const sentScoreUI = rtigMetricConfigs === null || rtigMetricConfigs === void 0 ? void 0 : rtigMetricConfigs.filter((metricConfig) => { var _a; return ((_a = metricConfig.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (mainGuageTag === null || mainGuageTag === void 0 ? void 0 : mainGuageTag.toLowerCase()); });
                    if ((sentScoreUI === null || sentScoreUI === void 0 ? void 0 : sentScoreUI.length) == 1) {
                        overallSentimentMetric = JSON.parse(JSON.stringify(sentScoreUI[0]));
                        overallSentimentMetric.score = 0;
                        // setting a default here for faster UI display
                        overallSentimentMetric.image_src = ((_a = RTIGConstants.metrics.find(metric => { var _a, _b; return ((_a = metric.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = overallSentimentMetric.tag) === null || _b === void 0 ? void 0 : _b.toLowerCase()); })) === null || _a === void 0 ? void 0 : _a.image_src) || '';
                    }
                    store.dispatch(ccfAgentAssistRTIGActions.setMetricScores(processedRTIGMetricsList));
                    store.dispatch(ccfAgentAssistRTIGActions.setConfigType(configType));
                    store.dispatch(ccfAgentAssistRTIGActions.setOverallSentimentMetric(overallSentimentMetric));
                    store.dispatch(ccfAgentAssistRTIGActions.setAssistEnlighten(assistEnlighten));
                }
            }
        }));
        ACDSessionManager.instance.aaVoiceTranscriptEventSubject.subscribe((resp) => __awaiter(void 0, void 0, void 0, function* () {
            // Subscribe to voice transcription events
            if (resp.subCategory === GetNextEventSubCategory.VOICE_TRANSCRIPT) {
                store.dispatch(CcfVoiceTranscriptionActions.setVoiceTranscriptionEventReceived({ contactId: resp.contactId, value: true }));
            }
        }));
        CXoneClient.instance.agentAssistWSService.agentAssistProcessorService.onKnowledgeArticleSuggestionsReceivedForContactId.subscribe((resp) => {
            var _a;
            if ((resp === null || resp === void 0 ? void 0 : resp.contactId) && ((_a = resp === null || resp === void 0 ? void 0 : resp.knowledgeArticleSuggestions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                store.dispatch(ccfAgentAssistCCAIActions.setKnowledgeArticleSuggestionsForContactId(resp));
            }
        });
        CXoneClient.instance.agentAssistWSService.agentAssistProcessorService.onSmartRepliesReceivedForContactId.subscribe((resp) => {
            var _a;
            if ((resp === null || resp === void 0 ? void 0 : resp.contactId) && ((_a = resp === null || resp === void 0 ? void 0 : resp.knowledgeArticleSuggestions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                store.dispatch(ccfAgentAssistCCAIActions.setSmartRepliesForContactId(resp));
            }
        });
        CXoneClient.instance.agentAssistWSService.agentAssistProcessorService.onRtigStateUpdatePayload.subscribe((resp) => {
            var _a, _b;
            const storeData = store.getState().ccfAgentAssistRTIG.value;
            const RTIGStateData = JSON.parse(JSON.stringify(storeData));
            const metricScores = RTIGStateData.metricScores;
            const overallSentimentMetric = RTIGStateData.overallSentimentMetric;
            const assistEnlighten = RTIGStateData.assistEnlighten;
            const hasPhraseMessage = RTIGStateData.hasPhraseMessage;
            const hasEventMessage = RTIGStateData.hasEventMessage;
            if ('metricScores' in resp) {
                // update the metrices
                for (const newMetric of resp.metricScores) {
                    if (newMetric.isValid) {
                        const currentMetric = metricScores.find(metric => { var _a, _b; return ((_a = metric.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == ((_b = newMetric.tags[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
                        if (currentMetric) {
                            currentMetric.score = multiplyByHundred(newMetric.score, TypeMetric.Metric);
                        }
                        else if (((_a = newMetric.tags[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == ((_b = overallSentimentMetric.tag) === null || _b === void 0 ? void 0 : _b.toLowerCase())) {
                            overallSentimentMetric.score = multiplyByHundred(newMetric.score, TypeMetric.OveralSentiment);
                            store.dispatch(ccfAgentAssistRTIGActions.setOverallSentimentMetric(overallSentimentMetric));
                        }
                    }
                }
                store.dispatch(ccfAgentAssistRTIGActions.setMetricScores(metricScores));
            }
            if ('notificationResults' in resp) {
                if (resp.notificationResults.notificationPayload.primaryAlertName || resp.notificationResults.notificationPayload.secondaryAlertName) {
                    const newNotificationMessage = resp.notificationResults.notificationPayload;
                    newNotificationMessage.notificationId = resp.notificationResults.notificationId;
                    newNotificationMessage.receptionDate = new Date();
                    const enlighten = resp.notificationResults.enlightenResults.find((met) => met.isValid);
                    const phrases = resp.notificationResults.matchedPhrases;
                    if (enlighten && assistEnlighten) {
                        const messageMetric = metricScores.find(metric => { var _a, _b; return ((_a = metric.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == ((_b = enlighten.tags[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
                        let notificationMetric = { guid: 0, score: 0 };
                        if (messageMetric) {
                            notificationMetric = Object.assign({}, messageMetric);
                            notificationMetric.score = multiplyByHundred(enlighten.score, TypeMetric.Notification);
                        }
                        newNotificationMessage.metric = notificationMetric;
                        if (!hasEventMessage) {
                            store.dispatch(ccfAgentAssistRTIGActions.setHasEventMessage(true));
                        }
                        store.dispatch(ccfAgentAssistRTIGActions.setHasPhraseMessage(false));
                        store.dispatch(ccfAgentAssistRTIGActions.updateNotificationMessages(newNotificationMessage));
                    }
                    else if (((phrases === null || phrases === void 0 ? void 0 : phrases.length) > 0) || ((phrases === null || phrases === void 0 ? void 0 : phrases.length) == 0 && newNotificationMessage.hasPhraseExpression)) {
                        if (!hasPhraseMessage) {
                            store.dispatch(ccfAgentAssistRTIGActions.setHasPhraseMessage(true));
                        }
                        store.dispatch(ccfAgentAssistRTIGActions.updateNotificationMessages(newNotificationMessage));
                    }
                }
            }
        });
        ACDSessionManager.instance.agentAssistWebSocketUnsubsribeSubject.subscribe((respContactId) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            if (respContactId) {
                const storeData = store.getState().ccfAgentAssistActiveProviders.value;
                const activeProvidersInStateForContactId = storeData.find((item) => item.contactId === respContactId);
                store.dispatch(ccfAgentAssistCCAIActions.removeEntryForContactId(respContactId));
                if ((_b = activeProvidersInStateForContactId === null || activeProvidersInStateForContactId === void 0 ? void 0 : activeProvidersInStateForContactId.providers) === null || _b === void 0 ? void 0 : _b.some(provider => provider === 'rtig')) {
                    store.dispatch(ccfAgentAssistRTIGActions.clearState());
                }
                store.dispatch(ccfAgentAssistActiveProvidersActions.removeActiveProvidersForContactId(respContactId));
            }
        }));
        //This subscription is for auto summary agentAssist event
        ACDSessionManager.instance.agentAssistSummarySubject.subscribe((agentAssistSummarySubjectResponse) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            const isAutoSummaryEnabledInBU = store.getState().global.isAutoSummaryEnabled;
            const isVoiceBioHubFeatureEnabled = store.getState().global.isVoiceBioHubFeatureEnabled;
            const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled && isFeatureEnabled("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
            if (agentAssistSummarySubjectResponse.agentAssistType === 'auto-summary' &&
                (agentAssistSummarySubjectResponse.mediaType === MediaType.VOICE ||
                    (agentAssistSummarySubjectResponse.mediaType === MediaType.DIGITAL && isAutoSummaryEnabledInBU))) {
                store.dispatch(dispositionInteractionActions.setAutoSummaryEnabledContact(agentAssistSummarySubjectResponse.contactId));
                if ((agentAssistSummarySubjectResponse === null || agentAssistSummarySubjectResponse === void 0 ? void 0 : agentAssistSummarySubjectResponse.mediaType) === MediaType.DIGITAL) {
                    store.dispatch(dispositionInteractionActions.setAutoSummaryStatus({
                        contactId: agentAssistSummarySubjectResponse.contactId,
                        status: AgentAssistCommand.subscribed,
                    }));
                }
            }
            else if (isVoiceBioHubEnabled && agentAssistSummarySubjectResponse.agentAssistType === 'voice-bio-hub') {
                LocalStorageHelper.setItem(StorageKeys.VOICE_BIO_HUB_DATA, JSON.stringify(store.getState().inbox.cxoneVoiceBioHubData));
                const isSilentAuth = agentAssistSummarySubjectResponse.customerId === 'ANI' ? true : false;
                store.dispatch(CcfAssignmentAction.setVoiceBioIsSilentANIAuth(isSilentAuth));
                store.dispatch(CcfAssignmentAction.setVoiceBioHubData({
                    voiceBioHubStatus: 'voiceBioMetrics',
                    voiceBioHubStatusMessage: '',
                    isSuccessVoiceBioHubResponseType: false,
                    voiceBioHubCurrentRequestType: 0,
                    voiceBioHubPatronId: '',
                }));
                store.dispatch(CcfAssignmentAction.setVoiceBioIsRetryRequest((false)));
                const ANI = getANI((_c = (_b = (_a = store.getState().inbox) === null || _a === void 0 ? void 0 : _a.callConferenceDetails) === null || _b === void 0 ? void 0 : _b.userInCall) === null || _c === void 0 ? void 0 : _c.contact);
                isSilentAuth !== null && isSilentAuth !== void 0 ? isSilentAuth : store.dispatch(CcfAssignmentAction.setVoiceBioHubPatronId(ANI));
                const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
                const voiceBioConfigName = (_d = agentAssistSummarySubjectResponse.profileName) !== null && _d !== void 0 ? _d : '';
                const isInbound = (_j = (_h = (_g = (_f = (_e = store.getState()) === null || _e === void 0 ? void 0 : _e.inbox) === null || _f === void 0 ? void 0 : _f.callConferenceDetails) === null || _g === void 0 ? void 0 : _g.userInCall) === null || _h === void 0 ? void 0 : _h.contact) === null || _j === void 0 ? void 0 : _j.isInbound;
                const contactId = (_o = (_m = (_l = (_k = store.getState().inbox) === null || _k === void 0 ? void 0 : _k.callConferenceDetails) === null || _l === void 0 ? void 0 : _l.userInCall) === null || _m === void 0 ? void 0 : _m.contact) === null || _o === void 0 ? void 0 : _o.contactID.toString();
                store.dispatch(voiceBioHubAgentLogin({ agentId: userInfo.icAgentId, voiceBioConfigName: voiceBioConfigName, CustomParams: { ANI: ANI, contactId: contactId, isInbound: isInbound }, contactId: contactId }));
            }
        });
        return ccfAgentAssistCCAIActions === null || ccfAgentAssistCCAIActions === void 0 ? void 0 : ccfAgentAssistCCAIActions.default;
    }));
};
/**
 * multiply the metric score by a factor of 100
 * @param score - score of metric
 * @param typeMetric - type of metric
 * @example -
 *```
 * const metricVal = multiplyByHundred(score, typeMetric);
 * ```
 */
export function multiplyByHundred(score, typeMetric) {
    let value = score * 100;
    if (value < typeMetric) {
        value = typeMetric;
    }
    return value;
}
/**
 * load the RTIG metric configurations
 * @param metaDataRtig - metadata of RTIG
 * @param processedRTIGMetricsList - list of processed RTIG metrics
 * ```
 * @example - loadRTIGMetricConfigs(metaDataRtig, processedRTIGMetricsList);
 * ```
 */
export function loadRTIGMetricConfigs(metaDataRtig, processedRTIGMetricsList) {
    var _a;
    if ('rtigMetricConfigs' in metaDataRtig) {
        if (((_a = metaDataRtig.rtigMetricConfigs) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            metaDataRtig.rtigMetricConfigs.forEach((enlighten) => {
                if (enlighten.enabled) {
                    const metricUi = getMetricByEnlightenModel(enlighten);
                    if ('tag' in metricUi) {
                        metricUi.score = 0;
                        processedRTIGMetricsList.push(metricUi);
                    }
                }
            });
        }
    }
}
/**
 * get metric by Enlighten Model
 * @param enlighten - enlighten model
 * @example -
 *```
 * const metric = getMetricByEnlightenModel(enlightenModel);
 * ```
 */
export function getMetricByEnlightenModel(enlighten) {
    var _a, _b, _c;
    let metricResult = {};
    if (((_a = enlighten.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== RtigOverallSentimentMetric.SENTIMENT && ((_b = enlighten.tag) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== RtigOverallSentimentMetric.LIKELIHOOD_TO_BUY) {
        const metricLocal = RTIGConstants.metrics.find(metric => { var _a, _b; return ((_a = metric.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = enlighten.tag) === null || _b === void 0 ? void 0 : _b.toLowerCase()); });
        if (metricLocal) {
            metricResult = Object.assign({}, metricLocal);
            // Add ranges of metrics by default
            metricResult.range_of_metric = cloneArray(RTIGConstants.rangesOfMetric);
            // Include configuration from RTIG ADMIN
            metricResult.guid = enlighten.guid;
            metricResult.tag = ((_c = enlighten.tag.charAt(0)) === null || _c === void 0 ? void 0 : _c.toLowerCase()) + enlighten.tag.slice(1);
            const highThreshold = metricResult.range_of_metric.find(range => range.severity === 'high');
            if (highThreshold) {
                highThreshold.min = enlighten.highThreshold.min;
                highThreshold.max = enlighten.highThreshold.max;
            }
            const mediumThreshold = metricResult.range_of_metric.find(range => range.severity === 'medium');
            if (mediumThreshold) {
                mediumThreshold.min = enlighten.mediumThreshold.min;
                mediumThreshold.max = enlighten.mediumThreshold.max;
            }
            const lowThreshold = metricResult.range_of_metric.find(range => range.severity === 'low');
            if (lowThreshold) {
                lowThreshold.min = enlighten.lowThreshold.min;
                lowThreshold.max = enlighten.lowThreshold.max;
            }
        }
    }
    else {
        logger.error('getMetricByEnlightenModel', 'Unable to find metric by tag name');
    }
    return metricResult;
}
/**
 * function to clone an array
 * @param array - array to clone
 * @example -
 *```
 * cloneArray(dataArray);
 * ```
 */
export function cloneArray(array) {
    return array.map((element) => Object.assign({}, element));
}
/**
 * get range of metric by score
 * @param score - score of metric
 * @param metric - metric object
 * @example -
 *```
 * getRangeOfMetricByScore(score, metric);
 * ```
 */
export function getRangeOfMetricByScore(score, metric) {
    let rangeOfMetric;
    if (metric && metric.range_of_metric) {
        rangeOfMetric = metric.range_of_metric.find(range => score > range.min && score <= range.max);
    }
    else {
        rangeOfMetric = RTIGConstants.rangesOfMetric.find(range => score > range.min && score <= range.max);
    }
    return rangeOfMetric;
}
/**
 * get metric disable color
 * @example -
 *```
 * const disbaleColor = getDisableMetricColor();
 * ```
 */
export function getDisableMetricColor() {
    return RTIGConstants.disableColor;
}
/**
 * get metric by tag
 * @param tag - tag of the metric
 * @example -
 *```
 * const metric = getMetricByTag(tagName);
 * ```
 */
export function getMetricByTag(tag) {
    const metric = RTIGConstants.metrics.find(met => { var _a; return ((_a = met.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === tag.toLowerCase(); });
    if (metric) {
        metric.range_of_metric = cloneArray(RTIGConstants.rangesOfMetric);
    }
    else {
        logger.error('getMetricByTag', 'Unable to find metric by tag');
    }
    return metric;
}
//# sourceMappingURL=agent-assist-middleware.js.map