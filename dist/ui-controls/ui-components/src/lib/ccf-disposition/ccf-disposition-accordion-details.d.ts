import { MediaType, ContactData } from '@nice-devone/common-sdk';
export interface CcfDispositionInteractionAccordionDetailsProps {
    clickedResolved: boolean;
    contactMedia: Exclude<MediaType, MediaType.EMAIL> | undefined;
    activeContact?: ContactData;
    onClickSaveButton: () => void;
    isSaveDisabled: boolean;
    isDisplayRedialPanel?: boolean;
    setIsDisplayRedialPanel: (isDisplayRedialPanel: boolean) => void;
    selectedOBSkill: number;
    setSelectedOBSkill: (skill: number) => void;
}
/**
 * Component displays accordion details for disposition
 * @param props -CcfDispositionInteractionAccordionDetailsProps
 * @returns displays accordion details for disposition
 * @example <CcfDispositionAccordionDetails/>
 */
export declare function CcfDispositionAccordionDetails({ clickedResolved, contactMedia, activeContact, onClickSaveButton, isSaveDisabled, isDisplayRedialPanel, setIsDisplayRedialPanel, selectedOBSkill, setSelectedOBSkill, }: CcfDispositionInteractionAccordionDetailsProps): JSX.Element;
export default CcfDispositionAccordionDetails;
