/**
 * Interface for InputMenu props
 */
export interface CcfInputMenuProps {
    /**
     * @remarks option for input menu
    */
    options?: string[];
    /**
     * @remarks styles object for input element
     */
    inputStyles?: object;
    /**
     * @remarks value for the input element
     */
    inputValue: string;
    /**
     * @remarks method to handle the onchange event of input element
     */
    handleInputChange: (value: string) => void;
    /**
     * @remarks method to handle the selection of option from the input menu
     */
    handleOptionSelection: (option: string, cursorPosition: number) => void;
    /**
     *
     * @remarks method to clear the input element
     */
    handleInputClear: () => void;
    /**
     *
     * @remarks method to handle the keydown enter event
     */
    handleEnter: () => void;
    /**
     * @remarks label for the input element. This label should always be the translated string
     */
    inputLabel: string;
    /**
     * @remarks Determines whether the dropdown should be closed when cleared.
     */
    closeOnClear?: boolean;
    /**
     * @remarks Numeric value to set the cursor position.
     */
    cursorPosition: number;
}
/**
 * Control with input element and menu list when the input is focused the menulist will appear
 * @example
 * ```
 * <CcfInputMenu {...props}/>
 * ```
 */
export declare const CcfInputMenu: ({ options, inputStyles, inputValue, handleInputChange, handleOptionSelection, handleInputClear, handleEnter, inputLabel, closeOnClear, cursorPosition }: CcfInputMenuProps) => JSX.Element;
