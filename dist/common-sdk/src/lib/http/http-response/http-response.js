"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const utility_1 = require("../../../util/utility");
const allowed_response_headers_1 = require("../../enum/allowed-response-headers");
/**
 * Class to prepare http response object
 */
class HttpResponse {
    /**
     * constructor to initialise the data members for http response object
     * @param resp - Response object from the http request
     * @param text - text for the status response
     * ```
     * @example
     * httpResponse = new HttpRespose(resp, 'Ok')
     * ```
     */
    constructor(resp, text) {
        this.headers = [];
        this.status = resp.status;
        this.statusText = resp.statusText;
        this.body = text;
        this.headers = [];
        // Map API response headers into the HttpHeader[] format for consumers
        const headerEntries = (0, utility_1.normalizeHeaders)(resp === null || resp === void 0 ? void 0 : resp.headers);
        (headerEntries).forEach(([name, value]) => {
            if (Object.values(allowed_response_headers_1.AllowedResponseHeaders).includes(name)) {
                this.headers.push({ name, value });
            }
        });
    }
    /**
     * methohd to parse the http response into a json onbject
     * ```
     * @example
     * const dataResponse = this.data()
     * ```
     */
    get data() {
        return this.body;
    }
    /**
     * Method to return string response from a method call
     * @returns - stringfied values for a http response
     * ```
     * @example
     * const responseString = this.string();
     * ```
     */
    toString() {
        return `HttpResponse ${this.status}(${this.statusText}) data: ${this.data}`;
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=http-response.js.map