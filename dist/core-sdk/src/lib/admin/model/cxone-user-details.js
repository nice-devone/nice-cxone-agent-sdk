import { parseBooleanString } from '@nice-devone/common-sdk';
/**
 * Model to hold the details of an User
 */
export class CXoneUserDetails {
    /**
     * Function to parse the response from API to model
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.billable = parseBooleanString(data === null || data === void 0 ? void 0 : data.billable);
        this.displayName = data.displayName;
        this.emailAddress = data.emailAddress;
        this.firstName = data.firstName;
        this.fullName = data.fullName;
        this.id = data.id;
        this.lastName = data.lastName;
        this.middleName = data.middleName;
        this.mobileNumber = data.mobileNumber;
        this.mobileNumber2 = data.mobileNumber2;
        this.roleUuid = data.roleUUID;
        this.status = data.status;
        this.teamId = data === null || data === void 0 ? void 0 : data.teamId;
        this.timeZone = data.timeZone;
        this.type = data.type;
        this.userName = data.userName;
        const customAttrib = data.customAttributes;
        this.customAttributes = {};
        Object.keys(customAttrib).forEach(attribute => {
            var _a;
            const attribObj = customAttrib[attribute];
            if (attribObj && attribObj.id) {
                this.customAttributes[attribObj.id] = (((_a = attribObj.values) === null || _a === void 0 ? void 0 : _a.length) > 0) ? attribObj.values[0].value : '';
            }
        });
    }
}
//# sourceMappingURL=cxone-user-details.js.map