import { CXoneDigitalEventType, caseStatusChangedEventSchema, messageAddedIntoCaseEventSchema, CXoneSdkError, CXoneSdkErrorType, CXoneContactDetailsEventSchema, contactDetailsInboxAssigneeEventSchema, caseInboxAssigneeChangedEventSchema, DigitalMessageNoteCreateEventSchema, DigitalMessageNoteUpdateEventSchema, SenderTypingEventSchema, TypingPreviewEventSchema, messageDeliveryStatusChangeSchema, } from '@nice-devone/common-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
/**
 * Helper class to accommodate parsing logic for cxone-digital-contact
 */
export class CXoneDigitalContactHelper {
    constructor() {
        this.logger = new CcfLogger('SDK', 'CXoneDigitalContact');
    }
    /**
     * Method to validate schema of web socket event response
     * @returns - validated response based on predefined schema
     * @example
     */
    validateResponseSchema(eventObj) {
        if (eventObj.data) {
            try {
                let schemaToValidate;
                let validatedResponse = null;
                switch (eventObj.eventType) {
                    case CXoneDigitalEventType.CASE_INBOX_ASSIGNED:
                        schemaToValidate = CXoneContactDetailsEventSchema;
                        break;
                    case CXoneDigitalEventType.CASE_INBOX_UNASSIGNED:
                        schemaToValidate = caseInboxAssigneeChangedEventSchema;
                        break;
                    case CXoneDigitalEventType.CASE_STATUS_CHANGED:
                        schemaToValidate = caseStatusChangedEventSchema;
                        break;
                    case CXoneDigitalEventType.MESSAGE_ADDED_INTO_CASE:
                        schemaToValidate = messageAddedIntoCaseEventSchema;
                        break;
                    case CXoneDigitalEventType.MESSAGE_NOTE_CREATED:
                        schemaToValidate = DigitalMessageNoteCreateEventSchema;
                        break;
                    case CXoneDigitalEventType.MESSAGE_NOTE_DELETED:
                    case CXoneDigitalEventType.MESSAGE_NOTE_UPDATED:
                        schemaToValidate = DigitalMessageNoteUpdateEventSchema;
                        break;
                    case CXoneDigitalEventType.MESSAGE_UPDATED:
                        schemaToValidate = messageAddedIntoCaseEventSchema;
                        break;
                    case CXoneDigitalEventType.SENDER_TYPING_START:
                    case CXoneDigitalEventType.SENDER_TYPING_END:
                        schemaToValidate = SenderTypingEventSchema;
                        break;
                    case CXoneDigitalEventType.MESSAGE_PREVIEW:
                        schemaToValidate = TypingPreviewEventSchema;
                        break;
                    case CXoneDigitalEventType.MESSAGE_DELIVERY_STATUS_CHANGED:
                    case CXoneDigitalEventType.MESSAGE_SEEN_CHANGED:
                        schemaToValidate = messageDeliveryStatusChangeSchema;
                        break;
                    default:
                        this.logger.info('parse', 'Default WSS CXoneDigitalEventType response ' + JSON.stringify(eventObj));
                        break;
                }
                // validate only if schemaToValidate set with object/array
                if (schemaToValidate && schemaToValidate.type === 'object') {
                    validatedResponse = schemaToValidate.validateSync(eventObj, { stripUnknown: true });
                    if (eventObj.eventType === CXoneDigitalEventType.CASE_INBOX_ASSIGNED) {
                        validatedResponse = contactDetailsInboxAssigneeEventSchema.cast(validatedResponse);
                    }
                }
                return validatedResponse;
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('validateResponseSchema', 'failed to validate response schema' + new CXoneSdkError(CXoneSdkErrorType.WEB_SOCKET_DATA_VALIDATE, error.message));
                }
            }
        }
    }
}
//# sourceMappingURL=cxone-digital-contact-helper.js.map