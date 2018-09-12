import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';

// Employee form
let EmployeeForm = ({onSubmit, submitting, formStatus}) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-lg-4 col-sm-push-3 col-lg-push-4">
                <form onSubmit={ onSubmit } noValidate>
                    <Field name="firstname" component={renderField} type="text"
                           id="first-name" label="First Name"/>
                    <Field name="lastname" component={renderField} type="text"
                           id="last-name" label="Last Name"/>
                    <Field name="email" component={renderField} type="email"
                           id="email-address" label="Email Address"/>
                    <Field name="phone" component={renderField} type="tel"
                           id="phone-number" label="Phone Number"/>
                    
                    <button type="submit" className="btn btn-primary employee-submit" disabled={submitting}>Submit</button>
                </form>
                {formStatus === 'success' &&
                <p className="alert alert-success">
                    Employee successfully saved.
                    <NavLink to="/employees/1"> Return to employee list</NavLink>
                </p>}
                {formStatus === 'error' &&
                <p className="alert alert-danger">Saving employee failed. Please fill in all the fields.</p>}
            </div>
        </div>
    )
};

// Render schema for each field
const renderField = ({
    input,
    label,
    type,
    id,
    meta: {touched, error}
}) => (
        // Render schema for inputs
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>
            <input {...input} id={id} type={type} className="form-control"/>
            {touched &&
            (error &&
            <span className="error-text">
            {error}
          </span>)}
        </div>
);

// Form validation
function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'Please enter a first name';
    }

    if (!formProps.lastname) {
        errors.lastname = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formProps.phone) {
        errors.phone = 'Please enter a phone number';
    } 

    return errors;
}

EmployeeForm = reduxForm({
    form: 'employee',
    validate,
    enableReinitialize: true
})(EmployeeForm);

export default EmployeeForm;