import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CcfIconButton, CcfSwitchItem, CcfTooltip, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { Box, Grid, MenuItem, Select, useTheme, } from '@mui/material';
import CcfNotificationSettingsStyles from './ccf-notification-settings.styles';
import { NotificationSettings } from '@nice-devone/core-sdk';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { fetchAllNotificationSettings, getAVNotifications, NotificationType, playAudioForNotification, setAllNotificationSettings, storeNotificationSettings, } from './ccf-notification-settings.slice';
import { VolumeUp } from '@mui/icons-material';
import { updateClientDataSettings } from '../ccf-settings/ccf-full-settings.slice';
import { visuallyHidden } from '@mui/utils';
/**
 * @example ccfNotificaiotnSettings()
 * @returns
 */
export function CcfNotificationSettings() {
    const [selectedToneAnnouncement, setSelectedToneAnnouncement] = useState('');
    const dispatch = useDispatch();
    const avNotifications = useSelector(getAVNotifications);
    const theme = useTheme();
    const [translate] = useTranslator();
    const notificationSettingsStyles = CcfNotificationSettingsStyles(theme);
    const tones = [
        { id: 1, fileName: 'agent-message', name: translate('Tone') + ' 1' },
        { id: 2, fileName: 'new-contact', name: translate('Tone') + ' 2' },
        { id: 3, fileName: 'new-chat-message', name: translate('Tone') + ' 3' },
        { id: 4, fileName: 'end-contact', name: translate('Tone') + ' 4' },
        { id: 5, fileName: 'ziptone_03', name: translate('Tone') + ' 5' },
        { id: 6, fileName: 'ziptone_BambooBellArp', name: translate('Tone') + ' 6' },
        { id: 7, fileName: 'ziptone_disconnect01', name: translate('Tone') + ' 7' },
        { id: 8, fileName: 'ziptone_glassdancer3', name: translate('Tone') + ' 8' },
        { id: 9, fileName: 'ziptone_glock4', name: translate('Tone') + ' 9' },
        { id: 10, fileName: 'ziptone_quickClick', name: translate('Tone') + ' 10' }
    ];
    useEffect(() => {
        dispatch(fetchAllNotificationSettings());
    }, []);
    /**
     *
     * @param event - switch event
     * Callback fired when the state is changed.
     * @param checked - If `true`, the component appears selected.
     * @example handleChange
     *
     */
    const handleChange = (event, checked) => {
        const target = event.target;
        const updatedAVNotificationSettings = Object.assign(Object.assign({}, avNotifications), { [target.name]: checked });
        dispatch(storeNotificationSettings(updatedAVNotificationSettings));
        dispatch(setAllNotificationSettings(updatedAVNotificationSettings));
        dispatch(updateClientDataSettings({ avNotification: updatedAVNotificationSettings }));
    };
    /**
     *
     * @param event - switch event
     * Callback fired when the state is changed.
     * @param checked - If `true`, the component appears selected.
     * @example handleChange
     *
     */
    const handleToneChange = (event) => {
        var _a;
        const target = event.target;
        const updatedAVNotificationSettings = Object.assign(Object.assign({}, avNotifications), { [target.name]: target.value });
        const selectedTone = ((_a = tones.find((tone) => tone.fileName === target.value)) === null || _a === void 0 ? void 0 : _a.name) || '';
        let toneType = '';
        switch (target.name) {
            case NotificationSettings.AUDIO_AGENT_MESSAGE_TONE:
                toneType = translate('newAgentMessage');
                break;
            case NotificationSettings.AUDIO_NEW_CONTACT_TONE:
                toneType = translate('newContact');
                break;
            case NotificationSettings.AUIDO_NEW_CONTACT_REPLY_TONE:
                toneType = translate('newContactReply');
                break;
            case NotificationSettings.AUDIO_END_CONTACT_TONE:
                toneType = translate('endChatOrCall');
                break;
            default:
                toneType = translate('tone');
        }
        setSelectedToneAnnouncement(`${toneType} ${selectedTone}`);
        dispatch(storeNotificationSettings(updatedAVNotificationSettings));
        dispatch(setAllNotificationSettings(updatedAVNotificationSettings));
        dispatch(updateClientDataSettings({ avNotification: updatedAVNotificationSettings }));
    };
    const MenuProps = {
        PaperProps: {
            style: notificationSettingsStyles.selectMenu,
        },
    };
    return (_jsxs(Box, Object.assign({ sx: { flexGrow: 1 } }, { children: [_jsx(Box, Object.assign({ "aria-live": "polite", sx: visuallyHidden }, { children: selectedToneAnnouncement })), _jsxs(Grid, Object.assign({ container: true, px: 2, sx: { justifyContent: 'space-between' } }, { children: [_jsx(Grid, Object.assign({ item: true, xl: 6, pt: 2, style: notificationSettingsStyles.settingsGrid }, { children: _jsxs(Box, Object.assign({ role: "group", tabIndex: 0, "aria-label": translate('AudioNotifications') }, { children: [_jsx("div", Object.assign({ style: notificationSettingsStyles.header }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "h2", sx: notificationSettingsStyles.headerText }, { children: translate('AudioNotifications') })) }) })), _jsxs(Box, Object.assign({ sx: notificationSettingsStyles.toggle }, { children: [_jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.audioAgentMessage, name: NotificationSettings.AUDIO_AGENT_MESSAGE, text: "newAgentMessage", id: "newAgentMessage", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }), _jsx("div", Object.assign({ style: notificationSettingsStyles.tone }, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 150 } }, { children: [_jsx(InputLabel, Object.assign({ id: "tone-select-label" }, { children: translate('newAgentMessage') })), _jsx(Select, Object.assign({ labelId: "tone-select-label", id: "tone-select-label-id", value: avNotifications.audioAgentMessageTone, name: NotificationSettings.AUDIO_AGENT_MESSAGE_TONE, onChange: handleToneChange, style: notificationSettingsStyles.select, MenuProps: MenuProps, label: translate('newAgentMessage') }, { children: tones.map((tone) => (_jsx(MenuItem, Object.assign({ value: tone.fileName, "aria-label": tone.name, "aria-selected": avNotifications.audioAgentMessageTone === tone.fileName, sx: [notificationSettingsStyles.menuItem, notificationSettingsStyles.hoveredElement, notificationSettingsStyles.focusedElement] }, { children: tone.name }), tone.id))) }))] })) })), _jsx(CcfTooltip, Object.assign({ title: `${translate('play')} ${translate('newAgentMessage')} ${translate('tone')}`, arrow: true, disableInteractive: true }, { children: _jsx("span", { children: _jsx(CcfIconButton, Object.assign({ "aria-label": `${translate('play')} ${translate('newAgentMessage')} ${translate('tone')}`, onClick: () => playAudioForNotification(NotificationType.NEW_AGENT_MESSAGE, avNotifications.audioAgentMessageTone), disableRipple: true, sx: notificationSettingsStyles.focusedElement }, { children: _jsx(VolumeUp, {}) })) }) }))] })), _jsxs(Box, Object.assign({ sx: notificationSettingsStyles.toggle }, { children: [_jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.audioNewContact, name: NotificationSettings.AUDIO_NEW_CONTACT, text: "newContact", id: "newContact", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }), _jsx("div", Object.assign({ style: notificationSettingsStyles.tone }, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 150 } }, { children: [_jsx(InputLabel, Object.assign({ id: "new-contact-label" }, { children: translate('newContact') })), _jsx(Select, Object.assign({ labelId: "new-contact-label", id: "new-contacttone-select", value: avNotifications.audioNewContactTone, name: NotificationSettings.AUDIO_NEW_CONTACT_TONE, onChange: handleToneChange, style: notificationSettingsStyles.select, MenuProps: MenuProps, label: translate('newContact') }, { children: tones.map((tone) => (_jsx(MenuItem, Object.assign({ value: tone.fileName, "aria-label": `${translate('newContact')} ${tone.name}`, "aria-selected": avNotifications.audioNewContactTone === tone.fileName, sx: [notificationSettingsStyles.menuItem, notificationSettingsStyles.hoveredElement, notificationSettingsStyles.focusedElement] }, { children: tone.name }), tone.id))) }))] })) })), _jsx(CcfTooltip, Object.assign({ title: `${translate('play')} ${translate('newContact')} ${translate('tone')}`, arrow: true, disableInteractive: true }, { children: _jsx("span", { children: _jsx(CcfIconButton, Object.assign({ "aria-label": `${translate('play')} ${translate('newContact')} ${translate('tone')}`, onClick: () => playAudioForNotification(NotificationType.INCOMING_VOICE_INTERACTION, avNotifications.audioNewContactTone, false), disableRipple: true, sx: notificationSettingsStyles.focusedElement }, { children: _jsx(VolumeUp, {}) })) }) }))] })), _jsxs(Box, Object.assign({ sx: notificationSettingsStyles.toggle }, { children: [_jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.audioNewContactReply, name: NotificationSettings.AUIDO_NEW_CONTACT_REPLY, text: "newContactReply", id: "newContactReply", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }), _jsx("div", Object.assign({ style: notificationSettingsStyles.tone }, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 150 } }, { children: [_jsx(InputLabel, Object.assign({ id: "new-contact-reply-label" }, { children: translate('newContactReply') })), _jsx(Select, Object.assign({ labelId: "new-contact-reply-label", id: "new-contact-reply-tone-select", value: avNotifications.audioNewContactReplyTone, name: NotificationSettings.AUIDO_NEW_CONTACT_REPLY_TONE, onChange: handleToneChange, style: notificationSettingsStyles.select, MenuProps: MenuProps, label: translate('newContactReply') }, { children: tones.map((tone) => (_jsx(MenuItem, Object.assign({ value: tone.fileName, "aria-label": tone.name, "aria-selected": avNotifications.audioNewContactReplyTone === tone.fileName, sx: [notificationSettingsStyles.menuItem, notificationSettingsStyles.hoveredElement, notificationSettingsStyles.focusedElement] }, { children: tone.name }), tone.id))) }))] })) })), _jsx(CcfTooltip, Object.assign({ title: `${translate('play')} ${translate('newContactReply')} ${translate('tone')}`, arrow: true, disableInteractive: true }, { children: _jsx("span", { children: _jsx(CcfIconButton, Object.assign({ "aria-label": `${translate('play')} ${translate('newContactReply')} ${translate('tone')}`, onClick: () => playAudioForNotification(NotificationType.NEW_REPLY_DIGITAL_INTERACTION, avNotifications.audioNewContactReplyTone), disableRipple: true, sx: notificationSettingsStyles.focusedElement }, { children: _jsx(VolumeUp, {}) })) }) }))] })), _jsxs(Box, Object.assign({ sx: notificationSettingsStyles.toggle }, { children: [_jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.audioEndContact, name: NotificationSettings.AUDIO_END_CONTACT, id: "endChatOrCall", text: "endChatOrCall", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }), _jsx("div", Object.assign({ style: notificationSettingsStyles.tone }, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 150 } }, { children: [_jsx(InputLabel, Object.assign({ id: "end-contact-tone-select-label" }, { children: translate('endChatOrCall') })), _jsx(Select, Object.assign({ labelId: "end-contact-tone-select-label", id: "end-contact-tone-select", value: avNotifications.audioEndContactTone, name: NotificationSettings.AUDIO_END_CONTACT_TONE, onChange: handleToneChange, style: notificationSettingsStyles.select, MenuProps: MenuProps, label: translate('endChatOrCall') }, { children: tones.map((tone) => (_jsx(MenuItem, Object.assign({ value: tone.fileName, "aria-label": `${translate('endChatOrCall')} ${tone.name}`, "aria-selected": avNotifications.audioEndContactTone === tone.fileName, sx: [notificationSettingsStyles.menuItem, notificationSettingsStyles.hoveredElement, notificationSettingsStyles.focusedElement] }, { children: tone.name }), tone.id))) }))] })) })), _jsx(CcfTooltip, Object.assign({ title: `${translate('play')} ${translate('endChatOrCall')} ${translate('tone')}`, arrow: true, disableInteractive: true }, { children: _jsx("span", { children: _jsx(CcfIconButton, Object.assign({ "aria-label": `${translate('play')} ${translate('endChatOrCall')} ${translate('tone')}`, id: "audioEndContactToneIcon", onClick: () => {
                                                        playAudioForNotification(NotificationType.END_INTERACTION, avNotifications.audioEndContactTone);
                                                    }, disableRipple: true, sx: notificationSettingsStyles.focusedElement }, { children: _jsx(VolumeUp, {}) })) }) }))] }))] })) })), _jsx(Grid, Object.assign({ item: true, xl: 6, pt: 2, style: notificationSettingsStyles.settingsGrid }, { children: _jsxs(Box, Object.assign({ role: "group", tabIndex: 0, "aria-label": translate('VisualNotifications') }, { children: [_jsx("div", Object.assign({ style: notificationSettingsStyles.header }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "h2", sx: notificationSettingsStyles.headerText }, { children: translate('VisualNotifications') })) }) })), _jsx(Box, Object.assign({ sx: notificationSettingsStyles.voicetoggle }, { children: _jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.visualAgentMessage, name: NotificationSettings.VISUAL_AGENT_MESSAGE, id: "VisualNotifications-newAgentMessage", text: "newAgentMessage", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }) })), _jsx(Box, Object.assign({ sx: notificationSettingsStyles.voicetoggle }, { children: _jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.visualNewContact, name: NotificationSettings.VISUAL_NEW_CONTACT, id: "VisualNotifications-newContact", text: "newContact", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }) })), _jsx(Box, Object.assign({ sx: notificationSettingsStyles.voicetoggle }, { children: _jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.visualNewContactReply, name: NotificationSettings.VISUAL_NEW_CONTACT_REPLY, id: "VisualNotifications-newContactReply", text: "newContactReply", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }) })), _jsx(Box, Object.assign({ sx: notificationSettingsStyles.voicetoggle }, { children: _jsx(CcfSwitchItem, { handleChange: handleChange, hideLessThanExtraLarge: false, isChecked: avNotifications.visualEndContact, name: NotificationSettings.VISUAL_END_CONTACT, id: "VisualNotifications-endChatOrCall", text: "endChatOrCall", listStyles: notificationSettingsStyles.listStyle, labelStyles: notificationSettingsStyles.labelStyle }) }))] })) }))] }))] })));
}
export default CcfNotificationSettings;
//# sourceMappingURL=ccf-notification-settings.js.map