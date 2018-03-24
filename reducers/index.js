import { combineReducers } from 'redux';
import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, ADD_CARD } from '../actions';

function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return { ...state, ...action.decks }
    case ADD_DECK:
      return {...state, [action.deckTitle]: {title: action.deckTitle, questions: []}};
    case ADD_CARD:
      return { ...state, [action.title]: {title: [action.title], questions: [...state[action.title].questions, { question: action.card.question, answer: action.card.answer }]}}
    default:
      return state;
  }
}
function deck(state={}, action) {
  switch(action.type) {
    case RECEIVE_DECK:
      return {...state, ...action.deck};
    default:
      return state;
  }
}
export default combineReducers({
  decks,
  deck
})
