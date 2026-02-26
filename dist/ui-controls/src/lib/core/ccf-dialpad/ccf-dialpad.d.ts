/// <reference types="react" />
/**
 * Interface for defining props of CcfDialPad component
*/
interface CcfDialPadProps {
    isSmView?: boolean;
    handleBackIconClick?: (e: React.SyntheticEvent) => void;
    onDialKeyChange?: (e: string) => void;
}
/**
 * Component used to display keypad
 * @param props - CcfDialPadProps
 * @example <CcfDialPad />
 * @returns keypad with inputfield
 */
export declare const CcfDialPad: (props: CcfDialPadProps) => JSX.Element;
export default CcfDialPad;
