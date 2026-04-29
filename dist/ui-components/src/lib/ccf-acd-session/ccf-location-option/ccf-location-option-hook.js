import { useState } from 'react';
/**
 * Default hook implementation (no-op)
 * Consumer should provide custom hook via useLocationOptionHook prop
 * @example
 * ```
 * const useCustomLocationOption = () => {
 *   return { locationData, selectedLocation, modeOfOperation, location, handleLocationChange };
 * };
 * ```
 */
export const useDefaultLocationOption = () => {
    const [location, setLocation] = useState('');
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    return {
        locationData: undefined,
        selectedLocation: undefined,
        modeOfOperation: '',
        location,
        handleLocationChange,
    };
};
//# sourceMappingURL=ccf-location-option-hook.js.map