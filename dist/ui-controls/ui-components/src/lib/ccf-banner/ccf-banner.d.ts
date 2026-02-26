import React from 'react';
/**
 * Properties for the ccfBanner component
 */
export interface CcfBannerProps {
    /**
     * The main message to be displayed in the banner.
     *
     * @remarks
     * This prop represents the primary text content of the banner.
     */
    bannerMessage: string;
    /**
     * The icon to be displayed alongside the banner message.
     *
     * @remarks
     * This prop represents the icon or graphic element associated with the banner.
     */
    bannerIcon: React.ReactNode;
    /**
     * Custom styles for the container of the entire banner.
     *
     * @remarks
     * This prop allows you to apply additional styling to the outer container of the banner.
     */
    customBannerContainer?: React.CSSProperties;
    /**
     * Custom styles for the container of the banner content (icon and text).
     *
     * @remarks
     * This prop allows you to apply additional styling to the container that holds the banner content.
     */
    customBannerContentContainer?: React.CSSProperties;
    /**
     * Custom styles for the banner text.
     *
     * @remarks
     * This prop allows you to apply additional styling to the text content of the banner.
     */
    customBannerText?: React.CSSProperties;
    /**
     * The message to be displayed in the banner indicating message delivery failed.
     *
     * @remarks
     * This prop represents the primary text content of the banner in bold.
     */
    undeliveredErrorMessage?: string;
}
/**
 * @param CcfBannerProps - Public banner data
 * ```
 * @example
 *  <CcfBanner {...CcfBannerProps} />
 * ```
 */
export declare function CcfBanner(props: CcfBannerProps): JSX.Element;
export default CcfBanner;
