/* eslint-disable no-console */
import { initializeFaro, faro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { LogLevel } from '../../logger/enum/log-level';
import { Logger } from '../../';
import { GrafanaAppender } from '../../logger/appenders/grafana-log-appender';
/** Used to toggle favorite agent in Index DB through SDK
 * @param agentSettings - agent settings from backend
 * @param userInfo - user info from backend
 * @param appName - application name
 * @example -
 * ```
 * grafanaInit(agentSettings, userInfo, appName);
 * ```
 */
export const grafanaInit = (agentSettings, userInfo, appName = 'cxa') => {
    var _a;
    const grafanaFaroSampleRate = Number(agentSettings.dataDogSampleRate) / 100;
    if (grafanaFaroSampleRate && grafanaFaroSampleRate > 0) {
        let isLocalEnv = false;
        let environment = 'NA';
        const shouldCollectLogs = Math.random() < grafanaFaroSampleRate;
        if (appName !== 'WEBRTC') {
            const browserUrl = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.origin;
            isLocalEnv = Boolean(browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/localhost/));
            const envMatched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/-dev|-test|-staging|-gov|-fed/);
            const envName = envMatched ? envMatched[0].replace('-', '') : 'prod';
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
            if (shouldCollectLogs) {
                faroInstance = isBrowser ? initializeFaro({
                    url: 'https://mon-public-na1.nicecxone-dev.com:12345/collect',
                    apiKey: 'apikey',
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
                    grafanaAppender.setLogLevelFilter(LogLevel.ERROR);
                }
                Logger.config.addAppender(grafanaAppender);
                if (faroInstance) {
                    if (appName === 'WEBRTC') {
                        const logLevels = ['log', 'info', 'debug', 'error', 'warn'];
                        logLevels.forEach((level) => {
                            const logLevel = level;
                            const consoleLogger = console[logLevel];
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
                                (_b = faro === null || faro === void 0 ? void 0 : faro.api) === null || _b === void 0 ? void 0 : _b.pushLog([level], formattedMessage);
                                logger.apply(console, args);
                            };
                        });
                    }
                    else {
                        const consoleLogger = console.error.bind(console);
                        console.error =
                            (...args) => {
                                var _a, _b, _c;
                                let formattedMessage = '';
                                if (typeof args[0] === 'string') {
                                    formattedMessage = (_a = args[0]) === null || _a === void 0 ? void 0 : _a.replace(/%s/g, args[1]);
                                }
                                else {
                                    formattedMessage = String(args[0]);
                                }
                                (_b = faro === null || faro === void 0 ? void 0 : faro.api) === null || _b === void 0 ? void 0 : _b.pushError({
                                    name: (_c = args[0]) === null || _c === void 0 ? void 0 : _c.name,
                                    message: formattedMessage,
                                });
                                consoleLogger.apply(console, args);
                            };
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=grafana.js.map