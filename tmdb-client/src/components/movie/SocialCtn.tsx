import React, { useEffect } from "react";
import { Box, Heading, HStack, Link, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchMovieIdTemplate } from "../../services/api"; // Adjust the import path as necessary
import { IoIosStar } from "react-icons/io";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

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
  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0);

  const formatReviewContent = (content: string, maxLength?: number) => {
    // First, sanitize the HTML content
    const sanitizedContent = DOMPurify.sanitize(content);

    // If maxLength is provided, truncate the content
    if (maxLength && sanitizedContent.length > maxLength) {
      const truncatedContent = sanitizedContent.substring(0, maxLength) + "...";
      return parse(truncatedContent);
    }

    // Parse the HTML content to React elements
    return parse(sanitizedContent);
  };

  // Add these navigation functions
  const handleNextReview = () => {
    if (reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
      setShowFullText(false); // Reset the expanded text when changing reviews
    }
  };

  const handlePrevReview = () => {
    if (reviews.length > 0) {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      setShowFullText(false); // Reset the expanded text when changing reviews
    }
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) {
        console.error("No movie ID provided");
        return;
      }

      try {
        // Fetch movie details
        let movieReviews = await fetchMovieIdTemplate(Number(id), "review");

        movieReviews = movieReviews.results;

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
        <HStack gap={".5em"} mb={5} alignItems={"flex-end"}>
          <Heading fontSize="1.75em" fontWeight={600} mr={5}>
            Social
          </Heading>
          <Link fontSize="1.15em" _hover={{ textDecoration: "none" }}>
            Reviews{" "}
            <Text
              as={"span"}
              fontSize={"0.75em"}
              fontWeight={"600"}
              color="gray.500"
            >
              ({reviews?.length ? reviews.length : 0})
            </Text>
          </Link>
          <HStack>
            <Box
              as="button"
              onClick={handlePrevReview}
              cursor="pointer"
              opacity={reviews.length <= 1 ? 0.5 : 1}
              pointerEvents={reviews.length <= 1 ? "none" : "auto"}
            >
              <IoIosArrowBack />
            </Box>
          </HStack>

          <HStack>
            <Box
              as="button"
              onClick={handleNextReview}
              cursor="pointer"
              opacity={reviews.length <= 1 ? 0.5 : 1}
              pointerEvents={reviews.length <= 1 ? "none" : "auto"}
            >
              <IoIosArrowForward />
            </Box>
          </HStack>
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
              // Get the current review based on the index
              const currentReview = reviews[currentReviewIndex];

              // Rest of your code remains the same but replace highestRatedReview with currentReview
              return (
                <>
                  <HStack>
                    <Image
                      src={
                        currentReview.author_details.avatar_path
                          ? `https://image.tmdb.org/t/p/w200${currentReview.author_details.avatar_path}`
                          : undefined
                      }
                      borderRadius={"50%"}
                      height={"50px"}
                      width={"50px"}
                      alt={currentReview.author}
                    />
                    <HStack
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      gap={0}
                    >
                      <Heading fontSize={"1.25em"}>
                        A review by {currentReview.author}
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
                          {currentReview.author_details.rating
                            ? currentReview.author_details.rating * 10
                            : null}
                          %
                        </Box>
                        <Text>
                          on{" "}
                          {new Date(
                            currentReview.created_at
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </Text>
                      </HStack>
                    </HStack>
                  </HStack>

                  {/* Add a review counter */}
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Review {currentReviewIndex + 1} of {reviews.length}
                  </Text>

                  <Text mt={10}>
                    {showFullText ? (
                      <>
                        {formatReviewContent(currentReview.content)}
                        <Text
                          as="span"
                          color="blue.500"
                          cursor="pointer"
                          ml={2}
                          onClick={() => setShowFullText(false)}
                          display="inline-block"
                        >
                          Show Less
                        </Text>
                      </>
                    ) : (
                      <>
                        {formatReviewContent(currentReview.content, 500)}
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
