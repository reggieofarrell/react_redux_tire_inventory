import {
  FETCH_COLLECTION,
  FETCH_RECORD,
  CREATE_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
  FETCHING_COLLECTION,
  LOADING_COLLECTION,
  DONE_LOADING_COLLECTION,
  SHOW_SPINNER,
  LOAD_ALL_AVAILS
} from '../actions/types';
import _ from 'lodash';

const initialState = {
  collections: {

  },
  loadingCollection: false,
  showSpinner: false,
  loadAllAvails: false
};

// incorporating state as object rather than array
export default function(state = initialState, action) {
  // setup switch statement to have the reducer listen for the imported actions
  switch (action.type) {
    case DELETE_RECORD:
      // remove recod from state so that state doesn't have to be
      // re-fetched
      return _.omit(state, action.payload);
      break;
    case FETCH_RECORD:
      return { ...state, [action.payload.data.id]: action.payload.data };
      break;

    case CREATE_RECORD:
      return { ...state, [action.payload.data.id]: action.payload.data };
      break;

    case FETCH_COLLECTION:
      return {...state, collections: { ...state.collections, [action.payload.model]: action.payload.data } };
      break;
    case LOADING_COLLECTION:
      return { ...state, loadingCollection: true };
      break;
    case DONE_LOADING_COLLECTION:
      return { ...state, loadingCollection: false, showSpinner: false };
      break;
    case SHOW_SPINNER:
      return { ...state, showSpinner: true };
      break;
    case LOAD_ALL_AVAILS:
      return { ...state, loadAllAvails: action.payload };
      break;
    // case LOAD_ALL_AVAILS:
    //   return { ...state, loadAllAvails: true };
    //   break;
    default:
      // console.log('default in crud reducers hit');
      return state;

  }
}
