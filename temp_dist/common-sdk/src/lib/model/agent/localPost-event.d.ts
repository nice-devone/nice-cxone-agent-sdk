/**
 * Model Class for local post custom event
 */
export declare class LocalPostEvent {
    /**
   * @remarks - port where payload will be posted
   */
    port: number;
    /**
  * @remarks - url where payload will be posted
  */
    path: string;
    /**
  * @remarks - payload received via localpost event
  */
    payload: string | {
        [x: string]: string;
    };
}
