import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const SignupAside = () => {
  return (
    <>
      <Box
        borderRadius="md"
        height="100%"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)" // Adding box shadow
        overflow="hidden" // Ensures the shadow doesn't get cut off
      >
        {/* Heading with specified background color */}
        <Box bg="rgba(1,180,228,1)" padding={"20px"} mb={0}>
          <Heading fontSize={"1.15em"} color="white">
            Fordele ved at være medlem
          </Heading>
        </Box>

        {/* Text items with tick marks in a white background container */}
        <Box bg="white" p={4}>
          <VStack align="flex-start" spacing={3}>
            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>
                Find something to watch on your subscribed streaming services
              </Text>
            </HStack>

            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>Log filmene og TV serierne som du har set </Text>
            </HStack>

            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>
                Hold styr på dine favorit film og TV serier og få forslag fra
                dem
              </Text>
            </HStack>

            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>Opret og vedligehold en personlig liste</Text>
            </HStack>

            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>Opret din egne blandede lister (film og TV)</Text>
            </HStack>

            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>Deltag i film og TV diskussioner</Text>
            </HStack>

            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>
                Bidrag med og forbedre informationen i vores database.
              </Text>
            </HStack>
            <HStack align="flex-start">
              <CheckIcon color="green.500" mt={1} />
              <Text>
                Bidrag med og forbedre informationen i vores database.
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default SignupAside;
