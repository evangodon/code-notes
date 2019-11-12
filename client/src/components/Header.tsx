import React from 'react';
import styled from 'styled-components';
import { Code } from 'react-feather';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <LogoContainer>
          <Code />
          Code Notes
        </LogoContainer>
        <Nav>Login</Nav>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  background-color: var(--grey-900);
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: var(--app-width);
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.h1`
  display: flex;
  align-items: center;
  font-size: var(--fs-default);

  svg {
    margin-right: 0.8rem;
  }
`;

const Nav = styled.nav`
  font-size: var(--fs-medium);
`;

export default Header;
