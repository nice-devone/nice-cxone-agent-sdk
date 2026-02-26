import { relatestointeractionIcon, relatestointeractionTickIcon } from '../../../../ccf-crm-iconlist/ccf-crm-icons';
import { MAX_WIDTH_FOR_POPOVER_LIST_BADGE } from './controller/constants';
/**
 * Styles for the Relates To popover.
 * @example styles()
 */
const styles = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
position, isRelatesToPopoverOpen, shouldOverflow, theme, iconBase64string = '') => {
    var _a, _b, _c, _d, _e;
    return `
  .relates-to_popover_container {
    z-index: 2;
    box-shadow: rgb(0 0 0 / 17%) 0px 0.063rem 0.188rem;
    background-color: white;
    width: 22.813rem;
    border: 1px solid rgb(180 212 229);
    border-radius: 0.2rem;
    visibility: ${isRelatesToPopoverOpen ? 'visible' : 'hidden'};
    position: absolute;
    top: ${(_a = position === null || position === void 0 ? void 0 : position.top) !== null && _a !== void 0 ? _a : 0}px;
    left: ${(_b = position === null || position === void 0 ? void 0 : position.left) !== null && _b !== void 0 ? _b : 0}px;
  }

  @media (max-width: 600px) {
    .relates-to_popover_container {
      width: 15rem;
    }
  }

  .relates-to_popover_body {
    max-height: ${shouldOverflow ? '200px' : 'none'};
    overflow-y: ${shouldOverflow ? 'scroll' : 'visible'};
  }

  .relatesToPopoverListItemStatusBase {
    cursor: pointer;
    text-indent: -624.938rem;
    display: block;
    padding-right: 2.188rem;
    background-position: center center;
    position: relative;
    padding-bottom: 1.25rem;
    border-radius: 0.25rem;
    background-repeat: no-repeat;
    height: 1.18rem;
    width: 2.18rem;
    padding: 0;
    background-size: contain;
  }

  .relatesToPopoverListItemStatusUnticked {
    background-image: url(${relatestointeractionIcon});
  }

  .relatesToPopoverListItemStatusTicked {
    background-image: url(${relatestointeractionTickIcon});
  }

  .relatesToPopoverListItem{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    padding: 0px 8px;
    min-height: 40px;
  }

  .relatesToPopoverListItem:not(:last-child) {
    border-bottom: 1px solid ${(_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.grey[300]};
  }

  .relatesToPopoverListItemName {
    flex: 1;
    user-select: none;
    padding: 0px 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .relatesToBadgeContainer {
    cursor: pointer;
    border: 0.063rem solid ${(_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.grey[400]};
    border-radius: 0.188rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0.1rem;
    user-select: none;
    min-width: 6rem;
  }

  .relatesToBadgeContainer:hover {
    background-color: ${(_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.grey[300]};
  }

  .relatesToBadge {
    background-image: url(${iconBase64string});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 1rem;
    width: 1rem;
  }

  .relatesToBadgeName {
    font-size: 0.75rem;
    padding-left: 0.5rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: ${MAX_WIDTH_FOR_POPOVER_LIST_BADGE}px) {
    .relatesToBadgeContainer {
      padding: 0.375rem;
      width: auto;
      min-width: 1rem;
    }

    .relatesToBadgeName {
      display: none;
    }
  }
`;
};
export default styles;
//# sourceMappingURL=popover.style.js.map