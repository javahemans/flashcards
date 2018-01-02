import { apiFetchDecks, apiAddDeck } from '../utils/api.js'

export const ALT_FETCH_DECKS = 'ALT_FETCH_DECKS';
export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_DECK = 'ADD_DECK';


// export const fetchDecks = (request) => {
//   return {
//     type : FETCH_DECKS,
//     payload: request
//   }    
// }


export const fetchDecks = () => {
  return (dispatch) => {
    apiFetchDecks()
    .then(data => dispatch({ type: FETCH_DECKS, payload: data}))
    .catch(err => console.log(err));
  }
}

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
      .then(res => {
        console.log("In addDeck Action-  this is res, ", res)
        dispatch({ type: ADD_DECK, payload: res })
      });
  }
}