/**
 * interface type for Click To Act data
 */
export interface ClickToActData {
    /**
     * Type of the field (such as Phone, Email...)
     */
    type: string;
    /**
     * Value of the field (such as phone number or email address)
     * @example "(123)234-4567" "example\@mail.com"
     */
    value: string;
    /**
     * Name of the field (such as mobile, home, work, email...)
     */
    name?: string;
    /**
     * CRM Entity API Name
     */
    entity?: string;
    /**
     * CRM Entity Id
     */
    entityId?: string;
    /**
     * CRM Entity Display Name
     */
    entityLabel?: string;
}
