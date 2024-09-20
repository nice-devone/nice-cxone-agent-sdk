/**
 * Interface for Quick Response object
 */
export interface CXoneDigitalQuickResponse {
    messageContent: CXoneMessageContent;
    /**
     * @remarks - categoryId
     */
    categoryId?: string;
}
/**
 * Interface for CXone digital Message Content of quick Response
 */
export interface CXoneMessageContent {
    /**
     * @remarks - fallbackText for Message Content of quick Response
     */
    fallbackText: string;
    /**
     * @remarks - type of Message Content of quick Response
     */
    type: string;
    /**
     * @remarks - payload
     */
    payload: CXoneMessageContentPayload;
    /**
     * @remarks - message content parameters of quick responses to get details like Form Id
     */
    parameters: CXoneMessageContentParameters;
}
/**
 * Interface for digital Message Content of quick Response payload
 */
export interface CXoneMessageContentPayload {
    /**
    * @remarks - Action array
    */
    actions?: Array<CXoneMessageContentPayloadActions>;
    /**
     * @remarks - Text object for message content
     */
    text?: CXoneMessageContentPayloadText;
    /**
    * @remarks - description object for message content
    */
    title: CXoneMessageContentPayloadText;
    /**
     * @remarks - event object for timer type qr
     */
    event?: CXoneMessageContentEventParameters;
}
/**
 * Interface for digital Message Content of quick Response payload Action array
 */
export interface CXoneMessageContentPayloadActions {
    /**
    * @remarks - Post back string
    */
    postback: string;
    /**
     * @remarks - text
     */
    text: string;
    /**
     * @remarks - type
     */
    type: string;
}
/**
 * Interface for digital Message Content of quick Response payload Text object
 */
export interface CXoneMessageContentPayloadText {
    /**
    * @remarks -Content
    */
    content: string;
    /**
     * @remarks - text
     */
    text: string;
    /**
     * @remarks - mimeType
     */
    mimeType: string;
}
/**
 * Interface for digital quick responses message content parameters
 */
export interface CXoneMessageContentParameters {
    /**
    * @remarks - Form Id of the quick response
    */
    formId: string;
}
/**
 * Interface for digital Timer quick response event object
 */
export interface CXoneMessageContentEventParameters {
    /**
     * @remarks - description object for message content
     */
    title: CXoneMessageContentPayloadText;
    /**
     * @remarks - description object for selected time content
     */
    timeSlots: CXoneMessageTimeSlotParameters[];
    /**
     * @remarks - description object for location content
     */
    location?: CXoneMessageTimeLocationParameters;
}
/**
 * Interface for digital Timer quick response timeslot object
 */
export interface CXoneMessageTimeSlotParameters {
    /**
    * @remarks - uniq Id of the time slot response
    */
    id: string;
    /**
    * @remarks - duartion of the time slot response
    */
    duration: number;
    /**
    * @remarks - start time of the time slot response
    */
    startTime: string;
}
/**
 * Interface for digital Timer quick response location object
 */
export interface CXoneMessageTimeLocationParameters {
    /**
     * @remarks - description object for location content
     */
    title: CXoneMessageContentPayloadText;
    /**
     * @remarks - location latitude
     */
    latitude: number;
    /**
     * @remarks - location longitude
     */
    longitude: number;
    /**
     * @remarks - location radius
     */
    radius: number;
}
