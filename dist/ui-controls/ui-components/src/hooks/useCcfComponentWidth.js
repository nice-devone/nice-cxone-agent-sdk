import { useEffect, useState } from 'react';
/**
 *custom hook to get the width of components
 * @returns -refrence, component
 * @example - `useCcfComponentWidth()`
 */
export const useCcfComponentWidth = (refrence, property = 'offsetWidth') => {
    var _a, _b;
    const [width, setWidth] = useState(0);
    const newWidth = typeof ((_a = refrence === null || refrence === void 0 ? void 0 : refrence.current) === null || _a === void 0 ? void 0 : _a[property]) === 'string' ? parseInt(refrence.current[property], 10) : ((_b = refrence === null || refrence === void 0 ? void 0 : refrence.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
    useEffect(() => {
        if (refrence === null || refrence === void 0 ? void 0 : refrence.current) {
            setWidth(newWidth);
        }
    }, [newWidth]);
    useEffect(() => {
        /**
         * Sets width of the app space on window resize event.
         * @example
         * handleWindowResize()
         */
        const handleWindowResize = () => {
            var _a;
            if ((_a = refrence === null || refrence === void 0 ? void 0 : refrence.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) {
                setWidth(refrence.current.offsetWidth);
            }
            else if (property == 'innerWidth') {
                setWidth(window.innerWidth);
            }
        };
        // Call handleWindowResize manually to set initial width
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return { width };
};
//# sourceMappingURL=useCcfComponentWidth.js.map