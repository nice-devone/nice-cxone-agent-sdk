/**
 * AI Agent Configuration Interfaces
 *
 * Defines the structure for AI Agent configuration retrieved from retrieve-aah-config API.
 * Configuration is located at `Params.aiAgentConfig` when `Params.enableAiAgent` is true.
 */
/**
 * Base AI Agent configuration from retrieve-aah-config API.
 * Contains Cognigy connection settings common to all consumers.
 */
export interface AiAgentConfigBase {
    /** URL Token for WebSocket authentication with Cognigy */
    cognigyUrlToken?: string;
    /** WebSocket server URL for Cognigy AI Copilot */
    cognigySocketUrl?: string;
    /** Origin header value for WebSocket connection */
    cognigyOrigin?: string;
}
/**
 * Extended AI Agent configuration with tile rendering settings.
 * Used by components that need to configure tile behavior (feed, streaming).
 */
export interface AiAgentConfig extends AiAgentConfigBase {
    /**
     * Short-lived auth token for WebSocket connection.
     * Provided by retrieve-aah-config in lower envs (dev/test/staging).
     * In production this is fetched from config.js instead.
     */
    accessTokenSecret?: string;
    /** Tile ID(s) that render as scrollable message feeds. Can be string or string[] */
    cognigyFeedTileId?: string | string[];
    /** Maximum number of messages to retain in each feed tile */
    cognigyFeedMaxMessages?: number;
    /** Tile ID(s) that use progressive/streaming rendering. Can be string or string[] */
    cognigyProgressiveTileId?: string | string[];
    /**
     * Streaming speed preset: 'slow' | 'normal' | 'fast'
     * Controls word-by-word animation timing
     */
    cognigyStreamingSpeed?: 'slow' | 'normal' | 'fast';
    /**
     * Scroll direction for feed tiles.
     * 'top-to-bottom' — newest messages at bottom (default)
     * 'bottom-to-top' — newest messages at top
     */
    cognigyFeedScrollDirection?: 'top-to-bottom' | 'bottom-to-top';
    /**
     * Seconds before older feed messages fade to 40% opacity.
     * Set to 0 to disable fading. Default: 5
     */
    cognigyFeedLatestFadeDelay?: number;
    /** Tile corner radius in px */
    cognigyTileBorderRadius?: number;
    /** Tile border color */
    cognigyTileBorderColor?: string;
    /** When true, a multi-column grid collapses to a single column on narrow containers */
    cognigyAutoStackColumns?: boolean;
    /** Container width in px below which single-column stacking kicks in */
    cognigyStackBreakpointPx?: number;
    /** When true, tiles with data float to the top of their column until all tiles are loaded */
    cognigyTileSliding?: boolean;
}
