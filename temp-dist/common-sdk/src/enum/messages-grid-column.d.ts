/**
 * Enum for columns in the messages grid
 */
export declare enum MESSAGES_GRID_COLUMN {
    /**
     * The contact number associated with the message
     */
    CASE = "contactNumber",
    /**
     * The timestamp when the message was created
     */
    CREATED_AT = "createdAt",
    /**
     * The timestamp when the message was read
     */
    READ_AT = "readAt",
    /**
     * Indicates if the message has been read
     */
    IS_READ = "isRead",
    /**
     * The identity of the user who authored the message
     */
    AUTHOR_USER = "authorEndUserIdentity",
    /**
     * The content of the message
     */
    CONTENT = "messageContent",
    /**
     * Tags associated with the message
     */
    TAGS = "tags",
    /**
     * Attachments included with the message
     */
    ATTACHMENTS = "attachments",
    /**
     * Identifier of the message
     */
    SHOW_MESSAGE = "id",
    /**
   * Search option menu
   */
    SEARCH_OPTION_MENU = "searchOptionMenu",
    /**
     * The type of the channel
     */
    TYPE = "type",
    /**
     * The name of the channel
     */
    CHANNEL_NAME = "channelName"
}
