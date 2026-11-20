/* eslint-disable no-console */
import { initializeFaro, faro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { GrafanaConsoleLogLevel, LogLevel } from '../../logger/enum/log-level';
import { LocalStorageHelper, Logger, SessionStorageHelper, StorageKeys } from '../../';
import { GrafanaAppender } from '../../logger/appenders/grafana-log-appender';
import { FeatureToggleService } from '../../util/feature-toggle-services';
/**
 * Strips control characters and caps length on a free-form journey field before it
 * is forwarded to the Grafana Faro backend.
 * @param value - Raw field value.
 * @param maxLen - Maximum allowed length after sanitization.
 * @example
 * ```
 * sanitizeJourneyField('agent-assigned');
 * ```
 * @returns Sanitized field value.
 */
const sanitizeJourneyField = (value, maxLen = 256) => 
// eslint-disable-next-line no-control-regex -- intentional: stripping control characters is the point of this sanitizer.
value.replace(/[\x00-\x1F\x7F]/g, '').slice(0, maxLen);
/** Used to toggle favorite agent in Index DB through SDK
 * @param agentSettings - agent settings from backend
 * @param userInfo - user info from backend
 * @param appName - application name
 * @param grafanaFaroUri - grafana faro URI for log collection
 * @example -
 * ```
 * grafanaInit(agentSettings, userInfo, appName, grafanaFaroUri);
 * ```
 */
export const grafanaInit = (agentSettings, userInfo, appName = 'cxa', grafanaFaroUri, grafanaFaroKey) => {
    var _a, _b, _c;
    try {
        const grafanaFaroSampleRate = Number((agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.grafanaSampleRate) || (agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.dataDogSampleRate)) / 100;
        if (grafanaFaroSampleRate && grafanaFaroSampleRate > 0 && grafanaFaroUri) {
            let isLocalEnv = false;
            let environment = 'NA';
            // added session storage check for webrtc
            const isSessionStorageAvailable = typeof sessionStorage !== 'undefined';
            const storedSampleValue = isSessionStorageAvailable ? SessionStorageHelper.getItem(StorageKeys.SHOULD_GRAFANA_FARO_LOGS_BE_COLLECTED) : '';
            const shouldCollectLogs = (() => {
                if (storedSampleValue) {
                    return storedSampleValue === 'true';
                }
                else {
                    const shouldSample = Math.random() < grafanaFaroSampleRate;
                    if (isSessionStorageAvailable) {
                        SessionStorageHelper.setItem(StorageKeys.SHOULD_GRAFANA_FARO_LOGS_BE_COLLECTED, String(shouldSample));
                    }
                    return shouldSample;
                }
            })();
            let envName = '';
            if (appName !== 'WEBRTC') {
                const browserUrl = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.origin;
                isLocalEnv = Boolean(browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/localhost/));
                const envMatched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/-dev|-test|-staging|-gov|-fed|-perf|-sov1.eu|-sov1.au|-sov1.uk/);
                envName = envMatched ? envMatched[0].replace('-', '') : 'prod';
                environment = !isLocalEnv ? envName : 'local';
            }
            // check for local env
            if (!isLocalEnv) {
                const customUserMeta = {
                    agentId: String(userInfo.icAgentId),
                    businessUnitId: String(userInfo.icBUId),
                    cluster: String(userInfo.icClusterId),
                };
                let faroInstance = null;
                const isBrowser = typeof window !== 'undefined';
                const isNonProdEnv = ['dev', 'test', 'staging', 'performance'].includes(process.env.NX_DEST_ENV || '');
                let grafanaApiKey = '';
                if (appName === 'WEBRTC') {
                    grafanaApiKey = grafanaFaroKey || '';
                }
                else {
                    grafanaApiKey = (isNonProdEnv ? ((_b = process.env) === null || _b === void 0 ? void 0 : _b.NX_GRAFANA_NON_PROD_API_KEY) || '' : ((_c = process.env) === null || _c === void 0 ? void 0 : _c.NX_GRAFANA_PROD_API_KEY) || '');
                }
                if (shouldCollectLogs) {
                    faroInstance = isBrowser ? initializeFaro({
                        url: grafanaFaroUri,
                        apiKey: grafanaApiKey,
                        app: {
                            name: appName,
                            version: agentSettings === null || agentSettings === void 0 ? void 0 : agentSettings.cxaClientVersion,
                            environment,
                        },
                        user: {
                            attributes: customUserMeta,
                        },
                        instrumentations: [
                            new TracingInstrumentation() // Use only tracing instrumentation (disables other default web instrumentations)
                        ],
                    }) : null;
                    const grafanaAppender = new GrafanaAppender();
                    if (appName !== 'WEBRTC') {
                        const storedLevel = LocalStorageHelper === null || LocalStorageHelper === void 0 ? void 0 : LocalStorageHelper.getItem(StorageKeys === null || StorageKeys === void 0 ? void 0 : StorageKeys.LOGGING_LEVEL);
                        const appenderLogLevel = (storedLevel !== '' && storedLevel !== null && storedLevel !== undefined)
                            ? Number(storedLevel)
                            : LogLevel.ERROR;
                        grafanaAppender.setLogLevelFilter(appenderLogLevel);
                    }
                    Logger.config.addAppender(grafanaAppender);
                    if (faroInstance) {
                        // Installed on the global console object rather than as a LogAppender method,
                        // mirroring the console.trace/debug/info/warn/error patching below: journey()
                        // callers may live in a different module-federation remote with their own
                        // separate bundled copy of Logger (and hence Logger.config), but
                        // window.console is a true browser singleton shared by every remote on the
                        // page, so this guarantees delivery regardless of which remote calls
                        // journey(). It's also the sole delivery path, so a journey checkpoint is
                        // never sent twice. Gated on its own independent Feature Toggle, and independent of
                        // logLevelFilter - journey checkpoints are never level-filtered.
                        console.__cxaJourneyCheckpoint = (entry) => {
                            var _a;
                            const isJourneyTelemetryEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-digital-journey-telemetry-AW-63285" /* FeatureToggles.DIGITAL_JOURNEY_TELEMETRY_FEATURE_TOGGLE */);
                            if (!isJourneyTelemetryEnabled) {
                                return;
                            }
                            try {
                                (_a = faro === null || faro === void 0 ? void 0 : faro.api) === null || _a === void 0 ? void 0 : _a.pushEvent('journey_checkpoint', {
                                    journeyId: entry.journeyId,
                                    journeyName: sanitizeJourneyField(entry.journeyName),
                                    journeyPoint: sanitizeJourneyField(entry.journeyPoint),
                                    role: entry.role,
                                    status: sanitizeJourneyField(entry.status),
                                });
                            }
                            catch (e) {
                                console.error('Error in journey checkpoint hook', e);
                            }
                        };
                        if (appName === 'WEBRTC') {
                            const logLevelsForWebrtc = Object.values(GrafanaConsoleLogLevel);
                            logLevelsForWebrtc.forEach((level) => {
                                const consoleLogger = console[level];
                                const logger = consoleLogger.bind(consoleLogger);
                                console[level] = (...args) => {
                                    var _a, _b;
                                    let formattedMessage = '';
                                    if (typeof args[0] === 'string') {
                                        formattedMessage = (_a = args[0]) === null || _a === void 0 ? void 0 : _a.replace(/%s/g, args[1]);
                                    }
                                    else {
                                        formattedMessage = String(args[0]);
                                    }
                                    // sending logs to faro , with all types of log levels
                                    (_b = faro === null || faro === void 0 ? void 0 : faro.api) === null || _b === void 0 ? void 0 : _b.pushError({ name: level, message: formattedMessage });
                                    logger.apply(console, args);
                                };
                            });
                        }
                        else {
                            const consoleLevelToLogLevel = {
                                [GrafanaConsoleLogLevel.Trace]: LogLevel.TRACE,
                                [GrafanaConsoleLogLevel.Debug]: LogLevel.DEBUG,
                                [GrafanaConsoleLogLevel.Info]: LogLevel.INFO,
                                [GrafanaConsoleLogLevel.Warn]: LogLevel.WARN,
                                [GrafanaConsoleLogLevel.Error]: LogLevel.ERROR,
                            };
                            /**
                           * Converts a raw localStorage string to a LogLevel, defaulting to ERROR when absent.
                           * @param localstorageLevel - raw string from localStorage (null/undefined/'' when key is missing)
                           * @returns parsed LogLevel numeric value, or LogLevel.ERROR as fallback
                           * @example resolveLevel('3') // LogLevel.WARN
                           */
                            const resolveLevel = (localstorageLevel) => (localstorageLevel !== '' && localstorageLevel !== null && localstorageLevel !== undefined) ? Number(localstorageLevel) : LogLevel.ERROR;
                            // exclude GrafanaConsoleLogLevel.Log ('log') — console.log is never forwarded to Faro
                            const levelsToPatch = Object.values(GrafanaConsoleLogLevel).filter(l => l !== GrafanaConsoleLogLevel.Log);
                            levelsToPatch.forEach((level) => {
                                const consoleLogger = console[level].bind(console);
                                console[level] = (...args) => {
                                    var _a, _b;
                                    const currentLogLevel = resolveLevel(LocalStorageHelper === null || LocalStorageHelper === void 0 ? void 0 : LocalStorageHelper.getItem(StorageKeys === null || StorageKeys === void 0 ? void 0 : StorageKeys.LOGGING_LEVEL));
                                    if (currentLogLevel === LogLevel.OFF || consoleLevelToLogLevel[level] < currentLogLevel) {
                                        consoleLogger.apply(console, args); // below threshold — skip Grafana
                                        return;
                                    }
                                    const first = args[0];
                                    let formattedMessage = '';
                                    if (typeof first === 'string') {
                                        formattedMessage = first.replace(/%s/g, String(args[1]));
                                    }
                                    else {
                                        formattedMessage = String(first);
                                    }
                                    if (level === GrafanaConsoleLogLevel.Error) {
                                        (_a = faro === null || faro === void 0 ? void 0 : faro.api) === null || _a === void 0 ? void 0 : _a.pushError({ name: first === null || first === void 0 ? void 0 : first.name, message: formattedMessage });
                                    }
                                    else {
                                        (_b = faro === null || faro === void 0 ? void 0 : faro.api) === null || _b === void 0 ? void 0 : _b.pushError({ name: level, message: formattedMessage });
                                    }
                                    consoleLogger.apply(console, args);
                                };
                            });
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.error('Grafana initialization failed:', error);
    }
};
//# sourceMappingURL=grafana.js.map