import {combineReducers} from "redux";

import data from "./reducers/data";


// mapping the name of a reducer to the reducer function (=> state : { messages:{ ... }, ... })
export default combineReducers({
    // blank: function (state, action) {
    //     if (state == null) state = [];
    //     return state;
    // }
    data,
});
