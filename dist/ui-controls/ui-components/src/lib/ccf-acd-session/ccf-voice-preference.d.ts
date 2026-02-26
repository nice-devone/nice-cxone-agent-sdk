/// <reference types="react" />
import { Theme } from '@mui/material';
import { UseLocationOptionHook } from './ccf-location-option/ccf-location-option-hook';
/**
 * Component used for ccf voice preference
 * @param props - ccfAcdSessionProps
 * @example <ccfAcdSession />
 * @returns
 */
interface CcfVoicePreferenceProps {
    theme: Theme;
    radioButtonState: {
        data: Array<{
            showRadioOption: boolean;
            value: string;
            label: string;
        }>;
        defaultSelected: string;
    };
    isLocationFTEnabled: boolean | string;
    voiceConnection: string;
    showSpinner: boolean | undefined;
    stationOptionsChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputBoxState: {
        enteredVoicePrefInput: string;
    } | undefined;
    inputNumberChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sessionResponseState: {
        sessionStatusCode: string | number;
        sessionErrorDescription: string;
        sessionStatusText: string;
    };
    validationError: {
        status: boolean;
        message?: string | '';
    };
    rememberSetting: boolean;
    setRememberSetting: (value: boolean) => void;
    buttonState: {
        buttonDisabled: boolean;
    };
    launchBtnClickHandler: (e: React.SyntheticEvent) => void;
    useLocationOptionHook?: UseLocationOptionHook;
}
/**
 * Acd session component
 * @param isLocationFTEnabled - boolean value to check if location feature toggle is enabled
 * @param authError - boolean value to check if there is any authentication error
 * @returns  CcfAcdSession component
 * @example
 * ```
 * <CcfAcdSession isLocationFTEnabled={true} authError={true} />
 * ```
 */
export declare function CcfVoicePreference({ theme, isLocationFTEnabled, radioButtonState, voiceConnection, showSpinner, stationOptionsChangeHandler, inputBoxState, inputNumberChangeHandler, sessionResponseState, validationError, rememberSetting, setRememberSetting, buttonState, launchBtnClickHandler, useLocationOptionHook, }: CcfVoicePreferenceProps): JSX.Element;
export default CcfVoicePreference;
