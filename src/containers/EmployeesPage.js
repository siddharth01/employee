import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Actions
import * as employeeActions from '../actions/employeeActions';
// Child components
import EmployeeList from '../components/EmployeeList';

class EmployeesPage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            this.props.actions.deleteEmployee(id);
        }
    }

    render() {
        return (
            <div className="employees">
                {
                    this.props.ajaxLoading ?
                        <p className="text-center alert alert-info">Loading employees...</p>
                        :
                        <EmployeeList employees={this.props.employees} pages={this.props.pages}
                                      onDeleteEmployee={this.deleteEmployee} currentPage={this.props.currentPage} />
                }
            </div>
        )
    }
}

// Generate list of employees for given page number
function generateEmployeesByPage(employees, pageNo) {
    // I assumed showing 10 employees per page
    const perPage = 10;
    if (employees.length) {
        // Filter 10 employees by page number
        return employees.filter((employee, i) => {
            return i >= perPage*(pageNo-1) && i < perPage*pageNo;
        });
    }
    return [];
}

function mapStateToProps(state, ownProps) {
    // Set page number to 1 if no number in url params
    let pageNo = ownProps.match.params.pageNo || 1;
    let employees = generateEmployeesByPage(state.employees, pageNo);
    return {
        employees: employees,
        pages: Math.ceil(state.employees.length / 10), // Determine number of pages for pagination
        currentPage: pageNo,
        ajaxLoading: state.ajaxLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);