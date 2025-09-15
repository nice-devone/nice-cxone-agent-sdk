/**
 * Model to hold the details of an User
 */
export declare class CXoneUserDetails {
    /**
     * @remarks True if is billable
     */
    billable: boolean;
    /**
     * @remarks User's custom attributes, if configured
     */
    customAttributes: {
        [key: string]: string;
    };
    /**
     * @remarks User's display name
     */
    displayName: string;
    /**
     * @remarks User's email address
     */
    emailAddress: string;
    /**
     * @remarks User's first name
     */
    firstName: string;
    /**
     * @remarks User's full name
     */
    fullName: string;
    /**
     * @remarks User's Unique Identifier (GUID)
     */
    id: string;
    /**
     * @remarks User's last name
     */
    lastName: string;
    /**
     * @remarks User's middle name
     */
    middleName: string;
    /**
     * @remarks User's primary mobile number
     */
    mobileNumber: string;
    /**
     * @remarks User's secondary mobile number
     */
    mobileNumber2: string;
    /**
     * @remarks User's Primary Role Identifier (GUID)
     */
    roleUuid: string;
    /**
     * @remarks User's current status
     */
    status: string;
    /**
     * @remarks User's Team Identifier (GUID)
     */
    teamId: string;
    /**
     * @remarks User's time zone value
     */
    timeZone: string;
    /**
     * @remarks User type
     */
    type: string;
    /**
     * @remarks User's login name
     */
    userName: string;
    /**
     * Function to parse the response from API to model
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data: {
        [key: string]: unknown;
    }): void;
}
