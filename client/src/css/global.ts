import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { customProperties } from './variables';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  ${normalize()}

  :root {
    ${customProperties}
  } 

  body {
    font-family: 'roboto-mono', monospace;
    font-weight: 400;
    font-size: var(--fs-base);
    letter-spacing: 0.5px;
    margin: 0;
    padding: 0;
    background-color: var(--grey-900);
    color: var(--fc-default);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: color, background-color .3s ease;
  }


  p {
    line-height: 1.6;
  }

  h1, h2, h3, h4 , h5, h6 {
    line-height: 1;
  }


  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: 0;
    cursor: pointer;
  }


  ::-webkit-scrollbar-thumb {
    background-color: var(--white);
  }

  ::-webkit-scrollbar-track {
    background-color: var(--grey-500);
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

`;

export default GlobalStyle;
