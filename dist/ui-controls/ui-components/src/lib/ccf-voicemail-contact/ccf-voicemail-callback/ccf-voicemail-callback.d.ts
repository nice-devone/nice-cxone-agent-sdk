import { SxProps, Theme } from '@mui/material';
import React from 'react';
/**
   * CcfVoicemailCallbackPopoverProps is a interface for CcfVoiceMailCallbackPopover props
   */
export interface CcfVoicemailCallbackPopoverProps {
    /** Icon component for the popover */
    iconComponent: React.ReactNode;
    sx?: SxProps<Theme>;
}
/**
   * CcfVoiceMailCallbackPopover used to display voicemail callback UI
   * @param iconComponent - CcfVoicemailCallbackPopoverProps
   *
   * @example <CcfVoiceMailCallbackPopover/>
   */
export declare const CcfVoiceMailCallbackPopover: ({ iconComponent, sx, }: CcfVoicemailCallbackPopoverProps) => JSX.Element;
export default CcfVoiceMailCallbackPopover;
