import { Grid, GridItem, Image, Button, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchPopularPersons } from "../../services/api";

// Define the Person interface
interface Person {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department?: string;
}

const PopularPersons = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const personsPerPage = 20; // Number of persons to display per page
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getPopularPersons = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const data = await fetchPopularPersons(); // Fetch all 100 persons
        setPersons(data); // Set all persons
      } catch (error) {
        console.error("Error fetching popular persons:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    getPopularPersons();
  }, []);

  const handlePersonClick = (id: number) => {
    navigate(`/person/${id}`); // Navigate to ./person.id
  };

  // Calculate the persons to display for the current page
  const startIndex = (currentPage - 1) * personsPerPage;
  const endIndex = startIndex + personsPerPage;
  const personsToDisplay = persons.slice(startIndex, endIndex);

  // Create placeholder persons for loading state
  const placeholderPersons: Person[] = Array.from({
    length: personsPerPage,
  }).map(() => ({
    id: 0,
    name: "",
    profile_path: undefined,
    known_for_department: "",
  }));

  const handleNextPage = () => {
    if (currentPage < persons.length / personsPerPage) {
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
        {(isLoading ? placeholderPersons : personsToDisplay).map(
          (person, index) => (
            <GridItem
              key={isLoading ? `loading-${index}` : `person-${person.id}`}
              border="1px solid #e4e4e4"
              borderRadius="1em"
              overflow="hidden"
              onClick={() =>
                !isLoading && person.id && handlePersonClick(person.id)
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
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                      : "./person-placeholder.jpg"
                  }
                  alt={person.name || "Loading..."}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  opacity={isLoading ? 0.3 : 1}
                />
              </Box>

              <Box h="30%" p={2} bg="white">
                <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                  {person.name || "Loading..."}
                </Text>
                <Text fontSize="sm" color="gray.500" noOfLines={1}>
                  {person.known_for_department || "Loading..."}
                </Text>
              </Box>
            </GridItem>
          )
        )}
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
