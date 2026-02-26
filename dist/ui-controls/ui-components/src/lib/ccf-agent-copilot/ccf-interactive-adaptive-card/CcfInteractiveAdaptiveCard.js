import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import * as AdaptiveCards from 'adaptivecards';
import { debounce } from '../../../hooks/useDebounce';
import { SubmitAction, OpenUrlAction } from 'adaptivecards';
import { CcfAgentCopilotContainerFunctions } from '../ccf-agent-copilot-helper';
/**
 * Component to render an Adaptive Card in real-time with input change handling
 * @example <CcfInteractiveAdaptiveCard/>
 */
const CcfInteractiveAdaptiveCard = ({ payload, hostConfig, onInputChange, onExecuteAction, style, }) => {
    const containerRef = useRef(null);
    const debouncedInputHandler = useRef(debounce((values) => {
        onInputChange === null || onInputChange === void 0 ? void 0 : onInputChange(values);
    }, 3000)).current;
    useEffect(() => {
        const adaptiveCard = new AdaptiveCards.AdaptiveCard();
        if (hostConfig) {
            adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig);
        }
        adaptiveCard.parse(payload); // Handle input changes with debounce
        adaptiveCard.onInputValueChanged = () => {
            const inputs = adaptiveCard.getAllInputs();
            const values = {};
            inputs.forEach((input) => {
                if (input.id !== undefined) {
                    values[input.id] = input.value;
                }
            });
            debouncedInputHandler(values);
        };
        // Handle card actions
        adaptiveCard.onExecuteAction = (action) => {
            var _a, _b;
            if (action instanceof SubmitAction) {
                const inputs = adaptiveCard.getAllInputs();
                const actionData = ((_a = action.data) !== null && _a !== void 0 ? _a : {});
                const finalData = CcfAgentCopilotContainerFunctions.buildSubmitActionFinalData(inputs.map((input) => ({
                    id: input.id,
                    value: input.value,
                })), actionData);
                const metadata = {
                    title: action.title,
                    type: (_b = action.getJsonTypeName) === null || _b === void 0 ? void 0 : _b.call(action),
                    data: finalData,
                };
                onExecuteAction === null || onExecuteAction === void 0 ? void 0 : onExecuteAction(metadata);
            }
            else if (action instanceof OpenUrlAction) {
                // Handle OpenUrl actions by opening the URL directly
                if (action.url) {
                    window.open(action.url, '_blank');
                }
            }
        };
        const renderedCard = adaptiveCard.render();
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            if (renderedCard) {
                containerRef.current.appendChild(renderedCard);
            }
        }
    }, [payload, hostConfig, debouncedInputHandler, onExecuteAction]);
    return _jsx("div", { ref: containerRef, style: style });
};
export default CcfInteractiveAdaptiveCard;
//# sourceMappingURL=CcfInteractiveAdaptiveCard.js.map