/**
 * Cognigy AI Copilot Feed Configuration Interface
 *
 * Defines the structure for feed tile configuration retrieved from API.
 * This configuration determines which tile renders as a scrollable message feed.
 */
/**
 * Feed tile configuration returned from the Cognigy feed config API.
 * Determines which tile acts as the scrollable message feed.
 */
export interface CognigyFeedConfig {
    /**
     * Tile ID that acts as the scrollable message feed.
     * Empty string indicates feed is disabled.
     */
    tileId: string;
    /**
     * Maximum number of messages to retain in the feed.
     * Messages are trimmed from the beginning when limit is exceeded.
     * Valid range: 1-20.
     */
    maxMessages: number;
    /**
     * Scroll direction for the feed.
     * 'top-to-bottom' — newest messages at bottom (default)
     * 'bottom-to-top' — newest messages at top
     */
    scrollDirection?: 'top-to-bottom' | 'bottom-to-top';
    /**
     * Seconds before older messages fade to 40% opacity.
     * Set to 0 to disable fading. Default: 5
     */
    latestFadeDelay?: number;
}
