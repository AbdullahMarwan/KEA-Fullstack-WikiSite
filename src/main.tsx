import {
  ChakraProvider,
  extendTheme,
  CSSReset,
  GlobalStyle,
} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white", // Set your desired background color here
        color: "black",
      },
    },
  },
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
