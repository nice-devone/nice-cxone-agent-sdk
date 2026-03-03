import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, useTheme, FormControl } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CcfDialButton from '../ccf-dial-button/ccf-dial-button';
import { CcfDialButtonData } from './ccf-dial-button-data';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { CcfTextField } from '../../core/ccf-textfield/ccf-textfield';
import { CcfBackIcon } from '../../icons/ccf-back-icon/ccf-back-icon';
import dialPadStyles from './ccf-dialpad.styles';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
/**
 * Component used to display keypad
 * @param props - CcfDialPadProps
 * @example <CcfDialPad />
 * @returns keypad with inputfield
 */
export const CcfDialPad = (props) => {
    const theme = useTheme();
    const styles = dialPadStyles(theme);
    const [translate] = useTranslator();
    const [dialKey, setDialKey] = useState('');
    const [dialPadError, setDialPadError] = useState(false);
    const AudioContext = window.AudioContext;
    const dialpadInputRef = useRef(null);
    const [isDialKeyClicked, setIsDialKeyClicked] = useState(false);
    /**
     * method called to play dtmf tones in dial pad
     * @example playDtmfDialTone()
     */
    const playDtmfDialTone = (duration = 350, frequency = 440, volume = .25, type = 'sine') => {
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.value = volume;
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration / 1000);
    };
    /**
     * handleDialKeyChange method called on entering dial keys
     * @param props - number
     * @example
     */
    const handleDialKeyChange = (keyValue, event) => {
        event.stopPropagation();
        setIsDialKeyClicked(event.type === 'click' ? true : false);
        if (keyValue && Number(keyValue) >= 0 || keyValue === '#' || keyValue === '*') {
            setDialKey(dialKey + keyValue);
            playDtmfDialTone();
            setDialPadError(false);
            props.onDialKeyChange && props.onDialKeyChange(keyValue);
        }
        else {
            setDialPadError(true);
        }
    };
    /**
     * handleKeyDown method called on entering dial keys
     * @param props - number
     * @example
     */
    const handleKeyDown = (keyValue) => {
        if (keyValue === 'Backspace') {
            setDialKey(dialKey.slice(0, dialKey.length - 1));
        }
    };
    /**
     * method called on cancel click
     *
     * @example
     * @returns set dial key to empty
     */
    const onCancelClick = (event) => {
        event.stopPropagation();
        setDialKey('');
    };
    /**
     * method called to render the dial pad
     * @param props - CcfDialButtonData.buttons
     * @example
     * @returns keypad with inputfield
     */
    const renderDialButtons = () => {
        const buttons = CcfDialButtonData.buttons;
        const dialButtons = [];
        (buttons || []).map((button, i) => dialButtons.push(_jsx(CcfDialButton, Object.assign({ "aria-label": translate('dialer') }, button, { onButtonClick: (e) => handleDialKeyChange(button.keyDial.toString(), e), keyIndex: i }))));
        return dialButtons;
    };
    useEffect(() => {
        var _a, _b;
        if (isDialKeyClicked && ((_a = dialpadInputRef === null || dialpadInputRef === void 0 ? void 0 : dialpadInputRef.current) === null || _a === void 0 ? void 0 : _a.scrollWidth)) {
            dialpadInputRef.current.scrollLeft = (_b = dialpadInputRef === null || dialpadInputRef === void 0 ? void 0 : dialpadInputRef.current) === null || _b === void 0 ? void 0 : _b.scrollWidth;
        }
    }, [dialKey]);
    useEffect(() => {
        var _a;
        (_a = dialpadInputRef === null || dialpadInputRef === void 0 ? void 0 : dialpadInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: styles.dialPadContainer }, { children: [!props.isSmView && (_jsx(CcfTooltip, Object.assign({ title: translate('goBack'), disableInteractive: true, arrow: true }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('goBack'), sx: styles.backIconButton, onClick: props.handleBackIconClick, "data-testid": "back-icon" }, { children: _jsx(CcfBackIcon, { sx: styles.backIcon }) })) }))), _jsx(FormControl, Object.assign({ variant: "outlined", sx: styles.textFieldContainer }, { children: _jsx(CcfTextField, { id: "keyValue", size: "small", variant: "outlined", error: dialPadError, helperText: dialPadError ? `${translate('error')}: ${translate('validNumberErrorMessage')}` : '', value: dialKey || '', inputProps: {
                                'data-testid': 'form-field-keyValue',
                                'aria-label': `${translate('dialpadInputLabel')}`,
                                'placeholder': translate('dialpadInputPlaceholder'),
                                ref: dialpadInputRef,
                                sx: styles.alignRight,
                            }, onClick: (e) => e.stopPropagation(), onKeyPress: (event) => {
                                handleDialKeyChange(event.key, event);
                            }, onKeyDown: (event) => {
                                handleKeyDown(event.key);
                            }, sx: styles.inputFieldError, InputProps: {
                                endAdornment: dialKey && (_jsx(InputAdornment, Object.assign({ position: "end" }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('cancel'), disableInteractive: true, arrow: true }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('cancel'), sx: styles.cancelIcon, tabIndex: 0, onClick: (e) => onCancelClick(e) }, { children: _jsx(CancelIcon, { "data-testid": "cross-icon" }) })) })) }))),
                            } }) }))] })), _jsx(Box, Object.assign({ sx: props.isSmView ? styles.dialKeyPadSmViewContainer : styles.dialKeyPadContainer }, { children: renderDialButtons() }))] }));
};
export default CcfDialPad;
//# sourceMappingURL=ccf-dialpad.js.map