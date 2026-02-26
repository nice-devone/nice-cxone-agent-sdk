export declare type LvDeskProps = {
    showEccOnFail?: boolean;
};
/**
 * Renders the main desk component, which conditionally displays either the customer card
 * or the remote desk based on the desk failure state and the `showEccOnFail` prop.
 *
 * This component is being used for the App Space
 *
 * @example
 * ```
 * <LvDesk showEccOnFail={false} />
 * ```
 */
export declare function LvDesk(props: LvDeskProps): JSX.Element;
/**
 * Renders the main desk component, which conditionally displays either the customer card
 * or the remote desk based on the desk failure state and the `showEccOnFail` prop.
 *
 * * Differences from `LvDesk`:
 *  * 1. Used specifically for the home desk component.
 *  * 2. Does not send the active interaction to `LvRemoteDesk`.
 *
 * @example
 * ```
 * <LvDeskHome showEccOnFail={false} />
 * ```
 */
export declare function LvDeskHome(props: LvDeskProps): JSX.Element;
export default LvDesk;
