import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

const middlewares = [thunk];

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
