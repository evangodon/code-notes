import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, variables as theme } from 'css';
import Header from '@components/Header';
import SubHeader from '@components/SubHeader';
import DevIcons from '@components/icons/DevIcons';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Code Notes</title>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <>
            <Header />
            <SubHeader />
            <Component {...pageProps} data-testid="" />
            <DevIcons />
          </>
        </ThemeProvider>
        <GlobalStyles />
      </>
    );
  }
}
