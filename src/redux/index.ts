import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import { all } from 'redux-saga/effects';

import postsReducer, { watchListUpdate } from './ducks/posts';

const rootReducer = combineReducers({
	postsList: postsReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchListUpdate);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
