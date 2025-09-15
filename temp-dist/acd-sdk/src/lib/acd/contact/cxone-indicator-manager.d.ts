import { ObservableValue } from '@nice-devone/agent-sdk';
import { CXoneIndicator } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
/**
 * Indicators manager class
 */
export declare class CXoneIndicatorManager {
    private logger;
    private adminService;
    private acdSessionManager;
    private contactIndicator;
    private validationUtils;
    contactIndicatorsEvent: Subject<CXoneIndicator[]>;
    contactIndicatorsEventObservable: ObservableValue<CXoneIndicator[] | null, CXoneIndicator[] | null, any>;
    agentIndicatorsEvent: Subject<CXoneIndicator[]>;
    agentIndicatorsEventObservable: ObservableValue<CXoneIndicator[] | null, CXoneIndicator[] | null, any>;
    /**
     * get instance for admin service
     * @example
     * ```
     * const indicatorManager = new IndicatorManager();
     * ```
     */
    constructor();
    /**
     * subscribe the update contact indicators event
     */
    private updateContactIndicator;
    /**
     * subscribe the update agent indicators event
     */
    private updateAgentIndicator;
    /**
     * Method to call the spawn script
     * @example
     * ```
     * openSpawnScript();
     * ```
     */
    spawnScript: (indicator: CXoneIndicator) => void;
    /**
     * Used to start signal script
     * @example
     * ```
     * openSignalScript();
     * ```
     */
    signalScript: (indicator: CXoneIndicator) => void;
    /**
     * Method to parse the spawn script parameters
     * @param input - actionURI
     * @example
     * ```
     * parseSpawnParameters("\"abc\\indicator_script\" 638173 \"\" \"\" \"\" \"\" \"\"")
     * ```
     */
    private parseSpawnParameters;
    /**
     *  Method to parse the signal script parameters
     * @example
     * ```
     * parseSignalScriptParameters("\"384734477\" \"city\" \"state\" \"country\" \"\" \"\"");
     * ```
     */
    private parseSignalScriptParameters;
    /**
     * Handles indicators based on actionType
     * @param indicators - received indicators array
     * @returns - updated- indicators array
     * @example
     * ```
     * this.handleIndicatorActions(indicators);
     * ```
     */
    handleIndicatorActions: (indicators: CXoneIndicator[]) => CXoneIndicator[];
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
     * Submits custom form data to the server via the custom form API and closes the window
     * @param event - submit event with form elements
     * @example
     * ```
     * this.onCustomFormSubmit(submitEvent, customFormWindow);
     * ```
     *
     */
    onCustomFormSubmit: (event: any, customFormWindow: Window) => void;
    /**
     * Dispose observable values when sequence ends
     * @example CXoneClient.instance.indicator.dipose();
     */
    dispose(): void;
}
