import { __awaiter } from "tslib";
import { AgentStateResponse, SkillEvent, DirectoryEntities, Team, } from '@nice-devone/common-sdk';
import { FeatureToggleService } from '../../feature-toggle/feature-toggle-services';
/**
 * Directory Adapter class to handle the agent api's data response
 */
export class CXoneDirectoryAdapter {
    /**
     * Used to handle the directory response and return the combined directory model object
     * @param response - the directory api response - state,skill and address book
     * @example -
     * ```
     * const directoryAdapter = new CXoneDirectoryAdapter();
     * this.directoryAdapter.handleEvent(data);
     * ```
     */
    handleEvent(response) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const agentStateList = [];
            const SkillList = [];
            const addressBookList = [];
            const teamList = [];
            let addressBookEntriesCount = 0;
            if (response.get(DirectoryEntities.AGENT_LIST)) {
                const isFTUnifyAgentStateOn = FeatureToggleService.instance.getFeatureToggleSync("release-cx-directory-agent-state-working-digital-AW-28472" /* FeatureToggles.DIRECTORY_AGENT_STATE_WORKING_DIGITAL_FEATURE_TOGGLE */);
                const agentStateValue = response.get(DirectoryEntities.AGENT_LIST);
                if (isFTUnifyAgentStateOn) {
                    if (agentStateValue.status === 'fulfilled' && ((_a = agentStateValue === null || agentStateValue === void 0 ? void 0 : agentStateValue.value) === null || _a === void 0 ? void 0 : _a.agentStates)) {
                        (_b = agentStateValue === null || agentStateValue === void 0 ? void 0 : agentStateValue.value) === null || _b === void 0 ? void 0 : _b.agentStates.forEach((state) => {
                            const agentList = new AgentStateResponse();
                            agentList.parseUpdatedAgentState(state);
                            agentStateList.push(agentList);
                        });
                    }
                }
                else {
                    if (agentStateValue.status === 'fulfilled' && ((_c = agentStateValue === null || agentStateValue === void 0 ? void 0 : agentStateValue.value.resultSet) === null || _c === void 0 ? void 0 : _c.agentState)) {
                        agentStateValue.value.resultSet.agentState.forEach((state) => {
                            const agentList = new AgentStateResponse();
                            agentList.parse(state);
                            agentStateList.push(agentList);
                        });
                    }
                }
            }
            if (response.get(DirectoryEntities.SKILL_LIST)) {
                const skillValue = response.get(DirectoryEntities.SKILL_LIST);
                if ((skillValue === null || skillValue === void 0 ? void 0 : skillValue.status) === 'fulfilled' && ((_d = skillValue.value) === null || _d === void 0 ? void 0 : _d.skillActivity)) {
                    skillValue.value.skillActivity.forEach((skill) => {
                        const skillEvent = new SkillEvent();
                        skillEvent.parse(skill);
                        SkillList.push(skillEvent);
                    });
                }
            }
            if (response.get(DirectoryEntities.ADDRESS_BOOK_LIST)) {
                const addressBookValue = response.get(DirectoryEntities.ADDRESS_BOOK_LIST);
                if ((addressBookValue === null || addressBookValue === void 0 ? void 0 : addressBookValue.status) === 'fulfilled' && (addressBookValue === null || addressBookValue === void 0 ? void 0 : addressBookValue.value.addressBooks)) {
                    addressBookValue.value.addressBooks.forEach((addressBook) => {
                        var _a;
                        const addressBooks = {
                            addressBookName: addressBook.addressBookName,
                            addressBookId: addressBook.addressBookId,
                            addressBookType: addressBook.addressBookType,
                        };
                        if ((_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookEntries) === null || _a === void 0 ? void 0 : _a.length) {
                            addressBookEntriesCount = addressBookEntriesCount + addressBook.addressBookEntries.length;
                            addressBooks.addressBooksEntries = this.formatAddressBookEntries(addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookEntries, addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBookName);
                        }
                        addressBookList.push(addressBooks);
                    });
                }
            }
            if (response.get(DirectoryEntities.TEAM_LIST)) {
                const teamListValue = response.get(DirectoryEntities.TEAM_LIST);
                if ((teamListValue === null || teamListValue === void 0 ? void 0 : teamListValue.status) === 'fulfilled' && (teamListValue === null || teamListValue === void 0 ? void 0 : teamListValue.value.teams)) {
                    teamListValue.value.teams.forEach((teamData) => {
                        const team = new Team();
                        team.parse(teamData);
                        teamList.push(team);
                    });
                }
            }
            const directoryResponse = {
                agentList: { data: agentStateList },
                skillList: { data: SkillList },
                addressBookList: addressBookEntriesCount ? { data: addressBookList } : { data: [] },
                teamList: { data: teamList },
            };
            return directoryResponse;
        });
    }
    /**
     * This method to formatAddressBookEntries
     * @example -
     * ```
     * formatAddressBookEntries(entries);
     * ```
     * @param entries - address book entries
     * @returns - formatted address book entries
     */
    formatAddressBookEntries(entries, StdAddressBookName) {
        const standardAddressBookEntries = [];
        entries.forEach((addressBook) => {
            const addressBooksEntries = {
                firstName: addressBook.firstName,
                middleName: addressBook === null || addressBook === void 0 ? void 0 : addressBook.middleName,
                lastName: addressBook.lastName,
                phone: addressBook.phone,
                mobile: addressBook.mobile,
                email: addressBook.email,
                addressBookName: StdAddressBookName,
                addressBookEntryId: addressBook.addressBookEntryId,
                externalId: addressBook === null || addressBook === void 0 ? void 0 : addressBook.externalId,
                externalState: addressBook === null || addressBook === void 0 ? void 0 : addressBook.externalState,
                company: addressBook === null || addressBook === void 0 ? void 0 : addressBook.company,
                stateId: addressBook === null || addressBook === void 0 ? void 0 : addressBook.stateId,
                isDeleted: addressBook === null || addressBook === void 0 ? void 0 : addressBook.isDeleted,
            };
            standardAddressBookEntries.push(addressBooksEntries);
        });
        return standardAddressBookEntries;
    }
}
//# sourceMappingURL=cxone-directory-adapter.js.map