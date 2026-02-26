/// <reference types="react" />
export interface CcfDialButtonProps {
    keyDial: string | number;
    keyIndex?: number;
    letters?: string;
    onButtonClick?: (e: React.SyntheticEvent) => void;
}
/**
 * Component used to display keypad buttons
 * @param props - CcfDialButtonProps
 * @example <CcfDialButton />
 * @returns keypad with inputfield button
 */
declare const CcfDialButton: (props: CcfDialButtonProps) => JSX.Element;
export default CcfDialButton;
