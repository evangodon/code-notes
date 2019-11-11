import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Content>
        <LogoContainer>Code Notes</LogoContainer>
        <Nav>Login</Nav>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  background-color: var(--grey-900);
  margin-bottom: 6rem;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: var(--app-width);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.h1`
  font-size: var(--fs-medium);
`;

const Nav = styled.nav`
  font-size: var(--fs-medium);
`;

export default Header;
