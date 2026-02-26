import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, useTheme } from '@mui/material';
import { CcfCallHoldIcon, CcfResumeIcon, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
/**
 * Function render the button to hold or resume a contact
 * @param contact - voice contact
 * @example <CcfHoldResumeButton />
 * @returns
 */
export default function CcfHoldResumeButton({ contact, onClick, sx, disabled }) {
    const [translate] = useTranslator();
    const theme = useTheme();
    const isHolding = contact.status.toLowerCase() === VoiceContactStatus.HOLDING;
    const labelText = isHolding ? 'resume' : 'hold';
    return (_jsx(CcfTooltip, Object.assign({ title: labelText, translationKey: labelText, arrow: true }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate(labelText), color: "secondary", size: "small", sx: sx, disabled: disabled, onClick: () => { onClick(); } }, { children: isHolding ? _jsx(CcfResumeIcon, { fillColor: theme.palette.background.callControls }) : _jsx(CcfCallHoldIcon, {}) })) })));
}
//# sourceMappingURL=ccf-hold-resume-button.js.map