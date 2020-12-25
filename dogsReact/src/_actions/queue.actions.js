import { queueConstants } from '../_constants';
import { queueService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const queueActions = {
    getAll,
    update,
    add,
    getById,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        queueService.getAll()
            .then(
                queues => dispatch(success(queues)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: queueConstants.GETALL_REQUEST } }
    function success(queues) { return { type: queueConstants.GETALL_SUCCESS, queues } }
    function failure(error) { return { type: queueConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        queueService.getById(id)
            .then(
                queue => dispatch(success(queue)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: queueConstants.GET_REQUEST } }
    function success(queues) { return { type: queueConstants.GET_SUCCESS, queues } }
    function failure(error) { return { type: queueConstants.GET_FAILURE, error } }
}

function add(queue) {
    return dispatch => {
        dispatch(request(queue));

        queueService.add(queue)
            .then(
                queue => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Add Queue successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(queue) { return { type: queueConstants.ADD_REQUEST, queue } }
    function success(queue) { return { type: queueConstants.ADD_SUCCESS, queue } }
    function failure(error) { return { type: queueConstants.ADD_FAILURE, error } }
}

function update(queue) {
    return dispatch => {
        dispatch(request(queue));

        queueService.update(queue)
            .then(
                queue => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Update Queue successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(queue) { return { type: queueConstants.UPDATE_REQUEST, queue } }
    function success(queue) { return { type: queueConstants.UPDATE_SUCCESS, queue } }
    function failure(error) { return { type: queueConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        queueService.delete(id)
            .then(
                queue => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: queueConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: queueConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: queueConstants.DELETE_FAILURE, id, error } }
}