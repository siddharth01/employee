import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as employeeActions from '../actions/employeeActions';
// Child components
import EmployeeForm from '../components/EmployeeForm';

class AddEmployeePage extends React.Component {
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
            // Add new ID and empty array of bids to form fields
            let employee = Object.assign({}, this.props.employeeForm.values, {
                id: this.props.newId
            });
            this.props.actions.addEmployee(employee);
            this.setState({formStatus: 'success'});
        } else {
            this.setState({formStatus: 'error'});
        }
    }

    render() {
        return (
            <div className="add-employee">
                <h1 className="text-center text-capitalize">Add new employee</h1>
                <EmployeeForm onSubmit={this.handleSubmit} formStatus={this.state.formStatus} />
            </div>
        )
    }
}

// Generate ID for new employee
function generateNewId(employees) {
    // Clone employees array
    let sortedEmployees = employees.slice(0);
    // Sort employees by ID
    sortedEmployees = sortedEmployees.sort(function(a, b) {
        return b.id - a.id;
    });
    let lastId = sortedEmployees.length ? parseInt(sortedEmployees[0].id, 10) : 0;
    return lastId + 1;
}

function mapStateToProps(state) {
    let newId = generateNewId(state.employees);
    return {
        employeeForm: state.form.employee,
        newId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeePage);