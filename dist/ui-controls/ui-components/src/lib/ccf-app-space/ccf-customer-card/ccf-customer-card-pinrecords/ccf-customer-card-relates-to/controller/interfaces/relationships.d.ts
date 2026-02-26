/**
 * @remarks - Primary RelatesTo interface
 */
export interface IRelationships {
    servicenow: IServiceNow;
    msd: IMsd;
}
/**
 * @remarks - MSD CRM specific RelatesTo interface
 */
export interface IMsd {
    phonecall: IEntity;
}
/**
 * @remarks - CRM specific RelatesTo interface
 */
export interface IServiceNow {
    sn_customerservice_case: IEntity;
    incident: IEntity;
    interaction: IEntity;
}
/**
 * @remarks - Base RelatesTo interface
 */
export interface IEntity {
    relatableEntities: string[] | [];
    relateableEntityFields: {
        [key: string]: string | string[];
    } | object;
}
