const RESTRICT_MESSAGE_LEVEL_UPTO = 4;
/**
 * Sort messages by createdAt
 * @returns
 * @example const messages = sortByCreatedDate(messageArr);
 */
function sortByCreatedDate(collection) {
    return collection === null || collection === void 0 ? void 0 : collection.slice().sort((current, next) => {
        if (current.createdAt > next.createdAt) {
            return 1;
        }
        if (current.createdAt < next.createdAt) {
            return -1;
        }
        return 0;
    });
}
/**
* this function will sort the children of each message in the tree by createdAt
 * @example sortChildMessagesByCreatedDate(parent)
 * @param parent - message object after creatting message tree
 */
function sortChildMessagesByCreatedDate(parent) {
    var _a, _b;
    if (!(parent === null || parent === void 0 ? void 0 : parent.children) || ((_a = parent === null || parent === void 0 ? void 0 : parent.children) === null || _a === void 0 ? void 0 : _a.length) === 0)
        return;
    // Sort current level's children
    if (parent === null || parent === void 0 ? void 0 : parent.children) {
        parent.children = sortByCreatedDate(parent.children);
    }
    // Recurse into each child
    (_b = parent === null || parent === void 0 ? void 0 : parent.children) === null || _b === void 0 ? void 0 : _b.forEach(sortChildMessagesByCreatedDate);
}
/**
 * @example getParentChildMessageTree
 * @param messages - CXoneMessageArray
 */
export function getParentChildMessageTree(messages) {
    // message having replyToMessage as null will be original post
    const originalPost = Object.assign({}, messages === null || messages === void 0 ? void 0 : messages.find((currentMessage) => currentMessage.replyToMessage === null));
    const messagesSortedByCreatedDate = sortByCreatedDate(messages);
    const parent = Object.assign(Object.assign({}, originalPost), { children: [] });
    // get all children's of original post
    createMessagesTree(messagesSortedByCreatedDate, parent);
    // Once all messages are created in tree its children will be in random order so we will sort them by createdAt
    sortChildMessagesByCreatedDate(parent);
    /**
    * @example createMessagesTree
    * @param messages - CXoneMessageArray
    */
    function createMessagesTree(messages, parent, messageLevel = 0, childMessage) {
        if (parent) {
            if (messages === null || messages === void 0 ? void 0 : messages.length) {
                messageLevel++;
                messages.forEach((currentMessage) => {
                    var _a, _b, _c, _d, _e;
                    if (!childMessage ? parent.id === ((_a = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.replyToMessage) === null || _a === void 0 ? void 0 : _a.id) : (childMessage === null || childMessage === void 0 ? void 0 : childMessage.id) === ((_b = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.replyToMessage) === null || _b === void 0 ? void 0 : _b.id)) {
                        // in case of child message after 4th level we need to compare currenrtMessage id with passed childMessage id from recursion
                        if (parent.id === ((_c = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.replyToMessage) === null || _c === void 0 ? void 0 : _c.id) || ((_d = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.replyToMessage) === null || _d === void 0 ? void 0 : _d.id) === (childMessage === null || childMessage === void 0 ? void 0 : childMessage.id)) {
                            let message = Object.assign(Object.assign({}, currentMessage), { children: [] });
                            const msgArray = messages.filter((message) => message.id !== currentMessage.id);
                            // if child message hierachy is >=4 then push all the message from this level into 3rd messageLevel parent
                            if (messageLevel >= RESTRICT_MESSAGE_LEVEL_UPTO) {
                                createMessagesTree(msgArray, parent, messageLevel, message);
                            }
                            else {
                                createMessagesTree(msgArray, message, messageLevel);
                            }
                            if (messageLevel === 2) {
                                message = Object.assign(Object.assign({}, message), { toggle: false });
                                // currentMessage.toggle = false;// to have the view more toggle
                            }
                            (_e = parent === null || parent === void 0 ? void 0 : parent.children) === null || _e === void 0 ? void 0 : _e.push(message);
                        }
                    }
                });
                messageLevel--;
            }
        }
    }
    return parent;
}
/**
 * @example getParentChildMap
 * @param messageList - CXoneMessageArray
 *  on initial load of messages we will be calling this and storing parent child map in store
 */
export function getParentChildMap(messageList) {
    // returns map where key is parent and value is array of children
    const initialMap = new Map();
    return messageList === null || messageList === void 0 ? void 0 : messageList.reduce((map, currentItem) => {
        var _a;
        const id = currentItem === null || currentItem === void 0 ? void 0 : currentItem.id;
        const replyToMessage = (_a = currentItem === null || currentItem === void 0 ? void 0 : currentItem.replyToMessage) === null || _a === void 0 ? void 0 : _a.id;
        if (replyToMessage) {
            if (!map.get(replyToMessage)) {
                map.set(replyToMessage, []);
            }
            const childMessagesList = map.get(replyToMessage);
            map.set(replyToMessage, [...childMessagesList, id]);
        }
        return map;
    }, initialMap);
}
/**
 * @example addNewMessageIntoMap
 * @param message - CXoneMessage
 * @param flatParentChildMap - map of exisiting parent child messages
 * whenever we receive new message on WS we will add its entry into exisiting messages map
 */
export function addNewMessageIntoMap(newMessage, flatParentChildMap) {
    var _a;
    if (flatParentChildMap) {
        const newMessageId = newMessage === null || newMessage === void 0 ? void 0 : newMessage.id;
        const replyToMessage = (_a = newMessage === null || newMessage === void 0 ? void 0 : newMessage.replyToMessage) === null || _a === void 0 ? void 0 : _a.id;
        if (replyToMessage) {
            const keys = Array.from(flatParentChildMap.keys());
            // if replyToMessage id exists in map keys that means its reply to existing message so we will set
            // it against map entry else its new message which we will set with empty child array
            if (keys.includes(replyToMessage)) {
                const childMessagesList = flatParentChildMap.get(replyToMessage);
                flatParentChildMap.set(replyToMessage, [...childMessagesList, newMessageId]);
            }
            else {
                flatParentChildMap.set(replyToMessage, [newMessageId]);
            }
        }
        else {
            flatParentChildMap.set(newMessageId, []);
        }
    }
    return flatParentChildMap;
}
/**
 * @example getNewCommentPath
 * @param commentId - id of message for which we need to find path in tree
 * @param replyToMessage - id of parent message
 * @param flatParentChildMap - map of exisiting parent child messages
 */
export function getNewCommentPath(_commentId, replyToMessage, flatParentChildMap) {
    let path = [];
    if (flatParentChildMap) {
        const keys = Array.from(flatParentChildMap.keys());
        if (keys.includes(replyToMessage)) {
            path.push(replyToMessage);
        }
        // iterate over messageList and check for replyToMessage
        const flatParentChildMapIterator = flatParentChildMap[Symbol.iterator]();
        for (const item of flatParentChildMapIterator) {
            // item[0] => id of parent messages
            // item[1] => id's of all child messages
            if (item[1].includes(replyToMessage)) {
                path = [...path, ...getNewCommentPath(replyToMessage, item[0], flatParentChildMap)];
            }
        }
    }
    return path;
}
//# sourceMappingURL=ccf-contact-public-post-helper.js.map