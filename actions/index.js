import { getDecks } from '../utils/api';

export const FETCH_DECKS = 'FETCH_DECKS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

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
