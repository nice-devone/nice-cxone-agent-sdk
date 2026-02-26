import React from 'react';
import { CapturedSection } from '@nice-devone/common-sdk';
interface SectionRendererProps {
    section: CapturedSection;
}
/**
 * Renders a section with its questions.
 * @param section - The section data containing questions.
 * @example `<SectionRenderer section={section}  />`
 */
export declare const SectionRenderer: React.FC<SectionRendererProps>;
export {};
