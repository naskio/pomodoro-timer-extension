import initialState from '../initialState';
import {SET_STATE} from "../actionTypes";

export default (state = initialState.data, action) => {
    if (action.type === SET_STATE) {
        return {
            ...state,
            ...action.payload
        };
    } else {
        return state;
    }
};
