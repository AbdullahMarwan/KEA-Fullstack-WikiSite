import React from "react";
import loveEmoji from "../../assets/svg/love-emoji.svg";
import mindBlownEmoji from "../../assets/svg/mind-blow-emoji.svg";
import neutralEmoji from "../../assets/svg/neutral-emoji.svg";
import { Box, Flex } from "@chakra-ui/react";

function Emoji() {
  return (
    <Flex alignItems="center" width="auto">
      {[
        { src: loveEmoji, alt: "Love Emoji", zIndex: 12 },
        {
          src: mindBlownEmoji,
          alt: "Mind Blown Emoji",
          zIndex: 11,
          marginLeft: "-0.5em",
        },
        {
          src: neutralEmoji,
          alt: "Neutral Emoji",
          zIndex: 10,
          marginLeft: "-0.5em",
        },
      ].map((emoji, index) => (
        <Box
          key={emoji.alt}
          width="2em"
          height="2em"
          zIndex={emoji.zIndex}
          marginLeft={index === 0 ? 0 : emoji.marginLeft}
          transition="transform 0.2s, z-index 0.2s"
          position="relative" // Not absolute, but still needed for z-index
          _hover={{
            transform: "scale(1.1)",
            zIndex: 20,
            cursor: "pointer",
          }}
        >
          <img
            src={emoji.src}
            alt={emoji.alt}
            style={{
              width: "100%",
              height: "100%",
              filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.2))",
            }}
          />
        </Box>
      ))}
    </Flex>
  );
}

export default Emoji;
