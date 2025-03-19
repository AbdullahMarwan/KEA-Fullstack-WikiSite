import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchPopularPersons } from "../services/api";

const PopularPersons = () => {
  const [persons, setPersons] = useState<{ id: number; name: string }[]>([]);

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

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {persons.map((person) => (
        <GridItem key={person.id} w="100%" h="20rem" border="1px" borderColor="red.400">
          

            <GridItem w="100%" h="80%" border="1px" borderColor="red.400">
            <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} 
            alt="img missing" style={{ height: "100%", objectFit: "cover" }} />
            </GridItem>


          <div id="person-info">
          <div>
          {person.name}
          </div>
          <div>
          {person.known_for_department}
          </div>
          </div>
        </GridItem>
      ))}
      
    </Grid>
  );
};


export default PopularPersons;