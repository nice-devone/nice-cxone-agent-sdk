import React from 'react';
interface SkipToContentProps {
    /**
     * Reference to the main content element.
     */
    bodyRef: React.RefObject<HTMLDivElement> | null | undefined;
}
/**
 * Provides an accessible "skip to main content" link.
 * It moves focus to the element referenced by `bodyRef` when activated.
 * @returns skip to content component for landing screen
 * @example
 * `<SkipToContent bodyRef={mainContentRef} />`
 */
export declare function SkipToContent({ bodyRef }: SkipToContentProps): JSX.Element;
export default SkipToContent;
