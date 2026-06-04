export interface SendDtmfRequest {
    dtmfSequence: string;
    toneDurationMS: number;
    toneSpacingMS?: number;
}
