import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Select,
  Image,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import missingImgPlaceholder from "../assets/missing-img-placeholder-16-9.jpg";
import {
  fetchPersonDetails,
  fetchCredits,
  fetchCombinedCredits,
  fetchCrewJobs,
} from "../services/api";
import { doSorting } from "../utils/sortingJobs";
import ApiClient from "../services/api-client.ts"; // Import ApiClient

const genderMap: Record<number, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

interface Person {
  name: string;
  profile_path: string | null;
  biography: string;
  known_for_department: string;
  gender: number;
  birthday: string;
  place_of_birth: string;
}

const personApi = new ApiClient<Person[]>("/api/people");

export const PersonSingle = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person[]>([]);

  const [credits, setCredits] = useState<
    { original_title: string; backdrop_path: string }[]
  >([]);
  const [combinedIds, setCombinedIds] = useState<string[]>([]);
  const [crewJobs, setCrewJobs] = useState<string[]>([]);
  const [personJobs, setPersonJobs] = useState<string[]>([]);
  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        // Fetch person details
        const personData = await fetchPersonDetails(id);
        setPerson(personData);

        // Fetch credits
        const creditsData = await fetchCredits(id);
        setCredits(creditsData);

        // Fetch combined credits and crew jobs
        const combinedCredits = await fetchCombinedCredits(id);
        const crewJobsData = await fetchCrewJobs(id);

        setCombinedIds(combinedCredits);
        setCrewJobs(crewJobsData);

        // fetch from db
        const data = await personApi.get(`/${id}`); // This will call /api/people/{id}

        // Combine cast and crew jobs
        const allJobs = [...combinedCredits, ...crewJobsData];
        setPerson(data);
      } catch (error) {
        console.error("Error fetching person data:", error);
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

  return (
    <Grid justifyContent={"center"}>
      <GridItem
        area={"main"}
        marginBottom={100}
        marginTop={100}
        maxWidth={{ base: "80vw", lg: "90vw" }}
      >
        <Heading>{person.name}</Heading>
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
                  maxWidth="66vw"
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
            <Heading as="h2" size="xl" textAlign="center">
              {person.name}
            </Heading>
            <Heading as="h3" size="md" mt={"2em"} maxWidth="66vw">
              Biography
            </Heading>
            <Text>
              {person.biography
                ? person.biography.split("\n").map((paragraph, index) => (
                    <Text key={index} mb={4}>
                      {paragraph}
                    </Text>
                  ))
                : "No biography available"}
            </Text>

            <Heading as="h3" size="md" mb={2} mt={10}>
              Known For
            </Heading>
            <Box
              display="flex"
              overflowX="auto"
              gap="1em"
              p="0em"
              maxWidth="66vw"
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
                onChange={(e) => doSorting(e.target.value, id!, setPersonJobs)}
              >
                <option value="all">All</option>
                <option value="cast">Cast</option>
                <option value="crew">Crew</option>
              </Select>
            </Box>

            {personJobs.some((job) => job.type === "cast") && (
              <Box>
                <Heading
                  as="h3"
                  size="md"
                  mt={10}
                  backgroundColor="gray.100"
                  pb={4}
                >
                  Acting Roles
                </Heading>
                <Box
                  backgroundColor="gray.100"
                  overflowY="scroll"
                  maxHeight="50vh"
                >
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
                <Heading
                  as="h3"
                  size="md"
                  mt={10}
                  backgroundColor="gray.100"
                  pb={4}
                >
                  Production
                </Heading>
                <Box
                  backgroundColor="gray.100"
                  overflowY="scroll"
                  maxHeight="50vh"
                >
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
      </GridItem>
    </Grid>
  );
};

export default PersonSingle;
