import { keyframes } from '@mui/material';
import { activityLinkIcon, activitySearchIcon, activityTickIcon, relatestointeractionIcon, relatestointeractionIconDisabled, relatestointeractionIconLoading, relatestointeractionTickIcon, } from '../../../ccf-crm-iconlist/ccf-crm-icons';
/**
 * Styles for activityCard of pin interaction
 * @example customerCardPinRecordsCSS(theme)
 */
export const customerCardPinRecordsCSS = (theme, iconBase64string) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    return `
#positive > div{
    color: ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.success) === null || _b === void 0 ? void 0 : _b.light} !important;
}
#deliveryStatus{
  color: ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.secondary) === null || _d === void 0 ? void 0 : _d.light} !important;
  opacity: 0.45;
}
#caseStatusPurple{
  color: ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.secondary) === null || _f === void 0 ? void 0 : _f.light} !important;
}
#activityIcon{
  background: ${(_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.grey[300]};
  padding: 0.313rem;
  border-radius: 50%;
  color: ${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.paper} !important;
}
#activityCard,
#relatedActivityCard{
  box-shadow: 0 0.063rem 0.188rem ${(_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.grey[400]};
  padding: 0.625rem !important;
  margin-bottom: 0.938rem !important;
  border-radius: 0;
  position: relative;
}

#relatedActivityCard > div.ac-container{
  display: flex !important;
  flex-direction: row-reverse !important;
  justify-content: space-between !important;
}
#relatedActivityCard #keyValueContainer{
  flex: 1 1 auto !important;
  min-width: 0 !important;
}
#keyValueContainer #keyColumn{
  flex: 0 0 auto !important;
}

#caseStatusOrange{
  color: ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.warning) === null || _m === void 0 ? void 0 : _m.light} !important;
}
#caseStatusPink{
  color: ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.highlight} !important;
}
#caseStatusRed{
  color: ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.error) === null || _r === void 0 ? void 0 : _r.main} !important;
}
#crmIcon{
  background-image: url(${iconBase64string});
  background-repeat: no-repeat;
  background-size: 0.875rem;
  background-position: 0.188rem;
  border: 0.063rem solid ${(_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.grey[400]};
  border-radius: 0.188rem;
  max-width: max-content;
  padding: 0.063rem 0.188rem 0.063rem 1.25rem !important;
  cursor: pointer;
  align-self: start;
}
#crmIcon:hover{
    background-color: ${(_t = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _t === void 0 ? void 0 : _t.grey[300]};
}
#searchIcon{
  background-image: url(${activitySearchIcon});
  background-position: 0.313rem;
  background-repeat: no-repeat;
  background-size: 1.125rem;
  max-width: max-content;
  min-width: 1.563rem !important;
}
#cardTitleColumnSet{
  align-items:center;
}
#address-content > div,
#address-content > div > div {
  padding: 0 !important;
}
.MuiAccordionSummary-root.Mui-expanded{
  min-height:3rem !important;
  height: 3rem !important;
  margin: 0.625rem 0 !important;
}
#ccfAppSpaceActivityChevron:hover{
  background: ${(_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.grey[300]} !important
}
#ccfAppSpaceActivityChevronHidden{
  visibility: hidden;
}
#ccfAppSpaceActivityContactNumber{
  font-size: 0.688rem !important;
  padding-bottom: 0.313rem;
}
#ccfAppSpaceActivityCardContainer{
  border-bottom: 0.063rem solid ${(_v = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _v === void 0 ? void 0 : _v.grey[300]};
  margin-bottom: 0.625rem !important;
  padding-bottom: 0.625rem !important;
}
div#crmTicketIcon {
  background-image: url(${iconBase64string});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  width: 1.563rem;
  text-indent: -9999px;
  cursor: pointer;
}
#ccfPaddingLR10{
  padding: 0 0.625rem !important;
}
#toggleIcon{
  margin-right: 0.313rem;
}
#toggleIcon input{
  height: 0;
  width: 0;
  visibility: hidden;
}

#toggleIcon label {
  cursor: pointer;
  text-indent: -624.938rem;
  display: block;
  padding-right: 2.188rem;
  background-image: url(${activityLinkIcon});
  position: relative;
  padding-bottom: 1.25rem;
  box-shadow: 0 0.125rem 0.375rem ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.boxshadow) === null || _x === void 0 ? void 0 : _x.main};
  border-radius: 0.25rem;
  background-position: 0.031rem;
  background-size: 2.188rem;
  background-repeat: no-repeat;


}
#toggleIcon label:after {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 0.688rem;
  height: 0.688rem;
  background-image: 'none';
}

#toggleIcon:has( input:checked) label {
  background-image: url(${activityTickIcon});
  background-position: 0.031rem;
  background-size: 2.188rem;
  background-repeat: no-repeat;
}

#hideToggle{
  display: none !important;
}

  #refreshButton button{
    background: ${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.primary) === null || _z === void 0 ? void 0 : _z.main};
    height: 1.75rem;
    width: 4.375rem;
    color: ${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.white};
    align-items: center;
    border-radius: 0.25rem;
    border-color: ${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.border) === null || _3 === void 0 ? void 0 : _3.main};
    cursor: pointer;
    box-shadow: 0 0.125rem 0.375rem ${(_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.boxshadow) === null || _5 === void 0 ? void 0 : _5.main};
  }

  ${theme.breakpoints.down('sm')} {
    #crmEntityName {
      width: 3.5rem;
    }
  }

  ${theme.breakpoints.between('sm', 'md')} {
    #crmEntityName {
      width: 4.5rem;
    }
  }

  ${theme.breakpoints.up('md')} {
    #crmEntityName {
      width: 7.375rem;
    }
  }

  [id^="relatesToPinnedRecords"] {
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    position: relative;
    border-radius: 0.25rem;
    height: 1.5rem;
    width: 2.35rem;
    justify-content: flex-start !important;
    user-select: none;
  }

  [id^="relatesToPinnedRecords_unticked-"] {
    background-image: url(${relatestointeractionIcon});
    background-position-y: -0.019rem;
  }

  [id^="relatesToPinnedRecords_ticked-"] {
    background-image: url(${relatestointeractionTickIcon});
    background-position-y: -0.019rem;
  }

  [id^="relatesToPinnedRecords_disabled-"] {
    background-image: url(${relatestointeractionIconDisabled});
    background-position-y: -0.063rem;
    cursor: default;
  }

  [id^="relatesToPinnedRecords_loading-"] {
    background-image: url(${relatestointeractionIconLoading});
    background-size: 50%;
    background-position: top;
    background-position-y: 0.055rem;
    cursor: default;
  }

  [id^="relatesToPinnedRecords"] .ac-richTextBlock{
    display: none !important;
  }

  [id^="relatesToPinnedRecords"] .ac-input-container{
    display: none !important;
  }

  #relates-to_container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    z-index: 1;
  }
`;
};
/**
 * CcfCustomerCardPinRecords - CSS for cards showing pin records.
 * @param props -?-customerCardPinRecordsStyles
 * @example <customerCardPinRecordsStyles />
 */
const customerCardPinRecordsStyles = (theme) => {
    var _a, _b;
    const spin = keyframes `
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    `;
    const styles = {
        noInformation: {
            textAlign: 'center',
            padding: '0.5rem 1rem 1rem',
        },
        loader: {
            border: `0.625rem solid ${(_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background.LogoColor}`,
            borderTop: `0.625rem solid ${(_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background.sparkleBlue}`,
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            animation: `${spin} 1s linear infinite`,
            align: 'center',
            top: 'calc(50% - 2.5rem)',
            left: 'calc(50% - 1.25rem)',
            position: 'relative',
        },
        customerCardPinInteractionContainer: {
            height: '100%',
            position: 'relative',
        },
    };
    return styles;
};
export default customerCardPinRecordsStyles;
//# sourceMappingURL=ccf-customer-card-pinrecords.style.js.map