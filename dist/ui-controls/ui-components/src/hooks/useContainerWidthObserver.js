import { useEffect, useState } from 'react';
/**
 *custom hook to get the width of components
 * @returns -refrence, component
 * @example - `useContainerWidthObserver()`
 */
export const useContainerWidthObserver = (containerRef) => {
    const [containerWidth, setContainerWidth] = useState(0);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setContainerWidth(entries[0].contentRect.width);
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    return { containerWidth };
};
//# sourceMappingURL=useContainerWidthObserver.js.map