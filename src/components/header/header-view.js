import React, {Fragment} from 'react';
import background from '../../assets/background.png';
import background_l from '../../assets/ background-large.png';
import theme from "../../styles/theme";
import styled from 'styled-components';

const Img = styled.img`
    width: 100vw;
    pointer-events: none;
`;

const P = styled.p`       color: ${theme.COLORS.PRIMARY};
        font-size: ${theme.FONT_SIZE.LARGE};
        font-weight: ${theme.FONT_WEIGHT.BOLD};
`;

export default class View extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <div className="d-none d-md-block">
                    <Img className="pb-5 mb-5" src={background_l} alt="Promodoro Timer Logo"/>
                </div>
                <div className="d-block d-md-none text-center">
                    <Img src={background} alt="Promodoro Timer Mobile Logo"/>
                    <P className="mt-2 mb-5">Productive as never !</P>
                </div>
            </Fragment>
        );
    }
}
