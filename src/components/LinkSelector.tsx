import React from "react";
import {
  UnorderedList,
  ListItem,
  Link,
  Box,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface LinkItem {
  name: string;
  href: string;
}

interface LinkSelectorProps {
  links: LinkItem[];
  activeLink: string;
  onLinkClick: (linkName: string) => void;
  maxVisible?: number;
  activeTextColor?: string;
  inactiveTextColor?: string;
  borderColor?: string;
  activeBgColor?: string; // For custom active background color/gradient
  useGradientText?: boolean;
  gradientTextValue?: string;
}

const LinkSelector: React.FC<LinkSelectorProps> = ({
  links,
  activeLink,
  onLinkClick,
  maxVisible = 5,
  activeTextColor = "rgb(3, 37, 65)",
  inactiveTextColor = "white",
  borderColor = "#1ed5aa",
  activeBgColor = "linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)", // Default gradient
  useGradientText = false,
  gradientTextValue = "linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)",
}) => {
  // Determine how many links to show based on screen size
  const visibleLinks =
    useBreakpointValue({
      base: 2,
      sm: 3,
      md: 4,
      lg: maxVisible,
    }) || 2;

  // Split links into visible and dropdown
  const displayLinks = links.slice(0, visibleLinks);
  const dropdownLinks = links.slice(visibleLinks);

  return (
    <Box display="flex" alignItems="center">
      <UnorderedList
        display="flex"
        listStyleType="none"
        p="0"
        m="0"
        border={`1px solid ${borderColor}`}
        borderRadius="25px"
        bg="transparent"
      >
        {displayLinks.map((link) => (
          <ListItem
            key={link.name}
            borderRadius="25px"
            height="1.875em"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            background={
              activeLink === link.name ? activeBgColor : "transparent"
            }
            fontWeight={600}
          >
            <Link
              href={link.href}
              padding="1em"
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(link.name);
              }}
              sx={{
                textDecoration: "none",
                ...(activeLink === link.name &&
                activeTextColor.includes("gradient")
                  ? {
                      background: activeTextColor,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {
                      color:
                        activeLink === link.name
                          ? activeTextColor
                          : inactiveTextColor,
                    }),
              }}
            >
              {link.name}
            </Link>
          </ListItem>
        ))}

        {/* Dropdown for additional links if needed */}
        {dropdownLinks.length > 0 && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<ChevronDownIcon />}
              variant="ghost"
              color={inactiveTextColor}
              bg="transparent"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              height="1.875em"
              borderRadius="25px"
              marginLeft="2px"
            />
            <MenuList bg="rgb(3, 37, 65)" border={`1px solid ${borderColor}`}>
              {dropdownLinks.map((link) => (
                <MenuItem
                  key={link.name}
                  bg={activeLink === link.name ? activeBgColor : "transparent"}
                  _hover={{
                    bg: "rgba(30, 213, 170, 0.2)",
                  }}
                  onClick={() => onLinkClick(link.name)}
                  sx={{
                    ...(activeLink === link.name &&
                    activeTextColor.includes("gradient")
                      ? {
                          background: activeTextColor,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {
                          color:
                            activeLink === link.name
                              ? activeTextColor
                              : inactiveTextColor,
                        }),
                  }}
                >
                  {link.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </UnorderedList>
    </Box>
  );
};

export default LinkSelector;
