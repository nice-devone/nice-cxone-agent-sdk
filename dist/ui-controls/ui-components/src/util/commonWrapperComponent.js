import { jsx as _jsx } from "react/jsx-runtime";
/**
   * Function to parse the text field variable
   * @param decoratedHref -  template content with string key-value pairs
   * @param decoratedText -  element id
   * @param style -  style object
   * @example - linkDecorator(decoratedHref, decoratedText, style)
   */
export const linkDecorator = (decoratedHref, decoratedText, style) => {
    return (_jsx("a", Object.assign({ href: decoratedHref, target: "_blank", rel: "noreferrer", style: style ? style : {} }, { children: decoratedText })));
};
//# sourceMappingURL=commonWrapperComponent.js.map