import { CommitmentEvent, CommitmentStatusEvent, HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
import { CommitmentRequest, CommitmentResponse } from './model/commitment';
/**
 * Class to manage all commitments related methods
 */
export declare class CommitmentService {
    private static GET_COMMITMENTS;
    private static CREATE_COMMITMENT;
    private static EDIT_COMMITMENT;
    private static DELETE_COMMITMENT;
    private static MAKE_COMMITMENT_CALL;
    private static RESCHEDULE_COMMITMENT;
    private static CANCEL_COMMITMENT;
    private auth;
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private acdSession;
    onUpdateCommitments: Subject<unknown>;
    onCommitmentEvent: Subject<CommitmentEvent>;
    onCommitmentStatusEvent: Subject<CommitmentStatusEvent>;
    /**
     * get instance for initialize commitments
     * @example
     * ```
     * new CommitmentService();
     * ```
     */
    constructor();
    /**
     * Method to update commitments
     * ```
     * @example
     * this.updateCommitments();
     * ```
     */
    private updateCommitments;
    /**
     * Method to get PromiseKeeper event
     * ```
     * @example
     * this.promiseKeeper(callDetails);
     * ```
     */
    private promiseKeeper;
    /**
     * Method to get PromiseKeeperStatus event and emit commitment reschedule event
     * ```
     * @example
     * this.promiseKeeperStatus(status);
     * ```
     */
    private promiseKeeperStatus;
    /**
     * This method is to get all the commitments
     * @param agentId -  unique id of agent
     * @example
     * ```
     * getCommitments(1464319);
     * ```
     */
    getCommitments(agentId: number): Promise<CommitmentResponse[]>;
    /**
     * This method is to make a call on receive commitment
     * @param callbackId - callbackId of commitment
     * @example
     * ```
     * makeCommitmentCall(callbackId);
     * ```
     */
    makeCommitmentCall(callbackId: number): Promise<unknown>;
    /**
     * This method is to reschedule commitment for schedule app
     * @param callbackId - callbackId of commitment
     * @param rescheduleDate - date for reschedule commitment
     * @example
     * ```
     * rescheduleCommitment(callbackId, rescheduleDate);
     * ```
     */
    rescheduleCommitment(callbackId: number, rescheduleDate: string): Promise<unknown>;
    /**
     * This method is to cancel commitment which is shown in assignment app
     * @param callbackId - callbackId of commitment
     * @param description - short description for cancel commitment
     * @example
     * ```
     * cancelCommitment(callbackId);
     * ```
     */
    cancelCommitment(callbackId: number, notes?: string): Promise<HttpResponse>;
    /**
     * This method is to create commitment for schedule app
     * @param commitmentRequest -  commitment details
     * @example
     * ```
     * createCommitment(commitmentDetail);
     * ```
     */
    createCommitment(commitmentRequest: CommitmentRequest): Promise<HttpResponse>;
    /**
     * This method is to edit commitment for schedule app
     * @param callbackId - unique id of callback
     * @param commitmentRequest -  commitment details
     * @example
     * ```
     * editCommitment(1073743450, commitmentDetail);
     * ```
     */
    editCommitment(callbackId: number, commitmentRequest: CommitmentRequest): Promise<HttpResponse>;
    /**
     * This method is to delete commitment for schedule app
     * @param callbackId -  unique callback id
     * @example
     * ```
     * deleteCommitment(1073743450);
     * ```
     */
    deleteCommitment(callbackId: number, description?: string): Promise<HttpResponse>;
}
