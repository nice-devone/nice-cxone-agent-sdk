import { SxProps, Theme } from '@mui/material';
import { contactButtons } from '@nice-devone/common-sdk';
import React from 'react';
export interface CcfOutcomeButtonInterface {
    sx?: SxProps<Theme>;
    disabled?: boolean;
    dispositionType?: string;
    placement?: 'bottom' | 'left' | 'right' | 'top' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start' | undefined;
    isSmViewConference?: boolean;
    controlClicked?: (buttonName: contactButtons, event: React.MouseEvent) => void;
}
/**
 * CcfOutcomeButton - renders outcome button
 * @param props - CcfOutcomeButtonInterface
 * @example <CcfOutcomeButton />
 */
export declare const CcfOutcomeButton: ({ sx, disabled, placement, dispositionType, isSmViewConference, controlClicked }: CcfOutcomeButtonInterface) => JSX.Element;
