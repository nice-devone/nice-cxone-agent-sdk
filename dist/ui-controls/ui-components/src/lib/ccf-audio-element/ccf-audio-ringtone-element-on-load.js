import { jsx as _jsx } from "react/jsx-runtime";
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import { useEffect, useRef } from 'react';
import { mockSoundFile } from '../ccf-settings/ccf-voice-settings';
/**
 *
 * @example <CcfAudioRingtoneElementOnLoad />
 * Call this when you want the ringtone to play on mount.
 */
const CcfAudioRingtoneElementOnLoad = ({ isIncoming, }) => {
    const audioRingtone = useRef(null);
    const secondaryDeviceFromLocal = LocalStorageHelper.getItem(NotificationSettings.SECONDARY_DEVICE, true);
    const secondaryDevice = (secondaryDeviceFromLocal === null || secondaryDeviceFromLocal === void 0 ? void 0 : secondaryDeviceFromLocal.id) || 0;
    const selectedRingtone = LocalStorageHelper.getItem(NotificationSettings.RINGTONE);
    const secondaryDeviceDelay = Number.parseInt(LocalStorageHelper.getItem(NotificationSettings.SECONDARY_DEVICE_DELAY));
    useEffect(() => {
        if (!audioRingtone.current) {
            return;
        }
        const secondaryDeviceId = secondaryDevice.toString();
        const audio = audioRingtone.current;
        if (secondaryDeviceId !== '0') {
            audio.play();
            setTimeout(() => {
                audio.setSinkId(secondaryDeviceId);
            }, secondaryDeviceDelay * 1000);
            return;
        }
        audio.play();
        return () => {
            audio.pause();
            audio.remove();
        };
    }, [secondaryDevice, secondaryDeviceDelay, selectedRingtone]);
    useEffect(() => {
        if (!audioRingtone.current) {
            return;
        }
        const audio = audioRingtone.current;
        if (!isIncoming) {
            audio.pause();
        }
        return () => {
            audio.remove();
        };
    }, [isIncoming]);
    return (_jsx("span", { children: _jsx("audio", { "data-testid": 'audio-ringtone-element-on-load', loop: true, src: mockSoundFile[selectedRingtone ? selectedRingtone : 1], ref: audioRingtone }) }));
};
export default CcfAudioRingtoneElementOnLoad;
//# sourceMappingURL=ccf-audio-ringtone-element-on-load.js.map