import { Status } from '../ccf-agent-state.slice';
export interface CcfAgentStateCodeProps {
    fav: Status;
    updateAgentState: (state: Status) => void;
}
/**
 * Component displays of State code items for favourite and all agent states
 * @param props -CcfAgentStateCodeProps
 * @returns - state code item component
 * @example `<CcfAgentStateCode fav={fav} />`
 */
export declare function CcfAgentStateCode(props: CcfAgentStateCodeProps): JSX.Element;
export default CcfAgentStateCode;
