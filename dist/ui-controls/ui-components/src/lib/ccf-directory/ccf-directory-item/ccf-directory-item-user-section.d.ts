import { Agent } from '../+state/ccf-directory.slice';
import { Dispatch } from 'react';
import { CcfTranslationKey } from '@nice-devone/i18n';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
export declare type CcfDirectoryItemUserSectionProps = {
    user: Agent;
    children?: [];
};
declare type size = 'small' | 'medium' | 'large' | undefined;
/**
 * CcfDirectoryItemUserSection used to display agent details section
 * * @param param - CcfDirectoryItemUserSection
 * @example <CcfDirectoryItemUserSection />
 */
export declare function CcfDirectoryItemUserSection({ ...rest }: CcfDirectoryItemUserSectionProps): JSX.Element;
/**
 * getTitleForDialAgent used to get the tooltip for dial in the Directory
 * * @param param - isMaxContactsInConference
 * * @param param - isAgentInConference
 * * @param param - isUserInConsult
 * * @param param - translate
 * @example getTitleForDialAgent(true,true,true, useTranslator)
 */
export declare const getTitleForDialAgent: (isMaxContactsInConference: boolean, _isAgentInConference: boolean, isUserInConsult: boolean, translate: (key: CcfTranslationKey, extraArgs?: {
    format: (string | number)[];
}) => string) => string;
/**
 * getIconForDialAgent used to get the icon for dial in the Directory
 * * @param param - isMaxContactsInConference
 * * @param param - isUserInConsult
 * * @param param - fontSize
 * @example getIconForDialAgent(true,true,true,'small' as size)
 */
export declare const getIconForDialAgent: (isMaxContactsInConference: boolean, isUserInConsult: boolean, fontSize: size) => JSX.Element;
/**
 * Function to hold current call/conference and add an agent to consult
 * * @param agent - agent object
 * * @param isAgentInConference - Agent in Conference or not
 * * @param currentConferenceNo - current conference number
 * * @param voiceContact - CXoneVoiceContact object
 * * @param dispatch - dispatch
 * @example holdAndAddAgentToConsult(agent, isAgentInConference, currentConferenceNo, voiceContact, dispatch)
 */
export declare const holdAndAddAgentToConsult: (agent: Agent, isAgentInConference: boolean, currentConferenceNo: string | undefined, voiceContact: CXoneVoiceContact, dispatch: Dispatch<any>) => void;
export {};
