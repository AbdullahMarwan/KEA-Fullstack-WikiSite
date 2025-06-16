import {
  HStack,
  Box,
  Image,
  Button,
  Heading,
  Link,
  VStack,
  Flex,
} from "@chakra-ui/react";
import logo from "../../assets/moviedb - logo vertical.svg";

interface FooterSection {
  title: string;
  links: { text: string; href: string }[];
}

const Footer = () => {
  // Define all footer sections with their links
  const footerSections: FooterSection[] = [
    {
      title: "The Basics",
      links: [
        { text: "About TMDB", href: "#" },
        { text: "Contact Us", href: "#" },
        { text: "Support Forums", href: "#" },
        { text: "API Documentation", href: "#" },
        { text: "System Status", href: "#" },
      ],
    },
    {
      title: "Get Involved",
      links: [
        { text: "Contribution Bible", href: "#" },
        { text: "Add New Movie", href: "#" },
        { text: "Add New TV Show", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { text: "Guidelines", href: "#" },
        { text: "Discussions", href: "#" },
        { text: "Leaderboard", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Use", href: "#" },
        { text: "API Terms of Use", href: "#" },
        { text: "Privacy Policy", href: "#" },
        { text: "DMCA Policy", href: "#" },
      ],
    },
  ];

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      as="footer"
      width="100%"
      backgroundColor="#02253F"
      marginTop="auto" // This helps push the footer to the bottom if needed
      padding="80px 20px"
    >
      <Flex
        maxWidth="1300px"
        margin="0 auto"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={{ base: "30px", md: "40px" }}
        flexWrap={{ base: "wrap", lg: "nowrap" }}
      >
        <Box height="auto" display="flex" flexDirection="column">
          <Image src={logo} alt="logo" maxWidth="150px" m={0} />
          <Button
            backgroundColor="white"
            color="#01b4e4"
            fontWeight="700"
            mt={4}
          >
            Join the community
          </Button>
        </Box>

        {footerSections.map((section, index) => (
          <VStack key={index} align="flex-start" spacing={2}>
            <Heading fontSize="1.45em" color="white" mb={2}>
              {section.title}
            </Heading>
            {section.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href={link.href}
                color="white"
                fontWeight="400"
                _hover={{ textDecoration: "none", color: "#01b4e4" }}
              >
                {link.text}
              </Link>
            ))}
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default Footer;
