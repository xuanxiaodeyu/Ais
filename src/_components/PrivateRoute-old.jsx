import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// );

// export  {PrivateRoute};

const PrivateRouteComponent = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => (
        auth//localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}/>
   // <Route {...rest} render={props => (<Component {...props} /> )}/>
)

const mapStateToProps = (state, ownProps) => {
    return {
            auth: state.auth
        
        //logged_in: true,
        //logged_in: state.auth.logged_in,
        // location: ownProps.path,
        // routeProps: {
        //     exact: ownProps.exact,
        //     path: ownProps.path
        //}
    };
};

const PrivateRoute = connect(mapStateToProps, null,null,{pure:false,})(PrivateRouteComponent);
// export default connect(mapStateToProps, null, null, {
//      pure: false,
//    })(PrivateRoute);

export {PrivateRoute};


