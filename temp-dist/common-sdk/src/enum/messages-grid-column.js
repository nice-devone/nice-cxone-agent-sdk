"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES_GRID_COLUMN = void 0;
/**
 * Enum for columns in the messages grid
 */
var MESSAGES_GRID_COLUMN;
(function (MESSAGES_GRID_COLUMN) {
    /**
     * The contact number associated with the message
     */
    MESSAGES_GRID_COLUMN["CASE"] = "contactNumber";
    /**
     * The timestamp when the message was created
     */
    MESSAGES_GRID_COLUMN["CREATED_AT"] = "createdAt";
    /**
     * The timestamp when the message was read
     */
    MESSAGES_GRID_COLUMN["READ_AT"] = "readAt";
    /**
     * Indicates if the message has been read
     */
    MESSAGES_GRID_COLUMN["IS_READ"] = "isRead";
    /**
     * The identity of the user who authored the message
     */
    MESSAGES_GRID_COLUMN["AUTHOR_USER"] = "authorEndUserIdentity";
    /**
     * The content of the message
     */
    MESSAGES_GRID_COLUMN["CONTENT"] = "messageContent";
    /**
     * Tags associated with the message
     */
    MESSAGES_GRID_COLUMN["TAGS"] = "tags";
    /**
     * Attachments included with the message
     */
    MESSAGES_GRID_COLUMN["ATTACHMENTS"] = "attachments";
    /**
     * Identifier of the message
     */
    MESSAGES_GRID_COLUMN["SHOW_MESSAGE"] = "id";
    /**
   * Search option menu
   */
    MESSAGES_GRID_COLUMN["SEARCH_OPTION_MENU"] = "searchOptionMenu";
    /**
     * The type of the channel
     */
    MESSAGES_GRID_COLUMN["TYPE"] = "type";
    /**
     * The name of the channel
     */
    MESSAGES_GRID_COLUMN["CHANNEL_NAME"] = "channelName";
})(MESSAGES_GRID_COLUMN = exports.MESSAGES_GRID_COLUMN || (exports.MESSAGES_GRID_COLUMN = {}));
//# sourceMappingURL=messages-grid-column.js.map