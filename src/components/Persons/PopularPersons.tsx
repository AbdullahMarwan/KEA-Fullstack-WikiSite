import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchPopularPersons } from "../../services/api";

const PopularPersons = () => {
  const [persons, setPersons] = useState<{ id: number; name: string; profile_path?: string; known_for_department?: string }[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getPopularPersons = async () => {
      try {
        const data = await fetchPopularPersons();
        setPersons(data.results); // Access the results array
      } catch (error) {
        console.error("Error fetching popular persons:", error);
      }
    };

    getPopularPersons();
  }, []);

  const handlePersonClick = (id: number) => {
    navigate(`./${id}`); // Navigate to ./person.id
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={16}>
      {persons.map((person) => (
        <GridItem
          key={person.id}
          w="100%"
          h="33rem"
          onClick={() => handlePersonClick(person.id)} // Add onClick handler
          style={{ cursor: "pointer" }} // Add pointer cursor for better UX
        >
          <GridItem w="100%" h="80%">
            <img
              src={person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : "./person-placeholder.jpg"}
              alt="img missing"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </GridItem>

          <GridItem border="1px" borderColor="grey" padding="11">
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
  );
};

export default PopularPersons;