// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/700.css";

const breakpoints = {
  sm: "20em",   // 320px
  md: "48em",   // 768px
  lg: "62em",   // 992px
  xl: "80em",   // 1280px
  "2xl": "96em" // 1536px
};

const theme = extendTheme({
  fonts: {
    heading: `'Source Sans Pro', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
  },
  styles: {
    global: {
      html: {
        overflowY: "scroll",
      },
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
  breakpoints, 
});

export default theme;
