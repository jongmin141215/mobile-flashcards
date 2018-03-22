import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_KEY = "MobileFlashcards";

export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((decks) => {
      console.log("decks", JSON.parse(decks))
       return JSON.parse(decks)
     })
}

export function getDeck(id) {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    .then((decks) => {
      console.log("find deck", decks)
      const parsedDecks = JSON.parse(decks)
      console.log("parsedDecks", JSON.parse(decks))
      const deckTitle = Object.keys(parsedDecks).find((deckTitle) => {
        return deckTitle === id
      })
      return parsedDecks[deckTitle];

      // console.log("FIND DECK: ", decks.find((deck) => deck.id === id))
      // return decks.find((deck) => deck.id === id)
    })
}

export function saveDeckTitle(title) {
  console.log("TITLE", title)
  console.log("JOSN", JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
  return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  // return AsyncStorage.removeItem(MOBILE_FLASHCARDS_KEY)
  console.log("card", card)
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY, (err, result) => {
    console.log("bye")
    if (result !== null) {
      result = JSON.parse(result);
      console.log("result", result)
      console.log("DATA FOUND", result)
      console.log("result[title]", result[title])
      console.log("result[title].questions", result[title].questions)
      result[title].questions.push(card)
      console.log("result[title]", result[title])
      return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
        [title]: {
          questions: result[title].questions
        }
      }))
    }
  })

}
