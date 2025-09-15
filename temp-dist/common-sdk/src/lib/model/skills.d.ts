import { CXoneDisposition } from './disposition';
/**
 * Declare all the skills details
 */
export interface Skills {
    /**
     * @remarks - flag to identify outbound skill
     */
    isOutbound: boolean;
    /**
     * @remarks - Unique identifier for skill
     */
    skillId: number;
    /**
     * @remarks - Name of the skill
     */
    skillName: string;
    /**
     * @remarks - Unique identifier for media type
     */
    mediaTypeId: number;
    /**
     * @remarks - Name of the media type
     */
    mediaTypeName: string;
    /**
     * @remarks - flag to identify active skill
     */
    isActive: boolean;
    /**
     * @remarks
     */
    workItemQueueType?: string;
    /**
     * @remarks The numerical ID of the campaign with which the Skill is associated
     */
    campaignId?: number;
    /**
     * @remarks The textual name of the campaign with which the Skill is associated
     */
    campaignName?: string;
    /**
     * @remarks Notes associated with the Skill
     */
    notes?: string;
    /**
     * @remarks ID of the ACW tyep. 1 for "None", 2 for "Disposition", 3 for "Automatic Wrap-up"
     */
    acwTypeId?: number;
    /**
     * @remarks ID of the ACW state for the Skill
     */
    stateIdACW?: number;
    /**
     * @remarks Name of the ACW state for the Skill
     */
    stateNameACW?: string;
    /**
     * @remarks Maximum number of seconds in ACW state
     */
    maxSecondsACW?: number;
    /**
     * @remarks
     */
    acwPostTimeoutStateId?: number;
    /**
     * @remarks
     */
    acwPostTimeoutStateName?: string;
    /**
     * @remarks Indicates if the Skill requires a disposition
     */
    requireDisposition?: boolean;
    /**
     * @remarks Indicates if the Skill uses a secondary disposition
     */
    allowSecondaryDisposition?: boolean;
    /**
     * @remarks Time in seconds forced between PC calls
     */
    agentRestTime?: number;
    /**
     * @remarks Indicates if the Chat Skill saves a transcript
     */
    makeTranscriptAvailable?: boolean;
    /**
     * @remarks
     */
    transcriptFromAddress?: string;
    /**
     * @remarks Indicates if a Thank You is used on the Skill
     */
    displayThankyou?: boolean;
    /**
     * @remarks URL for Thank You used on the Skill
     */
    thankYouLink?: string;
    /**
     * @remarks Indicates if a Thank You is popped on the Skill
     */
    popThankYou?: boolean;
    /**
     * @remarks URL for Thank You that is popped on the Skill
     */
    popThankYouURL?: string;
    /**
     * @remarks Outbound strategy assigned to the Skill
     */
    outboundStrategy?: string;
    /**
     * @remarks Indicates if the Personal Connection Skill is running
     */
    isRunning?: boolean;
    /**
     * @remarks Indicates if the Skill uses priority blending
     */
    priorityBlending?: boolean;
    /**
     * @remarks  If set then the Override Caller ID setting is enabled and this value is used for Caller ID
     */
    callerIdOverride?: string;
    /**
     * @remarks The ID of the Script
     */
    scriptId?: number;
    /**
     * @remarks The Name of the Script
     */
    scriptName?: string;
    /**
     * @remarks Email address for the Agent on the Skill
     */
    emailFromAddress?: string;
    /**
     * @remarks Indicates if the from email address can be changed on the Skill
     */
    emailFromEditable?: boolean;
    /**
     * @remarks Email Bcc address for the Skill
     */
    emailBccAddress?: string;
    /**
     * @remarks Indicates if Email Parking is enabled
     */
    emailParking?: boolean;
    /**
     * @remarks Time in seconds before a warning is sent about a stale Chat.  Number between 1 and 999
     */
    chatWarningThreshold?: number;
    /**
     * @remarks Indicates if the Patron can see an indicator showing the Agent is typing
     */
    agentTypingIndicator?: boolean;
    /**
     * @remarks Indicates if the Agent is allowed to see what characters the Patron is typing before they hit send
     */
    patronTypingPreview?: boolean;
    /**
     * @remarks Indicates if Skill is interruptible
     */
    interruptible?: boolean;
    /**
     * @remarks The ID of the suppression Script
     */
    callSuppressionScriptId?: number;
    /**
     * @remarks Profile ID returned from GET /hours-of-operation
     */
    reskillHours?: number;
    /**
     * @remarks Profile name returned from GET /hours-of-operation
     */
    reskillHoursName?: string;
    /**
     * @remarks Indicates if reskill hours are counted
     */
    countReskillHours?: number;
    /**
     * @remarks Minimum number of Agents for WFI
     */
    minWFIAgents?: number;
    /**
     * @remarks Minimum number of available agents setting
     */
    minWFIAvailableAgents?: number;
    /**
     * @remarks Indicates if the Skill uses screen pops
     */
    useScreenPops?: boolean;
    /**
     * @remarks Determines when the screen pop for the Skill occurs
     */
    screenPopTriggerEvent?: string;
    /**
     * @remarks Indicates if the Skill uses custom screen pops
     */
    useCustomScreenPops?: boolean;
    /**
     * @remarks If set then the Custom Screen Pop type is set to "Application" and the value is used as the screenpop
     */
    screenPopDetail?: string;
    /**
     * @remarks Minimum time spent on Email contact in seconds
     */
    minWorkingTime?: number;
    /**
     * @remarks Indicates if the Skill is agentless
     */
    agentless?: boolean;
    /**
     * @remarks Indicates number of ports used for agentless
     */
    agentlessPorts?: boolean;
    /**
     * @remarks Initial priority setting for the Skill
     */
    initialPriority?: number;
    /**
     * @remarks Acceleration rate for the Skill
     */
    acceleration?: number;
    /**
     * @remarks Maximum priority value for the Skill
     */
    maxPriority?: number;
    /**
     * @remarks SLA threshold in percentage
     */
    serviceLevelThreshold?: number;
    /**
     * @remarks SLA goal in percentage
     */
    serviceLevelGoal?: number;
    /**
     * @remarks Indicates if the Skill uses short abandons
     */
    enableShortAbandon?: boolean;
    /**
     * @remarks Short abandon threshold in seconds
     */
    shortAbandonThreshold?: number;
    /**
     * @remarks Indicates if the Skill counts short abandons
     */
    countShortAbandons?: boolean;
    /**
     * @remarks Indicates if the Skill counts other abandons
     */
    countOtherAbandons?: boolean;
    /**
     * @remarks ID of the Message Template assigned to the Skill
     */
    messageTemplateId?: number;
    /**
     * @remarks ID of the SMS transport code
     */
    smsTransportCodeId?: number;
    /**
     * @remarks SMS transport code
     */
    smsTransportCode?: string;
    /**
     * @remarks Array of dispositions
     */
    dispositions?: CXoneDisposition[];
    /**
     * @remarks deliver multiple numbers serially
     */
    deliverMultipleNumbersSerially?: boolean;
    /**
     * @remarks - cradle to grave
     */
    cradleToGrave?: boolean;
    /**
     * @remarks - priority interrupt
     */
    priorityInterrupt?: boolean;
    /**
     * @remarks - outbound telecom route Id
     */
    outboundTelecomRouteId?: number;
    /**
     * @remarks - If Require Manual Agent Accept setting is enabled, value will be set to true
     */
    isRequireManualAccept?: boolean;
    /**
  * @remarks - agent response enabled
  */
    agentResponseEnabled?: boolean;
    /**
     * @remarks - agent first response time
     */
    agentFirstResponseTime?: number;
    /**
     * @remarks - customer response enabled
     */
    customerResponseEnabled?: boolean;
    /**
     * @remarks - agent follow on response time
     */
    agentFollowOnResponseTime?: number;
    /**
     * @remarks - customer Idle time
     */
    customerIdleTime?: number;
    /**
     * @remarks - timer extension enabled
     */
    timeExtensionEnabled?: boolean;
}
