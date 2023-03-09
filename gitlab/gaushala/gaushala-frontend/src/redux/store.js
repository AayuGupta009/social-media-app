import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./reducer/";
// import logger from 'redux-logger';
const store = createStore(
  reducers,
  compose(composeWithDevTools(applyMiddleware(thunk)))
);

export default store;
