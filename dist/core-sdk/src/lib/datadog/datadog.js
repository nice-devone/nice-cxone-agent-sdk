import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import { Logger } from '../../';
import { DatadogAppender } from '../../logger/appenders/datadog-log-appender';
/** Start datadog RUM and Logging
* @example datadogInit()
*/
export const datadogInit = (agentSettings, userInfo, appName = 'cxa') => {
    if (agentSettings.dataDogSampleRate && parseInt(agentSettings.dataDogSampleRate) > 0) {
        let isLocalEnv = false;
        let environment = 'NA';
        if (appName !== 'WEBRTC') {
            const browserUrl = window.location.origin;
            isLocalEnv = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/localhost/);
            const envMatched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/-dev|-test|-staging|-gov|-fed/);
            const envName = envMatched ? envMatched[0].replace('-', '') : 'prod';
            environment = !isLocalEnv ? envName : 'local';
        }
        if (!isLocalEnv) {
            datadogRum.init({
                applicationId: agentSettings.dataDogAppID,
                clientToken: agentSettings.dataDogClientToken,
                site: 'datadoghq.com',
                service: 'cxone-agent',
                env: environment,
                version: agentSettings.cxaClientVersion,
                sessionSampleRate: parseInt(agentSettings.dataDogSampleRate),
                sessionReplaySampleRate: 0,
                trackUserInteractions: true,
                trackResources: true,
                trackLongTasks: true,
                defaultPrivacyLevel: 'mask-user-input',
                useCrossSiteSessionCookie: true,
            });
            datadogRum.addRumGlobalContext('businessUnitId', userInfo.icBUId);
            datadogRum.addRumGlobalContext('agentId', userInfo.icAgentId);
            datadogRum.addRumGlobalContext('cluster', userInfo.icClusterId);
            datadogRum.addRumGlobalContext('appName', appName);
            datadogLogs.init({
                clientToken: agentSettings.dataDogClientToken,
                site: 'datadoghq.com',
                service: 'cxone-agent',
                forwardErrorsToLogs: true,
                sessionSampleRate: parseInt(agentSettings.dataDogSampleRate),
                version: agentSettings.cxaClientVersion,
                env: environment,
                useCrossSiteSessionCookie: true,
            });
            datadogLogs.addLoggerGlobalContext('businessUnitId', userInfo.icBUId);
            datadogLogs.addLoggerGlobalContext('agentId', userInfo.icAgentId);
            datadogLogs.addLoggerGlobalContext('cluster', userInfo.icClusterId);
            datadogLogs.addLoggerGlobalContext('appName', appName);
            const datadogAppender = new DatadogAppender(datadogLogs.logger);
            Logger.config.addAppender(datadogAppender);
            if (appName === 'WEBRTC') {
                const logLevels = ['log', 'info', 'debug', 'error', 'warn'];
                logLevels.forEach((level) => {
                    const logLevel = level;
                    const consoleLogger = console[logLevel];
                    const logger = consoleLogger.bind(consoleLogger);
                    console[logLevel] = (...args) => {
                        datadogLogs.logger[logLevel](args[0]);
                        logger.apply(console, args);
                    };
                });
            }
            else {
                datadogLogs.logger.setLevel('error');
            }
        }
    }
};
/**
* Method to stop datadog session
* @example diconnectDatadog()
*/
export const disconnectDatadog = () => {
    document.cookie = '_dd_s=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
//# sourceMappingURL=datadog.js.map