import { Logger } from '../../logger/logger';
/**
 * This will be the abstract class for all the adapters which will have common methods such as publish ..etc which other adapters will extends
 */
export class CXoneBaseAdapter {
    constructor() {
        this.logger = new Logger('SDK', 'CXoneBaseAdapter');
    }
    /**
     * @param event -
     * @example -
    */
    handleEvent(event) {
        this.logger.info('handleEvent', 'inside the method' + event);
    }
}
//# sourceMappingURL=cxone-base-adapter.js.map