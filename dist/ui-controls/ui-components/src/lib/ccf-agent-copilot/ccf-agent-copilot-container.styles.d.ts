import { Theme } from '@mui/material';
/**
 * Styling for ccfQuickReplyCard
 * @returns ccfQuickReplyCard CSS properties as a JSON object
 * @example ccfQuickReplyCardStyles(theme)
*/
declare const ccfCopilotCardStyles: (theme: Theme) => {
    copilotContainer: {
        display: string;
        flexDirection: string;
        height: string;
    };
    copilotContainerAgentSearch: {
        display: string;
        flexDirection: string;
        height: string;
    };
    cardsContainer: {
        flex: string;
        overflow: string;
        marginBottom: string;
    };
    copilotCard: {
        boxShadow: string;
        padding: string;
        cursor: string;
        '*': {
            wordBreak: string;
        };
        '.ac-container': {
            borderRadius: string;
        };
        '.ac-image': {
            borderRadius: string;
        };
        '.ac-selectable': {
            borderRadius: string;
            '&:hover': {
                filter: string;
            };
        };
        '#webLinksContainer, #privacyPolicyColumn': {
            '.ac-textBlock': {
                textDecoration: string;
            };
        };
        '#privacyPolicyColumn': {
            '.ac-textBlock': {
                filter: string;
            };
        };
        '#informationBlock': {
            '.ac-image': {
                borderRadius: string;
            };
        };
        '#kbInternalUse, #kbLinks, #kbImages, #kbProcessSteps, #KbPrivateProcessSteps': {
            backgroundColor: string;
            padding: string;
        };
        '#images': {
            '.ac-image': {
                objectFit: string;
            };
        };
        '#transferSummary': {
            '.ac-textBlock': {
                paddingLeft: string;
            };
        };
        '#emailResponseContainer': {
            marginLeft: string;
            marginTop: string;
        };
        '#sparkleIcon': {
            '.ac-image': {
                height: string;
            };
        };
        '#errorMessageContainer': {
            '.ac-textBlock': {
                marginLeft: string;
                color: string;
            };
        };
        '#emailIcon': {
            '.ac-image': {
                height: string;
                Width: string;
            };
        };
        '#generateActionContainer': {
            '.ac-pushButton': {
                height: string;
                width: string;
                color: string;
                fontWeight: string;
                backgroundColor: string;
                border: string;
                borderRadius: string;
                marginTop: string;
                '&:hover': {
                    filter: string;
                };
            };
            '.ac-actionSet': {
                justifyContent: string;
            };
        };
        '#addTopicActionContainer': {
            '.ac-pushButton': {
                height: string;
                width: string;
                background: string;
                fontWeight: string;
                color: string;
                border: string;
                borderRadius: string;
                marginBottom: string;
                '&:hover': {
                    filter: string;
                };
            };
            '.ac-actionSet': {
                justifyContent: string;
            };
        };
        '#stepsContainer': {
            backgroundColor: string;
            padding: string;
            border: string;
        };
        '#customTopics0, #customTopics1, #customTopics2': {
            '.ac-input-container': {
                height: string;
            };
            '.ac-input.ac-textInput': {
                borderRadius: string;
                border: string;
                borderColor: string;
                marginLeft: string;
                paddingLeft: string;
                outline: string;
            };
        };
        '#requiredCompactId': {
            '.ac-input-container': {
                height: string;
                width: string;
                marginBottom: string;
                '&:hover': {
                    filter: string;
                };
            };
            '.ac-input.ac-multichoiceInput.ac-choiceSetInput-compact.ac-input-required': {
                borderRadius: string;
                outline: string;
                borderColor: string;
            };
        };
        '#responseOptionsContainer': {
            '.ac-textBlock': {
                fontSize: string;
                padding: string;
            };
            backgroundColor: string;
            paddingLeft: string;
        };
        '#topicContainer': {
            '.ac-columnSet': {
                marginRight: string;
            };
            '.ac-container': {
                marginBottom: string;
            };
        };
        '#clearButton0, #clearButton1, #clearButton2': {
            '.ac-selectable': {
                background: string;
                border: string;
                marginTop: string;
                paddingRight: string;
                fontWeight: string;
                color: string;
                '&:hover': {
                    filter: string;
                };
            };
            '.ac-actionSet': {
                height: string;
                marginTop: string;
            };
            '.ac-actionSet .ac-pushButton ': {
                height: string;
                width: string;
            };
        };
        '#CustomizeSelectionContainer': {
            marginTop: string;
        };
        '#webLinksTitle, #imagesTitle, #processStepsTitle, #internalUseTitle, #feedbackTopicsContainer, #perSuggestionSubcards, #feedback, #collapseJourneySummaryContainer , #privateProcessStepsTitle': {
            '.ac-image': {
                borderRadius: string;
            };
            '&:hover': {
                filter: string;
            };
            '.ac-selectable': {
                '&:hover': {
                    filter: string;
                };
            };
        };
        '#collapseJourneySummaryContainer': {
            paddingBottom: string;
        };
        '#contactFeedbackCard': {
            '#feedbackLike:hover, #feedbackDislike:hover': {
                filter: string;
            };
            input: {
                border: string;
                borderRadius: string;
                padding: string;
            };
            'input:focus-visible': {
                outline: string;
            };
            '.ac-choiceSetInput-expanded': {
                display: string;
                flexDirection: string;
                flexWrap: string;
                'input[type="radio"]': {
                    display: string;
                };
                label: {
                    cursor: string;
                    userSelect: string;
                    transition: string;
                    padding: string;
                    margin: string;
                    border: string;
                    borderRadius: string;
                    backgroundColor: string;
                    fontSize: string;
                    fontWeight: string;
                    lineHeight: string;
                };
                'input[type="radio"]:checked ~ label': {
                    backgroundColor: string;
                    fontSize: string;
                };
                'label:hover': {
                    backgroundColor: string;
                };
            };
            '.ac-actionSet': {
                justifyContent: string;
            };
            '.ac-actionSet .ac-pushButton ': {
                height: string;
                width: string;
                color: string;
                fontWeight: string;
                background: string;
                border: string;
                borderRadius: string;
                marginTop: string;
                '&:hover': {
                    cursor: string;
                    filter: string;
                };
            };
        };
        '#kbPrivateAnswersIconlist': {
            backgroundColor: string;
            border: string;
            borderTop: string;
            padding: string;
            borderBottomRightRadius: string;
            borderBottomLeftRadius: string;
            paddingRight: string;
            paddingTop: string;
        };
        '#internalUseContainer': {
            padding: string;
        };
        '#privateTitle, #privateDescription': {
            backgroundColor: string;
            border: string;
        };
        '#privateTitle': {
            borderTopRightRadius: string;
            borderTopLeftRadius: string;
            borderBottom: string;
            padding: string;
        };
        '#privateDescription': {
            borderTop: string;
            borderBottom: string;
            padding: string;
        };
        '#privateDescription:first-child, #privateDescription:nth-child(3):not(#internalUseContainer #privateDescription:nth-child(3))': {
            borderTop: string;
            borderTopRightRadius: string;
            borderTopLeftRadius: string;
        };
        '#privateDescription:nth-child(3)': {
            borderTop: string;
            borderTopRightRadius: string;
            borderTopLeftRadius: string;
        };
        '#privateDescription + .ac-horizontal-separator, #privateTitle + .ac-horizontal-separator': {
            padding: string;
            margin: string;
            height: string;
            border: string;
            borderBottom: string;
            borderTop: string;
        };
        '#privateTitle + .ac-horizontal-separator': {
            backgroundColor: string;
            height: string;
        };
        '#privateDescription:not(:has(+ .ac-horizontal-separator))': {
            borderBottom: string;
            borderBottomRightRadius: string;
            borderBottomLeftRadius: string;
        };
        '#kbAnswersIconlist,#kbPrivateAnswersIconlist, .ac-image ac-selectable': {
            display: string;
            justifyContent: string;
            '.ac-container': {
                flex: string;
            };
        };
        '#processStepsTitle, #privateProcessStepsTitle': {
            '.ac-selectable': {
                '&:hover': {
                    filter: string;
                };
            };
        };
        '#feedbackActionContainer': {
            alignItems: string;
            '.ac-pushButton': {
                height: string;
                width: string;
                color: string;
                fontWeight: string;
                background: string;
                border: string;
                borderRadius: string;
                marginTop: string;
                '&:hover': {
                    filter: string;
                };
            };
        };
        '#suggestionsContainer': {
            display: string;
            flexDirection: string;
            flexWrap: string;
            '#suggestion': {
                padding: string;
                margin: string;
                border: string;
                borderRadius: string;
                backgroundColor: string;
            };
        };
        '#buttonContainer': {
            '.ac-pushButton': {
                height: string;
                width: string;
                background: string;
                fontWeight: string;
                color: string;
                border: string;
                borderRadius: string;
                cursor: string;
                '&:hover': {
                    filter: string;
                };
            };
        };
        '#filtersUsedContainer': {
            '#filtersContainer': {
                display: string;
                flexDirection: string;
                flexWrap: string;
                '#filter, #standardFilter': {
                    padding: string;
                    margin: string;
                    border: string;
                    borderRadius: string;
                    backgroundColor: string;
                };
                '#standardFilter': {
                    backgroundColor: string;
                };
            };
        };
        '#expandJourneySummaryContainer': {
            paddingTop: string;
            '#interactionDataContainer': {
                paddingTop: string;
                '#summaryDetailContainers': {
                    backgroundColor: string;
                    borderRadius: string;
                    marginBottom: string;
                    padding: string;
                    '#hideDetailsContainer': {
                        paddingRight: string;
                        '.ac-horizontal-separator': {
                            borderColor: string;
                            marginRight: string;
                        };
                    };
                    '#viewDetailsContainer, #hideDetailsContainer #hideDetailsTitle': {
                        '&:hover': {
                            filter: string;
                        };
                        '.ac-textBlock': {
                            textDecoration: string;
                        };
                    };
                    '.ac-container': {
                        marginLeft: string;
                    };
                };
            };
        };
        '#taskAssist': {
            '.ac-pushButton': {
                padding: string;
                color: string;
                fontWeight: string;
                backgroundColor: string;
                border: string;
                borderRadius: string;
                marginTop: string;
                transition: string;
                '&:hover': {
                    filter: string;
                    cursor: string;
                    backgroundColor: string;
                };
                '&:focus': {
                    outline: string;
                    boxShadow: string;
                };
            };
            '.ac-actionSet': {
                display: string;
                justifyContent: string;
                gap: string;
            };
            '#taskAssistLoading': {
                overflow: string;
                marginLeft: string;
                p: {
                    color: string;
                };
            };
            '#taskResponse': {
                marginLeft: string;
                marginBottom: string;
            };
            '#taskResponse + .targetClass': {
                marginBottom: string;
            };
        };
        '#customCard': {
            padding: string;
        };
        '#customCardLightBlueBackground': {
            backgroundColor: string;
            padding: string;
        };
        '#customCardLightGreenBackground': {
            backgroundColor: string;
            padding: string;
        };
        '#customCardLightRedBackground': {
            backgroundColor: string;
            padding: string;
        };
        '#customCardLightYellowBackground': {
            backgroundColor: string;
            padding: string;
            '.ac-horizontal-separator': {
                display: string;
            };
        };
        '#customCardDefaultBackground': {
            backgroundColor: string;
            padding: string;
            '#customCardloading': {
                overflow: string;
                marginLeft: string;
                p: {
                    color: string;
                };
            };
        };
        '#formCaptureContent': {
            '.ac-pushButton': {
                padding: string;
                color: string;
                fontWeight: string;
                backgroundColor: string;
                border: string;
                borderRadius: string;
                marginTop: string;
                transition: string;
                '&:hover': {
                    filter: string;
                    cursor: string;
                    backgroundColor: string;
                };
                '&:focus': {
                    outline: string;
                    boxShadow: string;
                };
            };
            '.ac-actionSet': {
                display: string;
                justifyContent: string;
                gap: string;
            };
            '.ac-input': {
                padding: string;
                border: string;
                borderRadius: string;
                '&:focus': {
                    outline: string;
                    borderColor: string;
                };
            };
            '.ac-textBlock, .ac-textRun': {
                fontSize: string;
                lineHeight: string;
            };
        };
        '#autoSummaryContainer': {
            '.ac-input': {
                padding: string;
                border: string;
                borderRadius: string;
                '&:focus': {
                    outline: string;
                    borderColor: string;
                };
                height: string;
                fontFamily: import("csstype").Property.FontFamily | undefined;
                fontSize: string;
            };
            '.ac-pushButton': {
                padding: string;
                color: string;
                fontWeight: string;
                backgroundColor: string;
                border: string;
                borderRadius: string;
                marginTop: string;
                transition: string;
                '&:hover': {
                    filter: string;
                    cursor: string;
                    backgroundColor: string;
                };
                '&:focus': {
                    outline: string;
                    boxShadow: string;
                };
            };
            '.ac-actionSet': {
                display: string;
                justifyContent: string;
                gap: string;
            };
        };
    };
    textField: {
        width: string;
        padding: string;
        position: string;
        '& .MuiInputBase-root': {
            background: string;
            borderRadius: string;
            fontWeight: string;
            position: string;
            height: string;
            color: string;
            fontSize: string;
            margin: string;
            backgroundColor: string;
        };
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: string;
        };
        '#searchInput': {
            padding: string;
        };
    };
    searchIcon: {
        transform: string;
        cursor: string;
    };
    copilotContent: {
        color: string;
        border: string;
        margin: string;
        borderRadius: string;
        backgroundColor: string;
    };
    responseContainer: {
        bottom: number;
    };
    responseDiv: {
        padding: string;
        border: string;
        borderRadius: string;
        borderColor: string;
        display: string;
        alignItems: string;
        width: string;
        columnGap: string;
    };
    responseText: {
        fontSize: string;
        lineHeight: string;
        color: string | undefined;
        fontWeight: string;
    };
    line: {
        margin: number;
        border: string;
    };
    nbrSparkle: {
        display: string;
        marginLeft: string;
        marginTop: string;
        flexDirection: string;
        height: string;
        width: string;
    };
    typingIndicator: {
        maxWidth: string;
    };
    kebabMenuBtn: {
        width: string;
        height: string;
        padding: string;
        color: string;
        borderColor: string;
        alignContent: string;
        fontSize: string;
        fontWeight: number;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        background: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    filterIcon: {
        width: string;
        height: string;
        marginBottem: string;
        color: string;
    };
    listBox: {
        '& .MuiPaper-root': {
            border: string;
            '&::-webkit-scrollbar': {
                width: string;
            };
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: string;
                borderRadius: string;
            };
            '&::-webkit-scrollbar-track': {
                backgroundColor: string;
            };
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: string;
            };
        };
    };
    loadMoreButton: {
        color: string | undefined;
        fontSize: string;
        fontWeight: number;
        textDecoration: string;
        cursor: string;
    };
    dropdownOptionsCount: {
        color: string;
        fontSize: string;
        fontWeight: number;
        marginLeft: string;
        lineHeight: string;
        padding: string;
    };
    feedbackCard: {
        display: string;
        alignItems: string;
        marginTop: string;
        marginBottom: string;
    };
    accordionBackground: {
        background: string;
        backgrounRepeat: string;
        backgroundSize: string;
        position: string;
    };
    accordionBox: {
        display: string;
        justifyContent: string;
        width: string;
        alignItems: string;
        gap: number;
    };
    comprehensiveText: {
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        lineHeight: string;
        color: string | undefined;
        fontWeight: string;
    };
    feedbackTagContainer: {
        display: string;
        flexWrap: string;
        gap: number;
        paddingBottom: number;
    };
    feedbackTags: {
        marginRight: number;
        border: string;
        borderRadius: string;
        fontWeight: string;
    };
    comprehensiveFeedbackButton: {
        display: string;
        justifySelf: string;
        width: string;
        background: string;
    };
    feedbackCommentText: {
        background: string;
        '& .MuiInputBase-root': {
            padding: string;
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
            fontWeight: string;
        };
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                    border: string;
                    boxShadow: string;
                };
            };
        };
    };
    feedbackTooltip: {
        backgroundColor: string;
        border: string;
        boxShadow: string;
        padding: string;
        borderRadius: number;
    };
    feedbackTooltipText: {
        fontStyle: string;
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
        textAlign: string;
        color: string | undefined;
    };
    feedbackTooltipArrow: {
        display: string;
    };
    feedbackActionIcons: {
        '&:hover svg path': {
            fill: string;
        };
    };
    summaryContainer: {
        display: string;
        flexDirection: string;
        backgroundColor: string;
        height: string;
        overflowY: string;
    };
    filterIconBadge: {
        '& .MuiBadge-badge': {
            top: number;
            right: number;
            fontSize: string;
            minWidth: string;
            height: string;
        };
    };
    searchWrapper: {
        display: string;
        alignItems: string;
        position: string;
    };
    searchSection: {
        flex: number;
    };
    placeholderSpace: {
        flex: number;
        padding: string;
    };
    taskAssistSection: {
        flexShrink: number;
    };
    popoverButton: {
        position: string;
        top: string;
        right: string;
    };
    formCaptureCardStyle: {
        display: string;
        flexDirection: string;
        position: string;
    };
};
export default ccfCopilotCardStyles;
