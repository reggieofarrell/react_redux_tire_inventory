// import axios from 'axios';
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
        .catch(response => {
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
          console.log('error fetching collection response', response);
          throw (`Error fetching records from ${endpoint}`);
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
        .catch(response => {
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

          console.log('error fetching collection response', response);
          throw (`Error fetching records from ${endpoint}`);
        });
    }
  }
}

export function createRecord(endpoint, values, successCallback, errorCallback = null) {
  return function(dispatch) {
    console.log('create record action hit');
    // const values = JSON.stringify(values);
    client.post(endpoint, values)
      .then(response => {
        console.log('create record response', response);
        successCallback();
      })
      .catch(response => {
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
        console.log('error creating record response', response);
        // throw (`Error creating record for ${endpoint}`);
      });
  }
}

export function updateRecord(endpoint, id, values, successCallback, errorCallback = null) {
  return function(dispatch) {
    console.log('update record action hit');
    client.post(`${endpoint}/${id}`, values)
      .then(response => {
        console.log('update record response', response);
        successCallback();
      })
      .catch(response => {
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
        console.log('error updating record response', response);
        // throw (`Error updating record for ${endpoint}`);
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
    console.log('delete record action hit');
    client.delete(`${endpoint}/${id}`)
      .then(response => {
        console.log('delete record response', response);
        successCallback();
      })
      .catch(response => {
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
        console.log('error deleting record response', response);
        throw (`Error deleting record for ${endpoint}`);
      });
  }
}
