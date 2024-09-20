"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPlatformTemplatesResponse = exports.ExternalPlatformTemplates = exports.ExternalPlatformTemplatesMessageContent = exports.ExternalPlatformTemplatesMessageContentPayload = exports.ExternalPlatformTemplatesMessageContentPayloadElements = void 0;
const yup_1 = require("yup");
exports.ExternalPlatformTemplatesMessageContentPayloadElements = (0, yup_1.object)({
    /**
     * @remarks template identifier
     */
    id: (0, yup_1.string)(),
    /**
     * @remarks template type
     */
    type: (0, yup_1.string)(),
    /**
     * @remarks template text
     */
    text: (0, yup_1.string)(),
    /**
     * @remarks template name
     */
    template: (0, yup_1.string)(),
    /**
     * @remarks template variables if any
     */
    variables: (0, yup_1.mixed)(),
});
exports.ExternalPlatformTemplatesMessageContentPayload = (0, yup_1.object)({
    postback: (0, yup_1.string)(),
    elements: (0, yup_1.array)().of((0, yup_1.object)()
        .shape(exports.ExternalPlatformTemplatesMessageContentPayloadElements.fields))
});
exports.ExternalPlatformTemplatesMessageContent = (0, yup_1.object)({
    /**
     * @remarks template message content type
     */
    type: (0, yup_1.string)(),
    /**
     * @remarks actual payload data
     */
    payload: (0, yup_1.object)().shape(exports.ExternalPlatformTemplatesMessageContentPayload.fields),
});
exports.ExternalPlatformTemplates = (0, yup_1.object)({
    /**
     * @remarks template name
     */
    template: (0, yup_1.string)(),
    /**
     * @remarks template category defined in external platform like meta
     */
    category: (0, yup_1.string)().nullable(),
    /**
     * @remarks Message content in template
     */
    messageContent: (0, yup_1.object)().shape(exports.ExternalPlatformTemplatesMessageContent.fields),
});
exports.ExternalPlatformTemplatesResponse = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.ExternalPlatformTemplates.fields));
//# sourceMappingURL=external-platform-templates.js.map