import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { CcfLogger, CXoneClient, CXoneProductFeature, FeatureToggleService } from '@nice-devone/agent-sdk';
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import { CxoneHeadsetClient } from '@nice-devone/headset-sdk';
import { CcfButton, CcfTypography, useTranslator, CcfSwitchItem } from '@nice-devone/ui-controls';
import { SetItemHelper, SetSwitchHelper } from './ccf-settings-switch-item';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Typography, useTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { CXoneVoiceClientWrapper } from '../../services/cxone-voice-client-wrapper';
import { CXoneLeaderElector, PermissionKeys, PermissionValues } from '@nice-devone/common-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { agentLegAutoAcceptEnabled, AssignmentSlice, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfAudioElement from '../ccf-audio-element/ccf-audio-element';
import { agentSelectedVoicePreference } from '../ccf-acd-session/ccf-acd-session.slice';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getCurrentHeadsetDevice, getHeadsetDeviceList } from './ccf-notification-settings.slice';
import { getAutoAcceptSettings, getIntegratedSoftphoneSettings, updateClientDataSettings } from '../ccf-settings/ccf-full-settings.slice';
import settingsStyles from './ccf-settings.styles';
const ccfLogger = new CcfLogger('App.consumer', 'CcfVoiceSettings');
export const mockSoundFile = [
    '',
    '/assets/audio/Ring1.mp3',
    '/assets/audio/Ring2.mp3',
    '/assets/audio/Ring3.mp3'
];
const constraints = {
    audio: true,
    video: false,
};
var MediaDeviceKind;
(function (MediaDeviceKind) {
    MediaDeviceKind["AUDIO_OUTPUT"] = "audiooutput";
})(MediaDeviceKind || (MediaDeviceKind = {}));
/**
 * @example getAvailableAudioDevices();
 */
export const getAvailableAudioDevices = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const devices = [];
    try {
        yield ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia(constraints));
        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) || !((_b = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _b === void 0 ? void 0 : _b.enumerateDevices)) {
            return devices;
        }
        const mediaDevices = yield ((_c = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _c === void 0 ? void 0 : _c.enumerateDevices()); // Await the async call
        const outputDevices = mediaDevices.filter((device) => { var _a; return ((_a = String(device === null || device === void 0 ? void 0 : device.kind)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === String(MediaDeviceKind.AUDIO_OUTPUT).toLowerCase(); });
        outputDevices.forEach((outputDevice, index) => {
            const device = { id: '', label: '' };
            device.id = outputDevice.deviceId;
            device.label = outputDevice.label || 'audio out ' + index;
            devices.push(device);
        });
        return devices;
    }
    catch (error) {
        ccfLogger.info('getAvailableAudioDevices', JSON.stringify(error));
        return devices;
    }
});
/**
 * @example <HeadsetDropdown />
 * @returns JSX for Headset Dropdown Component
 */
export function HeadsetDropdown() {
    const headset = CxoneHeadsetClient.instance;
    const theme = useTheme();
    const settingStyles = settingsStyles(theme);
    const [translate] = useTranslator();
    const currentDevice = useSelector(getCurrentHeadsetDevice);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const headsetDeviceList = useSelector(getHeadsetDeviceList);
    /**
     * Change Current Selected Device
     * @param event - change in selected device from dropdown
     * @example handleCurrentDeviceChange
     */
    const handleCurrentDeviceChange = (event) => __awaiter(this, void 0, void 0, function* () {
        if (event.target.value !== '0')
            yield headset.updateCurrentDevice(event.target.value);
        if (event.target.value === '0')
            yield headset.updateCurrentDevice('0');
        setSelectedDevice(event.target.value);
    });
    useEffect(() => {
        headsetDeviceList.length && setDeviceList(headsetDeviceList);
    }, [headsetDeviceList]);
    useEffect(() => {
        currentDevice && (currentDevice === null || currentDevice === void 0 ? void 0 : currentDevice.id) && setSelectedDevice(currentDevice === null || currentDevice === void 0 ? void 0 : currentDevice.id.toString());
    }, [currentDevice]);
    return (_jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "current-selected-headset-label" }, { children: translate('selectedDevices') })), _jsxs(Select, Object.assign({ labelId: 'current-selected-headset-label', id: 'current-selected-headset-select', label: translate('selectedDevices'), value: ((currentDevice === null || currentDevice === void 0 ? void 0 : currentDevice.id) && (currentDevice === null || currentDevice === void 0 ? void 0 : currentDevice.id) !== '0') ? selectedDevice : '0', sx: settingStyles.selectionDropdown, onChange: handleCurrentDeviceChange }, { children: [_jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: '0' }, { children: translate('noDevices') }), '0'), deviceList === null || deviceList === void 0 ? void 0 : deviceList.map((device) => {
                        return _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: device === null || device === void 0 ? void 0 : device.id }, { children: device === null || device === void 0 ? void 0 : device.name }), device === null || device === void 0 ? void 0 : device.id);
                    })] }))] })));
}
/**
 * @example CcfVoiceSettings()
 * @returns
 */
export function CcfVoiceSettings() {
    const ringtoneAudio = useRef(null);
    const isAgentLegAutoAcceptEnabled = useSelector(agentLegAutoAcceptEnabled);
    const autoAcceptSetting = useSelector(getAutoAcceptSettings);
    const [autoAccept, setAutoAccept] = useState(isAgentLegAutoAcceptEnabled || autoAcceptSetting);
    const agentSelectedVoicePref = useSelector(agentSelectedVoicePreference);
    const [autoAcceptAgentConfigDisabled, setAutoAcceptAgentConfigDisabled] = useState(true);
    const integratedSoftphoneSettings = useSelector(getIntegratedSoftphoneSettings);
    const [delay, setDelay] = useState((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceDelay) || 0);
    const [deviceOptions, setDevices] = useState([]);
    const [secondaryDevice, setSecondaryDevice] = useState((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDevice) || 0);
    const [secondaryDeviceLabel, setSecondaryDeviceLabel] = useState((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceName) || 0);
    const [tone, setTone] = useState((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.ringtone) || 1);
    const [translate] = useTranslator();
    const [volume, setVolume] = useState((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.softPhoneVolume) || 0.8);
    const [micNCSlider, setMicNC] = useState(0.9);
    const [speakNCSlider, setSpeakNC] = useState(0.7);
    const [micNCToggle, setMicNCToggle] = useState(true);
    const [speakerNCToggle, setSpeakerNCToggle] = useState(true);
    const [noiseCancellation, setNoiseCancellation] = useState(false);
    const [ncExtensionInstalled, setNCExtensionInstalled] = useState(CXoneVoiceClientWrapper.instance.isNoiseCancellationExtInstalled);
    const dispatch = useDispatch();
    const theme = useTheme();
    const settingStyles = settingsStyles(theme);
    const [showHeadsetSettings, setShowHeadsetSettings] = useState(false);
    const client = CXoneClient.instance;
    const headset = CxoneHeadsetClient.instance;
    const [memoryLimit, setMemoryLimit] = useState(LocalStorageHelper.getItem('MEMORY_LIMIT', false) || 800);
    const isHeapPerformanceReloadToggle = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-heap-performance-reload-AW-46709" /* FeatureToggles.HEAP_PERFORMANCE_RELOAD_TOGGLE */);
    const constraints = {
        audio: true,
        video: false,
    };
    const helpLink = 'https://help.nicecxone.com/PoC.htm#cshid=CXANCExt';
    useEffect(() => {
        autoAcceptSetting && LocalStorageHelper.setItem(NotificationSettings.AUTO_ACCEPT, autoAcceptSetting);
        (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.softPhoneVolume) && LocalStorageHelper.setItem(NotificationSettings.SOFTPHONE_VOLUME, integratedSoftphoneSettings.softPhoneVolume);
        setSecondaryDevice((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDevice) || 0);
        setSecondaryDeviceLabel((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceName) || 0);
        const selectedDeviceFromLocal = LocalStorageHelper.getItem(NotificationSettings.SECONDARY_DEVICE, true);
        (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDevice) !== null && (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDevice) !== undefined ?
            selectedDeviceFromLocal.id = integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDevice : selectedDeviceFromLocal.id = 0;
        (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceName) !== null && (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceName) !== undefined ?
            selectedDeviceFromLocal.label = integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceName : selectedDeviceFromLocal.label = 0;
        LocalStorageHelper.setItem(NotificationSettings.SECONDARY_DEVICE, selectedDeviceFromLocal);
        (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.ringtone) && LocalStorageHelper.setItem(NotificationSettings.RINGTONE, integratedSoftphoneSettings.ringtone);
        (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings.secondaryDeviceDelay) && LocalStorageHelper.setItem(NotificationSettings.SECONDARY_DEVICE_DELAY, integratedSoftphoneSettings.secondaryDeviceDelay);
    }, [autoAcceptSetting, integratedSoftphoneSettings]);
    /**
     *
     * @param event - Callback fired when the state is changed.
     * @param checked - If `true`, the component appears selected. Checked is passed in by MUI component <FormControlLabel />
     * @example handleChange
     *
     */
    const handleAutoAccept = (_event, checked) => {
        dispatch(AssignmentSlice.actions.setAutoAccept(checked));
        LocalStorageHelper.setItem(NotificationSettings.AUTO_ACCEPT, checked);
        setAutoAccept(checked);
        dispatch(updateClientDataSettings({ autoAccept: checked }));
    };
    /**
     *
     * @param checked - If `true`, the component appears selected. Checked is passed in by MUI component <FormControlLabel />
     * @example
     * ```
     * handleChange
     * ```
     *
     */
    function handleNCMicChange(checked) {
        setMicNCToggle(checked);
        LocalStorageHelper.setItem(NotificationSettings.NOISE_CANCELLATION_MIC_TOGGLE, checked);
        CXoneVoiceClientWrapper.instance.enableMicIris(checked);
    }
    /**
     *
     * @param checked - If `true`, the component appears selected. Checked is passed in by MUI component <FormControlLabel />
     * @example
     * ```
     * handleChange
     * ```
     *
     */
    function handleNCSpeakerChange(checked) {
        setSpeakerNCToggle(checked);
        LocalStorageHelper.setItem(NotificationSettings.NOISE_CANCELLATION_SPEAKER_TOGGLE, checked);
        CXoneVoiceClientWrapper.instance.enableSpeakerIris(checked);
    }
    /**
     *
     * @param event - Volume
     * @param newVolume - new volume setting
     * @example handleVolumeChange()
     */
    const handleVolumeChange = (_event, newVolume) => {
        const volumeValue = Array.isArray(newVolume) ? newVolume[0] : newVolume;
        const volumeQuotient = volumeValue / 100;
        setVolume(volumeQuotient);
        LocalStorageHelper.setItem(NotificationSettings.SOFTPHONE_VOLUME, volumeQuotient);
        CXoneVoiceClientWrapper.instance.volumeChange(volumeQuotient);
        dispatch(updateClientDataSettings({ integratedSoftphone: { softPhoneVolume: volumeQuotient } }));
    };
    /**
     *
     * @param _event - micSlider
     * @param newSliderValue - new micSlider setting
     * @example
     * ```
     * handleNCMicSliderChange()
     * ```
     */
    const handleNCMicSliderChange = (_event, newSliderValue) => {
        setMicNC(newSliderValue);
        LocalStorageHelper.setItem(NotificationSettings.NOISE_CANCELLATION_MIC_SLIDER, newSliderValue);
        CXoneVoiceClientWrapper.instance.enableNCMicChange(newSliderValue);
    };
    /**
     *
     * @param _event - Slider
     * @param newSliderValue - The new volume value for the NC speaker.
     * @example
     * ```
     * handleNCSpeakerSliderChange()
     * ```
     */
    const handleNCSpeakerSliderChange = (_event, newSliderValue) => {
        setSpeakNC(newSliderValue);
        LocalStorageHelper.setItem(NotificationSettings.NOISE_CANCELLATION_SPEAKER_SLIDER, newSliderValue);
        CXoneVoiceClientWrapper.instance.enableNCSpeakerChange(newSliderValue);
    };
    /**
     *
     * @param event - Ringtone change
     * @example handleRingTonechange()
     */
    const handleRingToneChange = (event) => {
        setTone(event.target.value);
        LocalStorageHelper.setItem(NotificationSettings.RINGTONE, event.target.value);
        dispatch(updateClientDataSettings({ integratedSoftphone: { ringtone: event.target.value } }));
    };
    /**
     *
     * @param event - Secondary Device
     * @example handleSecondaryDeviceChange
     */
    const handleSecondaryDeviceChange = (event) => {
        var _a, _b, _c;
        setSecondaryDeviceLabel((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
        const selectedDevice = deviceOptions.filter((devices) => { var _a, _b, _c; return ((_a = String(devices === null || devices === void 0 ? void 0 : devices.label)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_c = String((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value)) === null || _c === void 0 ? void 0 : _c.toLowerCase()); })[0];
        setSecondaryDevice((selectedDevice === null || selectedDevice === void 0 ? void 0 : selectedDevice.id) || 0);
        const secondaryDeviceDetails = { id: (selectedDevice === null || selectedDevice === void 0 ? void 0 : selectedDevice.id) || 0, label: ((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value) || 0 };
        LocalStorageHelper.setItem(NotificationSettings === null || NotificationSettings === void 0 ? void 0 : NotificationSettings.SECONDARY_DEVICE, secondaryDeviceDetails);
        dispatch(updateClientDataSettings({ integratedSoftphone: { secondaryDeviceName: (_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.value, secondaryDevice: (selectedDevice === null || selectedDevice === void 0 ? void 0 : selectedDevice.id) || 0 } }));
    };
    /**
     *
     * @param event - Delay is seconds
     * @example handleDelaySecondschange
     */
    const handleDelaySecondsChange = (event) => {
        setDelay(event.target.value);
        LocalStorageHelper.setItem(NotificationSettings.SECONDARY_DEVICE_DELAY, event.target.value);
        dispatch(updateClientDataSettings({ integratedSoftphone: { secondaryDeviceDelay: event.target.value } }));
    };
    /**
     *
     * @param event - memory limit
     * @example handleMemoryLimitChange
     */
    const handleMemoryLimitChange = (event) => {
        const memoryValue = event.target.value;
        LocalStorageHelper.setItem('MEMORY_LIMIT', memoryValue);
        setMemoryLimit(memoryValue);
    };
    /**
     *
     * @param event - play ringtone file
     * @example onPlayClick
     */
    const onPlayClick = (_event, secondary) => {
        if (!ringtoneAudio.current) {
            return;
        }
        const audio = ringtoneAudio.current;
        // Pause any existing audio from ref
        audio.pause();
        // Set the audio on every click in case it was changed between clicks
        audio.src = mockSoundFile[tone];
        if (CXoneLeaderElector.instance.isLeader) {
            // Check for secondary device paramter
            if (secondary) {
                const deviceId = secondaryDevice.toString();
                // if a secondary device exists, set it.
                if (deviceId !== '0') {
                    audio.setSinkId(deviceId);
                }
                audio.play();
                return;
            }
            audio.setSinkId('default');
            audio.play();
        }
    };
    /**
     *
     * @example populateFromStorate()
     */
    const populateFromStorage = () => {
        SetItemHelper(NotificationSettings.SECONDARY_DEVICE_DELAY, setDelay);
        SetItemHelper(NotificationSettings.SOFTPHONE_VOLUME, setVolume);
        SetItemHelper(NotificationSettings.RINGTONE, setTone);
        SetSwitchHelper(NotificationSettings.AUTO_ACCEPT, setAutoAccept);
        SetItemHelper(NotificationSettings.NOISE_CANCELLATION_MIC_SLIDER, setMicNC);
        SetItemHelper(NotificationSettings.NOISE_CANCELLATION_SPEAKER_SLIDER, setSpeakNC);
        SetSwitchHelper(NotificationSettings.NOISE_CANCELLATION_MIC_TOGGLE, setMicNCToggle);
        SetSwitchHelper(NotificationSettings.NOISE_CANCELLATION_SPEAKER_TOGGLE, setSpeakerNCToggle);
    };
    // Checking for crm embedded and integrated agent app and displaying headset settings accordingly
    useEffect(() => {
        var _a, _b;
        const url = window.location.href;
        const app = (_b = (_a = new URL(url)) === null || _a === void 0 ? void 0 : _a.searchParams) === null || _b === void 0 ? void 0 : _b.get('app');
        if (app === 'cxa' || app === 'cxai') {
            setShowHeadsetSettings(true);
        }
    }, []);
    useEffect(() => {
        /**
       *
       * @example fetchDevices()
       */
        const fetchDevices = () => __awaiter(this, void 0, void 0, function* () {
            const devices = yield getAvailableAudioDevices();
            setDevices(devices);
        });
        fetchDevices();
        populateFromStorage();
        return () => {
            ccfLogger.info('voice settings', ' Close');
        };
    }, []);
    useEffect(() => {
        CXoneClient.instance.cxoneTenant
            .checkProductEnablement([CXoneProductFeature.NC_CXONE_AGENT])
            .then((resp) => {
            if (resp) {
                setNoiseCancellation(true);
            }
        });
        /**
         * Handles the change event for the noise cancellation setting.
         * @param value - The new value of the noise cancellation setting.
         * @example
         * handleNoiseCancellationChange(true);
         */
        const handleNoiseCancellationChange = (value) => {
            setNCExtensionInstalled(value);
        };
        CXoneVoiceClientWrapper.instance.events.on('noiseCancellationExtInstalledChange', handleNoiseCancellationChange);
        return () => {
            CXoneVoiceClientWrapper.instance.events.off('noiseCancellationExtInstalledChange', handleNoiseCancellationChange);
        };
    }, [noiseCancellation]);
    useEffect(() => {
        const ccfLoggerUseEffect = new CcfLogger('App.consumer', 'CcfVoiceSettings');
        (() => __awaiter(this, void 0, void 0, function* () {
            const autoAcceptPermissionEnabled = yield client.agentPermission.checkPermissions(PermissionKeys.AGENTLEG_AUTOACCEPT, PermissionValues.ENABLE);
            const autoAcceptPermissionAgentConfig = yield client.agentPermission.checkPermissions(PermissionKeys.AGENTLEG_AUTOACCEPT, PermissionValues.AGENT_CONFIG);
            (() => {
                // If auto accept permission is disabled, set local storage value to false, set state to false, and set disabled to true.
                if (!autoAcceptPermissionEnabled) {
                    setAutoAccept(false);
                    LocalStorageHelper.setItem(NotificationSettings.AUTO_ACCEPT, 'false');
                    setAutoAcceptAgentConfigDisabled(true);
                    dispatch(AssignmentSlice.actions.setAutoAccept(false));
                    return;
                }
                // Show the auto accept setting only if the permission is enabled
                if (autoAcceptPermissionEnabled) {
                    //If auto accept permission is enabled and agent config is disabled, set auto accept setting to true
                    if (!autoAcceptPermissionAgentConfig) {
                        LocalStorageHelper.setItem(NotificationSettings.AUTO_ACCEPT, 'true');
                        setAutoAcceptAgentConfigDisabled(true);
                        setAutoAccept(true);
                        dispatch(AssignmentSlice.actions.setAutoAccept(true));
                        return;
                    }
                    // If auto accept permission is enabled and agent config is enabled, setAutoAcceptAgentConfigDisabled to false, so that configuration component will not be disabled.
                    if (autoAcceptPermissionAgentConfig) {
                        if (LocalStorageHelper.getItem(NotificationSettings.AUTO_ACCEPT) === 'true') {
                            setAutoAccept(true);
                            dispatch(AssignmentSlice.actions.setAutoAccept(true));
                        }
                        else {
                            setAutoAccept(false);
                            dispatch(AssignmentSlice.actions.setAutoAccept(false));
                        }
                        setAutoAcceptAgentConfigDisabled(false);
                        return;
                    }
                }
            })();
        }))().catch((err) => {
            ccfLoggerUseEffect.error('useEffect', err);
        });
    }, [client.agentPermission, dispatch]);
    return (_jsxs(Box, Object.assign({ sx: settingStyles.loginVoiceSettingsContainer }, { children: [_jsxs(Box, { children: [_jsx(CcfAudioElement, { ref: ringtoneAudio }), _jsxs(List, Object.assign({ component: 'div', role: 'presentation', sx: { width: '100%', bgcolor: 'background.paper' }, subheader: _jsxs(ListSubheader, Object.assign({ sx: { position: 'static' } }, { children: [translate('softPhone'), " "] })) }, { children: [_jsx(ListItem, { children: _jsx(Box, Object.assign({ sx: { width: 225 } }, { children: _jsxs(Stack, Object.assign({ spacing: 2, direction: "row", sx: { mb: 1 }, alignItems: "center" }, { children: [_jsx(VolumeDown, {}), _jsx(Slider, { sx: settingStyles.volumeSlider, "aria-label": "Volume", value: volume * 100, onChange: handleVolumeChange }), _jsx(VolumeUp, {})] })) })) }), _jsx(CcfSwitchItem, { text: "autoAccept", icon: _jsx(PhoneInTalkIcon, {}), handleChange: handleAutoAccept, name: NotificationSettings.AUTO_ACCEPT, isChecked: autoAccept, isDisabled: autoAcceptAgentConfigDisabled }), _jsx(ListItem, { children: _jsxs(Grid, Object.assign({ container: true, direction: "row", alignItems: "center" }, { children: [_jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "demo-simple-select-disabled-label" }, { children: translate('ringTone') })), _jsxs(Select, Object.assign({ labelId: "demo-simple-select-disabled-label", id: "demo-simple-select", value: tone, label: translate('ringTone'), onChange: handleRingToneChange, disabled: autoAccept }, { children: [_jsx(MenuItem, Object.assign({ value: 0, sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement] }, { children: translate('none') })), _jsx(MenuItem, Object.assign({ value: 1, sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement] }, { children: translate('ring1') })), _jsx(MenuItem, Object.assign({ value: 2, sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement] }, { children: translate('ring2') })), _jsx(MenuItem, Object.assign({ value: 3, sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement] }, { children: translate('ring3') }))] }))] })), _jsx(Tooltip, Object.assign({ describeChild: true, enterDelay: 500, title: autoAccept ? translate('disabled') : translate('playRingtone') }, { children: autoAccept ? (_jsx(IconButton, Object.assign({ "aria-label": translate('disabled'), disabled: true }, { children: _jsx(PlayDisabledIcon, {}) }))) : (_jsx(IconButton, Object.assign({ disableRipple: true, sx: settingStyles.focusedElement, onClick: onPlayClick, "aria-label": translate('playRingtone') }, { children: _jsx(PlayArrowIcon, {}) }))) }))] })) })] })), _jsxs(List, Object.assign({ component: 'div', role: 'presentation', sx: { width: '100%', bgcolor: 'background.paper' }, subheader: _jsx(ListSubheader, Object.assign({ sx: { position: 'static' } }, { children: translate('secondaryRinger') })) }, { children: [_jsx(ListItem, { children: _jsxs(Grid, Object.assign({ container: true, direction: "row", alignItems: "center" }, { children: [_jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "secondary-device-label" }, { children: translate('secondaryDevice') })), _jsxs(Select, Object.assign({ labelId: "secondary-device-label", id: "secondary-device-select", value: secondaryDeviceLabel, label: translate('secondaryDevice'), onChange: handleSecondaryDeviceChange, defaultValue: 4, disabled: autoAccept }, { children: [_jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 0 }, { children: translate('none') }), 'none-secondary-device'), deviceOptions.map((option) => {
                                                            return (_jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: option.label }, { children: option.label }), option.label));
                                                        })] }))] })), _jsx(Tooltip, Object.assign({ describeChild: true, enterDelay: 500, title: autoAccept ? translate('disabled') : translate('playRingtone') }, { children: autoAccept || secondaryDevice.toString() === '0' ? (_jsx(IconButton, Object.assign({ "aria-label": translate('disabled'), disabled: true }, { children: _jsx(PlayDisabledIcon, {}) }))) : (_jsx(IconButton, Object.assign({ onClick: (e) => onPlayClick(e, true), "aria-label": translate('playSecondaryRingtone') }, { children: _jsx(PlayArrowIcon, {}) }))) }))] })) }), _jsx(ListItem, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "delay-seconds-label" }, { children: translate('delaySeconds') })), _jsxs(Select, Object.assign({ labelId: "delay-seconds-label", id: "delay-seconds-select", value: delay, label: translate('delaySeconds'), onChange: handleDelaySecondsChange, disabled: autoAccept }, { children: [_jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 0 }, { children: translate('none') })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 1 }, { children: "1" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 2 }, { children: "2" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 3 }, { children: "3" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 4 }, { children: "4" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 5 }, { children: "5" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 6 }, { children: "6" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 7 }, { children: "7" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 8 }, { children: "8" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 9 }, { children: "9" })), _jsx(MenuItem, Object.assign({ sx: [settingStyles.menuItem, settingStyles.hoveredElement, settingStyles.focusedElement], value: 10 }, { children: "10" }))] }))] })) })] })), (isHeapPerformanceReloadToggle) && (_jsx(List, Object.assign({ sx: { width: '100%', bgcolor: 'background.paper' }, subheader: _jsx(ListSubheader, Object.assign({ sx: { position: 'static' } }, { children: translate('memoryLimit') })) }, { children: _jsx(ListItem, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "memory-limit-label" }, { children: translate('memoryLimit') })), _jsxs(Select, Object.assign({ labelId: "memory-limit-label", id: "memory-limit-select", value: memoryLimit, label: translate('memoryLimit'), onChange: handleMemoryLimitChange, disabled: autoAccept }, { children: [_jsx(MenuItem, Object.assign({ value: 1 }, { children: translate('none') })), _jsx(MenuItem, Object.assign({ value: 400 }, { children: "400" })), _jsx(MenuItem, Object.assign({ value: 600 }, { children: "600" })), _jsx(MenuItem, Object.assign({ value: 800 }, { children: "800" })), _jsx(MenuItem, Object.assign({ value: 1000 }, { children: "1000" })), _jsx(MenuItem, Object.assign({ value: 1200 }, { children: "1200" }))] }))] })) }) }))), agentSelectedVoicePref === 'WebRTC' && noiseCancellation ? (_jsxs(List, Object.assign({ component: 'div', role: 'presentation', sx: Object.assign({ width: '100%', bgcolor: 'background.paper' }, settingStyles.noiseCancellationContainer), subheader: _jsx(ListSubheader, Object.assign({ disableSticky: true }, { children: translate('noiseCancellation') })) }, { children: [!ncExtensionInstalled && _jsxs("div", Object.assign({ style: { paddingLeft: '16px', display: 'inline-flex' } }, { children: [_jsx(InfoOutlinedIcon, {}), _jsxs("p", Object.assign({ style: { paddingLeft: '5px', color: '#616c75', fontWeight: '500', fontSize: '0.875rem', marginTop: '0px' } }, { children: [translate('ncExtensionHelpText'), " ", _jsx("a", Object.assign({ href: helpLink, target: "_blank" }, { children: translate('ncExtensionHelpDoc') }))] }))] })), _jsx(ListItem, { children: _jsxs(Box, Object.assign({ sx: { width: 225 } }, { children: [_jsxs(Stack, Object.assign({ spacing: 2, direction: "row", sx: { mb: 1 }, alignItems: "center" }, { children: [_jsx(KeyboardVoiceOutlinedIcon, {}), _jsx(Switch, { checked: micNCToggle, onChange: (e) => {
                                                        handleNCMicChange(e.target.checked);
                                                    }, "data-testid": "mic-switch", disabled: !ncExtensionInstalled })] })), micNCToggle && (_jsxs(Stack, { children: [_jsx(Typography, Object.assign({ id: "input-slider", variant: "h6", gutterBottom: true }, { children: translate('micSensitivity') })), _jsx(Slider, { sx: { width: 150 }, "aria-label": "Volume1", value: micNCSlider, onChange: handleNCMicSliderChange, min: 0, max: 1, step: 0.01, disabled: !ncExtensionInstalled })] }))] })) }), _jsx(ListItem, { children: _jsxs(Box, Object.assign({ sx: { width: 225 } }, { children: [_jsxs(Stack, Object.assign({ spacing: 2, direction: "row", sx: { mb: 2 }, alignItems: "center" }, { children: [_jsx(VolumeUpOutlinedIcon, {}), _jsx(Switch, { checked: speakerNCToggle, onChange: (e) => {
                                                        handleNCSpeakerChange(e.target.checked);
                                                    }, disabled: !ncExtensionInstalled })] })), speakerNCToggle && (_jsxs(Stack, { children: [_jsx(Typography, Object.assign({ id: "input-slider", variant: "h6", gutterBottom: true }, { children: translate('speakerSensitivity') })), _jsx(Slider, { sx: { width: 150 }, "aria-label": "Volume2", value: speakNCSlider, onChange: handleNCSpeakerSliderChange, min: 0, max: 1, step: 0.01, disabled: !ncExtensionInstalled })] }))] })) })] }))) : (_jsx("div", { children: " " }))] }), showHeadsetSettings && _jsxs(Box, Object.assign({ sx: settingStyles.headsetContainer }, { children: [_jsx(CcfTypography, Object.assign({ sx: settingStyles.headsetHeader }, { children: translate('jabraCallControl') })), _jsx(CcfTypography, Object.assign({ sx: settingStyles.headsetHeaderText }, { children: translate('jabraCallControlText') })), _jsxs(List, Object.assign({ component: 'div', role: 'presentation', subheader: _jsx(ListSubheader, Object.assign({ sx: Object.assign(Object.assign({}, settingStyles.addDeviceSubHeader), { fontWeight: '800' }) }, { children: translate('addDevices') })) }, { children: [_jsx(CcfTypography, Object.assign({ sx: settingStyles.addDeviceText }, { children: translate('addDevicesText') })), _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, settingStyles.addDeviceButton), settingStyles.focusedElement), onClick: () => headset.addDevice(), disableRipple: true }, { children: translate('addDevices') }))] })), _jsxs(List, Object.assign({ component: 'div', role: 'presentation', subheader: _jsx(ListSubheader, Object.assign({ sx: Object.assign(Object.assign({}, settingStyles.selectedDeviceSubHeader), { fontWeight: '800' }) }, { children: translate('selectedDevices') })) }, { children: [_jsx(CcfTypography, Object.assign({ sx: settingStyles.selectedDeviceText }, { children: translate('selectedDevicesText') })), _jsx(HeadsetDropdown, {})] }))] }))] })));
}
export default CcfVoiceSettings;
//# sourceMappingURL=ccf-voice-settings.js.map