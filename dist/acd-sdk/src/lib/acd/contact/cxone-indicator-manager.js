import { ObservableValue } from '@nice-devone/agent-sdk';
import { IndicatorActionType } from '@nice-devone/common-sdk';
import { AdminService, ACDSessionManager, Logger, ValidationUtils } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
/**
 * Indicators manager class
 */
export class CXoneIndicatorManager {
    /**
     * get instance for admin service
     * @example
     * ```
     * const indicatorManager = new IndicatorManager();
     * ```
     */
    constructor() {
        this.logger = new Logger('indicatorManager', 'IndicatorManager');
        this.adminService = {};
        this.acdSessionManager = {};
        this.contactIndicator = [];
        this.validationUtils = new ValidationUtils();
        this.contactIndicatorsEvent = new Subject();
        this.contactIndicatorsEventObservable = new ObservableValue(null);
        this.agentIndicatorsEvent = new Subject();
        this.agentIndicatorsEventObservable = new ObservableValue(null);
        /**
         * Method to call the spawn script
         * @example
         * ```
         * openSpawnScript();
         * ```
         */
        this.spawnScript = (indicator) => {
            const parsedData = this.parseSpawnParameters(indicator.actionValue);
            const { scriptName, skillId, parameters, startDate } = parsedData;
            this.adminService.getScriptByName(scriptName).then((scriptId) => {
                this.adminService.spawnScript(scriptId, skillId, parameters, startDate);
            }, (error) => {
                this.logger.error('getScriptData', 'getScriptData failed:-' + JSON.stringify(error));
            });
        };
        /**
         * Used to start signal script
         * @example
         * ```
         * openSignalScript();
         * ```
         */
        this.signalScript = (indicator) => {
            const parsedData = this.parseSignalScriptParameters(indicator.actionValue);
            const { contactId, parameters } = parsedData;
            this.adminService.signalScript(contactId, parameters);
        };
        /**
         * Method to parse the spawn script parameters
         * @param input - actionURI
         * @example
         * ```
         * parseSpawnParameters("\"abc\\indicator_script\" 638173 \"\" \"\" \"\" \"\" \"\"")
         * ```
         */
        this.parseSpawnParameters = (input) => {
            const args = [];
            const data = input.split('"');
            for (let i = 3; i < data.length; i += 2) {
                args.push(data[i]);
            }
            const spawnParams = args.join('|');
            return {
                scriptName: data[1],
                skillId: parseInt(data[2], 10),
                parameters: spawnParams,
                startDate: '',
            };
        };
        /**
         *  Method to parse the signal script parameters
         * @example
         * ```
         * parseSignalScriptParameters("\"384734477\" \"city\" \"state\" \"country\" \"\" \"\"");
         * ```
         */
        this.parseSignalScriptParameters = (input) => {
            const args = input.split('"');
            const processedArgs = {};
            let i = 0;
            const intermediateArgs = [];
            for (i = 0; i < args.length; i++) {
                if (!(args[i] === '' || args[i] === ' ')) {
                    intermediateArgs.push(args[i]);
                }
            }
            for (i = 1; i < intermediateArgs.length; i++) {
                processedArgs['p' + i] = intermediateArgs[i];
            }
            return {
                contactId: intermediateArgs[0],
                parameters: processedArgs,
            };
        };
        /**
         * Handles indicators based on actionType
         * @param indicators - received indicators array
         * @returns - updated- indicators array
         * @example
         * ```
         * this.handleIndicatorActions(indicators);
         * ```
         */
        this.handleIndicatorActions = (indicators) => {
            const updatedIndicators = indicators.map((element) => {
                if (element.actionType === IndicatorActionType.SHOWCUSTOMFORM) {
                    return this.prepareHtmlDocument(element);
                }
                return element;
            });
            return updatedIndicators;
        };
        /**
         * Prepares html document for custom form indicator
         * @param indicator - indicator to be processed for custom form
         * @returns - indicator data with embeded html
         * @example
         * ```
         * this.prepareHtmlDocument(customIndicatorData);
         * ```
         */
        this.prepareHtmlDocument = (indicator) => {
            const customHtml = `<html>
      <head>
         <title></title>
      </head>
      <body>
         <form id='customForm' class='customForm'>
            <input type='hidden' name='contactId' value='{0}'>
            <input type='hidden' name='indicatorName' value='{1}'>
            <div className='{1}'>
              {2}
            </div>
         </form>
      </body>
      </html>`;
            indicator.actionValue = customHtml
                .replace('{0}', indicator.contactId)
                .replace('{1}', indicator.indicatorName)
                .replace('{2}', indicator.actionValue);
            return indicator;
        };
        /**
         * Submit function for custom form
         * @param event - submit event with form elements
         * @example
         * ```
         * this.onCustomFormSubmit(submitEvent);
         * ```
         */
        this.onCustomFormSubmit = (event) => {
            var _a;
            const formElement = event.target || event.srcElement;
            const rawDataMap = {};
            let valueString = '';
            let contactId = '';
            let indicatorName = '';
            // Prevent the default functionality for onSubmit
            event.preventDefault();
            for (let elementIndex = ((_a = formElement === null || formElement === void 0 ? void 0 : formElement.elements) === null || _a === void 0 ? void 0 : _a.length) - 1; elementIndex >= 0; elementIndex--) {
                const element = formElement.elements[elementIndex];
                if (element.name !== 'contactId' && element.name !== 'indicatorName') {
                    const elementKey = element.name || element.id;
                    switch (element.type) {
                        case 'submit':
                        case 'text':
                        case 'textarea':
                        case 'password':
                        case 'hidden':
                            rawDataMap[elementKey] = element.value;
                            break;
                        case 'radio':
                        case 'checkbox':
                            if (element.checked) {
                                // Check to see if we already have a value for this key, if we do update the dictionary and comma delimit the values.
                                if (rawDataMap[elementKey]) {
                                    rawDataMap[elementKey] =
                                        element.value + ',' + rawDataMap[elementKey];
                                }
                                else {
                                    rawDataMap[elementKey] = element.value;
                                }
                            }
                            break;
                        case 'select-one':
                            if (element.options.length) {
                                // Try and find the selected option.
                                for (let selectedIndex = 0; selectedIndex < element.options.length; selectedIndex++) {
                                    if (element.options[selectedIndex].selected) {
                                        rawDataMap[elementKey] = element.options[selectedIndex].value;
                                        break; // Break out of the loop once we have found the single selected item.
                                    }
                                }
                            }
                            break;
                        case 'select-multiple':
                            // Find each of the selected options and append. (Comma delimited.)
                            for (let selectedIndex = 0; selectedIndex < element.options.length; selectedIndex++) {
                                if (element.options[selectedIndex].selected) {
                                    if (valueString.length > 0) {
                                        valueString += ',';
                                    }
                                    valueString += element.options[selectedIndex].value;
                                }
                            }
                            rawDataMap[elementKey] = valueString;
                            break;
                    }
                }
                else if (element.name === 'contactId') {
                    contactId = element.value;
                }
                else if (element.name === 'indicatorName') {
                    indicatorName = element.value;
                }
            }
            const customFormData = {
                data: Object.keys(rawDataMap)
                    .map(function (key) {
                    return key + '=' + rawDataMap[key];
                })
                    .join('|'),
                indicatorName: indicatorName,
            };
            // The API expects a '|' delimited string for each key/value combination. E.g. 'checkbox1=yes|textbox1=hello|multiSelect1=Option1,Option2'
            this.acdSessionManager.postCustomFormData(contactId, customFormData);
        };
        this.adminService = AdminService.instance;
        this.acdSessionManager = ACDSessionManager.instance;
        this.updateContactIndicator();
        this.updateAgentIndicator();
    }
    /**
     * subscribe the update contact indicators event
     */
    updateContactIndicator() {
        this.acdSessionManager.contactIndicatorsSubject.subscribe((contactIndicator) => {
            let indicators = this.contactIndicator;
            if (this.validationUtils.isNotNullOrEmptyArray(indicators)) {
                let indicatorIndex = -1;
                for (let index = 0; index < indicators.length; index++) {
                    if (indicators[index].indicatorName ===
                        contactIndicator.indicatorName &&
                        indicators[index].contactId === contactIndicator.contactId) {
                        indicatorIndex = index;
                    }
                }
                if (indicatorIndex !== -1) {
                    indicators[indicatorIndex] = contactIndicator;
                }
                else {
                    indicators.push(contactIndicator);
                }
                indicators = indicators.filter((indicator) => {
                    return indicator.isEnabled;
                });
            }
            else {
                indicators = [];
                indicators.push(contactIndicator);
            }
            this.contactIndicator = this.handleIndicatorActions(indicators);
            this.contactIndicatorsEventObservable.setValue(this.contactIndicator);
            this.contactIndicatorsEvent.next(this.contactIndicator);
        });
    }
    /**
     * subscribe the update agent indicators event
     */
    updateAgentIndicator() {
        this.adminService
            .getAllIndicators()
            .then((indicators) => {
            //TODO: Need confirmation for custom form indicator for agent
            const updatedIndicators = this.handleIndicatorActions(indicators);
            this.agentIndicatorsEventObservable.setValue(updatedIndicators);
            this.agentIndicatorsEvent.next(updatedIndicators);
        });
        // Running the logic twice. The First one adds the indicators on load, the next one adds any new indicators that get added
        this.acdSessionManager.agentIndicatorsSubject.subscribe(() => {
            this.adminService
                .getAllIndicators()
                .then((indicators) => {
                //TODO: Need confirmation for custom form indicator for agent
                const updatedIndicators = this.handleIndicatorActions(indicators);
                this.agentIndicatorsEventObservable.setValue(updatedIndicators);
                this.agentIndicatorsEvent.next(updatedIndicators);
            });
        });
    }
    /**
     * Dispose observable values when sequence ends
     * @example CXoneClient.instance.indicator.dipose();
     */
    dispose() {
        this.contactIndicatorsEventObservable.dispose();
    }
}
//# sourceMappingURL=cxone-indicator-manager.js.map