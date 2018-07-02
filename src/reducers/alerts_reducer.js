import { CREATE_ALERT, DISMISS_ALERT } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_ALERT:
      return [ ...state, action.payload ];
      break;
    case DISMISS_ALERT:
      const alert = action.payload;
      const alerts = state;

      // find the index of the alert that was dismissed
      const idx = alerts.indexOf(alert);

      if (idx >= 0) {
        return [...alerts.slice(0, idx), ...alerts.slice(idx + 1)];
      }
      break;
    default:
      return state;

  }
}
