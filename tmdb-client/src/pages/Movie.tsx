import {
  Box,
  HStack,
  Link,
  Text,
  Image,
  Heading,
  Button,
  Wrap,
  Tag,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import SecondaryNav from "../components/movie/SecondaryNav";
import TopCast from "../components/movie/TopCast";
import SocialCtn from "../components/movie/SocialCtn";
import Media from "../components/movie/Media";
import { MovieProvider, useMovie } from "../context/MovieContext";
import Recommendations from "../components/movie/Recommendations";
import VoteAverageRing from "../components/Homepage/voteAverageRing";
import ToolTips from "../components/movie/ToolTips";
import Emoji from "../components/movie/Emoji";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaImdb,
} from "react-icons/fa6";
import { SiWikidata } from "react-icons/si";
import type { Movie, TvShow } from "../context/MovieContext";

function MediaContent() {
  const { movie, loading, error, mediaType } = useMovie();

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>Loading...</p>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>Error: {error}</p>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>Movie not found</p>
      </Box>
    );
  }

  const isTvShow = mediaType === "tv";
  const tvShow = isTvShow ? (movie as TvShow) : null;
  const movieData = !isTvShow ? (movie as Movie) : null;

  // Organize crew by name to consolidate roles
  const crewByName: {
    [key: string]: { id: number; name: string; jobs: string[] };
  } = {};

  const importantJobs = [
    "director",
    "writer",
    "screenplay",
    "story",
    "characters",
  ];

  movie.credits?.crew.forEach((person) => {
    const jobLower = person.job.toLowerCase();
    if (importantJobs.includes(jobLower)) {
      if (crewByName[person.name]) {
        if (!crewByName[person.name].jobs.includes(person.job)) {
          crewByName[person.name].jobs.push(person.job);
        }
      } else {
        crewByName[person.name] = {
          id: person.id,
          name: person.name,
          jobs: [person.job],
        };
      }
    }
  });

  const consolidatedCrew = Object.values(crewByName);

  return (
    <>
      <Box
        maxWidth={"100vw"}
        overflow={"scroll"}
        backgroundImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}
        backgroundSize="cover"
        backgroundPosition="left calc((50vw - 170px) - 340px) top"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={"20px"}
      >
        <HStack
          width={"90%"}
          display={"flex"}
          justifyContent={"center"}
          columnGap={10}
          maxW="1300px"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "stretch", md: "center" }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={isTvShow ? tvShow?.name : movieData?.title}
            height={{ base: "auto", md: "500px" }}
            maxW={{ base: "100%", md: "unset" }}
            borderRadius="10px"
            objectFit="cover"
            mb={{ base: 4, md: 0 }}
          />
          <Box
            color={"white"}
            height={"100%"}
            width={"100%"}
            display={"flex"}
            alignItems={"space-around"}
            flexDirection={"column"}
            gap={5}
          >
            <Heading>
              {isTvShow ? tvShow?.name : movieData?.title}{" "}
              <Box as="span" fontWeight={"400"} color="gray.300">
                (
                {new Date(
                  isTvShow
                    ? tvShow?.first_air_date ?? ""
                    : movieData?.release_date ?? ""
                ).getFullYear()}
                )
              </Box>
            </Heading>
            <Box as="span" fontWeight={"400"} color="gray.400">
              {isTvShow ? tvShow?.first_air_date : movieData?.release_date}
              <Box as="span" mx={2}>
                •
              </Box>
              {movie.genres && movie.genres.length > 0
                ? movie.genres.map((genre) => genre.name).join(", ")
                : "No genres available"}
              <Box as="span" mx={2}>
                •
              </Box>
              {isTvShow
                ? `${tvShow?.number_of_seasons} Season${
                    tvShow?.number_of_seasons !== 1 ? "s" : ""
                  } (${tvShow?.number_of_episodes} Episodes)`
                : movieData?.runtime
                ? `${Math.floor((movieData.runtime ?? 0) / 60)}h ${
                    (movieData.runtime ?? 0) % 60
                  }m`
                : ""}
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <VoteAverageRing
                radius={50}
                stroke={4}
                progress={Math.round((movie.vote_average ?? 0) * 10)}
              />
              <Text fontWeight={"700"} ml={2}>
                User Score
              </Text>
              <Emoji />
              <Button
                background={"#022441"}
                ml={4}
                color={"white"}
                _hover={{
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                What's your vibe?
              </Button>
            </Box>
            <ToolTips />
            <Text fontSize="lg" fontStyle="italic" color="gray.300">
              {movie.tagline}
            </Text>
            <Box>
              <Heading fontSize={"1.5em"} fontWeight={600}>
                Overview
              </Heading>
              <Text fontSize="lg" fontStyle="italic" color="gray.300">
                {movie.overview}
              </Text>
            </Box>
            <Box width="100%">
              <VStack align="flex-start" spacing={6} width="100%">
                {/* Key crew section */}
                <SimpleGrid columns={[2, 3, 4]} spacing={4} width="100%">
                  {consolidatedCrew.map((person) => (
                    <Box key={`crew-${person.id}`} borderRadius="md">
                      <Text fontWeight="semibold">{person.name}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {person.jobs.join(", ")}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          </Box>
        </HStack>
      </Box>

      <HStack
        spacing={4}
        width="100%"
        display="flex"
        justifyContent="center"
        pt="30px"
        pb="30px"
      >
        <Box maxW="1300px" width="90%" marginLeft={{ sm: "25%", md: "unset" }}>
          <HStack width="100%" align="flex-start" spacing={10}>
            <Box flex="7" width="70%">
              <TopCast />
              <Link
                fontWeight={700}
                _hover={{ textDecoration: "none" }}
                mt={4}
                display="block"
              >
                Full Cast & Crew
              </Link>
              <SocialCtn />
              <Media />
              <Recommendations />
            </Box>
            <Box flex="3" width="30%">
              {/* MovieAside content */}
              <Box
                boxSize={"100%"}
                fontSize={"1.5em"}
                display={{ sm: "none", md: "flex" }}
                alignItems={"flex-start"}
                gap={3}
              >
                {movie.MovieMediaData?.facebook_id && (
                  <Link
                    href={`https://facebook.com/${movie.MovieMediaData.facebook_id}`}
                    target="_blank"
                    borderRight={"1px solid #d7d7d7"}
                    pr={3}
                  >
                    <FaFacebook color="#272627" />
                  </Link>
                )}

                {movie.MovieMediaData?.imdb_id && (
                  <Link
                    href={`https://www.imdb.com/title/${movie.MovieMediaData.imdb_id}`}
                    target="_blank"
                    borderRight={"1px solid #d7d7d7"}
                    pr={3}
                  >
                    <FaImdb />
                  </Link>
                )}

                {movie.MovieMediaData?.wikidata_id && (
                  <Link
                    href={`https://www.wikidata.org/wiki/${movie.MovieMediaData.wikidata_id}`}
                    target="_blank"
                    borderRight={"1px solid #d7d7d7"}
                    pr={3}
                  >
                    <SiWikidata color="#272627" />
                  </Link>
                )}

                {movie.MovieMediaData?.twitter_id && (
                  <Link
                    href={`https://twitter.com/${movie.MovieMediaData.twitter_id}`}
                    target="_blank"
                    borderRight={"1px solid #d7d7d7"}
                    pr={3}
                  >
                    <FaTwitter color="#272627" />
                  </Link>
                )}

                {movie.MovieMediaData?.instagram_id && (
                  <Link
                    href={`https://instagram.com/${movie.MovieMediaData.instagram_id}`}
                    target="_blank"
                    borderRight={"1px solid #d7d7d7"}
                    pr={3}
                  >
                    <FaInstagram color="#272627" />
                  </Link>
                )}

                <Link
                  href={`${movie?.homepage}`}
                  target="_blank"
                  borderRight={"1px solid #d7d7d7"}
                  pr={3}
                >
                  <FaLink color="#272627" />
                </Link>
              </Box>
              <HStack
                mt={10}
                gap={3}
                display={{ sm: "none", md: "flex" }}
                flexDirection={"column"}
                alignItems={"flex-start"}
              >
                <Box>
                  <Text fontWeight={700}>Status</Text>
                  <Text>{movie.status}</Text>
                </Box>
                <Box>
                  <Text fontWeight={700}>Original Language</Text>
                  <Text>{movie.original_language}</Text>
                </Box>
                {!isTvShow && (
                  <>
                    <Box>
                      <Text fontWeight={700}>Budget</Text>
                      <Text>${movie.budget.toLocaleString("en-US")}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight={700}>Revenue</Text>
                      <Text>${movie.revenue.toLocaleString("en-US")}</Text>
                    </Box>
                  </>
                )}
                {movie.keywords &&
                  // Check both possible keyword structures (movies vs TV shows)
                  ((isTvShow &&
                    movie.keywords.results &&
                    movie.keywords.results.length > 0) ||
                    (!isTvShow &&
                      movie.keywords.keywords &&
                      movie.keywords.keywords.length > 0)) && (
                    <Box>
                      <Text fontWeight={700}>Keywords</Text>
                      <Wrap spacing={2} mt={2}>
                        {isTvShow
                          ? movie.keywords.results.map((keyword) => (
                              <Tag
                                key={keyword.id}
                                padding={2}
                                color={"#000000"}
                                backgroundColor={"##efefef"}
                              >
                                {keyword.name}
                              </Tag>
                            ))
                          : movie.keywords.keywords.map((keyword) => (
                              <Tag
                                key={keyword.id}
                                padding={2}
                                color={"#000000"}
                                backgroundColor={"##efefef"}
                              >
                                {keyword.name}
                              </Tag>
                            ))}
                      </Wrap>
                    </Box>
                  )}
              </HStack>
            </Box>
          </HStack>
        </Box>
      </HStack>
    </>
  );
}

function MediaDetail() {
  return (
    <MovieProvider>
      <Box p="0" m="0">
        <SecondaryNav />
        <MediaContent />
      </Box>
    </MovieProvider>
  );
}

export default MediaDetail;
