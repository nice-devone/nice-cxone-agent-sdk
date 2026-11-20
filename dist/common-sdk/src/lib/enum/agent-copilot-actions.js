"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionToContainerId = exports.excludedActionsForSmView = exports.actionsForOpenContainer = void 0;
const agent_copilot_card_actions_1 = require("./agent-copilot-card-actions");
const agent_copilot_container_id_1 = require("./agent-copilot-container-id");
/**
 * This are actions for open container
 */
exports.actionsForOpenContainer = [
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_INTERNAL_USE_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_LINKS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_LINKS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_IMAGES_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_IMAGES_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PROCESS_STEPS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.ADD_NEW_TOPICS,
    agent_copilot_card_actions_1.AgentCopilotCardActions.CLEAR_TEXT,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_INFO_CONTAINER
];
/**
 * This are actions which are excluded in sm view
 */
exports.excludedActionsForSmView = [
    agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_IMAGE,
    agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_PRIVATE_IMAGE,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_INTERNAL_USE_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_LINKS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_LINKS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_IMAGES_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_IMAGES_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PROCESS_STEPS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_INFO_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.MODIFY_FILTERS,
    agent_copilot_card_actions_1.AgentCopilotCardActions.LIKE,
    agent_copilot_card_actions_1.AgentCopilotCardActions.DISLIKE,
    agent_copilot_card_actions_1.AgentCopilotCardActions.SUBMIT_FEEDBACK_DATA,
    agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_SUMMARY,
    agent_copilot_card_actions_1.AgentCopilotCardActions.VIEW_DETAILS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.HIDE_DETAILS_CONTAINER,
    agent_copilot_card_actions_1.AgentCopilotCardActions.CHECK_CONTACT_HISTORY,
    agent_copilot_card_actions_1.AgentCopilotCardActions.EDIT_SUMMARY,
    agent_copilot_card_actions_1.AgentCopilotCardActions.SAVE_SUMMARY,
    agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_SUMMARY,
    agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_AUTOSUMMARY
];
/**
 * These are actions corresponding to containers id
 */
exports.actionToContainerId = {
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_ARTICLE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_ANSWERS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_ARTICLE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_ANSWERS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_ARTICLE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_ANSWERS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_PRIVATE_ARTICLE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_INTERNAL,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_PRIVATE_ARTICLE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_INTERNAL,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_PRIVATE_ARTICLE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_INTERNAL,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_LINK]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_LINK]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_PRIVATE_LINK]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_PRIVATE_LINK]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_LINK]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_IMAGE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_IMAGE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_IMAGE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_PRIVATE_IMAGE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_PRIVATE_IMAGE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_PRIVATE_IMAGE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_STEP]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_PRIVATE_STEP]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_STEP]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_STEP]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_STEPS]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_STEPS]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_STEPS]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_PRIVATE_STEPS]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_PRIVATE_STEP]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_PRIVATE_STEP]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.INSERT_PRIVATE_STEPS]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SEND_PRIVATE_STEPS]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.GENERATE_EMAIL]: agent_copilot_container_id_1.AgentCopilotContainerId.REPLY_GENERATING_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.LIKE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_ANSWERS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.DISLIKE]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_ANSWERS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_INTERNAL_USE_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_INTERNAL,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_PROCESS_STEPS_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_LINKS_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_LINKS_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_LINKS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_IMAGES_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PRIVATE_IMAGES_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PRIVATE_IMAGES,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_PROCESS_STEPS_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.KB_PROCESS_STEPS,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.ADD_NEW_TOPICS]: agent_copilot_container_id_1.AgentCopilotContainerId.SHOW_TOPIC_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.CLEAR_TEXT]: agent_copilot_container_id_1.AgentCopilotContainerId.SHOW_TOPIC_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SUBMIT_FEEDBACK_DATA]: agent_copilot_container_id_1.AgentCopilotContainerId.FEEDBACK_SUGGESTION_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.LIKE_OVERALL_SUBCARD]: agent_copilot_container_id_1.AgentCopilotContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.DISLIKE_OVERALL_SUBCARD]: agent_copilot_container_id_1.AgentCopilotContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.LIKE_INDIVIDUAL_SUBCARDS]: agent_copilot_container_id_1.AgentCopilotContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.DISLIKE_INDIVIDUAL_SUBCARDS]: agent_copilot_container_id_1.AgentCopilotContainerId.COMPREHENSIVE_FEEDBACK_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_INFO_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.FILTERS_USED,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.MODIFY_FILTERS]: agent_copilot_container_id_1.AgentCopilotContainerId.MODIFY_FILTERS_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_SUMMARY]: agent_copilot_container_id_1.AgentCopilotContainerId.JOURNEY_SUMMARY,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_INFORMATION]: agent_copilot_container_id_1.AgentCopilotContainerId.INFORMATION_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.VIEW_DETAILS_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.JOURNEY_SUMMARY,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.HIDE_DETAILS_CONTAINER]: agent_copilot_container_id_1.AgentCopilotContainerId.JOURNEY_SUMMARY,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.CHECK_CONTACT_HISTORY]: agent_copilot_container_id_1.AgentCopilotContainerId.INTERACTION_DETAILS_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.TASK_ASSIST_FORM_SUBMIT]: agent_copilot_container_id_1.AgentCopilotContainerId.TASK_ASSIST_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.RUN_TASK]: agent_copilot_container_id_1.AgentCopilotContainerId.TASK_ASSIST_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_TASK]: agent_copilot_container_id_1.AgentCopilotContainerId.TASK_ASSIST_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.CANCEL_TASK]: agent_copilot_container_id_1.AgentCopilotContainerId.TASK_ASSIST_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.COPY_SUMMARY]: agent_copilot_container_id_1.AgentCopilotContainerId.AUTO_SUMMARY_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.EDIT_SUMMARY]: agent_copilot_container_id_1.AgentCopilotContainerId.AUTO_SUMMARY_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.SAVE_SUMMARY]: agent_copilot_container_id_1.AgentCopilotContainerId.AUTO_SUMMARY_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.EXPAND_AUTOSUMMARY]: agent_copilot_container_id_1.AgentCopilotContainerId.AUTO_SUMMARY_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.RETRY_AUTOSUMMARY]: agent_copilot_container_id_1.AgentCopilotContainerId.AUTO_SUMMARY_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.OPEN_CHECKLIST]: agent_copilot_container_id_1.AgentCopilotContainerId.CHECKLIST_CONTAINER,
    [agent_copilot_card_actions_1.AgentCopilotCardActions.CLOSE_CHECKLIST]: agent_copilot_container_id_1.AgentCopilotContainerId.CHECKLIST_CONTAINER,
};
//# sourceMappingURL=agent-copilot-actions.js.map