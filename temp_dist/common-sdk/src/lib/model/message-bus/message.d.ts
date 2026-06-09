import { MessageType } from '../../enum/message-type';
import { JSONValue } from '../json-object';
export interface Message {
    /**
     * @remarks message type to be broadcasted
     */
    type: MessageType;
    /**
     * @remarks message data to be broadcasted
     */
    data?: JSONValue;
}
