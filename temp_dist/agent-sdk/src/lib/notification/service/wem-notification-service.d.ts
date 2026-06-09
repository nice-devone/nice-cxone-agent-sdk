import { CXoneSdkError, WemEmbeddedPageLinks } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
* Class to perform notification service
*/
export declare class WemNotificationService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    /**
    * This method to get Embedded Pages
    * @returns - EmbeddedPageList | CXoneSdkError
    * @example -
    * ```
    * getEmbeddedPages(response)
    * ```
    */
    getEmbeddedPages(): Promise<WemEmbeddedPageLinks | CXoneSdkError>;
}
