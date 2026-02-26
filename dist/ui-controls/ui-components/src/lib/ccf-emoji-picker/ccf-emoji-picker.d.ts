import React from 'react';
import { EmojiData, CategoryName } from 'emoji-mart';
import { PopperPlacementType } from '@mui/material';
/**
 * type for emoji set
 */
export declare type EmojiSet = 'apple' | 'google' | 'twitter' | 'facebook';
/**
 * Enum for SkinTone
 */
export declare enum SkinTone {
    DEFAULT = 1,
    LIGHT = 2,
    MEDIUM_LIGHT = 3,
    MEDIUM = 4,
    MEDIUM_DARK = 5,
    DARK = 6
}
/**
 * interface for CcfEmojiProps
 */
export interface CcfEmojiProps {
    /**
     * @remarks  Used to show/hide emoji tooltip
     */
    showTooltip?: boolean;
    /**
     * @remarks  Used to set the size of the emojis
     */
    size?: number;
    /**
     * @remarks  Enable/disable auto focus for search input box
     */
    searchAutoFocus?: boolean;
    /**
     * @remarks Used to set default emoji skin color
     */
    defaultSkin?: SkinTone;
    /**
     * @remarks  Used select emoji set eg. -'apple' | 'google' | 'twitter' | 'facebook';
     */
    set?: EmojiSet;
    /**
     * @remarks  Used to set perLine emoji count
     */
    perLine?: number;
    /**
     * @remarks  Used to set placement of emoji picker
     */
    placement?: PopperPlacementType;
    /**
     * @remarks  callback method used to return selected emoji to parent component
     */
    onSelect: (data: EmojiData) => void;
    /**
     * @remarks  to exclude category from emoji. Ex: flags
     */
    exclude?: CategoryName[];
    /**
    * @remarks  boolean to indicate if emailRevamp is enabled or not
    */
    isEmailRevampEnabled?: boolean;
    /**
     * @remarks  method to be triggered along with escape event handler
     */
    onEscape?: () => void;
    /**
     * @remarks  method to be setCurrently opened popper in toolbar plugin
     */
    setActivePopper?: () => void;
}
/**
 * Used to show Emoji picker for the application
 * @param props -?- CcfEmojiProps
 * @example - `<CcfEmojiPicker {...props}/>`
 */
export declare const CcfEmojiPicker: React.ForwardRefExoticComponent<CcfEmojiProps & React.RefAttributes<HTMLButtonElement>>;
export default CcfEmojiPicker;
