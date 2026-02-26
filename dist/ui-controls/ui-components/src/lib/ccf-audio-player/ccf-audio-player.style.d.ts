import { Theme } from '@mui/material';
/**
 * style object for ccf-audio-player component
 * @returns CcfAudioPlayerStyle object
 * ```
 * @example
 * <CcfAudioPlayerStyle />
 * ```
 */
declare const CcfAudioPlayerStyle: (theme: Theme, conatinerWidth: string | undefined, isInboundDirection: boolean | undefined, shouldShowCloseIcon: boolean) => {
    mainContainer: {
        display: string;
        flexDirection: string;
        width: string;
        margin: string;
        borderRadius: string;
        height: string;
    };
    audioHoldIcon: {
        fontSize: number;
        marginLeft: number;
        color: string;
    };
    audioResumeIcon: {
        fontSize: number;
        marginLeft: string;
        color: string;
    };
    fabButton: {
        height: string;
        width: string;
        minHeight: string;
        padding: string;
        backgroundColor: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    recordInprogress: {
        margin: string;
        position: string;
    };
    closeIcon: {
        color: string | undefined;
        fontSize: string;
        cursor: string;
        marginRight: string;
        marginLeft: string;
        height: string;
        width: string;
    };
    audioPlayerPlayButton: {
        '& .rhap_button-clear': {
            overflow: string;
            marginBottom: string;
            borderRadius: string;
        };
        '& .rhap_progress-indicator': {
            [x: string]: string | {
                width: string;
            };
            background: string;
            top: string;
            height: string;
            width: string;
        };
        '& .rhap_container': {
            [x: string]: string | {
                width: string;
            };
            borderRadius: string;
            height: string;
            padding: string;
        };
        '& .rhap_progress-bar-show-download': {
            color: string;
            height: string;
        };
        '& .rhap_time': {
            fontSize: string;
        };
        '& .rhap_controls-section': {
            marginLeft: string;
            flexGrow: string;
        };
        '& .rhap_play-pause-button': {
            zIndex: string;
            marginBottom: string;
        };
    };
    circularProgress: {
        [x: string]: string | number | {
            top: number;
            left: number;
            height: number;
            width: number;
        };
        position: string;
        top: number;
        left: number;
        zIndex: number;
        height: string;
        width: string;
    };
    downloadIcon: {
        cursor: string;
        marginLeft: string;
        marginRight: string;
        color: string;
    };
    audioAttachmentContainer: {
        overflow: string;
        backgroundColor: string;
    };
    pulseAnimation: {
        margin: string;
        background: string;
        width: string;
        height: string;
        position: string;
        borderRadius: string;
        border: string;
        animation: string;
        '&::-webkit-backface-visibility': string;
        '&::-moz-backface-visibility': string;
        '&::-ms-backface-visibility': string;
        backfaceVisibility: string;
    };
    recordTimer: {
        marginRight: string;
    };
    tooltipArea: {
        width: string;
    };
    audioPlayerColor: {
        color: string;
    };
    fab: {
        position: string;
        height: string;
        width: string;
        margin: string;
        border: string;
        backgroundColor: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
};
export default CcfAudioPlayerStyle;
