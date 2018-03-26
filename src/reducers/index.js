import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import crudReducer from './crud_reducer';
import userReducer from './user_reducer';
import alertsReducer from './alerts_reducer';
import { reducers as swalReducers } from 'react-redux-sweetalert2';

const rootReducer = combineReducers({
  form,
  crudStore: crudReducer,
  user: userReducer,
  alerts: alertsReducer,
  swal: swalReducers
});

export default rootReducer;
