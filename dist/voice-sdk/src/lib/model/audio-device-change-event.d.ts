/** Payload emitted by {@link CXoneVoiceClient.onAudioDeviceChange} when the browser audio device list changes during a voice session. Subscribe to react to device changes and implement custom recovery flows. */
export interface AudioDeviceChangeEvent {
    /** Current list of available audio input (microphone) devices after the change */
    inputs: MediaDeviceInfo[];
    /** Current list of available audio output (speaker) devices after the change */
    outputs: MediaDeviceInfo[];
    /** True if the previously active microphone/speaker is no longer present in the device list */
    activeDeviceDisconnected: boolean;
    /** True if automatic failover to a replacement device succeeded */
    autoFailoverSucceeded: boolean;
    /** Label of the fallback input device selected during auto-failover, or null if not applicable */
    fallbackInputLabel: string | null;
    /** Label of the fallback output device selected during auto-failover, or null if not applicable */
    fallbackOutputLabel: string | null;
}
