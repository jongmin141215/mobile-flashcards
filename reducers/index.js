import { combineReducers } from 'redux';
import { RECEIVE_DECKS } from '../actions';

function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      console.log("action.", action.decks)
      return action.decks
    default:
      return state;
  }
}
export default combineReducers({
  decks
})
