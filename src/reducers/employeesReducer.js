import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function employeesReducer(state = initialState.employees, action) {
    switch (action.type) {
        case types.SET_EMPLOYEES:
            return action.employees;
        case types.ADD_EMPLOYEE:
            return [
                ...state,
                Object.assign({}, action.employee)
            ];
        case types.EDIT_EMPLOYEE:
            return [
                ...state.filter(employee => employee.id !== action.employee.id),
                Object.assign({}, action.employee)
            ];
        case types.DELETE_EMPLOYEE:
            return [
                ...state.filter(employee => employee.id !== action.id)
            ];
        default:
            return state;
    }

}