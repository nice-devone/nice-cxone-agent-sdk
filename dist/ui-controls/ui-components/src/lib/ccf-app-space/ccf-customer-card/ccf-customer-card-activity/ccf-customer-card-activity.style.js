/* eslint-disable max-params */
import { keyframes } from '@mui/material';
import { activityLinkIcon, activitySearchIcon, activityTickIcon, relatestointeractionIcon, relatestointeractionTickIcon, createNewEntityIcon } from '../../../ccf-crm-iconlist/ccf-crm-icons';
/**
 * Styles for activityCard
 * @example activityCardCSS(theme)
 */
export const activityCardCSS = (theme, iconBase64string, isSearchConfigAvailable, isLinkable, isRelatestoInteractionAvailable, showCreateEntityButton) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const cssStyle = `
#positive > div{
    color: ${theme.palette.success.light} !important;
}
#deliveryStatus{
  color: ${theme.palette.secondary.light} !important;
  opacity: 0.45;
}
#caseStatusPurple{
  color: ${theme.palette.secondary.light} !important;
}
#activityIcon{
  background: #707070;
  padding: 0.313rem;
  border-radius: 50%;
  color: ${theme.palette.background.paper} !important;
}
#activityCard,
#relatedActivityCard{
  box-shadow: 0 0.063rem 0.188rem ${theme.palette.grey[400]};
  padding: 0.625rem !important;
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
  color: ${theme.palette.warning.light} !important;
}
#caseStatusPink{
  color: ${theme.palette.text.highlight} !important;
}
#caseStatusRed{
  color: ${theme.palette.error.main} !important;
}
#crmIcon{
  background-image: url(${iconBase64string});
  background-repeat: no-repeat;
  background-size: 0.875rem;
  background-position: 0.188rem;
  border: 0.063rem solid ${theme.palette.grey[400]};
  border-radius: 0.188rem;
  max-width: max-content;
  padding: 0.063rem 0.188rem 0.063rem 1.25rem !important;
  cursor: pointer;
  align-self: start;
}
#crmIcon:hover{
    background-color: ${theme.palette.grey[300]};
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
  background: ${theme.palette.grey[300]} !important
}
#ccfAppSpaceActivityChevronHidden{
  visibility: hidden;
}
#ccfAppSpaceActivityContactNumber{
  font-size: 0.688rem !important;
  padding-bottom: 0.313rem;
}
#ccfAppSpaceActivityCardContainer{
  border-bottom: 0.063rem solid ${theme.palette.grey[300]};
  margin-bottom: 0.625rem !important;
  padding-bottom: 0.625rem !important;
}
#ccfAppSpaceActivityContainer{
  padding:0rem 0.938rem !important;
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
  padding: 0 0.625rem 0.625rem;
}

#relatedHeaderContainer{
  padding: 0 0.625rem 0.625rem !important;
  align-items: end;
  margin-bottom: 0.625rem !important;
  position: absolute;
  top: 0.938rem;
  right: 1.563rem;
  border-bottom: 0;
  visibility: ${(isSearchConfigAvailable || showCreateEntityButton) ? 'visible' : 'hidden'};
}

#relatestoIcon input,#fieldsToggle input{
  height: 0;
  width: 0;
  visibility: hidden;
}

#relatestoIcon label,#fieldsToggle label{
  cursor: pointer;
  text-indent: -624.938rem;
  display: block;
  padding-right: 2.188rem;
  background-image: url(${relatestointeractionIcon});
  position: relative;
  padding-bottom: 1.25rem;
  box-shadow: 0 0.125rem 0.375rem ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.boxshadow) === null || _b === void 0 ? void 0 : _b.main};
  border-radius: 0.25rem;
  background-position: 0.031rem;
  background-size: 2.188rem;
  background-repeat: no-repeat;
}

#relatestoIcon label:after,#fieldsToggle label:after {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 0.688rem;
  height: 0.688rem;
  background-image: 'none';
}

#relatestoIcon:has( input:checked) label,#fieldsToggle:has( input:checked) label{
  background-image: url(${relatestointeractionTickIcon});
  background-position: 0.031rem;
  background-size: 2.188rem;
  background-repeat: no-repeat;
}

#toggleIcon {
  margin-right: 0.313rem;
  visibility: ${(isSearchConfigAvailable && isLinkable) ? 'visible' : 'hidden'};
  margin: 0.075rem !important;

}
#toggleIcon input,
#fieldsToggle input{
  height: 0;
  width: 0;
  visibility: hidden;
}

#toggleIcon label,
#fieldsToggle label {
  cursor: pointer;
  text-indent: -624.938rem;
  display: block;
  padding-right: 2.188rem;
  background-image: url(${activityLinkIcon});
  position: relative;
  padding-bottom: 1.25rem;
  box-shadow: 0 0.125rem 0.375rem ${(_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.boxshadow) === null || _d === void 0 ? void 0 : _d.main};
  border-radius: 0.25rem;
  background-position: 0.031rem;
  background-size: 2.188rem;
  background-repeat: no-repeat;


}
#toggleIcon label:after,
#fieldsToggle label:after {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 0.688rem;
  height: 0.688rem;
  background-image: 'none';
}

#toggleIcon:has( input:checked) label,
#fieldsToggle:has( input:checked) label {
  background-image: url(${activityTickIcon});
  background-position: 0.031rem;
  background-size: 2.188rem;
  background-repeat: no-repeat;
}

#hideToggle{
  display: none !important;
}
#refreshButton button{
  background: ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.main};
  height: 1.75rem;
  width: 4.375rem;
  color: ${(_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.white};
  align-items: center;
  border-radius: 0.25rem;
  border-color: ${(_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.main};
  cursor: pointer;
  box-shadow: 0 0.125rem 0.375rem ${(_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.boxshadow) === null || _m === void 0 ? void 0 : _m.main};
}

#fieldsToggle{
  margin-right: 0.313rem;
}

#fieldsContainer{
  font-weight: 800;
}

#crmEntityName{
  width: 7.375rem;
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

  #createEntityButton {
    background-size: 80%;
    background-repeat: no-repeat;
    cursor: pointer;
    position: relative;
    border-radius: 0.25rem;
    height: 1.75rem;
    width: 1.75rem;
    user-select: none;
    background-image: url(${createNewEntityIcon});
    border: 0.1rem solid ${(_p = (_o = theme.palette) === null || _o === void 0 ? void 0 : _o.border) === null || _p === void 0 ? void 0 : _p.main};
    background-position: center;
  }

  #createEntityButton .ac-richTextBlock{
    display: none !important;
  }

  #createEntityButton .ac-input-container{
    display: none !important;
  }

  #create-entity_container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    z-index: 1;
  }
`;
    if (isRelatestoInteractionAvailable) {
        return (`#relatestoIcon {
      margin-right: 0.313rem;
      visibility: visible !important;
    }` + cssStyle);
    }
    else {
        return (`#relatestoIcon{
        margin-right: 0.313rem;
        visibility: hidden !important;
  }` + cssStyle);
    }
};
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
const customerCardActivityStyles = (theme) => {
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
            border: `0.625rem solid ${theme.palette.background.LogoColor}`,
            borderTop: `0.625rem solid ${theme.palette.background.sparkleBlue}`,
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            animation: `${spin} 1s linear infinite`,
            align: 'center',
            top: 'calc(50% - 2.5rem)',
            left: 'calc(50% - 1.25rem)',
            position: 'relative',
        },
        customerCardActivityContainer: {
            height: '100%',
        },
    };
    return styles;
};
export default customerCardActivityStyles;
//# sourceMappingURL=ccf-customer-card-activity.style.js.map