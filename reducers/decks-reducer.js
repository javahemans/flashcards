import { FETCH_DECKS, FETCH_DECK, ADD_DECK, ADD_CARD, ALT_FETCH_DECKS } from '../actions'

function DecksReducer(state = {}, action) {
  console.log("Action in Reducer is, ", action)
  switch (action.type) {
    case ALT_FETCH_DECKS: {
      return {
        ...state,
        ...action.payload        
      }  
    }
    case FETCH_DECKS: {
      return {
        ...state,
        ...action.payload        
      }
    }
    case FETCH_DECK: {
      return {
        ...state,
      }
    }
    case ADD_DECK: {
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      }
    }
    case ADD_CARD: {
      const { title, card } = action;
      // const updatedQs = state.title
      const cpState = state[title]["questions"]

      console.log("In Reducer for ADD_CARD, updatedQs: ", cpState  )
      return {
        ...state,
        [title]: {
          title,
          questions: [...cpState, card]
        }
      }      
    }
    default:
      return state
  }
}

export default DecksReducer