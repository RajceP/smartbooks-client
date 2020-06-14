import React from 'react';

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    charcoal: '#343837',
    blue: '#03719C',
    green: '#0F9B8E',
    hover: '#87CDC6',
  },
  mediaQueries: {
    large: '(min-width: 1280px)',
    medium: '(min-width: 680px)',
    small: '(min-width: 450px)',
    landscape: '(max-height: 570px)',
  },
  shadow:
    '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
