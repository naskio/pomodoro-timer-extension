import React from "react";
import PropTypes from "prop-types";
import theme from "../../styles/theme";
import styled from 'styled-components';
import {MdAdd, MdRemove} from 'react-icons/md';

const Button = styled.button`
  border-radius: 16px;
  border-width: 4px;
  border-color: ${theme.COLORS.ICONS};
  padding: 0;
    :disabled{
      background-color: ${theme.COLORS.LIGHT};
    }
    :hover{
      background-color: ${theme.COLORS.LIGHT};
    }
    :active{
      background-color: ${theme.COLORS.LIGHT};
    }
    :focus {
      outline: none !important;
      box-shadow: 0 0 0.2rem ${theme.COLORS.ICONS};
    }
`;

const Text = styled.p`
    color: ${theme.COLORS.ICONS};
    font-size: 96px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    margin: 0 32px 0 32px;
`;


class Component extends React.PureComponent {

    constructor(props) {
        super(props);
        const {value} = props;
        this.state = {value};
    }

    render() {
        const {onValueChange} = this.props;
        const {value} = this.state;
        return (<div className="d-flex flex-row align-items-center justify-content-center">
                <Button
                    onClick={
                        () => {
                            this.setState({value: value - 1});
                            onValueChange(value - 1);
                        }
                    }
                    disabled={value <= 1}
                >
                    <MdRemove
                        color={theme.COLORS.ICONS}
                        size={48}
                    />
                </Button>
                <Text>{value}</Text>
                <Button
                    onClick={() => {
                        this.setState({value: value + 1});
                        onValueChange(value + 1);
                    }}
                >
                    <MdAdd
                        color={theme.COLORS.ICONS}
                        size={48}
                    />
                </Button>
            </div>
        );
    }
}

Component.propTypes = {
    onValueChange: PropTypes.func,
    value: PropTypes.number,
};

Component.defaultProps = {
    onValueChange: (newV) => console.log(newV),
    value: 0,
};

export default Component;
