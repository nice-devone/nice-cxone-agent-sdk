import { SvgIconProps } from '@mui/material';
export declare enum VOICE_BIO_HUB_ICONS {
    AUDIO = "audio",
    RIGHT_ARROW = "right_arrow",
    LEFT_ARROW = "left_arrow",
    AUDIO_RECORDING_P1 = "audio_recording_p1",
    AUDIO_RECORDING_P2 = "audio_recording_p2",
    AUDIO_RECORDING_P3 = "audio_recording_p3",
    AUDIO_RECORDING_P4 = "audio_recording_p4",
    MINUS_CIRCLE = "minus_circle",
    X_CIRCLE = "x_circle",
    SUCCESS_CIRCLE = "success_circle",
    VERIFYING = "verifying",
    WARNING_CIRCLE = "warning_circle",
    SUCCESS_SHIELD = "success_shield",
    SUSPECT = "suspect",
    ERROR = "error",
    EMPTY = ""
}
interface IconListType {
    [svgName: string]: (size: string, svgProp?: SvgIconProps, viewBox?: string) => JSX.Element;
}
export declare const voiceHubIconList: IconListType;
export declare const voiceHubIconListSmView: IconListType;
export {};
