import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
/**
 * Create email header for print view
 * @param element - Element containing data attributes with email metadata
 * @param emailDiv - HTMLDivElement to append the header to
 * @param translateFn - Translation function to use for labels
 * @example createEmailHeader(element, emailDiv, translate)
 */
export declare const createEmailHeader: (element: Element, emailDiv: HTMLDivElement, translateFn: (input: CcfTranslationKey, extraArgs?: {
    format: (string | number)[];
}) => string) => void;
export interface CcfInteractionMenuProps {
    contactDetails: CXoneDigitalContact;
    activeContactCaseId: string;
    activeContactInteractionId: string;
    handleShowFingerPrintDetails: () => void;
}
/**
 * Component displays Kebab menu for interaction space
 * @returns Kebab menu for interaction space
 * ```
 * @example
 * <CcfInteractionMenu/>
 * ```
 */
export declare function CcfInteractionMenu(props: CcfInteractionMenuProps): JSX.Element;
export default CcfInteractionMenu;
