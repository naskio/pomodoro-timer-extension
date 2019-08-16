import React from 'react';
import styled from 'styled-components';
import theme from "../../styles/theme";

const Footer = styled.footer`
    font-size: 1.2em;
    text-align: center;
    color: ${theme.COLORS.TEXT};
    font-weight: 500;
`;

const Link = styled.a`
  color: ${theme.COLORS.PRIMARY};
`;

export default class View extends React.PureComponent {
    render() {
        return (
            <Footer>
                {'By '}
                <Link
                    className="d-inline"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://linkedin.com/in/khodjamehdinassim/"
                >
                    Mehdi Nassim KHODJA
                </Link>
            </Footer>
        );
    }
}
