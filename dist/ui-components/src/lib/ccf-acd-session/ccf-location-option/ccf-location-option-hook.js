import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModeOfOperation, getSelectedUserLocation, getUserLocation, voicePreferenceActions } from '../ccf-acd-session.slice';
/**
 * Default hook implementation using Redux
 * @example
 * ```
 * const useCustomLocationOption = () => {
 *   // Custom implementation
 *   return { locationData, selectedLocation, modeOfOperation, location, handleLocationChange, translate };
 * };
 * ```
 */
export const useDefaultLocationOption = () => {
    const dispatch = useDispatch();
    const locationData = useSelector(getUserLocation);
    const selectedLocation = useSelector(getSelectedUserLocation);
    const modeOfOperation = useSelector(getModeOfOperation);
    const [location, setLocation] = useState(selectedLocation || '');
    /**
     * Function to handle onChange Location
     * @param event - SelectChangeEvent
     * @example
     * ```
     * handleLocationChange(event)
     * ```
     */
    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocation(selectedLocation);
        dispatch(voicePreferenceActions.setSelectedUserLocation(selectedLocation));
    };
    return {
        locationData,
        selectedLocation,
        modeOfOperation,
        location,
        handleLocationChange,
    };
};
//# sourceMappingURL=ccf-location-option-hook.js.map