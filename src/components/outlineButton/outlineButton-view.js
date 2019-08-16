import React, {Fragment} from "react";
import PropTypes from "prop-types";
import theme from "../../styles/theme";
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 16px;
    border-width: 4px;
    padding: 4px 4px 4px 16px;
    background-color: ${theme.COLORS.SECONDARY};
    border-color: ${theme.COLORS.PRIMARY_DARK};
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
      box-shadow: 0 0 0.2rem ${theme.COLORS.PRIMARY_DARK};
    }
`;

const TextLr = styled.p`
        color: ${theme.COLORS.PRIMARY_DARK};
        font-weight: ${theme.FONT_WEIGHT.MEDIUM};
        font-size: 2rem;
        vertical-align: middle;
`;

const TextSm = styled.p`
        color: ${theme.COLORS.PRIMARY_DARK};
        font-weight: ${theme.FONT_WEIGHT.MEDIUM};
        font-size: 1.5rem;
        vertical-align: middle;
`;

class Component extends React.PureComponent {
    render() {
        const {title, icon, onClick, disabled} = this.props;
        const Icon = icon;
        return (
            <Fragment>
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    className="d-none d-md-inline"
                >
                    <TextLr className="d-inline">
                        {title.toUpperCase()}
                    </TextLr>
                    <Icon
                        size={72}
                        color={theme.COLORS.PRIMARY_DARK}
                    />
                </Button>
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    className="d-inline d-md-none"
                >
                    <TextSm className="d-inline">
                        {title.toUpperCase()}
                    </TextSm>
                    <Icon
                        size={48}
                        color={theme.COLORS.PRIMARY_DARK}
                    />
                </Button>
            </Fragment>)
    }
}

Component.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

Component.defaultProps = {
    title: '',
    onClick: () => {
    },
    disabled: false,
};

export default Component;
