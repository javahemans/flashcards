import { AsyncStorage } from 'react-native';

export const MFLASH_STORAGE_KEY = "1AAeoqve1";

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

export function apiFetchDecks() {
    return AsyncStorage.getItem(MFLASH_STORAGE_KEY).then(results => {
        return results === null ? seedData : JSON.parse(results)
    });
}

export function apiFetchDeck(deckTitle) {
  return AsyncStorage.getItem(MFLASH_STORAGE_KEY).then(results => {
      return results === null ? seedData : JSON.parse(results)
  });
}

// export function addDeck(deckTitle) {
//     return AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, JSON.stringify(deckTitle));
// }

export const apiAddDeck = (title) => {
  const newPayload = JSON.stringify({ [title]: { title, questions: [] } })
  return AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, newPayload, (err) => {console.log("error", err)})
}

export const addCard = (key, value) =>
AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, JSON.stringify({ [key]: { questions: value } }));

// export function addQuestionForDeck({card, deckName}) {
//     return AsyncStorage.getItem(MFLASH_STORAGE_KEY, (err, result) => {
//         let decks = JSON.parse(result);

//         let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions));
//         newQuestions[newQuestions.length] = card;

//         const value = JSON.stringify({
//             [deckName]: {title: deckName, questions: newQuestions},
//         });

//         AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, value);
//     });
// }

// getDecks: return all of the decks along with their titles, questions, and answers. 
// getDeck: take in a single id argument and return the deck associated with that id. 
// saveDeckTitle: take in a single title argument and add it to the decks. 
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 