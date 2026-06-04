import { Logger } from '../../logger/logger';
/**
 * This will be the abstract class for all the adapters which will have common methods such as publish ..etc which other adapters will extends
 */
export declare abstract class CXoneBaseAdapter {
    logger: Logger;
    /**
     * @param event -
     * @example -
    */
    handleEvent(event: {
        [key: string]: string;
    }): void;
}
