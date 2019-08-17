import {DEFAULT_BREAK_TIME, DEFAULT_ROUND_TIME} from "../../config/config";
import {SET_STATE} from "../actionTypes";
import {DESTROY, INITIALIZE, NEXT, PAUSE, RESUME, ROUNDS_CHANGE, START, STOP, TASK_CHANGE} from "../../../aliasTypes";
import initialState from "../initialState";
import {initTts, speak} from "../../utils/tts";

const start = (dispatch, getState) => setInterval(secondAction(dispatch, getState), 1000);

const stop = (id) => id !== -1 && clearInterval(id);

// DONE
const secondAction = (dispatch, getState) => () => {
    const {
        numberOfRounds,
        roundNumber,
        remaining,
        isBreak,
        taskDescription,
        id,
    } = getState().data;
    const newRemaining = remaining - 1;
    if (newRemaining <= 0) {
        if (isBreak) {
            // end of the break, start of a new round
            dispatch({
                type: SET_STATE,
                payload: {
                    isBreak: false,
                    roundNumber: roundNumber + 1,
                    remaining: DEFAULT_ROUND_TIME,
                    title: `Round ${roundNumber + 1}`,
                    subtitle: taskDescription,
                },
            });
            speak(`Round ${roundNumber + 1} has started`);
        } else {
            if (roundNumber >= numberOfRounds) {
                // the end of all rounds
                stop(id);
                dispatch({
                    type: SET_STATE,
                    payload: {
                        remaining: 0, step: 4, title: 'Congratulations!', subtitle: 'You have finished',
                        id: -1,
                    },
                });
                speak('Congratulations, you have finished');
            } else {
                // start of a break, end of a round
                dispatch({
                    type: SET_STATE,
                    payload: {
                        isBreak: true,
                        remaining: DEFAULT_BREAK_TIME,
                        title: 'Take a break',
                        subtitle: '',
                    },
                });
                speak('Take a break');
            }
        }
    } else {
        dispatch({
            type: SET_STATE,
            payload: {remaining: newRemaining},
        });
    }
};

// DONE
const destroy = (originalAction) => (dispatch, getState) => {
    const {id} = getState().data;
    stop(id);
    dispatch(originalAction);
};

// DONE
const initialize = (originalAction) => {
    initTts();
    return originalAction;
};


// DONE
const taskValueChange = ({payload}) => {
    return {
        type: SET_STATE,
        payload: {taskDescription: payload.value},
    };
};

// DONE
const roundsNumberValueChange = ({payload}) => {
    return {
        type: SET_STATE,
        payload: {numberOfRounds: payload.value},
    };
};

// DONE
const nextOnPress = () => (dispatch, getState) => {
    const {taskDescription} = getState().data;
    if (!taskDescription) {
        dispatch({
                type: SET_STATE,
                payload: {taskDescription: 'Your task...'},
            }
        );
    }
    dispatch({
            type: SET_STATE,
            payload: {step: 2, title: 'Number of rounds'},
        }
    );
};

//
const startOnPress = () => (dispatch, getState) => {
    const {
        roundNumber,
        taskDescription,
    } = getState().data;
    const newId = start(dispatch, getState);
    dispatch({
        type: SET_STATE,
        payload: {
            step: 3,
            title: `Round ${roundNumber}`,
            subtitle: taskDescription,
            id: newId,
        },
    });
    speak('Start working');
};

const pauseOnPress = () => (dispatch, getState) => {
    const {id} = getState().data;
    stop(id);
    dispatch({
        type: SET_STATE,
        payload: {
            isPaused: true,
            id: -1,
        },
    });
};

const resumeOnPress = () => (dispatch, getState) => {
    const newId = start(dispatch, getState);
    dispatch({
        type: SET_STATE,
        payload: {
            isPaused: false,
            id: newId,
        },
    });
};

const stopOnPress = () => (dispatch, getState) => {
    const {id} = getState().data;
    stop(id);
    dispatch({
        type: SET_STATE,
        payload: initialState.data,
        id: -1,
    });
};

export default {
    [DESTROY]: destroy,
    [INITIALIZE]: initialize,
    [NEXT]: nextOnPress,
    [PAUSE]: pauseOnPress,
    [RESUME]: resumeOnPress,
    [ROUNDS_CHANGE]: roundsNumberValueChange,
    [START]: startOnPress,
    [STOP]: stopOnPress,
    [TASK_CHANGE]: taskValueChange,
};
