import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { Logger, HttpClient, HttpUtilService, ApiUriConstants } from '@nice-devone/core-sdk';
/**
* Class to perform notification service
*/
export class WemNotificationService {
    constructor() {
        this.logger = new Logger('agent-sdk', 'NotificationService');
        this.utilService = new HttpUtilService();
    }
    /**
    * This method to get Embedded Pages
    * @returns - EmbeddedPageList | CXoneSdkError
    * @example -
    * ```
    * getEmbeddedPages(response)
    * ```
    */
    getEmbeddedPages() {
        const userHubWebBaseUrl = CXoneAuth.instance.getCXoneConfig().userHubBaseUrl;
        const supportedPagesUrl = userHubWebBaseUrl + ApiUriConstants.EMBEDDED_PAGE_URI;
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader('', 'application/json');
            HttpClient.get(supportedPagesUrl, reqInit).then((response) => {
                var _a;
                const embeddedPageLinks = (response === null || response === void 0 ? void 0 : response.data) && ((_a = response.data) === null || _a === void 0 ? void 0 : _a.links);
                const links = [];
                if (embeddedPageLinks.length > 0) {
                    embeddedPageLinks.forEach((val) => {
                        const link = {
                            appContext: val.appContext,
                            baseUrl: val.baseUrl,
                            featureToggle: val.featureToggle,
                            iconSvg: val.iconSvg,
                            id: val.id,
                            license: val.license,
                            name: val.name,
                            permission: val.permission,
                            url: val.url,
                            hideOnFeatureEnabled: val.HideonFeatureEnabled,
                        };
                        links.push(link);
                    });
                }
                const embeddedPageList = {
                    links: links,
                };
                this.logger.info('getEmbeddedPages', 'Getting Embedded pages success ');
                resolve(embeddedPageList);
            }, (error) => {
                var _a;
                this.logger.error('getEmbeddedPages', 'Getting Embedded pages error ' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
}
//# sourceMappingURL=wem-notification-service.js.map