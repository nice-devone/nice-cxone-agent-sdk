import { default as Studio } from './studio';
/**
 * Class for CXS helpers.
 */
declare class Helpers {
    static helpers: Helpers;
    studio: Studio;
    validate: import("./validate").ValidateInterface;
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const Helpers = Helpers.instace;
     * ```
     */
    static get instance(): Helpers;
    /**
     * Method to get cxone host name
     * @example
     * const cxoneHostName = getCXoneSystemIssuer()
     */
    getCXoneSystemIssuer: (browserUrl: string, cxoneSystemIssuer: string) => string;
}
declare const cxs: Helpers;
export { cxs };
