import React from 'react';
import { Dayjs } from 'dayjs';
export declare enum DIGITAL_SEARCH_FILTERS {
    TAG = "tag"
}
export declare enum SelectAllField {
    ID = "selectAll",
    NAME = "Select All"
}
export declare enum FilterFieldTypes {
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    DROPDOWN = "dropdown"
}
/**
 * Interface for the options that are displayed in interaction search filters
 */
export interface dropdownMenuOptions {
    /**
     * id of the dropdown menu item
     */
    id: string;
    /**
     * User Id of the dropdown menu item
     */
    userId?: string;
    /**
     * name of the dropdown menu item
     */
    name: string;
    /**
     * agentStatus of the dropdown menu item
     */
    agentStatus?: string;
    /**
     * boolean prop that determines if can reply to any message
     */
    canReplyToAnyMessage?: boolean;
}
/**
 * Interface for the extra initial parameters that are displayed supported
 */
export interface InitialParams {
    /**
      * represents fields that need to be added in initialSearchText
      */
    searchText: {
        [key: string]: string;
    };
    /**
      * represents fields that need to be added in initialInteractionSeachFilterOptions
      */
    dropdownOptions: {
        [key: string]: dropdownMenuOptions[];
    };
    /**
      * represents fields that need to be added in initialLoadMoreFlagValues
      */
    loadMoreFlagValues: {
        [key: string]: boolean;
    };
}
export interface dropdownOptions {
    /**
     * label of the dropdown option
     */
    label?: string;
    /**
     * menu list coming under dropdown
     */
    options?: dropdownMenuOptions[];
    /**
     * value to display in textfield after selecting item from menu
     */
    fieldValue?: string | dropdownMenuOptions | dropdownMenuOptions[];
    /**
     * function to handle when menu item is clicked
     */
    onMenuItemClick: (data: string | dropdownMenuOptions[], fieldName: string | undefined) => void;
    /**
    * field name for dropdown items e.g; channel, status,etc
    */
    fieldName: string;
    /**
       * boolean prop that determines whether the dropdown is multiselect or not
    */
    isMultipleSelectionAllowed?: boolean;
    /**
     * type of fields
    */
    type?: string;
    /**
     * boolean prop that determines whether the dropdown is single select and still pagination to be shown
     */
    isSingleSelectWithPage?: boolean;
    /**
     * on change if server side pagination supported
     */
    onInputChange?: (event: React.SyntheticEvent<Element, Event> | KeyboardEvent, value: string) => HTMLElement | undefined;
    /**
     * flag to track the server side pagination
     */
    isPaginationSupported?: boolean;
}
export interface CcfDropdownOptionsProps {
    /**
     * drop down items
     */
    dropdownItems?: dropdownOptions[];
    /**
     * style for menu items
     */
    menuItemStyles?: object;
    /**
     * style for dropdown label
     */
    dropdownTextStyles?: object;
    /**
     * placeholder for textfield
     */
    placeholder?: string;
    /**
     * title for list subheader
     */
    listSubheaderTitle?: string;
    /**
     * style for list subheader title
     */
    listSubheaderStyles?: object;
    /**
     * props for buttons
     */
    buttons?: buttonProperties[];
    /**
   * props for datePicker
   */
    datePicker?: datePickerProps[];
    /**
   * used to handle close Icon click
   */
    onCloseIconClick?: () => void;
    /**
     * used to render only dropdown box (excluding close icon)
     */
    showOnlyDropDownBox?: boolean;
    /**
     * List box Server side pagination Rendering Component props
     */
    MultiSelectPaginationDropdown?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>> | undefined;
    /**
     * optional check to handle opening and closing of component
     */
    open?: boolean;
    /**
     * handles state of open
     */
    handleOpen?: (state: boolean) => void;
    /**
     * optional flag to identify if this is for copilot filters
     */
    copilotFilter?: boolean;
    /**
     * optional render function for agent status icons; receives the agent status string
     * and an optional style object, returns a React node
     */
    renderAgentStatusIcon?: (agentStatus: string, iconStyle?: object) => React.ReactNode;
    extraInitialParams?: InitialParams;
}
interface buttonProperties {
    /**
     * title of the button
     */
    title: string;
    /**
     * style of button
     */
    styles?: object;
    /**
     * function to handle when button is clicked
     */
    onClickHandler: () => void;
    /**
     * to handle if button is disabled
     */
    disabled?: boolean;
}
interface datePickerProps {
    /**
   * label of the date picker component e.g- startDate
   */
    label: string;
    /**
     * maximum date to display
     */
    maxDate?: Dayjs;
    /**
     * minimum date to display
     */
    minDate?: Dayjs;
    /**
   * function to handle when date is selected from date picker
    */
    onDateSelect: (event: Dayjs | null, type: string) => void;
    /**
   * flag to disable up arrow
    */
    disableUpArrow?: boolean;
    /**
   * flag to disable down arrow
    */
    disableDownArrow?: boolean;
    /**
   * date value after selecting or updating the date
    */
    value: Dayjs | null;
    /**
   * field name for date picker e.g; startDate
    */
    fieldName: string;
    /**
   * styles for date picker label
    */
    dateLabelStyles?: object;
    /**
   * browser locale
    */
    locale: string;
    /**
* browser locale
 */
    placeholder?: string;
}
/**
 * Interface for custom listbox component props
 */
interface CustomListboxProps {
    children?: React.ReactNode;
    id: string;
    searchText: Record<string, string>;
    initialDropdownOptions: Record<string, dropdownMenuOptions[]>;
    handleShowMoreClick: (filterType: string) => void;
    loadMoreFlagValues: Record<string, boolean>;
    handleOpen?: (state: boolean) => void;
    dropdownItems?: dropdownOptions[];
}
/** function that renders the dropdown list for interaction search filter
   * @param props - CustomListboxProps
   * @param ref - reference for keyboard accessibility
   * @returns component with list of values to be displayed in dropdown
   * @example ListboxComponent(props, ref)
   */
export declare const CustomListboxComponent: React.ForwardRefExoticComponent<CustomListboxProps & React.RefAttributes<HTMLUListElement>>;
/**
 * Dropdown control used to display dropdown options
 * @returns
 * @example
 * ```
 * <CcfDropdownOptions/>
 * ```
 */
export declare const CcfDropdownOptions: ({ dropdownItems, menuItemStyles, dropdownTextStyles, placeholder, buttons, listSubheaderStyles, listSubheaderTitle, datePicker, showOnlyDropDownBox, onCloseIconClick, MultiSelectPaginationDropdown, open, handleOpen, copilotFilter, renderAgentStatusIcon, extraInitialParams, }: CcfDropdownOptionsProps) => JSX.Element;
export {};
