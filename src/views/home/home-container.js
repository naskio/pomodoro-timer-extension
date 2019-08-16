import React from "react";
import {speak, initTts} from "../../utils/tts";
import View from "./home-view";
import Timer from '../../utils/timer';
import {DEFAULT_BREAK_TIME, DEFAULT_ROUND_TIME, DEFAULT_ROUNDS, DEFAULT_TASK} from "../../config/config";


const initialState = {
    step: 1,
    numberOfRounds: DEFAULT_ROUNDS,
    roundNumber: 1,
    isPaused: false,
    isBreak: false,
    remaining: DEFAULT_ROUND_TIME,
    title: 'Focus only on 1 task',
    subtitle: '',
    taskDescription: DEFAULT_TASK,
};

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.timer = new Timer(1000, this.secondAction);
    }

    componentDidMount() {
        initTts();
    }

    componentWillUnmount() {
        this.timer.stop();
    }

    taskValueChange = (event) => {
        this.setState({taskDescription: event.target.value});
    };
    roundsNumberValueChange = (value) => {
        this.setState({numberOfRounds: value});
    };
    nextOnPress = () => {
        const {taskDescription} = this.state;
        if (!taskDescription) {
            this.setState({taskDescription: 'Your task...'});
        }
        this.setState({step: 2, title: 'Number of rounds'});
    };
    startOnPress = () => {
        const {
            roundNumber,
            taskDescription,
        } = this.state;
        this.setState({
            step: 3,
            title: `Round ${roundNumber}`,
            subtitle: taskDescription,
        });
        this.timer.start();
        speak('Start working');
    };
    pauseOnPress = () => {
        this.setState({
            isPaused: true,
        });
        this.timer.stop();
    };
    resumeOnPress = () => {
        this.setState({
            isPaused: false,
        });
        this.timer.start();
    };
    stopOnPress = () => {
        this.setState(initialState);
        this.timer.stop();
    };
    secondAction = () => {
        const {
            numberOfRounds,
            roundNumber,
            remaining,
            isBreak,
            taskDescription,
        } = this.state;
        const newRemaining = remaining - 1;
        if (newRemaining <= 0) {
            if (isBreak) {
                // end of the break, start of a new round
                this.setState({
                    isBreak: false,
                    roundNumber: roundNumber + 1,
                    remaining: DEFAULT_ROUND_TIME,
                    title: `Round ${roundNumber + 1}`,
                    subtitle: taskDescription,
                });
                speak(`Round ${roundNumber + 1} has started`);
            } else {
                if (roundNumber >= numberOfRounds) {
                    // the end of all rounds
                    this.setState({remaining: 0, step: 4, title: 'Congratulations!', subtitle: 'You have finished'});
                    this.timer.stop();
                    speak('Congratulations, you have finished');
                } else {
                    // start of a break, end of a round
                    this.setState({
                        isBreak: true,
                        remaining: DEFAULT_BREAK_TIME,
                        title: 'Take a break',
                        subtitle: '',
                    });
                    speak('Take a break');
                }
            }
        } else {
            this.setState({remaining: newRemaining});
        }
    };


    render() {
        const {
            step,
            numberOfRounds,
            remaining,
            isPaused,
            isBreak,
            title,
            subtitle,
            taskDescription,
        } = this.state;
        return <View
            step={step}
            numberOfRounds={numberOfRounds}
            remaining={remaining}
            isBreak={isBreak}
            isPaused={isPaused}
            title={title}
            subtitle={subtitle}
            taskDescription={taskDescription}
            taskValueChange={this.taskValueChange}
            roundsNumberValueChange={this.roundsNumberValueChange}
            nextOnPress={this.nextOnPress}
            startOnPress={this.startOnPress}
            pauseOnPress={this.pauseOnPress}
            resumeOnPress={this.resumeOnPress}
            stopOnPress={this.stopOnPress}
        />;
    }
}

export default Component;
