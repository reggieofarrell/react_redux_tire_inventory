import _ from 'lodash';
import { client } from './client';

import {
  FETCH_RECORD,
  FETCH_COLLECTION,
  UPDATE_RECORD,
  DELETE_RECORD,
  CREATE_RECORD,
  FETCHING_COLLECTION,
  CREATE_ALERT,
  LOADING_COLLECTION,
  DONE_LOADING_COLLECTION,
  SHOW_SPINNER,
  LOAD_ALL_AVAILS
} from './types';

export function loadAllAvails(bool) {
  return {
    type: LOAD_ALL_AVAILS,
    payload: bool
  };
}

export function fetchCollection(endpoint, options = null) {
  return function(dispatch, getState) {
    if (!options) {
      dispatch({
        type: LOADING_COLLECTION,
      });
      client.get(endpoint)
        .then(response => {
          const collection = {
            model: endpoint,
            data: response.data
          };

          dispatch({
            type: FETCH_COLLECTION,
            payload: collection
          });
          dispatch({
            type: DONE_LOADING_COLLECTION,
          });
        })
        .catch(error => {
          dispatch({
            type: DONE_LOADING_COLLECTION,
          });
          dispatch({
            type: CREATE_ALERT,
            payload: {
              type: 'danger',
              headline: 'Error!',
              message: 'Problem fetching records. Check your network connection.'
            }
          });
          console.log('fetchCollection Error:', error);
        });
    } else {
      dispatch({
        type: LOADING_COLLECTION,
      });
      dispatch({
        type: SHOW_SPINNER,
      });

      client.post(`${endpoint}/with_options`, JSON.stringify(options))
        .then(response => {
          const collection = {
            model: endpoint,
            data: response.data
          };

          dispatch({
            type: DONE_LOADING_COLLECTION,
          });

          dispatch({
            type: FETCH_COLLECTION,
            payload: collection
          });
        })
        .catch(error => {
          dispatch({
            type: DONE_LOADING_COLLECTION,
          });

          dispatch({
            type: CREATE_ALERT,
            payload: {
              type: 'danger',
              headline: 'Error!',
              message: 'Problem fetching records. Check your network connection.'
            }
          });

          console.log('fetchCollection Error:', error);
        });
    }
  }
}

export function createRecord(endpoint, values, successCallback, errorCallback = null) {
  return function(dispatch) {
    client.post(endpoint, values)
      .then(response => {
        successCallback();
      })
      .catch(error => {
        dispatch({
          type: CREATE_ALERT,
          payload: {
            type: 'danger',
            headline: 'Error!',
            message: 'Problem creating record. Please try again. If the problem persists contact your system admin.'
          }
        });
        if (errorCallback !== null) {
          errorCallback();
        }
        console.log('createRecord Error:', error);
      });
  }
}

export function updateRecord(endpoint, id, values, successCallback, errorCallback = null) {
  return function(dispatch) {
    console.log('update record action hit');
    client.post(`${endpoint}/${id}`, values)
      .then(response => {
        successCallback();
      })
      .catch(error => {
        dispatch({
          type: CREATE_ALERT,
          payload: {
            type: 'danger',
            headline: 'Error!',
            message: 'Problem updating record. Please try again. If the problem persists contact your system admin.'
          }
        });
        if (errorCallback !== null) {
          errorCallback();
        }
        console.log('updateRecord Error:', error);
      });
  }
}

export function fetchRecord(endpoint, id) {
  const request = client.get(`${endpoint}/${id}`);

  return {
    type: FETCH_RECORD,
    payload: request
  }
}

export function deleteRecord(endpoint, id, successCallback, errorCallback = null) {
  return function(dispatch) {
    client.delete(`${endpoint}/${id}`)
      .then(response => {
        console.log('delete record response', response);
        successCallback();
      })
      .catch(error => {
        dispatch({
          type: CREATE_ALERT,
          payload: {
            type: 'danger',
            headline: 'Error!',
            message: 'Problem deleting record. Please try again. If the problem persists contact your system admin.'
          }
        });
        if (errorCallback !== null) {
          errorCallback();
        }
        console.log('deleteRecord Error:', error);
      });
  }
}
