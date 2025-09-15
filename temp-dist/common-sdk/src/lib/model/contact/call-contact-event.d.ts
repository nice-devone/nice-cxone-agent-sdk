import { InferType } from 'yup';
export declare const CallContactEventYup: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks -
     * The unique contact ID for this contact. This will be unique on the platform.
     * Note that this value will change each time the call is transferred – the receiving agent will have a different contact ID.
     * It is possible to store the "master contact ID" (the contact ID of the original call, allowing you reference CRM or database data about the call.
     * The master Contact ID can be stored in a script variable, which will be delivered as a "screen pop variable".
     */
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * The unique parent contact ID for this contact.
     * Used to find "child"contact IDs after a call is transferred?
     * NOTE: will be the same as the contactID of the initial contact or if contact was never transferred.
     */
    masterId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is the current status of the contact.
     */
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    originalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string that indicates the call type.
     */
    callType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The phone number the caller dialed.
     */
    dnis: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The phone number the caller dialed from.
     */
    ani: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill the call was routed to (or placed on, for outbound calls)
     */
    skill: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Boolean value indicating whether the call is an inbound call or not. (If it's not inbound, it's outbound).
     */
    isInbound: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the contact started. This will always be in UTC time.
     */
    startTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the contact started. Tenant time zone?
     */
    startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the current status of the call was set. This will always be in UTC time (related to the server time).
     */
    lastStateChangeTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the current status of the call was set. BU timezone?
     */
    lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A string that represents a URL that should be opened in a browser and displayed to the agent.
     * This can be used to convey screen pop data to the agent.
     * In some cases, you can use this field to simply transfer data to the agent application without actually displaying a web page.
     */
    screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * An object containing script variables.
     */
    screenPopUrlVariables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    /**
     * @remarks -
     * A string that represents a disconnect reason if an outbound call failed, or other error that may occur on a call.
     * Various disconnect codes have various causes, and these will be documented in future versions of this documentation.
     * The possible values for DisconnectCode can be found below.
     */
    disconnectCode: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A Boolean value that indicates whether the call is being recorded (a.k.a. "logged").
     * This value will only show "true" if the agent has requested that the call be recorded.
     * If call recording/logging is initiated through an IVR script or by an administrator (through the Central admin web site or through the Admin API), this value will NOT indicate that the call is being recorded.
     */
    isLogging: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    timeout: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Boolean value that indicates whether or not this contact can be dispositioned.
     */
    allowDispositions: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A Boolean value that indicates whether or not this call is the "linked" call for a Personal Connection outbound dialer campaign.
     * If the ratio of outbound call attempts is greater than 1:1 (meaning more than one outbound call is being placed concurrently for each agent),
     * the agent session will receive CallContactEvent notices for each of the outbound calls that are assigned to the agent.
     * The agent's voice path will only be linked to one of the calls, however. This field indicates which of the calls the agent is listening to.
     * This allows you to do a screen pop or display data to the agent about the call that is deemed "most likely to be connected next".
     */
    isLinked: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    timeZones: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A Boolean value that indicates whether the call is completed.
     * When the voice path for a call is torn down, the agent session will receive a "Disconnected" status in a CallContactEvent.
     * But if the agent is moved into an Unavailable/ACW state, the contact will still be "active" in the system, and the FinalState property of the CallContactEvent will be "false".
     * Time will be counted towards the overall handle time for the contact during this phase.
     * When the ACW state finally ends, the contact will be completely closed out, and the agent will receive a Disconnected status event with the FinalState property set to "true".
     */
    finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A string that contains HTML data that should be displayed to the agent when they receive CallContactEvent notices for Personal Connection outbound dialer calls.
     * If the call was requeued to the dialer as a "callback", the original handling agent is able to enter "callback notes" for the call.
     * These should be displayed to the next agent to handle the call record. In addition, dialer list entries can have values that are considered "custom values" that should be displayed to the agent.
     * The callback notes and custom field display values are delivered in the OtherInformation field as HTML data.
     */
    otherInformation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    otherInformationNewFormat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * If blending is enabled on the platform, the agent session may be automatically logged into and out of a Personal Connection outbound skill campaign.
     * It is possible to move the agent out of a Personal Connection campaign, and to deliver a call for a skill that the agent is not directly assigned to handle.
     * In this scenario, the skill name is provided in the contact event so that it can be displayed to the agent (or used for other reasons).
     */
    blendingToSkillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - OSH flag to simulate SCH, when a BU is set to OSH or to allow OSH. Possible values are "single" or "multi-contact"
     */
    deliveryType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    customData: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    complianceRecord: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    confirmationRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * The unique parent contact ID for this contact. Used to find "child"contact IDs after a call is transferred
     * NOTE: will be the same as the contactID of the initial contact or if contact was never transferred.
     */
    parentContactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    omniGroupId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - customer configured ID
     */
    externalId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - If answer machine detected value will be set to "true"
     */
    ansMachineOverride: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - The max amount of time the dialer will attempt to detect an answering machine. If answering machine is not detected.
     */
    ansMachineOverrideEndTime: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Interaction Id
     */
    interactionId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Customer Card URL
     */
    customerCardUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - If Require Manual Agent Accept setting is enabled, value will be set to true
     */
    isRequireManualAccept: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks -
     * The unique contact ID for this contact. This will be unique on the platform.
     * Note that this value will change each time the call is transferred – the receiving agent will have a different contact ID.
     * It is possible to store the "master contact ID" (the contact ID of the original call, allowing you reference CRM or database data about the call.
     * The master Contact ID can be stored in a script variable, which will be delivered as a "screen pop variable".
     */
    contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * The unique parent contact ID for this contact.
     * Used to find "child"contact IDs after a call is transferred?
     * NOTE: will be the same as the contactID of the initial contact or if contact was never transferred.
     */
    masterId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is the current status of the contact.
     */
    status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    originalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A string that indicates the call type.
     */
    callType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The phone number the caller dialed.
     */
    dnis: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The phone number the caller dialed from.
     */
    ani: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill the call was routed to (or placed on, for outbound calls)
     */
    skill: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Boolean value indicating whether the call is an inbound call or not. (If it's not inbound, it's outbound).
     */
    isInbound: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the contact started. This will always be in UTC time.
     */
    startTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the contact started. Tenant time zone?
     */
    startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the current status of the call was set. This will always be in UTC time (related to the server time).
     */
    lastStateChangeTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Date value that is an ISO8601-formatted date/time that shows when the current status of the call was set. BU timezone?
     */
    lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A string that represents a URL that should be opened in a browser and displayed to the agent.
     * This can be used to convey screen pop data to the agent.
     * In some cases, you can use this field to simply transfer data to the agent application without actually displaying a web page.
     */
    screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * An object containing script variables.
     */
    screenPopUrlVariables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    /**
     * @remarks -
     * A string that represents a disconnect reason if an outbound call failed, or other error that may occur on a call.
     * Various disconnect codes have various causes, and these will be documented in future versions of this documentation.
     * The possible values for DisconnectCode can be found below.
     */
    disconnectCode: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A Boolean value that indicates whether the call is being recorded (a.k.a. "logged").
     * This value will only show "true" if the agent has requested that the call be recorded.
     * If call recording/logging is initiated through an IVR script or by an administrator (through the Central admin web site or through the Admin API), this value will NOT indicate that the call is being recorded.
     */
    isLogging: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    timeout: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - A Boolean value that indicates whether or not this contact can be dispositioned.
     */
    allowDispositions: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A Boolean value that indicates whether or not this call is the "linked" call for a Personal Connection outbound dialer campaign.
     * If the ratio of outbound call attempts is greater than 1:1 (meaning more than one outbound call is being placed concurrently for each agent),
     * the agent session will receive CallContactEvent notices for each of the outbound calls that are assigned to the agent.
     * The agent's voice path will only be linked to one of the calls, however. This field indicates which of the calls the agent is listening to.
     * This allows you to do a screen pop or display data to the agent about the call that is deemed "most likely to be connected next".
     */
    isLinked: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    timeZones: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A Boolean value that indicates whether the call is completed.
     * When the voice path for a call is torn down, the agent session will receive a "Disconnected" status in a CallContactEvent.
     * But if the agent is moved into an Unavailable/ACW state, the contact will still be "active" in the system, and the FinalState property of the CallContactEvent will be "false".
     * Time will be counted towards the overall handle time for the contact during this phase.
     * When the ACW state finally ends, the contact will be completely closed out, and the agent will receive a Disconnected status event with the FinalState property set to "true".
     */
    finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * A string that contains HTML data that should be displayed to the agent when they receive CallContactEvent notices for Personal Connection outbound dialer calls.
     * If the call was requeued to the dialer as a "callback", the original handling agent is able to enter "callback notes" for the call.
     * These should be displayed to the next agent to handle the call record. In addition, dialer list entries can have values that are considered "custom values" that should be displayed to the agent.
     * The callback notes and custom field display values are delivered in the OtherInformation field as HTML data.
     */
    otherInformation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    otherInformationNewFormat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * If blending is enabled on the platform, the agent session may be automatically logged into and out of a Personal Connection outbound skill campaign.
     * It is possible to move the agent out of a Personal Connection campaign, and to deliver a call for a skill that the agent is not directly assigned to handle.
     * In this scenario, the skill name is provided in the contact event so that it can be displayed to the agent (or used for other reasons).
     */
    blendingToSkillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - OSH flag to simulate SCH, when a BU is set to OSH or to allow OSH. Possible values are "single" or "multi-contact"
     */
    deliveryType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    customData: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    complianceRecord: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    confirmationRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     * The unique parent contact ID for this contact. Used to find "child"contact IDs after a call is transferred
     * NOTE: will be the same as the contactID of the initial contact or if contact was never transferred.
     */
    parentContactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks -
     */
    omniGroupId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - customer configured ID
     */
    externalId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - If answer machine detected value will be set to "true"
     */
    ansMachineOverride: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - The max amount of time the dialer will attempt to detect an answering machine. If answering machine is not detected.
     */
    ansMachineOverrideEndTime: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Interaction Id
     */
    interactionId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - Customer Card URL
     */
    customerCardUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - If Require Manual Agent Accept setting is enabled, value will be set to true
     */
    isRequireManualAccept: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>;
export declare type CallContactEvent = InferType<typeof CallContactEventYup>;
