import { AsyncStorage } from 'react-native';

export const MFLASH_STORAGE_KEY = 'yyntharani-udacity-flashcards';

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

export function addDeck(deck) {
    return AsyncStorage.mergeItem(MFLASH_STORAGE_KEY, JSON.stringify(deck));
}

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

