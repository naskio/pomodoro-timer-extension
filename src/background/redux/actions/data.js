import {SET_STATE} from "../actionTypes";

export const setState = (subOject) => ({
    type: SET_STATE,
    payload: subOject,
});
