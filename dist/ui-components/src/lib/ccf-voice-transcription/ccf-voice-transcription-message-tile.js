import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Paper, Box, Stack, Typography, useTheme } from '@mui/material';
import { formatTimestamp } from '@nice-devone/common-sdk';
import { CcfAvatar } from '@nice-devone/ui-controls';
import React from 'react';
import { useDefaultVoiceTranscriptionMessageTile } from './ccf-voice-transcription-message-tile-hook';
/**
 * Renders a message tile for a voice transcription utterance.
 * @param props - CcfVoiceTranscriptionMessageTileProps
 * @example
 * ```tsx
 * <CcfVoiceTranscriptionMessageTile utterance={utterance} contact={contact} />
 * ```
 * @returns
 */
export const CcfVoiceTranscriptionMessageTile = React.forwardRef(({ utterance, contact, useVoiceTranscriptionMessageTileHook }, ref) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const isAgent = utterance.data.participantId.toLowerCase() === 'agent';
    const theme = useTheme();
    // Only one hook runs — never both
    const { userInfo } = (useVoiceTranscriptionMessageTileHook !== null && useVoiceTranscriptionMessageTileHook !== void 0 ? useVoiceTranscriptionMessageTileHook : useDefaultVoiceTranscriptionMessageTile)();
    const agentFirstName = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.firstName) || 'You';
    const agentLastName = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.lastName) || '';
    /**
     * Gets the initials of a user from their full name.
     * @param name - The full name of the user.
     * @returns The initials of the user.
     * @example getInitials("John Doe")
     */
    const getInitials = (name) => {
        if (!name)
            return '';
        const nameParts = name.trim().split(/\s+/);
        if (nameParts.length === 1) {
            // Single name, return the first character
            return nameParts[0].charAt(0).toUpperCase();
        }
        // Multiple names, return the first character of the first and last names
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    };
    /**
     * Displays the formatted name of the speaker based on whether they are an agent or a customer.
     * @returns The formatted name of the speaker.
     * @example displayName()
     */
    const displayName = () => {
        let name = '';
        if (isAgent) {
            name = `${agentFirstName} ${agentLastName}`;
        }
        else if (contact === null || contact === void 0 ? void 0 : contact.customerName) {
            name = contact.customerName;
        }
        else if (!(contact === null || contact === void 0 ? void 0 : contact.customerName)) {
            name = contact.isInbound ? contact.ani : contact.dnis;
        }
        return name;
    };
    /**
     * Displays the avatar initials based on whether the speaker is an agent or a customer.
     * @returns The initials to be displayed in the avatar.
     * @example displayAvatar()
    */
    const displayAvatar = () => {
        let avatarInitials = '';
        if (isAgent) {
            avatarInitials = getInitials(`${agentFirstName} ${agentLastName}`);
        }
        else if (contact === null || contact === void 0 ? void 0 : contact.customerName) {
            avatarInitials = getInitials(contact.customerName);
        }
        return avatarInitials;
    };
    return (_jsxs(Paper, Object.assign({ elevation: 0, ref: ref, sx: { p: 1, display: 'flex', gap: 1 } }, { children: [_jsx(CcfAvatar, Object.assign({ "aria-label": utterance.data.participantId, sx: {
                    width: 25,
                    height: 25,
                    fontSize: 12,
                    backgroundColor: isAgent ? (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background.checkboxHover : (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.avatarBackground,
                    color: isAgent ? (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.obAvatar : (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.ibAvatar,
                } }, { children: displayAvatar() })), _jsxs(Box, { children: [_jsxs(Stack, Object.assign({ direction: "row", spacing: 1, alignItems: "center" }, { children: [_jsx(Typography, Object.assign({ variant: "subtitle2", fontWeight: 600 }, { children: displayName() })), _jsx(Typography, Object.assign({ variant: "body2", color: theme.palette.text.header, sx: { marginLeft: '12px' } }, { children: formatTimestamp('en-US', utterance.data.createdtimestamp) }))] })), _jsx(Typography, Object.assign({ variant: "body2", color: theme.palette.text.contrastText }, { children: (_h = utterance === null || utterance === void 0 ? void 0 : utterance.data) === null || _h === void 0 ? void 0 : _h.messageBody }))] })] })));
});
//# sourceMappingURL=ccf-voice-transcription-message-tile.js.map