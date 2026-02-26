/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardContactHistoryStyles />
 */
const agentContactHistoryStyles = (theme) => {
    var _a;
    const styles = {
        detailsMenu: {
            [(_a = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _a === void 0 ? void 0 : _a.up('md')]: {
                overflowY: 'auto',
                maxHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
            },
        },
        ccfContactHistoryAdaptiveCardContainer: {
            alignItems: 'center',
            marginTop: '0.063rem',
            padding: '0.938rem',
        },
        noRecordClass: {
            width: '12.5rem',
            height: '2.5rem',
            align: 'center',
            top: 'calc(50% - 2.5rem)',
            left: 'calc(50% - 5rem)',
            position: 'absolute',
        },
    };
    return styles;
};
/**
 * Create agent contact history adaptive cards CSS
 * @param theme - MUI theme object
 * @example
 */
export const contactHistoryAdaptiveCardCSS = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const adaptiveCardCSS = `
  #skillName {
    font-size: 0.813rem !important;
    color: ${(_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.grey[900]} !important;
  }
  #skillName p{
    width: 80% !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ac-textBlock p{
   width: 80% !important;
  }  
  #activityIcon {
    width: 1.5rem;
    height: 1.5rem;
    max-height: 100%;
    border-radius: 50%;
    color: ${(_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.common) === null || _c === void 0 ? void 0 : _c.white};
    align-items: unset !important;
  }
  #activityIconvoice {
    width: 1.5rem;
    max-height: 100%;
    border-radius: 50%;
    color: ${(_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.common) === null || _e === void 0 ? void 0 : _e.white};
    align-items: unset !important;
  }
  #activityCard {
    box-shadow: 0 1px 3px ${(_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.grey[400]};
    padding: 0.75rem 0.313rem !important;
    border-radius: 3%;
    position: relative;
    cursor: pointer;
    margin-bottom: 0.5rem !important;
  }
  #ccfAppSpaceActivityContactNumber {
    font-size: 0.875rem !important;
    font-weight: 800 !important;
    color: ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.common) === null || _h === void 0 ? void 0 : _h.black} !important;
  }
  .ac-textBlock {
    word-break: break-all !important;
  }
  #activityCard img{
    position: relative
  }
  #activityCard img[alt]:after{
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.common) === null || _k === void 0 ? void 0 : _k.white};
    content: attr(alt);
  }
  #statusAndTimestampContainer {
    min-width: 10em !important;
    margin-left: 1em !important;
  }

  /** 
   * Currently, we don't have breakpoints defined in cxone-agent/src/cxone-agent.theme.config.ts
    so using a self defined number 500.
   */
  ${(_l = theme === null || theme === void 0 ? void 0 : theme.breakpoints) === null || _l === void 0 ? void 0 : _l.down(500)} {
    #statusAndTimestampContainer {
      min-width: 4.5rem !important;
      margin-right: 1em !important;
    }
  }

  #interactionNameAndChannelContainer {
    padding-left: 0.5em !important;
  }

  .ac-vertical-separator {
    border-right-color: ${(_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.background) === null || _o === void 0 ? void 0 : _o.main} !important;
  }

  #contactHistoryDateString {
    text-wrap: nowrap;
    overflow: hidden;
  }

  .ac-adaptiveCard {
    padding: 0 !important;
  }
`;
    return adaptiveCardCSS;
};
export default agentContactHistoryStyles;
//# sourceMappingURL=ccf-agent-card-contact-history.style.js.map