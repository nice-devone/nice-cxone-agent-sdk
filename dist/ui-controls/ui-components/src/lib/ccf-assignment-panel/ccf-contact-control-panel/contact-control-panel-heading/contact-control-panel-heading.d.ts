import { PopOverData } from '@nice-devone/ui-controls';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
export interface ContactControlPanelHeadingProps {
    contact: CXoneVoiceContact;
    headerText?: number | string;
    headerTextClassess?: string;
    popOverMenuItems: PopOverData;
    setPopOverMenuItems?: any;
    interactionType: string;
    onVoiceTranscriptToggle: () => void;
}
/**
 * Component display control panel Heading, it cosnist of common header and dropdown items
 * @param props - ContactControlPanelHeadingProps
 * ```
 * @example -
 * const headerText = 'Liam Davis'
 * const headerTextClassess = 'controlButtonHeaderText'
 * <ContactControlPanelHeading headerText={headerText} headerTextClassess={'controlButtonHeaderText'} contact={contact} />
 * ```
 */
export declare function ContactControlPanelHeading(props: ContactControlPanelHeadingProps): JSX.Element;
export default ContactControlPanelHeading;
