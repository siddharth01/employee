import React from 'react';
import {NavLink} from 'react-router-dom';
// Child components
import Pagination from './Pagination';

const EmployeeList = ({employees, onDeleteEmployee, pages, currentPage}) => {
    return (
        !employees.length ?
            <p className="alert alert-warning text-center">No  found.</p>
            :
            <div className="employee-list">
                <div className="responsive-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>
                                    <NavLink className="btn btn-primary btn-sm"
                                             to={'/edit/' + employee.id}>Edit</NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger"
                                            onClick={() => onDeleteEmployee(employee.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                { /* show pagination if there are more than 1 page */
                    pages > 1 && <Pagination pages={pages} currentPage={currentPage}/>
                }
            </div>
    )
};

export default EmployeeList;