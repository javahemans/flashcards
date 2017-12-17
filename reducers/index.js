import { combineReducers } from 'redux';
import DecksReducer from './decks-reducer.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  // state: (state = {}) => state 
  decks: DecksReducer,
  form: formReducer
})

export default rootReducer;