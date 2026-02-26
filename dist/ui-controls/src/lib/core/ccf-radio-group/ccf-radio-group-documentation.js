import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @example -
 * @returns
 */
export const CcfRadioGroupDocumentationComponent = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Ccf RadioGroup" }), _jsx("p", { children: "Ccf RadioGroup is a helpful wrapper used to group Radio components that provides an easier API, and proper keyboard accessibility to the group." }), _jsxs("p", { children: ["Props:-\uD83D\uDC47", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: "data: " }), " The set of radio options that you want to allow to be chosen from."] }), _jsxs("li", { children: [_jsx("code", { children: "name: " }), " The label to show at the top for the set of options."] }), _jsxs("li", { children: [_jsx("code", { children: "defaultValue:" }), " The default value of this radio buttons group."] }), _jsxs("li", { children: [_jsx("code", { children: "isStandaloneRadio:" }), " Radio can also be used standalone, without the RadioGroup wrapper."] }), _jsxs("li", { children: [_jsx("code", { children: "error:" }), " You can display an error if no value is selected when the form is submitted by setting error to true and using helperText."] }), _jsxs("li", { children: [_jsx("code", { children: "helperText:" }), " The text that can be displayed below the radion group for showing error message."] }), _jsxs("li", { children: [_jsx("code", { children: "horizontalAlign:" }), " To lay out the buttons horizontally, set the horizontalAlign prop."] }), _jsxs("li", { children: [_jsx("code", { children: "labelPlacement:" }), " You can change the placement of the label with the FormControlLabel component's labelPlacement prop."] }), _jsxs("li", { children: [_jsx("code", { children: "selected:" }), " Value of the selected radio button."] })] })] }), _jsx("p", { children: "Code usage example:-\uD83D\uDC47" }), _jsx("code", { children: _jsx("pre", Object.assign({ style: {
                        'fontFamily': 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
                        'background': ' #1b1b1b',
                        'lineHeight': '28px',
                        'borderRadius': '8px',
                        'color': '#f5d67b',
                    } }, { children: `       
        <CcfRadioGroup 
          data: [
            {
                id: '1',
                value: 'female',
                label: 'Female'
            },
            {
                id: '2',
                value: 'male',
                label: 'Male'
            },
            {
                id: '3',
                value: 'others',
                label: 'Others'
            },
        ],
         name: 'Gender'
        />
        ` })) })] }));
};
//# sourceMappingURL=ccf-radio-group-documentation.js.map