"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopilotMessageResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const agent_copilot_content_type_1 = require("../../enum/agent-copilot-content-type");
const agent_assist_base_response_1 = require("../agent-assist/agent-assist-base-response");
const MAX_NBR = 5; //For MVP, acp will support only 5 next best responses coming from websocket even though there could be more than 5
/**
 * Class for CopilotMessageResponse
 */
class CopilotMessageResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
     * Create instance of CopilotMessageResponse
     * ```
     * @example
     * const CopilotMessageResponse = new CopilotMessageResponse();
     * ```
     */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.message, respHeader);
        const { agentAssistSource, contactId, utcTimestamp, acpAppElements } = respBody;
        this.body = {
            agentAssistSource,
            contactId,
            utcTimestamp: new Date(utcTimestamp),
            acpAppElements: [],
            responseSent: '',
            insertedNBRId: '',
            isNBRAvailable: false,
            isNBROpen: false,
            isResponseInserted: false,
            isFinalSummaryGenerated: false,
            comprehensiveFeedback: {
                guidanceFeedbacks: [],
                contactFeedbackCard: {
                    overallFeedbackTitle: '',
                    feedback: '',
                },
            },
            filterDetails: {},
            isEditorActionPerformed: false,
            isComprehensiveFeedbackSent: false,
            updateComprehensiveCard: false,
            generateComprehensiveCard: false,
            isJourneySummaryExpanded: false,
            contactHistory: [],
            currentTaskAssistRequestStatus: '',
            copilotTaskAssistCardData: {},
            isFinalSummaryRegenerating: false,
        };
        acpAppElements === null || acpAppElements === void 0 ? void 0 : acpAppElements.forEach((element) => {
            const elemObj = CopilotMessageResponse.formatCopilotElement(element);
            this.body.acpAppElements.push(elemObj);
        });
    }
    /**
     *
     * @param element - Single element payload
     * @returns Element Object
     * @example CopilotMessageResponse.parseCopilotElement(element)
     */
    static parseCopilotElement(element) {
        var _a;
        const elemObj = {
            contentType: element === null || element === void 0 ? void 0 : element.contentType,
            cardType: element === null || element === void 0 ? void 0 : element.cardType,
            objectId: element === null || element === void 0 ? void 0 : element.objectId,
        };
        let { content } = element;
        if (typeof content === 'string') {
            content = JSON.parse(content);
        }
        switch (elemObj.contentType) {
            case agent_copilot_content_type_1.AgentCopilotContentType.RT_SUMMARY:
            case agent_copilot_content_type_1.AgentCopilotContentType.FINAL_SUMMARY_NOTES: {
                const elemContent = {
                    summary: content === null || content === void 0 ? void 0 : content.summary,
                };
                elemObj.content = elemContent;
                break;
            }
            case agent_copilot_content_type_1.AgentCopilotContentType.SENTIMENT:
            case agent_copilot_content_type_1.AgentCopilotContentType.TRANSFER_SUMMARY:
            case agent_copilot_content_type_1.AgentCopilotContentType.NEXT_BEST_RESPONSE:
            case agent_copilot_content_type_1.AgentCopilotContentType.NEXT_BEST_RESPONSE_LLM:
            case agent_copilot_content_type_1.AgentCopilotContentType.NEXT_BEST_RESPONSE_EXPERT: {
                const elemContent = {
                    nextBestResponses: {
                        type: content === null || content === void 0 ? void 0 : content.type,
                        bestResponse: (_a = content === null || content === void 0 ? void 0 : content.bestResponse) === null || _a === void 0 ? void 0 : _a.slice(0, MAX_NBR),
                    },
                };
                elemObj.content = elemContent;
                break;
            }
        }
        return elemObj;
    }
}
exports.CopilotMessageResponse = CopilotMessageResponse;
/**
 *
 * @param element - Single element payload
 * @returns Element Object
 * @example CopilotMessageResponse.formatCopilotElement(element)
 */
CopilotMessageResponse.formatCopilotElement = (element) => {
    const elemObj = {
        contentType: element === null || element === void 0 ? void 0 : element.contentType,
        cardType: element === null || element === void 0 ? void 0 : element.cardType,
        objectId: element === null || element === void 0 ? void 0 : element.objectId,
        content: element === null || element === void 0 ? void 0 : element.content,
    };
    let { content } = element;
    if (typeof content === 'string') {
        content = JSON.parse(content);
        elemObj.content = content;
    }
    switch (elemObj.contentType) {
        case agent_copilot_content_type_1.AgentCopilotContentType.NEXT_BEST_RESPONSE:
        case agent_copilot_content_type_1.AgentCopilotContentType.NEXT_BEST_RESPONSE_LLM:
        case agent_copilot_content_type_1.AgentCopilotContentType.NEXT_BEST_RESPONSE_EXPERT: {
            const elemContent = {
                nextBestResponses: {
                    type: content === null || content === void 0 ? void 0 : content.type,
                    bestResponse: content === null || content === void 0 ? void 0 : content.bestResponse,
                },
            };
            elemObj.content = elemContent;
            break;
        }
    }
    return elemObj;
};
//# sourceMappingURL=copilot-message-response.js.map