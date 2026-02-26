import React from 'react';
/**
 *
 * @param key - storge key
 * @param setter - function to set value
 * @example SetSwitchHelper(NotificationSettings.SECONDARYDEVICE, setSecondaryDevice);
 *
 * Todo move to API when that epic is ready
 */
export declare function SetSwitchHelper(key: string, setter: React.Dispatch<React.SetStateAction<boolean>>): void;
/**
 *
 * @param key - storge key
 * @param setter - function to set value
 * @example SetItemHelper(NotificationSettings.SECONDARYDEVICE, setSecondaryDevice);
 */
export declare function SetItemHelper(key: string, setter: React.Dispatch<React.SetStateAction<number>>): void;
