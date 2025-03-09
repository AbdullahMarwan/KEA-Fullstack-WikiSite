import React from "react";
import { UnorderedList, ListItem, Link } from "@chakra-ui/react";

const BurgerMenu = () => {
  return (
    <UnorderedList styleType="none" fontWeight={"500"}>
      <ListItem mb={2}>
        <Link href="#" fontSize={"1.25em"} color="white">
          Film
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" fontSize={"1.25em"} color="white">
          TV-Serier
        </Link>
      </ListItem>
      <ListItem mb={4}>
        <Link href="#" fontSize={"1.25em"} color="white">
          Personer
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          Bidragsbibel
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          Diskussioner
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          Leaderboard
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          API
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          Support
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          Om
        </Link>
      </ListItem>
      <ListItem mb={2}>
        <Link href="#" color="#A0AEC0">
          Log ind
        </Link>
      </ListItem>
    </UnorderedList>
  );
};

export default BurgerMenu;
