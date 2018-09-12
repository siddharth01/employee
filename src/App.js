import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
// Container components
import EmployeesPage from './containers/EmployeesPage';
import EditEmployeePage from './containers/EditEmployeePage';
import AddEmployeePage from './containers/AddEmployeePage';

// Assets
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <nav className="main-nav">
                        <ul>
                            <li><NavLink activeClassName="selected" to="/employees/1">Employee list</NavLink></li>
                            <li><NavLink activeClassName="selected" to="/add">Add employee</NavLink></li>
                        </ul>
                    </nav>
                </div>

                <div className="container">
                    <Route path="/employees/:pageNo?" component={EmployeesPage}/>
                    <Route path="/add" component={AddEmployeePage}/>
                    <Route path="/edit/:id" component={EditEmployeePage}/>
                </div>
            </div>
        </Router>
    );
};

export default App;
