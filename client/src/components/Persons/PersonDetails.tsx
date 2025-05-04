import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heading, Box, Button, Grid, GridItem, Image, Select } from "@chakra-ui/react";
import missingImgPlaceholder from "../../assets/missing-img-placeholder-16-9.jpg";

const genderMap: Record<number, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

// TODO: Move API key to environment variable
const API_KEY = "475f7c6aa70e55fd5a97a138977bb3cc";



const PersonDetails = () => {
  const [combinedIds, setCombinedIds] = useState<string[]>([]);
  const [crewJobs, setCrewJobs] = useState<string[]>([]);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [personJobs, setPersonJobs] = useState<string[]>([]);
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


  const fetchData = async () => {
    if (!id) return;
  
    const personData = await fetchPersonDetails(id);
    if (personData) {
      setPerson(personData);
    }
  
    const creditsData = await fetchCredits(id);
    setCredits(creditsData);
  
    const combinedCredits = await fetchCombinedCredits(id); // Cast roles
    const crewJobsData = await fetchCrewJobs(id); // Crew roles
  
    setCombinedIds(combinedCredits);
    setCrewJobs(crewJobsData);
  
    // Combine cast and crew jobs
    const allJobs = [...combinedCredits, ...crewJobsData];
    setPersonJobs(allJobs);
  
    return allJobs; // Return combined jobs
  };

  // Fetch person details
  const fetchPersonDetails = async (personId: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`
      );
      const data = await response.json();
      return {
        name: data.name,
        profile_path: data.profile_path,
        biography: data.biography,
        known_for_department: data.known_for_department,
        gender: data.gender,
        birthday: data.birthday,
        place_of_birth: data.place_of_birth,
      };
    } catch (error) {
      console.error("Error fetching person details:", error);
      return null;
    }
  };

  // Fetch credits
  const fetchCredits = async (personId: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.cast
        .map((item: { original_title: string; backdrop_path: string }) => ({
          original_title: item.original_title,
          backdrop_path: item.backdrop_path,
        }))
        .filter((item) => item.original_title);
    } catch (error) {
      console.error("Error fetching credits:", error);
      return [];
    }
  };

  // Fetch combined credits
  const fetchCombinedCredits = async (personId: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`
      );
      const data = await response.json();
  
      // Process cast data
      const cast = data.cast
        .map((cast: { character: string; original_title: string; release_date: string }) => ({
          type: "cast", // Add type to differentiate cast roles
          character: cast.character,
          title: cast.original_title,
          release_date: cast.release_date,
        }))
        .filter((item: { character: string; title: string }) => item.character && item.title);
  
      return cast;
    } catch (error) {
      console.error("Error fetching combined credits:", error);
      return [];
    }
  };

  // Fetch crew jobs
  const fetchCrewJobs = async (personId: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`
      );
      const data = await response.json();
  
      // Process crew data
      const crew = data.crew
        .map((crew: { job: string; title: string }) => ({
          type: "crew", // Add type to differentiate crew roles
          job: crew.job,
          title: crew.title || crew.name,
        }))
        .filter((crew: { job: string }) => crew.job);
  
      return crew;
    } catch (error) {
      console.error("Error fetching crew jobs:", error);
      return [];
    }
  };

  useEffect(() => {
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



  const doSorting = async (value: string) => {
    if (!id) {
      console.warn("ID is undefined");
      return;
    }

    switch (value.toLowerCase()) {
      case "all":
        // Combine cast and crew jobs
        const combinedCredits = await fetchCombinedCredits(id);
        const crewJobsData = await fetchCrewJobs(id);
        setPersonJobs([...combinedCredits, ...crewJobsData]);
        break;

      case "cast":
        // Fetch only cast jobs
        const castJobs = await fetchCombinedCredits(id);
        setPersonJobs(castJobs);
        break;

      case "crew":
        // Fetch only crew jobs
        const crewJobsOnly = await fetchCrewJobs(id);
        setPersonJobs(crewJobsOnly);
        break;

      default:
        console.warn("Invalid sorting option");
        break;
    }
  };




  return (
    <Grid templateColumns={{ base: "1fr", md: "20vw 40vw" }} gap={0}>
      <GridItem>
        {person.profile_path && (
          <Box display="flex" justifyContent="left" mb={4}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={`${person.name}'s profile`}
              objectFit="cover"
              borderRadius="1em"
              width="66%"
              height="66%"
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
              {person.known_for_department || "No known for department available."}
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
        <Heading as="h2" size="xl" textAlign="center">
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

        <Heading as="h3" size="md" mb={2} mt={10}
        >
          Known For
        </Heading>
        <Box display="flex" overflowX="auto" gap="1em" p="0em"
        /* TODO: Make background linear gradient like in cards */
        >

          {credits.map((item, index) => (
            <Box
              key={index}
              minWidth={{ base: 80 }}
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

        <Box>
          <Heading as="h3" size="md" mt={10}>
            Filter Roles
          </Heading>
          <Select
            placeholder="Select option"
            mt={2}
            onChange={(e) => doSorting(e.target.value)}
          >
            <option value="all">All</option>
            <option value="cast">Cast</option>
            <option value="crew">Crew</option>
          </Select>
        </Box>

        {personJobs.some((job) => job.type === "cast") && (
  <Box >
    <Heading as="h3" size="md" mt={10} backgroundColor="gray.100" pb={4}>
      Acting Roles
    </Heading>
    <Box backgroundColor="gray.100" overflowY="scroll" maxHeight="50vh">
      <ul>
        {personJobs
          .filter((job) => job.type === "cast")
          .map((job, index) => (
            <li key={index}>
              {job.title} as {job.character}
            </li>
          ))}
      </ul>
    </Box>
  </Box>
)}

{personJobs.some((job) => job.type === "crew") && (
  <Box overflowY="scroll" maxHeight="50vh">
    <Heading as="h3" size="md" mt={10} backgroundColor="gray.100" pb={4}>
      Production
    </Heading>
    <Box backgroundColor="gray.100" overflowY="scroll" maxHeight="50vh">
      <ul>
        {personJobs
          .filter((job) => job.type === "crew")
          .map((job, index) => (
            <li key={index}>
              {job.title} ({job.job})
            </li>
          ))}
      </ul>
    </Box>
  </Box>
)}



      </GridItem>
    </Grid>
  );
};

export default PersonDetails;