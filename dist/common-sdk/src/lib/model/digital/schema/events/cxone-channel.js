"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneChannelSchema = void 0;
const yup_1 = require("yup");
const cxone_channel_flags_1 = require("./cxone-channel-flags");
exports.CXoneChannelSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
    idOnExternalPlatform: (0, yup_1.string)().required(),
    name: (0, yup_1.string)().required(),
    isPrivate: (0, yup_1.boolean)().required(),
    realExternalPlatformId: (0, yup_1.string)().required(),
    wysiwygEnabled: (0, yup_1.boolean)(),
    externalPlatformIcon: (0, yup_1.string)().required(),
    isTrackingMessageDeliveryStatus: (0, yup_1.boolean)().default(false).nullable(),
}).concat((0, yup_1.object)().shape(cxone_channel_flags_1.CXoneChannelFlagsSchema.fields));
//# sourceMappingURL=cxone-channel.js.map