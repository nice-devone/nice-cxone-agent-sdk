import { RunAppActionType, } from '@nice-devone/common-sdk';
import { ACDSessionManager, Logger } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
/**
 * Screen Pop manager class
 */
export class CXoneScreenPop {
    /**
     * @example
     * ```
     * const screenPopManager = new screenPopManager();
     * ```
     */
    constructor() {
        this.logger = new Logger('ACD', 'CXoneScreenPop');
        this.acdSessionManager = {};
        this.runAppEvent = new Subject();
        this.pageOpenEvent = new Subject();
        this.contactScreenPopUrl = new Subject();
        this.popUrlEvent = new Subject();
        this.agentAssistEvent = new Subject();
        this.customScreenpopEvent = new Subject();
        /**
         * Handles run app based on actionType
         * @param runApp - received run app event
         * @returns - updated- run app
         * @example
         * ```
         * this.handleRunAppActions(runApp);
         * ```
         */
        this.handleRunAppActions = (runApp) => {
            if (runApp.actionType === RunAppActionType.SHOWCUSTOMFORM) {
                this.prepareHtmlDocument(runApp);
            }
            return runApp;
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
        this.prepareHtmlDocument = (runApp) => {
            const customHtml = `<html>
            <head>
                <title></title>
            </head>
            <body>
                <form id='customForm' class='customForm'>
                <input type='hidden' name='contactId' value='{0}'>
                <input type='hidden' name='indicatorName' value='{1}'>{2}
                </form>
            </body>
            </html>`;
            runApp.actionValue = customHtml
                .replace('{0}', runApp.contactId)
                .replace('{1}', runApp.contactId)
                .replace('{2}', runApp.actionValue);
            return runApp;
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
        /**
         * Handles page open based on actionType
         * @param pageopen - received page open event
         * @returns - updated- page open
         * @example
         * ```
         * this.handlePageOpenActions(pageOpen);
         * ```
         */
        this.handlePageOpenActions = (pageOpen) => {
            return pageOpen;
        };
        this.acdSessionManager = ACDSessionManager.instance;
    }
    /**
     * subscribe the screen pop  event
     * @example screenPopSubscribe(false,true, true)
     */
    screenPopSubscribe(runApp, pageOpen, contactScreenPop, popUrl, agentAssist, customScreenpop) {
        this.logger.info('screenPopSubscribe', 'RunApp ' +
            runApp +
            'PageOpen ' +
            pageOpen +
            'contactScreenPop ' +
            contactScreenPop +
            'popUrl ' +
            popUrl +
            'customScreenpop' +
            customScreenpop);
        if (runApp) {
            this.subscribeRunAppEvent();
        }
        if (pageOpen) {
            this.subscribePageOpenEvent();
        }
        if (contactScreenPop) {
            this.screenPopForReqagentAndSkills();
        }
        if (popUrl) {
            this.subscribePopUrlEvent();
        }
        if (agentAssist) {
            this.subscribeAgentAssistEvent();
        }
        if (customScreenpop) {
            this.subscribeCustomScreenpop();
        }
    }
    /**
     * subscribe the run app  event
     */
    subscribeRunAppEvent() {
        this.acdSessionManager.runAppSubject.subscribe((runAppData) => {
            const runApp = this.handleRunAppActions(runAppData);
            this.runAppEvent.next(runApp);
        });
    }
    /**
     * subscribe the page open  event
     */
    subscribePageOpenEvent() {
        this.acdSessionManager.pageOpenSubject.subscribe((pageOpenData) => {
            const pageOpen = this.handlePageOpenActions(pageOpenData);
            this.pageOpenEvent.next(pageOpen);
        });
    }
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.runAppSubject
     * ```
     */
    get runAppSubject() {
        return this.runAppEvent;
    }
    /**
     * @example
     * ```
     * const pageOpenManager = pageOpenManager.pageOpenSubject
     * ```
     */
    get pageOpenSubject() {
        return this.pageOpenEvent;
    }
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.contactScreenPopSubject
     * ```
     */
    get contactScreenPopSubject() {
        return this.contactScreenPopUrl;
    }
    /**
     * subscribe default screen pop and confiqure in 'reqagent' studio
     */
    screenPopForReqagentAndSkills() {
        this.acdSessionManager.screenPopSubject.subscribe((contactScreenPop) => {
            this.contactScreenPopUrl.next(contactScreenPop);
        });
    }
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.popUrlSubject
     * ```
     */
    get popUrlSubject() {
        return this.popUrlEvent;
    }
    /**
     * subscribe the popUrl  event
     */
    subscribePopUrlEvent() {
        this.acdSessionManager.popUrlSubject.subscribe((popUrl) => {
            this.popUrlEvent.next(popUrl);
        });
    }
    /**
     * @example
     * ```
     * const cxOneScrrenPop = cxOneScrrenPop.agentAssistSubject
     * ```
     */
    get agentAssistSubject() {
        return this.agentAssistEvent;
    }
    /**
     * subscribe the agent assist  event
     */
    subscribeAgentAssistEvent() {
        this.acdSessionManager.agentAssistSubject.subscribe((agentAssist) => {
            this.agentAssistEvent.next(agentAssist);
        });
    }
    /**
     * @example
     * ```
     * const cxOneCustomScreenPop = cxOneCustomScreenPop.customScreenpopSubject
     * ```
     */
    get customScreenpopSubject() {
        return this.customScreenpopEvent;
    }
    /**
     * subscribe the custom screenpop event
     */
    subscribeCustomScreenpop() {
        this.acdSessionManager.customScreenpopSubject.subscribe((customScreenpop) => {
            this.customScreenpopEvent.next(customScreenpop);
        });
    }
}
//# sourceMappingURL=cxone-screen-pop.js.map