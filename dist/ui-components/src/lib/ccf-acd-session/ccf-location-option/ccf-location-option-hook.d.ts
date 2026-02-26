import { SelectChangeEvent } from '@mui/material';
import { Location } from '@nice-devone/common-sdk';
/**
 * Hook interface for location option functionality
 */
export interface UseLocationOptionHook {
    (): {
        locationData: Location[] | undefined;
        selectedLocation: string | boolean | undefined;
        modeOfOperation: string;
        location: string;
        handleLocationChange: (e: SelectChangeEvent) => void;
    };
}
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
export declare const useDefaultLocationOption: UseLocationOptionHook;
