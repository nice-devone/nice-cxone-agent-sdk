import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import CcfContactPublicPostContainerStyle from './ccf-contact-public-post-container-styles';
import CcfContactPublicMessage from './ccf-contact-public-message';
import { memo, useRef } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { getAssignmentPanelMetadata, getDigitalContactMessagesByCaseId, getMessagesForSelectedContact, getActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useSelector } from 'react-redux';
/**
 * returns the styled message tree item to display messages in hierarchical tree view.
 * @param props - CcfContactMessageTreeItemProps
 * @example <CcfContactMessagesTree />
 * @returns
 */
const CcfContactMessagesTree = ({ sender }) => {
    var _a;
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('md'));
    const publicPostContainerStyles = CcfContactPublicPostContainerStyle(theme, isSmView);
    const nodes = useRef([]);
    const assignmentPanelDataMetadata = useSelector(getAssignmentPanelMetadata);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const postComments = useSelector(getDigitalContactMessagesByCaseId(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId, assignmentPanelDataMetadata === null || assignmentPanelDataMetadata === void 0 ? void 0 : assignmentPanelDataMetadata.selectedInteractionId));
    const publicChannelMessageTree = useSelector(getMessagesForSelectedContact(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.caseId, assignmentPanelDataMetadata === null || assignmentPanelDataMetadata === void 0 ? void 0 : assignmentPanelDataMetadata.selectedInteractionId));
    const postCommentCount = (postComments === null || postComments === void 0 ? void 0 : postComments.length) ? postComments.length - 1 : 0;
    /**
       * Used to generate the tree nodes and to maintain in the ref so that it can be passed on to the material TreeView to load the structure in all expanded form
       * @returns node string
       * @example -
       * ```
       * createNodeId();
       * ```
       */
    const createNodeId = () => {
        const node = nodes.current.length++;
        nodes.current.push(node.toString());
        return node.toString();
    };
    /**
     * Renders the message tree on Interaction space for Public channel
     * @example renderTraverseMessages()
     */
    const renderTraverseMessages = (message, parentIndex, index, isParentCommentDeleted) => {
        var _a;
        if ((_a = message === null || message === void 0 ? void 0 : message.children) === null || _a === void 0 ? void 0 : _a.length) {
            // @TODO- disabled view more messages functionality for now, which was causing message rendering issue.
            // will enable this in upcoming PR.
            // return message?.toggle !== false
            //   ? traverseMessages(message.children, parentIndex + index.toString())
            //   : <>
            //     <TreeItem nodeId={createNodeId()} label={<CcfContactPublicMessage key={message.children[0].id} message={message.children[0]} styles={publicPostContainerStyles} postCommentCount={postCommentCount} />} ></TreeItem>
            //     {
            //       <CcfShowMore key={index} text={translate('viewMoreMessages')}
            //         onClick={() => dispatch(CcfAssignmentAction.viewMoreMessagesInPublicMessageTree({messageId: message.id}))} />
            //     }
            //   </>
            return traverseMessages(message.children, parentIndex + index.toString(), isParentCommentDeleted);
        }
        return null;
    };
    /**
   * @example traverseMessages
   * @param publicChannelMessageTree - Array<CXonePublicMessage>
   */
    const traverseMessages = (publicChannelMessageTree, parentIndex, isParentCommentDeleted) => {
        const result = publicChannelMessageTree === null || publicChannelMessageTree === void 0 ? void 0 : publicChannelMessageTree.map((message, index) => {
            return (_jsx(TreeItem, Object.assign({ sx: Object.assign(Object.assign({}, publicPostContainerStyles === null || publicPostContainerStyles === void 0 ? void 0 : publicPostContainerStyles.treeItemContainer), publicPostContainerStyles === null || publicPostContainerStyles === void 0 ? void 0 : publicPostContainerStyles.nonRootNodeDivider), nodeId: createNodeId(), label: _jsx(CcfContactPublicMessage, { message: message, styles: publicPostContainerStyles, postCommentCount: postCommentCount, isParentCommentDeleted: isParentCommentDeleted }, message.id) }, { children: renderTraverseMessages(message, parentIndex, index, isParentCommentDeleted) }), message.id));
        });
        return result;
    };
    return (_jsxs(Box, Object.assign({ sx: publicPostContainerStyles.publicPostContentWrapper }, { children: [_jsx(CcfContactPublicMessage, { message: publicChannelMessageTree, styles: publicPostContainerStyles, sender: sender, postCommentCount: postCommentCount }, publicChannelMessageTree.id), 
            // render render public message component for children messages of original post
            (_a = publicChannelMessageTree === null || publicChannelMessageTree === void 0 ? void 0 : publicChannelMessageTree.children) === null || _a === void 0 ? void 0 : _a.map((message, index) => {
                var _a;
                const isParentCommentDeleted = postComments ? (_a = postComments.find(msg => msg.id === message.id)) === null || _a === void 0 ? void 0 : _a.isDeletedOnExternalPlatform : message.isDeletedOnExternalPlatform;
                return (_jsx(TreeView, Object.assign({ sx: publicPostContainerStyles.treeContent, "aria-label": "customized", expanded: nodes.current, disableSelection: true }, { children: _jsx(TreeItem, Object.assign({ sx: Object.assign(Object.assign({}, publicPostContainerStyles === null || publicPostContainerStyles === void 0 ? void 0 : publicPostContainerStyles.treeItemContainer), publicPostContainerStyles === null || publicPostContainerStyles === void 0 ? void 0 : publicPostContainerStyles.rootNodeDivider), nodeId: createNodeId(), label: _jsx(CcfContactPublicMessage, { message: message, styles: publicPostContainerStyles, postCommentCount: postCommentCount, isParentCommentDeleted: isParentCommentDeleted }, message.id) }, { children: message.children
                            ? traverseMessages(message.children, index.toString(), isParentCommentDeleted)
                            : null })) }), message.id));
            })] })));
};
export default memo(CcfContactMessagesTree);
//# sourceMappingURL=ccf-contact-messages-tree.js.map