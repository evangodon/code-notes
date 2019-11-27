import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import AppContainer from '@components/layout/AppContainer';

const TextEditor = dynamic(() => import('@components/TextEditor'), {
  ssr: false,
});

const IndexPage: NextPage = () => {
  return (
    <>
      <Container>
        <span>Home</span>
      </Container>
    </>
  );
};

IndexPage.getInitialProps = async ({ req, res }) => {
  if (res) {
    res.writeHead(302, { Location: '/practice' });
    res.end();
  }
  return { res: 'redirect' };
};

const Container = styled(AppContainer)`
  display: flex;
  justify-content: center;
  font-size: 20px;
  max-width: var(--app-width);
  margin: 0 auto;
`;

export default IndexPage;
