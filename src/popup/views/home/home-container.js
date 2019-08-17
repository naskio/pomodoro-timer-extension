import React from "react";
import View from "./home-view";


class Component extends React.Component {
    constructor(props) {
        super(props);
        props.initialize();
    }

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
            taskValueChange,
            roundsNumberValueChange,
            nextOnPress,
            startOnPress,
            pauseOnPress,
            resumeOnPress,
            stopOnPress,
        } = this.props;
        return <View
            step={step}
            numberOfRounds={numberOfRounds}
            remaining={remaining}
            isBreak={isBreak}
            isPaused={isPaused}
            title={title}
            subtitle={subtitle}
            taskDescription={taskDescription}
            taskValueChange={taskValueChange}
            roundsNumberValueChange={roundsNumberValueChange}
            nextOnPress={nextOnPress}
            startOnPress={startOnPress}
            pauseOnPress={pauseOnPress}
            resumeOnPress={resumeOnPress}
            stopOnPress={stopOnPress}
        />;
    }
}

export default Component;
