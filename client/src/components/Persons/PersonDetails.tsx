import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heading, Box, Button, Grid, GridItem, Image} from "@chakra-ui/react";
import missingImgPlaceholder from "../../assets/missing-img-placeholder-16-9.jpg";

const genderMap: Record<number, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<{
    name: string;
    profile_path: string;
    biography: string;
    known_for_department: string;
    gender: number;
    birthday: string;
    place_of_birth: string;
  } | null>(null);
  const [credits, setCredits] = useState<
    { original_title: string; backdrop_path: string }[]
  >([]);
  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=475f7c6aa70e55fd5a97a138977bb3cc`
        );
        const data = await response.json();
        setPerson({
          name: data.name,
          profile_path: data.profile_path,
          biography: data.biography,
          known_for_department: data.known_for_department,
          gender: data.gender,
          birthday: data.birthday,
          place_of_birth: data.place_of_birth,
        });
        return data; // Return the person data for further use
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    const fetchCredits = async (personId: string) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=475f7c6aa70e55fd5a97a138977bb3cc`
        );
        const data = await response.json();
        const titles = data.cast
          .map((item: { original_title: string; backdrop_path: string }) => ({
            original_title: item.original_title,
            backdrop_path: item.backdrop_path,
          }))
          .filter((item) => item.original_title);
        setCredits(titles);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    const fetchData = async () => {
      const personData = await fetchPersonDetails();
      if (personData && personData.id) {
        await fetchCredits(personData.id);
      }
    };

    fetchData();
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  const toggleBiography = () => {
    setShowFullBiography((prev) => !prev);
  };

  const truncatedBiography = person.biography
    .split("\n")
    .slice(0, 2)
    .join("\n");

  return (
    <Grid templateColumns={{ base: "1fr", md: "20vw 40vw" }} gap={0}>

      <GridItem>
      {person.profile_path && (
        <Box display="flex" justifyContent="left" mb={4}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={`${person.name}'s profile`}
            boxSize="200px"
            objectFit="cover"
            boxShadow="lg"
          />
        </Box>
      )}



      <div>
        <Heading as="h3" size="md">
          Personal Information
        </Heading>

        <div>
          <Heading as="h4" size="sm">
            Known for
          </Heading>
          <p>
            {person.known_for_department ||
              "No known for department available."}
          </p>
        </div>
        <div>
          <Heading as="h4" size="sm">
            Gender
          </Heading>
          <p>{genderMap[person.gender] || "Not specified"}</p>
        </div>
        <div>
          <Heading as="h4" size="sm">
            Birthday
          </Heading>
          <p>{person.birthday || "No known birthday available."}</p>
        </div>
      </div>

      </GridItem>


      <GridItem>
      <Heading as="h2" size="xl" textAlign="center" margin={"1em"}>
        {person.name}
      </Heading>
      <Heading as="h3" size="md" mt={"2em"}>
        Biography
      </Heading>
      <p>{showFullBiography ? person.biography : truncatedBiography}</p>
      {person.biography.split("\n").length > 2 && (
        <Button onClick={toggleBiography} mt={2} size="sm" colorScheme="blue">
          {showFullBiography ? "Read Less" : "Read More"}
        </Button>
      )}
      

      
        <Heading as="h3" size="md" mb={2}>
          Known For
        </Heading>
        <Box display="flex" overflowX="auto" gap="1em" p="0em" 
        border={"1px solid #ccc"} borderRight={"0px"}>
        {credits.map((item, index) => (
          <Box
            key={index}
            minWidth={{ base: 80 }}
            padding="1em"
            textAlign="center"
            backgroundColor="white"
            boxShadow="md"
          >
            <img
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  : missingImgPlaceholder
              }
              alt={item.original_title || "Missing Image"}
              style={{
                width: "100%",
                height: "auto",
                minHeight: "4rem",
                backgroundColor: "#808080",
              }}
            />
            <Heading as="h4" size="sm" mt="0.5em">
              {item.original_title}
            </Heading>
          </Box>
        ))}
      </Box>
      </GridItem>

    </Grid>
  );
};

export default PersonDetails;