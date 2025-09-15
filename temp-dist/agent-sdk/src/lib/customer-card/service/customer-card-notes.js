import { HttpClient, Logger } from '@nice-devone/core-sdk';
/**
 * Method used to fetch customer notes
 * @returns - Updated list of customer notes
 * @example - fetchCustomerNotes(getCustomerNotesUrl, reqInit)
 */
export const fetchCustomerNotes = (getCustomerNotesUrl, reqInit) => {
    const logger = new Logger('Digital', 'Customer Card Customer Notes');
    return new Promise((resolve, reject) => {
        HttpClient.get(getCustomerNotesUrl, reqInit).then((response) => {
            logger.info('Customer Notes', 'Get Notes Success' + JSON.stringify(response));
            resolve(response.data);
        }, (err) => {
            logger.error('Customer Notes', 'Get Notes Failed' + JSON.stringify(err));
            reject(err);
        });
    });
};
/**
 * Method to create a Customer note in customer card
 * @param Id - Customer Id of the Customer and content of note
 * @returns - API Returns Response JSON with created note object
 * @example -
 */
export const createCustomerNote = (getCustomerNotesUrl, reqInit) => {
    const logger = new Logger('Digital', 'Customer Card Customer Notes');
    return new Promise((resolve, reject) => {
        HttpClient.post(getCustomerNotesUrl, reqInit).then((response) => {
            logger.info('Customer Notes', 'Create Customer Notes Success' + JSON.stringify(response));
            resolve(response.data);
        }, (err) => {
            logger.error('Customer Notes', 'Create Customer Notes Failed' + JSON.stringify(err));
            reject(err);
        });
    });
};
/**
 * Method to delete a Customer note in customer card
 * @param Id - Customer Id of the Customer and noteId of note
 * @returns - API Returns Response JSON with deleted note empty object
 * @example -
 */
export const deleteCustomerNote = (deleteCustomerNote, reqInit) => {
    const logger = new Logger('Digital', 'Customer Card Customer Notes');
    return new Promise((resolve, reject) => {
        HttpClient.delete(deleteCustomerNote, reqInit).then((response) => {
            logger.info('Customer Notes', 'Delete Customer Notes Success' + JSON.stringify(response));
            resolve(response.data);
        }, (err) => {
            logger.error('Customer Notes', 'Delete Customer Notes Failed' + JSON.stringify(err));
            reject(err);
        });
    });
};
/**
 * Method to edit a Customer note in customer card
 * @param Id - Customer Id of the Customer and noteId of note
 * @returns - API Returns Response JSON with edited note object
 * @example -
 */
export const editCustomerNote = (editCustomerNoteUrl, reqInit) => {
    const logger = new Logger('Digital', 'Customer Card Customer Notes');
    return new Promise((resolve, reject) => {
        HttpClient.put(editCustomerNoteUrl, reqInit).then((response) => {
            logger.info('Customer Notes', 'Update Customer Notes Success' + JSON.stringify(response));
            resolve(response.data);
        }, (err) => {
            logger.error('Customer Notes', 'Update Customer Notes Failed' + JSON.stringify(err));
            reject(err);
        });
    });
};
//# sourceMappingURL=customer-card-notes.js.map