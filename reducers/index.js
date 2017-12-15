import { FETCH_DECKS, ADD_DECK, ALT_FETCH_DECKS } from '../actions'

function entries(state = {}, action) {
  console.log("Action in Reducer is, ", action)
  switch (action.type) {
    case ALT_FETCH_DECKS:
    return {
      ...state,
      ...action.payload        
    }
    case FETCH_DECKS:
      return {
        ...state,
        ...action.payload        
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default entries