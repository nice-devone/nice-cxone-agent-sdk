import { CXoneRunApp, CXonePageOpen, CXonePopUrl, CXoneContactScreenpop, CXoneAgentAssist, CXoneCustomScreenpop } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
/**
 * Screen Pop manager class
 */
export declare class CXoneScreenPop {
    private logger;
    private acdSessionManager;
    private runAppEvent;
    private pageOpenEvent;
    private contactScreenPopUrl;
    private popUrlEvent;
    private agentAssistEvent;
    private customScreenpopEvent;
    /**
     * @example
     * ```
     * const screenPopManager = new screenPopManager();
     * ```
     */
    constructor();
    /**
     * subscribe the screen pop  event
     * @example screenPopSubscribe(false,true, true)
     */
    screenPopSubscribe(runApp: boolean, pageOpen: boolean, contactScreenPop: boolean, popUrl: boolean, agentAssist: boolean, customScreenpop: boolean): void;
    /**
     * subscribe the run app  event
     */
    private subscribeRunAppEvent;
    /**
     * subscribe the page open  event
     */
    private subscribePageOpenEvent;
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.runAppSubject
     * ```
     */
    get runAppSubject(): Subject<CXoneRunApp>;
    /**
     * Handles run app based on actionType
     * @param runApp - received run app event
     * @returns - updated- run app
     * @example
     * ```
     * this.handleRunAppActions(runApp);
     * ```
     */
    handleRunAppActions: (runApp: CXoneRunApp) => CXoneRunApp;
    /**
     * Prepares html document for custom form indicator
     * @param indicator - indicator to be processed for custom form
     * @returns - indicator data with embeded html
     * @example
     * ```
     * this.prepareHtmlDocument(customIndicatorData);
     * ```
     */
    private prepareHtmlDocument;
    /**
     * Submit function for custom form
     * @param event - submit event with form elements
     * @example
     * ```
     * this.onCustomFormSubmit(submitEvent);
     * ```
     */
    onCustomFormSubmit: (event: any) => void;
    /**
     * @example
     * ```
     * const pageOpenManager = pageOpenManager.pageOpenSubject
     * ```
     */
    get pageOpenSubject(): Subject<CXonePageOpen>;
    /**
     * Handles page open based on actionType
     * @param pageopen - received page open event
     * @returns - updated- page open
     * @example
     * ```
     * this.handlePageOpenActions(pageOpen);
     * ```
     */
    handlePageOpenActions: (pageOpen: CXonePageOpen) => CXonePageOpen;
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.contactScreenPopSubject
     * ```
     */
    get contactScreenPopSubject(): Subject<CXoneContactScreenpop>;
    /**
     * subscribe default screen pop and confiqure in 'reqagent' studio
     */
    private screenPopForReqagentAndSkills;
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.popUrlSubject
     * ```
     */
    get popUrlSubject(): Subject<CXonePopUrl>;
    /**
     * subscribe the popUrl  event
     */
    private subscribePopUrlEvent;
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.agentAssistSubject
     * ```
     */
    get agentAssistSubject(): Subject<CXoneAgentAssist>;
    /**
     * subscribe the agent assist  event
     */
    private subscribeAgentAssistEvent;
    /**
     * @example
     * ```
     * const cxOneCustomScreenPop = cxOneCustomScreenPop.customScreenpopSubject
     * ```
     */
    get customScreenpopSubject(): Subject<CXoneCustomScreenpop>;
    /**
     * subscribe the custom screenpop event
     */
    private subscribeCustomScreenpop;
}
