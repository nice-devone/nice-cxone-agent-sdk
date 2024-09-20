"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneRichMessageSchema = void 0;
const digital_message_content_types_1 = require("./../../../../../enum/digital-message-content-types");
const yup_1 = require("yup");
const cxone_rich_message_field_type_1 = require("../../../../enum/cxone-rich-message-field-type");
const mediaSchema = (0, yup_1.object)().shape({
    fileName: (0, yup_1.string)(),
    url: (0, yup_1.string)(),
    mimeType: (0, yup_1.string)(),
});
const contentSchema = (0, yup_1.object)().shape({
    content: (0, yup_1.string)(),
});
const replyButtonSchema = (0, yup_1.object)().shape({
    type: (0, yup_1.string)().oneOf([digital_message_content_types_1.DigitalMessageContentTypes.REPLY_BUTTON]).required(),
    text: (0, yup_1.string)(),
    postback: (0, yup_1.string)(),
});
const locationSchema = (0, yup_1.object)().shape({
    title: contentSchema,
    latitude: (0, yup_1.number)().optional().nullable(),
    longitude: (0, yup_1.number)().optional().nullable(),
    radius: (0, yup_1.number)().positive().optional().nullable(),
});
const CXoneRichMessageTextSchema = (0, yup_1.object)().shape({
    elements: (0, yup_1.array)(),
});
const CXoneMessageRichLinkSchema = (0, yup_1.object)().shape({
    media: mediaSchema.required(),
    title: contentSchema.required(),
    url: (0, yup_1.string)().url(),
});
const CXoneRichMessageListPickerSchema = (0, yup_1.object)().shape({
    title: contentSchema.required(),
    text: contentSchema.required(),
    actions: (0, yup_1.array)().of(replyButtonSchema.shape({
        icon: mediaSchema.optional().nullable(),
        description: (0, yup_1.string)().optional().nullable(),
    })),
});
const CXoneRichMessageQuickRepliesSchema = (0, yup_1.object)().shape({
    text: contentSchema.required(),
    actions: (0, yup_1.array)().of(replyButtonSchema.required()).required(),
});
const CXoneRichMessageTimePickerSchema = (0, yup_1.object)().shape({
    title: contentSchema.required(),
    event: (0, yup_1.object)().shape({
        title: contentSchema,
        timeSlots: (0, yup_1.array)().of((0, yup_1.object)().shape({
            id: (0, yup_1.string)().required(),
            duration: (0, yup_1.number)().integer().positive().required(),
            startTime: (0, yup_1.date)().required(),
        }).required()).optional(),
    }),
    location: locationSchema.optional().nullable(),
});
const CXoneRichPluginSchema = (0, yup_1.object)().shape({
    text: (0, yup_1.string)().optional().nullable(),
    postback: (0, yup_1.string)().optional().nullable(),
    elements: (0, yup_1.array)().of((0, yup_1.object)().shape({
        id: (0, yup_1.string)().optional().nullable(),
        type: (0, yup_1.string)().optional().nullable(),
        text: (0, yup_1.string)().optional().nullable(),
        postback: (0, yup_1.string)().optional().nullable(),
        url: (0, yup_1.string)().optional().nullable(),
        elements: (0, yup_1.array)().of((0, yup_1.object)().shape({
            id: (0, yup_1.string)().optional().nullable(),
            type: (0, yup_1.string)().optional().nullable(),
            text: (0, yup_1.string)().optional().nullable(),
            postback: (0, yup_1.string)().optional().nullable(),
            url: (0, yup_1.string)().optional().nullable(),
            elements: (0, yup_1.array)().of((0, yup_1.object)()).nullable(),
            variables: (0, yup_1.array)().nullable(),
            mimeType: (0, yup_1.string)().optional().nullable(),
        }).nullable()).nullable(),
    }).nullable()).nullable(),
});
const textSchema = (0, yup_1.object)().shape({
    type: (0, yup_1.string)().oneOf(['TEXT']).required(),
    content: (0, yup_1.string)().required(),
    mimeType: (0, yup_1.string)().oneOf(['text/plain']).required(),
}).required();
const fieldSchema = (0, yup_1.object)().shape({
    type: (0, yup_1.string)().optional().nullable(),
    label: textSchema,
    description: textSchema,
    ident: (0, yup_1.string)().required(),
    placeholder: (0, yup_1.string)().when('type', {
        is: cxone_rich_message_field_type_1.CXoneRichMessageFieldType.TEXT,
        then: (0, yup_1.string)().required(),
        otherwise: (0, yup_1.string)().notRequired(),
    }),
    options: (0, yup_1.mixed)().when('type', {
        is: cxone_rich_message_field_type_1.CXoneRichMessageFieldType.TEXT,
        then: (0, yup_1.object)().shape({
            multiline: (0, yup_1.boolean)(),
        }).nullable(),
        otherwise: (0, yup_1.mixed)().when('type', {
            is: cxone_rich_message_field_type_1.CXoneRichMessageFieldType.SELECT,
            then: (0, yup_1.array)().of((0, yup_1.object)().shape({
                title: textSchema,
                postback: (0, yup_1.string)().required(),
            })).optional().nullable(),
        }),
    }).nullable(),
    multipleChoice: (0, yup_1.boolean)().when('type', {
        is: cxone_rich_message_field_type_1.CXoneRichMessageFieldType.SELECT,
        then: (0, yup_1.boolean)().required(),
        otherwise: (0, yup_1.boolean)().notRequired(),
    }),
});
const submissionSchema = (0, yup_1.object)().shape({
    id: (0, yup_1.string)().uuid().optional().nullable(),
}).required();
const CXoneRichMessageFormSchema = (0, yup_1.object)().shape({
    title: textSchema,
    description: textSchema,
    fields: (0, yup_1.array)().of(fieldSchema).required(),
    submission: submissionSchema,
});
exports.CXoneRichMessageSchema = (0, yup_1.object)().when('type', {
    is: digital_message_content_types_1.DigitalMessageContentTypes.TEXT,
    then: CXoneRichMessageTextSchema,
    otherwise: (0, yup_1.object)().when('type', {
        is: digital_message_content_types_1.DigitalMessageContentTypes.RICH_LINK,
        then: CXoneMessageRichLinkSchema,
        otherwise: (0, yup_1.object)().when('type', {
            is: digital_message_content_types_1.DigitalMessageContentTypes.LIST_PICKER,
            then: CXoneRichMessageListPickerSchema,
            otherwise: (0, yup_1.object)().when('type', {
                is: digital_message_content_types_1.DigitalMessageContentTypes.QUICK_REPLIES,
                then: CXoneRichMessageQuickRepliesSchema,
                otherwise: (0, yup_1.object)().when('type', {
                    is: digital_message_content_types_1.DigitalMessageContentTypes.TIME_PICKER,
                    then: CXoneRichMessageTimePickerSchema,
                    otherwise: (0, yup_1.object)().when('type', {
                        is: digital_message_content_types_1.DigitalMessageContentTypes.FORM,
                        then: CXoneRichMessageFormSchema,
                        otherwise: (0, yup_1.object)().when('type', {
                            is: digital_message_content_types_1.DigitalMessageContentTypes.PLUGIN,
                            then: CXoneRichPluginSchema,
                        }),
                    }),
                }),
            }),
        }),
    }),
});
//# sourceMappingURL=cxone-message-types.js.map