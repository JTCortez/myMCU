import { combineReducers } from 'redux';
import MoviesReducer from './reducer_movie';

const rootReducer = combineReducers({
  movies: MoviesReducer
});

export default rootReducer;
