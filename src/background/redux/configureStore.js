import {applyMiddleware, createStore} from "redux";
import {alias} from 'webext-redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import aliases from "./aliases/aliases";
import rootReducer from './rootReducer';
import initialState from "./initialState";

const middlewares = [
    alias(aliases),
    thunk,
    logger,
];

export default () => {
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}
