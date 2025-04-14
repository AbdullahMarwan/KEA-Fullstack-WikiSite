import { Grid, GridItem, Image, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchPopularPersons } from "../../services/api";

const PopularPersons = () => {
  const [persons, setPersons] = useState<
    { id: number; name: string; profile_path?: string; known_for_department?: string }[]
  >([]);
  const [ currentPage, setCurrentPage] = useState(1); // Track the current page
  const personsPerPage = 20; // Number of persons to display per page
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getPopularPersons = async () => {
      try {
        const data = await fetchPopularPersons(); // Fetch all 100 persons
        setPersons(data); // Set all persons
      } catch (error) {
        console.error("Error fetching popular persons:", error);
      }
    };

    getPopularPersons();
  }, []);

  const handlePersonClick = (id: number) => {
    navigate(`./${id}`); // Navigate to ./person.id
  };

  // Calculate the persons to display for the current page
  const startIndex = (currentPage - 1) * personsPerPage;
  const endIndex = startIndex + personsPerPage;
  const personsToDisplay = persons.slice(startIndex, endIndex);

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
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={20}
        maxWidth={{ base: "600px", lg: "1200px" }}
        marginBottom={200}
      >
        {personsToDisplay.map((person) => (
          <GridItem
            key={person.id}
            w="100%"
            h="100%"
            onClick={() => handlePersonClick(person.id)} // Add onClick handler
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            <GridItem w="100%" h="100%" overflow={"hidden"} paddingTop={10}>
              <Image
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : "./person-placeholder.jpg"
                }
                alt="img missing"
                width="100%"
                height="100%"
                objectFit="cover"
                borderTopRadius="1em"
                background={"grey"}
              />
            </GridItem>

            <GridItem
              border="1px"
              borderColor="#e4e4e4"
              borderBottomRadius={"1em"}
              padding={2}
              paddingBottom={16}
              height={"55px"}
              overflow={"hidden"}
            >
              <div id="person-info">
                <div>
                  <b>{person.name}</b>
                </div>
                <div>{person.known_for_department}</div>
              </div>
            </GridItem>
          </GridItem>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" gap={4} mt={4}>
        <Button
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          colorScheme="blue"
        >
          Previous
        </Button>
        <Button marginBottom={20}
          onClick={handleNextPage}
          isDisabled={currentPage === Math.ceil(persons.length / personsPerPage)}
          colorScheme="blue"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PopularPersons;