import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import parse, { domToReact } from 'html-react-parser';
import { Box, Divider, IconButton, Link, Modal, Stack, useTheme } from '@mui/material';
import CcfDigitalEmailV2MessagesStyles from './ccf-digital-email-v2-messages.style';
import Close from '@mui/icons-material/Close';
import { Translate as TranslateIcon, Circle as CircleIcon } from '@mui/icons-material';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { DigitalContactDirection } from '@nice-devone/common-sdk';
import { CcfBox, useTranslator, CcfTooltip, DividerOrientation, DividerVariant, CcfDivider } from '@nice-devone/ui-controls';
import { useSelector } from 'react-redux';
import { getTranslatedMessagesByCaseId } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfContactMessageNote from '../../ccf-contact-message-note/ccf-contact-message-note';
import CcfDigitalV2Attachments from '../ccf-digital-email-V2-attachments/ccf-digital-email-v2-attachments';
import { debounce } from '../../../../hooks/useDebounce';
import { updateEmailContentDigitalSource } from '../../../../util/common';
import { isFeatureEnabled } from '../../../../util/featureToggleUtils';
import { RICH_MESSAGE_TYPES } from '../../../ccf-app-space/ccf-app-space.slice';
/**
 * Component to render all email individual messages on Interaction Space in Revamped format
 * @returns Email Messages in revamped format
 * ```
 * @example
 * <CcfDigitalEmailV2Messages/>
 * ```
  */
export function CcfDigitalEmailV2Messages(props) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { message, digitalContactDetails, translationSettings, channelType, caseId, isSingleMessage, messageAnalysis, isPreviousCaseMessage, isNextCaseMessage } = props;
    const theme = useTheme();
    const [translate] = useTranslator();
    const [isExpanded, setIsExpanded] = useState(false);
    const isRichText = RICH_MESSAGE_TYPES.includes((_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.type);
    const [isPreviewImageClicked, setPreviewImageClicked] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [translationToggle, setTranslationToggle] = useState(false);
    const isContentRemoved = Boolean((message === null || message === void 0 ? void 0 : message.contentRemoved) !== null);
    const prevOrNextMessage = isPreviousCaseMessage || isNextCaseMessage;
    const showMoreLess = (!isSingleMessage && ((messageAnalysis === null || messageAnalysis === void 0 ? void 0 : messageAnalysis.moreThanThreeLines) || !(messageAnalysis === null || messageAnalysis === void 0 ? void 0 : messageAnalysis.onlyTextInFirstThreeLines)) && !isContentRemoved) || prevOrNextMessage;
    const styles = CcfDigitalEmailV2MessagesStyles(theme, isExpanded, !!showMoreLess);
    const emptyPRegex = /(<p[^>]*>((\s|&nbsp;|<br\s*\/?>)*)<\/p>\s*)+$/gi;
    const originalMessageTrimmed = message.messageContent.text.replace(emptyPRegex, '');
    const isInboundDirection = (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND;
    const isOutboundDirection = (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.OUTBOUND;
    const seeTranslationLinkText = isInboundDirection ? translate('seeOriginal') : translate('seeTranslation');
    const hideTranslationLinkText = isInboundDirection ? translate('hideOriginal') : translate('hideTranslation');
    const toggleTranslateLinkText = translationToggle ? hideTranslationLinkText : seeTranslationLinkText;
    const isEmailRenderV2ToggleEnabled = isFeatureEnabled("release-cx-agent-email-rendering-AW-37207" /* FeatureToggles.EMAIL_RENDERING_FEATURE_TOGGLE */);
    const iframeRefs = useRef({});
    const containerRef = useRef(null);
    if (isEmailRenderV2ToggleEnabled) {
        const updatedDoc = updateEmailContentDigitalSource(message.messageContent.text, message === null || message === void 0 ? void 0 : message.attachments);
        message.messageContent.text = updatedDoc.documentElement.innerHTML;
    }
    const translatedMessagesArray = useSelector(getTranslatedMessagesByCaseId(digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.caseId, digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.interactionId));
    const translatedMessageText = ((_b = translatedMessagesArray.find((msg) => msg.id === message.id)) === null || _b === void 0 ? void 0 : _b.translatedMessage) || '';
    const customerLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage) ? Object.values(translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage)[0] : '';
    const previewOnlyChannels = ['ig']; // List of channels for which only preview of attachment will be allowed (due to external CDN link)
    const ccfLogger = new CcfLogger('App.consumer', 'App.CcfContactContentBody');
    /**
     * Finds all images within an iframe document.
     * @param iframeDocument - The iframe document to search for images.
     * @returns Array of image elements found in the iframe.
     * @example findImagesInIframe(iframeDocument)
     */
    const findImagesInIframe = (iframeDocument) => {
        const images = iframeDocument.querySelectorAll('img');
        return images ? Array.from(images) : [];
    };
    /**
     * Adds click event listeners to images for preview functionality.
     * @param images - Array of image elements to attach listeners to.
     * @param messageId - The ID of the message containing these images.
     * @example addImageClickListeners(images, messageId)
     */
    const addImageClickListeners = (images, messageId) => {
        if (!messageId) {
            ccfLogger.error('addImageClickListeners', 'messageId is null, undefined, or empty. Skipping listener attachment.');
            return;
        }
        images.forEach((img) => {
            if (img.getAttribute('data-click-listener-added') === 'true') {
                return;
            }
            img.style.cursor = 'pointer';
            img.setAttribute('data-click-listener-added', 'true');
            img.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = img.src || img.getAttribute('src');
                const imgAlt = img.alt || 'Image';
                window.parent.postMessage({ type: 'imageClicked', imageSrc: imgSrc, imageAlt: imgAlt, messageId: messageId }, '*');
            });
        });
    };
    /**
     * Processes all email iframe elements to add image click handlers.
     * @example processEmailFramesForImageHandlers()
     */
    const processEmailFramesForImageHandlers = () => {
        const allEmailFrames = document.querySelectorAll('iframe.email-frame');
        allEmailFrames.forEach((frame) => {
            var _a;
            const emailFrame = frame;
            const messageId = emailFrame.getAttribute('data-message-id');
            const iframeDocument = (_a = emailFrame.contentWindow) === null || _a === void 0 ? void 0 : _a.document;
            if (iframeDocument && messageId) {
                const images = findImagesInIframe(iframeDocument);
                addImageClickListeners(images, messageId);
            }
        });
    };
    /**
     * Handles the iframe load event and sets its height dynamically based on its content.
     * @param messageId - The ID of the message whose iframe has loaded.
     * @example onIframeLoad(messageId)
     */
    const onIframeLoad = (messageId) => {
        var _a, _b, _c;
        const iframe = iframeRefs.current[messageId];
        if (!iframe) {
            return;
        }
        let scrollHeight;
        try {
            scrollHeight = (_c = (_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.scrollHeight;
        }
        catch (error) {
            ccfLogger.error('onIframeLoad', `Error - Unable to access iframe content: ${error}`);
            scrollHeight = undefined;
        }
        if (scrollHeight !== undefined) {
            iframe.style.height = `${scrollHeight + 48}px`; // add height to avoid vertical scroll
        }
        processEmailFramesForImageHandlers();
    };
    /**
     * Handles messages received from iframes.
     * @param event - image open message
     * @example handleMessage(event)
     */
    const handleMessage = useCallback((event) => {
        if (event.data.type === 'imageClicked' && event.data.messageId === message.id) {
            setImageUrl(event.data.imageSrc);
            setImageAlt(event.data.imageAlt);
            setPreviewImageClicked(true);
        }
    }, [message.id]);
    useEffect(() => {
        if (isEmailRenderV2ToggleEnabled) {
            const observer = new ResizeObserver(debounce(() => {
                Object.keys(iframeRefs.current).map((key) => onIframeLoad(key));
            }, 100));
            if (containerRef.current) {
                observer.observe(containerRef.current);
            }
            window.addEventListener('message', handleMessage);
            return () => {
                observer.disconnect();
                window.removeEventListener('message', handleMessage);
            };
        }
        else {
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEmailRenderV2ToggleEnabled]);
    /***
     * Function to handle the message expand and collapse functionality
     * @returns null
     * @example handleMessageExpand()
     */
    const handleMessageExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const parseHtmlOptions = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        replace: (domNode) => {
            var _a, _b, _c, _d, _e;
            try {
                if ((domNode === null || domNode === void 0 ? void 0 : domNode.type) === 'tag') {
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'img') {
                        const { alt, src } = domNode.attribs;
                        const attachmentId = (domNode.attribs['data-attachment-id']);
                        const currentImagePreviewUrl = (attachmentId) ? (_b = (_a = message === null || message === void 0 ? void 0 : message.attachments) === null || _a === void 0 ? void 0 : _a.find((attachment) => attachment.id === attachmentId)) === null || _b === void 0 ? void 0 : _b.previewUrl : src !== null && src !== void 0 ? src : '';
                        const currentImageActualUrl = (attachmentId) ? (_d = (_c = message === null || message === void 0 ? void 0 : message.attachments) === null || _c === void 0 ? void 0 : _c.find((attachment) => attachment.id === attachmentId)) === null || _d === void 0 ? void 0 : _d.url : src !== null && src !== void 0 ? src : '';
                        return _jsx(Box, Object.assign({ onClick: () => { setPreviewImageClicked(true); setImageUrl(currentImageActualUrl); } }, { children: _jsx("img", { src: currentImagePreviewUrl, alt: alt, style: styles.inlineBodyAttachment, "data-attachmentId": attachmentId }) }));
                    }
                    // large outlook email get renders in table format which need below style to display properly
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'table') {
                        domNode.attribs.style = domNode.attribs.style + 'display: table; width:100%; tableLayout: auto; border-collapse: collapse';
                    }
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'td') {
                        domNode.attribs.style = domNode.attribs.style + 'word-break: auto-phrase;';
                    }
                    if ((domNode === null || domNode === void 0 ? void 0 : domNode.name) === 'a' && ((_e = domNode === null || domNode === void 0 ? void 0 : domNode.attribs) === null || _e === void 0 ? void 0 : _e.href)) {
                        const href = domNode.attribs.href.split('external-link?q=').length
                            && decodeURIComponent(domNode.attribs.href.split('external-link?q=')[1]);
                        return (_jsx(CcfTooltip, Object.assign({ title: href }, { children: _jsx("a", Object.assign({ target: '_blank', href: href, rel: "noreferrer" }, { children: domToReact(domNode === null || domNode === void 0 ? void 0 : domNode.children, parseHtmlOptions) })) })));
                    }
                }
                return domNode;
            }
            catch (error) {
                ccfLogger.error('parseHtmlOptions', `error while parsing html options - ${JSON.stringify(error)}`);
            }
        },
    };
    /**
       * Display translated message
       * @param props - none
       * @example renderTranslatedMessage()
       */
    const renderTranslatedMessage = (isRichText, fallbackText, originalMessage) => {
        let content;
        if (isEmailRenderV2ToggleEnabled) {
            content = renderEmailIframe(message, isRichText ? fallbackText : originalMessage, message.title + ' - ' + translate('translatedMessage'));
        }
        else if (isRichText) {
            content = _jsx("span", { children: fallbackText });
        }
        else {
            content = _jsx("span", { children: parse(originalMessage, parseHtmlOptions) });
        }
        return (_jsxs(Stack, Object.assign({ sx: styles.translatedMessage }, { children: [_jsx(Divider, { orientation: "vertical", sx: styles.divider }), _jsx(Box, Object.assign({ sx: { paddingLeft: '.5em', width: '100%' } }, { children: content }))] })));
    };
    /**
     * Handle the toggle of the translated message
     * @param props - none
     * @example handleTranslationToggle()
     */
    const handleTranslationToggle = (translationToggle, isInboundDirection, isTranslateCustomerMessages, translatedMessageText, messageContent) => {
        setTranslationToggle(!translationToggle);
        if (translationToggle && isInboundDirection && isTranslateCustomerMessages) {
            return translatedMessageText;
        }
        else {
            return messageContent;
        }
    };
    /**
       * Display translation toggle row
       * @param toggleTranslateLinkText -
       * @param isInboundDirection -
       * @param translatedMessageText -
       * @param messageContentText -
       * @example renderTranslationToggleRow(toggleTranslateLinkText, isInboundDirection, translatedMessageText, messageContentText)
       */
    const renderTranslationToggleRow = (toggleTranslateLinkText, isInboundDirection, customerLanguage, translatedMessageText, messageContentText) => {
        return (_jsxs(Stack, Object.assign({ alignItems: 'center', direction: 'row' }, { children: [_jsx(TranslateIcon, { sx: styles.translateIcon }), _jsx(Link, Object.assign({ sx: { cursor: 'pointer' }, underline: 'hover', onClick: () => handleTranslationToggle(translationToggle, isInboundDirection, translationSettings.isTranslateCustomerMessages, translatedMessageText, messageContentText) }, { children: toggleTranslateLinkText })), _jsx(CircleIcon, { sx: styles.circleIcon }), _jsx("span", { children: customerLanguage })] })));
    };
    /**
       * Render iframe for message content
       * @example renderEmailIframe(message, 'email source')
       * @returns iframe element with message content
       */
    const renderEmailIframe = (message, src, title) => {
        var _a, _b;
        const date = new Date(message.createdAt);
        const createDate = date.toLocaleString();
        const subject = (message === null || message === void 0 ? void 0 : message.title) || '';
        let recipients = '';
        if (message.direction === DigitalContactDirection.INBOUND) {
            recipients = ((_a = message === null || message === void 0 ? void 0 : message.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.idOnExternalPlatform) || '';
        }
        else {
            recipients = ((_b = message === null || message === void 0 ? void 0 : message.recipients) === null || _b === void 0 ? void 0 : _b.map(recipient => recipient.idOnExternalPlatform).join(', ')) || '';
        }
        return (_jsx(Box, { children: _jsx("iframe", { id: "contentFrame", className: "email-frame", "data-caseid": digitalContactDetails.caseId, "data-createdate": createDate, "data-direction": message.direction, "data-recipients": recipients, "data-subject": subject, "data-message-id": message.id, onLoad: () => onIframeLoad(message.id), ref: (el) => (iframeRefs.current[message.id] = el), style: styles.emailIframe, srcDoc: src, title: title }) }));
    };
    /**
       * Render main message content
       * @example renderMainMessageContent(message, index, isInboundDirection)
       * @returns message content
       */
    const renderMainMessageContent = (message, translatedMessage, messageDirection) => {
        var _a, _b, _c, _d;
        const renderText = isRichText ? (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.fallbackText : (_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.text;
        if (isEmailRenderV2ToggleEnabled) {
            if ((messageDirection === DigitalContactDirection.INBOUND && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages)) ||
                (messageDirection === DigitalContactDirection.OUTBOUND && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages))) {
                return renderEmailIframe(message, translatedMessage, message === null || message === void 0 ? void 0 : message.title);
            }
            else {
                return renderEmailIframe(message, renderText, message === null || message === void 0 ? void 0 : message.title);
            }
        }
        else {
            if ((messageDirection === DigitalContactDirection.INBOUND && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages)) ||
                (messageDirection === DigitalContactDirection.OUTBOUND && (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages))) {
                return _jsx("span", { children: parse(translatedMessage, parseHtmlOptions) });
            }
            else {
                if (isRichText) {
                    return _jsx("span", { children: (_c = message === null || message === void 0 ? void 0 : message.messageContent) === null || _c === void 0 ? void 0 : _c.fallbackText });
                }
                else {
                    return _jsx("span", { children: parse((_d = message === null || message === void 0 ? void 0 : message.messageContent) === null || _d === void 0 ? void 0 : _d.text, parseHtmlOptions) });
                }
            }
        }
    };
    return (_jsxs(_Fragment, { children: [(message === null || message === void 0 ? void 0 : message.attachments) && ((_c = message === null || message === void 0 ? void 0 : message.attachments) === null || _c === void 0 ? void 0 : _c.length) > 0 && !isContentRemoved && _jsx(Box, Object.assign({ component: 'div', sx: { paddingLeft: '0.938rem', marginLeft: '2.625rem' } }, { children: _jsx(CcfDigitalV2Attachments, { attachments: message === null || message === void 0 ? void 0 : message.attachments, hideDownload: (channelType &&
                        previewOnlyChannels &&
                        previewOnlyChannels.indexOf(channelType) > -1 &&
                        (message === null || message === void 0 ? void 0 : message.direction) === DigitalContactDirection.INBOUND) || (isPreviousCaseMessage || isNextCaseMessage)
                        ? true
                        : false, channelType: channelType, messageSubject: message.title, caseId: caseId, isInboundDirection: isInboundDirection }) })), _jsxs(Box, Object.assign({ component: "div", sx: Object.assign(Object.assign({}, styles.boxContainer), { display: 'flex', flexDirection: 'column' }), ref: containerRef }, { children: [_jsxs(Box, Object.assign({ component: "span", sx: { flexGrow: 1 } }, { children: [isContentRemoved ? _jsx(CcfBox, Object.assign({ component: 'span', style: styles.deleteContent }, { children: translate('contentDeleted') })) : renderMainMessageContent(message, translatedMessageText, message.direction), ((message.direction === DigitalContactDirection.INBOUND && translationSettings.isTranslateCustomerMessages) ||
                                (message.direction === DigitalContactDirection.OUTBOUND && translationSettings.isTranslateAgentMessages)) &&
                                translationToggle &&
                                renderTranslatedMessage(isRichText, (_d = message === null || message === void 0 ? void 0 : message.messageContent) === null || _d === void 0 ? void 0 : _d.fallbackText, originalMessageTrimmed), isInboundDirection && translationSettings.isTranslateCustomerMessages && renderTranslationToggleRow(toggleTranslateLinkText, isInboundDirection, customerLanguage, translatedMessageText, (_e = message.messageContent) === null || _e === void 0 ? void 0 : _e.text), isOutboundDirection && translationSettings.isTranslateAgentMessages && renderTranslationToggleRow(toggleTranslateLinkText, isInboundDirection, customerLanguage, translatedMessageText, (_f = message.messageContent) === null || _f === void 0 ? void 0 : _f.text)] })), showMoreLess && _jsx(Box, Object.assign({ component: "p", tabIndex: 0, "aria-label": isExpanded ? translate('collapseMessageAria') : translate('expandMessageAria'), role: "button", onClick: handleMessageExpand, onKeyDown: (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                handleMessageExpand();
                            }
                        }, sx: styles.moreLessContainer }, { children: !isExpanded ? translate('expandMessage') : translate('collapseMessage') }))] })), _jsx(Modal, Object.assign({ open: isPreviewImageClicked, onClose: () => setPreviewImageClicked(false), "aria-labelledby": "modal-insert-table", "aria-describedby": "modal-table-data" }, { children: _jsx(Box, Object.assign({ onClick: () => setPreviewImageClicked(false), style: { width: '100%', height: '100%' } }, { children: _jsxs(Box, { children: [_jsx(Box, Object.assign({ sx: styles.closeButtonColumn }, { children: _jsx(IconButton, Object.assign({ "aria-label": "close", onClick: () => setPreviewImageClicked(false) }, { children: _jsx(Close, { fontSize: "small" }) })) })), _jsx(Box, Object.assign({ sx: styles.imgcontainer }, { children: _jsx("img", { src: imageUrl, style: styles.inlineBodyAttachmentI, alt: imageAlt }) }))] }) })) })), (_g = message === null || message === void 0 ? void 0 : message.messageNotes) === null || _g === void 0 ? void 0 : _g.map(msgNote => _jsxs(Box, Object.assign({ component: 'div', sx: message.direction === DigitalContactDirection.OUTBOUND ? {} : {} }, { children: [_jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: styles.notesDivider }), _jsx(CcfContactMessageNote, { messageId: msgNote.message.id, userDetails: msgNote.user, isReadOnly: true, noteContent: msgNote.content, direction: message.direction, noteId: msgNote.id, updatedAt: msgNote.updatedAt, isEmailNote: true })] }), msgNote.id))] }));
}
export default memo(CcfDigitalEmailV2Messages);
//# sourceMappingURL=ccf-digital-email-v2-messages.js.map