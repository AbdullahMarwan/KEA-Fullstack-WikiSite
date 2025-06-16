import { Grid, GridItem, Image, Button, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../services/api-client"; // Import ApiClient

// Define People interface
interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for: string;
  biography: string;
  gender: number;
  birthday: string | null;
}

// Create API client for people
const peopleApi = new ApiClient<Person[]>("/api/people/all");

const PopularPersons = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const personsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const getPopularPersons = async () => {
      try {
        setIsLoading(true);

        // Use the ApiClient to fetch people data
        const data = await peopleApi.getAll();
        console.log("People data received:", data);

        setPersons(data);
      } catch (error) {
        console.error("Error fetching popular persons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularPersons();
  }, []);

  // Rest of your component remains the same...
  const handlePersonClick = (id: number) => {
    navigate(`/person/${id}`);
  };

  const startIndex = (currentPage - 1) * personsPerPage;
  const endIndex = startIndex + personsPerPage;
  const personsToDisplay = persons.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(persons.length / personsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        maxWidth={{ base: "600px", md: "1000px", lg: "1200px" }}
        marginBottom={200}
      >
        {(isLoading
          ? Array.from({ length: personsPerPage })
          : personsToDisplay
        ).map((person, index) => (
          <GridItem
            key={isLoading ? index : person.id}
            border="1px solid #e4e4e4"
            borderRadius="1em"
            overflow="hidden"
            onClick={() =>
              !isLoading && person?.id && handlePersonClick(person.id)
            }
            style={{ cursor: isLoading ? "default" : "pointer" }}
          >
            <Box
              w={{ base: "20vh", md: "22vh", lg: "30vh" }}
              h={{ base: "33vh", md: "40vh", lg: "50vh" }}
              bg="gray.200"
              overflow="hidden"
            >
              <Image
                src={
                  person?.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : "./person-placeholder.jpg"
                }
                alt={person?.name || "Loading..."}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>

            <Box h="30%" p={2} bg="white">
              <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                {person?.name || "Loading..."}
              </Text>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {person?.known_for || "Loading..."}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" gap={4} mt={4} mb={20}>
        <Button
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1 || isLoading}
          colorScheme="blue"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          isDisabled={
            currentPage === Math.ceil(persons.length / personsPerPage) ||
            isLoading
          }
          colorScheme="blue"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PopularPersons;
