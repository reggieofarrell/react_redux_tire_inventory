import { SET_USER } from '../actions/types';

export default function(state = { data: {}}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, data: action.payload }
      break;
    default:
      return state;

  }
}
