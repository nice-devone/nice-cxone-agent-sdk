import { HttpRequestInit } from '..';
export interface HttpRequestParam {
    url: string;
    request: HttpRequestInit;
    id?: string | number;
}
