// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

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
