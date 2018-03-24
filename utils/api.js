import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_KEY = "MobileFlashcards";

export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((decks) => {
       return JSON.parse(decks)
     })
}
export function getDeck(id) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((decks) => {
      const parsedDecks = JSON.parse(decks)
      const deckTitle = Object.keys(parsedDecks).find((deckTitle) => {
        return deckTitle === id
      })
      return parsedDecks[deckTitle];
    })
}
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}
export function addCardToDeck(title, card) {
  // return AsyncStorage.removeItem(MOBILE_FLASHCARDS_KEY)
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY, (err, result) => {
    if (result !== null) {
      result = JSON.parse(result);
      result[title].questions.push(card)
      return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
        [title]: {
          questions: result[title].questions
        }
      }))
    }
  })

}
