import { CXoneDigitalTranslationLanguages } from '@nice-devone/common-sdk';
export interface CcfTranslationSettingsProps {
    anchorEl: HTMLElement | null;
    caseId: string;
    interactionId: string;
    isTranslationSettingsOpen: boolean;
    handleClose: () => void;
    availableLanguages: CXoneDigitalTranslationLanguages;
}
/**
 * Component displays translation settings form for digital case
 * @returns Popover menu item for interaction space
 * ```
 * @example
 * <CcfTranslationSettings/>
 * ```
 */
export default function CcfTranslationSettings({ anchorEl, caseId, interactionId, isTranslationSettingsOpen, handleClose, availableLanguages, }: CcfTranslationSettingsProps): JSX.Element;
