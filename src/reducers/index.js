import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import employees from './employeesReducer';
import ajaxLoading from './ajaxLoadingReducer';

const rootReducer = combineReducers({
    employees,
    ajaxLoading,
    form: formReducer
});

export default rootReducer;