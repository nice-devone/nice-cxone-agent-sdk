export interface CcfAudioElement extends HTMLAudioElement {
    setSinkId: (deviceId: string) => void;
}
/**
 *
 * @example <CcfAudioRingtoneElementOnLoad />
 * Call this when you want the ringtone to play on mount.
 */
declare const CcfAudioRingtoneElementOnLoad: ({ isIncoming, }: {
    isIncoming: boolean;
}) => JSX.Element;
export default CcfAudioRingtoneElementOnLoad;
