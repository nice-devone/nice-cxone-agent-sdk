import { useReducer } from 'react';
// eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
const updateReducer = (num) => (num + 1) % 1000000;
// eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
export const useUpdate = () => {
    const [, update] = useReducer(updateReducer, 0);
    return update;
};
//# sourceMappingURL=useUpdate.js.map