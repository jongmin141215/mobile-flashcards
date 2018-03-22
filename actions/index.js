import { getDecks, saveDeckTitle, getDeck, addCardToDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const ADD_CARD = 'ADD_CARD';

export const fetchDecks = () => (dispatch) => {
  return getDecks()
    .then((decks) => {
      console.log("DECKS (action): ", decks)
      dispatch(receiveDecks(decks))
    })
    .catch((error) => console.warn("Error:", error))
}

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const fetchDeck = (id) => (dispatch) => {
  return getDeck(id)
    .then((deck) => {
      console.log("DECK (action): ", deck)
      dispatch(receiveDeck(deck))
    })
    .catch((error) => console.warn("Error:", error))
}
export const receiveDeck = (deck) => {
  return {
    type: RECEIVE_DECK,
    deck
  }
}
export const saveDeck = (deckTitle) => (dispatch) => {
  return saveDeckTitle(deckTitle)
    .then(() => {
      console.log("Save DECK", deckTitle)
      dispatch(addDeck(deckTitle))
    })
    .catch((error) => console.warn("Error:", error))
}
export const addDeck = (deckTitle) => {
  return {
    type: ADD_DECK,
    deckTitle
  }
}
export const saveCard = (title, card) => (dispatch) => {
  return addCardToDeck(title, card)
    .then(() => {
      dispatch(addCard(title, card))
    })
    .catch((error) => console.warn("Error:", error))
}

export const addCard = (title, card) => {
  console.log("title", title)
  console.log("card", card)
  return {
    type: ADD_CARD,
    title,
    card
  }
}
