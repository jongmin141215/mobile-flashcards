import { combineReducers } from 'redux';
import { RECEIVE_DECKS, ADD_DECK } from '../actions';

function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      console.log("RECEIVE_DECKS", { ...state, ...action.decks })
      return { ...state, ...action.decks }
    case ADD_DECK:
      console.log("ADD_DECK", {...state, [action.deckTitle]: {title: action.deckTitle, questions: []}})
      return {...state, [action.deckTitle]: {title: action.deckTitle, questions: []}};
    default:
      return state;
  }
}
export default combineReducers({
  decks
})
