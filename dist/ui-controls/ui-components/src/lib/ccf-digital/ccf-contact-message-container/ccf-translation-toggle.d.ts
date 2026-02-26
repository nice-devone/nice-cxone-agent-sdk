interface CcfTranslationToggleProps {
    customerLanguage: string;
    fallbackText: string;
    handleTranslationToggle: () => void;
    isInboundDirection: boolean;
    isPublicPost: boolean;
    isRichText: boolean;
    isUnsupportedText: boolean;
    messageText: string;
    showTranslation: boolean;
    isFormTypeRichMessage: boolean;
}
/**
 * renders the translation toggle row
 * @param props - CcfTranslationToggle
 * @example <CcfTranslationToggle />
 * @returns
 */
export default function CcfTranslationToggle({ handleTranslationToggle, fallbackText, messageText, customerLanguage, showTranslation, isRichText, isUnsupportedText, isFormTypeRichMessage, isInboundDirection, isPublicPost, }: CcfTranslationToggleProps): JSX.Element;
export {};
