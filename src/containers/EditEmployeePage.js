import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as employeeActions from '../actions/employeeActions';
// Child components
import EmployeeForm from '../components/EmployeeForm';

class EditEmployeePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // Check if form has any errors
        if (!this.props.employeeForm.syncErrors) {
            // Add current employee ID and bids to form fields
            let employee = Object.assign({}, this.props.employeeForm.values, {
                id: this.props.currentEmployee.id
            });
            this.props.actions.editEmployee(employee);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            this.props.ajaxLoading ?
                <p className="text-center alert alert-info">Loading employee...</p>
                :
                !this.props.currentEmployee ?
                    <p className="text-center alert alert-danger">Employee not found.</p>
                    :
                    <div className="add-employee">
                        <h1 className="text-center text-capitalize">Edit employee information</h1>
                        <EmployeeForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus}
                                      initialValues={this.props.currentEmployee} goBack={this.props.goBack} />
                    </div>
        )
    }
}

// Find current employee based on ID passed in URL
function findCurrentEmployee(employees, id = -1) {
    // Find employee for given id
    return employees.find(employee => {
        return parseInt(employee.id, 10) === parseInt(id, 10);
    });
}

function mapStateToProps(state, ownProps) {
    let currentEmployee = state.employees.length ? findCurrentEmployee(state.employees, ownProps.match.params.id) : null;
    return {
        currentEmployee,
        employeeForm: state.form.employee,
        ajaxLoading: state.ajaxLoading,
        goBack: ownProps.history.goBack
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeePage);