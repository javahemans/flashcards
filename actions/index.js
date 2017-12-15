import { apiFetchDecks } from '../utils/api.js'

export const ALT_FETCH_DECKS = 'ALT_FETCH_DECKS';
export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_DECK = 'ADD_DECK';


export const fetchDecks = (request) => {
  return {
    type : FETCH_DECKS,
    payload: request
  }    
}

export const altFetchDecks = async () => {

  try {
    const request = await apiFetchDecks();
    console.log("The request from await in action creator is: ", request);
    return {
      type : ALT_FETCH_DECKS,
      payload: request
    }    
  } catch (e) {
    return {
      type : ALT_FETCH_DECKS,
      payload: 'error'
    }    
  }

}


export const addDeck = (deck) => {
  return {
    type : ADD_DECK,
    payload
  }
}