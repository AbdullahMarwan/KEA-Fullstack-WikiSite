import { Global, css } from "@emotion/react";

const ResetCSS = () => (
  <Global
    styles={css`
      /* Reset CSS */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      figure,
      blockquote,
      dl,
      dd {
        margin: 0;
      }
      .css-1ruxp1v {
        padding: 0 !important; /* Directly target the problematic class */
      }
      /* Route container styles */
      [role="group"] {
        padding: 0 !important;
        margin: 0 !important;
      }
    `}
  />
);

export default ResetCSS;
