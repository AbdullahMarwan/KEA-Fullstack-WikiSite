import React, { useEffect } from "react";
import { Box, Heading, HStack, Link, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api"; // Adjust the import path as necessary
import { IoIosStar } from "react-icons/io";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface AuthorDetails {
  name: string | null;
  username: string | null;
  avatar_path: string | null;
  rating: number | null;
}

interface MovieReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_details: AuthorDetails;
}

function SocialCtn() {
  const { id } = useParams<{ id: string }>();
  const [reviews, setReviews] = React.useState<MovieReview[]>([]);
  const [showFullText, setShowFullText] = React.useState(false); // Move this to component top level

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) {
        console.error("No movie ID provided");
        return;
      }

      try {
        // Fetch movie details
        let movieReviews = await fetchMovieReviews(Number(id));

        movieReviews = movieReviews.results;

        console.log(movieReviews);

        // Update state with fetched reviews
        setReviews(movieReviews);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    getMovieDetails(); // Call the function
  }, [id]);

  return (
    <>
      <Box mt={10} borderTop={"1px solid #d7d7d7"} pt={10}>
        <HStack gap={5} mb={5}>
          <Heading fontSize={"1.75em"} fontWeight={600} mr={5}>
            Social
          </Heading>
          <Link fontSize={"1.25em"}>Reviews</Link>
          <Link fontSize={"1.25em"}>Discussions</Link>
        </HStack>
        <Box
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, .1)",
            border: "1px solid rgba(var(--lightGrey), 1)",
          }}
          padding={"2em"}
          borderRadius={"10px"}
        >
          {reviews.length > 0 &&
            (() => {
              const highestRatedReview = reviews.reduce((prev, current) => {
                return (current.author_details.rating || 0) >
                  (prev.author_details.rating || 0)
                  ? current
                  : prev;
              });

              // Then update your formatReviewContent function
              const formatReviewContent = (
                content: string,
                maxLength?: number
              ) => {
                // First sanitize the HTML content to prevent XSS
                const sanitizedContent = DOMPurify.sanitize(content);

                // Split by line breaks but preserve HTML
                const lines = sanitizedContent.split(/\r\n|\r|\n/);

                // If no maxLength, render the full content with HTML parsing
                if (!maxLength) {
                  return lines.map((line, i) => (
                    <React.Fragment key={i}>
                      {parse(line)}
                      {i !== lines.length - 1 && <br />}
                    </React.Fragment>
                  ));
                }

                // For truncated content with HTML
                let currentLength = 0;
                const truncatedLines = [];

                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  // Strip HTML for length calculation
                  const plainTextLine = line.replace(/<\/?[^>]+(>|$)/g, "");

                  if (currentLength + plainTextLine.length > maxLength) {
                    // This is trickier with HTML - we'll use a simpler approach
                    truncatedLines.push(
                      line.substring(0, maxLength - currentLength)
                    );
                    break;
                  }

                  truncatedLines.push(line);
                  currentLength += plainTextLine.length + 1;

                  if (currentLength >= maxLength) {
                    break;
                  }
                }

                // Join with <br> and parse HTML
                return parse(truncatedLines.join("<br>"));
              };

              return (
                <>
                  <HStack>
                    <Image
                      src={
                        highestRatedReview.author_details.avatar_path
                          ? `https://image.tmdb.org/t/p/w200${highestRatedReview.author_details.avatar_path}`
                          : undefined
                      }
                      borderRadius={"50%"}
                      height={"50px"}
                      width={"50px"}
                      alt={highestRatedReview.author}
                    />
                    <HStack
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      gap={0}
                    >
                      <Heading fontSize={"1.25em"}>
                        A review by {highestRatedReview.author}
                      </Heading>

                      <HStack>
                        <Box
                          backgroundColor={"#022441"}
                          color={"white"}
                          padding={"2px 10px"}
                          display={"flex"}
                          alignItems={"center"}
                          gap={1}
                          borderRadius={"5px"}
                          fontSize={"0.8em"}
                          fontWeight={600}
                        >
                          <IoIosStar size={15} />{" "}
                          {highestRatedReview.author_details.rating
                            ? highestRatedReview.author_details.rating * 10
                            : null}
                          %
                        </Box>
                        <Text>
                          on{" "}
                          {new Date(
                            highestRatedReview.created_at
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </Text>
                      </HStack>
                    </HStack>
                  </HStack>

                  <Text mt={10}>
                    {showFullText ? (
                      formatReviewContent(highestRatedReview.content)
                    ) : (
                      <>
                        {formatReviewContent(highestRatedReview.content, 500)}
                        <Text
                          as="span"
                          color="blue.500"
                          cursor="pointer"
                          onClick={() => setShowFullText(true)}
                        >
                          {" "}
                          Read the rest
                        </Text>
                      </>
                    )}
                  </Text>
                </>
              );
            })()}
        </Box>
      </Box>
    </>
  );
}

export default SocialCtn;
