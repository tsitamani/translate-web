import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { LanguageProvider } from './context/LanguageContext';
import { createRoot } from 'react-dom/client'

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        background-color: ${theme.colors.gray[80]};
      }
    `}
  />
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <GlobalStyles />
        <App />
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>
);