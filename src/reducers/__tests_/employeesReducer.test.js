import employeesReducer from '../employeesReducer';
import * as employeeActions from '../../actions/employeeActions';
import * as actionTypes from '../../actions/actionTypes';



describe('employeesReducer.test.js', ()  => {

    it('has a default state', () => {
        const initialState = undefined;
        const action = { type: 'testing text' };

        const newState = employeesReducer(initialState, action);

        const expectedState = [];

        expect(newState).toEqual(expectedState);
    });


});
