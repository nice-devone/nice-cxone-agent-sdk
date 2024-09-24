import { CXoneAuth } from '@nice-devone/auth-sdk';
import { ACDSessionManager, HttpClient, HttpUtilService, LocalStorageHelper, Logger } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
/**
 * Class to manage all commitments related methods
 */
export class CommitmentService {
    /**
     * get instance for initialize commitments
     * @example
     * ```
     * new CommitmentService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'CommitmentService');
        this.utilService = new HttpUtilService();
        this.acdSession = {};
        // Observer for receiving updateCallback event
        this.onUpdateCommitments = new Subject();
        // Observer for receiving PromiseKeeper event
        this.onCommitmentEvent = new Subject();
        // Observer for receiving PromiseKeeperStatus event
        this.onCommitmentStatusEvent = new Subject();
        this.auth = CXoneAuth.instance;
        this.acdSession = ACDSessionManager.instance;
        this.acdSession.onUpdateCommitments.subscribe(() => {
            this.updateCommitments();
        });
        this.acdSession.onCommitmentEvent.subscribe((callDetails) => {
            this.promiseKeeper(callDetails);
        });
        this.acdSession.onCommitmentStatusEvent.subscribe((status) => {
            this.promiseKeeperStatus(status);
        });
    }
    /**
     * Method to update commitments
     * ```
     * @example
     * this.updateCommitments();
     * ```
     */
    updateCommitments() {
        this.onUpdateCommitments.next({});
    }
    /**
     * Method to get PromiseKeeper event
     * ```
     * @example
     * this.promiseKeeper(callDetails);
     * ```
     */
    promiseKeeper(callDetails) {
        this.onCommitmentEvent.next(callDetails);
    }
    /**
     * Method to get PromiseKeeperStatus event and emit commitment reschedule event
     * ```
     * @example
     * this.promiseKeeperStatus(status);
     * ```
     */
    promiseKeeperStatus(status) {
        this.onCommitmentStatusEvent.next(status);
    }
    /**
     * This method is to get all the commitments
     * @param agentId -  unique id of agent
     * @example
     * ```
     * getCommitments(1464319);
     * ```
     */
    getCommitments(agentId) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + CommitmentService.GET_COMMITMENTS.replace('{agentId}', agentId.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                var _a, _b;
                this.logger.debug('getCommitments', 'Get Commitments success:- ' + ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.callbacks));
                resolve((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.callbacks);
            }, (error) => {
                this.logger.error('getCommitments', 'Get Commitments failed:- ' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method is to make a call on receive commitment
     * @param callbackId - callbackId of commitment
     * @example
     * ```
     * makeCommitmentCall(callbackId);
     * ```
     */
    makeCommitmentCall(callbackId) {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + CommitmentService.MAKE_COMMITMENT_CALL.replace('{sessionId}', LocalStorageHelper.getItem('acd_session_id')).replace('{callbackId}', callbackId.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('make Commitment Call', 'Make commitment call success:-' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('make Commitment Call', 'Make commitment call failed:-' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * This method is to reschedule commitment for schedule app
     * @param callbackId - callbackId of commitment
     * @param rescheduleDate - date for reschedule commitment
     * @example
     * ```
     * rescheduleCommitment(callbackId, rescheduleDate);
     * ```
     */
    rescheduleCommitment(callbackId, rescheduleDate) {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + CommitmentService.RESCHEDULE_COMMITMENT.replace('{sessionId}', LocalStorageHelper.getItem('acd_session_id')).replace('{callbackId}', callbackId.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { rescheduleDate },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('Reschedule Commitment', 'Reschedule commitment success:-' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('Reschedule Commitment', 'Reschedule commitment failed:-' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * This method is to cancel commitment which is shown in assignment app
     * @param callbackId - callbackId of commitment
     * @param description - short description for cancel commitment
     * @example
     * ```
     * cancelCommitment(callbackId);
     * ```
     */
    cancelCommitment(callbackId, notes = '') {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + CommitmentService.CANCEL_COMMITMENT.replace('{sessionId}', LocalStorageHelper.getItem('acd_session_id')).replace('{callbackId}', callbackId.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { notes },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('Cancel Commitment', 'Cancel Commitment success with callback id ' + callbackId);
                resolve(response);
            }, (error) => {
                this.logger.error('Cancel Commitment', 'Cancel Commitment failed');
                reject(error);
            });
        });
    }
    /**
     * This method is to create commitment for schedule app
     * @param commitmentRequest -  commitment details
     * @example
     * ```
     * createCommitment(commitmentDetail);
     * ```
     */
    createCommitment(commitmentRequest) {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + CommitmentService.CREATE_COMMITMENT;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: commitmentRequest,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.debug('createCommitment', 'Create Commitment success:- ' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('createCommitment', 'Create Commitment failed:- ' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method is to edit commitment for schedule app
     * @param callbackId - unique id of callback
     * @param commitmentRequest -  commitment details
     * @example
     * ```
     * editCommitment(1073743450, commitmentDetail);
     * ```
     */
    editCommitment(callbackId, commitmentRequest) {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + CommitmentService.EDIT_COMMITMENT.replace('{callbackId}', callbackId.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: commitmentRequest,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                this.logger.debug('editCommitment', 'Edit Commitment success:- ' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('editCommitment', 'Edit Commitment failed:- ' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * This method is to delete commitment for schedule app
     * @param callbackId -  unique callback id
     * @example
     * ```
     * deleteCommitment(1073743450);
     * ```
     */
    deleteCommitment(callbackId, description = '') {
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const url = baseUrl + CommitmentService.DELETE_COMMITMENT.replace('{callbackId}', callbackId.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
            body: { description },
        };
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => {
                this.logger.debug('deleteCommitment', 'Delete Commitment success with callback id ' + callbackId);
                resolve(response);
            }, (error) => {
                this.logger.error('deleteCommitment', 'Delete Commitment failed');
                reject(error);
            });
        });
    }
}
//Api uris to get, create, edit, delete commitments
CommitmentService.GET_COMMITMENTS = '/incontactapi/services/v25.0/agents/{agentId}/scheduled-callbacks';
CommitmentService.CREATE_COMMITMENT = '/incontactapi/services/v25.0/scheduled-callbacks';
CommitmentService.EDIT_COMMITMENT = '/incontactapi/services/v25.0/scheduled-callbacks/{callbackId}';
CommitmentService.DELETE_COMMITMENT = '/incontactapi/services/v25.0/scheduled-callbacks/{callbackId}';
// Api uri to make commitment call
CommitmentService.MAKE_COMMITMENT_CALL = '/incontactapi/services/v21.0/agent-sessions/{sessionId}/interactions/{callbackId}/dial';
// Api uri to reschedule commitment
CommitmentService.RESCHEDULE_COMMITMENT = '/incontactapi/services/v21.0/agent-sessions/{sessionId}/interactions/{callbackId}/reschedule';
// Api uri to reschedule commitment
CommitmentService.CANCEL_COMMITMENT = '/incontactapi/services/v21.0/agent-sessions/{sessionId}/interactions/{callbackId}/cancel';
//# sourceMappingURL=commitment-service.js.map