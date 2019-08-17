import Timer from "../../utils/timer";
import {initTts, speak} from "../../utils/tts";
import {DEFAULT_BREAK_TIME, DEFAULT_ROUND_TIME} from "../../config/config";
import {SET_STATE} from "../actionTypes";
import {DESTROY, INITIALIZE, NEXT, PAUSE, RESUME, ROUNDS_CHANGE, START, STOP, TASK_CHANGE} from "../../../aliasTypes";
import initialState from "../initialState";

// DONE
const secondAction = (dispatch, getState) => () => {
    const {
        numberOfRounds,
        roundNumber,
        remaining,
        isBreak,
        taskDescription,
    } = getState();
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
                dispatch({
                    type: SET_STATE,
                    payload: {remaining: 0, step: 4, title: 'Congratulations!', subtitle: 'You have finished'},
                });
                timer.stop();
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

let timer = null;

// DONE
const destroy = (originalAction) => {
    timer.stop();
    return originalAction;
};

// DONE
const initialize = () => (dispatch, getState) => {
    initTts();
    timer = new Timer(1000, secondAction(dispatch, getState));
    dispatch({
        type: SET_STATE,
        payload: {
            type: SET_STATE,
            payload: initialState.data,
        },
    });
};


// DONE
const taskValueChange = ({payload}) => {
    return {
        type: SET_STATE,
        payload: {taskDescription: payload.event.target.value},
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
    const {taskDescription} = getState();
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
    } = getState();
    dispatch({
        type: SET_STATE,
        payload: {
            step: 3,
            title: `Round ${roundNumber}`,
            subtitle: taskDescription,
        },
    });
    timer.start();
    speak('Start working');
};

const pauseOnPress = () => {
    timer.stop();
    return {
        type: SET_STATE,
        payload: {
            isPaused: true,
        },
    };
};

const resumeOnPress = () => {
    timer.start();
    return {
        type: SET_STATE,
        payload: {
            isPaused: false,
        },
    };
};

const stopOnPress = () => {
    timer.stop();
    return {
        type: SET_STATE,
        payload: initialState.data,
    };
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
