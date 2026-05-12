import { SelectChangeEvent } from '@mui/material';
/**
 * Hook interface for location option functionality
 */
export interface UseLocationOptionHook {
    (): {
        locationData: any[] | undefined;
        selectedLocation: string | boolean | undefined;
        modeOfOperation: string;
        location: string;
        handleLocationChange: (e: SelectChangeEvent) => void;
    };
}
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
export declare const useDefaultLocationOption: UseLocationOptionHook;
