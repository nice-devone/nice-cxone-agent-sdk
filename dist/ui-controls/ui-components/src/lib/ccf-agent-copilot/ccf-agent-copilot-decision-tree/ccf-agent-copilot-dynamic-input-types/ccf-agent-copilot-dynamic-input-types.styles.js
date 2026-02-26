import { styled } from '@mui/material/styles';
/** Generic error text */
export const ErrorText = styled('span') `
  color: red;
  font-size: 0.8rem;
`;
/** Removes default fieldset styling */
export const Fieldset = styled('fieldset') `
  border: none;
  margin: 0;
  padding: 0;
`;
/** Label spacing for Yes/No */
export const LabelSpacing = styled('label') `
  margin-right: 16px;
`;
/** Shared input styles */
export const CopilotInput = styled('input') `
  width: 100%;
  padding: 8px;
  padding-right: 40px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  opacity: 0.9;

  &:hover {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
  }

  &[data-error='true'] {
    border-color: red;
  }

  &[data-editing='true'] {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.palette.primary.main}33`};
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
/** Date input inherits CopilotInput + error color */
export const DateInput = styled(CopilotInput) `
  &[data-error='true'] {
    border-color: red;
  }
`;
/** Wrapper around the input + icons */
export const CopilotTextWrapper = styled('div') `
  position: relative;
  width: 100%;

  .edit-icon-wrapper {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out;
  }

  &:hover .edit-icon-wrapper,
  input:hover + .edit-icon-wrapper {
    opacity: 1;
    pointer-events: auto;
  }
`;
/** Edit pencil icon wrapper */
export const CopilotEditIconWrapper = styled('span') `
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;
/** Save + Cancel icons container */
export const CopilotEditActions = styled('span') `
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  gap: 5px;
  align-items: center;
`;
/** Boolean Radio */
export const CopilotRadio = styled('input') `
  margin-right: 0.25rem;
  accent-color: ${({ theme }) => theme.palette.primary.main};
`;
/** Select (dropdown) */
export const CopilotSelect = styled('select') `
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding-right: ${({ theme }) => theme.spacing(3)};
`;
/** Label above input */
export const CopilotLabelText = styled('span') `
  font-weight: 600;
  font-size: ${({ theme }) => { var _a; return ((_a = theme.typography.caption) === null || _a === void 0 ? void 0 : _a.fontSize) || '12px'; }};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing(0.625)};
`;
//# sourceMappingURL=ccf-agent-copilot-dynamic-input-types.styles.js.map