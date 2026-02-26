import { CcfAnimatedEllipsisControlStyles } from '@nice-devone/ui-controls';
/**
 * Styling for ccfQuickReplyCard
 * @returns ccfQuickReplyCard CSS properties as a JSON object
 * @example ccfQuickReplyCardStyles(theme)
*/
const ccfCopilotCardStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166;
    const borderStyle = `0.063rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.copilotCardContent}  !important`;
    const loadingStyles = CcfAnimatedEllipsisControlStyles(theme);
    const dotElastic = Object.assign({}, loadingStyles.dotElastic);
    const popoverButton = {
        position: 'absolute',
        top: '0.5rem',
        right: '-1rem',
    };
    const formCaptureCardStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    };
    const cancelButton = {
        '.ac-pushButton': {
            padding: '0.5rem 1rem',
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.white,
            fontWeight: '600',
            backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.main,
            border: `0.063rem solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.copilotAddButton}`,
            borderRadius: '0.125rem',
            marginTop: '0.313rem !important',
            transition: 'background-color 0.2s ease',
            '&:hover': {
                filter: 'none',
                cursor: 'pointer',
                backgroundColor: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.primary) === null || _k === void 0 ? void 0 : _k.dark}`,
            },
            '&:focus': {
                outline: 'none',
                boxShadow: `0 0 0 0.125rem ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.light}`,
            },
        },
        '.ac-actionSet': {
            display: 'flex',
            justifyContent: 'flex-end !important',
            gap: '0.5rem',
        },
    };
    const styles = {
        copilotContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        copilotContainerAgentSearch: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 0.1rem)',
        },
        cardsContainer: {
            flex: '1',
            overflow: 'auto',
            marginBottom: '0.625rem',
        },
        copilotCard: {
            boxShadow: 'none',
            padding: '0.625rem 0.75rem 0.625rem 0.625rem',
            cursor: 'pointer',
            '*': {
                wordBreak: 'break-word',
            },
            '.ac-container': {
                borderRadius: '6px',
            },
            '.ac-image': {
                borderRadius: '6px',
            },
            '.ac-selectable': {
                borderRadius: '0',
                '&:hover': {
                    filter: 'invert(28%) sepia(93%) saturate(1435%) hue-rotate(176deg) brightness(98%) contrast(101%)',
                },
            },
            '#webLinksContainer, #privacyPolicyColumn': {
                '.ac-textBlock': {
                    textDecoration: 'underline',
                },
            },
            '#privacyPolicyColumn': {
                '.ac-textBlock': {
                    filter: 'invert(28%) sepia(93%) saturate(1435%) hue-rotate(176deg) brightness(98%) contrast(101%)',
                },
            },
            '#informationBlock': {
                '.ac-image': {
                    borderRadius: '0',
                },
            },
            '#kbInternalUse, #kbLinks, #kbImages, #kbProcessSteps, #KbPrivateProcessSteps': {
                backgroundColor: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.copilotCardBackground,
                padding: '15px !important',
            },
            '#images': {
                '.ac-image': {
                    objectFit: 'cover',
                },
            },
            '#transferSummary': {
                '.ac-textBlock': {
                    paddingLeft: '1.438rem !important',
                },
            },
            '#emailResponseContainer': {
                marginLeft: '0.625rem !important',
                marginTop: '0.313rem !important',
            },
            '#sparkleIcon': {
                '.ac-image': {
                    height: '1.063rem !important',
                },
            },
            '#errorMessageContainer': {
                '.ac-textBlock': {
                    marginLeft: '0.375rem',
                    color: `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.callControls} !important`,
                },
            },
            '#emailIcon': {
                '.ac-image': {
                    height: '0.9rem !important',
                    Width: '0.875rem !important',
                },
            },
            '#generateActionContainer': {
                '.ac-pushButton': {
                    height: '1.75rem',
                    width: '6rem',
                    color: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.white,
                    fontWeight: '600',
                    backgroundColor: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.copilotAddButton,
                    border: `1px solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.copilotAddButton}`,
                    borderRadius: '0.25rem',
                    marginTop: '0.313rem !important',
                    '&:hover': {
                        filter: 'none',
                    },
                },
                '.ac-actionSet': {
                    justifyContent: 'flex-end !important',
                },
            },
            '#addTopicActionContainer': {
                '.ac-pushButton': {
                    height: '1.75rem',
                    width: '6rem',
                    background: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.white,
                    fontWeight: '600',
                    color: `${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.clearText} !important`,
                    border: `1px solid ${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.digitalTag}`,
                    borderRadius: '0.25rem',
                    marginBottom: '0.5rem',
                    '&:hover': {
                        filter: 'none',
                    },
                },
                '.ac-actionSet': {
                    justifyContent: 'flex-start !important',
                },
            },
            '#stepsContainer': {
                backgroundColor: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.text) === null || _5 === void 0 ? void 0 : _5.white,
                padding: '0.625rem !important',
                border: `0.063rem solid ${(_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.copilotCardContent}`,
            },
            '#customTopics0, #customTopics1, #customTopics2': {
                '.ac-input-container': {
                    height: '2rem !important',
                },
                '.ac-input.ac-textInput': {
                    borderRadius: '0.25rem  !important',
                    border: '1px solid',
                    borderColor: (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.background) === null || _9 === void 0 ? void 0 : _9.copilotGenerateButton,
                    marginLeft: '0.438rem !important',
                    paddingLeft: '0.875rem',
                    outline: 'none',
                },
            },
            '#requiredCompactId': {
                '.ac-input-container': {
                    height: '2.25rem',
                    width: '14.813rem !important',
                    marginBottom: '0.5rem !important',
                    '&:hover': {
                        filter: 'none',
                    },
                },
                '.ac-input.ac-multichoiceInput.ac-choiceSetInput-compact.ac-input-required': {
                    borderRadius: '0.25rem !important',
                    outline: 'none',
                    borderColor: (_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.background) === null || _11 === void 0 ? void 0 : _11.copilotGenerateButton,
                },
            },
            '#responseOptionsContainer': {
                '.ac-textBlock': {
                    fontSize: '0.813rem !important',
                    padding: '0.25rem !important',
                },
                backgroundColor: (_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.background) === null || _13 === void 0 ? void 0 : _13.copilotCardBackground,
                paddingLeft: '0.75rem !important',
            },
            '#topicContainer': {
                '.ac-columnSet': {
                    marginRight: '2.5rem !important',
                },
                '.ac-container': {
                    marginBottom: '0.313rem !important',
                },
            },
            '#clearButton0, #clearButton1, #clearButton2': {
                '.ac-selectable': {
                    background: (_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.background) === null || _15 === void 0 ? void 0 : _15.copilotCardBackground,
                    border: 'unset',
                    marginTop: '0.313rem !important',
                    paddingRight: '1.25rem !important',
                    fontWeight: 'bold',
                    color: `${(_17 = (_16 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _16 === void 0 ? void 0 : _16.text) === null || _17 === void 0 ? void 0 : _17.black} !important`,
                    '&:hover': {
                        filter: 'none',
                    },
                },
                '.ac-actionSet': {
                    height: '1.063rem',
                    marginTop: '0.313rem !important',
                },
                '.ac-actionSet .ac-pushButton ': {
                    height: '0.75rem ',
                    width: '3rem',
                },
            },
            '#CustomizeSelectionContainer': {
                marginTop: '0.438rem !important',
            },
            '#webLinksTitle, #imagesTitle, #processStepsTitle, #internalUseTitle, #feedbackTopicsContainer, #perSuggestionSubcards, #feedback, #collapseJourneySummaryContainer , #privateProcessStepsTitle': {
                '.ac-image': {
                    borderRadius: '0',
                },
                '&:hover': {
                    filter: 'none',
                },
                '.ac-selectable': {
                    '&:hover': {
                        filter: 'none',
                    },
                },
            },
            '#collapseJourneySummaryContainer': {
                paddingBottom: '0.625rem !important',
            },
            '#contactFeedbackCard': {
                '#feedbackLike:hover, #feedbackDislike:hover': {
                    filter: 'invert(28%) sepia(93%) saturate(1435%) hue-rotate(176deg) brightness(98%) contrast(101%)',
                },
                'input': {
                    border: `1px solid ${(_19 = (_18 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _18 === void 0 ? void 0 : _18.border) === null || _19 === void 0 ? void 0 : _19.main}`,
                    borderRadius: '4px',
                    padding: '6px',
                },
                'input:focus-visible': {
                    outline: 'none',
                },
                '.ac-choiceSetInput-expanded': {
                    display: 'flex !important',
                    flexDirection: 'row !important',
                    flexWrap: 'wrap',
                    'input[type="radio"]': {
                        display: 'none !important',
                    },
                    'label': {
                        cursor: 'pointer',
                        userSelect: 'text',
                        transition: 'background-color 0.3s',
                        padding: '2px 7px !important',
                        margin: '5px !important',
                        border: `1px solid ${(_21 = (_20 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _20 === void 0 ? void 0 : _20.border) === null || _21 === void 0 ? void 0 : _21.main}`,
                        borderRadius: '13px',
                        backgroundColor: (_23 = (_22 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _22 === void 0 ? void 0 : _22.text) === null || _23 === void 0 ? void 0 : _23.white,
                        fontSize: `${(_25 = (_24 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _24 === void 0 ? void 0 : _24.h6) === null || _25 === void 0 ? void 0 : _25.fontSize} !important`,
                        fontWeight: '600 !important',
                        lineHeight: 'initial',
                    },
                    'input[type="radio"]:checked ~ label': {
                        backgroundColor: (_27 = (_26 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _26 === void 0 ? void 0 : _26.background) === null || _27 === void 0 ? void 0 : _27.noteInput,
                        fontSize: `${(_29 = (_28 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _28 === void 0 ? void 0 : _28.h6) === null || _29 === void 0 ? void 0 : _29.fontSize} !important`,
                    },
                    'label:hover': {
                        backgroundColor: (_31 = (_30 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _30 === void 0 ? void 0 : _30.background) === null || _31 === void 0 ? void 0 : _31.noteInput,
                    },
                },
                '.ac-actionSet': {
                    justifyContent: 'flex-end !important',
                },
                '.ac-actionSet .ac-pushButton ': {
                    height: '1.75rem',
                    width: '5rem',
                    color: (_33 = (_32 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _32 === void 0 ? void 0 : _32.text) === null || _33 === void 0 ? void 0 : _33.white,
                    fontWeight: '600',
                    background: (_35 = (_34 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _34 === void 0 ? void 0 : _34.primary) === null || _35 === void 0 ? void 0 : _35.main,
                    border: `1px solid ${(_37 = (_36 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _36 === void 0 ? void 0 : _36.background) === null || _37 === void 0 ? void 0 : _37.digitalTag}`,
                    borderRadius: '0.25rem',
                    marginTop: '0.313rem !important',
                    '&:hover': {
                        cursor: 'pointer',
                        filter: 'none',
                    },
                },
            },
            '#kbPrivateAnswersIconlist': {
                backgroundColor: `${(_39 = (_38 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _38 === void 0 ? void 0 : _38.text) === null || _39 === void 0 ? void 0 : _39.white} !important`,
                border: `1px solid ${(_41 = (_40 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _40 === void 0 ? void 0 : _40.background) === null || _41 === void 0 ? void 0 : _41.copilotCardContent}`,
                borderTop: 'none',
                padding: '0 11px 5px 0 !important',
                borderBottomRightRadius: '6px',
                borderBottomLeftRadius: '6px',
                paddingRight: '11px !important',
                paddingTop: '4px !important',
            },
            '#internalUseContainer': {
                padding: '0 !important',
            },
            '#privateTitle, #privateDescription': {
                backgroundColor: `${(_43 = (_42 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _42 === void 0 ? void 0 : _42.text) === null || _43 === void 0 ? void 0 : _43.white} !important`,
                border: `1px solid ${(_45 = (_44 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _44 === void 0 ? void 0 : _44.background) === null || _45 === void 0 ? void 0 : _45.copilotCardContent}`,
            },
            '#privateTitle': {
                borderTopRightRadius: '6px',
                borderTopLeftRadius: '6px',
                borderBottom: 'none',
                padding: '11px 10px 0',
            },
            '#privateDescription': {
                borderTop: 'none',
                borderBottom: 'none',
                padding: '0.625rem',
            },
            '#privateDescription:first-child, #privateDescription:nth-child(3):not(#internalUseContainer #privateDescription:nth-child(3))': {
                borderTop: `1px solid ${(_47 = (_46 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _46 === void 0 ? void 0 : _46.background) === null || _47 === void 0 ? void 0 : _47.copilotCardContent}`,
                borderTopRightRadius: '0.375rem',
                borderTopLeftRadius: '0.375rem',
            },
            '#privateDescription:nth-child(3)': {
                borderTop: 'none',
                borderTopRightRadius: '0',
                borderTopLeftRadius: '0',
            },
            '#privateDescription + .ac-horizontal-separator, #privateTitle + .ac-horizontal-separator': {
                padding: '0 !important',
                margin: '0 !important',
                height: '0.094rem !important',
                border: `1px solid ${(_49 = (_48 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _48 === void 0 ? void 0 : _48.background) === null || _49 === void 0 ? void 0 : _49.copilotCardContent}`,
                borderBottom: 'none',
                borderTop: 'none',
            },
            '#privateTitle + .ac-horizontal-separator': {
                backgroundColor: `${(_51 = (_50 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _50 === void 0 ? void 0 : _50.text) === null || _51 === void 0 ? void 0 : _51.white} !important`,
                height: '0 !important',
            },
            '#privateDescription:not(:has(+ .ac-horizontal-separator))': {
                borderBottom: `1px solid ${(_53 = (_52 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _52 === void 0 ? void 0 : _52.background) === null || _53 === void 0 ? void 0 : _53.copilotCardContent}`,
                borderBottomRightRadius: '0.375rem',
                borderBottomLeftRadius: '0.375rem',
            },
            '#kbAnswersIconlist,#kbPrivateAnswersIconlist, .ac-image ac-selectable': {
                display: 'flex !important',
                justifyContent: 'flex-end !important',
                '.ac-container': {
                    flex: 'none !important',
                },
            },
            '#processStepsTitle, #privateProcessStepsTitle': {
                '.ac-selectable': {
                    '&:hover': {
                        filter: 'invert(28%) sepia(93%) saturate(1435%) hue-rotate(176deg) brightness(98%) contrast(101%)',
                    },
                },
            },
            '#feedbackActionContainer': {
                alignItems: 'flex-end',
                '.ac-pushButton': {
                    height: '1.75rem',
                    width: '5rem',
                    color: (_55 = (_54 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _54 === void 0 ? void 0 : _54.text) === null || _55 === void 0 ? void 0 : _55.white,
                    fontWeight: '600',
                    background: (_57 = (_56 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _56 === void 0 ? void 0 : _56.primary) === null || _57 === void 0 ? void 0 : _57.main,
                    border: `1px solid ${(_59 = (_58 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _58 === void 0 ? void 0 : _58.background) === null || _59 === void 0 ? void 0 : _59.digitalTag}`,
                    borderRadius: '0.25rem',
                    marginTop: '0.313rem !important',
                    '&:hover': {
                        filter: 'none',
                    },
                },
            },
            '#suggestionsContainer': {
                display: 'flex',
                flexDirection: 'row !important',
                flexWrap: 'wrap',
                '#suggestion': {
                    padding: '5px !important',
                    margin: '5px !important',
                    border: '1px solid #829AAB',
                    borderRadius: '10px',
                    backgroundColor: (_61 = (_60 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _60 === void 0 ? void 0 : _60.text) === null || _61 === void 0 ? void 0 : _61.white,
                },
            },
            '#buttonContainer': {
                '.ac-pushButton': {
                    height: '1.75rem',
                    width: '8rem',
                    background: (_63 = (_62 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _62 === void 0 ? void 0 : _62.text) === null || _63 === void 0 ? void 0 : _63.white,
                    fontWeight: '600',
                    color: `${(_65 = (_64 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _64 === void 0 ? void 0 : _64.text) === null || _65 === void 0 ? void 0 : _65.clearText} !important`,
                    border: `1px solid ${(_67 = (_66 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _66 === void 0 ? void 0 : _66.background) === null || _67 === void 0 ? void 0 : _67.digitalTag}`,
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    '&:hover': {
                        filter: 'none',
                    },
                },
            },
            '#filtersUsedContainer': {
                '#filtersContainer': {
                    display: 'flex',
                    flexDirection: 'row !important',
                    flexWrap: 'wrap',
                    '#filter, #standardFilter': {
                        padding: '0.25rem 0.3125rem !important',
                        margin: '0.3125rem 0.625rem 0.3125rem 0 !important',
                        border: `1px solid ${(_69 = (_68 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _68 === void 0 ? void 0 : _68.text) === null || _69 === void 0 ? void 0 : _69.light}`,
                        borderRadius: '1rem',
                        backgroundColor: (_71 = (_70 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _70 === void 0 ? void 0 : _70.background) === null || _71 === void 0 ? void 0 : _71.noteInput,
                    },
                    '#standardFilter': {
                        backgroundColor: (_73 = (_72 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _72 === void 0 ? void 0 : _72.background) === null || _73 === void 0 ? void 0 : _73.default,
                    },
                },
            },
            '#expandJourneySummaryContainer': {
                paddingTop: '0.625rem !important',
                '#interactionDataContainer': {
                    paddingTop: '0.625rem !important',
                    '#summaryDetailContainers': {
                        backgroundColor: (_75 = (_74 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _74 === void 0 ? void 0 : _74.background) === null || _75 === void 0 ? void 0 : _75.noteInput,
                        borderRadius: '0.3rem',
                        marginBottom: '0.375rem !important',
                        padding: '0.938rem 0rem !important',
                        '#hideDetailsContainer': {
                            'paddingRight': '0.625rem !important',
                            '.ac-horizontal-separator': {
                                borderColor: `${(_77 = (_76 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _76 === void 0 ? void 0 : _76.background) === null || _77 === void 0 ? void 0 : _77.main} !important`,
                                marginRight: '0.625rem !important',
                            },
                        },
                        '#viewDetailsContainer, #hideDetailsContainer #hideDetailsTitle': {
                            '&:hover': {
                                filter: 'none',
                            },
                            '.ac-textBlock': {
                                textDecoration: 'underline',
                            },
                        },
                        '.ac-container': {
                            marginLeft: '0.5rem !important',
                        },
                    },
                },
            },
            '#taskAssist': Object.assign({ '#taskAssistLoading': Object.assign(Object.assign({}, dotElastic), { overflow: 'visible !important', marginLeft: '1.4375rem', p: {
                        color: `${(_79 = (_78 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _78 === void 0 ? void 0 : _78.text) === null || _79 === void 0 ? void 0 : _79.white} !important`,
                    } }), '#taskResponse': {
                    marginLeft: '1.4375rem',
                    marginBottom: '0.625rem',
                }, '#taskResponse + .targetClass': {
                    marginBottom: '0.625rem',
                } }, cancelButton),
            '#customCard': {
                padding: '0 !important',
            },
            '#customCardLightBlueBackground': {
                backgroundColor: (_81 = (_80 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _80 === void 0 ? void 0 : _80.background) === null || _81 === void 0 ? void 0 : _81.copilotCardLightBlueBackground,
                padding: '1rem !important',
            },
            '#customCardLightGreenBackground': {
                backgroundColor: (_83 = (_82 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _82 === void 0 ? void 0 : _82.background) === null || _83 === void 0 ? void 0 : _83.copilotCardLightGreenBackground,
                padding: '1rem !important',
            },
            '#customCardLightRedBackground': {
                backgroundColor: (_85 = (_84 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _84 === void 0 ? void 0 : _84.background) === null || _85 === void 0 ? void 0 : _85.copilotCardLightRedBackground,
                padding: '1rem !important',
            },
            '#customCardLightYellowBackground': {
                backgroundColor: (_87 = (_86 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _86 === void 0 ? void 0 : _86.background) === null || _87 === void 0 ? void 0 : _87.copilotCardLightYellowBackground,
                padding: '1rem !important',
                '.ac-horizontal-separator': {
                    display: 'none !important',
                },
            },
            '#customCardDefaultBackground': {
                backgroundColor: (_89 = (_88 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _88 === void 0 ? void 0 : _88.background) === null || _89 === void 0 ? void 0 : _89.paper,
                padding: '1rem !important',
                '#customCardloading': Object.assign(Object.assign({}, dotElastic), { overflow: 'visible !important', marginLeft: '1.4375rem', p: {
                        color: `${(_91 = (_90 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _90 === void 0 ? void 0 : _90.text) === null || _91 === void 0 ? void 0 : _91.white} !important`,
                    } }),
            },
            '#formCaptureContent': Object.assign({ '.ac-input': {
                    padding: '0.625rem',
                    border: `0.063rem solid ${(_93 = (_92 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _92 === void 0 ? void 0 : _92.background) === null || _93 === void 0 ? void 0 : _93.copilotGenerateButton}`,
                    borderRadius: '0.25rem',
                    '&:focus': {
                        outline: 'none',
                        borderColor: (_95 = (_94 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _94 === void 0 ? void 0 : _94.primary) === null || _95 === void 0 ? void 0 : _95.main,
                    },
                }, '.ac-textBlock, .ac-textRun': {
                    fontSize: '0.75rem !important',
                    lineHeight: '1.2',
                } }, cancelButton),
            '#autoSummaryContainer': Object.assign(Object.assign({}, cancelButton), { '.ac-input': {
                    padding: '0.625rem',
                    border: `0.063rem solid ${(_97 = (_96 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _96 === void 0 ? void 0 : _96.background) === null || _97 === void 0 ? void 0 : _97.copilotGenerateButton}`,
                    borderRadius: '0.25rem',
                    '&:focus': {
                        outline: 'none',
                        borderColor: (_99 = (_98 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _98 === void 0 ? void 0 : _98.primary) === null || _99 === void 0 ? void 0 : _99.light,
                    },
                    height: '6.625rem',
                    fontFamily: (_100 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _100 === void 0 ? void 0 : _100.fontFamily,
                    fontSize: '0.75rem',
                } }),
        },
        textField: {
            width: '100%',
            padding: '0.625rem',
            position: 'sticky',
            '& .MuiInputBase-root': {
                background: (_102 = (_101 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _101 === void 0 ? void 0 : _101.text) === null || _102 === void 0 ? void 0 : _102.white,
                borderRadius: '0.75rem',
                fontWeight: '600',
                position: 'sticky',
                height: '2.5rem',
                color: (_104 = (_103 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _103 === void 0 ? void 0 : _103.text) === null || _104 === void 0 ? void 0 : _104.copilotAgentSearchText,
                fontSize: '0.75rem',
                margin: '0 0.625rem',
                backgroundColor: (_106 = (_105 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _105 === void 0 ? void 0 : _105.background) === null || _106 === void 0 ? void 0 : _106.default,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (_108 = (_107 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _107 === void 0 ? void 0 : _107.text) === null || _108 === void 0 ? void 0 : _108.white,
            },
            '#searchInput': {
                padding: '0.625rem',
            },
        },
        searchIcon: {
            transform: 'rotate(90deg)',
            cursor: 'pointer',
        },
        copilotContent: {
            color: (_110 = (_109 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _109 === void 0 ? void 0 : _109.text) === null || _110 === void 0 ? void 0 : _110.contrastText,
            border: `0.063rem solid ${(_112 = (_111 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _111 === void 0 ? void 0 : _111.background) === null || _112 === void 0 ? void 0 : _112.copilotCardContent}`,
            margin: '0.625rem',
            borderRadius: '0.5rem',
            backgroundColor: (_114 = (_113 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _113 === void 0 ? void 0 : _113.background) === null || _114 === void 0 ? void 0 : _114.paper,
        },
        responseContainer: {
            bottom: 0,
        },
        responseDiv: {
            padding: '0.5rem',
            border: '0.063rem solid',
            borderRadius: '0.5rem',
            borderColor: (_116 = (_115 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _115 === void 0 ? void 0 : _115.text) === null || _116 === void 0 ? void 0 : _116.lightGrey,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            columnGap: '0.5rem',
        },
        responseText: {
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: (_118 = (_117 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _117 === void 0 ? void 0 : _117.background) === null || _118 === void 0 ? void 0 : _118.hoverDark,
            fontWeight: '600',
        },
        line: {
            margin: 0,
            border: `0.063rem solid ${(_120 = (_119 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _119 === void 0 ? void 0 : _119.border) === null || _120 === void 0 ? void 0 : _120.light}`,
        },
        nbrSparkle: {
            display: 'flex',
            marginLeft: '0.625rem',
            marginTop: '0.313rem',
            flexDirection: 'column',
            height: '1.25rem',
            width: '1.25rem',
        },
        typingIndicator: {
            maxWidth: '4.85rem',
        },
        kebabMenuBtn: {
            width: 'auto',
            height: '1.875rem',
            padding: '0',
            color: (_122 = (_121 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _121 === void 0 ? void 0 : _121.text) === null || _122 === void 0 ? void 0 : _122.searchTitle,
            borderColor: (_124 = (_123 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _123 === void 0 ? void 0 : _123.border) === null || _124 === void 0 ? void 0 : _124.main,
            alignContent: 'center',
            fontSize: '0.688rem',
            fontWeight: 800,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            background: (_126 = (_125 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _125 === void 0 ? void 0 : _125.background) === null || _126 === void 0 ? void 0 : _126.default,
            '&:hover': {
                backgroundColor: (_128 = (_127 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _127 === void 0 ? void 0 : _127.background) === null || _128 === void 0 ? void 0 : _128.default,
            },
        },
        filterIcon: {
            width: '0.8rem',
            height: '0.8rem',
            marginBottem: '0.20rem',
            color: (_130 = (_129 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _129 === void 0 ? void 0 : _129.text) === null || _130 === void 0 ? void 0 : _130.grey,
        },
        listBox: {
            '& .MuiPaper-root': {
                border: `1px solid ${(_132 = (_131 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _131 === void 0 ? void 0 : _131.text) === null || _132 === void 0 ? void 0 : _132.grey}`,
                '&::-webkit-scrollbar': {
                    width: '0.3rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (_134 = (_133 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _133 === void 0 ? void 0 : _133.background) === null || _134 === void 0 ? void 0 : _134.scrollThumb,
                    borderRadius: '2rem',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: (_136 = (_135 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _135 === void 0 ? void 0 : _135.background) === null || _136 === void 0 ? void 0 : _136.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (_138 = (_137 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _137 === void 0 ? void 0 : _137.background) === null || _138 === void 0 ? void 0 : _138.scrollThumbHover,
                },
            },
        },
        loadMoreButton: {
            color: (_140 = (_139 = theme.palette) === null || _139 === void 0 ? void 0 : _139.text) === null || _140 === void 0 ? void 0 : _140.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        dropdownOptionsCount: {
            color: (_142 = (_141 = theme.palette) === null || _141 === void 0 ? void 0 : _141.text) === null || _142 === void 0 ? void 0 : _142.header,
            fontSize: '0.75rem',
            fontWeight: 500,
            marginLeft: '1.563rem',
            lineHeight: '0.938rem',
            padding: '0.313rem 0 0.313rem 0',
        },
        feedbackCard: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '0.625rem',
            marginBottom: '0.5rem',
        },
        accordionBackground: {
            background: theme.palette.background.copilotCardBackground,
            backgrounRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'unset',
        },
        accordionBox: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            gap: 2,
        },
        comprehensiveText: {
            fontSize: (_144 = (_143 = theme.typography) === null || _143 === void 0 ? void 0 : _143.h6) === null || _144 === void 0 ? void 0 : _144.fontSize,
            lineHeight: '1rem',
            color: (_146 = (_145 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _145 === void 0 ? void 0 : _145.background) === null || _146 === void 0 ? void 0 : _146.hoverDark,
            fontWeight: '400',
        },
        feedbackTagContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            paddingBottom: 2,
        },
        feedbackTags: {
            marginRight: 1,
            border: `1px solid ${(_148 = (_147 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _147 === void 0 ? void 0 : _147.background) === null || _148 === void 0 ? void 0 : _148.copilotFeedbackTags}`,
            borderRadius: '10px',
            fontWeight: 'bold',
        },
        comprehensiveFeedbackButton: {
            display: 'flex',
            justifySelf: 'flex-end',
            width: '80px',
            background: (_150 = (_149 = theme.palette) === null || _149 === void 0 ? void 0 : _149.primary) === null || _150 === void 0 ? void 0 : _150.main,
        },
        feedbackCommentText: {
            background: 'white',
            '& .MuiInputBase-root': {
                padding: '6px',
                fontSize: (_152 = (_151 = theme.typography) === null || _151 === void 0 ? void 0 : _151.h5) === null || _152 === void 0 ? void 0 : _152.fontSize,
                fontWeight: '400',
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `0.88px solid ${(_154 = (_153 = theme.palette) === null || _153 === void 0 ? void 0 : _153.background) === null || _154 === void 0 ? void 0 : _154.copilotGenerateButton}`,
                        boxShadow: 'none',
                    },
                },
            },
        },
        feedbackTooltip: {
            backgroundColor: (_156 = (_155 = theme.palette) === null || _155 === void 0 ? void 0 : _155.background) === null || _156 === void 0 ? void 0 : _156.paper,
            border: `1px solid ${(_158 = (_157 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _157 === void 0 ? void 0 : _157.background) === null || _158 === void 0 ? void 0 : _158.hoverDark}`,
            boxShadow: `0px 4px 6px 0px ${(_160 = (_159 = theme.palette) === null || _159 === void 0 ? void 0 : _159.background) === null || _160 === void 0 ? void 0 : _160.feedbackTooltipBoxShadow}`,
            padding: '0.2rem 0.5rem',
            borderRadius: 0,
        },
        feedbackTooltipText: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '125%',
            textAlign: 'center',
            color: (_162 = (_161 = theme.palette) === null || _161 === void 0 ? void 0 : _161.text) === null || _162 === void 0 ? void 0 : _162.dark,
        },
        feedbackTooltipArrow: {
            display: 'none',
        },
        feedbackActionIcons: {
            '&:hover svg path': {
                fill: (_164 = (_163 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _163 === void 0 ? void 0 : _163.text) === null || _164 === void 0 ? void 0 : _164.noteLabel,
            },
        },
        summaryContainer: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: `${(_166 = (_165 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _165 === void 0 ? void 0 : _165.text) === null || _166 === void 0 ? void 0 : _166.white} !important`,
            height: '100%',
            overflowY: 'auto',
        },
        filterIconBadge: {
            '& .MuiBadge-badge': {
                top: -8,
                right: -2,
                fontSize: '0.45rem',
                minWidth: '0.4rem',
                height: '0.8rem',
            },
        },
        searchWrapper: { display: 'flex', alignItems: 'center', position: 'relative' },
        searchSection: { flex: 1 },
        placeholderSpace: { flex: 1, padding: '1.625rem' },
        taskAssistSection: { flexShrink: 0 },
        popoverButton,
        formCaptureCardStyle,
    };
    return styles;
};
export default ccfCopilotCardStyles;
//# sourceMappingURL=ccf-agent-copilot-container.styles.js.map