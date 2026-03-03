import React from 'react';
export interface CcfCarouselProps {
    children?: React.ReactElement[];
    isVoiceContact?: boolean;
    index?: number;
}
/**
 * Functional component is a wrapper for material UI card component
 * @returns material UI carousel element
 * @example <CcfCarousel/>
 */
export declare function CcfCarousel({ children, isVoiceContact, index }: CcfCarouselProps): JSX.Element;
