/**
 *
 */
export declare enum ECC_ACTION_TYPE {
    CREATE_INTERACTION = "createInteraction",
    UPDATE_INTERACTION = "updateInteraction"
}
/**
 * Enum for LV interaction types
 */
export declare enum LV_INTERACTION_TYPES {
    EXTERNAL_OUTBOUND_CALL = "EXTERNAL_OUTBOUND_CALL",
    EXTERNAL_INBOUND_CALL = "EXTERNAL_INBOUND_CALL",
    EXTERNAL_OUTBOUND_EMAIL = "EXTERNAL_OUTBOUND_EMAIL",
    EXTERNAL_INBOUND_EMAIL = "EXTERNAL_INBOUND_EMAIL",
    EXTERNAL_OUTBOUND_SMS = "EXTERNAL_OUTBOUND_SMS",
    EXTERNAL_INBOUND_SMS = "EXTERNAL_INBOUND_SMS",
    EXTERNAL_OUTBOUND_CHAT = "EXTERNAL_OUTBOUND_CHAT",
    EXTERNAL_INBOUND_CHAT = "EXTERNAL_INBOUND_CHAT",
    EXTERNAL_OUTBOUND_MESSAGING = "EXTERNAL_OUTBOUND_MESSAGING",
    EXTERNAL_INBOUND_MESSAGING = "EXTERNAL_INBOUND_MESSAGING"
}
/**
 * Enum for LV interaction types
 */
export declare enum LV_INTERACTION_SUB_TYPES {
    OUTBOUND_WHATSAPP = "OUTBOUND_WHATSAPP",
    INBOUND_WHATSAPP = "INBOUND_WHATSAPP",
    OUTBOUND_MESSENGER = "OUTBOUND_MESSENGER",
    INBOUND_MESSENGER = "INBOUND_MESSENGER"
}
/**
 * This interface is for creating a a new interaction record or updating an existing record
 * from an external source.
 * Interface used as a Model for Request JSON
 *
 * ```
 * @example
 * Array<CXoneLvEccUuidRequest>
 * ```
 */
export interface ECCPayLoadType {
    /**
     * @remarks - represents action link
     */
    action: ECC_ACTION_TYPE;
    /**
     * @remarks - represents serviceId link
     */
    serviceId?: string;
    /**
     * @remarks - represents customerId link
     */
    customerId?: string;
    /**
     * Since we are using the same interface for both create and update operations, and the customerPoc field
     * is not required during an update, we have made it optional.
     * @remarks - represents customerPoc link
     */
    customerPoc?: string;
    /**
     * Since we are using the same interface for both create and update operations, and the startTime field
     * is not required during an update, we have made it optional.
     * @remarks - represents startTime link
     */
    startTime?: string;
    /**
     * @remarks - represents finishTime link
     */
    finishTime?: string;
    /**
     * @remarks - represents duration link
     */
    duration?: number;
    /**
     * @remarks - represents result link
     */
    result?: string;
    /**
     * Since we are using the same interface for both create and update operations, and the businessPoc
     * field is not required during an update, we have made it optional.
     *
     * The reason we are passing null for businessPoc is when an agent logs in using softPhone mode,
     * we don't have a proper businessPoc to send to LV as LV has string validation for businessPoc
     * @remarks - represents businessPoc link
     */
    businessPoc?: string | null;
    /**
     * @remarks - represents interactionType link
     */
    interactionType?: LV_INTERACTION_TYPES | null;
    /**
     * @remarks - represents interactionSubtype link
     */
    interactionSubtype?: LV_INTERACTION_SUB_TYPES | null;
    /**
     * @remarks - represents text link
     */
    text?: string;
    /**
     * @remarks - represents messagingBusinessPoc link
     */
    messagingBusinessPoc?: string | null;
    /**
     * @remarks - represents emailSubject link
     */
    emailSubject?: string | null;
    /**
     * @remarks - represents transferStartTime link
     */
    transferStartTime?: string;
    /**
     * @remarks - represents transferConnectTime link
     */
    transferConnectTime?: string;
    /**
     * @remarks - represents transferBridgeTime link
     */
    transferBridgeTime?: string;
    /**
     * @remarks - represents transferHoldDuration link
     */
    transferHoldDuration?: number;
    /**
     * @remarks - represents transferDuration link
     */
    transferDuration?: number;
    /**
     * @remarks - represents transferBridgeDuration link
     */
    transferBridgeDuration?: number;
    /**
     * @remarks - represents transferFinishTime link
     */
    transferFinishTime?: string;
    /**
     * @remarks - represents transferCallResult link
     */
    transferCallResult?: string;
    /**
     * @remarks - represents externalAgentId link
     */
    externalAgentId?: string;
    /**
     * @remarks -  maps to the message UUID in CXA interactions
     */
    externalInteractionId: string;
    /**
     * @remarks - represents note link
     */
    note?: string;
    /**
     * @remarks - represents externalThreadId link
     */
    externalThreadId?: string;
    /**
     * @remarks - represents externalUrl link
     */
    externalUrl?: string;
    /**
     * @remarks - represents customCol1 link
     */
    customCol1?: string;
    /**
     * @remarks - represents customCol2 link
     */
    customCol2?: string;
    /**
     * @remarks - represents customCol3 link
     */
    customCol3?: string;
    /**
     * @remarks - represents customCol4 link
     */
    customCol4?: string;
    /**
     * @remarks - represents customCol5 link
     */
    customCol5?: string;
    /**
     * @remarks - represents ani link
     */
    ani?: string;
    /**
     * @remarks - represents dnis link
     */
    dnis?: string;
    /**
     * These parameters are required by the search API.
     * @remarks - represents interactionId link
     */
    interactionId?: string;
    /**
     * These parameters are required by the search API.
     * @remarks - represents email address of the customer
     */
    emailAddress?: string;
    /**
     * These parameters are required by the search API.
     * @remarks - represents phone number of the customer
     */
    phoneNumber?: string;
    /**
     * These parameters are required by the search API.
     * @remarks - represents first name of the customer
     */
    firstName?: string;
    /**
     * These parameters are required by the search API.
     * @remarks - represents last name of the customer
     */
    lastName?: string;
}
/**
 * This interface is for fetching the UUID for enhanced customer card from livevox
 */
export interface ECCRequest {
    /**
     * @remarks - represents tenantId link
     */
    tenantId: string;
    /**
     * @remarks - represents if the case transcript should be saved or not
     */
    saveTranscript?: boolean;
    /**
     * @remarks - represents payload link
     */
    payload: ECCPayLoadType;
    /**
     * @remarks - represents customerId link
     */
    customerId?: string;
    /**
     * @remarks - represents customerPoc link
     */
    isAssignment?: boolean;
    /**
     * @remarks - represents callType link
     */
    callType?: string;
}
/**
 * This interface is for the response from the ECC Lambda function while a new intetraction is created.
 */
export interface CreateInteractionResponse {
    /**
     * @remarks - represents statusCode link
     */
    statusCode: number;
    /**
     * @remarks - represents message link
     */
    message: string;
    /**
     * @remarks - represents interactionId link
     */
    interactionId: string;
    /**
     * @remarks - represents customerId link
     */
    customerId: string;
}
/**
 * This interface is for the response from the ECC Lambda function while an interaction is updated.
 */
export interface UpdateInteractionResponse {
    /**
     * @remarks - represents statusCode link
     */
    statusCode: number;
    /**
     * @remarks - represents message link
     */
    message: string;
}
