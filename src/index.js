import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setUser } from './actions';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'
// react bootstrap table
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// react select
// import 'react-select/dist/react-select.css';

// react DatePIcker
import 'react-datepicker/dist/react-datepicker.css';

// Containers
import Full from './containers/Full/'

import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk),
  // other store enhancers if any
));

// store.dispatch({ type: SET_USER })

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" name="Home" component={Full}/>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
