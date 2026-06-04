/**
 * Generic enum for Message Types which needs to be shared between multiple apps.
 */
export declare enum CcfMessageType {
    Initialize = "Ccf_Initialize",
    InitializeAck = "Ccf_Initialize_Ack",
    Authenticated = "Ccf_Authenticated",
    UnAuthenticated = "Ccf_Un_Authenticated",
    AgentStateUpdated = "Ccf_Agent_State_Updated",
    AgentInitials = "Ccf_Agent_Initials",
    ConnectAgentLeg = "Ccf_Connect_Agent_Leg",
    ConnectAgentLegAck = "Ccf_Connect_Agent_Leg_Ack",
    TabContentUpdated = "Ccf_Tab_Content_Updated",
    CtdDialedNumber = "Ccf_Ctd_Dialed_Number",
    SetObSkillsAvailable = "Ccf_Set_Ob_Skills_Available",
    QueueCounterDetails = "Ccf_Queue_Counte_Details",
    SetCtdCustomAgentUrl = "Ccf_Set_Ctd_Custom_Agent_Url"
}
