import React from "react";
import { Box, HStack, Link, Text } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaImdb,
} from "react-icons/fa6";
import { SiWikidata } from "react-icons/si";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  tagline: string;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  homepage: string;
}
interface MovieMediaData {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}
interface MovieAsideProps {
  movie: Movie;
  movieMediaData: MovieMediaData;
}

function MovieAside({ movie, movieMediaData }: MovieAsideProps) {
  console.log(movieMediaData);
  return (
    <>
      <Box
        boxSize={"100%"}
        fontSize={"1.5em"}
        display="flex"
        alignItems={"flex-start"}
        gap={3}
      >
        {movieMediaData?.facebook_id && (
          <Link
            href={`https://facebook.com/${movieMediaData.facebook_id}`}
            target="_blank"
            borderRight={"1px solid #d7d7d7"}
            pr={3}
          >
            <FaFacebook color="#272627" />
          </Link>
        )}

        {movieMediaData?.imdb_id && (
          <Link
            href={`https://www.imdb.com/title/${movieMediaData.imdb_id}`}
            target="_blank"
            borderRight={"1px solid #d7d7d7"}
            pr={3}
          >
            <FaImdb />
          </Link>
        )}

        {movieMediaData?.wikidata_id && (
          <Link
            href={`https://www.wikidata.org/wiki/${movieMediaData.wikidata_id}`}
            target="_blank"
            borderRight={"1px solid #d7d7d7"}
            pr={3}
          >
            <SiWikidata color="#272627" />
          </Link>
        )}

        {movieMediaData?.twitter_id && (
          <Link
            href={`https://twitter.com/${movieMediaData.twitter_id}`}
            target="_blank"
            borderRight={"1px solid #d7d7d7"}
            pr={3}
          >
            <FaTwitter color="#272627" />
          </Link>
        )}

        {movieMediaData?.instagram_id && (
          <Link
            href={`https://instagram.com/${movieMediaData.instagram_id}`}
            target="_blank"
            borderRight={"1px solid #d7d7d7"}
            pr={3}
          >
            <FaInstagram color="#272627" />
          </Link>
        )}

        <Link
          href={`${movie.homepage}`}
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
        display={"flex"}
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
        <Box>
          <Text fontWeight={700}>Budget</Text>
          <Text>${movie.budget.toLocaleString("en-US")}</Text>
        </Box>
        <Box>
          <Text fontWeight={700}>Revenue</Text>
          <Text>${movie.revenue.toLocaleString("en-US")}</Text>
        </Box>
      </HStack>
    </>
  );
}

export default MovieAside;
