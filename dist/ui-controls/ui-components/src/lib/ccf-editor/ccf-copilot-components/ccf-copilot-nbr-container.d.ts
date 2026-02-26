interface CcfCopilotNBRContainerProps {
    caseId: string;
    responses: string[] | null;
}
/**
 * Component that displays copilot nbr container
 * @returns NBR container
 * @example <CcfCopilotNBRContainer/>
 */
declare const CcfCopilotNBRContainer: ({ caseId, responses }: CcfCopilotNBRContainerProps) => JSX.Element;
export default CcfCopilotNBRContainer;
