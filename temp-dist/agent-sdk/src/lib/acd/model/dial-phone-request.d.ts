export interface DialPhoneRequest {
    skillId: number;
    phoneNumber: string;
    parentContactId?: string;
    callerId?: number;
    interactionId?: string;
}
