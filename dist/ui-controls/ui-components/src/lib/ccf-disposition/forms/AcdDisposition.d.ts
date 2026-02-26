/// <reference types="react" />
import { CXoneDisposition, CXoneTag } from '@nice-devone/common-sdk';
import { AcdDispositionForm } from '../ccf-disposition-slice';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
interface AcdDispositionProps {
    contactId: string;
    formData: AcdDispositionForm;
    handleChange: (event: React.SyntheticEvent<Element, Event>, field: string, value?: CXoneDisposition | CXoneTag[]) => void;
    isResolved: boolean;
    voiceContact: CXoneVoiceContact;
}
/**
 * Component displays Acd Disposition
 * @param props -CcfDispositionInteractionAccordionDetailsProps
 * @returns displays accordion details for disposition
 * @example <CcfDispositionInteractionAccordionDetails/>
 */
declare const AcdDisposition: ({ contactId, formData, handleChange, isResolved, voiceContact }: AcdDispositionProps) => JSX.Element;
export default AcdDisposition;
