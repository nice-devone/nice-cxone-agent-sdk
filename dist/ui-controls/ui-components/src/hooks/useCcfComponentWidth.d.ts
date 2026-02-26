/**
 *custom hook to get the width of components
 * @returns -refrence, component
 * @example - `useCcfComponentWidth()`
 */
export declare const useCcfComponentWidth: (refrence: React.RefObject<HTMLDivElement>, property?: 'innerWidth' | 'offsetWidth') => {
    width: number;
};
