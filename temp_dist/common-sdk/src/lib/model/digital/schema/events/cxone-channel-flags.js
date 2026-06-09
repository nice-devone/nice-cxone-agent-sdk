"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneChannelFlagsSchema = void 0;
const yup_1 = require("yup");
exports.CXoneChannelFlagsSchema = (0, yup_1.object)({
    hasReply: (0, yup_1.boolean)(),
    hasTreeStructure: (0, yup_1.boolean)(),
    hasPostAsPlaceholder: (0, yup_1.boolean)(),
    hasCustomerOnThirdParty: (0, yup_1.boolean)(),
    hasAbilityToQuoteMessage: (0, yup_1.boolean)(),
    hasAbilityToLike: (0, yup_1.boolean)(),
    hasAbilityToTag: (0, yup_1.boolean)(),
    hasPublishing: (0, yup_1.boolean)(),
    hasAbilityToSendFiles: (0, yup_1.boolean)(),
    hasOutboundFlow: (0, yup_1.boolean)(),
    hasOutboundTemplates: (0, yup_1.boolean)(),
    hasAbilityToShare: (0, yup_1.boolean)(),
    hasAbilityToDelete: (0, yup_1.boolean)(),
    hasAbilityToHide: (0, yup_1.boolean)(),
    hasAbilityToChangeRecipient: (0, yup_1.boolean)(),
    hasMultipleRecipient: (0, yup_1.boolean)(),
    hasCcAndBcc: (0, yup_1.boolean)(),
    hasVisibleTitle: (0, yup_1.boolean)(),
    hasEditableTitle: (0, yup_1.boolean)(),
    hasVisibleRecipients: (0, yup_1.boolean)(),
    hasAbilityToForwardMessage: (0, yup_1.boolean)(),
    hasAbilityToChangeFrom: (0, yup_1.boolean)(),
    hasMultipleThreadsPerEndUser: (0, yup_1.boolean)(),
    replyPrefixMentionTemplate: (0, yup_1.string)(),
});
//# sourceMappingURL=cxone-channel-flags.js.map