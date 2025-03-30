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
import logo from "../assets/moviedb - logo vertical.svg";

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
        { text: "Om TMDB", href: "#" },
        { text: "Kontakt os", href: "#" },
        { text: "Support Forums", href: "#" },
        { text: "API Documentation", href: "#" },
        { text: "System status", href: "#" },
      ],
    },
    {
      title: "Bliv involveret",
      links: [
        { text: "Bidragsbibel", href: "#" },
        { text: "Tilføj ny film", href: "#" },
        { text: "Tilføj ny serie", href: "#" },
      ],
    },
    {
      title: "Fællesskab",
      links: [
        { text: "Retningslinjer", href: "#" },
        { text: "Diskussioner", href: "#" },
        { text: "Leaderboard", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Betingelser for brug", href: "#" },
        { text: "API-vilkår for brug", href: "#" },
        { text: "Fortrolighedspolitik", href: "#" },
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
