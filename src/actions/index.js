import { SET_USER, CREATE_ALERT, DISMISS_ALERT } from './types';
import { client } from './client';

export function setUser() {
  return function(dispatch, getState) {
    client.get('/User/me')
      .then(response => {
        dispatch({
          type: SET_USER,
          payload: response.data
        });
      })
      .catch(error => {
        console.log('setUser Error:', error);
      });
  }
}

export function createAlert(alert) {
  return function(dispatch) {
    const newAlert = {
			id: (new Date()).getTime(),
			type: alert.type,
			headline: alert.headline,
			message: alert.message
		};

    dispatch({
      type: CREATE_ALERT,
      payload: newAlert
    });
  }
}

export function dismissAlert(alert) {
  return function(dispatch, getState) {
    const reduxState = getState();
    dispatch({
      type: DISMISS_ALERT,
      payload: reduxState.alerts[0]
    });
  }
}
