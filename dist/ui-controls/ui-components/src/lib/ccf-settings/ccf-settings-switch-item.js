import { LocalStorageHelper } from '@nice-devone/core-sdk';
/**
 *
 * @param key - storge key
 * @param setter - function to set value
 * @example SetSwitchHelper(NotificationSettings.SECONDARYDEVICE, setSecondaryDevice);
 *
 * Todo move to API when that epic is ready
 */
export function SetSwitchHelper(key, setter) {
    //  const switchValue: boolean
    const value = LocalStorageHelper.getItem(key);
    if (value !== '') {
        setter(value === 'true');
    }
}
/**
 *
 * @param key - storge key
 * @param setter - function to set value
 * @example SetItemHelper(NotificationSettings.SECONDARYDEVICE, setSecondaryDevice);
 */
export function SetItemHelper(key, setter) {
    const storedValue = LocalStorageHelper.getItem(key);
    if (storedValue) {
        setter(storedValue);
    }
}
//# sourceMappingURL=ccf-settings-switch-item.js.map