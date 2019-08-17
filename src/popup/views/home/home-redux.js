import Container from './home-container';
import {connect} from "react-redux";
import {DESTROY, INITIALIZE, NEXT, PAUSE, RESUME, ROUNDS_CHANGE, START, STOP, TASK_CHANGE} from "../../../aliasTypes";

const mapStateToProps = state => ({
    step: state.data.step,
    numberOfRounds: state.data.numberOfRounds,
    roundNumber: state.data.roundNumber,
    isPaused: state.data.isPaused,
    isBreak: state.data.isBreak,
    remaining: state.data.remaining,
    title: state.data.title,
    subtitle: state.data.subtitle,
    taskDescription: state.data.taskDescription,
});

const mapDispatchToProps = dispatch => ({
    initialize: () => dispatch({
        type: INITIALIZE,
        payload: {}
    }),
    destroy: () => dispatch({
        type: DESTROY,
        payload: {}
    }),
    taskValueChange: (value) => dispatch({
        type: TASK_CHANGE,
        payload: {
            value
        }
    }),
    roundsNumberValueChange: (value) => dispatch({
        type: ROUNDS_CHANGE,
        payload: {
            value
        }
    }),
    nextOnPress: () => dispatch({
        type: NEXT,
        payload: {}
    }),
    startOnPress: () => dispatch({
        type: START,
        payload: {}
    }),
    pauseOnPress: () => dispatch({
        type: PAUSE,
        payload: {}
    }),
    resumeOnPress: () => dispatch({
        type: RESUME,
        payload: {}
    }),
    stopOnPress: () => dispatch({
        type: STOP,
        payload: {}
    }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
