import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Heading,
  Link,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import { useMovie } from "../../context/MovieContext";
import { fetchMovieTrailers } from "../../services/api";

interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  published_at: string;
  official: boolean;
}

function Media() {
  const { movie } = useMovie();
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTrailers = async () => {
      if (!movie?.id) return;

      setIsLoading(true);
      try {
        const trailerData = await fetchMovieTrailers(movie.id);

        // Filter for YouTube trailers
        const youtubeTrailers = trailerData.filter(
          (video: Trailer) =>
            video.site === "YouTube" && video.type.includes("Trailer")
        );

        // If no specific trailers, use any YouTube video
        const youtubeVideos = trailerData.filter(
          (video: Trailer) => video.site === "YouTube"
        );

        const filteredTrailers =
          youtubeTrailers.length > 0 ? youtubeTrailers : youtubeVideos;
        setTrailers(filteredTrailers);

        // Set the first trailer as selected by default
        if (filteredTrailers.length > 0) {
          setSelectedTrailer(filteredTrailers[0]);
        }
      } catch (error) {
        console.error("Error fetching trailers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrailers();
  }, [movie?.id]);

  // Safety check
  if (!movie) return null;

  return (
    <Box mt={10} borderTop="1px solid #d7d7d7" pt={10} width="100%">
      <HStack mb={5}>
        <Heading fontSize="1.75em" fontWeight={600} mr={5}>
          Media
        </Heading>
        <Link fontSize="1.25em">Most Popular</Link>
        <Link fontSize="1.25em">Videos</Link>
        <Link fontSize="1.25em">Backdrops</Link>
        <Link fontSize="1.25em">Posters</Link>
      </HStack>

      <HStack alignItems="flex-start">
        <AspectRatio ratio={16 / 9} width="50%">
          {isLoading ? (
            <Box
              bg="gray.100"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text>Loading trailer...</Text>
            </Box>
          ) : selectedTrailer ? (
            <iframe
              title={`${movie.title} trailer`}
              src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
              allowFullScreen
              style={{ borderRadius: "8px" }}
            />
          ) : (
            <Box
              bg="gray.100"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text>No trailer available</Text>
            </Box>
          )}
        </AspectRatio>

        <AspectRatio ratio={16 / 9} width="50%">
          <Box
            backgroundImage={`url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="8px"
          />
        </AspectRatio>
      </HStack>
    </Box>
  );
}

export default Media;
