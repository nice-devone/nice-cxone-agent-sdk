import { CXoneCase } from './schema/events/cxone-case';
/**
 * Interface used for parsing get all contact history for customer
 * @returns returns - list of contact History with scroll Token
 * ```
 * @example
 * Array<ContactHistory>
 * ```
 */
export interface ContactHistory {
    /**
   * @remarks - A Array of objects which represents contact history.
   */
    cxoneCase: Array<CXoneCase>;
    /**
     * @remarks - A string value which represents scroll Token.
     */
    scrollToken: string;
}
