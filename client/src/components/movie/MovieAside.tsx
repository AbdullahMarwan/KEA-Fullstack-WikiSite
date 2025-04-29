import React from "react";
import { Box, HStack, Link, Text, Wrap, Tag } from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaImdb,
} from "react-icons/fa6";
import { SiWikidata } from "react-icons/si";
import { useMovie, Movie } from "../../context/MovieContext";

interface MovieAsideProps {
  movie: Movie;
}

function MovieAside({ movie }: MovieAsideProps) {
  return (
    <>
      <Box
        boxSize={"100%"}
        fontSize={"1.5em"}
        display="flex"
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

        {movie.keywords &&
          movie.keywords.keywords &&
          movie.keywords.keywords.length > 0 && (
            <Box>
              <Text fontWeight={700}>Keywords</Text>
              <Wrap spacing={2} mt={2}>
                {movie.keywords.keywords.map((keyword) => (
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
    </>
  );
}

export default MovieAside;
