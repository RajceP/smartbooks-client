import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  word-wrap: break-word;
  font-family: 'Roboto', sans-serif;
  font-kerning: normal;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
}
`;

export default GlobalStyle;
