import { SxProps, Theme } from '@mui/material';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
/**
 * Function render the button to hold or resume a contact
 * @param contact - voice contact
 * @example <CcfHoldResumeButton />
 * @returns
 */
export default function CcfHoldResumeButton({ contact, onClick, sx, disabled }: {
    contact: CXoneVoiceContact;
    onClick: () => void;
    sx?: SxProps<Theme>;
    disabled: boolean;
}): JSX.Element;
