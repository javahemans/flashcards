import { apiFetchDecks, apiFetchDeck, apiAddDeck, apiAddCard } from '../utils/api.js'

export const ALT_FETCH_DECKS = 'ALT_FETCH_DECKS';
export const FETCH_DECKS = 'FETCH_DECKS';
export const FETCH_DECK = 'FETCH_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';


export const fetchDeck = (deckTitle) => {
  return (dispatch) => {
    apiFetchDeck(deckTitle)
    .then(data => dispatch({ type: FETCH_DECK, payload: data}))
    .catch(err => console.log(err));
  }
}


export const fetchDecks = () => {
  return (dispatch) => {
    apiFetchDecks()
    .then(data => dispatch({ type: FETCH_DECKS, payload: data}))
    .catch(err => console.log(err));
  }
}

// Getting familiar with Async/Await. Leaving it here for learning purposes. Functionally equivalent to above.

export const altFetchDecks = () => {
  return async dispatch => {
    try {
      const request = await apiFetchDecks();
      console.log("The request from await in action creator is: ", request);
      dispatch({ type : ALT_FETCH_DECKS, payload: request })    
    } catch (e) {
      dispatch({ type : ALT_FETCH_DECKS, payload: 'error' })    
    }  
  }
}


export function addDeck(title) {
  return (dispatch) => {
     apiAddDeck(title)
      .then(() => {
        // console.log("In addDeck Action - on success res is null, so we just use the title to dispatch, ", res)
        dispatch({ type: ADD_DECK, title })
      });
  }
}

export function addCard(title, card) {
  return (dispatch) => {
    console.log("In addCard, part 1, card is: ", card, title)
    apiAddCard(title, card)
      .then(res => {
        console.log("In addCard Action - - on success res is null, so we just dispatch ", res)
          dispatch({ type: ADD_CARD, title, card })
      });
  }
}
