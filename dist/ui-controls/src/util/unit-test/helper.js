import mediaQuery from 'css-mediaquery';
/**
   * createMatchMedia function is used to resize the screen
   * @example `createMatchMedia('400px', jest)`
  */
export const createMatchMedia = (width, jest) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: mediaQuery.match(query, { width }),
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
};
//# sourceMappingURL=helper.js.map