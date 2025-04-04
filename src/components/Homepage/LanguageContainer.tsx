import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { TfiReload } from "react-icons/tfi";

const LanguageContainer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Dansk (da-DK)");
  const [selectedBackupLanguage, setSelectedBackupLanguage] =
    useState("Engelsk (en-US)");
  const [primarySearchQuery, setPrimarySearchQuery] = useState("");
  const [backupSearchQuery, setBackupSearchQuery] = useState("");
  const primaryInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  // Use separate disclosure hooks for each menu
  const primaryMenu = useDisclosure();
  const backupMenu = useDisclosure();

  const languages = [
    { value: "da", label: "Dansk (da-DK)" },
    { value: "en", label: "Engelsk (en-US)" },
    { value: "de", label: "Tysk (de-DE)" },
    { value: "fr", label: "Fransk (fr-FR)" },
    { value: "es", label: "Spansk (es-ES)" },
  ];

  const filteredPrimaryLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(primarySearchQuery.toLowerCase())
  );

  const filteredBackupLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(backupSearchQuery.toLowerCase())
  );

  const resetLanguage = () => {
    setSelectedLanguage("Dansk (da-DK)");
    setSelectedBackupLanguage("Engelsk (en-US)");
  };

  return (
    <Box
      position="absolute"
      top="100%"
      left="50%"
      transform="translateX(-50%)"
      width="300px"
      mt="10px"
      padding="20px"
      background="white"
      borderRadius="md"
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
      zIndex={1000}
    >
      <Heading fontSize="1.25em">Sprogpræferencer</Heading>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="10px"
        >
          <Text>Standard sprog</Text>
          <Button
            variant="link"
            color="#212529"
            fontWeight="400"
            size="sm"
            onClick={resetLanguage}
          >
            Nulstil
          </Button>
        </Box>
      </Box>

      <Menu
        isOpen={primaryMenu.isOpen}
        onClose={primaryMenu.onClose}
        onOpen={primaryMenu.onOpen}
      >
        <MenuButton
          color="#212529"
          fontWeight={400}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          width="100%"
          bg="#DEE3E7"
          _hover={{ bg: "#CFD5DA" }}
          _expanded={{ bg: "#CFD5DA" }}
          textAlign="left"
          justifyContent="space-between"
        >
          {selectedLanguage}
        </MenuButton>
        <MenuList maxHeight="250px" overflowY="auto" padding="0">
          <Box p={2} bg={"white"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                ref={primaryInputRef}
                border={"1px solid #01B5E5"}
                placeholder="Søg..."
                value={primarySearchQuery}
                onChange={(e) => setPrimarySearchQuery(e.target.value)}
                bg="white"
                borderRadius="md"
                autoFocus={primaryMenu.isOpen}
                onClick={(e) => e.stopPropagation()} // Prevent menu from closing when clicking the input
              />
            </InputGroup>
          </Box>
          {filteredPrimaryLanguages.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => {
                setSelectedLanguage(lang.label);
                setPrimarySearchQuery("");
                primaryMenu.onClose(); // Close menu after selection
              }}
              bg={selectedLanguage === lang.label ? "blue.50" : "white"}
            >
              {lang.label}
            </MenuItem>
          ))}
          {filteredPrimaryLanguages.length === 0 && (
            <MenuItem isDisabled>Ingen resultater fundet</MenuItem>
          )}
        </MenuList>
      </Menu>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="10px"
      >
        <Text>Tilbagefald sprog</Text>
      </Box>

      <Menu
        isOpen={backupMenu.isOpen}
        onClose={backupMenu.onClose}
        onOpen={backupMenu.onOpen}
      >
        <MenuButton
          color="#212529"
          fontWeight={400}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          width="100%"
          bg="#DEE3E7"
          _hover={{ bg: "#CFD5DA" }}
          _expanded={{ bg: "#CFD5DA" }}
          textAlign="left"
          justifyContent="space-between"
        >
          {selectedBackupLanguage}
        </MenuButton>
        <MenuList maxHeight="250px" overflowY="auto" padding="0">
          <Box p={2} bg={"white"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                ref={backupInputRef}
                border={"1px solid #01B5E5"}
                placeholder="Søg..."
                value={backupSearchQuery}
                onChange={(e) => setBackupSearchQuery(e.target.value)}
                bg="white"
                borderRadius="md"
                autoFocus={backupMenu.isOpen}
                onClick={(e) => e.stopPropagation()} // Prevent menu from closing when clicking the input
              />
            </InputGroup>
          </Box>
          {filteredBackupLanguages.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => {
                setSelectedBackupLanguage(lang.label);
                setBackupSearchQuery("");
                backupMenu.onClose(); // Close menu after selection
              }}
              bg={selectedBackupLanguage === lang.label ? "blue.50" : "white"}
            >
              {lang.label}
            </MenuItem>
          ))}
          {filteredBackupLanguages.length === 0 && (
            <MenuItem isDisabled>Ingen resultater fundet</MenuItem>
          )}
        </MenuList>
      </Menu>

      {selectedLanguage !== "Dansk (da-DK)" ||
      selectedBackupLanguage !== "Engelsk (en-US)" ? (
        <Button
          bg={"#01B5E5"}
          color="white"
          mt={"20px"}
          width="100%"
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          gap={"15px"}
          _hover={{ bg: "#032440" }}
        >
          <TfiReload />
          <Text>Genindlæs side</Text>
        </Button>
      ) : null}
    </Box>
  );
};

export default LanguageContainer;
