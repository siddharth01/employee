import axios from 'axios';
import * as types from './actionTypes';

export function addEmployee(employee) {
    return { type: types.ADD_EMPLOYEE, employee};
}

export function editEmployee(employee) {
    return { type: types.EDIT_EMPLOYEE, employee};
}

export function deleteEmployee(id) {
    return { type: types.DELETE_EMPLOYEE, id};
}

export function setEmployees(employees) {
    return { type: types.SET_EMPLOYEES, employees};
}

export function ajaxLoading(status) {
    return { type: types.AJAX_LOADING, status};
}

export function getEmployees() {
    return dispatch => {
        dispatch(ajaxLoading(true));
        axios.get('data.json')
            .then(response => {
                dispatch(setEmployees(response.data));
                dispatch(ajaxLoading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(ajaxLoading(false));
            });
    };
}