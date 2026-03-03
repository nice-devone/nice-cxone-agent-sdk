import React, { ReactNode } from 'react';
/**
 * Interface for CcfColorPickerProps
 */
export interface CcfColorPickerProps {
    /**
     * @remarks Used to show label for reset button
     */
    resetLabel?: string;
    /**
     * @remarks Used to get colors of different groups
     */
    group?: string;
    /**
     * @remarks  callback method used to return selected color to parent component
     */
    onSelect: (id: string | null, group: string) => void;
    /**
     * @remarks Used to pass icon from parent
     */
    children: ReactNode;
    /**
     * @remarks callback method to call when Escape is pressed
     */
    onEscape?: () => void;
}
/**
 * Used to show color picker for Rich Text Editor
 * @param props -?- CcfColorPickerProps
 * @example - `<CcfColorPicker {...props} />`
 */
export declare const CcfColorPicker: React.ForwardRefExoticComponent<CcfColorPickerProps & React.RefAttributes<HTMLButtonElement>>;
export default CcfColorPicker;
