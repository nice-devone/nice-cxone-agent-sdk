import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { CcfAgentCopilotDynamicInput } from './ccf-agent-copilot-dynamic-input-types';
/**
 * Renders a section with its questions.
 * @param section - The section data containing questions.
 * @example `<SectionRenderer section={section}  />`
 */
export const SectionRenderer = ({ section }) => {
    return (_jsx(_Fragment, { children: section.questionsResponded.map((question) => (_jsx(CcfAgentCopilotDynamicInput, { question: question }, question.questionId))) }));
};
//# sourceMappingURL=ccf-section-renderer.js.map