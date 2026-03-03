/**
 * Class for the CcfActionEditorMultiselectDropdown component.
 */
class Controller {
    constructor() {
        this.KEY_OF_DISPLAY_OPTION = '__multiselect_selected_tracker';
        /**
         * Function to handle logic for when the component is in single select mode.
         * @example handleOnChangeOfSelectForSingleSelect()
         */
        this.handleOnChangeOfSelectForSingleSelect = (selection, selected = [], handleChange) => {
            if (!handleChange) {
                return -1;
            }
            if (typeof handleChange !== 'function') {
                return -2;
            }
            const output = selected.includes(selection) ? [] : [selection];
            handleChange(output[0]);
            return 0;
        };
        /**
         * Function to handle logic for when the component is in multi select mode.
         * @example handleOnChangeOfSelectForMultiSelect()
         */
        this.handleOnChangeOfSelectForMultiSelect = (selections = [], value, options, selected = [], handleChange) => {
            if (!handleChange) {
                return -1;
            }
            if (typeof handleChange !== 'function') {
                return -2;
            }
            let items = [];
            const selection = selections[selections.length - 1];
            if (selections.includes('all')) {
                if (options.length === selected.length) {
                    items = [];
                }
                else {
                    items = options.map((option) => option[value]).filter(item => item);
                }
            }
            else {
                items = [...selected];
                if (selected.includes(selection)) {
                    items = items.filter((item) => item !== selection);
                }
                else {
                    items.push(selection);
                }
            }
            const output = [...items];
            handleChange(output);
            return 0;
        };
        /**
         * Function to determine which select mode function to execute.
         * @example onChangeOfSelect()
         */
        this.onChangeOfSelect = (event, value, singleSelect, options, selected, handleChange) => {
            var _a, _b;
            if (singleSelect) {
                this.handleOnChangeOfSelectForSingleSelect((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value, selected, handleChange);
            }
            else {
                this.handleOnChangeOfSelectForMultiSelect((_b = event === null || event === void 0 ? void 0 : event.target) === null || _b === void 0 ? void 0 : _b.value, value, options, selected, handleChange);
            }
        };
        /**
         * Function to handle logic for when the select component is opened.
         * @example onOpenOfSelect()
         */
        this.onOpenOfSelect = (handleOnOpen) => {
            if (!handleOnOpen) {
                return -1;
            }
            if (typeof handleOnOpen !== 'function') {
                return -2;
            }
            handleOnOpen();
            return 0;
        };
        /**
         * Function to set the selection count.
         * @example determineSelectionCount()
         */
        this.determineSelectionCount = (selected = []) => {
            if (selected.includes(this.KEY_OF_DISPLAY_OPTION)) {
                return selected.length - 1;
            }
            return selected.length;
        };
    }
}
export default new Controller();
//# sourceMappingURL=ccf-action-editor-multiselect-dropdown.controller.js.map