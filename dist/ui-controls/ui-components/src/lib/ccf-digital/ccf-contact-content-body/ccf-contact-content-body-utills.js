import { uuid } from 'uuidv4';
/**
 * generates UUIDs for number of attachments
 * @param attachments - CXoneAttachmentArray
 * @example  getUUIds(attachments)
 * @returns uuidList
 */
export const generateUUIdsForInlineAttachment = (attachments) => {
    const uuidList = [];
    if (attachments && attachments.length > 0) {
        for (const attachment of attachments) {
            if (attachment.isInline) {
                uuidList.push(uuid());
            }
        }
    }
    return uuidList;
};
/**
 * updates the src of inline images with attachment id
 * @param msgContent - HTML of email content in string format
 * @param uuidList - string array with UUID values.
 * @example  modifyMessageContentInlineImgIds(item)
 * @returns domString - modifiedHTML of email content in string format
 */
export const modifyMessageContentInlineImgIds = (msgContent, uuidList) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(msgContent, 'text/html');
    Array.from(dom.images).forEach((image, index) => {
        image.src = `attachmentId:${uuidList[index]}`;
    });
    const domString = new XMLSerializer().serializeToString(dom);
    return domString;
};
//# sourceMappingURL=ccf-contact-content-body-utills.js.map