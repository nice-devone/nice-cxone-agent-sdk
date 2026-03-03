import { PaperProps } from '@mui/material';
import { ReactNode } from 'react';
/**
 * Interface for the props passed to ccf-autocomplete component
 */
export interface CcfAutocompleteProps {
    /**
     * boolean value if true, the Popper content will be under the DOM hierarchy of the parent component
     */
    disablePortal?: boolean;
    /**
     * id for the autocomplete component, hepls to implement the accessibility logic
     */
    id?: string;
    /**
     * Function that is called when any of the option is hovered from dropdown by specified reason
     */
    onHighlightChange?: (event: React.SyntheticEvent<Element, Event>, option: any, reason: string) => void;
    /**
     * array of options that are displayed on opening dropdown
     */
    options: any[];
    /**
     * The maximum number of tags that will be visible when not focused. Set -1 to disable the limit.
     */
    limitTags?: number;
    /**
     * If true, we are able to select multiple options from dropdown
     */
    multiple?: boolean;
    /**
     * Function used to determine the string value for a given option
     */
    getOptionLabel?: (option: any) => string;
    /**
     * Function that is called when any of the option is selected from dropdown
     */
    onChange?: (event: React.SyntheticEvent<Element, Event>, value: any | any[], reason: string) => void;
    /**
     * Function that return the component that we want to use for searching the content
     */
    renderInput: (params: object) => ReactNode;
    /**
     * The value(string) or the values(Array) of the autocomplete component
     */
    value?: any | any[];
    /**
     * The size of the component : 'small' or 'medium'
     */
    size?: 'small' | 'medium';
    /**
     * Boolean prop if true hides the selected option from dropdown
     */
    filterSelectedOptions?: boolean;
    /**
     * Function that returns the component which will be rendered as dropdown option
     */
    renderOption?: (props: object, option: any, state: {
        selected: boolean;
    }) => ReactNode;
    /**
     * Function that determines the filtered options to be rendered on search.
     */
    filterOptions?: (options: any, state: object) => any;
    /**
     * Function called when the popup requests to be closed
     */
    onClose?: (event: React.SyntheticEvent, reason: string) => void;
    /**
     * Boolean prop if true, the popup won't close when a value is selected.
     */
    disableCloseOnSelect?: boolean;
    /**
     * Function that renders the selected value/values
     */
    renderTags?: (value: any, getTagProps: any, ownerState: object) => ReactNode;
    /**
     * Boolean prop used to determine if the option represents the given value
     */
    isOptionEqualToValue?: (option: any, value: any) => boolean;
    /**
     * Prop that allows defining system overrides as well as additional CSS styles
     */
    sx?: object;
    /**
     * Component that renders the entire dropdown list
     */
    ListboxComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>> | undefined;
    /**
     * Tags Input changed and search
     */
    onInputChange?: (event: React.SyntheticEvent<Element, Event> | KeyboardEvent, value: string) => HTMLElement | undefined;
    /**
     * optional check to handle opening and closing of component
     */
    open?: boolean | undefined;
    /**
     * Function called when the popup requests to be open
     */
    onOpen?: () => void;
    /**
     * Disable the clear icon when the input has a value
     */
    disableClearable?: boolean;
    /**
     * The component used to render the body of the popup.
     */
    PaperComponent?: React.JSXElementConstructor<PaperProps> | undefined;
    /**
     * The props used for each slot inside.
     */
    slotProps?: Partial<Record<'root' | 'popper', object>>;
}
/**
 * CcfAutoComplete used to dropdown options as per user's input
 * @param param - CcfAutoComplete
 * @example <CcfTextField />
 */
export declare const CcfAutoComplete: (props: CcfAutocompleteProps) => JSX.Element;
