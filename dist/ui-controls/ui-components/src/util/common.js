import { MediaType, ReplyAPIStatus } from '@nice-devone/common-sdk';
import { BEGIN_FORWARDED_MESSAGE } from '../lib/ccf-editor/ccf-contact-editor.slice';
import { getDraftMessage } from '../lib/ccf-assignment-panel/ccf-assignment-utils';
import { CcfAssignmentAction } from '../lib/ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Function to formate timer
 * @returns - time in format hh:mm:ss or mm:ss
 * @example - formattedCounter  = formatTimer(number);
 */
export const formatTimer = (count) => {
    const getSeconds = `0${(count % 60)}`.slice(-2);
    const minutes = parseInt(`${Math.floor(count / 60)}`);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(count / 3600)}`.slice(-2);
    if (Number(getHours) > 0)
        return `${getHours}:${getMinutes}:${getSeconds}`;
    else
        return `${getMinutes}:${getSeconds}`;
};
/**
* Function to formate time
* @returns - time in format mm:ss or mm min or hh.mm hr
* @example - formattedCounter  = formatTime(number);
*/
export const formatTime = (count) => {
    const getSeconds = `0${(count % 60)}`.slice(-2);
    const minutes = parseInt(`${Math.floor(count / 60)}`);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `${Math.floor(count / 3600)}`;
    const getDays = `${Math.floor(+getHours / 24)}`;
    if (Number(getHours) >= 24) {
        if (Number(getDays) == 1)
            return `${getDays} day`;
        else
            return `${getDays} days`;
    }
    if (Number(getHours) >= 1) {
        if (Number(getMinutes) < 30)
            return `${getHours} hr`;
        else
            return `${getHours}.5 hr`;
    }
    if (Number(getMinutes) >= 5)
        return `${getMinutes} min`;
    else
        return `${getMinutes}:${getSeconds}`;
};
/**
* Function to calculate current hold time for any call
* @returns - time in seconds
* @example - calculateHoldDuration("")
*/
export const getDurationInSeconds = (dateTime) => {
    return Math.ceil((new Date().getTime() - new Date(dateTime).getTime()) / 1000);
};
/**
* Function to calculate the current timzone offset in utc
* @returns - time zone offset in utc format
* @example - getUtcTimezoneOffset()
*/
export const getUtcTimezoneOffset = () => {
    const date = new Date();
    let timeZoneOffset = date.getTimezoneOffset();
    if (isDST(date))
        timeZoneOffset += 60;
    const timeZoneOffsetInHours = new Date(Math.abs(timeZoneOffset) * 1000).toISOString().substring(14, 19);
    if (timeZoneOffset <= 0)
        return timeZoneOffsetInHours;
    else
        return `-${timeZoneOffsetInHours}`;
};
/**
 * after getting confirmation from product will update the logic
* get date and time format
* @param date - date string
* @returns - Required formatted date and time stamp.
* @example - getDateAndTimeFormat("2022-05-23T06:26:13+00:00")
*/
export const getDateAndTimeFormat = (date) => {
    const dateToFormat = new Date(date);
    const sMonth = String(dateToFormat.getMonth() + 1).padStart(2, '0');
    const sDay = String(dateToFormat.getDate()).padStart(2, '0');
    const sYear = dateToFormat.getFullYear();
    let sHour = dateToFormat.getHours();
    const sMinute = String(dateToFormat.getMinutes()).padStart(2, '0');
    let hourlyFormat = 'am';
    const iHourCheck = sHour;
    if (iHourCheck > 12) {
        hourlyFormat = 'pm';
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = 12;
    }
    const hours = String(sHour).padStart(2, '0');
    return sMonth + '/' + sDay + '/' + sYear + ' at ' + hours + ':' + sMinute + ' ' + hourlyFormat;
};
/**
 * returns if the current timezone has Daylight Savings
* @param date - date object
* @returns - true if the timezone has Daylight savings
* @example - isDST("2022-05-23T06:26:13+00:00")
*/
export const isDST = (date) => {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const janoffset = jan.getTimezoneOffset();
    const julyoffset = jul.getTimezoneOffset();
    const standardTimeZoneOffset = Math.max(janoffset, julyoffset);
    return date.getTimezoneOffset() < standardTimeZoneOffset;
};
/**
 * returns the unique id for the contactCard
* @param contact - ContactCard object
* @returns - a string, caseId for digital and contactId for everything else
* @example - idForDigitalOrACD(contact)
*/
export const idForDigitalOrACD = (contact) => {
    if (contact.media === MediaType.DIGITAL && contact.caseId)
        return contact.caseId;
    else
        return contact.contactId;
};
/**
     * Associate auth based on direction
     * @param message - received cxone message
     * @example -
     * ```
     * const author = getMessageAuthor(message);
     * ```
     * @returns - author details
     */
export const getMessageAuthor = (message) => {
    return (message === null || message === void 0 ? void 0 : message.direction) === 'outbound'
        ? message.authorUser
        : message.authorEndUserIdentity;
};
/**
 * Prepare forward email message body
 * @param message - message content
 * @param author - author details
 * @param createdAt - created date
 * @param isFromEditor - indicate whether message displaying in editor or interaction space
 * @example
 * ```
 * const forwardedText = createForwardedEmailInHtml(
                message.messageContent.text,
                getMessageAuthor(message),
                message.createdAt,
                isFromEditor
              );
  * ```
  * @returns - forward email content
  */
export const createForwardedEmailInHtml = (message, author, createdAt, isFromEditor = true) => {
    var _a, _b;
    let authorName = '';
    let authorEmail = '';
    if (isEndUserIdentity(author)) {
        authorEmail = author.idOnExternalPlatform;
        authorName = (_a = author === null || author === void 0 ? void 0 : author.fullName) !== null && _a !== void 0 ? _a : '';
    }
    else if (isUser(author)) {
        authorName = `${author.firstName} ${author.surname}`;
        authorEmail = (_b = author.emailAddress) !== null && _b !== void 0 ? _b : '';
    }
    const day = new Date(createdAt);
    return (`${isFromEditor ? '</br></br><div></div><div></div>' : ''}` + // Remove extra space from message while displaying it in interaction space
        '<div>' + BEGIN_FORWARDED_MESSAGE + '</div></br></br>' +
        '<div></div>' +
        '<div></div>' +
        `<div>On ${day.toLocaleDateString('en-us', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        })}, ${authorName} &lt;${authorEmail}&gt; wrote:</div>` +
        '<div></div></br></br>' +
        `<div>${message}<div>`);
};
/**
     * Checks if email address present
     * @param author - author details
     * @example
     * ```
     * isUser(author)
     * ```
     */
export const isUser = (author) => {
    return (author === null || author === void 0 ? void 0 : author.emailAddress) !== undefined;
};
/**
     * Checks if idOnExternalPlatform present
     * @param author - author details
     * @example
     * ```
     * isEndUserIdentity(author)
     * ```
     */
export const isEndUserIdentity = (author) => {
    return (author === null || author === void 0 ? void 0 : author.idOnExternalPlatform) !== undefined;
};
/**
 * Method to update the draft messages into state
 * @param draftMessagePayload - draft message payload
 * @param messageSendStatus - Reply API send status
 * @param selectedDigitalContactDetails - selected contact object
 * @param dispatch - dispatch from redux toolkit
 * @example
 * ```
 * updateDraftMessageIntoState(draftMessagePayload, messageSendStatus, selectedDigitalContactDetails, dispatch)
 * ```
 */
export const updateDraftMessageIntoState = (draftMessagePayload, messageSendStatus, selectedDigitalContactDetails, dispatch) => {
    var _a;
    const payload = Object.assign({}, draftMessagePayload);
    if (messageSendStatus === ReplyAPIStatus.PENDING && ((_a = payload === null || payload === void 0 ? void 0 : payload.replyPayload) === null || _a === void 0 ? void 0 : _a.messageContent)) {
        const draftMessage = getDraftMessage(selectedDigitalContactDetails, payload.replyPayload, payload.traceId || '');
        if (draftMessage && payload) {
            payload.message = draftMessage;
        }
        dispatch(CcfAssignmentAction.addNewDraftMessageToInteraction(payload));
    }
    else if (messageSendStatus === ReplyAPIStatus.SUCCESS) {
        dispatch(CcfAssignmentAction.updateInteractionDraftMessageStatusToSent(payload));
    }
    else if (messageSendStatus === ReplyAPIStatus.ERROR) {
        dispatch(CcfAssignmentAction.removeDraftMessageFromInteractionState(payload));
    }
};
/**
 * Update source links from Attachments
 * also update image source to use the external-link
 *
 * @param src - email content
 * @param attachments - email attachment Array
 *
 * @example updateEmailContentDigitalSource(src, attachments)
 */
export const updateEmailContentDigitalSource = (src, attachments) => {
    var _a, _b, _c, _d;
    const parser = new DOMParser();
    const doc = parser.parseFromString(src, 'text/html');
    const images = doc.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        let attachmentSrc = image === null || image === void 0 ? void 0 : image.src;
        if ((_a = image === null || image === void 0 ? void 0 : image.dataset) === null || _a === void 0 ? void 0 : _a.attachmentId) {
            const attachmentId = image.dataset.attachmentId;
            attachmentSrc = ((_b = attachments === null || attachments === void 0 ? void 0 : attachments.find((attachment) => attachment.id === attachmentId)) === null || _b === void 0 ? void 0 : _b.url) || '';
        }
        image.src = attachmentSrc;
    }
    const hrefs = doc.getElementsByTagName('a');
    const hrefSplit = 'external-link?q=';
    for (let i = 0; i < hrefs.length; i++) {
        const href = decodeURIComponent((_d = (_c = hrefs[i]) === null || _c === void 0 ? void 0 : _c.href) === null || _d === void 0 ? void 0 : _d.split(hrefSplit)[1]);
        if (href.length > 0 && href !== 'undefined') {
            hrefs[i].href = href;
        }
    }
    return doc;
};
/**
 * Method to download file
 * @param fileUrl - file url
 * @param fileName - file name
 * @example
 * ```
 * previewTemplateFile(fileUrl, fileName)
 * ```
 */
export const previewTemplateFile = (fileUrl, fileName) => {
    var _a;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank'; // Open in new tab
    link.rel = 'noopener noreferrer'; // Prevents the new tab from being able to access the window.opener property of the originating tab, improving security
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    (_a = link === null || link === void 0 ? void 0 : link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
};
// Dev Note - This is being used by Copilot to fetch the schema based on the default version specified
export const DEFAULT_CXA_VERSION = '25.4-Agent';
/**
 * Create header line for print view
 * Appends label and text as separate span elements to a container
 * @param container - HTMLElement to append the spans to
 * @param label - Label text to display
 * @param text - Text content to display
 * @example
 * ```
 * createHeaderLine(container, 'From: ', 'user\@example.com')
 * ```
 */
export const createHeaderLine = (container, label, text) => {
    const labelSpan = document.createElement('span');
    labelSpan.innerText = label;
    const textSpan = document.createElement('span');
    textSpan.innerText = text;
    container.appendChild(labelSpan);
    container.appendChild(textSpan);
};
/**
   * Extracts storage data from a StorageEvent or CustomEvent.
   * @param event - StorageEvent or CustomEvent
   * @example - extractStorageData(event)
   * @returns object with key and newValue or null if key is not present
   */
export const extractStorageData = (event) => {
    if (event instanceof StorageEvent) {
        return event.key ? { key: event.key, newValue: event.newValue } : null;
    }
    if (event instanceof CustomEvent) {
        return { key: event.detail.key, newValue: event.detail.newValue };
    }
    return null;
};
//# sourceMappingURL=common.js.map