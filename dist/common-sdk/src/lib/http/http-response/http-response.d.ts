import { HttpHeader } from '../http-header/http-header';
/**
 * Class to prepare http response object
 */
export declare class HttpResponse {
    status: number;
    statusText: string;
    headers?: HttpHeader[];
    private body;
    /**
     * constructor to initialise the data members for http response object
     * @param resp - Response object from the http request
     * @param text - text for the status response
     * ```
     * @example
     * httpResponse = new HttpRespose(resp, 'Ok')
     * ```
     */
    constructor(resp: Response, text: any);
    /**
     * methohd to parse the http response into a json onbject
     * ```
     * @example
     * const dataResponse = this.data()
     * ```
     */
    get data(): any;
    /**
     * Method to return string response from a method call
     * @returns - stringfied values for a http response
     * ```
     * @example
     * const responseString = this.string();
     * ```
     */
    toString(): string;
}
