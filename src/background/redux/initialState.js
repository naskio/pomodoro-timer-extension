import {DEFAULT_ROUND_TIME, DEFAULT_ROUNDS, DEFAULT_TASK} from "../config/config";

export default {
    data: {
        step: 1,
        numberOfRounds: DEFAULT_ROUNDS,
        roundNumber: 1,
        isPaused: false,
        isBreak: false,
        remaining: DEFAULT_ROUND_TIME,
        title: 'Focus only on 1 task',
        subtitle: '',
        taskDescription: DEFAULT_TASK,
        id: -1,
    },
};
