/**
 * Create popover styles.
 * @example generateStyles();
 * @returns styles
 **/
const generateStyles = (theme, shouldOverflow, position) => {
    var _a, _b, _c, _d, _e;
    return `
  .createPopoverContainer {
      position: absolute;
      top: ${(_a = position === null || position === void 0 ? void 0 : position.top) !== null && _a !== void 0 ? _a : 0}px;
      left: ${(_b = position === null || position === void 0 ? void 0 : position.left) !== null && _b !== void 0 ? _b : 0}px;
      z-index: 2;
      box-shadow: 0 0.063rem 0.188rem ${(_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.grey[400]};
      background-color: white;
      width: 150px;
      user-select: none;
      border: 1px solid ${(_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.grey[400]};
      max-height: ${shouldOverflow ? '150px' : 'none'};
      overflow-y: ${shouldOverflow ? 'scroll' : 'visible'};
  }

  .createPopoverContainerItem {
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0.25rem 0.45rem;
      font-size: 0.85rem;
  }

  .createPopoverContainerItem:not(:last-child) {
      border-bottom: 1px solid ${(_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.grey[300]};
  }
`;
};
export default generateStyles;
//# sourceMappingURL=ccf-customer-card-create-popover.style.js.map