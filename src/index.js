import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store.js';
//import { store } from './store.js';
import { App } from './App.jsx';
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import moment from "moment/moment";
import 'moment/locale/zh-cn';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import ReactDOM from "react-dom";

//import {Hello}   from './Hello.jsx';

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();



ReactDOM.render(
    <MuiPickersUtilsProvider
        utils={MomentUtils}
        moment={moment}
    >
        <Provider store={store}>
       <App />
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
);

// import RaisedButtons from 'components/RaisedButton/RaisedButton.jsx';

// render(
//     <RaisedButtons/>,
//      document.getElementById('root')
//  );