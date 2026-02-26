export interface CcfAudioWithSink extends HTMLAudioElement {
    setSinkId: (deviceId: string) => Promise<void>;
}
export declare const mockSoundFile: string[];
/**
 * Represents an audio output device.
 */
export interface DeviceInterface {
    /**
     * The unique identifier for the device.
     */
    id: string;
    /**
     * The label (name) of the device.
     */
    label: string;
}
/**
 * @example getAvailableAudioDevices();
 */
export declare const getAvailableAudioDevices: () => Promise<DeviceInterface[]>;
/**
 * @example <HeadsetDropdown />
 * @returns JSX for Headset Dropdown Component
 */
export declare function HeadsetDropdown(): JSX.Element;
/**
 * @example CcfVoiceSettings()
 * @returns
 */
export declare function CcfVoiceSettings(): JSX.Element;
export default CcfVoiceSettings;
