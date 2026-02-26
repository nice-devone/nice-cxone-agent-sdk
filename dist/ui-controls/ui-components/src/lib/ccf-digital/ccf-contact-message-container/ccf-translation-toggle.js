import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Divider, Link, Stack, useTheme } from '@mui/material';
import { Translate as TranslateIcon, Circle as CircleIcon } from '@mui/icons-material';
import { useTranslator } from '@nice-devone/ui-controls';
/**
 * renders the translation toggle row
 * @param props - CcfTranslationToggle
 * @example <CcfTranslationToggle />
 * @returns
 */
export default function CcfTranslationToggle({ handleTranslationToggle, fallbackText, messageText, customerLanguage, showTranslation, isRichText, isUnsupportedText, isFormTypeRichMessage, isInboundDirection, isPublicPost, }) {
    const theme = useTheme();
    const [translate] = useTranslator();
    const color = isPublicPost ? theme.palette.text.header : 'inherit';
    const seeTranslationLinkText = isInboundDirection ? translate('seeOriginal') : translate('seeTranslation');
    const hideTranslationLinkText = isInboundDirection ? translate('hideOriginal') : translate('hideTranslation');
    const toggleTranslateLinkText = showTranslation ? hideTranslationLinkText : seeTranslationLinkText;
    return (_jsxs(Stack, Object.assign({ sx: { color, marginTop: isPublicPost ? '.25em' : '.5em' } }, { children: [showTranslation && (_jsxs(Stack, Object.assign({ direction: "row", sx: { marginBottom: '.5em' } }, { children: [_jsx(Divider, { sx: {
                            borderColor: color,
                            height: 'auto',
                            borderWidth: '2px',
                            borderRadius: '20px 0px 0px 20px',
                        } }), _jsx(Box, Object.assign({ sx: { paddingLeft: '.5em' } }, { children: (isRichText && !isFormTypeRichMessage) || isUnsupportedText ? (_jsx("span", { children: fallbackText })) : (_jsx("span", { children: messageText })) }))] }))), _jsxs(Stack, Object.assign({ alignItems: "center", direction: "row", fontSize: '.875em' }, { children: [_jsx(TranslateIcon, { sx: { fontSize: '1.35em', marginRight: 0.5 } }), _jsx(Link, Object.assign({ color: color, sx: { cursor: 'pointer' }, onClick: () => handleTranslationToggle() }, { children: toggleTranslateLinkText })), _jsx(CircleIcon, { sx: { fontSize: '.5em', marginX: '1em' } }), _jsx("span", { children: customerLanguage })] }))] })));
}
//# sourceMappingURL=ccf-translation-toggle.js.map