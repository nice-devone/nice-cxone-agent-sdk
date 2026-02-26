import { useEffect, useState } from 'react';
/**
 *custom hook for to check touch devices
 * @returns - boolean
 * @example - `useCheckTouchDevice()`
 */
// eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
export const useCheckTouchDevice = () => {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        //checking ontouchstart is present in window object, also checking maxTouchPoints in navigator - to check the current device is enabled with touch or nor
        setIsTouch(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    }, []);
    return isTouch;
};
//# sourceMappingURL=useCheckTouchDevice.js.map