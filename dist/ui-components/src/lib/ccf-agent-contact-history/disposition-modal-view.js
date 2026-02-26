import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button, Chip, IconButton, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { MediaType } from '@nice-devone/common-sdk';
import { CreateDispositionModalStyles } from '@nice-devone/ui-components/src/lib/ccf-agent-contact-history/disposition-modal.styles';
/**
 * DispositionModalView - Presentational component for disposition modal.
 *
 * @param props - DispositionModalViewProps
 * @example
 * ```tsx
 * <DispositionModalView
 *   modalData={{
 *     contactId: '123',
 *     contactName: 'John Doe',
 *     skill: 'Support',
 *     statusUpdatedDateTime: '2025-12-10T10:00:00Z',
 *     interactionDuration: '00:05:12',
 *     tags: ['VIP', 'Callback'],
 *     mediaType: MediaType.VOICE,
 *   } as unknown as AgentContactHistory}
 *   handleClose={() => {}}
 *   channelIcon={<span aria-hidden="true" />}
 *   disposition='Resolved'
 *   dispositionNotes='Customer was satisfied.'
 *   skill={true}
 *   skillDropdownComponent={null}
 *   buttonLabel='callback'
 *   selectSkillWarning={false}
 *   outboundSkill={[{ skillId: 1, skillName: 'Support' }]}
 *   voiceCall={() => {}}
 * />
 * ```
 */
export const DispositionModalView = ({ modalData, handleClose, channelIcon, disposition, dispositionNotes, skill, skillDropdownComponent, buttonLabel, selectSkillWarning, outboundSkill, voiceCall, }) => {
    const theme = useTheme();
    const styles = CreateDispositionModalStyles(theme);
    const [translate] = useTranslator();
    return (_jsx(Modal, Object.assign({ open: Boolean(modalData), onClose: handleClose }, { children: _jsxs(Box, Object.assign({ role: "dialog", "aria-label": translate('contactHistory'), sx: styles.modalContainer }, { children: [_jsxs(Box, Object.assign({ sx: styles.modalContentContainer }, { children: [_jsxs(Box, Object.assign({ sx: styles.modalContent }, { children: [_jsx(Box, { children: _jsx(Typography, Object.assign({ sx: styles.contactName }, { children: modalData.contactName })) }), _jsxs(Box, Object.assign({ sx: styles.skillAndDateRow }, { children: [_jsxs(Box, Object.assign({ sx: styles.skillContainer }, { children: [channelIcon, _jsx(Typography, Object.assign({ sx: styles.skillText }, { children: modalData.skill }))] })), _jsx(Typography, Object.assign({ sx: styles.interactionDate }, { children: modalData.statusUpdatedDateTime }))] })), _jsxs(Box, Object.assign({ sx: styles.dispositionAndDurationRow }, { children: [disposition && (_jsxs(Box, Object.assign({ sx: styles.dispositionContainer }, { children: [_jsxs(Typography, Object.assign({ sx: styles.dispositionTitle }, { children: [translate('disposition'), ":"] })), _jsx(Typography, Object.assign({ sx: styles.dispositionStatus }, { children: disposition }))] }))), (modalData === null || modalData === void 0 ? void 0 : modalData.mediaType) === MediaType.VOICE && (_jsxs(Box, Object.assign({ sx: styles.durationContainer }, { children: [_jsxs(Typography, Object.assign({ sx: styles.dispositionTitle }, { children: [translate('duration'), ":"] })), _jsx(Typography, Object.assign({ sx: styles.interactionDuration }, { children: modalData.interactionDuration }))] })))] })), dispositionNotes && (_jsxs(Box, Object.assign({ sx: styles.scroll }, { children: [_jsxs(Typography, Object.assign({ sx: styles.dispositionNotesTitle }, { children: [translate('dispositionNotes'), ":"] })), _jsx(Typography, Object.assign({ sx: styles.dispositionNotesText }, { children: dispositionNotes }))] }))), modalData.tags && (_jsxs(Box, { children: [_jsxs(Typography, Object.assign({ sx: styles.dispositionNotesTitle }, { children: [translate('tags'), ":"] })), _jsx(Box, Object.assign({ sx: styles.dispositionTagsContainer }, { children: modalData.tags.map((tag) => (_jsx(Chip, { sx: styles.dispositionTags, label: tag, color: "primary", size: "small" }, tag))) }))] })), skill && skillDropdownComponent && (_jsxs(Box, { children: [_jsxs(Typography, Object.assign({ sx: styles.dispositionNotesTitle }, { children: [translate('skillSelect'), ":"] })), _jsx(Box, Object.assign({ sx: styles.dispositionTagsContainer }, { children: skillDropdownComponent }))] }))] })), _jsx(Box, Object.assign({ sx: styles.closeButtonColumn }, { children: _jsx(IconButton, Object.assign({ "aria-label": "close", onClick: () => handleClose() }, { children: _jsx(CloseIcon, { fontSize: "small", sx: styles.closeButton }) })) }))] })), _jsxs(Box, Object.assign({ sx: styles.buttonsContainer }, { children: [_jsx(Button, Object.assign({ variant: "outlined", sx: styles.button, onClick: () => handleClose(), disableRipple: true, "aria-label": "cancel" }, { children: _jsx(Typography, Object.assign({ fontSize: 'inherit' }, { children: translate('cancel') })) })), buttonLabel && (_jsx(CcfTooltip, Object.assign({ placement: 'top', arrow: true, title: outboundSkill.length < 1 && buttonLabel === 'callback' ? translate('noSkillsAvailable') : '' }, { children: _jsx("span", Object.assign({ style: { marginLeft: '12px' } }, { children: _jsx(Button, Object.assign({ disabled: (outboundSkill.length < 1 && buttonLabel === 'callback') || selectSkillWarning, variant: "contained", sx: styles.button, onClick: voiceCall }, { children: _jsx(Typography, Object.assign({ fontSize: 'inherit' }, { children: translate(buttonLabel) })) })) })) })))] }))] })) })));
};
//# sourceMappingURL=disposition-modal-view.js.map