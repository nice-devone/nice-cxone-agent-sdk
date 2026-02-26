import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from 'react';
import { translations, } from '@nice-devone/i18n';
export const TranslatorContext = React.createContext(translations);
/**
 * Returns Translator Context with provided translations value.
 *
 * @remarks
 * This method is part of the react-ui-controls.
 *
 * @param translations - translation configuration.
 * @param children - React Node Elements.
 * @example <CcfTranslatorProvider />
 * @returns Translator Context Provider with provided translations configurations.
 *
 */
export function CcfTranslatorProvider(props) {
    return (_jsx(TranslatorContext.Provider, Object.assign({ value: props.translations }, { children: props.children })));
}
/**
 * Returns Translated Text for Provided Input Text.
 *
 * @remarks
 * This method is part of the react-ui-controls.
 *
 * @param inputText - Text to be Translated.
 * @example useTranslator()
 * @returns Translated Text for Provided Input Text.
 *
 */
export function useTranslator() {
    const { text, locale } = useContext(TranslatorContext);
    /**
     *
     * @param input - CcfTranslationKey
     * @param extraArgs - any
     * @example
     * @returns
     */
    const translate = (input, extraArgs) => {
        let translatedText = text[input];
        if (extraArgs) {
            for (let i = 0; i < extraArgs.format.length; i++) {
                const regexp = new RegExp('\\{x\\}', 'i');
                translatedText = translatedText.replace(regexp, extraArgs.format[i].toLocaleString(locale));
            }
        }
        return translatedText;
    };
    return [translate];
}
/**
 * Returns Higher Order Component for Provided Wrapper Component with Translated Text.
 *
 * @remarks
 * This method is part of the react-ui-controls.
 *
 * @param WrapperComponent - Component whose child text elements to be translated to provided locale.
 * @example withTranslation
 * @returns HOC with Translated Text for provided Wrapper Component.
 *
 */
export function withTranslation(WrapperComponent) {
    /**
    *
    * @param param0 - CcfTranslatorProps
    * @example - TranslatedComponent
    * @returns
    */
    const TranslatedComponent = (_a) => {
        var { translationKey, extraArgs, children } = _a, rest = __rest(_a, ["translationKey", "extraArgs", "children"]);
        const { text, locale } = React.useContext(TranslatorContext);
        /**
         *
         * @param input - CcfTranslationKey
         * @example translator()
         * @returns
         */
        const translator = (input) => {
            let translatedText = text[input] || input;
            if (extraArgs) {
                for (let i = 0; i < extraArgs.format.length; i++) {
                    const regexp = new RegExp('\\{x\\}', 'i');
                    translatedText = translatedText.replace(regexp, extraArgs.format[i].toLocaleString(locale));
                }
            }
            return translatedText;
        };
        return (_jsx(WrapperComponent, Object.assign({}, rest, { translator: translator, locale: locale, translationKey: translationKey, children: children })));
    };
    return TranslatedComponent;
}
//# sourceMappingURL=ccf-translator.js.map