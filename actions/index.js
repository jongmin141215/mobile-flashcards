import { getDecks, saveDeckTitle } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';

export const fetchDecks = () => (dispatch) => {
  return getDecks()
    .then((decks) => {
      console.log("DECKS (action): ", decks)
      dispatch(receiveDecks(decks))
    })
}

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const addDeck = (deckTitle) => {
  return {
    type: ADD_DECK,
    deckTitle
  }
}
