import React, {Fragment} from "react";
import PropTypes from "prop-types";
import './home.css';
import OutlineButton from '../../components/outlineButton';
import RedButton from '../../components/redButton';
import TaskInput from '../../components/taskInput';
import RoundNumber from '../../components/roundNumber';
import {toMMSS} from "../../../background/utils/formatter";
import {MdSkipNext, MdPlayArrow, MdPause, MdStop} from 'react-icons/md';
import Header from '../../components/header';
import Footer from '../../components/footer';
import theme from "../../styles/theme";
import styled from 'styled-components';

const Title = styled.p`
    color: ${theme.COLORS.TEXT};  
    font-size: ${theme.FONT_SIZE.LARGE};
    font-weight: ${theme.FONT_WEIGHT.BOLD};
`;

const SubTitle = styled.p`
    color: ${theme.COLORS.TEXT};  
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
`;

const Counter = styled.p`
    color: ${theme.COLORS.TEXT};  
    font-size: 80px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
`;

class Component extends React.PureComponent {
    render() {
        const {
            step,
            numberOfRounds,
            remaining,
            isPaused,
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

        return <div id="container">
            <div id="content-wrap" className="d-flex flex-column align-items-center justify-content-center text-center">
                <Header/>
                {
                    !!title && <Title className="m-0 p-0">{title}</Title>
                }
                {
                    !!subtitle && <SubTitle className="m-0 p-0">{subtitle}</SubTitle>
                }
                {
                    step === 1 && <Fragment>
                        <div className="container mb-3 mt-2">
                            <TaskInput
                                value={taskDescription}
                                onValueChange={taskValueChange}/>
                        </div>
                        <RedButton title='next' icon={MdSkipNext}
                                   onClick={nextOnPress}
                        />
                    </Fragment>
                }
                {
                    step === 2 && <Fragment>
                        <RoundNumber
                            value={numberOfRounds}
                            onValueChange={roundsNumberValueChange}
                        />
                        <div>
                            <RedButton title='start' icon={MdPlayArrow}
                                       onClick={startOnPress}
                            />
                        </div>
                    </Fragment>
                }
                {
                    step === 3 && <Fragment>
                        <Counter className="m-0 p-0">{toMMSS(remaining)}</Counter>
                        {
                            isPaused ?
                                <div className="d-flex flex-row">
                                    <div className="mr-1">
                                        <OutlineButton title='resume' icon={MdPlayArrow}
                                                       onClick={resumeOnPress}/>
                                    </div>
                                    <div className="ml-1">
                                        <RedButton title='stop' icon={MdStop}
                                                   onClick={stopOnPress}/>
                                    </div>
                                </div>
                                :
                                <RedButton title='PAUSE' icon={MdPause}
                                           onClick={pauseOnPress}
                                />
                        }
                    </Fragment>
                }
                {
                    step === 4 && <Fragment>
                        <Counter className="m-0 p-0">{'00:00'}</Counter>
                        <RedButton title='restart' icon={MdPlayArrow}
                                   onClick={stopOnPress}
                        />
                    </Fragment>
                }
            </div>
            <footer id="footer" className="text-center">
                <Footer/>
            </footer>
        </div>
    }
}

Component.propTypes = {
    step: PropTypes.number,
    numberOfRounds: PropTypes.number,
    remaining: PropTypes.number,
    isPaused: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    taskDescription: PropTypes.string,
    taskValueChange: PropTypes.func.isRequired,
    roundsNumberValueChange: PropTypes.func.isRequired,
    nextOnPress: PropTypes.func.isRequired,
    startOnPress: PropTypes.func.isRequired,
    pauseOnPress: PropTypes.func.isRequired,
    resumeOnPress: PropTypes.func.isRequired,
    stopOnPress: PropTypes.func.isRequired,
};

Component.defaultProps = {
    step: 1,
    numberOfRounds: 1,
    remaining: 1,
    isPaused: false,
    title: '',
    subtitle: '',
    taskDescription: '',
};

export default Component;
