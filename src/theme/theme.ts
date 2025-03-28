// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/700.css";

const theme = extendTheme({
  fonts: {
    heading: `'Source Sans Pro', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
    },
  },
  colors: {
    brand: {
      primary: "#032541",
      secondary: "#01b4e4",
      tertiary: "#1ed5aa",
    },
  },
});

export default theme;
