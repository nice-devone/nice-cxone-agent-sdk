"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalReplyChannelSchema = void 0;
const yup_1 = require("yup");
const cxone_digital_channels_1 = require("./cxone-digital-channels");
exports.CXoneDigitalReplyChannelSchema = (0, yup_1.object)().shape(Object.assign(Object.assign({}, cxone_digital_channels_1.CXoneDigitalChannelSchema.fields), { 
    // originId field is not coming in replyChannels list
    //originId and channelId comes as a required field in CXoneDigitalChannelSchema, but we don't get it in ReplyChannelSchema so making it optional
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: (0, yup_1.string)().nullable().optional(), 
    // channelId field is not coming in replyChannels list
    /**
     *  @remarks - channel id from contact response
     */
    channelId: (0, yup_1.string)().nullable().optional() }));
//# sourceMappingURL=cxone-digital-reply-channel.js.map