import { ContactData } from '@nice-devone/common-sdk';
export interface CcfVoiceContactProps {
    elevatedFrom?: string;
    contact: ContactData;
}
/**
 * Component to display contact control panel
 * ```
 * @example-
 * <CcfVoiceContact />
 * ```
 */
export declare function CcfVoiceContact({ contact, elevatedFrom }: CcfVoiceContactProps): JSX.Element;
export default CcfVoiceContact;
