import { CXoneUser } from '@nice-devone/auth-sdk';
import { Logger, HttpClient, HttpUtilService, LocalStorageHelper, StorageKeys, ValidationUtils, } from '@nice-devone/core-sdk';
/**
 * Class to perform screen agent service
 */
export class ScreenAgentService {
    constructor() {
        this.logger = new Logger('agent-sdk', 'ScreenAgentService');
        this.utilService = new HttpUtilService();
        this.validationUtils = new ValidationUtils();
        this.SCREEN_AGENT_CONNECT_API = 'http://127.0.0.1:{port}/screenagent/connect';
        this.SCREEN_AGENT_DISCONNECT_API = 'http://127.0.0.1:{port}/screenagent/disconnect';
        this.maxRetryAttempts = 3; // to be decided
    }
    /**
     * Method to connect screen agent recording
     * @param portNo  - screen agent portno.
     * @returns -
     * ```
     * @example
     * connectScreenAgent()
     * ```
     */
    connectScreenAgent(portNo) {
        const userInfo = CXoneUser.instance.getUserInfo();
        const oneHrInMS = 60 * 60000;
        const lastTimeConnectAPICalled = LocalStorageHelper.getItem(StorageKeys.IS_SCREEEN_AGENT_CONNECTED);
        const apiCallInProgress = LocalStorageHelper.getItem(StorageKeys.IS_SCREEEN_AGENT_API_IN_PROGRESS);
        const storedTimestamp = new Date(lastTimeConnectAPICalled).getTime();
        const currentTimestamp = new Date().getTime();
        const diff = currentTimestamp - storedTimestamp;
        if (!lastTimeConnectAPICalled || lastTimeConnectAPICalled === 'null' || diff >= oneHrInMS) {
            if (this.validationUtils.isNotNullOrEmpty(userInfo)) {
                const url = this.SCREEN_AGENT_CONNECT_API.replace('{port}', portNo.toString());
                const payload = {
                    agentCorrelationKey: userInfo.userId,
                };
                const reqInit = {
                    headers: this.utilService.initHeader('', 'application/json').headers,
                    body: payload,
                };
                this.logger.info('connectScreenAgent', 'connectScreenAgent, payload:' + JSON.stringify(reqInit));
                if (!apiCallInProgress || apiCallInProgress === 'false') {
                    LocalStorageHelper.setItem(StorageKeys.IS_SCREEEN_AGENT_API_IN_PROGRESS, 'true');
                    HttpClient.post(url, reqInit).then((data) => {
                        this.logger.info('connectScreenAgent', 'connectScreenAgent success:- ' + JSON.stringify(data));
                        LocalStorageHelper.setItem(StorageKeys.IS_SCREEEN_AGENT_CONNECTED, new Date().toString());
                        LocalStorageHelper.setItem(StorageKeys.IS_SCREEEN_AGENT_API_IN_PROGRESS, 'false');
                        setTimeout(() => {
                            this.connectScreenAgent(portNo);
                        }, oneHrInMS);
                    }, (error) => {
                        this.logger.error('connectScreenAgent', 'connectScreenAgent failed:- ' + JSON.stringify(error));
                        if (error.status !== 200 && this.maxRetryAttempts > 0) {
                            setTimeout(() => {
                                LocalStorageHelper.setItem(StorageKeys.IS_SCREEEN_AGENT_CONNECTED, null);
                                LocalStorageHelper.setItem(StorageKeys.IS_SCREEEN_AGENT_API_IN_PROGRESS, 'false');
                                this.connectScreenAgent(portNo);
                            }, 60000);
                            this.maxRetryAttempts--;
                        }
                    });
                }
            }
        }
        else {
            setTimeout(() => {
                this.connectScreenAgent(portNo);
            }, oneHrInMS - diff);
        }
    }
    /**
     * Method to disconnect screen agent recording
     * @param portNo  - screen agent portno.
     * @returns -
     * ```
     * @example
     * disconnectScreenAgent()
     * ```
     */
    disconnectScreenAgent(portNo) {
        const userInfo = CXoneUser.instance.getUserInfo();
        const isScreenAgentConnected = LocalStorageHelper.getItem(StorageKeys.IS_SCREEEN_AGENT_CONNECTED);
        if (isScreenAgentConnected !== 'null' && this.validationUtils.isNotNullOrEmpty(userInfo)) {
            const url = this.SCREEN_AGENT_DISCONNECT_API.replace('{port}', portNo.toString());
            const payload = {
                agentCorrelationKey: userInfo.userId,
            };
            const reqInit = {
                headers: this.utilService.initHeader('', 'application/json').headers,
                body: payload,
            };
            this.logger.info('disconnectScreenAgent', 'disconnectScreenAgent, payload:' + JSON.stringify(reqInit));
            HttpClient.post(url, reqInit).then((data) => {
                this.logger.info('disconnectScreenAgent', 'disconnectScreenAgent success:- ' + JSON.stringify(data));
                LocalStorageHelper.setItem(StorageKeys.IS_SCREEEN_AGENT_CONNECTED, null);
            }, (error) => {
                this.logger.error('disconnectScreenAgent', 'disconnectScreenAgent failed:- ' + JSON.stringify(error));
                if (error.status !== 200) {
                    setTimeout(() => {
                        this.disconnectScreenAgent(portNo);
                    }, 60000);
                }
            });
        }
    }
}
//# sourceMappingURL=screen-agent-service.js.map