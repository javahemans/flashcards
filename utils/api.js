import { AsyncStorage } from 'react-native';

export const MFLASH_STORAGE_KEY = 'ntharani:flashcards:01';

let seedData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export function setupSeedData() {
	AsyncStorage.setItem(MFLASH_STORAGE_KEY, JSON.stringify(seedData))
	return seedData
}

export function apiFetchDecks() {
    return AsyncStorage.getItem(MFLASH_STORAGE_KEY).then(results => {
        return results === null ? setupSeedData() : JSON.parse(results)
    });
}

export function apiFetchDeck(deckTitle) {
  return AsyncStorage.getItem(MFLASH_STORAGE_KEY).then(results => {
      return JSON.parse(results)[deckTitle]
  });
}

noErr = (title) => {
  // console.log("No Error on AsyncStorage mergeItem..");
}

// Deliberately leaving this here as alternative for learning purposes. Functionally Idential.
// export const apiAddDeck = (title) => {
//   const newPayload = JSON.stringify({ [title]: { title, questions: [] } })
//   // AsyncStorage: optional callback, success is no error, eg: Build the error as part of the callback
//  return AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, newPayload, (err) => { err ? console.log("error", err) : noErr(title) })
// }

export const apiAddDeck = async (title) => {
  try {
    const newPayload = JSON.stringify({ [title]: { title, questions: [] } })
    return AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, newPayload, (err) => { err ? console.log("error", err) : noErr(title) })
    // AsyncStorage: optional callback, success is no error, eg: Build the error as part of the callback
  } catch (e) {
    console.log("ApiAddDeck Error is, ", e)    
  }
}


export const apiAddCard = async (title, card) => {
  try {
  const oldQs = await apiFetchDeck(title)
  // console.log("Card is, ", card);
  // console.log("Old Q's are, ", oldQs.questions);
  const updatedQ = [...oldQs.questions, card]
  // console.log("News Q's are, ", updatedQ);
  const newPayload = JSON.stringify({ [title]: { title, questions: updatedQ  } })
  return AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, newPayload, (err) => { err ? console.log("error", err) : console.log("No error")})

  } catch (e) {
    console.log("ApiAddCard Error is, ", e)
  }
}

export const addCardToDeck = (title, card) => {
  return AsyncStorage.getItem(MFLASH_STORAGE_KEY)
      .then(results => {
          return JSON.parse(results)[title]
      })
      .then(data => {
          const questions = data.questions.concat(card);
          AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, JSON.stringify({
              [title]: {
                  title,
                  questions
              }
          }));
      })
}

// getDecks: return all of the decks along with their titles, questions, and answers. 
// getDeck: take in a single id argument and return the deck associated with that id. 
// saveDeckTitle: take in a single title argument and add it to the decks. 
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 