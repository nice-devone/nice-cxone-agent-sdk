/// <reference types="react" />
/**
 * @remarks - Props to check the recording enable or not
 */
export interface CcfVoiceRecorderProps {
    enableRecording: boolean;
}
/**
 *  @remarks - interface to handle audio file list
 */
export interface CcfaudioFileList {
    fileList: FileList;
    url: 'base64String';
    nFile: File;
}
/**
 * Component to display voice recorder
 * @returns returns voice recorder
 * @example
 * ```
 * <CcfVoiceRecorder enableRecording={props.enableRecording}
 * ```
 */
export declare function CcfVoiceRecorder({ enableRecording, }: CcfVoiceRecorderProps): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfVoiceRecorder>;
export default _default;
