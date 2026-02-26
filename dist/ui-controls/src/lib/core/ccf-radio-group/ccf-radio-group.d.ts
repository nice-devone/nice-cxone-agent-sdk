import CSS from 'csstype';
/**
 * Interface for data prop
*/
interface CcfRadioGroupData {
    id: string;
    value: string;
    label: string;
    isDisabled?: boolean;
}
/**
 * Interface for styles prop
 * CSS.Properties provides type checking for CSS properties and values in React
 * and it can be any valid css properties allowed in React.
*/
interface CcfRadioGroupStyles {
    fieldset?: CSS.Properties;
    legend?: CSS.Properties;
    radioGroup?: CSS.Properties;
    radio?: CSS.Properties;
    formcontrolLabel?: CSS.Properties;
    formHelperText?: CSS.Properties;
}
/**
 * Interface for defining props of CcfRadioGroup component
*/
export interface CcfRadioGroupProps {
    data: Array<CcfRadioGroupData>;
    defaultValue?: string;
    isStandaloneRadio?: boolean;
    name: string;
    label?: boolean;
    error?: boolean;
    helperText?: string;
    horizontalAlign?: boolean;
    labelPlacement?: 'top' | 'start' | 'bottom';
    selected?: string;
    size?: 'small' | 'medium' | undefined;
    styles?: CcfRadioGroupStyles;
    color?: 'secondary' | 'success' | 'default';
    onRadioButtonSelection?: any;
}
/**
 * Component used to display Radio Group
 * @param props - CcfRadioGroupProps
 * @example <CcfRadioGroup />
 */
/**
 * @example - CcfRadioGroup - using to show the list of radio buttons in story book
*/
export declare function CcfRadioGroup(props: CcfRadioGroupProps): JSX.Element;
export default CcfRadioGroup;
