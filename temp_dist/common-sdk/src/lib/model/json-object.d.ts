import { WemNotificationRequestData } from './wem-notification/wem-notification-request-data';
import { WsResponse } from './websocket/ws-response';
import { HttpResponse } from '../http/http-response/http-response';
import { AuthToken } from './authenticate/auth-token';
import { DirectoryRequest } from './directory-request';
import { DirectoryResponse } from './directory-response';
import { EndSessionRequest } from './end-session-request';
import { StartSessionRequest } from './start-session-request';
import { SearchDirectoriesRequest } from '../model/dynamic-directories/search-directory-request';
import { SearchDirectoriesResponse } from '../model/dynamic-directories/search-directory-response';
import { AgentQueuesDetailResponse } from './agent/agent-queues-detail';
import { AgentMessageNotification } from './agent-message-notification/agent-message-notification';
export declare type JSONValue = string | number | boolean | StartSessionRequest | Array<{
    [key: string]: string;
}> | DirectoryResponse | DirectoryRequest | EndSessionRequest | HttpResponse | AuthToken | JSONObject | JSONArray | WemNotificationRequestData | WsResponse | SearchDirectoriesRequest | SearchDirectoriesResponse | AgentQueuesDetailResponse | AgentMessageNotification[];
export interface JSONObject {
    [x: string]: JSONValue | string;
}
export declare type JSONArray = Array<JSONValue>;
