export interface StartSessionRequest {
    stationId: string;
    stationPhoneNumber: string;
    asAgentId?: number;
    inactivityTimeout?: number;
    inactivityForceLogout?: boolean;
}
