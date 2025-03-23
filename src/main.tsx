import {
  ChakraProvider,
  extendTheme,
  CSSReset,
  GlobalStyle,
} from "@chakra-ui/react";
import ReactDOM from "react-dom/client"; // Use the new 'react-dom/client' package
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

const root = ReactDOM.createRoot(document.getElementById("root")!); // Create a root
root.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);
