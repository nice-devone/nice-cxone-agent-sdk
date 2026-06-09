import { HttpClient, Logger } from '@nice-devone/core-sdk';
/**
 * Method used to merge customer card
 * @returns - Updated customer contact
 * @example - mergeCustomerCardRequest(mergeCustomerCardUrl, reqInit)
 */
export const mergeCustomerCardRequest = (mergeCustomerCardUrl, reqInit) => {
    const logger = new Logger('Digital', 'Customer Card Merge');
    return new Promise((resolve, reject) => {
        HttpClient.put(mergeCustomerCardUrl, reqInit).then((response) => {
            logger.info('mergeCustomerCard', 'Customer Card Merge Was Successful. Received following success response - ' +
                JSON.stringify(response));
            resolve(response);
        }, (error) => {
            var _a, _b, _c;
            logger.error('mergeCustomerCard', 'Customer Card Merge Has Failed. Received following error response' +
                JSON.stringify(error));
            reject((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors[0]) === null || _c === void 0 ? void 0 : _c.message);
        });
    });
};
//# sourceMappingURL=customer-card-merge.js.map