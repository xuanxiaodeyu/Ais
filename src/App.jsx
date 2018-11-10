import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers/history.js';
import { alertActions } from './_actions';

import "assets/scss/material-dashboard-pro-react.css"

import LoginPage  from './LoginPage.jsx';
import  RegisterPage  from './RegisterPage.jsx';
import FirstPage from 'containers/App/FirstPage.jsx'
import Dashboard from "layouts/Dashboard.jsx";
import Dashboard2 from "layouts/Dashboard2.jsx";
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            // <div className="jumbotron">
            //     <div className="container">
            //         <div className="col-sm-8 col-sm-offset-2">
            //             {alert.message &&
            //                 <div className={`alert ${alert.type}`}>{alert.message}</div>
            //             }

                        <Router history={history}>
                            <Switch>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/firstpage" component={FirstPage} />
                                <Route path="/harbourscore" component={Dashboard}/>
                                <Route path="/harbourmap" component={Dashboard2}/>
                                <Route path="/" component={LoginPage}/>
                            </Switch>
                        </Router>

            //         </div>
            //     </div>
            // </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 


