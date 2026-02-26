import { REACTION_ICONS } from '../ccf-icon/ccf-icon-list';
import { ReactionType } from '@nice-devone/common-sdk';
/**
 * interface for CcfReactionPickerProps
 */
export interface CcfReactionPickerProps {
    /**
     * @remarks  used to set reaction button state
     */
    isSelected: boolean;
    /**
     * @remarks - type of reaction
     */
    reactionType: ReactionType;
    /**
     * @remarks - type of channel
     */
    iconName: REACTION_ICONS;
    /**
     * @remarks - type of channel
     */
    buttonName: 'like';
    /**
     * @remarks  callback method used to return changed reaction to parent component
     */
    handleReactionChange: (isSelected: boolean) => void;
}
/**
 * Used to show reaction picker for the application
 * @param props -?- CcfReactionPicker
 * @example - `<CcfReactionPicker {...props}/>`
 */
export declare const CcfReactionPicker: (props: CcfReactionPickerProps) => JSX.Element;
export default CcfReactionPicker;
